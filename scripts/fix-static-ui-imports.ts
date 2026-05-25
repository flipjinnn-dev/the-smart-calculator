/**
 * Replace static calculator-ui JSON imports with loadCalculatorUiContent.
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

async function main() {
  const pages = await walk(ROOT);
  let fixed = 0;

  for (const pagePath of pages) {
    let src = await readFile(pagePath, "utf-8");
    if (!src.includes("calculator-ui/")) continue;
    if (src.includes("loadCalculatorUiContent")) continue;

    const calculatorId = path.basename(path.dirname(pagePath));

    if (!src.includes("loadCalculatorUiContent")) {
      if (!src.includes("@/lib/calculator-page-runtime")) {
        src = src.replace(
          /^(import[\s\S]*?from\s+["'][^"']+["'];?\s*\n)+/m,
          (m) =>
            `${m}import {\n  loadCalculatorUiContent,\n  loadCalculatorGuideContent,\n} from "@/lib/calculator-page-runtime";\n\nexport const dynamic = "force-dynamic";\n\n`
        );
      }
    }

    src = src.replace(
      /const\s+content\s*=\s*\(\s*await\s+import\([^)]*calculator-ui[^)]*\)[^;]*;?/g,
      `const content = await loadCalculatorUiContent("${calculatorId}", language);`
    );
    src = src.replace(
      /let\s+content[^;]*await\s+import\([^)]*calculator-ui[^)]*\)[^;]*;?/g,
      `const content = await loadCalculatorUiContent("${calculatorId}", language);`
    );

    if (!src.includes("const language")) {
      src = src.replace(
        /export default async function/,
        `export default async function`
      );
      if (!src.includes("headers()")) {
        src = src.replace(
          /export default async function (\w+)/,
          `export default async function $1`
        );
      }
    }

    await writeFile(pagePath, src, "utf-8");
    fixed++;
    console.log("fixed", pagePath);
  }

  console.log(`Fixed ${fixed} pages`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
