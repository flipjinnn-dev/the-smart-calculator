"use client";
import { useEffect } from 'react';

type PageId = 'about-us' | 'contact-us' | 'privacy-policy' | 'terms-and-conditions';

const mapping: Record<PageId, Record<string, string>> = {
  'about-us': {
    en: 'https://www.thesmartcalculator.com/about-us',
    br: 'https://www.thesmartcalculator.com/br/sobre-nos',
    pl: 'https://www.thesmartcalculator.com/pl/o-nas',
    de: 'https://www.thesmartcalculator.com/de/uber-uns',
  },
  'contact-us': {
    en: 'https://www.thesmartcalculator.com/contact-us',
    br: 'https://www.thesmartcalculator.com/br/contato',
    pl: 'https://www.thesmartcalculator.com/pl/kontakt',
    de: 'https://www.thesmartcalculator.com/de/kontakt',
  },
  'privacy-policy': {
    en: 'https://www.thesmartcalculator.com/privacy-policy',
    br: 'https://www.thesmartcalculator.com/br/politica-de-privacidade',
    pl: 'https://www.thesmartcalculator.com/pl/polityka-prywatnosci',
    de: 'https://www.thesmartcalculator.com/de/datenschutz',
  },
  'terms-and-conditions': {
    en: 'https://www.thesmartcalculator.com/terms-and-conditions',
    br: 'https://www.thesmartcalculator.com/br/termos-e-condicoes',
    pl: 'https://www.thesmartcalculator.com/pl/warunki',
    de: 'https://www.thesmartcalculator.com/de/nutzungsbedingungen',
  }
};

function setOrUpdateLink(rel: string, href: string, hreflang?: string) {
  let link: HTMLLinkElement | null = null;
  if (hreflang) {
    // try to find existing link with rel=alternate and hreflang
    link = Array.from(document.querySelectorAll('link[rel="alternate"]')).find(l => l.getAttribute('hreflang') === hreflang) as HTMLLinkElement | null;
  } else {
    link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  }

  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    if (hreflang) link.setAttribute('hreflang', hreflang);
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function ClientCanonical({ pageId }: { pageId: PageId }) {
  useEffect(() => {
    const pathname = window.location.pathname || '/';

    // Determine language from pathname prefix (/br, /pl, /de)
    const langMatch = pathname.match(/^\/(br|pl|de)(\/|$)/);
    const lang = langMatch ? langMatch[1] : 'en';

    // Map to our keys: 'br' -> br, 'pl' -> pl, 'de' -> de, 'en' -> en
    const pageMap = mapping[pageId];
    if (!pageMap) return;

    // Set canonical to the localized URL based on detected language
    const canonical = pageMap[lang as keyof typeof pageMap] || pageMap['en'];
    setOrUpdateLink('canonical', canonical);

    // Set alternate hreflang links for all languages
    setOrUpdateLink('alternate', pageMap['en'], 'en');
    setOrUpdateLink('alternate', pageMap['br'], 'pt-BR');
    setOrUpdateLink('alternate', pageMap['pl'], 'pl');
    setOrUpdateLink('alternate', pageMap['de'], 'de');
  }, [pageId]);

  return null;
}
