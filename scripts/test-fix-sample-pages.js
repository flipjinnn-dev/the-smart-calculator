import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

/**
 * TEST SCRIPT - Fixes only a small sample of pages for verification
 * Run this BEFORE the full fix to test on a few pages first
 */

const SAMPLE_SIZE = 8; // Number of random pages to fix

function fixMetadataReturn(content, calculatorId) {
  const returnPattern = /return \{[\s\S]*?\};(?=\s*\})/;
  
  if (!returnPattern.test(content)) {
    return { content, modified: false };
  }

  // Check if already fixed
  if (content.includes("'x-default':") && content.includes('siteName: "Smart Calculator"')) {
    return { content, modified: false, alreadyFixed: true };
  }

  const newReturn = `return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('${calculatorId}', 'en'),
        'en': getCanonicalUrl('${calculatorId}', 'en'),
        'es': getCanonicalUrl('${calculatorId}', 'es'),
        'pt-BR': getCanonicalUrl('${calculatorId}', 'br'),
        'pl': getCanonicalUrl('${calculatorId}', 'pl'),
        'de': getCanonicalUrl('${calculatorId}', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };`;

  content = content.replace(returnPattern, newReturn);
  return { content, modified: true, alreadyFixed: false };
}

function fixCategoryMetadataReturn(content, categoryId) {
  const returnPattern = /return \{[\s\S]*?\};(?=\s*\})/;
  
  if (!returnPattern.test(content)) {
    return { content, modified: false };
  }

  if (content.includes("'x-default':") && content.includes('siteName: "Smart Calculator"')) {
    return { content, modified: false, alreadyFixed: true };
  }

  const newReturn = `return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCategoryCanonicalUrl('${categoryId}', 'en'),
        'en': getCategoryCanonicalUrl('${categoryId}', 'en'),
        'pt-BR': getCategoryCanonicalUrl('${categoryId}', 'br'),
        'pl': getCategoryCanonicalUrl('${categoryId}', 'pl'),
        'de': getCategoryCanonicalUrl('${categoryId}', 'de'),
        'es': getCategoryCanonicalUrl('${categoryId}', 'es'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };`;

  content = content.replace(returnPattern, newReturn);
  return { content, modified: true, alreadyFixed: false };
}

async function testFixSamplePages() {
  console.log('\n' + '='.repeat(70));
  console.log('🧪 TEST SCRIPT - Fixing Sample Pages Only');
  console.log('='.repeat(70) + '\n');

  // Get all calculator layouts
  const allCalculatorLayouts = glob.sync('app/(calculators-by-category)/**/**/layout.tsx');
  
  // Get all category layouts
  const allCategoryLayouts = glob.sync('app/(category)/**/layout.tsx');

  console.log(`📁 Found ${allCalculatorLayouts.length} total calculator layouts`);
  console.log(`📁 Found ${allCategoryLayouts.length} total category layouts\n`);

  // Randomly select sample calculators
  const shuffled = allCalculatorLayouts.sort(() => 0.5 - Math.random());
  const sampleCalculators = shuffled.slice(0, SAMPLE_SIZE);

  // Pick 2 categories
  const sampleCategories = allCategoryLayouts.slice(0, 2);

  console.log(`🎯 Selected ${sampleCalculators.length} random calculators for testing:`);
  console.log('='.repeat(70));

  const fixedFiles = [];
  const alreadyFixedFiles = [];
  let fixedCount = 0;

  // Fix sample calculators
  for (const filePath of sampleCalculators) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      const calcIdMatch = content.match(/getCanonicalUrl\(['"]([^'"]+)['"]/);
      if (!calcIdMatch) continue;
      
      const calculatorId = calcIdMatch[1];
      const calcName = path.basename(path.dirname(filePath));
      
      const result = fixMetadataReturn(content, calculatorId);
      
      if (result.alreadyFixed) {
        console.log(`✓  ${calcName} - Already fixed (skipping)`);
        alreadyFixedFiles.push(calcName);
      } else if (result.modified) {
        fs.writeFileSync(filePath, result.content, 'utf-8');
        console.log(`✅ ${calcName} - FIXED`);
        fixedFiles.push({
          name: calcName,
          path: filePath,
          type: 'calculator',
          id: calculatorId
        });
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error in ${filePath}:`, error.message);
    }
  }

  console.log('\n🎯 Selected 2 categories for testing:');
  console.log('='.repeat(70));

  // Fix sample categories
  for (const filePath of sampleCategories) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      const categoryIdMatch = content.match(/getCategoryCanonicalUrl\(['"]([^'"]+)['"]/);
      if (!categoryIdMatch) continue;
      
      const categoryId = categoryIdMatch[1];
      const categoryName = path.basename(path.dirname(filePath));
      
      const result = fixCategoryMetadataReturn(content, categoryId);
      
      if (result.alreadyFixed) {
        console.log(`✓  ${categoryName} - Already fixed (skipping)`);
        alreadyFixedFiles.push(categoryName);
      } else if (result.modified) {
        fs.writeFileSync(filePath, result.content, 'utf-8');
        console.log(`✅ ${categoryName} - FIXED`);
        fixedFiles.push({
          name: categoryName,
          path: filePath,
          type: 'category',
          id: categoryId
        });
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error in ${filePath}:`, error.message);
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 TEST RESULTS:');
  console.log('='.repeat(70));
  console.log(`   ✅ Fixed: ${fixedCount}`);
  console.log(`   ✓  Already Fixed: ${alreadyFixedFiles.length}`);
  console.log(`   📦 Total Tested: ${sampleCalculators.length + sampleCategories.length}`);
  console.log('='.repeat(70));

  if (fixedCount > 0) {
    console.log('\n📝 Files Modified (for manual verification):');
    console.log('='.repeat(70));
    fixedFiles.forEach(file => {
      console.log(`   • ${file.name} (${file.type})`);
      console.log(`     Path: ${file.path}`);
      console.log(`     ID: ${file.id}\n`);
    });

    console.log('🔍 NEXT STEPS:');
    console.log('='.repeat(70));
    console.log('1. Manually check the above files to verify the fixes');
    console.log('2. Look for:');
    console.log("   - 'x-default' in alternates.languages");
    console.log('   - siteName: "Smart Calculator" in openGraph');
    console.log('   - images array in openGraph');
    console.log('   - twitter card metadata');
    console.log('   - url: canonicalUrl (not hardcoded)');
    console.log('\n3. If all looks good, run the full script:');
    console.log('   node scripts/fix-all-seo-issues.js');
    console.log('\n4. Or test more samples by running this script again');
    console.log('='.repeat(70) + '\n');
  } else {
    console.log('\n✓ All tested pages were already fixed!\n');
  }
}

testFixSamplePages().catch(console.error);
