import { useEffect, useState } from 'react';

// This is a client-side hook to get the language from the URL or headers
export function useLanguage() {
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    // In a real implementation, we would get this from the request headers
    // For now, we'll check the URL to determine the language
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const langMatch = pathname.match(/^\/(br|pl|de)/);
      
      if (langMatch) {
        setLanguage(langMatch[1]);
      } else {
        setLanguage('en');
      }
    }
  }, []);
  
  return { language };
}