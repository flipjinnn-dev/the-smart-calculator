/**
 * Language utility functions for consistent language handling across the application
 */

/**
 * Detect language from various sources
 * Order of precedence:
 * 1. x-language header (set by middleware)
 * 2. URL path prefix
 * 3. Default to 'en'
 */
export function detectLanguage(pathname: string, headers?: Headers): string {
  // First try to get language from headers (set by middleware)
  if (headers) {
    const headerLanguage = headers.get('x-language');
    if (headerLanguage && ['en', 'br', 'pl', 'de', 'es'].includes(headerLanguage)) {
      return headerLanguage;
    }
  }
  
  // Fallback to URL path detection
  if (typeof window !== 'undefined') {
    // Client-side detection
    const headerLanguage = document.head.querySelector('meta[name="x-language"]')?.getAttribute('content');
    if (headerLanguage && ['en', 'br', 'pl', 'de', 'es'].includes(headerLanguage)) {
      return headerLanguage;
    }
    
    const path = window.location.pathname;
    const langMatch = path.match(/^\/(br|pl|de|es)/);
    return langMatch ? langMatch[1] : "en";
  } else {
    // Server-side detection
    const langMatch = pathname.match(/^\/(br|pl|de|es)/);
    return langMatch ? langMatch[1] : "en";
  }
}

/**
 * Get language-specific calculator data
 * @param calculatorId - The calculator ID
 * @param language - The language code
 * @returns Language-specific calculator data
 */
export function getLocalizedCalculatorData(calculatorId: string, language: string = 'en') {
  // Import calculator metadata
  const { calculatorsMeta } = require('@/meta/calculators');
  
  // Get the calculator metadata
  const calculator = calculatorsMeta[calculatorId];
  
  if (!calculator) {
    // If no metadata found, return defaults
    return { name: "Calculator", description: "A useful calculator" };
  }
  
  // Get the language-specific data
  const meta = calculator[language] || calculator["en"];
  
  if (!meta) {
    // If no language-specific data found, return English defaults
    const englishMeta = calculator["en"];
    return { 
      name: englishMeta?.title || "Calculator", 
      description: englishMeta?.description || "A useful calculator" 
    };
  }
  
  return {
    name: meta.title,
    description: meta.description
  };
}

/**
 * Get language-specific calculator href
 * @param calculatorId - The calculator ID
 * @param language - The language code
 * @returns Language-specific calculator href
 */
export function getLocalizedCalculatorHref(calculatorId: string, language: string = 'en'): string {
  // Import calculator metadata
  const { calculatorsMeta } = require('@/meta/calculators');
  
  // Get the calculator metadata
  const calculator = calculatorsMeta[calculatorId];
  
  if (!calculator) {
    console.warn(`No metadata found for calculator: ${calculatorId}`);
    return '/';
  }
  
  // Get the language-specific slug
  const meta = calculator[language] || calculator["en"];
  
  if (!meta) {
    console.warn(`No metadata found for calculator: ${calculatorId} in language: ${language}`);
    return '/';
  }
  
  return meta.slug;
}