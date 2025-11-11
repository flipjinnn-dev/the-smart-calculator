import fs from 'fs';
import path from 'path';

// Paths
const ROOT = process.cwd();
const CSV_PATH = path.join(ROOT, 'docs', 'Polish-Meta-Info.csv');
const CALC_META_PATH = path.join(ROOT, 'meta', 'calculators.ts');
const APP_CALC_ROOT = path.join(ROOT, 'app', '(calculators-by-category)');
const MIDDLEWARE_PATH = path.join(ROOT, 'middleware.ts');

// Simple CSV parser supporting quoted fields
function parseCSV(input: string): string[][] {
  const rows: string[][] = [];
  let i = 0; let field = ''; let row: string[] = []; let inQuotes = false;
  while (i < input.length) {
    const ch = input[i];
    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += ch; i++; continue;
    }
    if (ch === '"') { inQuotes = true; i++; continue; }
    if (ch === ',') { row.push(field.trim()); field = ''; i++; continue; }
    if (ch === '\n' || ch === '\r') {
      // handle CRLF/CR
      // finalize row only if we have any data
      if (field.length > 0 || row.length > 0) { row.push(field.trim()); rows.push(row); }
      field = ''; row = []; i++; if (ch === '\r' && input[i] === '\n') i++; continue;
    }
    field += ch; i++;
  }
  if (field.length > 0 || row.length > 0) { row.push(field.trim()); rows.push(row); }
  return rows.filter(r => r.length > 0);
}

function urlPathFromFull(url: string): string {
  try {
    if (!url) return '';
    const u = new URL(url);
    return u.pathname; // e.g. /financial/loan-calculator
  } catch {
    // maybe already a path
    return url.startsWith('http') ? '' : url;
  }
}

