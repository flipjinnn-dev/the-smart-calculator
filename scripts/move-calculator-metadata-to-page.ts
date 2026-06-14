/**
 * Move generateMetadata from calculator layout.tsx → page.tsx so title/description
 * render in <head> (not streamed into <body> when the page segment is dynamic).
 */
import { readFile, writeFile, readdir } from "fs/promises";
import path from "path";

const APP = path.join(process.cwd(), "app");

async function walkLayouts(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkLayouts(full)));
    else if (e.name === "layout.tsx") out.push(full);
  }
  return out;
}

function extractCalculatorId(layoutSource: string): string | null {
  const m = layoutSource.match(
    /const\s+CALCULATOR_ID\s*=\s*["']([^"']+)["']/
  );
  return m?.[1] ?? null;
}

function stripLayoutMetadata(source: string): string {
  let next = source;
  next = next.replace(
    /import type \{ Metadata \} from ["']next["'];?\s*\n/g,
    ""
  );
  next = next.replace(
    /import \{ generateCalculatorMetadata \} from ["']@\/lib\/calculator-page-runtime["'];?\s*\n/g,
    ""
  );
  next = next.replace(
    /export async function generateMetadata\(\): Promise<Metadata> \{[\s\S]*?\}\s*\n/g,
    ""
  );
  next = next.replace(/\n{3,}/g, "\n\n");
  return next.trimStart();
}

function addPageMetadata(source: string, calculatorId: string): string {
  if (/export async function generateMetadata/.test(source)) {
    return source;
  }

  const block = `import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "${calculatorId}";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

`;

  const importMatch = source.match(/^import\s/m);
  if (!importMatch) return block + source;

  const firstImportEnd = source.indexOf("\n", importMatch.index!);
  const rest = source.slice(firstImportEnd + 1);

  if (rest.includes('from "@/lib/calculator-page-runtime"')) {
    let updated = source;
    if (!updated.includes('import type { Metadata }')) {
      updated = updated.replace(
        /(import \{[^}]+\} from ["']@\/lib\/calculator-page-runtime["'];?\n)/,
        `import type { Metadata } from "next";\n$1`
      );
    }
    if (!updated.includes("const CALCULATOR_ID")) {
      updated = updated.replace(
        /(import[\s\S]*?from ["']@\/lib\/calculator-page-runtime["'];?\n)/,
        `$1\nconst CALCULATOR_ID = "${calculatorId}";\n`
      );
    }
    const fn = `
export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}
`;
    const exportDefault = updated.search(/^export default/m);
    if (exportDefault === -1) return updated + fn;
    return updated.slice(0, exportDefault) + fn + "\n" + updated.slice(exportDefault);
  }

  return source.slice(0, firstImportEnd + 1) + block + rest;
}

async function main() {
  const layouts = await walkLayouts(APP);
  let moved = 0;
  let skipped = 0;

  for (const layoutPath of layouts) {
    const layoutSource = await readFile(layoutPath, "utf-8");
    if (!layoutSource.includes("generateCalculatorMetadata")) continue;

    const calculatorId = extractCalculatorId(layoutSource);
    if (!calculatorId) {
      console.warn("No CALCULATOR_ID:", layoutPath);
      skipped++;
      continue;
    }

    const pagePath = path.join(path.dirname(layoutPath), "page.tsx");
    let pageSource: string;
    try {
      pageSource = await readFile(pagePath, "utf-8");
    } catch {
      console.warn("No page.tsx for", layoutPath);
      skipped++;
      continue;
    }

    const nextLayout = stripLayoutMetadata(layoutSource);
    const nextPage = addPageMetadata(pageSource, calculatorId);

    if (nextLayout !== layoutSource) {
      await writeFile(
        layoutPath,
        nextLayout.endsWith("\n") ? nextLayout : `${nextLayout}\n`,
        "utf-8"
      );
    }
    if (nextPage !== pageSource) {
      await writeFile(
        pagePath,
        nextPage.endsWith("\n") ? nextPage : `${nextPage}\n`,
        "utf-8"
      );
      moved++;
      console.log("moved metadata →", pagePath);
    }
  }

  console.log(`Done: ${moved} pages updated, ${skipped} skipped`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
