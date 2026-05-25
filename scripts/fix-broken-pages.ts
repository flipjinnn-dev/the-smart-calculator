import fs from "fs";
import path from "path";

function walk(dir: string, out: string[] = []): string[] {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name === "page.tsx") out.push(p);
  }
  return out;
}

const roots = [
  path.join("app", "(calculators-by-category)"),
  path.join("app", "sports"),
  path.join("app", "maths"),
];

let fixed = 0;

for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    let s = fs.readFileSync(file, "utf8");
    if (!s.includes("language); catch")) continue;

    s = s.replace(
      /const guideContent = await loadCalculatorGuideContent\([^)]+\); catch \{[\s\S]*?\n  \}/g,
      (match) => match.split(" catch")[0] + ";"
    );

    if (
      s.includes("loadCalculatorUiContent") &&
      !s.includes("calculator-page-runtime")
    ) {
      s = s.replace(
        /import \{ headers \} from "next\/headers";\n/,
        `import { headers } from "next/headers";\nimport {\n  loadCalculatorUiContent,\n  loadCalculatorGuideContent,\n} from "@/lib/calculator-page-runtime";\n`
      );
      s = s.replace(
        /import \{ headers \} from 'next\/headers';\n/,
        `import { headers } from 'next/headers';\nimport {\n  loadCalculatorUiContent,\n  loadCalculatorGuideContent,\n} from '@/lib/calculator-page-runtime';\n`
      );
    }

    fs.writeFileSync(file, s);
    fixed++;
  }
}

console.log(`Fixed ${fixed} files.`);
