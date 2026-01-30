import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for gfr-calculator
const gfrcalculatorMeta = {
  en: {
    title: "GFR Calculator - Kidney Function Estimate",
    description: "Assess kidney function using our GFR Calculator for quick renal health monitoring.",
    keywords: "gfr calculator, glomerular filtration rate, creatinine tool, online gfr, kidney health, medical assessment, free gfr tool, rate estimate"
  },
  br: {
    title: "Calculadora GFR – Filtração Renal Online | TheSmartCalculator",
    description: "Use a Calculadora GFR para estimar taxa de filtração glomerular de creatinina. Ferramenta precisa para monitoramento de saúde renal e avaliação médica.",
    keywords: "calculadora gfr, taxa filtração glomerular, ferramenta creatinina, online gfr, saúde renal, avaliação médica, gratuita tool"
  },
  pl: {
    title: "Kalkulator GFR – Filtracja Online | TheSmartCalculator",
    description: "Użyj kalkulatora GFR online, aby obliczyć wskaźnik filtracji kłębuszkowej i ocenić funkcję nerek. Proste, dokładne i darmowe narzędzie zdrowotne.",
    keywords: "kalkulator gfr, wskaźnik filtracji kłębuszkowej, narzędzie kreatynina, online gfr, zdrowie nerek, ocena medyczna, darmowy tool"
  },
  de: {
    title: "GFR Rechner – Nierenfunktion Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem GFR Rechner deine Nierenfunktion schnell und genau. Ideal zur Kontrolle der Gesundheit – einfach & kostenlos online für medizinische Bewertung.",
    keywords: "gfr rechner, glomeruläre filtrationsrate, kreatinin tool, online gfr, nieren gesundheit, medizinische bewertung, kostenloser gfr tool, rate schätzung"
  }
,
  es: {
    title: "Calculadora de TFG – Calcula tu Frecuencia de Trabajo Fácil",
    description: "Calcula tu Tasa de Flujo Glomerular (TFG) al instante con nuestra herramienta precisa. ¡Evalúa tu salud renal y toma decisiones inteligentes ahora mismo",
    keywords: "calculadora, calcula, frecuencia, trabajo, fácil, tasa, flujo, glomerular, instante, nuestra, herramienta, precisa, evalúa, salud, renal"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && gfrcalculatorMeta[langHeader as keyof typeof gfrcalculatorMeta]
      ? langHeader
      : "en";

  const meta = gfrcalculatorMeta[language as keyof typeof gfrcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('gfr-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('gfr-calculator', 'en'),
        'en': getCanonicalUrl('gfr-calculator', 'en'),
        'es': getCanonicalUrl('gfr-calculator', 'es'),
        'pt-BR': getCanonicalUrl('gfr-calculator', 'br'),
        'pl': getCanonicalUrl('gfr-calculator', 'pl'),
        'de': getCanonicalUrl('gfr-calculator', 'de'),
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

export default async function GfrCalculatorLayout({
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
          "name": "GFR Calculator",
          "item": "https://www.thesmartcalculator.com/health/gfr-calculator"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "BMI Calculator",
          "item": "https://www.thesmartcalculator.com/health/bmi-calculator"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Overweight Calculator",
          "item": "https://www.thesmartcalculator.com/health/overweight-calculator"
        }
      ]
    },

    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      "name": "GFR Calculator",
      "alternateName": "GFR Calculator",
      "url": "https://www.thesmartcalculator.com/health/gfr-calculator",
      "logo": "https://www.thesmartcalculator.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 614-596-2581",
        "contactType": "technical support",
        "contactOption": "TollFree",
        "areaServed": ["US","GB","DE","PL","PT","ES"],
        "availableLanguage": ["en","es","German","Polish","Portuguese"]
      },
      "sameAs": [
        "https://x.com/SmartCalculat0r",
        "https://www.youtube.com/@TheSmartCalculators",
        "https://www.instagram.com/thesmartcalculators/",
        "https://www.linkedin.com/company/smart-calculator/",
        "https://www.pinterest.com/thesmartcalculators/",
        "https://www.thesmartcalculator.com/"
      ]
    },

    {
      "@type": "SoftwareApplication",
      "name": "GFR Calculator",
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
        "ratingCount": "4500"
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
        "reviewBody": "Accurate and user-friendly GFR Calculator. Very helpful for monitoring kidney health over time."
      }
    },

    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is GFR and why is it important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GFR measures how efficiently your kidneys filter blood, indicating overall kidney health."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate GFR online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enter your age, sex, and serum creatinine into the calculator to get an eGFR value."
          }
        },
        {
          "@type": "Question",
          "name": "What is the normal GFR range for adults?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Typically 90–120 mL/min/1.73 m², though it varies with age and sex."
          }
        },
        {
          "@type": "Question",
          "name": "How does GFR compare to creatinine levels?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GFR adjusts for age, sex, and body size, giving a more complete picture than creatinine alone."
          }
        },
        {
          "@type": "Question",
          "name": "Can a pediatric GFR calculator help children?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the Schwartz formula is used to estimate kidney function in children."
          }
        },
        {
          "@type": "Question",
          "name": "Which is better: CKD-EPI or MDRD formula?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CKD-EPI is more accurate for adults with normal or mildly reduced kidney function, while MDRD is widely used in CKD monitoring."
          }
        },
        {
          "@type": "Question",
          "name": "Can I track my kidney function over time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, regular tracking with the GFR Calculator helps monitor changes and detect early issues."
          }
        },
        {
          "@type": "Question",
          "name": "Is this GFR calculator suitable for irregular kidney function?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it adjusts for age, sex, and adult/pediatric status to remain reliable."
          }
        },
        {
          "@type": "Question",
          "name": "Are free GFR calculators as accurate as paid ones?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our free calculator uses the same validated formulas as professional tools."
          }
        },
        {
          "@type": "Question",
          "name": "How can I improve GFR naturally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hydration, healthy diet, blood pressure control, exercise, and regular monitoring can help maintain or improve kidney function."
          }
        }
      ]
    }

  ]
}

  return <>
    {children}
    <Script
      id="gfr-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
