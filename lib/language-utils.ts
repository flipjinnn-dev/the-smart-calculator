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
  const meta = getCalculatorMetaEntry(calculatorId, language);

  if (!meta) {
    return { name: "Calculator", description: "A useful calculator" };
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
  const meta = getCalculatorMetaEntry(calculatorId, language);

  if (!meta) {
    console.warn(`No metadata found for calculator: ${calculatorId} in language: ${language}`);
    return '/';
  }

  return meta.slug;
}