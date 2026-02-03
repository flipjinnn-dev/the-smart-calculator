import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for cooking-measurement-converter
const cookingmeasurementconverterMeta = {
  en: {
    title: "Cooking Measurement Converter Kitchen Unit Converter",
    description: "Convert cooking measurements fast using our Cooking Measurement Converter for teaspoons, cups, grams, and more.",
    keywords: "cooking measurement converter, units tool, cups grams, spoons calculation, online converter, recipe adjustment, free cooking tool, kitchen calculator"
  },
  br: {
    title: "Conversor Medidas Culinárias – Ingredientes Fácil",
    description: "Use o Conversor de Medidas Culinárias para transformar gramas, litros e colheres. Cozinhe com precisão e pratique receitas sem erros de medida.",
    keywords: "conversor medidas culinárias, transformar gramas, litros colheres, precisão receitas, online conversor, sem erros, cozinha tool"
  },
  pl: {
    title: "Przelicznik Miar Kuchennych – Przeliczaj Online Szybko",
    description: "Użyj przelicznika miar kuchennych online, aby łatwo przeliczać gramy, mililitry i porcje. Proste, szybkie i darmowe narzędzie kulinarne.",
    keywords: "przelicznik miar kuchennych, przeliczać gramy, mililitry porcje, narzędzie kulinarne, online miary, szybkie darmowe, przepisy tool"
  },
  de: {
    title: "Kochmaße Umrechner – Einheiten einfach umrechnen online",
    description: "Umrechne mit dem Kochmaße Umrechner Einheiten wie Tassen, Gramm und Löffel. Präzises, kostenloses Online Tool für Alltag und Beruf.",
    keywords: "kochmaße umrechner, einheiten tool, tassen gramm, löffel berechnung, online umrechner, rezepte anpassung, kostenloser tool"
  }
,
  es: {
    title: "Convertidor de Medidas de Cocina – Fácil y Rápido",
    description: "Convierte ingredientes de cocina entre gramos, tazas, onzas y más al instante. ¡Simplifica tus recetas y cocina con precisión ahora mismo!",
    keywords: "convertidor, medidas, cocina, fácil, rápido, convierte, ingredientes, entre, gramos, tazas, onzas, instante, simplifica, recetas, precisión"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && cookingmeasurementconverterMeta[langHeader as keyof typeof cookingmeasurementconverterMeta]
      ? langHeader
      : "en";

  const meta = cookingmeasurementconverterMeta[language as keyof typeof cookingmeasurementconverterMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('cooking-measurement-converter', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('cooking-measurement-converter', 'en'),
        'en': getCanonicalUrl('cooking-measurement-converter', 'en'),
        'es': getCanonicalUrl('cooking-measurement-converter', 'es'),
        'pt-BR': getCanonicalUrl('cooking-measurement-converter', 'br'),
        'pl': getCanonicalUrl('cooking-measurement-converter', 'pl'),
        'de': getCanonicalUrl('cooking-measurement-converter', 'de'),
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

export default async function CookingMeasurementConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cooking Measurement Converter",
    "url": "https://www.thesmartcalculator.com/food/cooking-measurement-converter",
    "description": "Free online Cooking Measurement Converter to convert ingredients between cups, teaspoons, tablespoons, grams, ounces, milliliters, and liters for accurate cooking and baking.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Cooking Measurement Converter",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Instantly converts between all common cooking units",
          "Supports cups, teaspoons, tablespoons, grams, ounces, milliliters, liters, and more",
          "Optional ingredient selection for accurate volume-to-weight conversions",
          "Mobile-friendly and easy-to-use",
          "Ideal for home cooks, bakers, chefs, and nutrition tracking"
        ],
        "url": "https://www.thesmartcalculator.com/food/cooking-measurement-converter"
      },
      {
        "@type": "HowTo",
        "name": "Cooking Measurement Converter",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Cooking Measurement Converter",
            "text": "Type the amount you want to convert."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Cooking Measurement Converter",
            "text": "Choose the unit of your input (cup, gram, tablespoon, etc.)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Cooking Measurement Converter",
            "text": "Choose the unit to convert to."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Cooking Measurement Converter",
            "text": "Get the instant conversion result."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Cooking Measurement Converter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It converts ingredients between different cooking and baking units quickly and accurately."
            }
          },
          {
            "@type": "Question",
            "name": "Can it convert cups to grams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, especially for most common ingredients."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support all ingredients?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It supports most common ingredients; density may vary slightly for some."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert teaspoons to milliliters?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all standard volume units are supported."
            }
          },
          {
            "@type": "Question",
            "name": "Is it accurate for baking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, especially when using weight-based units like grams or ounces."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it on mobile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the calculator is fully mobile-friendly."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, completely free and works online with no downloads."
            }
          },
          {
            "@type": "Question",
            "name": "Can I scale recipes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can adjust ingredient quantities for larger or smaller servings."
            }
          },
          {
            "@type": "Question",
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Home cooks, bakers, chefs, nutritionists, and students."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to select an ingredient?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Selecting the ingredient is optional but recommended for accurate volume-to-weight conversions."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="cooking-measurement-converter-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
