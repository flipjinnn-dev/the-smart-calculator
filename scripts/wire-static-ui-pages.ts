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

async function main() {
  const pages = await walk(ROOT);
  let fixed = 0;

  for (const pagePath of pages) {
    let src = await readFile(pagePath, "utf-8");
    if (!src.includes("calculator-ui/")) continue;

    const id = path.basename(path.dirname(pagePath));
    const clientImport = src.match(/import\s+(\w+)\s+from\s+["']\.\/[^"']+["']/)?.[0];
    if (!clientImport) continue;

    const fnMatch = src.match(/export default async function (\w+)/);
    const fnName = fnMatch?.[1] ?? "CalculatorPage";
    const hasGuide = src.includes("guideContent") || src.includes("CalculatorGuide");

    let body = `${clientImport}
import { headers } from "next/headers";
import {
  loadCalculatorUiContent${hasGuide ? ",\n  loadCalculatorGuideContent" : ""},
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export default async function ${fnName}() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("${id}", language);
`;

    if (hasGuide) {
      body += `  const guideContent = await loadCalculatorGuideContent("${id}", language);
  return <${fnMatch ? src.match(/import\s+(\w+)\s+from/)?.[1] : "Client"} content={content} guideContent={guideContent} />;
`;
    } else {
      const client = src.match(/import\s+(\w+)\s+from/)?.[1] ?? "Client";
      body += `  return <${client} content={content} />;
`;
    }

    body += `}
`;

    await writeFile(pagePath, body.endsWith("\n") ? body : `${body}\n`, "utf-8");
    fixed++;
    console.log("wired", pagePath);
  }

  console.log(`Wired ${fixed} pages`);
}

main();
