import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Category to creator mapping
const CATEGORY_TO_CREATOR: Record<string, string> = {
  'food': 'jessica-adam',
  'financial': 'neo-nicholas',
  'sports': 'antonio-ares',
  'physics': 'realynn-reed',
  'construction': 'hudson-hale',
  'health': 'simon-stephen',
  'maths': 'felix-yacoub',
  'other-calculators': 'aiden-asher',
};

// Map folder names to category names
const FOLDER_TO_CATEGORY: Record<string, string> = {
  'financial': 'financial',
  'health': 'health',
  'maths': 'maths',
  'physics': 'physics',
  'construction': 'construction',
  'food': 'food',
  'sports': 'sports',
  '(other)': 'other-calculators',
};

interface CalculatorInfo {
  filePath: string;
  category: string;
  calculatorId: string;
  creatorSlug: string;
}

/**
 * Extract calculator ID from file path
 * Example: /financial/401k-calculator/page.tsx -> 401k-calculator
 */
function getCalculatorId(filePath: string): string {
  const parts = filePath.split(path.sep);
  const calculatorFolder = parts[parts.length - 2];
  return calculatorFolder;
}

/**
 * Extract category from file path
 * Example: /financial/401k-calculator/page.tsx -> financial
 */
function getCategory(filePath: string): string {
  const parts = filePath.split(path.sep);
  const categoryIndex = parts.findIndex(p => p === '(calculators-by-category)');
  if (categoryIndex !== -1 && categoryIndex + 1 < parts.length) {
    const folderName = parts[categoryIndex + 1];
    return FOLDER_TO_CATEGORY[folderName] || 'other-calculators';
  }
  return 'other-calculators';
}

/**
 * Check if file already has RatingProfileSection
 */
function hasRatingProfileSection(content: string): boolean {
  return content.includes('<RatingProfileSection') || content.includes('RatingProfileSection');
}

/**
 * Check if file has the import for RatingProfileSection
 */
function hasRatingProfileImport(content: string): boolean {
  return content.includes("from '@/components/rating-profile-section'") ||
         content.includes('from "@/components/rating-profile-section"');
}

/**
 * Add import statement for RatingProfileSection
 */
function addRatingProfileImport(content: string): string {
  // Find the last import statement
  const lines = content.split('\n');
  let lastImportIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ')) {
      lastImportIndex = i;
    }
  }
  
  if (lastImportIndex !== -1) {
    const importStatement = "import { RatingProfileSection } from '@/components/rating-profile-section';";
    lines.splice(lastImportIndex + 1, 0, importStatement);
    return lines.join('\n');
  }
  
  return content;
}

/**
 * Add RatingProfileSection above CalculatorGuide
 */
function addRatingProfileSection(
  content: string,
  calculatorId: string,
  creatorSlug: string
): string {
  // Find the position of CalculatorGuide - try multiple patterns
  const patterns = [
    // Pattern 1: With mt-0 space-y-8 (like 401k)
    /<div className="mt-0 space-y-8">\s*<CalculatorGuide/,
    // Pattern 2: With mt-8 (like mortgage)
    /<div className="mt-8">\s*<CalculatorGuide/,
    // Pattern 3: Direct CalculatorGuide
    /<CalculatorGuide/,
  ];
  
  let match = null;
  let matchedPattern = null;
  
  for (const pattern of patterns) {
    match = content.match(pattern);
    if (match) {
      matchedPattern = pattern;
      break;
    }
  }
  
  if (!match) {
    console.warn(`⚠️  Could not find CalculatorGuide in ${calculatorId}`);
    return content;
  }
  
  const insertPosition = match.index!;
  
  // Create the RatingProfileSection component
  const ratingProfileComponent = `
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="${calculatorId}"
            entityType="calculator"
            creatorSlug="${creatorSlug}"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          `;
  
  // Insert the component before the matched pattern
  const before = content.substring(0, insertPosition);
  const after = content.substring(insertPosition);
  
  return before + ratingProfileComponent + after;
}

