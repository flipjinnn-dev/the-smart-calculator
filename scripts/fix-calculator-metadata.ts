import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

/**
 * Script to fix all calculator layout.tsx files to include complete OG metadata
 * Fixes issues:
 * 1. Adds og:image, og:type, og:site_name
 * 2. Ensures og:url uses canonicalUrl variable (not hardcoded)
 * 3. Adds x-default hreflang
 */

const BASE_DIR = path.join(process.cwd(), 'app', '(calculators-by-category)');

async function fixCalculatorLayouts() {
  console.log('🔍 Finding all calculator layout files...\n');
  
  const layoutFiles = glob.sync(`${BASE_DIR}/**/**/layout.tsx`, {
    ignore: ['**/node_modules/**']
  });

  console.log(`Found ${layoutFiles.length} calculator layout files\n`);

  let fixedCount = 0;
  let alreadyFixedCount = 0;
  let errorCount = 0;

  for (const filePath of layoutFiles) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;
      let modified = false;

      // Extract calculator name from path for logging
      const calcName = path.basename(path.dirname(filePath));

      // Check if already using generateCompleteMetadata
      if (content.includes('generateCompleteMetadata')) {
        console.log(`✅ ${calcName} - Already fixed`);
        alreadyFixedCount++;
        continue;
      }

      // Fix 1: Add import for metadata utils if not present
      if (!content.includes('from "@/lib/metadata-utils"')) {
        const importRegex = /(import.*from ["']next["'];)/;
        if (importRegex.test(content)) {
          content = content.replace(
            importRegex,
            '$1\nimport { generateCompleteMetadata, getLocaleFromLanguage } from "@/lib/metadata-utils";'
          );
          modified = true;
        }
      }

      // Fix 2: Update generateMetadata function to use complete metadata
      const metadataFunctionRegex = /export async function generateMetadata\(\): Promise<Metadata> \{[\s\S]*?return \{[\s\S]*?\};[\s\S]*?\}/;
      
      if (metadataFunctionRegex.test(content)) {
        // Extract the calculator ID pattern from the file
        const calcIdMatch = content.match(/const canonicalUrl = getCanonicalUrl\(['"]([^'"]+)['"]/);
        const calculatorId = calcIdMatch ? calcIdMatch[1] : null;

        if (calculatorId) {
          // Replace the entire generateMetadata function
          content = content.replace(
            metadataFunctionRegex,
            `export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && ${calcName}Meta[langHeader as keyof typeof ${calcName}Meta]
      ? langHeader
      : "en";

  const meta = ${calcName}Meta[language as keyof typeof ${calcName}Meta];
  
  const canonicalUrl = getCanonicalUrl('${calculatorId}', language);
  const locale = getLocaleFromLanguage(language);

  return generateCompleteMetadata({
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    canonicalUrl,
    languageUrls: {
      'en': getCanonicalUrl('${calculatorId}', 'en'),
      'pt-BR': getCanonicalUrl('${calculatorId}', 'br'),
      'pl': getCanonicalUrl('${calculatorId}', 'pl'),
      'de': getCanonicalUrl('${calculatorId}', 'de'),
      'es': getCanonicalUrl('${calculatorId}', 'es'),
    },
    locale,
  });
}`
          );
          modified = true;
        }
      }

      if (modified && content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✅ ${calcName} - Fixed`);
        fixedCount++;
      } else if (!modified) {
        console.log(`⚠️  ${calcName} - No changes needed or pattern not matched`);
      }

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   ✅ Fixed: ${fixedCount}`);
  console.log(`   ✓  Already Fixed: ${alreadyFixedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📁 Total: ${layoutFiles.length}`);
  console.log('='.repeat(60) + '\n');
}

fixCalculatorLayouts().catch(console.error);
