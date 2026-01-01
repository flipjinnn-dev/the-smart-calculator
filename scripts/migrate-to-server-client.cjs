const fs = require('fs');
const path = require('path');

function migrateCalculator(calculatorPath) {
  const pagePath = path.join(calculatorPath, 'page.tsx');
  const backupPath = path.join(calculatorPath, 'page.backup.tsx');
  
  // Check if already migrated
  const clientPath = path.join(calculatorPath, path.basename(calculatorPath) + '-client.tsx');
  if (fs.existsSync(clientPath)) {
    console.log(`⚠️  Skipping ${path.basename(calculatorPath)} - client component already exists`);
    return false;
  }
  
  // Read original file
  if (!fs.existsSync(pagePath)) {
    console.log(`❌ File not found: ${pagePath}`);
    return false;
  }
  
  const originalContent = fs.readFileSync(pagePath, 'utf-8');
  
  // Check if already a server component
  if (!originalContent.includes('"use client"')) {
    console.log(`⚠️  Skipping ${path.basename(calculatorPath)} - already a server component`);
    return false;
  }
  
  // Create backup
  if (!fs.existsSync(backupPath)) {
    fs.writeFileSync(backupPath, originalContent);
    console.log(`✓ Created backup: ${backupPath}`);
  }
  
  // Extract calculator name from path
  const calculatorSlug = path.basename(calculatorPath);
  const clientComponentName = calculatorSlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('') + 'Client';
  
  // Create client component
  const clientContent = createClientComponent(originalContent, clientComponentName);
  fs.writeFileSync(clientPath, clientContent);
  console.log(`✓ Created client component: ${clientPath}`);
  
  // Create server component
  const serverContent = createServerComponent(calculatorSlug, clientComponentName);
  fs.writeFileSync(pagePath, serverContent);
  console.log(`✓ Created server component: ${pagePath}`);
  
  return true;
}

