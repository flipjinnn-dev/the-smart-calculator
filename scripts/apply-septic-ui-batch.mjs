#!/usr/bin/env node
/**
 * Batch-apply septic-style UI tweaks to calculator client files.
 * - CalculatorGuide layout="article"
 * - Standard page background gradient
 * - lg:grid-cols-3 → lg:grid-cols-2 (remove col-span-2 wrappers where possible)
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const CLIENTS = [
  "app/(calculators-by-category)/(other)/time-calculator/time-calculator-client.tsx",
  "app/(calculators-by-category)/construction/gallons-per-square-foot-calculator/gallons-per-square-foot-calculator-client.tsx",
  "app/(calculators-by-category)/maths/square-root-curve-calculator/square-root-curve-calculator-client.tsx",
  "app/(calculators-by-category)/health/weight-watchers-points-calculator/weight-watchers-points-calculator-client.tsx",
  "app/(calculators-by-category)/construction/square-feet-to-cubic-yards-calculator/square-feet-to-cubic-yards-calculator-client.tsx",
  "app/(calculators-by-category)/financial/salary-calculator/salary-calculator-client.tsx",
  "app/(calculators-by-category)/(other)/towing-estimate-calculator/towing-estimate-calculator-client.tsx",
  "app/(calculators-by-category)/food/dry-to-cooked-pasta-converter/dry-to-cooked-pasta-converter-client.tsx",
];

function patch(filePath) {
  const full = path.join(ROOT, filePath);
  if (!fs.existsSync(full)) {
    console.warn("SKIP (missing):", filePath);
    return;
  }
  let src = fs.readFileSync(full, "utf8");
  const original = src;

  src = src.replace(
    /<CalculatorGuide data=\{guideData\}\s*\/>/g,
    '<CalculatorGuide data={guideData} layout="article" />'
  );
  src = src.replace(
    /<CalculatorGuide data=\{guideData\}\s*>\s*<\/CalculatorGuide>/g,
    '<CalculatorGuide data={guideData} layout="article" />'
  );

  src = src.replace(
    /min-h-screen bg-gradient-to-br from-gray-50 to-slate-50/g,
    "min-h-screen bg-gradient-to-b from-slate-50 to-white"
  );
  src = src.replace(
    /min-h-screen bg-gradient-to-br from-orange-50 to-amber-50/g,
    "min-h-screen bg-gradient-to-b from-slate-50 to-white"
  );
  src = src.replace(
    /min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/g,
    "min-h-screen bg-gradient-to-b from-slate-50 to-white"
  );
  src = src.replace(
    /min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50/g,
    "min-h-screen bg-gradient-to-b from-slate-50 to-white"
  );
  src = src.replace(
    /min-h-screen bg-gradient-to-br from-green-50 to-emerald-50/g,
    "min-h-screen bg-gradient-to-b from-slate-50 to-white"
  );

  src = src.replace(
    /grid grid-cols-1 lg:grid-cols-3 gap-8/g,
    "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
  );
  src = src.replace(/\s*className="lg:col-span-2"/g, "");

  if (src !== original) {
    fs.writeFileSync(full, src);
    console.log("PATCHED:", filePath);
  } else {
    console.log("UNCHANGED:", filePath);
  }
}

for (const c of CLIENTS) patch(c);
