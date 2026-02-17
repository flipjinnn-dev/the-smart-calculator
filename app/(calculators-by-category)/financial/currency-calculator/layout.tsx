import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for currency-calculator
const currencycalculatorMeta = {
  en: {
    title: "currency converter",
    description: "Quickly convert currencies and track real-time exchange rates with our easy-to-use Currency Converter and calculator.",
    keywords: "currency converter calculator, conversion rates money calculator, currencies exchange rate calculator, converter rate calculator, current currency converter calculator, financial converter, free currency tool, exchange rates"
  },
  br: {
    title: "Conversor Moedas",
    description: "Converta moedas facilmente com nosso conversor online. Verifique taxas de câmbio e planeje suas finanças. Experimente agora!",
    keywords: "Conversor Moedas, conversão valores, taxas câmbio, online moedas, atualizadas rapidez, precisa tool, viagens negócios"
  },
  pl: {
    title: "Kalkulator walutowy",
    description: "Sprawdź kursy walut i przelicz online szybko i dokładnie. Skorzystaj z kalkulatora walutowego i planuj swoje finanse już dziś!",
    keywords: "kalkulator walutowy, przeliczyć kursy, wartości walut, narzędzie finansowe, online waluty, dokładne darmowe, konwersja handel"
  },
  de: {
    title: "Währungsrechner",
    description: "Mit dem Währungsrechner wechselst du schnell zwischen Euro und Fremdwährungen, inkl. aktuellem Kurs ideal für Reisen, Online-Shopping und Transfers.",
    keywords: "währungsrechner, umtausch berechnen, wechselkurse live, online währung, beträge umtauschen, schnell präzise, nutzen rechner"
  }
,
  es: {
    title: "Conversor de Divisas",
    description: "Convierte fácilmente cualquier moneda al instante. Usa este conversor de divisas online gratis y calcula tus importes de forma rápida y segura.",
    keywords: "Conversor de Divisas, convierte, monedas, instante, utiliza, nuestro, convertir, conocer, cambio, actual, gestionar, transacciones, internacionales, manera"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && currencycalculatorMeta[langHeader as keyof typeof currencycalculatorMeta]
      ? langHeader
      : "en";

  const meta = currencycalculatorMeta[language as keyof typeof currencycalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('currency-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('currency-calculator', 'en'),
        'en': getCanonicalUrl('currency-calculator', 'en'),
        'es': getCanonicalUrl('currency-calculator', 'es'),
        'pt-BR': getCanonicalUrl('currency-calculator', 'br'),
        'pl': getCanonicalUrl('currency-calculator', 'pl'),
        'de': getCanonicalUrl('currency-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function CurrencyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Currency Calculator",
          "item": "https://www.thesmartcalculator.com/financial/currency-calculator"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Salary Calculator",
          "item": "https://www.thesmartcalculator.com/financial/salary-calculator"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Finance Calculator",
          "item": "https://www.thesmartcalculator.com/financial/finance-calculator"
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/financial/currency-calculator#organization",
      "name": "Currency Calculator",
      "alternateName": "Currency Calculator",
      "url": "https://www.thesmartcalculator.com/financial/currency-calculator",
      "logo": "https://www.thesmartcalculator.com/",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+4955279784001",
        "contactType": "technical support",
        "contactOption": "TollFree",
        "areaServed": ["US","DE","PL","ES","PT"],
        "availableLanguage": ["en","es","de","pl","pt"]
      },
      "sameAs": [
        "https://www.pinterest.com/thesmartcalculators/",
        "https://www.linkedin.com/company/smart-calculator",
        "https://www.youtube.com/@TheSmartCalculators",
        "https://www.instagram.com/thesmartcalculators/",
        "https://x.com/SmartCalculat0r"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "bestRating": "5",
        "ratingCount": "3400"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.thesmartcalculator.com/creator/neo-nicholas",
      "name": "Neo Nicholas",
      "url": "https://www.thesmartcalculator.com/creator/neo-nicholas"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the most accurate online currency calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The most accurate calculators use live forex market data updated in real time—like this one."
          }
        },
        {
          "@type": "Question",
          "name": "How do currency calculators update rates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "They connect to global forex feeds and refresh automatically every few seconds."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this calculator for travel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it’s designed for international travelers to calculate costs abroad instantly without hidden fees."
          }
        },
        {
          "@type": "Question",
          "name": "What’s the difference between bank exchange rates and calculator rates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Banks usually add conversion margins and fees. This calculator shows mid-market rates so you can compare fairly."
          }
        },
        {
          "@type": "Question",
          "name": "Can I convert multiple currencies at once?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the multi-currency mode allows you to convert across several currencies in a single calculation."
          }
        },
        {
          "@type": "Question",
          "name": "Does it support cryptocurrency conversions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it supports both fiat currencies and major cryptocurrencies for real-time conversions."
          }
        }
      ]
    }
  ]
}
  return <>
  <Script 
  id="currency-calculator-json-ld"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
  strategy="afterInteractive"
  />
  {children}
  </>;
}
