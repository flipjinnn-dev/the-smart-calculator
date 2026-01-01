#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Production-Ready Calculator Migration Script
 * 
 * Converts client component calculators to server/client split architecture
 * for better SEO and initial page load performance.
 * 
 * Architecture:
 * - page.tsx (Server Component) → Fetches content, passes to client
 * - calculator-client.tsx (Client Component) → Handles all interactivity
 */

class CalculatorMigrator {
  constructor(calculatorPath) {
    this.calculatorPath = path.resolve(calculatorPath);
    this.pagePath = path.join(this.calculatorPath, 'page.tsx');
    this.clientPath = path.join(this.calculatorPath, 'calculator-client.tsx');
    this.backupPath = path.join(this.calculatorPath, 'page.backup.tsx');
    this.calculatorId = path.basename(this.calculatorPath);
    
    this.errors = [];
    this.warnings = [];
  }

  log(message, type = 'info') {
    const icons = { info: '📝', success: '✅', error: '❌', warning: '⚠️' };
    console.log(`${icons[type]} ${message}`);
  }

  validate() {
    this.log(`Validating: ${this.calculatorId}`, 'info');
    
    // Check if page.tsx exists
    if (!fs.existsSync(this.pagePath)) {
      this.errors.push('page.tsx not found');
      return false;
    }

    // Check if already migrated
    if (fs.existsSync(this.clientPath)) {
      this.warnings.push('calculator-client.tsx already exists - skipping');
      return false;
    }

    // Read and validate content
    const content = fs.readFileSync(this.pagePath, 'utf-8');
    
    if (!content.includes('"use client"')) {
      this.warnings.push('No "use client" directive found - might already be server component');
      return false;
    }

    if (!content.includes('useCalculatorContent')) {
      this.errors.push('useCalculatorContent hook not found - unexpected structure');
      return false;
    }

    return true;
  }

  async migrate() {
    this.log(`\n${'='.repeat(60)}`, 'info');
    this.log(`Processing: ${this.calculatorId}`, 'info');
    this.log('='.repeat(60), 'info');

    // Validate before proceeding
    if (!this.validate()) {
      if (this.errors.length > 0) {
        this.errors.forEach(err => this.log(err, 'error'));
        return { success: false, calculatorId: this.calculatorId, errors: this.errors };
      }
      if (this.warnings.length > 0) {
        this.warnings.forEach(warn => this.log(warn, 'warning'));
        return { success: false, calculatorId: this.calculatorId, skipped: true };
      }
    }

    try {
      // Read original content
      const originalContent = fs.readFileSync(this.pagePath, 'utf-8');
      
      // Create backup
      fs.writeFileSync(this.backupPath, originalContent);
      this.log('Backup created: page.backup.tsx', 'success');
      
      // Extract component details
      const componentName = this.extractComponentName(originalContent);
      const imports = this.extractAndFilterImports(originalContent);
      const componentBody = this.extractComponentBody(originalContent);
      
      // Generate new files
      const clientComponent = this.generateClientComponent(
        componentName, 
        imports, 
        componentBody
      );
      const serverComponent = this.generateServerComponent(componentName);
      
      // Write files
      fs.writeFileSync(this.clientPath, clientComponent);
      this.log('Created: calculator-client.tsx', 'success');
      
      fs.writeFileSync(this.pagePath, serverComponent);
      this.log('Updated: page.tsx (now server component)', 'success');
      
      this.log('Migration completed successfully!', 'success');
      
      return { 
        success: true, 
        calculatorId: this.calculatorId,
        files: {
          server: this.pagePath,
          client: this.clientPath,
          backup: this.backupPath
        }
      };
      
    } catch (error) {
      this.log(`Migration failed: ${error.message}`, 'error');
      
      // Restore from backup if it exists
      if (fs.existsSync(this.backupPath)) {
        fs.copyFileSync(this.backupPath, this.pagePath);
        this.log('Restored from backup', 'warning');
      }
      
      return { 
        success: false, 
        calculatorId: this.calculatorId, 
        error: error.message 
      };
    }
  }