function toSlugSegment(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function readFileSafe(p: string): string { return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : ''; }

// Load CSV
const csvRaw = fs.readFileSync(CSV_PATH, 'utf8');
const rows = parseCSV(csvRaw);
if (rows.length < 2) {
  console.error('CSV has no data');
  process.exit(1);
}

// Header mapping
const header = rows[0].map(h => h.trim().toLowerCase());
const idxEn = header.indexOf('slugs in english');
const idxPl = header.indexOf('slugs');
const idxTitle = header.findIndex(h => h.includes('meta tittle') || h.includes('meta title'));
const idxDesc = header.findIndex(h => h.includes('meta description'));

interface Entry { enPath: string; plPath: string; plTitle: string; plDesc: string; }
const data: Entry[] = rows.slice(1).map(r => ({
  enPath: urlPathFromFull(r[idxEn] || ''),
  plPath: urlPathFromFull(r[idxPl] || ''),
  plTitle: (r[idxTitle] || '').trim(),
  plDesc: (r[idxDesc] || '').trim(),
})).filter(e => e.enPath);

// Derive mappings
const categorySet = new Set(['financial','health','maths','physics','construction','food','sports','other-calculators','other','math']);

function isCategoryPath(p: string) {
  const seg = p.split('/').filter(Boolean)[0];
  return categorySet.has(seg);
}

// Load calculatorsMeta to help with EN titles
const calcMetaText = readFileSafe(CALC_META_PATH);

function getEnMetaForSlug(calcSlug: string): { title: string; description: string } | null {
  // calculatorsMeta has keys like 'loan-calculator' and an en block with title/description
  const key = `'${calcSlug}':`;
  const idx = calcMetaText.indexOf(key);
  if (idx === -1) return null;
  const slice = calcMetaText.slice(idx, idx + 2000);
  const titleMatch = slice.match(/en:\s*{[\s\S]*?title:\s*"([^"]+)"/);
  const descMatch = slice.match(/en:\s*{[\s\S]*?description:\s*"([^"]+)"/);
  return {
    title: titleMatch ? titleMatch[1] : '',
    description: descMatch ? descMatch[1] : '',
  };
}

// Update calculators.ts in-memory text for PL slugs/title/desc when present
let calcMetaUpdated = calcMetaText;

function ensurePlBlockFor(calcSlug: string, plPath: string, plTitle: string, plDesc: string) {
  const key = `'${calcSlug}':`;
  const idx = calcMetaUpdated.indexOf(key);
  if (idx === -1) return; // skip if calculator not defined
  const blockStart = calcMetaUpdated.indexOf('{', idx);
  const blockEnd = calcMetaUpdated.indexOf('},', blockStart); // end of this calculator block (approx)
  const block = calcMetaUpdated.slice(idx, blockEnd + 2);
  const enPath = calcSlug; // not used here

  // Build slug for PL: use provided plPath if available; else generate /pl/<category>/<generated>
  let plSlug = plPath && plPath !== '/' ? plPath : '';
  if (!plSlug) {
    // Try to build from EN
    const enMatch = block.match(/en:[\s\S]*?slug:\s*"([^"]+)"/);
    const enSlug = enMatch ? enMatch[1] : '';
    const parts = enSlug.split('/').filter(Boolean);
    const category = parts[0] || 'other-calculators';
    const slugSeg = parts[1] || calcSlug;
    plSlug = `/pl/${category}/${toSlugSegment(slugSeg)}`;
  }

  // If there is already a pl: block, update fields; else insert a pl block mirroring others
  const hasPl = /\spl:\s*{/.test(block);
  if (hasPl) {
    let newBlock = block
      .replace(/(pl:[\s\S]*?title:\s*")[^"]+("?)/, `$1${plTitle}$2`)
      .replace(/(pl:[\s\S]*?description:\s*")[^"]+("?)/, `$1${plDesc}$2`)
      .replace(/(pl:[\s\S]*?slug:\s*")[^"]+("?)/, `$1${plSlug}$2`);
    calcMetaUpdated = calcMetaUpdated.replace(block, newBlock);
  } else {
    // Insert pl block after br or en
    const insertPos = block.indexOf('de:') !== -1 ? block.indexOf('de:') : block.length - 2;
    const plBlock = `
    pl: {
      title: "${plTitle}",
      description: "${plDesc}",
      slug: "${plSlug}",
      keywords: ""
    },`;
    const newBlock = block.slice(0, insertPos) + plBlock + block.slice(insertPos);
    calcMetaUpdated = calcMetaUpdated.replace(block, newBlock);
  }
}

// Prepare middleware mappings to add
const plUrlToEn: Record<string, string> = {}; // local -> english
const enToPlUrl: Record<string, string> = {}; // english -> local

for (const e of data) {
  const enPath = e.enPath; // e.g. /financial/loan-calculator or /health
  const plPath = e.plPath; // may be empty
  const enParts = enPath.split('/').filter(Boolean);
  if (enParts.length === 0) continue;
  if (enParts.length === 1) {
    // category mapping
    const enCat = enParts[0];
    const plParts = plPath.split('/').filter(Boolean);
    const plCat = plParts[1] || ''; // /pl/<cat>
    if (plCat) {
      plUrlToEn[plCat] = enCat;
      enToPlUrl[enCat] = plCat;
    }
  } else if (enParts.length >= 2) {
    const enCat = enParts[0];
    const enCalc = enParts[1];
    // calculatorsMeta key is usually enCalc
    const calcSlug = enCalc;
    const plParts = plPath.split('/').filter(Boolean);
    const plCat = plParts[1];
    const plCalc = plParts[2];

    // Update calculatorsMeta
    if (e.plTitle || e.plDesc || plPath) {
      const plTitle = e.plTitle || getEnMetaForSlug(calcSlug)?.title || '';
      const plDesc = e.plDesc || getEnMetaForSlug(calcSlug)?.description || '';
      ensurePlBlockFor(calcSlug, plPath, plTitle, plDesc);
    }

    // Add to middleware mappings if we have pl category or calc
    if (plCat) {
      plUrlToEn[plCat] = enCat;
      enToPlUrl[enCat] = plCat;
    }
    if (plCalc) {
      plUrlToEn[plCalc] = enCalc;
      enToPlUrl[enCalc] = plCalc;
    }

    // Generate calculator layout.tsx
    try {
      const destDir = path.join(APP_CALC_ROOT, enCat, enCalc);
      ensureDir(destDir);
      const layoutFile = path.join(destDir, 'layout.tsx');
      if (!fs.existsSync(layoutFile)) {
        const enMeta = getEnMetaForSlug(calcSlug) || { title: '', description: '' };
        const plMetaTitle = e.plTitle || enMeta.title || ' ';
        const plMetaDesc = e.plDesc || enMeta.description || ' ';
        const plCanonical = plPath && plPath !== '/' ? plPath : `/pl/${enCat}/${enCalc}`;
        const content = `import { headers } from "next/headers";
import type { Metadata } from "next";

const meta = {
  en: {
    title: "${enMeta.title}",
    description: "${enMeta.description}",
  },
  pl: {
    title: "${plMetaTitle}",
    description: "${plMetaDesc}",
  },
  br: { title: "", description: "" },
  de: { title: "", description: "" },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language = (langHeader && (meta as any)[langHeader]) ? (langHeader as keyof typeof meta) : 'en';
  const m = (meta as any)[language] || meta.en;

  const baseUrl = 'https://www.thesmartcalculator.com';
  const pathEn = '/${enCat}/${enCalc}';
  const canonical = language === 'pl' ? '${plCanonical}' : (language === 'en' ? pathEn : `/${language}${pathEn}`);

  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: canonical.startsWith('http') ? canonical : baseUrl + canonical },
    openGraph: {
      title: m.title,
      description: m.description,
      type: 'website',
      url: canonical.startsWith('http') ? canonical : baseUrl + canonical,
    },
  };
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
`;
        fs.writeFileSync(layoutFile, content, 'utf8');
      }
    } catch (err) {
      console.warn('Failed to create layout for', enCat, enCalc, err);
    }
  }
}

// Write back calculators.ts if changed
if (calcMetaUpdated !== calcMetaText) {
  fs.writeFileSync(CALC_META_PATH, calcMetaUpdated, 'utf8');
  console.log('Updated meta/calculators.ts');
}

// Update middleware mappings
const mwText = readFileSafe(MIDDLEWARE_PATH);
function injectMappings(objName: 'urlMappings' | 'reverseUrlMappings', lang: 'pl', entries: Record<string, string>): string {
  const key = `export const ${objName} = {`;
  const start = mwText.indexOf(key);
  if (start === -1) return mwText;
  const langStart = mwText.indexOf(`'${lang}': {`, start);
  if (langStart === -1) return mwText;
  const bodyStart = mwText.indexOf('{', langStart) + 1;
  const langEnd = mwText.indexOf('}', bodyStart);
  const body = mwText.slice(bodyStart, langEnd);

  let newBody = body;
  for (const [k, v] of Object.entries(entries)) {
    const needle = `'${k}':`;
    if (!newBody.includes(needle)) {
      newBody += `\n    '${k}': '${v}',`;
    }
  }
  const updated = mwText.slice(0, bodyStart) + newBody + mwText.slice(langEnd);
  return updated;
}

let mwUpdated = mwText;
mwUpdated = (function() { // urlMappings pl: local->english
  const updated = injectMappings('urlMappings', 'pl', plUrlToEn);
  return updated;
})();

// For reverse: english->local
function injectReverse(mw: string, entries: Record<string, string>): string {
  const key = `export const reverseUrlMappings = {`;
  const start = mw.indexOf(key);
  if (start === -1) return mw;
  const langStart = mw.indexOf(`'pl': {`, start);
  if (langStart === -1) return mw;
  const bodyStart = mw.indexOf('{', langStart) + 1;
  const langEnd = mw.indexOf('}', bodyStart);
  const body = mw.slice(bodyStart, langEnd);

  let newBody = body;
  for (const [en, local] of Object.entries(entries)) {
    const needle = `'${en}':`;
    if (!newBody.includes(needle)) {
      newBody += `\n    '${en}': '${local}',`;
    }
  }
  const updated = mw.slice(0, bodyStart) + newBody + mw.slice(langEnd);
  return updated;
}

mwUpdated = injectReverse(mwUpdated, enToPlUrl);

if (mwUpdated !== mwText) {
  fs.writeFileSync(MIDDLEWARE_PATH, mwUpdated, 'utf8');
  console.log('Updated middleware.ts mappings for pl');
}

console.log('Done.');
