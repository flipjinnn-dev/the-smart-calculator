import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for cake-pan-calculator
const cakepancalculatorMeta = {
  en: {
    title: "Cake Pan Calculator – Sizes Equivalent Online | TheSmartCalculator",
    description: "Use the Cake Pan Calculator to find equivalent sizes for round, square, and rectangular pans. Accurate, free online tool for baking adjustments and recipes.",
    keywords: "cake pan calculator, sizes equivalent, round square, rectangular tool, online pan, baking calculator, free size tool, recipe adjustment"
  },
  br: {
    title: "Cake Pan Calculator – Sizes Equivalent Online | TheSmartCalcul",
    description: "Use a Calculadora Forma Bolo para calcular tamanhos equivalentes de formas redondas, quadradas e retangulares. Ferramenta precisa para ajustes em receitas de bolo.",
    keywords: "calculadora forma bolo, tamanhos equivalentes, redondas quadradas, retangulares tool, online forma, ajustes receitas, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Formy Ciasta – Rozmiary Online | TheSmartCalculator",
    description: "Użyj kalkulatora formy ciasta online, aby obliczyć równoważne rozmiary form okrągłych, kwadratowych i prostokątnych. Dokładne narzędzie do pieczenia.",
    keywords: "kalkulator formy ciasta, rozmiary równoważne, okrągłe kwadratowe, prostokątne tool, online forma, pieczenie przepisy, darmowy tool"
  },
  de: {
    title: "Kuchenform Rechner – Mengen Umrechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Kuchenform Rechner die richtige Zutatenmenge für jede Backform. Schnell, praktisch & kostenlos – ideal fürs Backen zu Hause!",
    keywords: "kuchenform rechner, mengen umrechnen, zutatenmenge tool, backform online, schnell praktisch, backen hause, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && cakepancalculatorMeta[langHeader as keyof typeof cakepancalculatorMeta]
      ? langHeader
      : "en";

  const meta = cakepancalculatorMeta[language as keyof typeof cakepancalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('cake-pan-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }cake-pan-calculator`,
      languages: {
        'en': getCanonicalUrl('cake-pan-calculator', 'en'),
        'pt-BR': getCanonicalUrl('cake-pan-calculator', 'br'),
        'pl': getCanonicalUrl('cake-pan-calculator', 'pl'),
        'de': getCanonicalUrl('cake-pan-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }cake-pan-calculator`,
    },
  };
}

export default async function CakePanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cake Pan Calculator",
    "url": "https://www.thesmartcalculator.com/food/cake-pan-calculator",
    "description": "Free online Cake Pan Calculator to convert cake pan sizes and scale ingredients for round, square, or rectangular pans accurately.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Cake Pan Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Convert between round, square, and rectangular cake pans",
          "Calculate volume and scaling factor for recipes",
          "Adjust ingredients accurately for different pan sizes",
          "Mobile-friendly and easy-to-use",
          "Ideal for home bakers, professionals, and recipe scaling"
        ],
        "url": "https://www.thesmartcalculator.com/food/cake-pan-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Cake Pan Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Cake Pan Calculator",
            "text": "Select the shape and enter dimensions of the original pan."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Cake Pan Calculator",
            "text": "Select the shape and enter dimensions of the target pan."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Cake Pan Calculator",
            "text": "Get the scaling factor and adjusted ingredient amounts instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Cake Pan Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It adjusts ingredient quantities when using different cake pan sizes or shapes."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert round to square pans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it supports round, square, and rectangular pans."
            }
          },
          {
            "@type": "Question",
            "name": "Does it adjust ingredients automatically?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it calculates a scaling factor for all ingredients."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for layered cakes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it adjusts layers proportionally."
            }
          },
          {
            "@type": "Question",
            "name": "Can it help with baking times?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It does not calculate baking time; monitor cakes visually for doneness."
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
            "name": "Can I scale recipes up or down?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it calculates the correct scaling factor for larger or smaller cakes."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, completely free with no downloads required."
            }
          },
          {
            "@type": "Question",
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Home bakers, professional bakers, culinary students, and anyone adjusting cake recipes."
            }
          },
          {
            "@type": "Question",
            "name": "Why use it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To ensure cakes fit your pan perfectly and bake evenly."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="cake-pan-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