  extractComponentName(content) {
    const match = content.match(/export default function (\w+)\s*\(/);
    return match ? match[1] : 'Calculator';
  }

  extractAndFilterImports(content) {
    // Find all import statements
    const importRegex = /import\s+(?:type\s+)?(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"][^'"]+['"];?/g;
    const imports = content.match(importRegex) || [];
    
    // For client component, we need to REMOVE these imports since we're passing props:
    const removeFromClient = [
      'useCalculatorContent',  // Content passed as props
      'usePathname',           // Language passed as prop
      'type { Metadata }'      // Not needed in client
    ];
    
    const clientImports = [];
    
    imports.forEach(imp => {
      // Skip imports that should be removed
      const shouldRemove = removeFromClient.some(pattern => imp.includes(pattern));
      
      if (!shouldRemove) {
        // Keep all other imports (useState, useRef, UI components, etc)
        clientImports.push(imp);
      }
    });
    
    return { clientImports };
  }

  extractComponentBody(content) {
    // Find the function declaration
    const functionStart = content.indexOf('export default function');
    if (functionStart === -1) return '';
    
    // Find the opening brace of the function
    const openBrace = content.indexOf('{', functionStart);
    if (openBrace === -1) return '';
    
    // Find the matching closing brace
    let braceCount = 1;
    let i = openBrace + 1;
    
    while (i < content.length && braceCount > 0) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      i++;
    }
    
    // Extract body (between braces)
    const body = content.substring(openBrace + 1, i - 1);
    
    return this.transformBodyForClient(body);
  }

  transformBodyForClient(body) {
    let transformed = body;
    
    // Remove pathname hook usage - we'll pass language as prop
    transformed = transformed.replace(
      /const\s+pathname\s*=\s*usePathname\(\);?\s*/g,
      ''
    );
    
    transformed = transformed.replace(
      /const\s+language\s*=\s*pathname\.split\(['"]\/['"]\)\[1\]\s*\|\|\s*['"]en['"];?\s*/g,
      '// Language passed as prop\n  '
    );
    
    // Remove useCalculatorContent for UI content
    transformed = transformed.replace(
      /const\s*{\s*content\s*,\s*loading\s*,\s*error:\s*contentError\s*}\s*=\s*useCalculatorContent\([^)]+\);?\s*/g,
      '// UI content passed as initialContent prop\n  '
    );
    
    // Remove useCalculatorContent for guide content

  // Validate before proceeding
  if (!this.validate()) {
    if (this.errors.length > 0) {
      this.errors.forEach(err => this.log(err, 'error'));
      return { success: false, calculatorId: this.calculatorId, errors: this.errors };
    }
    if (this.warnings.length > 0) {
      this.warnings.forEach(warn => this.log(warn, 'warning'));
      return { success: false, calculatorId: this.calculatorId, skipped: true };
    }
  }

  try {
    // Read original content
    const originalContent = fs.readFileSync(this.pagePath, 'utf-8');
    
    // Create backup
    fs.writeFileSync(this.backupPath, originalContent);
    this.log('Backup created: page.backup.tsx', 'success');
    
    // Extract component details
    const componentName = this.extractComponentName(originalContent);
    const imports = this.extractAndFilterImports(originalContent);
    const componentBody = this.extractComponentBody(originalContent);
    
    // Generate new files
    const clientComponent = this.generateClientComponent(
      componentName, 
      imports, 
      componentBody
    );
    const serverComponent = this.generateServerComponent(componentName);
    
    // Write files
    fs.writeFileSync(this.clientPath, clientComponent);
    this.log('Created: calculator-client.tsx', 'success');
    
    fs.writeFileSync(this.pagePath, serverComponent);
    this.log('Updated: page.tsx (now server component)', 'success');
    
    this.log('Migration completed successfully!', 'success');
    
    return { 
      success: true, 
      calculatorId: this.calculatorId,
      files: {
        server: this.pagePath,
        client: this.clientPath,
        backup: this.backupPath
      }
    };
    
  } catch (error) {
    this.log(`Migration failed: ${error.message}`, 'error');
    
    // Restore from backup if it exists
    if (fs.existsSync(this.backupPath)) {
      fs.copyFileSync(this.backupPath, this.pagePath);
      this.log('Restored from backup', 'warning');
    }
    
    return { 
      success: false, 
      calculatorId: this.calculatorId, 
      error: error.message 
    };
  }
}

extractComponentName(content) {
  const match = content.match(/export default function (\w+)\s*\(/);
  return match ? match[1] : 'Calculator';
}

extractAndFilterImports(content) {
  // Find all import statements
  const importRegex = /import\s+(?:type\s+)?(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"][^'"]+['"];?/g;
  const imports = content.match(importRegex) || [];
  
  // For client component, we need to REMOVE these imports since we're passing props:
  const removeFromClient = [
    'useCalculatorContent',  // Content passed as props
    'usePathname',           // Language passed as prop
    'type { Metadata }'      // Not needed in client
  ];
  
  const clientImports = [];
  
  imports.forEach(imp => {
    // Skip imports that should be removed
    const shouldRemove = removeFromClient.some(pattern => imp.includes(pattern));
    
    if (!shouldRemove) {
      // Keep all other imports (useState, useRef, UI components, etc)
      clientImports.push(imp);
    }
  });
  
  return { clientImports };
}

extractComponentBody(content) {
  // Find the function declaration
  const functionStart = content.indexOf('export default function');
  if (functionStart === -1) return '';
  
  // Find the opening brace of the function
  const openBrace = content.indexOf('{', functionStart);
  if (openBrace === -1) return '';
  
  // Find the matching closing brace
  let braceCount = 1;
  let i = openBrace + 1;
  
  while (i < content.length && braceCount > 0) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    i++;
  }
  
  // Extract body (between braces)
  const body = content.substring(openBrace + 1, i - 1);
  
  return this.transformBodyForClient(body);
}

transformBodyForClient(body) {
  let transformed = body;
  
  // Remove pathname hook usage - we'll pass language as prop
  transformed = transformed.replace(
    /const\s+pathname\s*=\s*usePathname\(\);?\s*/g,
    ''
  );
  
  transformed = transformed.replace(
    /const\s+language\s*=\s*pathname\.split\(['"]\/['"]\)\[1\]\s*\|\|\s*['"]en['"];?\s*/g,
    '// Language passed as prop\n  '
  );
  
  // Content is already passed as props - keep as is
  let transformedBodyContent = body;
  
  return transformedBodyContent.trim();
}

generateClientComponent(componentName, imports, body) {
  return `"use client";

${imports.clientImports.join('\n')}

interface ${componentName}ClientProps {
  content: any;
  guideContent: any;
}

export default function ${componentName}Client({ content, guideContent }: ${componentName}ClientProps) {
  ${body}
}
`;
  }

  generateServerComponent(componentName, clientFileName) {
    return `import { headers } from "next/headers";
import ${componentName}Client from "./${clientFileName}";

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
}

// ============================================================================
// CLI Interface
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║        Calculator Migration Script - Server Component         ║
╚═══════════════════════════════════════════════════════════════╝

📖 Purpose:
   Convert client component calculators to server/client split for
   better SEO, faster initial loads, and improved performance.

📝 Usage:
   node migrate-to-server-component.js <calculator-path> [path2] [path3]...

📂 Example (Absolute Path):
   node migrate-to-server-component.js "D:\\Zahan\\The Smart Calculaotr- Project\\smart-calculator\\app\\(calculators-by-category)\\financial\\compound-interest-calculator"

📂 Example (Relative Path):
   node migrate-to-server-component.js "./app/(calculators-by-category)/financial/compound-interest-calculator"

🔥 Test on Multiple (Recommended for initial testing):
   node migrate-to-server-component.js "./app/(calculators-by-category)/financial/compound-interest-calculator" "./app/(calculators-by-category)/health/bmi-calculator" "./app/(calculators-by-category)/maths/percentage-calculator"

⚠️  Important:
   - Creates backup as page.backup.tsx
   - Test thoroughly after migration
   - Restore from backup if issues occur
   - Delete backups once verified

🔍 What Changes:
   ✓ page.tsx → Server Component (SEO-friendly)
   ✓ calculator-client.tsx → Client Component (interactive)
   ✓ Content fetched on server (better performance)
   ✓ Language from middleware header
   ✓ Maintains all functionality
`);
    process.exit(0);
  }

  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║              Starting Calculator Migration                     ║
╚═══════════════════════════════════════════════════════════════╝
`);

  const results = [];
  
  for (const calculatorPath of args) {
    const migrator = new CalculatorMigrator(calculatorPath);
    const result = await migrator.migrate();
    results.push(result);
  }
  
  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 MIGRATION SUMMARY');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success && !r.skipped);
  const skipped = results.filter(r => r.skipped);
  
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`⏭️  Skipped: ${skipped.length}`);
  
  if (successful.length > 0) {
    console.log('\n✅ Successfully Migrated:');
    successful.forEach(s => {
      console.log(`   • ${s.calculatorId}`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed Migrations:');
    failed.forEach(f => {
      console.log(`   • ${f.calculatorId}`);
      console.log(`     Error: ${f.error || f.errors?.join(', ')}`);
    });
  }
  
  if (skipped.length > 0) {
    console.log('\n⏭️  Skipped (Already Migrated or No Changes Needed):');
    skipped.forEach(s => {
      console.log(`   • ${s.calculatorId}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📋 NEXT STEPS:');
  console.log('='.repeat(60));
  console.log(`
1. 🧪 Test each migrated calculator in browser:
   - Check all inputs work
   - Verify calculations are correct
   - Test language switching
   - Ensure mobile scrolling works

2. 🔍 Verify SEO improvements:
   - View page source (Ctrl+U in browser)
   - Content should be visible in HTML (not just client-side)
   - Check Google Search Console after deployment

3. ✅ If all working correctly:
   - Delete .backup.tsx files
   - Commit changes to git
   - Deploy to production

4. 🔄 If issues found:
   - Restore from page.backup.tsx
   - Report issue for script refinement
   - Try manual migration for problematic calculators

5. 📈 Once 2-3 verified, run on remaining calculators
`);
}

// Execute
main().catch(err => {
  console.error('💥 Fatal Error:', err);
  process.exit(1);
});

export { CalculatorMigrator };
