import { getCategoryMeta } from '@/lib/getCategoryMeta';

// Server-side function to load category content
export async function loadCategoryContent(categoryId: string, language: string = 'en') {
  try {
    const meta = getCategoryMeta(categoryId, language);
    if (meta) {
      return { content: meta, loading: false, error: null };
    } else {
      const englishMeta = getCategoryMeta(categoryId, 'en');
      return { content: englishMeta, loading: false, error: null };
    }
  } catch (err) {
    return { content: null, loading: false, error: `Failed to load category content for ${categoryId} in ${language}` };
  }
}
