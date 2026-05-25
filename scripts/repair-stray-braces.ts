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

const PAGE_HEADER = (id: string) => `import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
  generateCalculatorMetadata,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("${id}");
}

`;

async function main() {
  const pages = await walk(ROOT);
  let fixed = 0;

  for (const pagePath of pages) {
    let src = await readFile(pagePath, "utf-8");
    const id = path.basename(path.dirname(pagePath));
    const orig = src;

    // Remove orphan `}` between generateMetadata and export default
    src = src.replace(
      /(export async function generateMetadata\(\)[\s\S]*?\n\})\s*\n+\s*\}\s*\n+(\s*export default)/g,
      "$1\n\n$2"
    );

    // Page starts with generateMetadata but missing imports
    if (/^export async function generateMetadata/.test(src.trimStart())) {
      const body = src.replace(
        /^export async function generateMetadata\(\)[\s\S]*?\n\}\s*\n+/,
        ""
      );
      src = PAGE_HEADER(id) + body;
    }

    if (src !== orig) {
      await writeFile(pagePath, src.endsWith("\n") ? src : `${src}\n`, "utf-8");
      fixed++;
      console.log("fixed", pagePath);
    }
  }

  console.log(`Fixed ${fixed}`);
}

main();
