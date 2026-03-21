export interface InternalLink {
  keyword: string;
  href: string;
}

/**
 * Load internal links for a given language.
 * Falls back to English if the language file doesn't exist.
 */
export async function getInternalLinks(lang: string): Promise<InternalLink[]> {
  try {
    const data = await import(`./${lang}.json`);
    return data.default || data;
  } catch {
    // Fallback to English
    const data = await import('./en.json');
    return data.default || data;
  }
}
