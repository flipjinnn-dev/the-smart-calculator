const fs = require('fs');
const path = require('path');

// Base directory for the app
const appDir = path.join(__dirname, '..', 'app');

// Mapping of calculator directory names to their IDs
const calculatorDirToId = {
  '401k-calculator': '401k-calculator',
  'age-calculator': 'age-calculator',
  'amortization-calculator': 'amortization-calculator',
  'annuity-calculator': 'annuity-calculator',
  'annuity-payout-calculator': 'annuity-payout-calculator',
  'auto-loan-calculator': 'auto-loan-calculator',
  'bmi-calculator': 'bmi-calculator',
  'bmr-calculator': 'bmr-calculator',
  'board-foot-calculator': 'board-foot-calculator',
  'body-fat-calculator': 'body-fat-calculator',
  'compound-interest-calculator': 'compound-interest-calculator',
  'credit-card-calculator': 'credit-card-calculator',
  'credit-card-payoff-calculator': 'credit-card-payoff-calculator',
  'cubic-yard-calculator': 'cubic-yard-calculator',
  'currency-calculator': 'currency-calculator',
  'debt-payoff-calculator': 'debt-payoff-calculator',
  'enterprise-seo-roi-calculator': 'enterprise-seo-roi-calculator',
  'estate-tax-calculator': 'estate-tax-calculator',
  'finance-calculator': 'finance-calculator',
  'gallons-per-square-foot-calculator': 'gallons-per-square-foot-calculator',
  'gpa-calculator': 'gpa-calculator',
  'height-calculator': 'height-calculator',
  'house-affordability-calculator': 'house-affordability-calculator',
  'income-tax-calculator': 'income-tax-calculator',
  'indiana-child-support-calculator': 'indiana-child-support-calculator',
  'inflation-calculator': 'inflation-calculator',
  'interest-calculator': 'interest-calculator',
  'interest-rate-calculator': 'interest-rate-calculator',
  'investment-calculator': 'investment-calculator',
  'ip-subnet-calculator': 'ip-subnet-calculator',
  'loan-calculator': 'loan-calculator',
  'marriage-calculator': 'marriage-calculator',
  'mortgage-calculator': 'mortgage-calculator',
  'mortgage-payoff-calculator': 'mortgage-payoff-calculator',
  'payment-calculator': 'payment-calculator',
  'pension-calculator': 'pension-calculator',
  'percentage-calculator': 'percentage-calculator',
  'piecewise-function-calculator-grapher': 'piecewise-function-calculator-grapher',
  'rent-calculator': 'rent-calculator',
  'retirement-calculator': 'retirement-calculator',
  'rpe-calculator': 'rpe-calculator',
  'salary-calculator': 'salary-calculator',
  'sales-tax-calculator': 'sales-tax-calculator',
  'savings-calculator': 'savings-calculator',
  'size-to-weight-rectangular-cuboid-calculator': 'size-to-weight-rectangular-cuboid-calculator',
  'social-security-calculator': 'social-security-calculator',
  'square-feet-to-cubic-yards-calculator': 'square-feet-to-cubic-yards-calculator',
  'time-calculator': 'time-calculator',
  'batting-average-calculator': 'batting-average-calculator',
  'earned-run-average-calculator': 'earned-run-average-calculator',
  'fielding-independent-pitching-calculator': 'fielding-independent-pitching-calculator',
  'fielding-percentage-calculator': 'fielding-percentage-calculator',
  'magic-number-calculator': 'magic-number-calculator',
};

// Category IDs
const categories = ['health', 'financial', 'maths', 'physics', 'construction', 'food', 'sports', 'other-calculators'];

/**
 * Update a calculator layout file
 */
