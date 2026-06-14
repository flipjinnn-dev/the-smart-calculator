/**
 * Fix calculator page.tsx files missing Metadata / generateCalculatorMetadata imports
 * after move-calculator-metadata-to-page.ts.
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

function calculatorIdFromLayout(layoutSource: string): string | null {
  return layoutSource.match(/const\s+CALCULATOR_ID\s*=\s*["']([^"']+)["']/)?.[1] ?? null;
}

function fixPage(source: string, calculatorId: string): string {
  if (!source.includes("generateCalculatorMetadata")) return source;

  let next = source;

  if (!next.includes('import type { Metadata }')) {
    next = `import type { Metadata } from "next";\n${next}`;
  }

  const runtimeImport =
    /import\s+\{([^}]*)\}\s+from\s+["']@\/lib\/calculator-page-runtime["'];?/;

  if (runtimeImport.test(next)) {
    next = next.replace(runtimeImport, (_m, inner: string) => {
      const names = inner
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (!names.includes("generateCalculatorMetadata")) {
        names.unshift("generateCalculatorMetadata");
      }
      return `import {\n  ${names.join(",\n  ")},\n} from "@/lib/calculator-page-runtime";`;
    });
  } else if (!next.includes("from \"@/lib/calculator-page-runtime\"")) {
    next = next.replace(
      /^(import type \{ Metadata \} from "next";\n)/,
      `$1import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";\n`
    );
  }

  if (!next.includes("const CALCULATOR_ID")) {
    next = next.replace(
      /export async function generateMetadata\(\): Promise<Metadata>/,
      `const CALCULATOR_ID = "${calculatorId}";\n\nexport async function generateMetadata(): Promise<Metadata>`
    );
  }

  return next;
}

async function main() {
  const pages = await walkPages(APP);
  let fixed = 0;

  for (const pagePath of pages) {
    const source = await readFile(pagePath, "utf-8");
    if (!source.includes("generateCalculatorMetadata(CALCULATOR_ID)")) continue;

    const layoutPath = path.join(path.dirname(pagePath), "layout.tsx");
    let calculatorId: string | null = null;
    try {
      const layout = await readFile(layoutPath, "utf-8");
      calculatorId = calculatorIdFromLayout(layout);
    } catch {
      const folder = path.basename(path.dirname(pagePath));
      calculatorId = folder;
    }
    if (!calculatorId) continue;

    const next = fixPage(source, calculatorId);
    if (next !== source) {
      await writeFile(pagePath, next.endsWith("\n") ? next : `${next}\n`, "utf-8");
      fixed++;
    }
  }

  console.log(`Fixed imports on ${fixed} pages`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
