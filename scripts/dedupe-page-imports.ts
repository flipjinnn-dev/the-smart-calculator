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
  let fixed = 0;
  for (const pagePath of await walk(ROOT)) {
    const src = await readFile(pagePath, "utf-8");
    const dynamicCount = (src.match(/export const dynamic/g) || []).length;
    if (dynamicCount < 2) continue;

    const firstDynamic = src.indexOf("export const dynamic");
    const secondDynamic = src.indexOf("export const dynamic", firstDynamic + 1);
    const clientImport = src.indexOf("import ", secondDynamic);
    if (secondDynamic === -1 || clientImport === -1) continue;

    const next =
      src.slice(0, secondDynamic) +
      src.slice(clientImport).replace(/^export const dynamic[^\n]*\n/, "");

    if (next !== src) {
      await writeFile(pagePath, next.endsWith("\n") ? next : `${next}\n`, "utf-8");
      fixed++;
      console.log("deduped", pagePath);
    }
  }
  console.log(`Fixed ${fixed}`);
}

main();
