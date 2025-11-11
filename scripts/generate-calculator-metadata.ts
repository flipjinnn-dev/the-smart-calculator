import fs from 'fs';
import path from 'path';

// Read the calculator-data.ts file
const calculatorDataPath = path.join(process.cwd(), 'lib', 'calculator-data.ts');
const calculatorDataContent = fs.readFileSync(calculatorDataPath, 'utf-8');

// Extract calculator information using regex
const calculatorRegex = /id:\s*["']([^"']+?)["'][^}]*?name:\s*["']([^"']+?)["'][^}]*?description:\s*["']([^"']+?)["'][^}]*?href:\s*["']([^"']+?)["'][^}]*?category:\s*["']([^"']+?)["']/g;

interface Calculator {
  id: string;
  name: string;
  description: string;
  href: string;
  category: string;
  popular?: boolean;
}

const calculators: Calculator[] = [];
let match;
while ((match = calculatorRegex.exec(calculatorDataContent)) !== null) {
  calculators.push({
    id: match[1],
    name: match[2],
    description: match[3],
    href: match[4],
    category: match[5]
  });
}

// Also extract popular calculators
const popularRegex = /id:\s*["']([^"']+?)[^}]*?popular:\s*true/g;
const popularCalculators: string[] = [];
let popularMatch;
while ((popularMatch = popularRegex.exec(calculatorDataContent)) !== null) {
  popularCalculators.push(popularMatch[1]);
}

// Add popular flag to calculators
calculators.forEach(calc => {
  calc.popular = popularCalculators.includes(calc.id);
});

// Generate the metadata entries
const languageMappings: Record<string, Record<string, string>> = {
  'en': {
    'financial': 'financial',
    'health': 'health',
    'maths': 'maths',
    'physics': 'physics',
    'construction': 'construction',
    'food': 'food',
    'sports': 'sports',
    'other': 'other-calculators'
  },
  'br': {
    'financial': 'financeiro',
    'health': 'saude',
    'maths': 'matematica',
    'physics': 'fisica',
    'construction': 'construcao',
    'food': 'alimento',
    'sports': 'esportes',
    'other': 'outro'
  },
  'pl': {
    'financial': 'finansowy',
    'health': 'zdrowie',
    'maths': 'matematyka',
    'physics': 'fizyka',
    'construction': 'budowa',
    'food': 'zywnosc',
    'sports': 'sport',
    'other': 'inne'
  },
  'de': {
    'financial': 'finanziell',
    'health': 'gesundheit',
    'maths': 'mathe',
    'physics': 'physik',
    'construction': 'konstruktion',
    'food': 'essen',
    'sports': 'sport',
    'other': 'andere'
  }
};

// Function to convert calculator ID to file name (replace special characters)
function getCalculatorFileName(id: string): string {
  // Convert ID to file name format
  if (id === 'bmi') return 'bmi-calculator';
  if (id === 'loan') return 'loan-calculator';
  if (id === 'inflation') return 'inflation-calculator';
  if (id === 'interest-rate-calculator') return 'interest-rate-calculator';
  if (id === 'income-tax-calculator') return 'income-tax-calculator';
  if (id === 'salary-calculator') return 'salary-calculator';
  if (id === 'compound-interest') return 'compound-interest-calculator';
  if (id === 'interest') return 'interest-calculator';
  if (id === 'payment') return 'payment-calculator';
  if (id === 'auto-loan') return 'auto-loan-calculator';
  if (id === 'amortization') return 'amortization-calculator';
  if (id === 'currency') return 'currency-calculator';
  if (id === 'investment') return 'investment-calculator';
  if (id === 'retirement') return 'retirement-calculator';
  if (id === '401k-calculator') return '401k-calculator';
  if (id === 'calories-burned-calculator') return 'calories-burned-calculator';
  if (id === 'one-rep-max-calculator') return 'one-rep-max-calculator';
  if (id === 'protein-calculator') return 'protein-calculator';
  if (id === 'sales-tax-calculator') return 'sales-tax-calculator';
  if (id === 'overweight-calculator') return 'overweight-calculator';
  if (id === 'gfr-calculator') return 'gfr-calculator';
  if (id === 'bmr-calculator') return 'bmr-calculator';
  if (id === 'body-fat-calculator') return 'body-fat-calculator';
  if (id === 'body-type-calculator') return 'body-type-calculator';
  if (id === 'bsa-calculator') return 'bsa-calculator';
  if (id === 'calorie-calculator') return 'calorie-calculator';
  if (id === 'carbohydrate-calculator') return 'carbohydrate-calculator';
  if (id === 'compound-interest-calculator') return 'compound-interest-calculator';
  if (id === 'conception-calculator') return 'conception-calculator';
  if (id === 'credit-card-calculator') return 'credit-card-calculator';
  if (id === 'credit-card-payoff-calculator') return 'credit-card-payoff-calculator';
  if (id === 'currency-calculator') return 'currency-calculator';
  if (id === 'debt-payoff-calculator') return 'debt-payoff-calculator';
  if (id === 'due-date-calculator') return 'due-date-calculator';
  if (id === 'estate-tax-calculator') return 'estate-tax-calculator';
  if (id === 'fat-intake-calculator') return 'fat-intake-calculator';
  if (id === 'finance-calculator') return 'finance-calculator';
  if (id === 'healthy-weight-calculator') return 'healthy-weight-calculator';
  if (id === 'house-affordability-calculator') return 'house-affordability-calculator';
  if (id === 'ideal-weight-calculator') return 'ideal-weight-calculator';
  if (id === 'investment-calculator') return 'investment-calculator';
  if (id === 'lean-body-mass-calculator') return 'lean-body-mass-calculator';
  if (id === 'loan-calculator') return 'loan-calculator';
  if (id === 'macro-calculator') return 'macro-calculator';
  if (id === 'marriage-calculator') return 'marriage-calculator';
  if (id === 'mortgage-calculator') return 'mortgage-calculator';
  if (id === 'mortgage-payoff-calculator') return 'mortgage-payoff-calculator';
  if (id === 'one-rep-max-calculator') return 'one-rep-max-calculator';
  if (id === 'overweight-calculator') return 'overweight-calculator';
  if (id === 'ovulation-calculator') return 'ovulation-calculator';
  if (id === 'pace-calculator') return 'pace-calculator';
  if (id === 'payment-calculator') return 'payment-calculator';
  if (id === 'pension-calculator') return 'pension-calculator';
  if (id === 'period-calculator') return 'period-calculator';
  if (id === 'pregnancy-calculator') return 'pregnancy-calculator';
  if (id === 'pregnancy-conception-calculator') return 'pregnancy-conception-calculator';
  if (id === 'pregnancy-due-date') return 'pregnancy-due-date';
  if (id === 'pregnancy-weight-gain-calculator') return 'pregnancy-weight-gain-calculator';
  if (id === 'protein-calculator') return 'protein-calculator';
  if (id === 'rent-calculator') return 'rent-calculator';
  if (id === 'retirement-calculator') return 'retirement-calculator';
  if (id === 'sales-tax-calculator') return 'sales-tax-calculator';
  if (id === 'savings-calculator') return 'savings-calculator';
  if (id === 'social-security-calculator') return 'social-security-calculator';
  if (id === 'target-heart-rate-calculator') return 'target-heart-rate-calculator';
  if (id === 'tdee-calculator') return 'tdee-calculator';
  if (id === 'weight-watcher-calculator') return 'weight-watcher-calculator';
  
  // For other IDs, just add -calculator suffix if not already present
  return id.endsWith('-calculator') ? id : `${id}-calculator`;
}

// Function to generate slug for a calculator
function generateSlug(id: string, category: string, language: string): string {
  const fileName = getCalculatorFileName(id);
  
  if (language === 'en') {
    // For English, use the standard format
    if (category === 'other' && !id.includes('-calculator')) {
      // Special case for non-calculator pages in other category
      return `/${fileName}`;
    }
    const categoryPath = languageMappings[language][category] || category;
    return `/${categoryPath}/${fileName}`;
  } else {
    // For other languages, translate the category
    const translatedCategory = languageMappings[language][category] || category;
    return `/${language}/${translatedCategory}/${fileName}`;
  }
}

// Function to generate keywords
function generateKeywords(name: string, description: string): string {
  // Extract keywords from name and description
  const nameKeywords = name.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  const descKeywords = description.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  
  // Combine and deduplicate keywords
  const allKeywords = [...new Set([...nameKeywords, ...descKeywords])];
  
  // Filter out common words
  const commonWords = ['the', 'and', 'or', 'of', 'in', 'to', 'for', 'with', 'on', 'at', 'by', 'a', 'an', 'as', 'is', 'are', 'be', 'it', 'this', 'that', 'these', 'those'];
  const filteredKeywords = allKeywords.filter(word => !commonWords.includes(word) && word.length > 2);
  
  return filteredKeywords.slice(0, 10).join(', ');
}

// Generate the full metadata file content
let metadataContent = `// Meta data for all calculators across all languages
// Manual management for SEO control

interface CalculatorMetaData {
  [language: string]: {
    title: string;
    description: string;
    slug: string;
    keywords: string;
  };
}

interface CalculatorMeta {
  [calculatorId: string]: CalculatorMetaData;
}

export const calculatorsMeta: CalculatorMeta = {
`;

// Generate metadata entries for all calculators
calculators.forEach(calc => {
  const fileName = getCalculatorFileName(calc.id);
  
  metadataContent += `  '${fileName}': {\n`;
  
  // Add entries for each language
  ['en', 'br', 'pl', 'de'].forEach(lang => {
    const slug = generateSlug(calc.id, calc.category, lang);
    const keywords = generateKeywords(calc.name, calc.description);
    
    metadataContent += `    ${lang}: {\n`;
    metadataContent += `      title: "${calc.name}",\n`;
    metadataContent += `      description: "${calc.description}",\n`;
    metadataContent += `      slug: "${slug}",\n`;
    metadataContent += `      keywords: "${keywords}"\n`;
    metadataContent += `    },\n`;
  });
  
  metadataContent += `  },\n`;
});

metadataContent += `};\n`;

// Write the metadata to the file
const metadataFilePath = path.join(process.cwd(), 'meta', 'calculators.ts');
fs.writeFileSync(metadataFilePath, metadataContent);

console.log(`Successfully generated calculator metadata for ${calculators.length} calculators`);