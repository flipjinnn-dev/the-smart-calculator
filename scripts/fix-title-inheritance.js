const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function fixTitleInheritance() {
  const layoutFiles = await glob('app/(calculators-by-category)/**/layout.tsx', {
    cwd: process.cwd(),
    absolute: true
  });

  let fixedCount = 0;
  let alreadyFixedCount = 0;

  for (const file of layoutFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if already fixed
    if (content.includes('title: {') && content.includes('absolute: meta.title')) {
      alreadyFixedCount++;
      continue;
    }

    // Check if this file has the pattern that needs fixing
    const needsFix = /return\s*\{[\s\S]*?title:\s*meta\.title,/m.test(content);
    
    if (needsFix) {
      // Replace the title pattern
      const updated = content.replace(
        /(\s+return\s*\{[\s\S]*?)(title:\s*meta\.title,)/m,
        '$1title: {\n      absolute: meta.title,\n    },'
      );
      
      if (updated !== content) {
        fs.writeFileSync(file, updated, 'utf8');
        console.log(`✓ Fixed: ${path.relative(process.cwd(), file)}`);
        fixedCount++;
      }
    }
  }

  console.log(`\n✅ Complete!`);
  console.log(`   Fixed: ${fixedCount} files`);
  console.log(`   Already fixed: ${alreadyFixedCount} files`);
  console.log(`   Total processed: ${layoutFiles.length} files`);
}

fixTitleInheritance().catch(console.error);
