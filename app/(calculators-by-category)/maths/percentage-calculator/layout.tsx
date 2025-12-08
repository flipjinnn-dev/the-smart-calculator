import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for percentage-calculator
const percentagecalculatorMeta = {
  en: {
    title: "Percentage Calculator – Ratios Changes Online | TheSmartCalculator",
    description: "Use the Percentage Calculator to calculate percentages, ratios, and percentage changes easily. Accurate, free online tool for math and finance calculations.",
    keywords: "percentage calculator, percentages ratios, change calculation, online percentage, math finance, free percentage tool, ratio tool, change estimator"
  },
  br: {
    title: "Calculadora de Porcentagem – Calcule Descontos e Aumentos",
    description: "Use a Calculadora de Porcentagem para calcular descontos, acréscimos e porcentagens em geral. Ferramenta rápida e precisa para seus cálculos diários.",
    keywords: "calculadora porcentagem, porcentagens razões, cálculo mudança, online porcentagem, matemática finanças, gratuita ferramenta porcentagem, ferramenta razão, estimador mudança"
  },
  pl: {
    title: "Kalkulator Procentowy – Oblicz Procent Online Szybko",
    description: "Użyj kalkulatora procentowego online, aby szybko obliczyć procenty, wartości i różnice. Proste, dokładne i darmowe narzędzie matematyczne.",
    keywords: "kalkulator procentowy, procenty stosunki, obliczenia zmiany, online procent, matematyka finanse, darmowe narzędzie procentowe, narzędzie stosunek, estymator zmiany"
  },
  de: {
    title: "Prozentrechner – Prozent einfach & schnell online berechnen",
    description: "Berechne mit dem Prozentrechner Prozente, Prozentwerte & Veränderungen. Schnell, genau & kostenlos – ideal für Schule, Beruf & Alltag!",
    keywords: "prozentrechner, prozente verhältnisse, ändern berechnung, online prozent, math finanz, kostenloser prozent tool, verhältnis tool, ändern schätzer"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && percentagecalculatorMeta[langHeader as keyof typeof percentagecalculatorMeta]
      ? langHeader
      : "en";

  const meta = percentagecalculatorMeta[language as keyof typeof percentagecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('percentage-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('percentage-calculator', 'en'),
        'pt-BR': getCanonicalUrl('percentage-calculator', 'br'),
        'pl': getCanonicalUrl('percentage-calculator', 'pl'),
        'de': getCanonicalUrl('percentage-calculator', 'de'),
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

export default async function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Percentage Calculator – Online Percent Calculator Tool",
    "url": "https://www.thesmartcalculator.com/maths/percentage-calculator",
    "description": "Free online Percentage Calculator to find percentages, percent increase, percent decrease, average percentage, and convert numbers to percentages quickly and accurately.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Percentage Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Percentage Calculation",
          "Average Percentage Calculator",
          "Percentage Converter",
          "Percent Increase Calculator",
          "Percent Decrease Calculator",
          "Percentage Change Calculator"
        ],
        "url": "https://www.thesmartcalculator.com/maths/percentage-calculator"
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Percentage Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter the initial value",
            "text": "Enter the starting number for your percentage calculation."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter percentage",
            "text": "Type the percentage you want to apply to the value."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Select calculation type",
            "text": "Choose percentage, percent increase, percent decrease, or percentage change."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Click Calculate",
            "text": "Click the calculate button to get instant and accurate results."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Percentage Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is an online tool that helps you perform any type of percentage calculation instantly and accurately."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate a percentage manually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the formula: Percentage = (Part ÷ Whole) × 100."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate percent increase with this tool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, use the percent increase calculator mode."
            }
          },
          {
            "@type": "Question",
            "name": "Does this tool support percent decrease?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the percent decrease calculator shows decrease percentage clearly."
            }
          },
          {
            "@type": "Question",
            "name": "What is a Percentage Change Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It calculates both increase and decrease between two values."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert percentages to numbers or numbers to percentages?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, use the percentage converter feature."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator accurate for school or college assignments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely — it follows standard mathematical formulas."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate average percentage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the Average Percentage Calculator mode allows you to add multiple percentage values."
            }
          },
          {
            "@type": "Question",
            "name": "Is this percent calculator online free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it’s 100% free and works on all devices."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to download anything?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, the tool works completely online with no installation required."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="percentage-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
