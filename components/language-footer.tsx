"use client"

import { useState, useEffect, type FC } from 'react';
import { usePathname } from 'next/navigation';
import FooterClient from './footer-client';

export const LanguageFooter: FC = () => {
  const pathname = usePathname();
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const langMatch = pathname?.match(/^\/(br|pl|de|es)/);
    const detectedLanguage = langMatch ? langMatch[1] : "en";
    setLanguage(detectedLanguage);
  }, [pathname]);

  return <FooterClient language={language} key={language} />;
};