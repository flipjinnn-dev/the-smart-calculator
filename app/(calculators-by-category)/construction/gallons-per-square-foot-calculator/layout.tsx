import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for gallons-per-square-foot-calculator
const gallonspersquarefootcalculatorMeta = {
  en: {
    title: "Ultimate Gallons Calculator – Fast & Easy",
    description: "Powerful gallons to square feet calculator. Instantly convert gallons, square feet, and coverage with our gallons calculator—simple and fast..",
    keywords: "gallons per square foot calculator, painting gallons, flooring estimator, online gallons tool, material needs, home improvement, construction tool, square foot estimate"
  },
  br: {
    title: "Gallons per Square Foot Calculator – Painting Online | TheSmar",
    description: "Use a Calculadora Litros por Metro Quadrado para estimar litros para pintura ou piso. Ferramenta precisa para construção e melhorias em casa.",
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
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
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
          "name": "Gallons per Square Foot Calculator",
          "item": "https://www.thesmartcalculator.com/construction/gallons-per-square-foot-calculator"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Board Foot Calculator",
          "item": "https://www.thesmartcalculator.com/construction/board-foot-calculator"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Cubic Yard Calculator",
          "item": "https://www.thesmartcalculator.com/construction/cubic-yard-calculator"
        }
      ]
    },

    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      "name": "Gallons per Square Foot Calculator",
      "alternateName": "Gallons per Square Foot Calculator",
      "url": "https://www.thesmartcalculator.com/construction/gallons-per-square-foot-calculator",
      "logo": "https://www.thesmartcalculator.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 614-596-2581",
        "contactType": "technical support",
        "contactOption": "TollFree",
        "areaServed": ["US","GB","PL","PT","DE"],
        "availableLanguage": ["en","es","Polish","Portuguese","German"]
      },
      "sameAs": [
        "https://x.com/SmartCalculat0r",
        "https://www.instagram.com/thesmartcalculators/",
        "https://www.youtube.com/@TheSmartCalculators",
        "https://www.linkedin.com/company/smart-calculator/",
        "https://www.pinterest.com/thesmartcalculators/",
        "https://www.thesmartcalculator.com/"
      ]
    },

    {
      "@type": "SoftwareApplication",
      "name": "Gallons per Square Foot Calculator",
      "operatingSystem": "All",
      "applicationCategory": "CalculatorApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "bestRating": "5",
        "ratingCount": "4100"
      },
      "review": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Hudson Hale"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excellent calculator for estimating gallons per square foot. Very helpful for construction, pools, and landscaping projects."
      }
    },

    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a gallons per square foot calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It calculates gallons needed per square foot for a given depth."
          }
        },
        {
          "@type": "Question",
          "name": "Why use it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Saves time and ensures accurate liquid volume planning."
          }
        },
        {
          "@type": "Question",
          "name": "Units supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Feet, inches, and yards."
          }
        },
        {
          "@type": "Question",
          "name": "Works for pools and tanks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, ideal for any liquid-containing area."
          }
        },
        {
          "@type": "Question",
          "name": "Does it calculate total gallons?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, total volume is displayed instantly."
          }
        },
        {
          "@type": "Question",
          "name": "Useful for landscaping/irrigation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, helps plan water requirements for gardens and ponds."
          }
        },
        {
          "@type": "Question",
          "name": "Can I calculate cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, enter price per gallon to get total cost."
          }
        },
        {
          "@type": "Question",
          "name": "Does it account for uneven depth?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, it assumes flat, uniform depth."
          }
        },
        {
          "@type": "Question",
          "name": "Mobile-friendly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, works on smartphones, tablets, and desktops."
          }
        },
        {
          "@type": "Question",
          "name": "Is it free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, completely free with no downloads required."
          }
        }
      ]
    }

  ]
}
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
