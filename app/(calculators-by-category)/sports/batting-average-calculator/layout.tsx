import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for batting-average-calculator
const battingaveragecalculatorMeta = {
  en: {
    title: "Batting Average Calculator – Stats Online | TheSmartCalculator",
    description: "Use the Batting Average Calculator to compute average and related baseball statistics. Accurate, free online tool for players and fans in performance analysis.",
    keywords: "batting average calculator, baseball stats, average tool, online batting, performance analysis, free average calculator, player stats, fan tool"
  },
  br: {
    title: "Batting Average Calculator – Stats Online | TheSmartCalculator",
    description: "Use a Calculadora Média de Rebatidas para calcular média e estatísticas relacionadas ao beisebol. Ferramenta precisa para jogadores e fãs em análise de desempenho.",
    keywords: "calculadora média rebatidas, estatísticas beisebol, média tool, online rebatidas, análise desempenho, gratuita calculadora, jogadores stats"
  },
  pl: {
    title: "Kalkulator Średniej Uderzeń – Statystyki Online | TheSmartCalculator",
    description: "Użyj kalkulatora średniej uderzeń online, aby obliczyć średnią i powiązane statystyki baseballu. Dokładne narzędzie dla graczy i fanów do analizy.",
    keywords: "kalkulator średniej uderzeń, statystyki baseball, średnia tool, online uderzenia, analiza wydajności, darmowy kalkulator, gracze stats"
  },
  de: {
    title: "Batting Average Calculator – Stats Online | TheSmartCalculator",
    description: "Berechne mit dem Schlagdurchschnitt Rechner Durchschnitt und Baseball-Statistiken. Präzises Tool für Spieler und Fans zur Leistungsanalyse online.",
    keywords: "schlagdurchschnitt rechner, stats berechnen, baseball statistiken, online schlag, leistungsanalyse, kostenloser tool, spieler fans"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && battingaveragecalculatorMeta[langHeader as keyof typeof battingaveragecalculatorMeta]
      ? langHeader
      : "en";

  const meta = battingaveragecalculatorMeta[language as keyof typeof battingaveragecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('batting-average-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('batting-average-calculator', 'en'),
        'pt-BR': getCanonicalUrl('batting-average-calculator', 'br'),
        'pl': getCanonicalUrl('batting-average-calculator', 'pl'),
        'de': getCanonicalUrl('batting-average-calculator', 'de'),
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

export default async function BattingAverageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Batting Average Calculator",
    "url": "https://www.thesmartcalculator.com/sports/batting-average-calculator",
    "description": "Free online Batting Average Calculator to quickly calculate a baseball player's batting average from hits and at-bats. Perfect for players, coaches, fans, and fantasy baseball.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Batting Average Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Instant batting average calculation",
          "Accurate results using standard formula Hits ÷ At-Bats",
          "Easy-to-use interface",
          "Mobile-friendly",
          "Ideal for players, coaches, and fantasy baseball enthusiasts"
        ],
        "url": "https://www.thesmartcalculator.com/sports/batting-average-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Batting Average Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Batting Average Calculator",
            "text": "Input the total number of hits the player has made."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Batting Average Calculator",
            "text": "Input the number of official at-bats (excluding walks, sacrifices, and hit-by-pitch)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Batting Average Calculator",
            "text": "View the batting average instantly, usually rounded to three decimal places."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Batting Average Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It calculates a baseball player's batting average using hits and official at-bats."
            }
          },
          {
            "@type": "Question",
            "name": "How is batting average calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the formula: Batting Average = Hits ÷ At-Bats."
            }
          },
          {
            "@type": "Question",
            "name": "Does it include walks or sacrifices?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, only official at-bats are counted for accurate results."
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
              "text": "Yes, it’s completely free and works online with no downloads."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it for fantasy baseball?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it helps track player stats and batting averages quickly."
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
            "name": "Why use a Batting Average Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It saves time, ensures accurate calculations, and simplifies tracking performance."
            }
          },
          {
            "@type": "Question",
            "name": "Can it track multiple players?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, by entering stats individually for each player."
            }
          },
          {
            "@type": "Question",
            "name": "Is the result exact?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the calculator provides an accurate batting average based on the entered hits and at-bats."
            }
          }
        ]
      }
    ]
  }

  return (
    <>
      {children}
      <Script
        id="batting-average-calculator-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
    </>
  );
}
