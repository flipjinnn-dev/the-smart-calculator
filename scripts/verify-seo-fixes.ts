import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

/**
 * Verification script to check if all SEO issues are fixed
 */

interface IssueCount {
  missingOgImage: number;
  missingOgType: number;
  missingOgSiteName: number;
  missingXDefault: number;
  hardcodedOgUrl: number;
  missingCanonical: number;
}

async function verifyMetadataFixes() {
  console.log('🔍 Verifying SEO fixes across all pages...\n');

  const issues: IssueCount = {
    missingOgImage: 0,
    missingOgType: 0,
    missingOgSiteName: 0,
    missingXDefault: 0,
    hardcodedOgUrl: 0,
    missingCanonical: 0,
  };

  // Check calculator layouts
  const calcLayouts = glob.sync('app/(calculators-by-category)/**/**/layout.tsx', {
    ignore: ['**/node_modules/**']
  });

  console.log(`📁 Checking ${calcLayouts.length} calculator layouts...\n`);

  for (const filePath of calcLayouts) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(path.dirname(filePath));

    let hasIssues = false;

    // Check for missing x-default
    if (!content.includes("'x-default':")) {
      issues.missingXDefault++;
      hasIssues = true;
    }

    // Check for OG image
    if (!content.includes('images:') && !content.includes('og:image') && !content.includes('openGraph')) {
      issues.missingOgImage++;
      hasIssues = true;
    }

    // Check for OG type
    if (!content.includes('type:') && content.includes('openGraph')) {
      issues.missingOgType++;
      hasIssues = true;
    }

    // Check for OG siteName
    if (!content.includes('siteName:') && content.includes('openGraph')) {
      issues.missingOgSiteName++;
      hasIssues = true;
    }

    // Check for hardcoded URLs in og:url
    if (content.includes('url: `https://www.thesmartcalculator.com/') && 
        !content.includes('url: canonicalUrl')) {
      issues.hardcodedOgUrl++;
      hasIssues = true;
    }

    // Check for canonical
    if (!content.includes('canonical:')) {
      issues.missingCanonical++;
      hasIssues = true;
    }

    if (hasIssues) {
      console.log(`⚠️  ${fileName} - Has issues`);
    }
  }

  // Check category layouts
  const catLayouts = glob.sync('app/(category)/**/layout.tsx', {
    ignore: ['**/node_modules/**']
  });

  console.log(`\n📁 Checking ${catLayouts.length} category layouts...\n`);

  for (const filePath of catLayouts) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(path.dirname(filePath));

    let hasIssues = false;

    if (!content.includes("'x-default':")) {
      issues.missingXDefault++;
      hasIssues = true;
    }

    if (!content.includes('siteName:') && content.includes('openGraph')) {
      issues.missingOgSiteName++;
      hasIssues = true;
    }

    if (hasIssues) {
      console.log(`⚠️  ${fileName} - Has issues`);
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 SEO Issues Found:');
  console.log('='.repeat(70));
  console.log(`   ❌ Missing x-default hreflang: ${issues.missingXDefault}`);
  console.log(`   ❌ Missing OG image: ${issues.missingOgImage}`);
  console.log(`   ❌ Missing OG type: ${issues.missingOgType}`);
  console.log(`   ❌ Missing OG siteName: ${issues.missingOgSiteName}`);
  console.log(`   ❌ Hardcoded OG URL: ${issues.hardcodedOgUrl}`);
  console.log(`   ❌ Missing canonical: ${issues.missingCanonical}`);
  console.log('='.repeat(70));

  const totalIssues = Object.values(issues).reduce((a, b) => a + b, 0);
  
  if (totalIssues === 0) {
    console.log('\n✅ All SEO issues fixed! Great job!\n');
  } else {
    console.log(`\n⚠️  ${totalIssues} total issues remaining. Run the fix scripts.\n`);
  }

  return totalIssues;
}

verifyMetadataFixes().catch(console.error);
