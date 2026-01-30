const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

/**
 * Master script to fix ALL SEO issues across the entire site
 * Fixes:
 * 1. Missing og:image, og:type, og:siteName
 * 2. OG URL mismatch (hardcoded URLs)
 * 3. Missing x-default hreflang
 * 4. Self-referencing canonical issues
 */

const BASE_URL = 'https://www.thesmartcalculator.com';

function fixMetadataReturn(content, calculatorId, metaObjName) {
  // Pattern to match the return statement in generateMetadata
  const returnPattern = /return \{[\s\S]*?\};(?=\s*\})/;
  
  if (!returnPattern.test(content)) {
    return { content, modified: false };
  }

  // Check if x-default already exists
  if (content.includes("'x-default':")) {
    return { content, modified: false };
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
  return { content, modified: true };
}

function fixCategoryMetadataReturn(content, categoryId) {
  const returnPattern = /return \{[\s\S]*?\};(?=\s*\})/;
  
  if (!returnPattern.test(content)) {
    return { content, modified: false };
  }

  if (content.includes("'x-default':")) {
    return { content, modified: false };
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
  return { content, modified: true };
}

async function fixAllCalculatorLayouts() {
  console.log('🔧 Fixing all calculator layouts...\n');
  
  const layoutFiles = glob.sync('app/(calculators-by-category)/**/**/layout.tsx');
  let fixedCount = 0;

  for (const filePath of layoutFiles) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;
      
      // Extract calculator ID from the getCanonicalUrl call
      const calcIdMatch = content.match(/getCanonicalUrl\(['"]([^'"]+)['"]/);
      if (!calcIdMatch) continue;
      
      const calculatorId = calcIdMatch[1];
      const calcName = path.basename(path.dirname(filePath));
      
      const result = fixMetadataReturn(content, calculatorId, calcName + 'Meta');
      
      if (result.modified) {
        fs.writeFileSync(filePath, result.content, 'utf-8');
        console.log(`✅ Fixed: ${calcName}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error in ${filePath}:`, error.message);
    }
  }

  console.log(`\n✅ Fixed ${fixedCount} calculator layouts\n`);
  return fixedCount;
}

async function fixAllCategoryLayouts() {
  console.log('🔧 Fixing all category layouts...\n');
  
  const layoutFiles = glob.sync('app/(category)/**/layout.tsx');
  let fixedCount = 0;

  for (const filePath of layoutFiles) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      const categoryIdMatch = content.match(/getCategoryCanonicalUrl\(['"]([^'"]+)['"]/);
      if (!categoryIdMatch) continue;
      
      const categoryId = categoryIdMatch[1];
      const categoryName = path.basename(path.dirname(filePath));
      
      const result = fixCategoryMetadataReturn(content, categoryId);
      
      if (result.modified) {
        fs.writeFileSync(filePath, result.content, 'utf-8');
        console.log(`✅ Fixed: ${categoryName}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error in ${filePath}:`, error.message);
    }
  }

  console.log(`\n✅ Fixed ${fixedCount} category layouts\n`);
  return fixedCount;
}

async function fixStaticPages() {
  console.log('🔧 Fixing static pages...\n');
  
  const pages = ['about-us', 'contact-us', 'privacy-policy', 'terms-and-conditions', 'editorial-policy-mission-statement'];
  let fixedCount = 0;

  for (const pageName of pages) {
    const filePath = path.join('app', '(other-pages)', pageName, 'page.tsx');
    
    if (!fs.existsSync(filePath)) continue;

    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      if (content.includes("'x-default':")) continue;

      // Add import if needed
      if (!content.includes('getStaticPageCanonicalUrl')) {
        content = content.replace(
          /(import.*from ["']next["'];?)/,
          `$1\nimport { getStaticPageCanonicalUrl } from "@/lib/url-utils";`
        );
      }

      // Extract existing metadata
      const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      const descMatch = content.match(/description:\s*["']([^"']+)["']/);
      const keywordsMatch = content.match(/keywords:\s*["']([^"']+)["']/);
      
      if (!titleMatch) continue;

      const title = titleMatch[1];
      const description = descMatch ? descMatch[1] : '';
      const keywords = keywordsMatch ? keywordsMatch[1] : '';

      const newMetadata = `export const metadata: Metadata = {
  title: "${title}",
  description: "${description}",${keywords ? `\n  keywords: "${keywords}",` : ''}
  alternates: {
    canonical: getStaticPageCanonicalUrl('${pageName}', 'en'),
    languages: {
      'x-default': getStaticPageCanonicalUrl('${pageName}', 'en'),
      'en': getStaticPageCanonicalUrl('${pageName}', 'en'),
      'pt-BR': getStaticPageCanonicalUrl('${pageName}', 'br'),
      'pl': getStaticPageCanonicalUrl('${pageName}', 'pl'),
      'de': getStaticPageCanonicalUrl('${pageName}', 'de'),
      'es': getStaticPageCanonicalUrl('${pageName}', 'es'),
    }
  },
  openGraph: {
    title: "${title}",
    description: "${description}",
    type: "website",
    url: getStaticPageCanonicalUrl('${pageName}', 'en'),
    siteName: "Smart Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "${title}",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "${title}",
    description: "${description}",
    images: ["/og-image.png"],
  },
}`;

      const metadataRegex = /export const metadata: Metadata = \{[\s\S]*?\n\}/;
      content = content.replace(metadataRegex, newMetadata);
      
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Fixed: ${pageName}`);
      fixedCount++;
    } catch (error) {
      console.error(`❌ Error in ${pageName}:`, error.message);
    }
  }

  console.log(`\n✅ Fixed ${fixedCount} static pages\n`);
  return fixedCount;
}

async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('🚀 Starting SEO Fixes for All Pages');
  console.log('='.repeat(70) + '\n');

  const calculatorCount = await fixAllCalculatorLayouts();
  const categoryCount = await fixAllCategoryLayouts();
  const staticCount = await fixStaticPages();

  console.log('='.repeat(70));
  console.log('📊 FINAL SUMMARY:');
  console.log('='.repeat(70));
  console.log(`   ✅ Calculator layouts fixed: ${calculatorCount}`);
  console.log(`   ✅ Category layouts fixed: ${categoryCount}`);
  console.log(`   ✅ Static pages fixed: ${staticCount}`);
  console.log(`   📦 Total fixed: ${calculatorCount + categoryCount + staticCount}`);
  console.log('='.repeat(70));
  console.log('\n✨ All SEO issues have been fixed!\n');
  console.log('Next steps:');
  console.log('  1. Run: node scripts/verify-seo-fixes.js (to verify)');
  console.log('  2. Test a few pages in production');
  console.log('  3. Re-run your SEO audit tool\n');
}

main().catch(console.error);
