import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for butter-calculator
const buttercalculatorMeta = {
  en: {
    title: "Butter Calculator – Measurements Converter Online | TheSmartCa",
    description: "Use the Butter Calculator to convert measurements between sticks, cups, tablespoons, teaspoons, and grams. Accurate, free online tool for cooking and baking.",
    keywords: "butter calculator, measurements converter, sticks cups, tablespoons tool, online butter, cooking calculator, free converter, baking tool"
  },
  br: {
    title: "Calculadora Manteiga – Conversor Medidas Online | TheSmartCalculator",
    description: "Use a Calculadora Manteiga para converter medidas entre barras, xícaras, colheres e gramas. Ferramenta precisa e gratuita para cozinhar e assar receitas.",
    keywords: "calculadora manteiga, conversor medidas, barras xícaras, colheres gramas, online manteiga, cozinhar tool, gratuita conversor"
  },
  pl: {
    title: "Kalkulator Masło – Przelicznik Medidas Online | TheSmartCalculator",
    description: "Użyj kalkulatora masło online, aby przeliczać miary między patykami, kubkami, łyżkami i gramami. Dokładne, darmowe narzędzie do gotowania i pieczenia.",
    keywords: "kalkulator masło, przelicznik miary, patyki kubki, łyżki gramy, online masło, gotowanie tool, darmowy przelicznik"
  },
  de: {
    title: "Butter Rechner – Maße Umrechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Butter Rechner Umrechnungen zwischen Sticks, Tassen, Löffeln und Gramm. Präzises, kostenloses Tool für Kochen und Backen.",
    keywords: "butter rechner, maße umrechnen, sticks tassen, löffel gramm, online butter, kochen backen, kostenloser tool"
  }
,
  es: {
    title: "Convertidor de Mantequilla – Convierte Medidas Fácil y Rápido",
    description: "Convierte mantequilla entre gramos, tazas y onzas al instante con nuestra herramienta precisa. ¡Simplifica tus recetas y cocina sin errores ahora mismo!",
    keywords: "convertidor, mantequilla, convierte, medidas, fácil, rápido, entre, gramos, tazas, onzas, instante, nuestra, herramienta, precisa, simplifica"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && buttercalculatorMeta[langHeader as keyof typeof buttercalculatorMeta]
      ? langHeader
      : "en";

  const meta = buttercalculatorMeta[language as keyof typeof buttercalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('butter-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }butter-calculator`,
      languages: {
        'en': getCanonicalUrl('butter-calculator', 'en'),
        'es': getCanonicalUrl('butter-calculator', 'es'),
        'pt-BR': getCanonicalUrl('butter-calculator', 'br'),
        'pl': getCanonicalUrl('butter-calculator', 'pl'),
        'de': getCanonicalUrl('butter-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }butter-calculator`,
    },
  };
}

export default async function ButterCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Butter Calculator",
    "url": "https://www.thesmartcalculator.com/food/butter-calculator",
    "description": "Free online Butter Calculator to instantly convert butter between sticks, cups, grams, ounces, tablespoons, and milliliters for baking and cooking.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Butter Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Instantly converts butter between sticks, cups, tablespoons, grams, ounces, and milliliters",
          "Accurate and reliable for baking and cooking",
          "Supports both US and metric units",
          "Mobile-friendly and easy-to-use",
          "Perfect for international recipe conversions and nutrition tracking"
        ],
        "url": "https://www.thesmartcalculator.com/food/butter-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Butter Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Butter Calculator",
            "text": "Type the quantity of butter in any supported unit."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Butter Calculator",
            "text": "Choose the unit of your input (stick, cup, gram, etc.)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Butter Calculator",
            "text": "Select the unit(s) you want to convert to."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Butter Calculator",
            "text": "Get the equivalent butter amount instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does this calculator do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It converts butter between sticks, cups, tablespoons, grams, ounces, and milliliters."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert sticks to grams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, simply input the number of sticks and select grams as the target unit."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support metric units?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, grams and milliliters are included."
            }
          },
          {
            "@type": "Question",
            "name": "Is it accurate for baking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it uses standard butter conversion ratios widely accepted in cooking."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert tablespoons to cups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all common volume units are supported."
            }
          },
          {
            "@type": "Question",
            "name": "Is it mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works on smartphones, tablets, and desktops."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it for diet tracking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it helps measure butter precisely for nutrition calculations."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the Butter Calculator is completely free and requires no downloads."
            }
          },
          {
            "@type": "Question",
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bakers, chefs, home cooks, nutritionists, and anyone following recipes."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert fractional amounts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the calculator supports fractional values for precise conversions."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="butter-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
