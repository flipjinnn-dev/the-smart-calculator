"use client"

import React, { useState, useEffect } from 'react';
import { Footer } from './footer';

export const LanguageFooter: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    // First try to get language from headers (set by middleware)
    const headerLanguage = document.head.querySelector('meta[name="x-language"]')?.getAttribute('content');
    if (headerLanguage) {
      setLanguage(headerLanguage);
      return;
    }
    
    // Fallback to URL path detection
    const path = window.location.pathname;
    const langMatch = path.match(/^\/(br|pl|de|es)/);
    const detectedLanguage = langMatch ? langMatch[1] : "en";
    setLanguage(detectedLanguage);
  }, []);

  return <Footer language={language} />;
};