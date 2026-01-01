const fs = require('fs');
const path = require('path');

/**
 * Improved Calculator Migration Script
 * Converts client component calculators to server/client split for better SEO
 */

class CalculatorMigrationV2 {
  constructor(calculatorPath) {
    this.calculatorPath = calculatorPath;
    this.pagePath = path.join(calculatorPath, 'page.tsx');
    this.clientPath = path.join(calculatorPath, 'calculator-client.tsx');
    this.calculatorId = path.basename(calculatorPath);
    
    console.log(`\n📦 Migrating: ${this.calculatorId}`);
  }

  async migrate() {
    try {
      // Read original page.tsx
      const originalContent = fs.readFileSync(this.pagePath, 'utf-8');
      
      // Backup original file
      const backupPath = this.pagePath.replace('.tsx', '.backup.tsx');
      fs.writeFileSync(backupPath, originalContent);
      console.log(`💾 Backup created: ${path.basename(backupPath)}`);
      
      // Parse component
      const parsed = this.parseComponent(originalContent);
      
      // Generate new files
      const clientComponent = this.generateClientComponent(parsed, originalContent);
      const serverComponent = this.generateServerComponent(parsed);
      
      // Write files
      fs.writeFileSync(this.clientPath, clientComponent);
      console.log(`✅ Created: calculator-client.tsx`);
      
      fs.writeFileSync(this.pagePath, serverComponent);
      console.log(`✅ Updated: page.tsx (server component)`);
      
      return { success: true, calculatorId: this.calculatorId };
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      return { success: false, calculatorId: this.calculatorId, error: error.message };
    }
  }

  parseComponent(content) {
    // Extract component name
    const componentMatch = content.match(/export default function (\w+)\(/);
    const componentName = componentMatch ? componentMatch[1] : 'Calculator';
    
    // Extract all imports (excluding "use client")
    const importSection = content.substring(
      content.indexOf('import'),
      content.indexOf('export default')
    );
    
    return {
      componentName,
      importSection: importSection.replace(/["']use client["'];?\s*/g, '').trim()
    };
  }

  generateClientComponent(parsed, originalContent) {
    const { componentName, importSection } = parsed;
    
    // Extract the entire component body (everything between function declaration and final closing brace)
    const functionStart = originalContent.indexOf('export default function');
    const functionBodyStart = originalContent.indexOf('{', functionStart) + 1;
    
    // Find the matching closing brace (last one before end of file)
    const lastClosingBrace = originalContent.lastIndexOf('}');
    const componentBody = originalContent.substring(functionBodyStart, lastClosingBrace).trim();
    
    // Remove the pathname and language extraction lines since we'll pass them as props
    let modifiedBody = componentBody;
    
    // Replace pathname/language hooks with props
    modifiedBody = modifiedBody.replace(
      /const pathname = usePathname\(\);?\s*const language = pathname\.split\(['"]\/['"]\)\[1\] \|\| ['"]en['"];?/g,
      '// Language passed as prop'
    );
    
    // Remove useCalculatorContent hooks since we'll use props
    modifiedBody = modifiedBody.replace(
      /const\s+{\s*content,\s*loading,\s*error:\s*contentError\s*}\s*=\s*useCalculatorContent\([^)]+\);?/g,
      '// Content passed as prop (initialContent)'
    );
    
    modifiedBody = modifiedBody.replace(
      /const\s+{\s*content:\s*guideContent,\s*loading:\s*guideLoading,\s*error:\s*guideError\s*}\s*=\s*useCalculatorContent\([^)]+\);?/g,
      '// Guide content passed as prop (initialGuideContent)'
    );
    
    // Update contentData to use initialContent
    modifiedBody = modifiedBody.replace(
      /const contentData = content \|\|/g,
      'const contentData = initialContent ||'
    );
    
    // Update guideData to use initialGuideContent  
    modifiedBody = modifiedBody.replace(
      /const guideData = guideContent \|\|/g,
      'const guideData = initialGuideContent ||'
    );

    return `"use client";

${importSection}

interface ${componentName}ClientProps {
  initialContent: any;
  initialGuideContent: any;
  language: string;
}

export default function ${componentName}Client({ 
  initialContent, 
  initialGuideContent,
  language 
}: ${componentName}ClientProps) {
  ${modifiedBody}
}
`;
  }

  generateServerComponent(parsed) {
    const { componentName } = parsed;
    
    return `import { headers } from "next/headers";
import { loadCalculatorContent } from "@/hooks/useCalculatorContent";
import ${componentName}Client from "./calculator-client";

export default async function ${componentName}() {
  // Get language from middleware-set header
  const headerList = await headers();
  const language = headerList.get('x-language') || 'en';

  // Server-side content fetching for better SEO
  const { content: uiContent } = await loadCalculatorContent(
    '${this.calculatorId}', 
    language, 
    "calculator-ui"
  );
  
  const { content: guideContent } = await loadCalculatorContent(
    '${this.calculatorId}', 
    language, 
    "calculator-guide"
  );

  return (
    <${componentName}Client
      initialContent={uiContent}
      initialGuideContent={guideContent}
      language={language}
    />
  );
}
`;
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🚀 Calculator Migration Script v2

Usage:
  node migrate-calculator-v2.js <path1> [path2] [path3]

Example (Windows paths):
  node migrate-calculator-v2.js "d:\\Zahan\\The Smart Calculaotr- Project\\smart-calculator\\app\\(calculators-by-category)\\financial\\compound-interest-calculator"

Example (relative paths):
  node migrate-calculator-v2.js "./app/(calculators-by-category)/financial/compound-interest-calculator"

Test on multiple calculators:
  node migrate-calculator-v2.js "./app/(calculators-by-category)/financial/compound-interest-calculator" "./app/(calculators-by-category)/health/bmi-calculator"
    `);
    process.exit(0);
  }

  console.log('🚀 Starting Migration Process...\n');
  
  const results = [];
  
  for (const calculatorPath of args) {
    const migration = new CalculatorMigrationV2(calculatorPath);
    const result = await migration.migrate();
    results.push(result);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\n✅ Successfully Migrated:');
    successful.forEach(s => console.log(`  - ${s.calculatorId}`));
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed:');
    failed.forEach(f => console.log(`  - ${f.calculatorId}: ${f.error}`));
  }
  
  console.log('\n📝 Next Steps:');
  console.log('  1. Test migrated calculators in browser');
  console.log('  2. Check all functionality works');
  console.log('  3. Verify SEO improvements (view page source)');
  console.log('  4. If issues, restore from .backup.tsx files');
  console.log('  5. Once verified, delete .backup.tsx files\n');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { CalculatorMigrationV2 };
