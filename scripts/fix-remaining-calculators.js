import fs from 'fs';
import path from 'path';

/**
 * Fix the 3 remaining calculators missing SEO metadata
 */

const calculators = [
  { id: 'salary-calculator', category: 'financial' },
  { id: 'square-root-curve-calculator', category: 'maths' },
  { id: 'orthogonal-projection-calculator', category: 'physics' }
];

function fixCalculatorLayout(calcId, category) {
  const filePath = `app/(calculators-by-category)/${category}/${calcId}/layout.tsx`;
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if already fixed
  if (content.includes("'x-default':") && content.includes('siteName: "Smart Calculator"')) {
    console.log(`✓  ${calcId} - Already fixed`);
    return false;
  }

  // Find the return statement and replace it
  const returnPattern = /return \{[\s\S]*?\};(?=\s*\})/;
  
  if (!returnPattern.test(content)) {
    console.log(`⚠️  ${calcId} - No return statement found`);
    return false;
  }

  const newReturn = `return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('${calcId}', 'en'),
        'en': getCanonicalUrl('${calcId}', 'en'),
        'es': getCanonicalUrl('${calcId}', 'es'),
        'pt-BR': getCanonicalUrl('${calcId}', 'br'),
        'pl': getCanonicalUrl('${calcId}', 'pl'),
        'de': getCanonicalUrl('${calcId}', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };`;

  content = content.replace(returnPattern, newReturn);
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Fixed: ${calcId}`);
  return true;
}

console.log('\n🔧 Fixing remaining 3 calculators...\n');

let fixed = 0;
calculators.forEach(calc => {
  if (fixCalculatorLayout(calc.id, calc.category)) {
    fixed++;
  }
});

console.log(`\n✅ Fixed ${fixed} calculator(s)\n`);
