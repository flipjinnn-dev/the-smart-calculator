import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for fielding-percentage-calculator
const fieldingpercentagecalculatorMeta = {
  en: {
    title: "Fielding Percentage Calculator – Baseball Online | TheSmartCal",
    description: "Use the Fielding Percentage Calculator to compute percentage for baseball players. Accurate, free online tool for stats tracking and performance analysis.",
    keywords: "fielding percentage calculator, baseball tool, percentage calculation, online fielding, stats tracking, performance analysis, free percentage calculator, player tool"
  },
  br: {
    title: "Calculadora Porcentagem Campo – Beisebol Online | TheSmartCalculator",
    description: "Use a Calculadora Porcentagem Campo para calcular porcentagem para jogadores de beisebol. Ferramenta precisa para rastreamento de estatísticas e análise de desempenho.",
    keywords: "calculadora porcentagem campo, beisebol tool, cálculo porcentagem, online campo, estatísticas rastreamento, análise desempenho, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Procentu Pola – Baseball Online | TheSmartCalculator",
    description: "Użyj kalkulatora procentu pola online, aby obliczyć procent dla graczy baseballu. Dokładne narzędzie do śledzenia statystyk i analizy wydajności.",
    keywords: "kalkulator procentu pola, baseball tool, obliczyć procent, online pole, statystyki śledzenie, analiza wydajności, darmowy tool"
  },
  de: {
    title: "Feldprozentsatz Rechner – Baseball Berechnen | TheSmartCalculator",
    description: "Berechne mit dem Feldprozentsatz Rechner Prozentsatz für Baseballspieler. Präzises Tool für Stats-Tracking und Leistungsanalyse kostenlos.",
    keywords: "feldprozentsatz rechner, baseball berechnen, prozentsatz tool, online feld, stats tracking, leistungsanalyse, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora de Porcentaje de Fildeo – Calcula Fácil y Rápido",
    description: "Calcula el porcentaje de fildeo al instante con nuestra herramienta precisa. ¡Mejora tu rendimiento y toma decisiones deportivas inteligentes ahora mismo",
    keywords: "calculadora, porcentaje, fildeo, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, mejora, rendimiento, toma, decisiones, deportivas"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && fieldingpercentagecalculatorMeta[langHeader as keyof typeof fieldingpercentagecalculatorMeta]
      ? langHeader
      : "en";

  const meta = fieldingpercentagecalculatorMeta[language as keyof typeof fieldingpercentagecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('fielding-percentage-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('fielding-percentage-calculator', 'en'),
        'es': getCanonicalUrl('fielding-percentage-calculator', 'es'),
        'pt-BR': getCanonicalUrl('fielding-percentage-calculator', 'br'),
        'pl': getCanonicalUrl('fielding-percentage-calculator', 'pl'),
        'de': getCanonicalUrl('fielding-percentage-calculator', 'de'),
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

export default async function FieldingPercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Fielding Percentage Calculator",
    "url": "https://www.thesmartcalculator.com/sports/fielding-percentage-calculator",
    "description": "Free Fielding Percentage Calculator to calculate a fielder's defensive efficiency using putouts, assists, and errors. Ideal for players, coaches, scouts, and fans.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Fielding Percentage Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Instant Fielding Percentage calculation",
          "Accurate results using standard formula (Putouts + Assists ÷ Total Chances)",
          "Easy-to-use interface",
          "Mobile-friendly",
          "Ideal for players, coaches, scouts, and fans"
        ],
        "url": "https://www.thesmartcalculator.com/sports/fielding-percentage-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Fielding Percentage Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Fielding Percentage Calculator",
            "text": "Input the total putouts recorded by the fielder."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Fielding Percentage Calculator",
            "text": "Enter the total assists made by the fielder."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Fielding Percentage Calculator",
            "text": "Enter the total errors committed."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Fielding Percentage Calculator",
            "text": "View the fielder's Fielding Percentage instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Fielding Percentage Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It calculates a fielder’s defensive efficiency using putouts, assists, and errors."
            }
          },
          {
            "@type": "Question",
            "name": "How is Fielding Percentage calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the formula: Fielding Percentage = (Putouts + Assists) ÷ (Putouts + Assists + Errors)."
            }
          },
          {
            "@type": "Question",
            "name": "Does it include unattempted plays?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, only plays attempted are counted."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works on smartphones, tablets, and desktops."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, completely free online."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it for both baseball and softball?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works for both sports."
            }
          },
          {
            "@type": "Question",
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Players, coaches, scouts, analysts, and fans."
            }
          },
          {
            "@type": "Question",
            "name": "Why use a Fielding Percentage Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It saves time and provides an instant defensive efficiency measure."
            }
          },
          {
            "@type": "Question",
            "name": "Can it track multiple games or a season?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, by entering cumulative stats, you can calculate Fielding Percentage for any period."
            }
          },
          {
            "@type": "Question",
            "name": "Is the result accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides an accurate Fielding Percentage based on the inputs."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="fielding-percentage-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
