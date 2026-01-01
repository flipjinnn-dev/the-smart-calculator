const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get all calculator directories
const categories = [
  '(other)',
  'construction',
  'financial',
  'food',
  'health',
  'maths',
  'physics',
  'sports'
];

const baseDir = 'app/(calculators-by-category)';
const calculators = [];

categories.forEach(category => {
  const categoryPath = path.join(baseDir, category);
  if (!fs.existsSync(categoryPath)) return;
  
  const items = fs.readdirSync(categoryPath);
  items.forEach(item => {
    const itemPath = path.join(categoryPath, item);
    const pagePath = path.join(itemPath, 'page.tsx');
    
    if (fs.existsSync(pagePath) && fs.statSync(itemPath).isDirectory()) {
      calculators.push(itemPath);
    }
  });
});

console.log(`\n📊 Found ${calculators.length} calculators to migrate\n`);

let migrated = 0;
let skipped = 0;
let failed = 0;

calculators.forEach((calc, index) => {
  const calcName = path.basename(calc);
  console.log(`[${index + 1}/${calculators.length}] Migrating: ${calcName}`);
  
  try {
    const result = execSync(`node scripts/migrate-to-server-client.cjs "${calc}"`, {
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    
    if (result.includes('✅ Migration completed successfully')) {
      migrated++;
      console.log(`  ✅ Success`);
    } else if (result.includes('⚠️  Migration skipped')) {
      skipped++;
      console.log(`  ⚠️  Skipped (already migrated)`);
    }
  } catch (error) {
    failed++;
    console.log(`  ❌ Failed: ${error.message}`);
  }
});

console.log(`\n📈 Migration Summary:`);
console.log(`  ✅ Migrated: ${migrated}`);
console.log(`  ⚠️  Skipped: ${skipped}`);
console.log(`  ❌ Failed: ${failed}`);
console.log(`  📊 Total: ${calculators.length}\n`);

if (failed > 0) {
  process.exit(1);
}