function createClientComponent(originalContent, componentName) {
  let content = originalContent;
  
  // Remove "use client" directive
  content = content.replace(/["']use client["'];?\s*\n/g, '');
  
  // Remove useCalculatorContent and usePathname imports
  content = content.replace(/import\s+{\s*useCalculatorContent\s*}\s+from\s+["']@\/hooks\/useCalculatorContent["'];?\s*\n/g, '');
  content = content.replace(/import\s+{\s*usePathname\s*}\s+from\s+["']next\/navigation["'];?\s*\n/g, '');
  
  // Find the export default function line
  const functionMatch = content.match(/export\s+default\s+function\s+(\w+)\s*\(/);
  if (!functionMatch) {
    throw new Error('Could not find export default function');
  }
  
  const originalFunctionName = functionMatch[1];
  
  // Extract everything before the function
  const beforeFunction = content.substring(0, functionMatch.index);
  
  // Extract the function body
  const afterFunctionStart = content.substring(functionMatch.index);
  const functionBodyMatch = afterFunctionStart.match(/export\s+default\s+function\s+\w+\s*\([^)]*\)\s*{/);
  if (!functionBodyMatch) {
    throw new Error('Could not parse function signature');
  }
  
  const functionStart = functionMatch.index + functionBodyMatch[0].length;
  let braceCount = 1;
  let functionEnd = functionStart;
  let inString = false;
  let stringChar = '';
  
  for (let i = functionStart; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i-1] : '';
    
    // Handle strings to avoid counting braces inside strings
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = '';
      }
    }
    
    if (!inString) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
      if (braceCount === 0) {
        functionEnd = i;
        break;
      }
    }
  }
  
  let functionBody = content.substring(functionStart, functionEnd);
  
  // Remove usePathname and language extraction
  functionBody = functionBody.replace(/const\s+pathname\s*=\s*usePathname\(\);?\s*\n/g, '');
  functionBody = functionBody.replace(/const\s+language\s*=\s*pathname\.split\(['"]\/['"]\)\[1\]\s*\|\|\s*['"]en['"];?\s*\n/g, '');
  
  // Remove all useCalculatorContent calls - handle multi-line calls
  // Match the entire call including parameters that span multiple lines
  functionBody = functionBody.replace(/const\s*{\s*content\s*(?:,\s*loading\s*)?(?:,\s*error:\s*\w+\s*)?\}\s*=\s*useCalculatorContent\s*\([^)]*\)\s*;?\s*\n/gs, '');
  functionBody = functionBody.replace(/const\s*{\s*content:\s*\w+\s*(?:,\s*loading:\s*\w+\s*)?(?:,\s*error:\s*\w+\s*)?\}\s*=\s*useCalculatorContent\s*\([^)]*(?:\n[^)]*)*\)\s*;?\s*\n/gs, '');
  
  // Remove any leftover lines from incomplete removal
  functionBody = functionBody.replace(/^\s*["']calculator-guide["']\s*\/\/.*\n/gm, '');
  functionBody = functionBody.replace(/^\s*["']calculator-ui["']\s*\/\/.*\n/gm, '');
  functionBody = functionBody.replace(/^\s*\)\s*;\s*\n/gm, '');
  functionBody = functionBody.replace(/\s*["']calculator-guide["']\s*\/\/[^\n]*\/\/[^\n]*/g, '');
  
  // Remove existing guideData and contentData definitions to avoid duplicates
  // Use a function to properly handle nested braces in object literals
  const removeConstDefinition = (body, varName) => {
    const regex = new RegExp(`const\\s+${varName}\\s*=\\s*\\w+\\s*\\|\\|\\s*{`, 'g');
    let result = body;
    let match;
    
    while ((match = regex.exec(result)) !== null) {
      const startPos = match.index;
      let braceCount = 1;
      let endPos = match.index + match[0].length;
      
      for (let i = endPos; i < result.length && braceCount > 0; i++) {
        if (result[i] === '{') braceCount++;
        if (result[i] === '}') braceCount--;
        if (braceCount === 0) {
          endPos = i + 1;
          // Skip any trailing semicolons and newlines
          while (endPos < result.length && (result[endPos] === ';' || result[endPos] === '\n' || result[endPos] === ' ')) {
            endPos++;
          }
          break;
        }
      }
      
      result = result.substring(0, startPos) + result.substring(endPos);
      regex.lastIndex = 0;
    }
    
    return result;
  };
  
  functionBody = removeConstDefinition(functionBody, 'guideData');
  functionBody = removeConstDefinition(functionBody, 'contentData');
  
  // Remove "Use content or fallback to defaults" comment
  functionBody = functionBody.replace(/\/\/\s*Use\s+content\s+or\s+fallback\s+to\s+defaults\s*\n/gi, '');
  
  // Remove any references to loading and error variables that no longer exist
  // Handle multi-line if statements with proper brace matching
  const removeIfBlock = (body, varName) => {
    const regex = new RegExp(`if\\s*\\(\\s*${varName}\\s*\\)\\s*{`, 'g');
    let result = body;
    let match;
    
    while ((match = regex.exec(result)) !== null) {
      const startPos = match.index;
      let braceCount = 1;
      let endPos = match.index + match[0].length;
      
      for (let i = endPos; i < result.length && braceCount > 0; i++) {
        if (result[i] === '{') braceCount++;
        if (result[i] === '}') braceCount--;
        if (braceCount === 0) {
          endPos = i + 1;
          break;
        }
      }
      
      // Remove the entire if block including trailing newlines
      result = result.substring(0, startPos) + result.substring(endPos).replace(/^\s*\n/, '');
      regex.lastIndex = 0; // Reset regex
    }
    
    return result;
  };
  
  functionBody = removeIfBlock(functionBody, 'loading');
  functionBody = removeIfBlock(functionBody, 'contentError');
  functionBody = removeIfBlock(functionBody, 'guideLoading');
  functionBody = removeIfBlock(functionBody, 'guideError');
  
  // Remove orphaned comments related to loading/error states
  functionBody = functionBody.replace(/\/\/\s*Show\s+loading\s+state\s*\n/gi, '');
  functionBody = functionBody.replace(/\/\/\s*Show\s+error\s+if\s+content\s+failed\s+to\s+load\s*\n/gi, '');
  
  // Build the new client component
  let clientComponent = '"use client";\n\n';
  clientComponent += beforeFunction;
  clientComponent += '\ninterface ' + componentName + 'Props {\n';
  clientComponent += '  content: any;\n';
  clientComponent += '  guideContent: any;\n';
  clientComponent += '}\n\n';
  clientComponent += 'export default function ' + componentName + '({ content, guideContent }: ' + componentName + 'Props) {\n';
  
  // Add guideData fallback
  clientComponent += '  const guideData = guideContent || {\n';
  clientComponent += '    color: \'blue\',\n';
  clientComponent += '    sections: [],\n';
  clientComponent += '    faq: []\n';
  clientComponent += '  };\n';
  clientComponent += '  \n';
  
  // Add contentData fallback
  clientComponent += '  const contentData = content || {};\n';
  clientComponent += '  \n';
  
  // Ensure function body ends properly
  let finalBody = functionBody.trim();
  
  // Check if the body ends with a return statement that needs closing
  // If it ends with JSX closing tag but no closing paren/semicolon, add them
  // But skip if it ends with fragment </> or already has );
  if (finalBody.includes('return (') && 
      !finalBody.match(/\);?\s*$/) && 
      !finalBody.match(/<\/>\s*;\s*$/)) {
    finalBody += '\n  );';
  }
  
  // If it ends with </> without semicolon, it needs to be </>;
  if (finalBody.match(/<\/>\s*$/) && !finalBody.match(/<\/>\s*;\s*$/)) {
    finalBody = finalBody.replace(/<\/>\s*$/, '</>;\n');
  }
  
  clientComponent += finalBody;
  clientComponent += '\n}\n';
  
  return clientComponent;
}

function createServerComponent(calculatorSlug, clientComponentName) {
  const clientFileName = calculatorSlug + '-client';
  
  return `import { headers } from "next/headers";
import ${clientComponentName} from "./${clientFileName}";

export default async function ${calculatorSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Calculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(\`@/app/content/calculator-ui/${calculatorSlug}/\${language}.json\`)).default;
  } catch {
    try {
      content = (await import(\`@/app/content/calculator-ui/${calculatorSlug}/en.json\`)).default;
    } catch {
      content = {};
    }
  }
  
  try {
    guideContent = (await import(\`@/app/content/calculator-guide/${calculatorSlug}/\${language}.json\`)).default;
  } catch {
    try {
      guideContent = (await import(\`@/app/content/calculator-guide/${calculatorSlug}/en.json\`)).default;
    } catch {
      guideContent = { color: 'blue', sections: [], faq: [] };
    }
  }

  return <${clientComponentName} content={content} guideContent={guideContent} />;
}
`;
}

// Main execution
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node migrate-to-server-client.cjs <calculator-path>');
  console.log('Example: node migrate-to-server-client.cjs app/(calculators-by-category)/construction/board-foot-calculator');
  process.exit(1);
}

const calculatorPath = args[0];
console.log(`\n🔄 Migrating calculator: ${path.basename(calculatorPath)}\n`);

try {
  const success = migrateCalculator(calculatorPath);
  if (success) {
    console.log('\n✅ Migration completed successfully!\n');
  } else {
    console.log('\n⚠️  Migration skipped\n');
  }
} catch (error) {
  console.error('\n❌ Migration failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}
