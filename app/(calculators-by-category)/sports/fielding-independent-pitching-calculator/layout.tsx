import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for fielding-independent-pitching-calculator
const fieldingindependentpitchingcalculatorMeta = {
  en: {
    title: "Fielding Independent Pitching Calculator – FIP Online | TheSma",
    description: "Use the Fielding Independent Pitching  – FIP Online | TheSmartCalculator calculator to get instant, accurate results. Fast inputs, clear outputs, and helpful co.",
    keywords: "calculadora arremesso independente, fip tool, jogadores beisebol, estatísticas cálculo, online fip, avaliação arremessadores, gratuita calculadora"
  },
  br: {
    title: "Fielding Independent Pitching Calculator – FIP Online | TheSma",
    description: "Użyj kalkulatora niezależnego miotania pola online, aby obliczyć FIP dla graczy baseballu. Dokładne narzędzie do analizy statystyk i oceny miotaczy.",
    keywords: "kalkulator niezależnego miotania, fip tool, gracze baseball, statystyki obliczenia, online fip, ocena miotaczy, darmowy tool"
  },
  pl: {
    title: "Fielding Independent Pitching Calculator – FIP Online | TheSma",
    description: "Berechne mit dem Feldunabhängiger Pitching Rechner FIP für Baseballspieler. Präzises Tool für Stats-Analyse und Pitcher-Bewertung kostenlos.",
    keywords: "feldunabhängiger pitching rechner, fip berechnen, baseballspieler tool, stats analyse, online fip, pitcher bewertung, kostenloser rechner"
  },
  de: {
    title: "Fielding Independent Pitching Calculator – FIP Online | TheSma",
    description: "Berechne mit dem Feldunabhängiger Pitching Rechner FIP für Baseballspieler. Präzises Tool für Stats-Analyse und Pitcher-Bewertung kostenlos., feldunabhängiger pitching rechner",
    keywords: "calculadora arremesso independente, fip tool, jogadores beisebol, estatísticas cálculo, online fip, avaliação arremessadores, gratuita calculadora"
  }
,
  es: {
    title: "Calculadora FIP – Calcula tu Inversión Fácil y Rápido",
    description: "Calcula tu Fondo de Inversión Pública (FIP) al instante con nuestra herramienta precisa. ¡Optimiza tus inversiones y toma decisiones inteligentes ahora",
    keywords: "calculadora, calcula, inversión, fácil, rápido, fondo, pública, instante, nuestra, herramienta, precisa, optimiza, inversiones, toma, decisiones"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && fieldingindependentpitchingcalculatorMeta[langHeader as keyof typeof fieldingindependentpitchingcalculatorMeta]
      ? langHeader
      : "en";

  const meta = fieldingindependentpitchingcalculatorMeta[language as keyof typeof fieldingindependentpitchingcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('fielding-independent-pitching-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('fielding-independent-pitching-calculator', 'en'),
        'es': getCanonicalUrl('fielding-independent-pitching-calculator', 'es'),
        'pt-BR': getCanonicalUrl('fielding-independent-pitching-calculator', 'br'),
        'pl': getCanonicalUrl('fielding-independent-pitching-calculator', 'pl'),
        'de': getCanonicalUrl('fielding-independent-pitching-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
    },
  };
}

export default async function FieldingIndependentPitchingCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Fielding Independent Pitching Calculator",
    "url": "https://www.thesmartcalculator.com/sports/fielding-independent-pitching-calculator",
    "description": "Free online FIP Calculator to calculate Fielding Independent Pitching using HR, BB, HBP, K, and IP. Ideal for players, coaches, analysts, and fantasy baseball users.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Fielding Independent Pitching Calculator",
        "applicationCategory": "SportsCalculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Instant FIP calculation",
          "Defense-independent pitching metric",
          "Accurate formula-based results",
          "Mobile-friendly interface",
          "Useful for players, coaches, and analysts"
        ],
        "url": "https://www.thesmartcalculator.com/sports/fielding-independent-pitching-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Fielding Independent Pitching Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Fielding Independent Pitching Calculator",
            "text": "Input the number of home runs allowed."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Fielding Independent Pitching Calculator",
            "text": "Add the total walks issued."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Fielding Independent Pitching Calculator",
            "text": "Enter the hit-by-pitch count."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Fielding Independent Pitching Calculator",
            "text": "Input the number of strikeouts."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Fielding Independent Pitching Calculator",
            "text": "Provide the total innings pitched."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Fielding Independent Pitching Calculator",
            "text": "Click the button to get the FIP score instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a FIP Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It calculates a pitcher's Fielding Independent Pitching using HR, BB, HBP, K, and IP."
            }
          },
          {
            "@type": "Question",
            "name": "Does FIP include team defense?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, FIP focuses only on outcomes the pitcher controls."
            }
          },
          {
            "@type": "Question",
            "name": "Is this FIP Calculator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is 100% free to use on all devices."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this for fantasy baseball?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, FIP is widely used in fantasy baseball analysis."
            }
          }
        ]
      }
    ]
  }

  return <>
    {children}
    <Script
      id="fielding-independent-pitching-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