/**
 * Process a single calculator file
 */
function processCalculatorFile(info: CalculatorInfo, dryRun: boolean = true): boolean {
  try {
    const content = fs.readFileSync(info.filePath, 'utf-8');
    
    // Check if already has RatingProfileSection
    if (hasRatingProfileSection(content)) {
      console.log(`⏭️  Skipping ${info.calculatorId} - already has RatingProfileSection`);
      return false;
    }
    
    let updatedContent = content;
    
    // Add import if needed
    if (!hasRatingProfileImport(content)) {
      updatedContent = addRatingProfileImport(updatedContent);
    }
    
    // Add RatingProfileSection
    updatedContent = addRatingProfileSection(updatedContent, info.calculatorId, info.creatorSlug);
    
    if (updatedContent === content) {
      console.log(`⚠️  No changes made to ${info.calculatorId}`);
      return false;
    }
    
    if (!dryRun) {
      fs.writeFileSync(info.filePath, updatedContent, 'utf-8');
      console.log(`✅ Updated ${info.calculatorId} (category: ${info.category}, creator: ${info.creatorSlug})`);
    } else {
      console.log(`🔍 [DRY RUN] Would update ${info.calculatorId} (category: ${info.category}, creator: ${info.creatorSlug})`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${info.filePath}:`, error);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--execute');
  const testMode = args.includes('--test');
  const testCalculator = args.find(arg => arg.startsWith('--calculator='))?.split('=')[1];
  
  console.log('🚀 Starting script to add RatingProfileSection to calculator pages...\n');
  
  if (dryRun) {
    console.log('📋 Running in DRY RUN mode. Use --execute to apply changes.\n');
  }
  
  if (testMode) {
    console.log(`🧪 Running in TEST mode. Will only process: ${testCalculator || '401k-calculator'}\n`);
  }
  
  // Find all calculator page.tsx files
  const calculatorPages = await glob(
    'app/(calculators-by-category)/**/page.tsx',
    { cwd: process.cwd() }
  );
  
  console.log(`Found ${calculatorPages.length} calculator pages\n`);
  
  // Process each calculator
  const calculators: CalculatorInfo[] = [];
  
  for (const pagePath of calculatorPages) {
    const fullPath = path.join(process.cwd(), pagePath);
    const category = getCategory(pagePath);
    const calculatorId = getCalculatorId(pagePath);
    const creatorSlug = CATEGORY_TO_CREATOR[category] || 'aiden-asher';
    
    calculators.push({
      filePath: fullPath,
      category,
      calculatorId,
      creatorSlug,
    });
  }
  
  // Filter for test mode
  let calculatorsToProcess = calculators;
  if (testMode) {
    const targetCalculator = testCalculator || '401k-calculator';
    calculatorsToProcess = calculators.filter(c => c.calculatorId === targetCalculator);
    
    if (calculatorsToProcess.length === 0) {
      console.error(`❌ Calculator "${targetCalculator}" not found!`);
      process.exit(1);
    }
  }
  
  // Process calculators
  let successCount = 0;
  let skipCount = 0;
  
  for (const calc of calculatorsToProcess) {
    const success = processCalculatorFile(calc, dryRun);
    if (success) {
      successCount++;
    } else {
      skipCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`📊 Summary:`);
  console.log(`   Total calculators: ${calculatorsToProcess.length}`);
  console.log(`   ${dryRun ? 'Would update' : 'Updated'}: ${successCount}`);
  console.log(`   Skipped: ${skipCount}`);
  console.log('='.repeat(60));
  
  if (dryRun && successCount > 0) {
    console.log('\n💡 To apply changes, run with --execute flag');
  }
  
  if (testMode) {
    console.log('\n💡 To process all calculators, remove --test flag');
  }
}

main().catch(console.error);
