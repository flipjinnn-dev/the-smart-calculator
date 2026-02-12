import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for earned-run-average-calculator
const earnedrunaveragecalculatorMeta = {
  en: {
    title: "ERA Calculator",
    description: "Compute earned run average quickly using our ERA Calculator for baseball and softball analysis.",
    keywords: "earned run average calculator, era tool, pitchers calculation, online earned, baseball stats, performance tracker, free era calculator, run average"
  },
  br: {
    title: "Calculadora da média de corridas merecidas",
    description: "Use a Calculadora ERA para calcular média de corridas ganhas para arremessadores no beisebol. Ferramenta precisa para análise de estatísticas e desempenho.",
    keywords: "calculadora era, corridas ganhas, arremessadores tool, online era, estatísticas beisebol, desempenho tracker, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Średniej Zdobytej Biegów – ERA Online",
    description: "Użyj kalkulatora średniej zdobytej biegów online, aby obliczyć ERA dla miotaczy w baseballu. Dokładne narzędzie do analizy statystyk i wydajności.",
    keywords: "kalkulator średniej biegów, era tool, miotacze obliczenia, online zdobyte, statystyki baseball, wydajność tracker, darmowy kalkulator"
  },
  de: {
    title: "Earned Run Average Calculator – ERA Online | TheSmartCalculato",
    description: "Berechne mit dem Earned Run Average Rechner ERA für Pitcher im Baseball. Präzises Tool für Stats-Analyse und Leistungsverfolgung kostenlos.",
    keywords: "earned run average rechner, era berechnen, pitcher tool, online earned, baseball stats, leistungs tracker, kostenloser rechner"
  }
,
  es: {
    title: "Promedio de Carreras Limpias – Calcula Fácil y Rápido",
    description: "Calcula tu promedio de carreras limpias al instante con nuestra herramienta precisa. ¡Mejora tu rendimiento y analiza tus estadísticas ahora mismo",
    keywords: "promedio, carreras, limpias, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, mejora, rendimiento, analiza, estadísticas, ahora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && earnedrunaveragecalculatorMeta[langHeader as keyof typeof earnedrunaveragecalculatorMeta]
      ? langHeader
      : "en";

  const meta = earnedrunaveragecalculatorMeta[language as keyof typeof earnedrunaveragecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('earned-run-average-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('earned-run-average-calculator', 'en'),
        'en': getCanonicalUrl('earned-run-average-calculator', 'en'),
        'es': getCanonicalUrl('earned-run-average-calculator', 'es'),
        'pt-BR': getCanonicalUrl('earned-run-average-calculator', 'br'),
        'pl': getCanonicalUrl('earned-run-average-calculator', 'pl'),
        'de': getCanonicalUrl('earned-run-average-calculator', 'de'),
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

export default async function EarnedRunAverageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Earned Run Average Calculator",
    "url": "https://www.thesmartcalculator.com/sports/earned-run-average-calculator",
    "description": "Free online ERA Calculator to quickly calculate a pitcher's Earned Run Average from earned runs and innings pitched. Perfect for players, coaches, fans, and fantasy baseball.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Earned Run Average Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Instant ERA calculation",
          "Accurate results using standard formula (Earned Runs ÷ Innings Pitched × 9)",
          "Easy-to-use interface",
          "Mobile-friendly",
          "Ideal for players, coaches, and fantasy baseball enthusiasts"
        ],
        "url": "https://www.thesmartcalculator.com/sports/earned-run-average-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Earned Run Average Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Earned Run Average Calculator",
            "text": "Input the total earned runs allowed by the pitcher."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Earned Run Average Calculator",
            "text": "Input the total innings pitched, including fractional innings (e.g., 6.1 = 6⅓ innings)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Earned Run Average Calculator",
            "text": "View the ERA instantly, rounded to two decimal places."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an ERA Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It calculates a pitcher's Earned Run Average using earned runs and innings pitched."
            }
          },
          {
            "@type": "Question",
            "name": "How is ERA calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the formula: ERA = (Earned Runs ÷ Innings Pitched) × 9."
            }
          },
          {
            "@type": "Question",
            "name": "Does it include unearned runs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, only earned runs are counted for accurate results."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator mobile-friendly?",
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
              "text": "Yes, the ERA Calculator is completely free online."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it for fantasy baseball?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it helps track pitcher stats and performance quickly."
            }
          },
          {
            "@type": "Question",
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Players, coaches, fans, analysts, and fantasy baseball enthusiasts."
            }
          },
          {
            "@type": "Question",
            "name": "Why use an ERA Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It saves time, ensures accurate calculations, and simplifies tracking pitcher performance."
            }
          },
          {
            "@type": "Question",
            "name": "Can it track multiple games or seasons?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, by entering cumulative earned runs and innings pitched, you can calculate ERA for any period."
            }
          },
          {
            "@type": "Question",
            "name": "Is the result exact?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the calculator provides an accurate ERA based on the entered earned runs and innings pitched."
            }
          }
        ]
      }
    ]
  }
  return <>
    <Script
      id="earned-run-average-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
    {children}
  </>;
}
