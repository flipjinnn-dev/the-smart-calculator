import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for ballistic-coefficient-calculator
const ballisticcoefficientcalculatorMeta = {
  en: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Use the Ballistic Coefficient Calculator to compute coefficient for projectiles. Accurate, free online tool for ballistics analysis and shooting planning.",
    keywords: "ballistic coefficient calculator, projectile tool, coefficient calculation, online ballistic, shooting planner, free coefficient tool, analysis ballistics"
  },
  br: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Use a Calculadora Coeficiente Balístico para calcular coeficiente de projéteis. Ferramenta precisa e gratuita para análise balística e planejamento de tiro.",
    keywords: "calculadora coeficiente balístico, projétil tool, cálculo coeficiente, online balístico, planejamento tiro, gratuita tool, análise balística"
  },
  pl: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Użyj kalkulatora współczynnika balistycznego online, aby obliczyć współczynnik dla pocisków. Dokładne, darmowe narzędzie do analizy balistycznej i planowania.",
    keywords: "kalkulator współczynnika balistycznego, pocisk tool, obliczyć współczynnik, online balistyczny, planowanie strzelanie, darmowy tool, analiza balistyczna"
  },
  de: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Berechne mit dem Ballistischen Koeffizient Rechner den Koeffizienten für Projektile. Präzises, kostenloses Tool für Ballistik-Analyse und Schussplanung.",
    keywords: "ballistischer koeffizient rechner, projektil tool, koeffizient berechnen, online ballistik, schuss planung, kostenloser tool, analyse ballistik"
  }
,
  es: {
    title: "Calculadora Balística – Trayectoria y Alcance con Precisión",
    description: "Calcula trayectoria, caída y energía balística con precisión para uso seguro en deportes y estudios. Ingresa datos y obtén resultados al instante.",
    keywords: "calculadora, balística, trayectoria, alcance, precisión, calcula, caída, energía, seguro, deportes, estudios, ingresa, datos, obtén, resultados"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && ballisticcoefficientcalculatorMeta[langHeader as keyof typeof ballisticcoefficientcalculatorMeta]
      ? langHeader
      : "en";

  const meta = ballisticcoefficientcalculatorMeta[language as keyof typeof ballisticcoefficientcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('ballistic-coefficient-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('ballistic-coefficient-calculator', 'en'),
        'es': getCanonicalUrl('ballistic-coefficient-calculator', 'es'),
        'pt-BR': getCanonicalUrl('ballistic-coefficient-calculator', 'br'),
        'pl': getCanonicalUrl('ballistic-coefficient-calculator', 'pl'),
        'de': getCanonicalUrl('ballistic-coefficient-calculator', 'de'),
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

import Script from "next/script";

export default async function BallisticCoefficientCalculatorLayout({
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
          "name": "Ballistic Coefficient Calculator",
          "item": "https://www.thesmartcalculator.com/physics/ballistic-coefficient-calculator"
        }
      ]
    },

    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      "name": "Ballistic Coefficient Calculator",
      "alternateName": "Ballistic Coefficient Calculator",
      "url": "https://www.thesmartcalculator.com/physics/ballistic-coefficient-calculator",
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
        "https://www.instagram.com/thesmartcalculators/",
        "https://www.linkedin.com/company/smart-calculator/",
        "https://www.youtube.com/@TheSmartCalculators",
        "https://www.pinterest.com/thesmartcalculators/_saved/",
        "https://www.thesmartcalculator.com/"
      ]
    },

    {
      "@type": "SoftwareApplication",
      "name": "Ballistic Coefficient Calculator",
      "operatingSystem": "All",
      "applicationCategory": "PhysicsApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "bestRating": "5",
        "ratingCount": "4300"
      },
      "review": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Realynn Reed"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Highly accurate Ballistic Coefficient Calculator. Perfect for students, engineers, and hobbyists for projectile analysis."
      }
    },

    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a ballistic coefficient?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It measures how well a projectile overcomes air resistance."
          }
        },
        {
          "@type": "Question",
          "name": "Is this calculator free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it is completely free online."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need software or installation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, it works directly in your browser."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use it on mobile devices?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, fully mobile-friendly."
          }
        },
        {
          "@type": "Question",
          "name": "What inputs are required?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mass (m), drag coefficient (Cd), and cross-sectional area (A)."
          }
        },
        {
          "@type": "Question",
          "name": "How is BC calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Using BC = m / (Cd × A)."
          }
        },
        {
          "@type": "Question",
          "name": "Can it compare different projectiles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can calculate BC for multiple projectiles to compare efficiency."
          }
        },
        {
          "@type": "Question",
          "name": "Is it suitable for students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, perfect for learning physics and external ballistics."
          }
        },
        {
          "@type": "Question",
          "name": "Can engineers or hobbyists use it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it helps in design experiments and projectile analysis."
          }
        },
        {
          "@type": "Question",
          "name": "Is the calculator accurate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, for input values; it’s a simplified model and does not account for velocity changes or wind."
          }
        }
      ]
    }

  ]
}
  return (
    <>
      <Script
        id="ballistic-coefficient-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
