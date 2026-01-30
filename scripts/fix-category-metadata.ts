import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

/**
 * Script to fix all category layout.tsx files to include complete OG metadata
 */

const BASE_DIR = path.join(process.cwd(), 'app', '(category)');

async function fixCategoryLayouts() {
  console.log('🔍 Finding all category layout files...\n');
  
  const layoutFiles = glob.sync(`${BASE_DIR}/**/layout.tsx`, {
    ignore: ['**/node_modules/**']
  });

  console.log(`Found ${layoutFiles.length} category layout files\n`);

  let fixedCount = 0;
  let alreadyFixedCount = 0;

  for (const filePath of layoutFiles) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;
      let modified = false;

      const categoryName = path.basename(path.dirname(filePath));

      // Check if already using generateCompleteMetadata
      if (content.includes('generateCompleteMetadata')) {
        console.log(`✅ ${categoryName} - Already fixed`);
        alreadyFixedCount++;
        continue;
      }

      // Add import for metadata utils
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

      // Update generateMetadata function
      const metadataFunctionRegex = /export async function generateMetadata\(\): Promise<Metadata> \{[\s\S]*?return \{[\s\S]*?\};[\s\S]*?\}/;
      
      if (metadataFunctionRegex.test(content)) {
        const categoryIdMatch = content.match(/const canonicalUrl = getCategoryCanonicalUrl\(['"]([^'"]+)['"]/);
        const categoryId = categoryIdMatch ? categoryIdMatch[1] : categoryName;

        content = content.replace(
          metadataFunctionRegex,
          `export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && ${categoryName}Meta[langHeader as keyof typeof ${categoryName}Meta]
      ? langHeader
      : "en";

  const meta = ${categoryName}Meta[language as keyof typeof ${categoryName}Meta];
  
  const canonicalUrl = getCategoryCanonicalUrl('${categoryId}', language);
  const locale = getLocaleFromLanguage(language);

  return generateCompleteMetadata({
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    canonicalUrl,
    languageUrls: {
      'en': getCategoryCanonicalUrl('${categoryId}', 'en'),
      'pt-BR': getCategoryCanonicalUrl('${categoryId}', 'br'),
      'pl': getCategoryCanonicalUrl('${categoryId}', 'pl'),
      'de': getCategoryCanonicalUrl('${categoryId}', 'de'),
      'es': getCategoryCanonicalUrl('${categoryId}', 'es'),
    },
    locale,
  });
}`
        );
        modified = true;
      }

      if (modified && content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✅ ${categoryName} - Fixed`);
        fixedCount++;
      }

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   ✅ Fixed: ${fixedCount}`);
  console.log(`   ✓  Already Fixed: ${alreadyFixedCount}`);
  console.log(`   📁 Total: ${layoutFiles.length}`);
  console.log('='.repeat(60) + '\n');
}

fixCategoryLayouts().catch(console.error);
