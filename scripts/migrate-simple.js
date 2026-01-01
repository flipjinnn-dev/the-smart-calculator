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
    const lines = content.split('\n');
    const imports = [];
    
    for (const line of lines) {
      if (line.trim().startsWith('import ')) {
        // Skip these imports - not needed in client
        if (line.includes('useCalculatorContent') || 
            line.includes('usePathname') || 
            line.includes('type { Metadata }')) {
          continue;
        }
        imports.push(line);
      }
    }
    
    return imports;
  }

  extractComponentBody(content) {
    const lines = content.split('\n');
    const bodyLines = [];
    let inFunction = false;
    let braceCount = 0;
    let skipUntilSemicolon = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Start capturing after function declaration
      if (line.includes('export default function') && line.includes('(')) {
        inFunction = true;
        continue;
      }
      
      if (!inFunction) continue;
      
      // Track braces to know when function ends
      for (const char of line) {
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
      }
      
      // Function ended
      if (braceCount === 0 && inFunction) break;
      
      // Skip lines we don't want
      if (line.includes('const pathname = usePathname()')) continue;
      if (line.includes("pathname.split('/')[1]")) continue;
      
      // Handle useCalculatorContent - skip entire statement
      if (line.includes('useCalculatorContent')) {
        skipUntilSemicolon = true;
        continue;
      }
      
      if (skipUntilSemicolon) {
        if (line.includes(');')) {
          skipUntilSemicolon = false;
        }
        continue;
      }
      
      bodyLines.push(line);
    }
    
    return bodyLines.join('\n').trim();
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
    console.log('Usage: node migrate-simple.js <calculator-path> [path2] ...');
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
  
  if (failed.length > 0) {
    console.log('\n❌ Failed:');
    failed.forEach(f => console.log(`   • ${f.calculatorId}: ${f.error}`));
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
