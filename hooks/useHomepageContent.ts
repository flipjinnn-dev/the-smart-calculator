import { useState, useEffect } from 'react';

interface HomepageContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  header: {
    title: string;
    subtitle: string;
  };
  hero: {
    title: string;
    description: string;
  };
  search: {
    title: string;
    placeholder: string;
  };
  categories: {
    title: string;
    description: string;
    financial: {
      name: string;
      description: string;
    };
    health: {
      name: string;
      description: string;
    };
    maths: {
      name: string;
      description: string;
    };
    physics: {
      name: string;
      description: string;
    };
    construction: {
      name: string;
      description: string;
    };
    food: {
      name: string;
      description: string;
    };
    sports: {
      name: string;
      description: string;
    };
    other: {
      name: string;
      description: string;
    };
  };
  popular: {
    title: string;
    description: string;
    calculators: Array<{
      name: string;
      category: string;
      description: string;
    }>;
  };
  features: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

// Server-side function to load content
export async function loadHomepageContent(language: string = 'en') {
  try {
    // Dynamically import the content based on language
    const contentModule = await import(`@/app/content/homepage/${language}.json`);
    return { content: contentModule.default, loading: false, error: null };
  } catch (err) {
    // If language-specific content doesn't exist, fall back to English
    try {
      const contentModule = await import(`@/app/content/homepage/en.json`);
      return { content: contentModule.default, loading: false, error: null };
    } catch (fallbackErr) {
      return { content: null, loading: false, error: `Failed to load homepage content in ${language} or English` };
    }
  }
}

// Client-side hook for use in client components
export function useHomepageContent(language: string = 'en') {
  // For client components, we'll implement useEffect-based loading
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadContent = async () => {
      try {
        setLoading(true);
        const result = await loadHomepageContent(language);
        
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