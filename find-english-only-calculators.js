const fs = require('fs');

// Read the calculators.ts file
const content = fs.readFileSync('meta/calculators.ts', 'utf-8');

// Split by calculator entries
const lines = content.split('\n');

let currentCalc = null;
let currentBlock = '';
let inCalcBlock = false;
let braceCount = 0;

const calculators = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Match calculator ID
  const calcMatch = line.match(/^\s*'([^']+)':\s*\{/);
  if (calcMatch) {
    currentCalc = calcMatch[1];
    calculators[currentCalc] = { languages: [], slug: null };
    inCalcBlock = true;
    braceCount = 1;
    currentBlock = line;
    continue;
  }
  
  if (inCalcBlock) {
    currentBlock += '\n' + line;
    
    // Count braces
    braceCount += (line.match(/\{/g) || []).length;
    braceCount -= (line.match(/\}/g) || []).length;
    
    // Check for language blocks
    if (line.match(/^\s*(en|pl|br|de|es):\s*\{/)) {
      const lang = line.match(/^\s*(en|pl|br|de|es):/)[1];
      calculators[currentCalc].languages.push(lang);
    }
    
    // Extract slug from en block
    if (line.includes('slug:') && line.includes('"')) {
      const slugMatch = line.match(/slug:\s*"([^"]+)"/);
      if (slugMatch) {
        calculators[currentCalc].slug = slugMatch[1];
      }
    }
    
    // End of calculator block
    if (braceCount === 0) {
      inCalcBlock = false;
      currentCalc = null;
      currentBlock = '';
    }
  }
}

// Separate English-only and multi-language calculators
const englishOnly = [];
const multiLanguage = [];

for (const [id, data] of Object.entries(calculators)) {
  if (data.languages.length === 1 && data.languages[0] === 'en') {
    englishOnly.push({ id, slug: data.slug });
  } else if (data.languages.length > 0) {
    multiLanguage.push({ id, slug: data.slug, languages: data.languages });
  }
}

// Print results
console.log('='.repeat(80));
console.log(`ENGLISH-ONLY CALCULATORS: ${englishOnly.length}`);
console.log('='.repeat(80));
englishOnly.forEach(calc => {
  console.log(`  '${calc.slug}',  // ${calc.id}`);
});

console.log('\n' + '='.repeat(80));
console.log(`MULTI-LANGUAGE CALCULATORS: ${multiLanguage.length}`);
console.log('='.repeat(80));

// Save to JSON
const output = {
  english_only: englishOnly,
  multi_language: multiLanguage
};

fs.writeFileSync('calculator-analysis.json', JSON.stringify(output, null, 2));

console.log(`\n✅ Analysis saved to calculator-analysis.json`);
console.log(`   - English-only: ${englishOnly.length}`);
console.log(`   - Multi-language: ${multiLanguage.length}`);
