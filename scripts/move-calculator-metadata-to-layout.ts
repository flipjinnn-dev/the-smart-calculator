/**
 * Move generateMetadata from calculator page.tsx → layout.tsx (category-page pattern).
 * Page-level metadata streams into <body> when the page segment is dynamic; layout
 * metadata stays in <head> once noStore() is removed from page data loaders.
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

function extractCalculatorId(source: string): string | null {
  return source.match(/const\s+CALCULATOR_ID\s*=\s*["']([^"']+)["']/)?.[1] ?? null;
}

function stripPageMetadata(source: string): string {
  let next = source;
  next = next.replace(
    /import type \{ Metadata \} from ["']next["'];?\s*\n/g,
    ""
  );
  next = next.replace(
    /import \{ generateCalculatorMetadata \} from ["']@\/lib\/calculator-page-runtime["'];?\s*\n/g,
    ""
  );
  next = next.replace(/,\s*\n\s*generateCalculatorMetadata/g, "");
  next = next.replace(/\n\s*generateCalculatorMetadata,\s*/g, "\n  ");
  next = next.replace(
    /const CALCULATOR_ID = ["'][^"']+["'];?\s*\n/g,
    ""
  );
  next = next.replace(
    /export async function generateMetadata\(\): Promise<Metadata> \{[\s\S]*?\}\s*\n/g,
    ""
  );
  next = next.replace(/\n{3,}/g, "\n\n");
  return next.trimStart();
}

function addLayoutMetadata(source: string, calculatorId: string): string {
  if (/export async function generateMetadata/.test(source)) {
    return source;
  }

  const imports = `import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
`;

  const fn = `
export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}
`;

  let next = source;
  if (!next.includes('import type { Metadata }')) {
    next = imports + next;
  } else if (!next.includes("generateCalculatorMetadata")) {
    next = next.replace(
      /(import type \{ Metadata \} from "next";?\n)/,
      `$1import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";\n`
    );
  }

  const exportDefault = next.search(/^export default/m);
  if (exportDefault === -1) return next + fn;
  return next.slice(0, exportDefault) + fn + "\n" + next.slice(exportDefault);
}

async function main() {
  const layouts = await walkLayouts(APP);
  let moved = 0;
  let skipped = 0;

  for (const layoutPath of layouts) {
    const layoutSource = await readFile(layoutPath, "utf-8");
    if (!layoutSource.includes("CalculatorLayoutShell")) continue;

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
      skipped++;
      continue;
    }

    if (!pageSource.includes("generateCalculatorMetadata")) {
      skipped++;
      continue;
    }

    const nextLayout = addLayoutMetadata(layoutSource, calculatorId);
    const nextPage = stripPageMetadata(pageSource);

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
      console.log("moved metadata → layout:", layoutPath);
    }
  }

  console.log(`Done: ${moved} layouts updated, ${skipped} skipped`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
