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

let fixed = 0;
for (const file of walk("app")) {
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes("loadCalculatorUiContent")) continue;
  if (s.includes("calculator-page-runtime")) continue;

  if (s.includes('from "next/headers"')) {
    s = s.replace(
      'import { headers } from "next/headers";',
      'import { headers } from "next/headers";\nimport {\n  loadCalculatorUiContent,\n  loadCalculatorGuideContent,\n} from "@/lib/calculator-page-runtime";'
    );
  } else if (s.includes("from 'next/headers'")) {
    s = s.replace(
      "import { headers } from 'next/headers';",
      "import { headers } from 'next/headers';\nimport {\n  loadCalculatorUiContent,\n  loadCalculatorGuideContent,\n} from '@/lib/calculator-page-runtime';"
    );
  } else {
    s = `import {\n  loadCalculatorUiContent,\n  loadCalculatorGuideContent,\n} from "@/lib/calculator-page-runtime";\n` + s;
  }

  fs.writeFileSync(file, s);
  fixed++;
}
console.log(`Added imports to ${fixed} pages.`);
