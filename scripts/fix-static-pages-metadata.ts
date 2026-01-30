import * as fs from 'fs';
import * as path from 'path';

/**
 * Script to fix static pages (about-us, contact-us, etc.) metadata
 */

const STATIC_PAGES_DIR = path.join(process.cwd(), 'app', '(other-pages)');

const staticPages = [
  'about-us',
  'contact-us',
  'privacy-policy',
  'terms-and-conditions',
  'editorial-policy-mission-statement'
];

async function fixStaticPagesMetadata() {
  console.log('🔍 Fixing static pages metadata...\n');

  let fixedCount = 0;

  for (const pageName of staticPages) {
    const filePath = path.join(STATIC_PAGES_DIR, pageName, 'page.tsx');
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${pageName} - File not found, skipping`);
      continue;
    }

    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Check if already has complete metadata
      if (content.includes('x-default') && content.includes('og:site_name') || content.includes('generateCompleteMetadata')) {
        console.log(`✅ ${pageName} - Already fixed`);
        continue;
      }

      // Add imports if needed
      if (!content.includes('getStaticPageCanonicalUrl')) {
        const importRegex = /(import.*from ["']next["'];?)/;
        if (importRegex.test(content)) {
          content = content.replace(
            importRegex,
            `$1\nimport { getStaticPageCanonicalUrl } from "@/lib/url-utils";`
          );
        }
      }

      // Fix the metadata export
      const metadataRegex = /export const metadata: Metadata = \{[\s\S]*?\n\}/;
      
      if (metadataRegex.test(content)) {
        // Get the page title and description from existing metadata
        const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
        const descMatch = content.match(/description:\s*["']([^"']+)["']/);
        const keywordsMatch = content.match(/keywords:\s*["']([^"']+)["']/);
        
        const title = titleMatch ? titleMatch[1] : `Smart Calculator - ${pageName}`;
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

        content = content.replace(metadataRegex, newMetadata);
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf-8');
          console.log(`✅ ${pageName} - Fixed`);
          fixedCount++;
        }
      }

    } catch (error) {
      console.error(`❌ Error processing ${pageName}:`, error);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Static Pages Summary:');
  console.log(`   ✅ Fixed: ${fixedCount}`);
  console.log(`   📁 Total: ${staticPages.length}`);
  console.log('='.repeat(60) + '\n');
}

fixStaticPagesMetadata().catch(console.error);
