import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for body-fat-calculator
const bodyfatcalculatorMeta = {
  en: {
    title: "Body Fat Calculator",
    description: "Measure body fat percentage using our Body Fat Calculator to track fitness progress.",
    keywords: "body fat calculator, percentage tool, methods calculation, online fat, fitness tracker, health goals, free body calculator, estimate fat"
  },
  br: {
    title: "Calculadora Gordura Corporal – Percentual Ideal",
    description: "Use a Calculadora de Gordura Corporal para medir seu percentual de gordura. Acompanhe sua evolução física e melhore seus resultados com precisão.",
    keywords: "calculadora gordura corporal, percentual gordura, medir evolução, ferramenta física online, resultados precisos, métodos variados, saúde calculadora"
  },
  pl: {
    title: "Kalkulator Tkanki Tłuszczowej – Procent Tłuszczu",
    description: "Użyj body fat  – percentage methods online | thesmartcalculator do szybkich i dokładnych wyników. Proste dane wejściowe, czytelne wyniki i pomocny kontekst — za.",
    keywords: "\"\"Użyj kalkulatora tkanki tłuszczowej online, aby obliczyć procent tłuszczu w ciele. Proste, szybkie i dokładne narzędzie zdrowotne dla każdego.\"\", kalkulator tkanki tłuszczowej, procent tłuszczu, obliczyć ciało, narzędzie zdrowotne, online tłuszcz, szybkie dokładne, darmowy tool"
  },
  de: {
    title: "Body Fat Calculator – Percentage Methods Online | TheSmartCalc",
    description: "\"\"Berechne mit dem Körperfett Rechner deinen Körperfettanteil schnell & genau. Ideal für Fitness, Gesundheit und Gewichtsmanagement – kostenlos online!\"\"",
    keywords: "body fat rechner, percentage tool, methods calculation, online fat, fitness tracker, health goals, kostenlos body rechner, estimate fat"
  }
,
  es: {
    title: "Calculadora de Grasa Corporal – Mide tu % Fácil y Rápido",
    description: "Calcula tu porcentaje de grasa corporal al instante con nuestra herramienta precisa. ¡Optimiza tu entrenamiento y mejora tu salud ahora mismo!",
    keywords: "calculadora, grasa, corporal, mide, fácil, rápido, calcula, porcentaje, instante, nuestra, herramienta, precisa, optimiza, entrenamiento, mejora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && bodyfatcalculatorMeta[langHeader as keyof typeof bodyfatcalculatorMeta]
      ? langHeader
      : "en";

  const meta = bodyfatcalculatorMeta[language as keyof typeof bodyfatcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('body-fat-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('body-fat-calculator', 'en'),
        'en': getCanonicalUrl('body-fat-calculator', 'en'),
        'es': getCanonicalUrl('body-fat-calculator', 'es'),
        'pt-BR': getCanonicalUrl('body-fat-calculator', 'br'),
        'pl': getCanonicalUrl('body-fat-calculator', 'pl'),
        'de': getCanonicalUrl('body-fat-calculator', 'de'),
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

export default async function BodyFatCalculatorLayout({
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
          "name": "Body Fat Calculator",
          "item": "https://www.thesmartcalculator.com/health/body-fat-calculator"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Army Body Fat Calculator",
          "item": "https://www.thesmartcalculator.com/health/army-body-fat-calculator"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Lean Body Mass Calculator",
          "item": "https://www.thesmartcalculator.com/health/lean-body-mass-calculator"
        }
      ]
    },

    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      "name": "Body Fat Calculator",
      "alternateName": "Body Fat Calculator",
      "url": "https://www.thesmartcalculator.com/health/body-fat-calculator",
      "logo": "https://www.thesmartcalculator.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 614-596-2581",
        "contactType": "technical support",
        "contactOption": "TollFree",
        "areaServed": ["US","GB","ES","PL","PT","DE"],
        "availableLanguage": ["en","es","German","Polish","Portuguese"]
      },
      "sameAs": [
        "https://x.com/SmartCalculat0r",
        "https://www.instagram.com/thesmartcalculators/",
        "https://www.youtube.com/@TheSmartCalculators",
        "https://www.linkedin.com/company/smart-calculator/",
        "https://www.pinterest.com/thesmartcalculators/_saved/",
        "https://www.thesmartcalculator.com/"
      ]
    },

    {
      "@type": "SoftwareApplication",
      "name": "Body Fat Calculator",
      "operatingSystem": "All",
      "applicationCategory": "HealthApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "bestRating": "5",
        "ratingCount": "3000"
      },
      "review": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Simon Stephen"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Body Fat Calculator is easy to use and provides accurate estimates. Perfect for fitness enthusiasts and health monitoring."
      }
    },

    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a healthy body fat percentage for men and women?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For general adults: Men 14–24%, Women 21–31%. Athletes may be lower."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate my body fat percentage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use methods like tape measurements, calipers, bioelectrical impedance, or our online Body Fat Calculator."
          }
        },
        {
          "@type": "Question",
          "name": "Are body fat calculators accurate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "They provide estimates. Accuracy improves when multiple methods are combined."
          }
        },
        {
          "@type": "Question",
          "name": "How can I reduce body fat safely?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Follow a balanced diet, consistent exercise, proper sleep, and avoid extreme diets."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between BMI and body fat?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BMI measures weight vs. height but does not separate fat from muscle. Body fat percentage measures fat vs. lean mass."
          }
        },
        {
          "@type": "Question",
          "name": "Can athletes use a body fat calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, body fat calculators for athletes provide tailored insights for training goals."
          }
        },
        {
          "@type": "Question",
          "name": "Is the Army Body Fat Calculator different?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it uses military-specific formulas to assess eligibility."
          }
        },
        {
          "@type": "Question",
          "name": "Can seniors use this tool?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it helps monitor body composition changes related to aging."
          }
        },
        {
          "@type": "Question",
          "name": "How often should I check my body fat percentage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every 4–6 weeks for meaningful tracking."
          }
        },
        {
          "@type": "Question",
          "name": "Can AI help track my body fat progress?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, AI-powered calculators can analyze trends and integrate with health apps."
          }
        }
      ]
    }

  ]
}
  return <>
  <Script
  type="application/ld+json"
  id="body-fat-calc-schema"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
  strategy="afterInteractive"
  />
  {children}
  </>;
}
