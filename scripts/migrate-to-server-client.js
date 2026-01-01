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
  
  for (let i = functionStart; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      functionEnd = i;
      break;
    }
  }
  
  let functionBody = content.substring(functionStart, functionEnd);
  
  // Remove usePathname and language extraction
  functionBody = functionBody.replace(/const\s+pathname\s*=\s*usePathname\(\);?\s*\n/g, '');
  functionBody = functionBody.replace(/const\s+language\s*=\s*pathname\.split\(['"]\/['"]\)\[1\]\s*\|\|\s*['"]en['"];?\s*\n/g, '');
  
  // Remove all useCalculatorContent calls
  functionBody = functionBody.replace(/const\s*{\s*content\s*(?:,\s*loading\s*)?(?:,\s*error:\s*\w+\s*)?\}\s*=\s*useCalculatorContent\([^)]*\);?\s*\n/g, '');
  functionBody = functionBody.replace(/const\s*{\s*content:\s*\w+\s*(?:,\s*loading:\s*\w+\s*)?(?:,\s*error:\s*\w+\s*)?\}\s*=\s*useCalculatorContent\([^)]*\);?\s*\n/g, '');
  
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
  
  clientComponent += functionBody;
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
    content = (await import(\`@/app/content/calculator-ui/${calculatorSlug}/en.json\`)).default;
  }
  
  try {
    guideContent = (await import(\`@/app/content/calculator-guide/${calculatorSlug}/\${language}.json\`)).default;
  } catch {
    guideContent = (await import(\`@/app/content/calculator-guide/${calculatorSlug}/en.json\`)).default;
  }

  return <${clientComponentName} content={content} guideContent={guideContent} />;
}
`;
}

// Main execution
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node migrate-to-server-client.js <calculator-path>');
  console.log('Example: node migrate-to-server-client.js app/(calculators-by-category)/construction/board-foot-calculator');
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
