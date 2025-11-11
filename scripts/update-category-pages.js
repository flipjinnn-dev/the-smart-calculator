import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// List of categories (folder names)
const categories = [
  'health',
  'financial',
  'maths',
  'physics',
  'construction',
  'food',
  'sports',
  'other-calculators'
];

// Corresponding category IDs (used in data)
const categoryIds = [
  'health',
  'financial',
  'maths',
  'physics',
  'construction',
  'food',
  'sports',
  'other'
];

// Fallback content for each category
const fallbackContent = {
  'health': {
    name: "Health & Fitness",
    description: "Free health and fitness calculators including BMI, calorie, body fat, and medical calculators. Calculate your health metrics with ease.",
    slug: "health",
    icon: "Heart"
  },
  'financial': {
    name: "Financial",
    description: "Free financial calculators including mortgage, loan, investment, tax, and retirement planning tools. Calculate your finances with ease.",
    slug: "financial",
    icon: "TrendingUp"
  },
  'maths': {
    name: "Maths",
    description: "Free math calculators for algebra, geometry, statistics, and advanced mathematics. Solve complex problems with ease.",
    slug: "maths",
    icon: "Calculator"
  },
  'physics': {
    name: "Physics",
    description: "Free physics calculators for force, energy, motion, and other physical phenomena. Understand the laws of physics.",
    slug: "physics",
    icon: "Atom"
  },
  'construction': {
    name: "Construction",
    description: "Free construction calculators for property, rent, building materials, and construction planning. Build with precision.",
    slug: "construction",
    icon: "Home"
  },
  'food': {
    name: "Food",
    description: "Free food calculators for nutrition, calorie counting, meal planning, and cooking measurements. Cook and eat smarter.",
    slug: "food",
    icon: "Beef"
  },
  'sports': {
    name: "Sports",
    description: "Free sports calculators for fitness, exercise, performance tracking, and sports statistics. Train and compete better.",
    slug: "sports",
    icon: "Bike"
  },
  'other': {
    name: "Other",
    description: "Free calculators for various other purposes that don't fit into specific categories. Find tools for everyday calculations.",
    slug: "other-calculators",
    icon: "MoreHorizontal"
  }
};

