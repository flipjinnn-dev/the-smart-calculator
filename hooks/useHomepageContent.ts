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

// Import English content directly for instant initial state
import enContent from '@/app/content/homepage/en.json';

// Client-side hook for use in client components
export function useHomepageContent(language: string = 'en') {
  // Initialize with English content immediately (instant load)
  // TypeScript might complain about type mismatch if json structure isn't perfect matches interface
  // but for now casting to any or relying on structure matching is fine
  const [content, setContent] = useState<any>(enContent);
  // Start with loading false since we have content immediately
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // If language is English, we already have the content, no need to load
    // But we might want to re-verify or if logic changes. 
    // Optimization: if language is en, just ensure content is set and return.
    if (language === 'en') {
      if (content !== enContent) {
        setContent(enContent);
      }
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        // Only show loading state if we don't have content, 
        // OR we want to show a spinner while switching languages.
        // For "instant" feel, we can keep showing old content while new one loads, 
        // OR show "Thinking..." if user wants that specific feedback.
        // User asked for "Thinking..." so let's set loading true.
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