import { useState, useEffect } from 'react';

interface FooterContent {
  company: {
    name: string;
    description: string;
    copyright: string;
  };
  categories: {
    title: string;
    items: Array<{
      name: string;
      href: string;
    }>;
  };
  companyLinks: {
    title: string;
    items: Array<{
      name: string;
      href: string;
    }>;
  };
  popularCalculators: {
    title: string;
    items: Array<{
      name: string;
      href: string;
    }>;
  };
  social: {
    pinterest: string;
    twitter: string;
    instagram: string;
    youtube: string;
  };
}

// Server-side function to load content
export async function loadFooterContent(language: string = 'en') {
  try {
    // Dynamically import the content based on language
    const contentModule = await import(`@/app/content/footer/${language}.json`);
    return { content: contentModule.default, loading: false, error: null };
  } catch (err) {
    // If language-specific content doesn't exist, fall back to English
    try {
      const contentModule = await import(`@/app/content/footer/en.json`);
      return { content: contentModule.default, loading: false, error: null };
    } catch (fallbackErr) {
      return { content: null, loading: false, error: `Failed to load footer content in ${language} or English` };
    }
  }
}

// Client-side hook for use in client components
export function useFooterContent(language: string = 'en') {
  // For client components, we'll implement useEffect-based loading
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadContent = async () => {
      try {
        setLoading(true);
        const result = await loadFooterContent(language);
        
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
  }, [language]);

  return { content, loading, error };
}