"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Dynamic import to avoid SSR issues
const FooterClient = React.lazy(() => import('./footer-client'));

export const LanguageFooter: React.FC = () => {
  const pathname = usePathname();
  const [language, setLanguage] = useState<string>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Detect language from URL path
    const langMatch = pathname?.match(/^\/(br|pl|de|es)/);
    const detectedLanguage = langMatch ? langMatch[1] : "en";
    setLanguage(detectedLanguage);
  }, [pathname]);

  if (!mounted) {
    return <footer className="bg-gray-900 text-white py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">Loading...</div></footer>;
  }

  return (
    <React.Suspense fallback={<footer className="bg-gray-900 text-white py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">Loading...</div></footer>}>
      <FooterClient language={language} key={language} />
    </React.Suspense>
  );
};