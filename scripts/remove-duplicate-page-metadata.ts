/**
 * When layout.tsx already has generateCalculatorMetadata, remove duplicate from page.tsx.
 */
import { readFile, writeFile, readdir } from "fs/promises";
import path from "path";

const ROOT = path.join(process.cwd(), "app", "(calculators-by-category)");

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
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
    /import \{ generateCalculatorMetadata \} from ["']@\/lib\/calculator-page-runtime["'];?\s*\n/g,
    ""
  );
  next = next.replace(
    /import \{[\s\S]*?generateCalculatorMetadata,?\s*\n\} from ["']@\/lib\/calculator-page-runtime["'];?\s*\n/g,
    (m) => {
      if (!m.includes("loadCalculatorUiContent")) return "";
      return m
        .replace(/\s*generateCalculatorMetadata,?\s*\n/, "\n")
        .replace(/,\s*\n\}/, "\n}");
    }
  );
  next = next.replace(/export const dynamic = ["']force-dynamic["'];?\s*\n/g, "");
  next = next.replace(
    /export async function generateMetadata\(\)[^}]*\{[\s\S]*?\}\s*\n/g,
    ""
  );

  // Clean duplicate blank lines
  next = next.replace(/\n{3,}/g, "\n\n");
  return next.trimStart();
}

async function main() {
  const pages = await walk(ROOT);
  let fixed = 0;

  for (const pagePath of pages) {
    const layoutPath = path.join(path.dirname(pagePath), "layout.tsx");
    let layout = "";
    try {
      layout = await readFile(layoutPath, "utf-8");
    } catch {
      continue;
    }
    if (!layout.includes("generateCalculatorMetadata")) continue;

    const source = await readFile(pagePath, "utf-8");
    if (!source.includes("generateCalculatorMetadata")) continue;

    const next = stripPageMetadata(source);
    if (next !== source) {
      await writeFile(pagePath, next.endsWith("\n") ? next : `${next}\n`, "utf-8");
      fixed++;
      console.log("deduped", pagePath);
    }
  }

  console.log(`Removed duplicate page metadata from ${fixed} pages`);
}

main();