function updateCalculatorLayout(filePath, calculatorId) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already updated
  if (content.includes('getCanonicalUrl')) {
    console.log(`✓ Already updated: ${filePath}`);
    return;
  }
  
  // Add import statement
  if (!content.includes('import { getCanonicalUrl }')) {
    content = content.replace(
      'import type { Metadata } from "next";',
      'import type { Metadata } from "next";\nimport { getCanonicalUrl } from "@/lib/url-utils";'
    );
  }
  
  // Find the metadata generation part and update canonical URL
  const metadataPattern = /(const meta = \w+Meta\[language as keyof typeof \w+Meta\];)\s*\n\s*(return \{)/;
  
  if (metadataPattern.test(content)) {
    content = content.replace(
      metadataPattern,
      `$1\n  \n  // Generate correct canonical URL using localized slug\n  const canonicalUrl = getCanonicalUrl('${calculatorId}', language);\n\n  $2`
    );
  }
  
  // Replace canonical URL in alternates
  const canonicalPattern = /canonical:\s*`https:\/\/www\.thesmartcalculator\.com\/\$\{\s*language !== "en" \? `\$\{language\}\/` : ""\s*\}[^`]+`,/;
  
  if (canonicalPattern.test(content)) {
    content = content.replace(
      canonicalPattern,
      'canonical: canonicalUrl,'
    );
  }
  
  // Update OG URL
  const ogUrlPattern = /url:\s*`https:\/\/www\.thesmartcalculator\.com\/\$\{\s*language !== "en" \? `\$\{language\}\/` : ""\s*\}[^`]+`,/;
  
  if (ogUrlPattern.test(content)) {
    content = content.replace(
      ogUrlPattern,
      'url: canonicalUrl,'
    );
  }
  
  // Update hreflang languages if they exist
  const languagesPattern = /languages:\s*\{[^}]+\}/s;
  if (languagesPattern.test(content)) {
    const newLanguages = `languages: {
        'en': getCanonicalUrl('${calculatorId}', 'en'),
        'pt-BR': getCanonicalUrl('${calculatorId}', 'br'),
        'pl': getCanonicalUrl('${calculatorId}', 'pl'),
        'de': getCanonicalUrl('${calculatorId}', 'de'),
      }`;
    content = content.replace(languagesPattern, newLanguages);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated: ${filePath}`);
}

/**
 * Update a category layout file
 */
function updateCategoryLayout(filePath, categoryId) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already updated
  if (content.includes('getCategoryCanonicalUrl')) {
    console.log(`✓ Already updated: ${filePath}`);
    return;
  }
  
  // Add import statement
  if (!content.includes('import { getCategoryCanonicalUrl }')) {
    content = content.replace(
      'import type { Metadata } from "next";',
      'import type { Metadata } from "next";\nimport { getCategoryCanonicalUrl } from "@/lib/url-utils";'
    );
  }
  
  // Find the metadata generation part and update canonical URL
  const metadataPattern = /(const meta = \w+Meta\[language as keyof typeof \w+Meta\];)\s*\n\s*(return \{)/;
  
  if (metadataPattern.test(content)) {
    content = content.replace(
      metadataPattern,
      `$1\n  \n  // Generate correct canonical URL using localized slug\n  const canonicalUrl = getCategoryCanonicalUrl('${categoryId}', language);\n\n  $2`
    );
  }
  
  // Replace canonical URL in alternates
  const canonicalPattern = /canonical:\s*`https:\/\/www\.thesmartcalculator\.com\/\$\{\s*language !== "en" \? `\$\{language\}\/` : ""\s*\}[^`]+`,/;
  
  if (canonicalPattern.test(content)) {
    content = content.replace(
      canonicalPattern,
      `canonical: canonicalUrl,
      languages: {
        'en': getCategoryCanonicalUrl('${categoryId}', 'en'),
        'pt-BR': getCategoryCanonicalUrl('${categoryId}', 'br'),
        'pl': getCategoryCanonicalUrl('${categoryId}', 'pl'),
        'de': getCategoryCanonicalUrl('${categoryId}', 'de'),
      }`
    );
  }
  
  // Update OG URL
  const ogUrlPattern = /url:\s*`https:\/\/www\.thesmartcalculator\.com\/\$\{\s*language !== "en" \? `\$\{language\}\/` : ""\s*\}[^`]+`,/;
  
  if (ogUrlPattern.test(content)) {
    content = content.replace(
      ogUrlPattern,
      'url: canonicalUrl,'
    );
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated: ${filePath}`);
}

/**
 * Find and update all calculator layout files
 */
function updateAllCalculatorLayouts() {
  console.log('\n🔧 Updating calculator layouts...\n');
  
  const calculatorsDirs = [
    path.join(appDir, '(calculators-by-category)', '(other)'),
    path.join(appDir, '(calculators-by-category)', 'construction'),
    path.join(appDir, '(calculators-by-category)', 'financial'),
    path.join(appDir, '(calculators-by-category)', 'food'),
    path.join(appDir, '(calculators-by-category)', 'health'),
    path.join(appDir, '(calculators-by-category)', 'maths'),
    path.join(appDir, '(calculators-by-category)', 'physics'),
    path.join(appDir, '(calculators-by-category)', 'sports'),
  ];
  
  calculatorsDirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    
    const calculators = fs.readdirSync(dir);
    calculators.forEach(calc => {
      const layoutPath = path.join(dir, calc, 'layout.tsx');
      if (fs.existsSync(layoutPath) && calculatorDirToId[calc]) {
        updateCalculatorLayout(layoutPath, calculatorDirToId[calc]);
      }
    });
  });
}

/**
 * Find and update all category layout files
 */
function updateAllCategoryLayouts() {
  console.log('\n🔧 Updating category layouts...\n');
  
  categories.forEach(category => {
    const layoutPath = path.join(appDir, '(category)', category, 'layout.tsx');
    if (fs.existsSync(layoutPath)) {
      updateCategoryLayout(layoutPath, category);
    }
  });
}

// Run the updates
console.log('🚀 Starting canonical URL fix...');
updateAllCalculatorLayouts();
updateAllCategoryLayouts();
console.log('\n✅ Done! All layout files have been updated with correct canonical URLs.');