// Update each category page
categories.forEach((category, index) => {
  const categoryId = categoryIds[index];
  const categoryPath = join(__dirname, '..', 'app', '(category)', category, 'page.tsx');
  
  if (existsSync(categoryPath)) {
    let content = readFileSync(categoryPath, 'utf8');
    
    // Add "use client" directive if not present
    if (!content.startsWith('"use client"')) {
      content = '"use client"\n\n' + content;
    }
    
    // Replace imports and add useState, useEffect
    if (!content.includes('useState, useEffect')) {
      content = content.replace(
        "import type { Metadata } from \"next\"",
        "import type { Metadata } from \"next\"\nimport { useState, useEffect } from \"react\""
      );
    }
    
    // Add useCategoryContent import
    if (!content.includes('useCategoryContent')) {
      content = content.replace(
        "import Script from \"next/script\"",
        "import Script from \"next/script\"\nimport { useCategoryContent } from \"@/hooks/useCategoryContent\""
      );
    }
    
    // Add fallback content
    const fallbackSnippet = `// Define fallback content
const fallbackContent = {
  name: "${fallbackContent[categoryId].name}",
  description: "${fallbackContent[categoryId].description}",
  slug: "${fallbackContent[categoryId].slug}"
}`;

    // Add language detection and content loading
    const languageDetectionSnippet = `  // Detect language from URL path or headers
  const [language, setLanguage] = useState("en");
  
  useEffect(() => {
    // First try to get language from headers (set by middleware)
    const headerLanguage = document.head.querySelector('meta[name="x-language"]')?.getAttribute('content');
    if (headerLanguage) {
      setLanguage(headerLanguage);
      return;
    }
    
    // Fallback to URL path detection
    const path = window.location.pathname;
    const langMatch = path.match(/^\\/(br|pl|de)/);
    const detectedLanguage = langMatch ? langMatch[1] : "en";
    setLanguage(detectedLanguage);
  }, []);

  const { content, loading, error } = useCategoryContent("${categoryId}", language);
  
  // Use content or fallback to defaults
  const contentData = content || fallbackContent;

  // Show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Show error if content failed to load
  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error loading content: {error}</div>;
  }`;
    
    // Remove metadata export
    content = content.replace(
      /export const metadata: Metadata = \{[\s\S]*?\};/,
      ""
    );
    
    // Replace category name in header
    content = content.replace(
      /<p className="text-sm text-gray-600">.*?<\/p>/,
      '<p className="text-sm text-gray-600">{contentData.name}</p>'
    );
    
    // Replace category name in breadcrumb
    content = content.replace(
      /<span className="text-gray-900 font-medium">.*?<\/span>/,
      '<span className="text-gray-900 font-medium">{contentData.name}</span>'
    );
    
    // Replace hero section title
    content = content.replace(
      /<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">.*?<\/h1>/,
      '<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{contentData.name}</h1>'
    );
    
    // Replace hero section description
    content = content.replace(
      /<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">[\s\S]*?<\/p>/,
      '<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">\n              {contentData.description}\n            </p>'
    );
    
    // Replace "All ... Calculators" heading
    content = content.replace(
      /<h2 className="text-2xl font-bold text-gray-900 mb-6">All .*? Calculators<\/h2>/,
      '<h2 className="text-2xl font-bold text-gray-900 mb-6">All {contentData.name} Calculators</h2>'
    );
    
    // Update JSON-LD
    content = content.replace(
      /const jsonLd = \{[\s\S]*?\};/,
      `const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: contentData.name,
  description: contentData.description,
  url: \`https://www.thesmartcalculator.com/\${contentData.slug}\`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: ${categoryId}Calculators.map((calc, index) => ({
      "@type": "SoftwareApplication",
      position: index + 1,
      name: calc.name,
      description: calc.description,
      url: \`https://www.thesmartcalculator.com\${calc.href}\`,
      applicationCategory: "${categoryId === 'health' ? 'HealthApplication' : categoryId === 'financial' ? 'FinanceApplication' : 'SoftwareApplication'}",
    })),
  },
}`
    );
    
    // Insert fallback content and language detection
    if (content.includes('export default function')) {
      const functionIndex = content.indexOf('export default function');
      const insertIndex = content.lastIndexOf('\n', functionIndex);
      content = content.slice(0, insertIndex) + '\n\n' + fallbackSnippet + '\n\n' + content.slice(insertIndex);
    }
    
    // Insert language detection after function declaration
    const functionName = `${category.charAt(0).toUpperCase() + category.slice(1).replace('-c', 'C')}CategoryPage`;
    content = content.replace(
      /export default function \w+CategoryPage\(\) \{/,
      `export default function ${functionName}() {
${languageDetectionSnippet}`
    );
    
    // Insert meta tag
    content = content.replace(
      /<Script type="application\/ld\+json"[\s\S]*?<\/Script>/,
      `<Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <head>
        <meta name="x-language" content={language} />
      </head>`
    );
    
    // Remove duplicate code blocks
    const lines = content.split('\n');
    const cleanedLines = [];
    const seenBlocks = new Set();
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip duplicate fallback content
      if (line === '// Define fallback content' && seenBlocks.has('fallback')) {
        // Skip until end of block
        while (i < lines.length && !(lines[i].trim() === '}' && lines[i+1] && lines[i+1].trim() === '')) {
          i++;
        }
        continue;
      }
      
      // Skip duplicate language detection
      if (line === '// Detect language from URL path or headers' && seenBlocks.has('language')) {
        // Skip until end of useEffect
        while (i < lines.length && !lines[i].includes('};</Script>')) {
          i++;
        }
        continue;
      }
      
      // Mark blocks as seen
      if (line === '// Define fallback content') {
        seenBlocks.add('fallback');
      }
      
      if (line === '// Detect language from URL path or headers') {
        seenBlocks.add('language');
      }
      
      cleanedLines.push(lines[i]);
    }
    
    content = cleanedLines.join('\n');
    
    // Write the updated content back to the file
    writeFileSync(categoryPath, content, 'utf8');
    console.log(`✅ Updated ${category} category page`);
  } else {
    console.log(`❌ ${category} category page not found`);
  }
});

console.log('✅ All category pages updated successfully!');