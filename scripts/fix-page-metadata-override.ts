/**
 * Page-level `export const metadata` overrides layout `generateMetadata` in Next.js.
 * Remove or replace static page metadata so admin SEO saves show on the frontend.
 */
import { readFile, writeFile, readdir, stat } from "fs/promises";
import path from "path";

const ROOT = path.join(
  process.cwd(),
  "app",
  "(calculators-by-category)"
);

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name === "page.tsx") out.push(full);
  }
  return out;
}

function folderToCalculatorId(pagePath: string): string {
  return path.basename(path.dirname(pagePath));
}

function removeStaticMetadata(source: string): string | null {
  if (!/export\s+const\s+metadata\s*:/.test(source)) return null;

  const patterns = [
    /import\s+type\s+\{\s*Metadata\s*\}\s+from\s+["']next["'];?\s*\n/g,
    /import\s+\{\s*Metadata\s*\}\s+from\s+["']next["'];?\s*\n/g,
    /export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{[\s\S]*?\};?\s*\n/g,
    /export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};?\s*\n/g,
  ];

  let next = source;
  for (const re of patterns) {
    next = next.replace(re, "");
  }

  if (/export\s+const\s+metadata/.test(next)) return null;
  return next.trimStart();
}

function addPageGenerateMetadata(source: string, calculatorId: string): string {
  const importBlock = `import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("${calculatorId}");
}

`;

  if (source.includes("generateCalculatorMetadata")) return source;

  const cleaned = removeStaticMetadata(source) ?? source;
  const importIdx = cleaned.search(/^import\s/m);
  if (importIdx === -1) return importBlock + cleaned;

  const firstImportEnd = cleaned.indexOf("\n", importIdx);
  const rest = cleaned.slice(firstImportEnd + 1);
  const hasDynamic = /export\s+const\s+dynamic/.test(cleaned);

  let insert = importBlock;
  if (hasDynamic) {
    insert = `import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("${calculatorId}");
}

`;
  }

  return cleaned.slice(0, firstImportEnd + 1) + insert + rest;
}

async function main() {
  const pages = await walk(ROOT);
  let removed = 0;
  let addedGenerate = 0;
  let skipped = 0;

  for (const pagePath of pages) {
    const layoutPath = path.join(path.dirname(pagePath), "layout.tsx");
    let layout = "";
    try {
      layout = await readFile(layoutPath, "utf-8");
    } catch {
      // no layout
    }

    const source = await readFile(pagePath, "utf-8");
    if (!/export\s+const\s+metadata/.test(source)) continue;

    const calculatorId = folderToCalculatorId(pagePath);
    let next: string | null = null;

    if (layout.includes("generateCalculatorMetadata")) {
      next = removeStaticMetadata(source);
      if (next) removed++;
      else {
        console.warn("Could not strip metadata:", pagePath);
        skipped++;
        continue;
      }
    } else {
      next = addPageGenerateMetadata(source, calculatorId);
      addedGenerate++;
    }

    if (next !== source) {
      await writeFile(pagePath, next.endsWith("\n") ? next : `${next}\n`, "utf-8");
    }
  }

  console.log(
    `Done: removed static metadata (layout has SEO)=${removed}, added page generateMetadata=${addedGenerate}, skipped=${skipped}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
