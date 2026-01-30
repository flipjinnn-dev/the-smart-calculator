import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for cups-to-pounds-converter
const cupstopoundsconverterMeta = {
  en: {
    title: "Cups to Pounds Converter – Ingredients Online | TheSmartCalculator",
    description: "Use the Cups to Pounds Converter to convert cups to pounds for various ingredients. Accurate, free online tool for cooking, baking, and recipe adjustments.",
    keywords: "cups to pounds converter, ingredients tool, measurements calculation, online converter, cooking baking, recipe adjustment, free cups tool, pounds estimate"
  },
  br: {
    title: "Conversor Xícaras Libras – Ingredientes Online | TheSmartCalculator",
    description: "Use o Conversor de Xícaras para Libras para converter medidas de vários ingredientes. Ferramenta precisa e gratuita para cozinhar, assar e ajustes de receitas.",
    keywords: "conversor xícaras libras, ingredientes tool, medidas cálculo, online conversor, cozinhar assar, ajustes receitas, gratuita tool"
  },
  pl: {
    title: "Przelicznik Filiżanek Funty – Składniki Online | TheSmartCalculator",
    description: "Użyj przelicznika filiżanek na funty online, aby przeliczać miary różnych składników. Dokładne, darmowe narzędzie do gotowania, pieczenia i przepisów.",
    keywords: "przelicznik filiżanek funty, składniki tool, miary obliczenia, online przelicznik, gotowanie pieczenie, przepisy dostosowanie, darmowy tool"
  },
  de: {
    title: "Tassen zu Pfund Umrechner – Zutaten Online | TheSmartCalculator",
    description: "Umrechne mit dem Tassen zu Pfund Umrechner Maße für verschiedene Zutaten. Präzises, kostenloses Tool für Kochen, Backen und Rezeptanpassungen.",
    keywords: "tassen pfund umrechner, zutaten tool, maße berechnung, online umrechner, kochen backen, rezept anpassung, kostenloser tool"
  }
,
  es: {
    title: "Conversor de Tazas a Libras – Calcula Fácil y Rápido",
    description: "Convierte tazas a libras al instante con nuestra herramienta precisa. ¡Simplifica tus recetas y cocina con medidas exactas ahora mismo!",
    keywords: "conversor, tazas, libras, calcula, fácil, rápido, convierte, instante, nuestra, herramienta, precisa, simplifica, recetas, cocina, medidas"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && cupstopoundsconverterMeta[langHeader as keyof typeof cupstopoundsconverterMeta]
      ? langHeader
      : "en";

  const meta = cupstopoundsconverterMeta[language as keyof typeof cupstopoundsconverterMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('cups-to-pounds-converter', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('cups-to-pounds-converter', 'en'),
        'en': getCanonicalUrl('cups-to-pounds-converter', 'en'),
        'es': getCanonicalUrl('cups-to-pounds-converter', 'es'),
        'pt-BR': getCanonicalUrl('cups-to-pounds-converter', 'br'),
        'pl': getCanonicalUrl('cups-to-pounds-converter', 'pl'),
        'de': getCanonicalUrl('cups-to-pounds-converter', 'de'),
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

export default async function CupsToPoundsConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cups to Pounds Conversion",
    "url": "https://www.thesmartcalculator.com/food/cups-to-pounds-converter",
    "description": "Free online Cups to Pounds Converter to quickly convert ingredients between cups and pounds for accurate baking and cooking.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Cups to Pounds Converter",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Instant conversion between cups and pounds",
          "Supports common ingredients like flour, sugar, butter, and water",
          "Ingredient-based conversion for accurate results",
          "Mobile-friendly and easy-to-use",
          "Ideal for home cooks, bakers, and chefs"
        ],
        "url": "https://www.thesmartcalculator.com/food/cups-to-pounds-converter"
      },
      {
        "@type": "HowTo",
        "name": "Cups to Pounds Converter",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Cups to Pounds Converter",
            "text": "Choose the ingredient for accurate volume-to-weight conversion (optional)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Cups to Pounds Converter",
            "text": "Type the amount in cups or pounds."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Cups to Pounds Converter",
            "text": "Choose the source unit and target unit (cups or pounds)."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Cups to Pounds Converter",
            "text": "Get the instant conversion result."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Cups to Pounds Converter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It converts ingredient measurements between cups and pounds for accurate cooking and baking."
            }
          },
          {
            "@type": "Question",
            "name": "Can it convert all ingredients?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works for most common ingredients; minor variations may occur."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to select the ingredient?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ingredient selection is optional but recommended for precise results."
            }
          },
          {
            "@type": "Question",
            "name": "Is it accurate for baking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, especially when using weight-based measurements like pounds or ounces."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert pounds to cups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works both ways."
            }
          },
          {
            "@type": "Question",
            "name": "Is it mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, fully compatible with all devices."
            }
          },
          {
            "@type": "Question",
            "name": "Is this converter free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it’s completely free and works online."
            }
          },
          {
            "@type": "Question",
            "name": "Can I scale recipes with this tool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, adjust ingredient quantities for larger or smaller servings."
            }
          },
          {
            "@type": "Question",
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Home cooks, bakers, chefs, and anyone following recipes with cups or pounds."
            }
          },
          {
            "@type": "Question",
            "name": "Why use this converter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To ensure accurate ingredient measurements and reduce errors in cooking and baking."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="cups-to-pounds-converter-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
