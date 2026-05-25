/**
 * Repair pages broken by fix-page-metadata-override.ts
 */
import { readFile, writeFile, readdir } from "fs/promises";
import path from "path";

const ROOT = path.join(
  process.cwd(),
  "app",
  "(calculators-by-category)"
);

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name === "page.tsx") out.push(full);
  }
  return out;
}

function repair(source: string): string {
  let next = source;

  // Stray `}` after imports
  next = next.replace(
    /(import[\s\S]*?from\s+["'][^"']+["'];?\s*\n)\s*\}\s*;?\s*\n/g,
    "$1"
  );

  // Leftover `export const metadata = { ... }` when generateMetadata exists
  if (/export async function generateMetadata/.test(next)) {
    next = next.replace(
      /export\s+const\s+metadata\s*=\s*\{[\s\S]*?\}\s*\n/g,
      ""
    );
  }

  // Duplicate generateMetadata blocks — keep first only
  const matches = [...next.matchAll(/export async function generateMetadata/g)];
  if (matches.length > 1) {
    const firstEnd = next.indexOf("}", matches[0].index!) + 1;
    const secondStart = next.indexOf("export async function generateMetadata", firstEnd);
    const thirdStart = next.indexOf("export default", secondStart);
    if (secondStart > -1 && thirdStart > -1) {
      next = next.slice(0, secondStart) + next.slice(thirdStart);
    }
  }

  // Fix septic-style import order: move imports before generateMetadata
  const metaFn = /export async function generateMetadata[\s\S]*?\n\}\s*\n/;
  const importAfterMeta = next.match(
    /export async function generateMetadata[\s\S]*?\n\}\s*\n\s*import/
  );
  if (importAfterMeta) {
    const fn = next.match(metaFn)?.[0] ?? "";
    next = next.replace(fn, "");
    const firstImport = next.search(/^import /m);
    if (firstImport >= 0) {
      const before = next.slice(0, firstImport);
      const after = next.slice(firstImport);
      next = before + fn + after;
    }
  }

  return next;
}

async function main() {
  const pages = await walk(ROOT);
  let fixed = 0;

  for (const pagePath of pages) {
    const source = await readFile(pagePath, "utf-8");
    const next = repair(source);
    if (next !== source) {
      await writeFile(pagePath, next.endsWith("\n") ? next : `${next}\n`, "utf-8");
      fixed++;
      console.log("repaired", pagePath);
    }
  }

  console.log(`Repaired ${fixed} pages`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
