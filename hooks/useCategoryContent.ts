import { useState, useEffect } from 'react';
import { getCategoryMeta } from '@/lib/getCategoryMeta';

interface CategoryContent {
  name: string;
  description: string;
  slug: string;
}

// Server-side function to load content
export async function loadCategoryContent(categoryId: string, language: string = 'en') {
  try {
    const meta = getCategoryMeta(categoryId, language);
    if (meta) {
      return { content: meta, loading: false, error: null };
    } else {
      // If language-specific content doesn't exist, fall back to English
      const englishMeta = getCategoryMeta(categoryId, 'en');
      return { content: englishMeta, loading: false, error: null };
    }
  } catch (err) {
    return { content: null, loading: false, error: `Failed to load category content for ${categoryId} in ${language}` };
  }
}

// Client-side hook for use in client components
export function useCategoryContent(categoryId: string, language: string = 'en') {
  // For client components, we'll implement useEffect-based loading
  const [content, setContent] = useState<CategoryContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadContent = async () => {
      try {
        setLoading(true);
        const result = await loadCategoryContent(categoryId, language);
        
        if (isMounted) {
          setContent(result.content);
          setError(result.error);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load content');
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, [categoryId, language]);

  return { content, loading, error };
}