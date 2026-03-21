const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.thesmartcalculator.com';
const languages = ['en', 'br', 'de', 'es', 'pl'];
const rootDir = path.resolve(__dirname, '..');

// Ensure output directory exists
const outDir = path.join(rootDir, 'lib', 'internal-links');
fs.mkdirSync(outDir, { recursive: true });

languages.forEach(lang => {
  const csvPath = path.join(rootDir, `${lang}-internal-linking.csv`);
  const raw = fs.readFileSync(csvPath, 'utf-8');
  const lines = raw.split(/\r?\n/);
  const results = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === ',') return;

    // Split on first comma only
    const commaIdx = trimmed.indexOf(',');
    if (commaIdx === -1) return;

    const url = trimmed.substring(0, commaIdx).trim();
    const keyword = trimmed.substring(commaIdx + 1).trim();

    if (!url || !keyword) return;

    // Convert full URL to relative path
    let href = url.replace(BASE_URL, '') || '/';

    results.push({ keyword, href });
  });

  const outPath = path.join(outDir, `${lang}.json`);
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`${lang}: ${results.length} links -> ${lang}.json`);
});

console.log('Done!');
