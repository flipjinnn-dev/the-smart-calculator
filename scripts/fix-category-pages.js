import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// List of categories and their properties
const categories = [
  { 
    folder: 'health', 
    id: 'health', 
    icon: 'Heart', 
    theme: 'green', 
    appCategory: 'HealthApplication' 
  },
  { 
    folder: 'financial', 
    id: 'financial', 
    icon: 'TrendingUp', 
    theme: 'blue', 
    appCategory: 'FinanceApplication' 
  },
  { 
    folder: 'maths', 
    id: 'maths', 
    icon: 'GraduationCap', 
    theme: 'blue', 
    appCategory: 'MathApplication' 
  },
  { 
    folder: 'physics', 
    id: 'physics', 
    icon: 'Atom', 
    theme: 'purple', 
    appCategory: 'SoftwareApplication' 
  },
  { 
    folder: 'construction', 
    id: 'construction', 
    icon: 'Home', 
    theme: 'orange', 
    appCategory: 'SoftwareApplication' 
  },
  { 
    folder: 'food', 
    id: 'food', 
    icon: 'Beef', 
    theme: 'red', 
    appCategory: 'SoftwareApplication' 
  },
  { 
    folder: 'sports', 
    id: 'sports', 
    icon: 'Bike', 
    theme: 'green', 
    appCategory: 'SoftwareApplication' 
  },
  { 
    folder: 'other-calculators', 
    id: 'other', 
    icon: 'MoreHorizontal', 
    theme: 'gray', 
    appCategory: 'SoftwareApplication' 
  }
];

// Theme colors mapping
const themeColors = {
  green: { primary: 'green', secondary: 'teal' },
  blue: { primary: 'blue', secondary: 'indigo' },
  purple: { primary: 'purple', secondary: 'violet' },
  orange: { primary: 'orange', secondary: 'amber' },
  red: { primary: 'red', secondary: 'rose' },
  gray: { primary: 'gray', secondary: 'slate' }
};

// Fallback content for each category
const fallbackContent = {
  'health': {
    name: "Health & Fitness",
    description: "Free health and fitness calculators including BMI, calorie, body fat, and medical calculators. Calculate your health metrics with ease.",
    slug: "health"
  },
  'financial': {
    name: "Financial",
    description: "Free financial calculators including mortgage, loan, investment, tax, and retirement planning tools. Calculate your finances with ease.",
    slug: "financial"
  },
  'maths': {
    name: "Maths",
    description: "Free math calculators for algebra, geometry, statistics, and advanced mathematics. Solve complex problems with ease.",
    slug: "maths"
  },
  'physics': {
    name: "Physics",
    description: "Free physics calculators for force, energy, motion, and other physical phenomena. Understand the laws of physics.",
    slug: "physics"
  },
  'construction': {
    name: "Construction",
    description: "Free construction calculators for property, rent, building materials, and construction planning. Build with precision.",
    slug: "construction"
  },
  'food': {
    name: "Food",
    description: "Free food calculators for nutrition, calorie counting, meal planning, and cooking measurements. Cook and eat smarter.",
    slug: "food"
  },
  'sports': {
    name: "Sports",
    description: "Free sports calculators for fitness, exercise, performance tracking, and sports statistics. Train and compete better.",
    slug: "sports"
  },
  'other': {
    name: "Other",
    description: "Free calculators for various other purposes that don't fit into specific categories. Find tools for everyday calculations.",
    slug: "other-calculators"
  }
};

// Fix each category page
categories.forEach(category => {
  const categoryPath = join(__dirname, '..', 'app', '(category)', category.folder, 'page.tsx');
  
  try {
    let content = readFileSync(categoryPath, 'utf8');
    
    // Extract the return statement (UI part) from the existing file
    const returnMatch = content.match(/return\s*\(\s*<>\s*[\s\S]*?<\/>\s*\)/);
    if (!returnMatch) {
      console.log(`❌ Could not extract UI from ${category.folder} page`);
      return;
    }
    
    const uiContent = returnMatch[0];
    
    // Create the new clean content
    const newContent = `"use client"

import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowLeft, Calculator, ${category.icon} } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data"
import { useCategoryContent } from "@/hooks/useCategoryContent"

// Define fallback content
const fallbackContent = {
  name: "${fallbackContent[category.id].name}",
  description: "${fallbackContent[category.id].description}",
  slug: "${fallbackContent[category.id].slug}"
}

export default function ${category.folder.charAt(0).toUpperCase() + category.folder.slice(1).replace('-c', 'C').replace('-cal', 'Cal')}CategoryPage() {
  // Detect language from URL path or headers
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

  const { content, loading, error } = useCategoryContent("${category.id}", language);
  
  // Use content or fallback to defaults
  const contentData = content || fallbackContent;

  // Show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Show error if content failed to load
  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error loading content: {error}</div>;
  }

  const ${category.id}Calculators = getCalculatorsByCategory("${category.id}")
  const popular${category.id.charAt(0).toUpperCase() + category.id.slice(1)}Calculators = getPopularCalculatorsByCategory("${category.id}")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: contentData.name,
    description: contentData.description,
    url: \`https://www.thesmartcalculator.com/\${contentData.slug}\`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: ${category.id}Calculators.map((calc, index) => ({
        "@type": "SoftwareApplication",
        position: index + 1,
        name: calc.name,
        description: calc.description,
        url: \`https://www.thesmartcalculator.com\${calc.href}\`,
        applicationCategory: "${category.appCategory}",
      })),
    },
  }

  ${uiContent}
}`;

    // Write the fixed content back to the file
    writeFileSync(categoryPath, newContent, 'utf8');
    console.log(`✅ Fixed ${category.folder} category page`);
  } catch (error) {
    console.log(`❌ Error fixing ${category.folder} category page: ${error.message}`);
  }
});

console.log('✅ All category pages fixed successfully!');