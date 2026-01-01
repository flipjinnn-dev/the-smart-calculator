import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CalculatorMigrator {
  constructor(calculatorPath) {
    this.calculatorPath = path.resolve(calculatorPath);
    this.pagePath = path.join(this.calculatorPath, 'page.tsx');
    this.backupPath = path.join(this.calculatorPath, 'page.backup.tsx');
    this.calculatorId = path.basename(this.calculatorPath);
    this.clientFileName = `${this.calculatorId}-client.tsx`;
    this.clientPath = path.join(this.calculatorPath, this.clientFileName);
  }

  log(message, type = 'info') {
    const icons = { info: '📝', success: '✅', error: '❌', warning: '⚠️' };
    console.log(`${icons[type]} ${message}`);
  }

  validate() {
    if (!fs.existsSync(this.pagePath)) {
      this.log('page.tsx not found', 'error');
      return false;
    }

    if (fs.existsSync(this.clientPath)) {
      this.log('Client component already exists - skipping', 'warning');
      return false;
    }

    const content = fs.readFileSync(this.pagePath, 'utf-8');
    
    if (!content.includes('"use client"')) {
      this.log('No "use client" directive - might already be server component', 'warning');
      return false;
    }

    return true;
  }

  extractComponentName(content) {
    const match = content.match(/export default function (\w+)\s*\(/);
    return match ? match[1] : 'Calculator';
  }

  extractImports(content) {
    const importRegex = /import\s+(?:type\s+)?(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"][^'"]+['"];?/g;
    const allImports = content.match(importRegex) || [];
    
    const removeFromClient = ['useCalculatorContent', 'usePathname', 'type { Metadata }'];
    
    return allImports.filter(imp => {
      return !removeFromClient.some(pattern => imp.includes(pattern));
    });
  }

  extractComponentBody(content) {
    const functionStart = content.indexOf('export default function');
    if (functionStart === -1) return '';
    
    const openBrace = content.indexOf('{', functionStart);
    if (openBrace === -1) return '';
    
    let braceCount = 1;
    let i = openBrace + 1;
    
    while (i < content.length && braceCount > 0) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      i++;
    }
    
    let body = content.substring(openBrace + 1, i - 1);
    
    // Remove pathname and language detection
    body = body.replace(/const\s+pathname\s*=\s*usePathname\(\);?\s*/g, '');
    body = body.replace(/const\s+language\s*=\s*pathname\.split\(['"]\/['"]\)\[1\]\s*\|\|\s*['"]en['"];?\s*/g, '');
    
    // Remove all useCalculatorContent calls (multi-line safe)
    // Pattern 1: Full destructuring with loading/error
    body = body.replace(/const\s*{\s*content\s*,\s*loading\s*,\s*error:\s*contentError\s*}\s*=\s*useCalculatorContent\([^)]*(?:\([^)]*\)[^)]*)*\);?\s*/gs, '');
    
    // Pattern 2: Guide content destructuring (with/without loading/error)
    body = body.replace(/const\s*{\s*content:\s*guideContent(?:\s*,\s*loading:\s*guideLoading)?(?:\s*,\s*error:\s*guideError)?\s*}\s*=\s*useCalculatorContent\([^)]*(?:\([^)]*\)[^)]*)*\);?\s*/gs, '');
    
    // Pattern 3: Simple destructuring just content: guideContent
    body = body.replace(/const\s*{\s*content:\s*guideContent\s*}\s*=\s*useCalculatorContent\([^)]*(?:\([^)]*\)[^)]*)*\);?\s*/gs, '');
    
    return body.trim();
  }

  generateClientComponent(componentName, imports, body) {
    return `"use client";

${imports.join('\n')}

interface ${componentName}ClientProps {
  content: any;
  guideContent: any;
}

export default function ${componentName}Client({ content, guideContent }: ${componentName}ClientProps) {
  ${body}
}
`;
  }

  generateServerComponent(componentName) {
    return `import { headers } from "next/headers";
import ${componentName}Client from "./${this.clientFileName.replace('.tsx', '')}";

export default async function ${componentName}() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(\`@/app/content/calculator-ui/${this.calculatorId}/\${language}.json\`)).default;
  } catch {
    content = (await import(\`@/app/content/calculator-ui/${this.calculatorId}/en.json\`)).default;
  }
  
  try {
    guideContent = (await import(\`@/app/content/calculator-guide/${this.calculatorId}/\${language}.json\`)).default;
  } catch {
    guideContent = (await import(\`@/app/content/calculator-guide/${this.calculatorId}/en.json\`)).default;
  }

  return <${componentName}Client content={content} guideContent={guideContent} />;
}
`;
  }

  async migrate() {
    this.log(`Processing: ${this.calculatorId}`, 'info');

    if (!this.validate()) {
      return { success: false, calculatorId: this.calculatorId, skipped: true };
    }

    try {
      const originalContent = fs.readFileSync(this.pagePath, 'utf-8');
      
      // Backup
      fs.writeFileSync(this.backupPath, originalContent);
      this.log('Backup created', 'success');
      
      // Extract
      const componentName = this.extractComponentName(originalContent);
      const imports = this.extractImports(originalContent);
      const body = this.extractComponentBody(originalContent);
      
      // Generate
      const clientComponent = this.generateClientComponent(componentName, imports, body);
      const serverComponent = this.generateServerComponent(componentName);
      
      // Write
      fs.writeFileSync(this.clientPath, clientComponent);
      this.log(`Created: ${this.clientFileName}`, 'success');
      
      fs.writeFileSync(this.pagePath, serverComponent);
      this.log('Updated: page.tsx (server component)', 'success');
      
      return { success: true, calculatorId: this.calculatorId };
      
    } catch (error) {
      this.log(`Migration failed: ${error.message}`, 'error');
      
      if (fs.existsSync(this.backupPath)) {
        fs.copyFileSync(this.backupPath, this.pagePath);
        this.log('Restored from backup', 'warning');
      }
      
      return { success: false, calculatorId: this.calculatorId, error: error.message };
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node migrate-calculator-fixed.js <calculator-path> [path2] ...');
    process.exit(0);
  }

  console.log('\n📦 Starting Migration...\n');

  const results = [];
  for (const calculatorPath of args) {
    const migrator = new CalculatorMigrator(calculatorPath);
    const result = await migrator.migrate();
    results.push(result);
  }
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success && !r.skipped);
  const skipped = results.filter(r => r.skipped);
  
  console.log('\n📊 Summary:');
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`⏭️  Skipped: ${skipped.length}`);
  
  if (successful.length > 0) {
    console.log('\n✅ Migrated:');
    successful.forEach(s => console.log(`   • ${s.calculatorId}`));
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
