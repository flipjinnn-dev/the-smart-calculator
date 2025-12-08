import { calculatorsMeta } from '@/meta/calculators';

/**
 * Generate a language-specific URL for a calculator
 * @param calculatorId - The ID of the calculator (e.g., 'bmi-calculator')
 * @param language - The language code (e.g., 'en', 'br', 'pl', 'de')
 * @returns The language-specific URL for the calculator
 */
export function getCalculatorUrl(calculatorId: string, language: string = 'en'): string {
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

/**
 * Generate a localized URL for a calculator based on an English URL
 * @param englishUrl - The English URL (e.g., '/health/bmi-calculator')
 * @param language - The target language code (e.g., 'br', 'pl', 'de')
 * @returns The localized URL for the calculator
 */
export function getLocalizedCalculatorUrl(englishUrl: string, language: string): string {
  // If language is English or not specified, return the original URL
  if (language === 'en' || !language) {
    return englishUrl;
  }

  // Remove the leading slash for processing
  const path = englishUrl.startsWith('/') ? englishUrl.substring(1) : englishUrl;

  // Split the path into parts
  const parts = path.split('/');

  // Get the calculator name (last part of the path)
  const calculatorId = parts[parts.length - 1];

  if (!calculatorId) {
    console.warn('No calculator ID found in URL:', englishUrl);
    return englishUrl;
  }

  // Get the localized URL from calculator metadata
  const calculator = calculatorsMeta[calculatorId];

  if (!calculator) {
    console.warn(`No metadata found for calculator: ${calculatorId}`);
    return englishUrl;
  }

  // Get the language-specific slug
  const meta = calculator[language] || calculator["en"];

  if (!meta) {
    console.warn(`No metadata found for calculator: ${calculatorId} in language: ${language}`);
    return englishUrl;
  }

  return meta.slug;
}

/**
 * Generate a language-specific URL for a category
 * @param categoryId - The ID of the category (e.g., 'health', 'financial')
 * @param language - The language code (e.g., 'en', 'br', 'pl', 'de')
 * @returns The language-specific URL for the category
 */
export function getCategoryUrl(categoryId: string, language: string = 'en'): string {
  // Import category metadata
  const { default: categoriesMeta } = require('@/meta/categories');

  // Get the category metadata
  const category = categoriesMeta[categoryId];

  if (!category) {
    console.warn(`No metadata found for category: ${categoryId}`);
    return '/';
  }

  // Get the language-specific slug
  const meta = category[language] || category["en"];

  if (!meta) {
    console.warn(`No metadata found for category: ${categoryId} in language: ${language}`);
    return '/';
  }

  // For English, return the slug directly
  if (language === 'en') {
    return `/${meta.slug}`;
  }

  // For other languages, prepend the language code
  return `/${language}/${meta.slug}`;
}

/**
 * Generate a localized URL for a category
 * @param categoryId - The ID of the category (e.g., 'health', 'financial')
 * @param language - The target language code (e.g., 'br', 'pl', 'de')
 * @returns The localized URL for the category
 */
export function getLocalizedCategoryUrl(categoryId: string, language: string): string {
  // If language is English or not specified, use the standard getCategoryUrl function
  if (language === 'en' || !language) {
    return getCategoryUrl(categoryId, 'en');
  }

  // Import category metadata
  const { default: categoriesMeta } = require('@/meta/categories');

  // Get the category metadata
  const category = categoriesMeta[categoryId];

  if (!category) {
    console.warn(`No metadata found for category: ${categoryId}`);
    return '/';
  }

  // Get the language-specific slug
  const meta = category[language] || category["en"];

  if (!meta) {
    console.warn(`No metadata found for category: ${categoryId} in language: ${language}`);
    return '/';
  }

  // For other languages, prepend the language code
  return `/${language}/${meta.slug}`;
}

/**
 * Get the current language from the URL or headers
 * @param pathname - The current pathname
 * @param headers - The request headers (optional)
 * @returns The detected language code
 */
export function getCurrentLanguage(pathname: string, headers?: Headers): string {
  // First try to get language from headers (set by middleware)
  if (headers) {
    const headerLanguage = headers.get('x-language');
    if (headerLanguage) {
      return headerLanguage;
    }
  }

  // Fallback to URL path detection - INCLUDES 'es' FOR SPANISH
  const langMatch = pathname.match(/^\/(br|pl|de|es)/);
  return langMatch ? langMatch[1] : "en";
}

/**
 * Generate a language switcher URL that maintains the current path and translates category/calculator names
 * @param currentPathname - The current pathname
 * @param newLanguage - The language to switch to
 * @returns The URL for the same page in the new language
 */
export function getLanguageSwitcherUrl(currentPathname: string, newLanguage: string): string {
  // Remove the current language prefix if it exists - INCLUDES 'es' FOR SPANISH
  let cleanPathname = currentPathname;
  const langMatch = currentPathname.match(/^\/(br|pl|de|es)/);
  const currentLanguage = langMatch ? langMatch[1] : "en";

  if (langMatch) {
    cleanPathname = currentPathname.substring(3);
  }

  // For English, we need to translate back to English slugs
  if (newLanguage === 'en') {
    // If already on English, return as is
    if (currentLanguage === 'en') {
      return cleanPathname || '/';
    }

    // Need to translate from current language to English
    if (cleanPathname && cleanPathname !== '/') {
      const path = cleanPathname.startsWith('/') ? cleanPathname.substring(1) : cleanPathname;
      const parts = path.split('/');

      if (parts.length >= 2) {
        // This is a calculator page: /category/calculator-name
        const category = parts[0];
        const calculatorName = parts[1];

        // Import mappings
        const { urlMappings } = require('@/middleware');

        // Translate current language category to English
        let englishCategory = category;
        const currentCategoryMappings: any = urlMappings[currentLanguage as keyof typeof urlMappings];
        if (currentCategoryMappings && currentCategoryMappings[category]) {
          englishCategory = currentCategoryMappings[category];
        }

        // Translate current language calculator to English
        let englishCalculatorName = calculatorName;
        if (currentCategoryMappings && currentCategoryMappings[calculatorName]) {
          englishCalculatorName = currentCategoryMappings[calculatorName];
        }

        return `/${englishCategory}/${englishCalculatorName}`;
      } else if (parts.length === 1 && parts[0]) {
        // This is a category page: /category
        const category = parts[0];

        // Import mappings
        const { urlMappings } = require('@/middleware');

        // Translate current language category to English
        let englishCategory = category;
        const currentCategoryMappings: any = urlMappings[currentLanguage as keyof typeof urlMappings];
        if (currentCategoryMappings && currentCategoryMappings[category]) {
          englishCategory = currentCategoryMappings[category];
        }

        return `/${englishCategory}`;
      }
    }

    return cleanPathname || '/';
  }

  // For other languages, we need to translate category and calculator names
  if (cleanPathname && cleanPathname !== '/') {
    // Remove leading slash for processing
    const path = cleanPathname.startsWith('/') ? cleanPathname.substring(1) : cleanPathname;
    const parts = path.split('/');

    if (parts.length >= 2) {
      // This is a calculator page: /category/calculator-name
      const category = parts[0];
      const calculatorName = parts[1];

      // Import mappings
      const { reverseUrlMappings, urlMappings } = require('@/middleware');

      // Always translate through English as intermediate language
      // Step 1: Translate current language category to English
      let englishCategory = category;
      if (currentLanguage !== 'en') {
        const currentCategoryMappings: any = urlMappings[currentLanguage as keyof typeof urlMappings];
        if (currentCategoryMappings) {
          // The mappings are structured as { localName: englishName }
          // So if we have category = 'saude', we want to find the entry where key = 'saude'
          // and get the value which would be 'health'
          if (currentCategoryMappings[category]) {
            englishCategory = currentCategoryMappings[category];
          }
        }
      }

      // Step 2: Translate English category to target language
      let translatedCategory = englishCategory;
      if (newLanguage !== 'en') {
        const newCategoryMappings: any = reverseUrlMappings[newLanguage as keyof typeof reverseUrlMappings];
        if (newCategoryMappings && newCategoryMappings[englishCategory]) {
          translatedCategory = newCategoryMappings[englishCategory];
        }
      }

      // Step 3: Translate current language calculator to English
      let englishCalculatorName = calculatorName;
      if (currentLanguage !== 'en') {
        const currentCalcMappings: any = urlMappings[currentLanguage as keyof typeof urlMappings];
        if (currentCalcMappings) {
          // The mappings are structured as { localName: englishName }
          // So if we have calculatorName = 'calculadora-imc-anorexica', we want to find the entry where key = 'calculadora-imc-anorexica'
          // and get the value which would be 'anorexic-bmi-calculator'
          if (currentCalcMappings[calculatorName]) {
            englishCalculatorName = currentCalcMappings[calculatorName];
          }
        }
      }

      // Step 4: Translate English calculator to target language
      let translatedCalculatorName = englishCalculatorName;
      if (newLanguage !== 'en') {
        const newCalcMappings: any = reverseUrlMappings[newLanguage as keyof typeof reverseUrlMappings];
        if (newCalcMappings && newCalcMappings[englishCalculatorName]) {
          translatedCalculatorName = newCalcMappings[englishCalculatorName];
        }
      }

      return `/${newLanguage}/${translatedCategory}/${translatedCalculatorName}`;
    } else if (parts.length === 1 && parts[0]) {
      // This is a category page: /category
      const category = parts[0];

      // Import mappings
      const { reverseUrlMappings, urlMappings } = require('@/middleware');

      // Always translate through English as intermediate language
      // Step 1: Translate current language category to English
      let englishCategory = category;
      if (currentLanguage !== 'en') {
        const currentCategoryMappings: any = urlMappings[currentLanguage as keyof typeof urlMappings];
        if (currentCategoryMappings) {
          // The mappings are structured as { localName: englishName }
          // So if we have category = 'saude', we want to find the entry where key = 'saude'
          // and get the value which would be 'health'
          if (currentCategoryMappings[category]) {
            englishCategory = currentCategoryMappings[category];
          }
        }
      }

      // Step 2: Translate English category to target language
      let translatedCategory = englishCategory;
      if (newLanguage !== 'en') {
        const newCategoryMappings: any = reverseUrlMappings[newLanguage as keyof typeof reverseUrlMappings];
        if (newCategoryMappings && newCategoryMappings[englishCategory]) {
          translatedCategory = newCategoryMappings[englishCategory];
        }
      }

      return `/${newLanguage}/${translatedCategory}`;
    }
  }

  // For other cases, prepend the language code
  return `/${newLanguage}${cleanPathname}`;
}

/**
 * Generate the full canonical URL for a calculator
 * @param calculatorId - The calculator ID (e.g., 'bmi-calculator', 'mortgage-calculator')
 * @param language - The language code (e.g., 'en', 'br', 'pl', 'de')
 * @param baseUrl - The base URL of the site (default: 'https://www.thesmartcalculator.com')
 * @returns The full canonical URL
 */
export function getCanonicalUrl(
  calculatorId: string,
  language: string = 'en',
  baseUrl: string = 'https://www.thesmartcalculator.com'
): string {
  const slug = getCalculatorUrl(calculatorId, language);

  // If slug already contains the full URL, return it
  if (slug.startsWith('http')) {
    return slug;
  }

  // Remove leading slash if present
  const cleanSlug = slug.startsWith('/') ? slug.substring(1) : slug;

  return `${baseUrl}/${cleanSlug}`;
}

/**
 * Generate the full canonical URL for a category
 * @param categoryId - The category ID (e.g., 'health', 'financial', 'maths')
 * @param language - The language code (e.g., 'en', 'br', 'pl', 'de')
 * @param baseUrl - The base URL of the site (default: 'https://www.thesmartcalculator.com')
 * @returns The full canonical URL
 */
export function getCategoryCanonicalUrl(
  categoryId: string,
  language: string = 'en',
  baseUrl: string = 'https://www.thesmartcalculator.com'
): string {
  const slug = getCategoryUrl(categoryId, language);

  // If slug already contains the full URL, return it
  if (slug.startsWith('http')) {
    return slug;
  }

  // Remove leading slash if present
  const cleanSlug = slug.startsWith('/') ? slug.substring(1) : slug;

  // For empty slug (homepage), return just the base URL
  if (!cleanSlug) {
    return baseUrl;
  }

  return `${baseUrl}/${cleanSlug}`;
}

/**
 * Return canonical URL for a static page (about-us, contact-us, privacy-policy, terms-and-conditions)
 * For non-English languages this returns the translated slug used by sitemap and middleware.
 */
export function getStaticPageCanonicalUrl(
  pageId: 'about-us' | 'contact-us' | 'privacy-policy' | 'terms-and-conditions',
  language: string = 'en',
  baseUrl: string = 'https://www.thesmartcalculator.com'
): string {
  // Mapping: pageId -> language -> localized path (including language prefix where applicable)
  const mapping: Record<string, Record<string, string>> = {
    'about-us': {
      en: '/about-us',
      br: '/br/sobre-nos',
      pl: '/pl/o-nas',
      de: '/de/uber-uns',
      es: '/es/sobre-nosotros',
    },
    'contact-us': {
      en: '/contact-us',
      br: '/br/contato',
      pl: '/pl/kontakt',
      de: '/de/kontakt',
      es: '/es/contacto',
    },
    'privacy-policy': {
      en: '/privacy-policy',
      br: '/br/politica-de-privacidade',
      pl: '/pl/polityka-prywatnosci',
      de: '/de/datenschutz',
      es: '/es/politica-de-privacidad',
    },
    'terms-and-conditions': {
      en: '/terms-and-conditions',
      br: '/br/termos-e-condicoes',
      pl: '/pl/warunki',
      de: '/de/nutzungsbedingungen',
      es: '/es/terminos-y-condiciones',
    }
  };

  const pageMap = mapping[pageId];
  if (!pageMap) return baseUrl;

  const slug = (pageMap as any)[language] || pageMap['en'];
  // If slug already contains full url, return it
  if (slug.startsWith('http')) return slug;
  // Ensure no duplicate slashes
  const clean = slug.startsWith('/') ? slug : '/' + slug;
  return `${baseUrl}${clean}`;
}
