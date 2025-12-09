import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for dry-to-cooked-pasta-converter
const drytocookedpastaconverterMeta = {
  en: {
    title: "Dry to Cooked Pasta Converter – Measurements Online | TheSmart",
    description: "Use the Dry to Cooked Pasta Converter to convert dry measurements to cooked equivalents. Accurate, free online tool for cooking and portion planning.",
    keywords: "dry to cooked pasta converter, measurements tool, equivalents calculation, online pasta, cooking planning, portion calculator, free converter, pasta estimate"
  },
  br: {
    title: "Conversor Macarrão Cru para Cozido – Medidas Precisas",
    description: "Use o Conversor de Macarrão Cru para Cozido para calcular a quantidade exata de massa pronta. Cozinhe com precisão e evite desperdícios na receita.",
    keywords: "conversor macarrão cru, cozido quantidade, precisão receita, evitar desperdícios, online conversor, porções tool, gratuita medida"
  },
  pl: {
    title: "Przelicznik Makaronu Suchego na Gotowany – Online Szybko",
    description: "Użyj przelicznika makaronu suchego na gotowany online, aby obliczyć równoważne miary. Dokładne, darmowe narzędzie do gotowania i planowania porcji.",
    keywords: "przelicznik makaronu suchego, gotowany miary, obliczyć równoważne, narzędzie gotowania, online makaron, planowanie porcji, darmowy tool"
  },
  de: {
    title: "Dry to Cooked Pasta Converter – Measurements Online | TheSmart",
    description: "Umrechne mit dem Trocken zu Gekochte Pasta Umrechner trockene Maße zu gekochten Äquivalenten. Präzises Tool für Kochen und Portionsplanung kostenlos.",
    keywords: "trocken gekochte pasta umrechner, maße tool, äquivalente berechnung, online pasta, kochen planning, portionen rechner, kostenloser tool"
  }
,
  es: {
    title: "Pasta Seca para Cocinar – Cantidades y Medidas Exactas",
    description: "Calcula la cantidad de pasta seca perfecta para tus recetas. ¡Optimiza tus porciones y cocina con precisión ahora mismo!",
    keywords: "pasta, seca, cocinar, cantidades, medidas, exactas, calcula, cantidad, perfecta, recetas, optimiza, porciones, cocina, precisión, ahora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && drytocookedpastaconverterMeta[langHeader as keyof typeof drytocookedpastaconverterMeta]
      ? langHeader
      : "en";

  const meta = drytocookedpastaconverterMeta[language as keyof typeof drytocookedpastaconverterMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('dry-to-cooked-pasta-converter', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }dry-to-cooked-pasta-converter`,
      languages: {
        'en': getCanonicalUrl('dry-to-cooked-pasta-converter', 'en'),
        'es': getCanonicalUrl('dry-to-cooked-pasta-converter', 'es'),
        'pt-BR': getCanonicalUrl('dry-to-cooked-pasta-converter', 'br'),
        'pl': getCanonicalUrl('dry-to-cooked-pasta-converter', 'pl'),
        'de': getCanonicalUrl('dry-to-cooked-pasta-converter', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }dry-to-cooked-pasta-converter`,
    },
  };
}

export default async function DryToCookedPastaConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Dry to Cooked Pasta Converter",
    "url": "https://www.thesmartcalculator.com/food/dry-to-cooked-pasta-converter",
    "description": "Free online Dry to Cooked Pasta Converter to estimate cooked pasta weight from dry pasta for accurate meal planning, portion control, and recipe preparation.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Dry to Cooked Pasta Converter",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Instant conversion from dry pasta to cooked weight",
          "Supports various pasta types: spaghetti, penne, fusilli, and more",
          "Accurate estimates using average expansion ratios",
          "Mobile-friendly and easy-to-use",
          "Ideal for home cooks, meal preppers, and professional chefs"
        ],
        "url": "https://www.thesmartcalculator.com/food/dry-to-cooked-pasta-converter"
      },
      {
        "@type": "HowTo",
        "name": "Dry to Cooked Pasta Converter",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Dry to Cooked Pasta Converter",
            "text": "Choose the pasta type for accurate conversion (long, short, or filled)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Dry to Cooked Pasta Converter",
            "text": "Input the dry pasta weight in grams, ounces, or cups."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Dry to Cooked Pasta Converter",
            "text": "Choose how you want the cooked pasta weight displayed."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Dry to Cooked Pasta Converter",
            "text": "View the estimated cooked pasta weight instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Dry to Cooked Pasta Converter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It estimates how much cooked pasta you will get from a given amount of dry pasta."
            }
          },
          {
            "@type": "Question",
            "name": "Does it work for all pasta types?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it supports most common pasta types such as spaghetti, penne, and fusilli."
            }
          },
          {
            "@type": "Question",
            "name": "Is ingredient selection important?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, choosing the correct pasta type improves conversion accuracy."
            }
          },
          {
            "@type": "Question",
            "name": "Is the result exact?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, the calculator provides an estimate; actual weight may vary based on cooking."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert cups to cooked weight?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, both weight and volume inputs are supported."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works on all devices including smartphones, tablets, and desktops."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the Dry to Cooked Pasta Converter is free and works online with no downloads."
            }
          },
          {
            "@type": "Question",
            "name": "Can I plan meals using this tool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it helps estimate portions for individual meals or bulk cooking."
            }
          },
          {
            "@type": "Question",
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Home cooks, meal preppers, diet-conscious individuals, and professional chefs."
            }
          },
          {
            "@type": "Question",
            "name": "Why use this converter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It ensures proper portion control, reduces cooking errors, and simplifies meal planning."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="dry-to-cooked-pasta-converter-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
