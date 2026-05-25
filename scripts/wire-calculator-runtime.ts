/**
 * Wires all calculator layouts/pages to load SEO + UI from Blob/filesystem at runtime.
 * Run: npx tsx scripts/wire-calculator-runtime.ts
 */
import fs from "fs";
import path from "path";
import { calculators, getCalculatorFileName } from "../lib/calculator-data";

const ROOT = path.join(process.cwd(), "app", "(calculators-by-category)");

const storageToId = new Map<string, string>();
for (const c of calculators) {
  storageToId.set(getCalculatorFileName(c.id), c.id);
}

function resolveCalculatorId(folderName: string): string {
  return storageToId.get(folderName) ?? folderName;
}

function walkLayouts(dir: string, out: string[] = []): string[] {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkLayouts(p, out);
    else if (ent.name === "layout.tsx") out.push(p);
  }
  return out;
}

function walkPages(dir: string, out: string[] = []): string[] {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkPages(p, out);
    else if (ent.name === "page.tsx" && !fs.readFileSync(p, "utf8").includes("export {")) {
      out.push(p);
    }
  }
  return out;
}

function patchLayout(layoutPath: string) {
  const folder = path.basename(path.dirname(layoutPath));
  const calculatorId = resolveCalculatorId(folder);
  const content = `import type { Metadata } from "next";
import Script from "next/script";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
import { loadCalculatorSeo } from "@/lib/calculator-seo";

export const dynamic = "force-dynamic";

const CALCULATOR_ID = "${calculatorId}";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default async function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await loadCalculatorSeo(CALCULATOR_ID, "en");
  const jsonLdSchema = seo?.schema ?? null;

  return (
    <>
      {jsonLdSchema ? (
        <Script
          id={\`\${CALCULATOR_ID}-json-ld\`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
          strategy="afterInteractive"
        />
      ) : null}
      {children}
    </>
  );
}
`;
  fs.writeFileSync(layoutPath, content);
}

function patchPage(pagePath: string) {
  let src = fs.readFileSync(pagePath, "utf8");
  if (src.includes("loadCalculatorUiContent")) return;

  const folder = path.basename(path.dirname(pagePath));
  const calculatorId = resolveCalculatorId(folder);

  if (!src.includes("calculator-ui/")) return;

  src = src.replace(
    /import \{ headers \} from "next\/headers";\n/,
    `import { headers } from "next/headers";\nimport {\n  loadCalculatorUiContent,\n  loadCalculatorGuideContent,\n} from "@/lib/calculator-page-runtime";\n`
  );
  src = src.replace(
    /import \{ headers \} from 'next\/headers';\n/,
    `import { headers } from 'next/headers';\nimport {\n  loadCalculatorUiContent,\n  loadCalculatorGuideContent,\n} from '@/lib/calculator-page-runtime';\n`
  );

  const blockRe =
    /let content = null;\s*let guideContent = null;\s*try \{[\s\S]*?guideContent = [\s\S]*?\n  \}/;

  const replacement = `const content = await loadCalculatorUiContent("${calculatorId}", language);
  const guideContent = await loadCalculatorGuideContent("${calculatorId}", language);`;

  if (!blockRe.test(src)) return;
  src = src.replace(blockRe, replacement);

  if (!src.includes("export const dynamic")) {
    src = src.replace(
      /(import[\s\S]*?from ["']@\/lib\/calculator-page-runtime["'];\n)/,
      `$1\nexport const dynamic = "force-dynamic";\n`
    );
  }

  fs.writeFileSync(pagePath, src);
}

let layouts = 0;
let pages = 0;

for (const layoutPath of walkLayouts(ROOT)) {
  if (fs.readFileSync(layoutPath, "utf8").includes("generateMetadata")) {
    patchLayout(layoutPath);
    layouts++;
  }
}

for (const pagePath of walkPages(ROOT)) {
  patchPage(pagePath);
  pages++;
}

// app/sports and app/maths outside category folder
const extraRoots = [
  path.join(process.cwd(), "app", "sports"),
  path.join(process.cwd(), "app", "maths", "calculator"),
];

for (const root of extraRoots) {
  if (!fs.existsSync(root)) continue;
  for (const layoutPath of walkLayouts(root)) {
    if (fs.readFileSync(layoutPath, "utf8").includes("generateMetadata")) {
      patchLayout(layoutPath);
      layouts++;
    }
  }
  for (const pagePath of walkPages(root)) {
    patchPage(pagePath);
    pages++;
  }
}

console.log(`Patched ${layouts} layouts and ${pages} pages.`);
