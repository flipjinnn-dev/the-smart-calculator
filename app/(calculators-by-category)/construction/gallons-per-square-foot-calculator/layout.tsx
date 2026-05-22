import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for gallons-per-square-foot-calculator
const gallonspersquarefootcalculatorMeta = {
  en: {
    title: "Gallons Per Square Foot Calculator – Water & Paint",
    description: "Calculate gallons per square foot for water, paint, and coatings instantly. Use our free calculator with formulas, examples, and conversion tables.",
    keywords: "gallons per square foot calculator, water gallons calculator, paint gallons calculator, coatings calculator, gallons per sq ft, conversion table, square feet to gallons"
  },
  br: {
    title: "Calculadora de Galões por Pé Quadrado",
    description: "Use a calculadora de tinta para medir a quantidade necessária por área. Planeje sua pintura e descubra o consumo de tinta agora mesmo!",
    keywords: "calculadora litros metro, pintura litros, estimador piso, ferramenta online litros, necessidades material, melhoria casa, ferramenta construção, estimativa metro quadrado"
  },
  pl: {
    title: "Gallons per Square Foot Calculator – Painting Online | TheSmar",
    description: "Użyj kalkulatora litrów na metr kwadratowy online, aby oszacować litry do malowania lub podłogi. Dokładne narzędzie do budowy i ulepszeń domowych.",
    keywords: "kalkulator litrów metr kwadratowy, litry malowanie, estymator podłogi, narzędzie online litry, potrzeby material, ulepszenie domu, narzędzie budowa, estymacja metr kwadratowy"
  },
  de: {
    title: "Gallonen pro Quadratfuß Rechner – Malen Online | TheSmartCalculator",
    description: "Nutzen Sie den gallons per square foot  – painting online | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher.",
    keywords: "gallonen quadratfuß rechner, malen gallonen, boden estimator, online gallonen tool, materialbedarf, heimverbesserung, bau tool, quadratfuß schätzung"
  }
,
  es: {
    title: "Calculadora de Galones por Pie Cuadrado – Fácil y Rápida",
    description: "Calcula galones por pie cuadrado al instante con nuestra herramienta precisa. ¡Optimiza pintura, recubrimientos y proyectos de construcción ahora mismo!",
    keywords: "calculadora, galones, cuadrado, fácil, rápida, calcula, instante, nuestra, herramienta, precisa, optimiza, pintura, recubrimientos, proyectos, construcción"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && gallonspersquarefootcalculatorMeta[langHeader as keyof typeof gallonspersquarefootcalculatorMeta]
      ? langHeader
      : "en";

  const meta = gallonspersquarefootcalculatorMeta[language as keyof typeof gallonspersquarefootcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('gallons-per-square-foot-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('gallons-per-square-foot-calculator', 'en'),
        'en': getCanonicalUrl('gallons-per-square-foot-calculator', 'en'),
        'es': getCanonicalUrl('gallons-per-square-foot-calculator', 'es'),
        'pt-BR': getCanonicalUrl('gallons-per-square-foot-calculator', 'br'),
        'pl': getCanonicalUrl('gallons-per-square-foot-calculator', 'pl'),
        'de': getCanonicalUrl('gallons-per-square-foot-calculator', 'de'),
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

export default async function GallonsPerSquareFootCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Gallons Per Square Foot Calculator",
            "item": "https://www.thesmartcalculator.com/construction/gallons-per-square-foot-calculator",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How many gallons per square foot of water?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "At 1 inch depth, 1 square foot holds 0.623 gallons. At 1 foot depth, 1 square foot holds 7.48 gallons. The exact volume depends on the depth of water over the surface area.",
            },
          },
          {
            "@type": "Question",
            "name": "How many gallons per square foot of paint?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It depends on the product. Standard interior paint covers 350–400 sq ft per gallon, meaning each square foot needs roughly 0.0025 to 0.003 gallons. Thicker coatings like epoxy need more usually one gallon per 200–250 sq ft.",
            },
          },
          {
            "@type": "Question",
            "name": "How do I convert square feet to gallons for water?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Multiply square feet by depth in inches, then multiply by 0.623. This gives you US gallons.",
            },
          },
          {
            "@type": "Question",
            "name": "What does gallons per square foot per inch mean?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It means the volume of liquid (in gallons) that occupies one square foot of surface area at one inch of depth. The value is always 0.623 gallons per square foot per inch for water.",
            },
          },
          {
            "@type": "Question",
            "name": "How many gallons are in a square foot of water at 1 foot depth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "1 cubic foot of water = 7.48052 US gallons. So a 1 sq ft column of water 1 foot deep contains 7.48 gallons.",
            },
          },
          {
            "@type": "Question",
            "name": "How many gallons of paint do I need for 500 square feet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "At standard coverage of 400 sq ft per gallon: 500 ÷ 400 = 1.25 gallons. Buy 2 gallons to allow for a second coat and touch-ups.",
            },
          },
          {
            "@type": "Question",
            "name": "How many gallons of water in a square inch?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "1 square inch, 1 inch deep = 1 cubic inch. Since 1 US gallon = 231 cubic inches, 1 cubic inch = 0.00433 gallons.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the formula for gallons per square foot of rainfall?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gallons = Area (sq ft) × Rainfall depth (inches) × 0.623. For example, 1 inch of rain on 1,000 sq ft = 623 gallons.",
            },
          },
        ],
      },
    ],
  };
  return <>
    {children}
    <Script
      id="gallons-per-square-foot-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
