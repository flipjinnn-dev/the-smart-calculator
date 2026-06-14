/**
 * Move remaining page-level generateCalculatorMetadata → layout.tsx
 * (includes game wheels and other calculators without CalculatorLayoutShell).
 */
import { readFile, writeFile, readdir } from "fs/promises";
import path from "path";

const APP = path.join(process.cwd(), "app");

async function walkPages(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkPages(full)));
    else if (e.name === "page.tsx") out.push(full);
  }
  return out;
}

function stripPageMetadata(source: string): string {
  let next = source;
  next = next.replace(
    /import type \{ Metadata \} from ["']next["'];?\s*\n/g,
    ""
  );
  next = next.replace(
    /import \{\s*\n\s*generateCalculatorMetadata,\s*\n\} from ["']@\/lib\/calculator-page-runtime["'];?\s*\n/g,
    ""
  );
  next = next.replace(
    /import \{ generateCalculatorMetadata \} from ["']@\/lib\/calculator-page-runtime["'];?\s*\n/g,
    ""
  );
  next = next.replace(
    /,\s*\n\s*generateCalculatorMetadata/g,
    ""
  );
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

  const metadataBlock = `import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "${calculatorId}";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

`;

  if (!source.includes(`const CALCULATOR_ID = "${calculatorId}"`)) {
    if (source.includes("const CALCULATOR_ID")) {
      // keep existing id
    } else if (/^const CALCULATOR_ID/m.test(source)) {
      // already has constant
    }
  }

  let next = source;

  if (!next.includes("CALCULATOR_ID")) {
    next = metadataBlock + next;
  } else {
    if (!next.includes('import type { Metadata }')) {
      next = `import type { Metadata } from "next";\nimport { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";\n\n` + next;
    } else if (!next.includes("generateCalculatorMetadata")) {
      next = next.replace(
        /(import type \{ Metadata \} from "next";?\n)/,
        `$1import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";\n`
      );
    }
    const fn = `
export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}
`;
    const exportDefault = next.search(/^export default/m);
    if (exportDefault === -1) next = next + fn;
    else next = next.slice(0, exportDefault) + fn + "\n" + next.slice(exportDefault);
  }

  return next;
}

function calculatorIdFromPage(source: string): string | null {
  return source.match(/const\s+CALCULATOR_ID\s*=\s*["']([^"']+)["']/)?.[1] ?? null;
}

async function main() {
  const pages = await walkPages(APP);
  let moved = 0;

  for (const pagePath of pages) {
    const pageSource = await readFile(pagePath, "utf-8");
    if (!pageSource.includes("generateCalculatorMetadata(CALCULATOR_ID)")) continue;

    const calculatorId = calculatorIdFromPage(pageSource);
    if (!calculatorId) continue;

    const layoutPath = path.join(path.dirname(pagePath), "layout.tsx");
    let layoutSource: string;
    try {
      layoutSource = await readFile(layoutPath, "utf-8");
    } catch {
      layoutSource = "";
    }

    const nextPage = stripPageMetadata(pageSource);
    let nextLayout: string;

    if (layoutSource) {
      nextLayout = addLayoutMetadata(layoutSource, calculatorId);
    } else {
      nextLayout = addLayoutMetadata("", calculatorId) + `export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`;
    }

    if (nextPage !== pageSource) {
      await writeFile(pagePath, nextPage.endsWith("\n") ? nextPage : `${nextPage}\n`, "utf-8");
    }
    if (nextLayout !== layoutSource) {
      await writeFile(layoutPath, nextLayout.endsWith("\n") ? nextLayout : `${nextLayout}\n`, "utf-8");
      moved++;
      console.log("moved →", layoutPath);
    }
  }

  console.log(`Done: ${moved} layouts updated`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
