const fs = require('fs');
const path = require('path');

/**
 * Migration Script: Convert Client Component Calculator to Server/Client Split
 * 
 * This script:
 * 1. Extracts all client-side logic from page.tsx
 * 2. Creates calculator-client.tsx with interactive features
 * 3. Converts page.tsx to server component that pre-fetches content
 * 
 * Better SEO: Server component renders initial HTML with content
 * Client component handles interactivity after hydration
 */

class CalculatorMigration {
  constructor(calculatorPath) {
    this.calculatorPath = calculatorPath;
    this.pagePath = path.join(calculatorPath, 'page.tsx');
    this.clientPath = path.join(calculatorPath, 'calculator-client.tsx');
    this.layoutPath = path.join(calculatorPath, 'layout.tsx');
    
    // Extract calculator ID from path
    this.calculatorId = path.basename(calculatorPath);
    
    console.log(`\n📦 Processing: ${this.calculatorId}`);
  }

  async migrate() {
    try {
      // Step 1: Read existing page.tsx
      if (!fs.existsSync(this.pagePath)) {
        throw new Error(`page.tsx not found at ${this.pagePath}`);
      }

      const originalContent = fs.readFileSync(this.pagePath, 'utf-8');
      
      // Step 2: Extract calculator ID from layout or path
      const layoutContent = fs.existsSync(this.layoutPath) 
        ? fs.readFileSync(this.layoutPath, 'utf-8') 
        : '';

      // Step 3: Parse and extract components
      const parsed = this.parseCalculatorComponent(originalContent);
      
      // Step 4: Generate client component
      const clientComponent = this.generateClientComponent(parsed);
      
      // Step 5: Generate server component (new page.tsx)
      const serverComponent = this.generateServerComponent(parsed);
      
      // Step 6: Write files
      fs.writeFileSync(this.clientPath, clientComponent);
      console.log(`✅ Created: calculator-client.tsx`);
      
      fs.writeFileSync(this.pagePath, serverComponent);
      console.log(`✅ Updated: page.tsx (now server component)`);
      
      return {
        success: true,
        calculatorId: this.calculatorId,
        files: {
          client: this.clientPath,
          server: this.pagePath
        }
      };
      
    } catch (error) {
      console.error(`❌ Error migrating ${this.calculatorId}:`, error.message);
      return {
        success: false,
        calculatorId: this.calculatorId,
        error: error.message
      };
    }
  }

  parseCalculatorComponent(content) {
    // Extract imports
    const imports = this.extractImports(content);
    
    // Extract component name
    const componentMatch = content.match(/export default function (\w+)\(\)/);
    const componentName = componentMatch ? componentMatch[1] : 'Calculator';
    
    // Extract JSX return statement
    const jsxMatch = content.match(/return\s+(<>[\s\S]*?<\/>|<[\s\S]*?\/>)/);
    const jsxContent = jsxMatch ? jsxMatch[1] : '<div>Calculator content</div>';
    
    // Extract all hook calls and state
    const hookCalls = this.extractHooks(content);
    
    // Extract helper functions (like calculateCompoundInterest)
    const helperFunctions = this.extractHelperFunctions(content);
    
    return {
      componentName,
      imports,
      hookCalls,
      helperFunctions,
      jsxContent
    };
  }

  extractImports(content) {
    const importLines = content.match(/import\s+.*?from\s+['"].*?['"];?/g) || [];
    
    // Separate client and shared imports
    const clientImports = [];
    const sharedImports = [];
    
    importLines.forEach(line => {
      // Skip "use client" and Next type imports for client component
      if (line.includes('useCalculatorContent') || 
          line.includes('usePathname') ||
          line.includes('useState') ||
          line.includes('useEffect') ||
          line.includes('useRef') ||
          line.includes('useMobileScroll')) {
        clientImports.push(line);
      } else if (!line.includes('type { Metadata }')) {
        sharedImports.push(line);
      }
    });
    
    return { clientImports, sharedImports };
  }

  extractHooks(content) {
    const hooks = [];
    
    // Extract pathname/language detection
    if (content.includes('usePathname()')) {
      hooks.push('const pathname = usePathname();');
      hooks.push('const language = pathname.split(\'/\')[1] || \'en\';');
    }
    
    // Extract useCalculatorContent calls
    const contentHookMatches = content.matchAll(/const\s+{\s*([^}]+)\s*}\s*=\s*useCalculatorContent\([^)]+\);?/g);
    for (const match of contentHookMatches) {
      hooks.push(match[0]);
    }
    
    // Extract useState calls
    const stateMatches = content.matchAll(/const\s+\[([^\]]+)\]\s*=\s*useState\([^)]*\);?/g);
    for (const match of stateMatches) {
      hooks.push(match[0]);
    }
    
    // Extract useRef calls
    const refMatches = content.matchAll(/const\s+\w+\s*=\s*useRef[^;]+;/g);
    for (const match of refMatches) {
      hooks.push(match[0]);
    }
    
    // Extract custom hooks
    if (content.includes('useMobileScroll')) {
      hooks.push('const scrollToRef = useMobileScroll();');
    }
    
    return hooks;
  }

  extractHelperFunctions(content) {
    // Extract functions like calculateCompoundInterest, etc.
    const functionMatches = content.matchAll(/const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{[\s\S]*?^  };/gm);
    const functions = [];
    
    for (const match of functionMatches) {
      functions.push(match[0]);
    }
    
    return functions;
  }

  generateClientComponent(parsed) {
    const { componentName, imports, hookCalls, helperFunctions, jsxContent } = parsed;
    
    // Build client component
    return `"use client";

${imports.clientImports.join('\n')}
${imports.sharedImports.join('\n')}

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
  // Use pre-fetched content or fetch on client if needed
  const contentData = initialContent || {
    "pageTitle": "",
    "pageDescription": "",
    // ... fallback structure
  };

  const guideData = initialGuideContent || { 
    color: 'green', 
    sections: [], 
    faq: [] 
  };

  ${hookCalls.filter(h => !h.includes('useCalculatorContent') && !h.includes('pathname') && !h.includes('language')).join('\n  ')}

  ${helperFunctions.join('\n\n  ')}

  return ${jsxContent};
}
`;
  }

  generateServerComponent(parsed) {
    const { componentName } = parsed;
    
    return `import { headers } from "next/headers";
import { loadCalculatorContent } from "@/hooks/useCalculatorContent";
import ${componentName}Client from "./calculator-client";

export default async function ${componentName}() {
  // Get language from middleware header
  const headerList = await headers();
  const language = headerList.get('x-language') || 'en';

  // Pre-fetch content on server for better SEO
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

  // Pass pre-fetched content to client component
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

// CLI execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🚀 Calculator Migration Script

Usage:
  node migrate-calculator-to-server.js <calculator-path-1> [calculator-path-2] ...

Example:
  node migrate-calculator-to-server.js "d:\\Zahan\\The Smart Calculator- Project\\smart-calculator\\app\\(calculators-by-category)\\financial\\compound-interest-calculator"

Or test on multiple:
  node migrate-calculator-to-server.js "./app/(calculators-by-category)/financial/compound-interest-calculator" "./app/(calculators-by-category)/health/bmi-calculator"
    `);
    process.exit(0);
  }

  console.log('🚀 Starting Calculator Migration...\n');
  
  const results = [];
  
  for (const calculatorPath of args) {
    const migration = new CalculatorMigration(calculatorPath);
    const result = await migration.migrate();
    results.push(result);
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ Failed Migrations:');
    failed.forEach(f => {
      console.log(`  - ${f.calculatorId}: ${f.error}`);
    });
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { CalculatorMigration };
