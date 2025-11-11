import { useState, useEffect } from 'react';

// Note: This hook is designed to work in both client and server components
// For server components, it should be called directly (not with useEffect)
// For client components, it will work with useEffect

interface CalculatorContent {
  pageTitle: string;
  pageDescription: string;
  form: {
    labels: {
      age: string;
      gender: string;
      height: string;
      weight: string;
      unitSystem: string;
    };
    placeholders: {
      age: string;
      heightFt: string;
      heightIn: string;
      heightCm: string;
      weight: string;
    };
    buttons: {
      calculate: string;
      reset: string;
    };
    unitSystems: {
      us: string;
      metric: string;
    };
  };
  results: {
    bmiValue: string;
    classification: string;
    healthyRange: string;
    bmiResultsTitle: string;
    bmiFormula: {
      label: string;
      us: string;
      metric: string;
    };
    healthyBmiRange: string;
  };
  educational: {
    classifications: string;
    criticalWarnings: string;
    importantNotes: string;
    healthyRange: string;
    disclaimer: string;
    seekHelp: string;
    bmiClassifications: {
      normal: {
        title: string;
        description: string;
      };
      mildAnorexia: {
        title: string;
        description: string;
      };
      moderateAnorexia: {
        title: string;
        description: string;
      };
      severeAnorexia: {
        title: string;
        description: string;
      };
      extremeAnorexia: {
        title: string;
        description: string;
      };
    };
    criticalWarningsList: {
      organFailure: string;
      lifeThreatening: string;
    };
    importantNotesList: string[];
    healthyRangeDetails: {
      title: string;
      description: string;
      association: string;
    };
  };
  messages: {
    enterMeasurements: string;
    doesNotSuggestAnorexia: string;
    suggestsAnorexia: string;
    lifeThreateningCondition: string;
    riskOfOrganFailure: string;
    ageWarning: string;
    assessmentResult: string;
    bmiAnalysis: string;
  };
  disclaimer: {
    title: string;
    content: string;
  };
  seekHelp: {
    title: string;
    content: string;
  };
  errors: {
    age: string;
    gender: string;
    heightFt: string;
    heightIn: string;
    heightCm: string;
    weight: string;
  };
  tooltips: {
    age: string;
    height: string;
    weight: string;
  };
}

// Server-side function to load content
export async function loadCalculatorContent(calculatorId: string, language: string = 'en', contentType: string = 'calculator-ui') {
  try {
    // Dynamically import the content based on calculator ID, language, and content type
    let contentModule;
    if (contentType === 'calculator-guide') {
      contentModule = await import(`@/app/content/calculator-guide/${calculatorId}/${language}.json`);
    } else {
      // Default to calculator-ui
      contentModule = await import(`@/app/content/calculator-ui/${calculatorId}/${language}.json`);
    }
    return { content: contentModule.default, loading: false, error: null };
  } catch (err) {
    // If language-specific content doesn't exist, fall back to English
    try {
      let contentModule;
      if (contentType === 'calculator-guide') {
        contentModule = await import(`@/app/content/calculator-guide/${calculatorId}/en.json`);
      } else {
        // Default to calculator-ui
        contentModule = await import(`@/app/content/calculator-ui/${calculatorId}/en.json`);
      }
      return { content: contentModule.default, loading: false, error: null };
    } catch (fallbackErr) {
      return { content: null, loading: false, error: `Failed to load content for ${calculatorId} in ${language} or English` };
    }
  }
}

// Client-side hook for use in client components
export function useCalculatorContent(calculatorId: string, language: string = 'en', contentType: string = 'calculator-ui') {
  // For client components, we'll implement useEffect-based loading
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadContent = async () => {
      try {
        setLoading(true);
        const result = await loadCalculatorContent(calculatorId, language, contentType);
        
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
  }, [calculatorId, language, contentType]);

  return { content, loading, error };
}