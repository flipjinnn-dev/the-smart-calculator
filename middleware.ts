import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { calculatorsMeta } from '@/meta/calculators';
// @ts-ignore
import categoriesMeta from '@/meta/categories';

// Helper to extract the last part of a slug (the localized identifier)
function extractLocalizedSlug(path: string): string {
  if (!path) return '';
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const parts = cleanPath.split('/');
  return parts[parts.length - 1];
}

// target languages
const languages = ['br', 'de', 'es', 'pl'];

// Generate mappings dynamically
const generatedUrlMappings: Record<string, Record<string, string>> = {
  br: {}, de: {}, es: {}, pl: {}
};

const generatedReverseMappings: Record<string, Record<string, string>> = {
  br: {}, de: {}, es: {}, pl: {}
};

// 1. Process Calculators
Object.entries(calculatorsMeta).forEach(([calcId, meta]) => {
  languages.forEach(lang => {
    // @ts-ignore
    const langMeta = meta[lang];
    if (langMeta && langMeta.slug) {
      const localizedSlug = extractLocalizedSlug(langMeta.slug);
      if (localizedSlug) {
        generatedUrlMappings[lang][localizedSlug] = calcId;
        generatedReverseMappings[lang][calcId] = localizedSlug;
      }
    }
  });
});

// 2. Process Categories
Object.entries(categoriesMeta).forEach(([catId, meta]) => {
  languages.forEach(lang => {
    // @ts-ignore
    const langMeta = meta[lang];
    if (langMeta && langMeta.slug) {
      const localizedSlug = langMeta.slug;
      generatedUrlMappings[lang][localizedSlug] = catId;
      generatedReverseMappings[lang][catId] = localizedSlug;
    }
  });
});

// Export the generated mappings for use in other files (e.g. url-utils.ts)
export const urlMappings = generatedUrlMappings;
export const reverseUrlMappings = generatedReverseMappings;

// Define static pages that should keep English URLs but serve localized content
const staticPages = [
  'about-us',
  'contact-us',
  'privacy-policy',
  'terms-and-conditions'
];

// Translation map for static pages
const translatedStaticPages: Record<string, string> = {
  // Portuguese
  'sobre-nos': 'about-us',
  'contate-nos': 'contact-us',
  'contato': 'contact-us',
  'politica-de-privacidade': 'privacy-policy',
  'termos-e-condicoes': 'terms-and-conditions',
  // Polish
  'o-nas': 'about-us',
  'kontakt': 'contact-us',
  'polityka-prywatnosci': 'privacy-policy',
  'regulamin': 'terms-and-conditions',
  'warunki': 'terms-and-conditions',
  // German
  'uber-uns': 'about-us',
  'kontakt-uns': 'contact-us',
  'datenschutz': 'privacy-policy',
  'allgemeine-geschaftsbedingungen': 'terms-and-conditions',
  'nutzungsbedingungen': 'terms-and-conditions',
  // Spanish
  'acerca-de-nosotros': 'about-us',
  'sobre-nosotros': 'about-us',
  'contactanos': 'contact-us',
  'contacto': 'contact-us',
  'politica-de-privacidad': 'privacy-policy',
  'terminos-y-condiciones': 'terms-and-conditions'
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.includes('.') || // static files
    pathname.includes('_next') || // Next.js internals
    pathname.includes('api') || // API routes
    pathname.includes('favicon') // favicon
  ) {
    return NextResponse.next();
  }

  // Check if the URL starts with a language prefix
  const langMatch = pathname.match(/^\/(br|pl|de|es)(\/.*)?/);

  if (langMatch) {
    const lang = langMatch[1] as keyof typeof urlMappings;
    const path = langMatch[2] || '/';

    // Handle root path for language - show homepage instead of redirecting to calculator
    if (path === '/') {
      // Rewrite to the homepage with language header
      const response = NextResponse.rewrite(new URL('/', request.url));
      response.headers.set('x-language', lang);
      return response;
    }

    // Remove the leading slash for processing
    const pathParts = path.substring(1).split('/');

    // Check if this is a static page (first part is a static page name)
    const firstPart = pathParts[0];
    if (staticPages.includes(firstPart)) {
      // For static pages, keep the English URL but set the language header
      const newPath = '/' + pathParts.join('/');
      const response = NextResponse.rewrite(new URL(newPath, request.url));
      response.headers.set('x-language', lang);
      return response;
    }

    // Check if this is a translated static page
    if (translatedStaticPages[firstPart]) {
      // Rewrite to the English version of the static page
      const englishPage = translatedStaticPages[firstPart];
      const newPath = '/' + [englishPage, ...pathParts.slice(1)].join('/');
      const response = NextResponse.rewrite(new URL(newPath, request.url));
      response.headers.set('x-language', lang);
      return response;
    }

    // Translate the path parts for non-static pages
    const translatedParts = pathParts.map(part => {
      // Use the dynamic mapping
      // @ts-ignore
      const translated = urlMappings[lang]?.[part] || part;
      // Special case: 'other' category maps to 'other-calculators' folder
      return translated === 'other' ? 'other-calculators' : translated;
    });

    // Construct the new path
    const newPath = '/' + translatedParts.join('/');

    // Rewrite to the English version
    const response = NextResponse.rewrite(new URL(newPath, request.url));

    // Add language information to headers
    response.headers.set('x-language', lang);

    return response;
  }

  // For English URLs (no prefix), set language to 'en'
  const response = NextResponse.next();
  response.headers.set('x-language', 'en');
  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};