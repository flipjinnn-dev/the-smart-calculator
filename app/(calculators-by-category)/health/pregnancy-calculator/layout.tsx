import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for pregnancy-calculator
const pregnancycalculatorMeta = {
  en: {
    title: "Pregnancy Calculator - Pregnancy Timeline",
    description: "Track pregnancy milestones and due date using our Pregnancy Calculator for easy planning.",
    keywords: "pregnancy calculator, gestation weeks, due date, baby development, online pregnancy, precision planning, gestation tool, week calculation"
  },
  br: {
    title: "Calculadora de Gravidez – Acompanhe Sua Gestação Online",
    description: "Use a pregnancy  – acompanhe sua gestação online para obter resultados rápidos e precisos. Entradas simples, saídas claras e contexto útil — grátis e fácil de usar.",
    keywords: "calculadora gravidez, semanas gestação, data parto, desenvolvimento bebê, online gravidez, planejamento precisão, ferramenta gestação, cálculo semana"
  },
  pl: {
    title: "Kalkulator Ciąży – Oblicz Tydzień Ciąży Online",
    description: "Użyj kalkulatora ciąży online, aby obliczyć tydzień ciąży i przewidywaną datę porodu. Proste, szybkie i darmowe narzędzie dla przyszłych mam.",
    keywords: "kalkulator ciąży, tygodnie ciąża, data porodu, rozwój dziecka, online ciąża, planowanie dokładne, narzędzie ciąża, obliczenia tygodnia"
  },
  de: {
    title: "Schwangerschaftsrechner – Geburtstermin einfach berechnen",
    description: "Berechne mit dem Schwangerschaftsrechner deinen Geburtstermin & Schwangerschaftswoche. Schnell, genau & kostenlos – ideal für werdende Mütter!",
    keywords: "schwangerschaftsrechner, schwangerschaftswochen, geburtstermin, baby entwicklung, online schwangerschaft, präzise planung, gestations tool, wochen berechnung"
  }
,
  es: {
    title: "Calculadora de Embarazo – Conoce tu Fecha de Parto Fácil",
    description: "Calcula tu fecha de parto al instante con nuestra herramienta precisa. ¡Planifica tu embarazo y sigue tu desarrollo semana a semana ahora mismo!",
    keywords: "calculadora, embarazo, conoce, fecha, parto, fácil, calcula, instante, nuestra, herramienta, precisa, planifica, sigue, desarrollo, semana"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && pregnancycalculatorMeta[langHeader as keyof typeof pregnancycalculatorMeta]
      ? langHeader
      : "en";

  const meta = pregnancycalculatorMeta[language as keyof typeof pregnancycalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('pregnancy-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('pregnancy-calculator', 'en'),
        'en': getCanonicalUrl('pregnancy-calculator', 'en'),
        'es': getCanonicalUrl('pregnancy-calculator', 'es'),
        'pt-BR': getCanonicalUrl('pregnancy-calculator', 'br'),
        'pl': getCanonicalUrl('pregnancy-calculator', 'pl'),
        'de': getCanonicalUrl('pregnancy-calculator', 'de'),
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

export default async function PregnancyCalculatorLayout({
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
          "name": "Pregnancy Calculator",
          "item": "https://www.thesmartcalculator.com/health/pregnancy-calculator"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Pregnancy Weight Gain Calculator",
          "item": "https://www.thesmartcalculator.com/health/pregnancy-weight-gain-calculator"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Pregnancy Conception Calculator",
          "item": "https://www.thesmartcalculator.com/health/pregnancy-conception-calculator"
        }
      ]
    },

    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      "name": "Pregnancy Calculator",
      "alternateName": "Pregnancy Calculator",
      "url": "https://www.thesmartcalculator.com/health/pregnancy-calculator",
      "logo": "https://www.thesmartcalculator.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 614-596-2581",
        "contactType": "technical support",
        "contactOption": "TollFree",
        "areaServed": ["US","GB","PL","PT","DE","ES"],
        "availableLanguage": ["en","es","German","Polish","Portuguese"]
      },
      "sameAs": [
        "https://www.instagram.com/thesmartcalculators/",
        "https://x.com/SmartCalculat0r",
        "https://www.youtube.com/@TheSmartCalculators",
        "https://www.linkedin.com/company/smart-calculator/",
        "https://www.pinterest.com/thesmartcalculators/_saved/",
        "https://www.thesmartcalculator.com/"
      ]
    },

    {
      "@type": "SoftwareApplication",
      "name": "Pregnancy Calculator",
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
        "ratingCount": "3200"
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
        "reviewBody": "Pregnancy Calculator is highly accurate and user-friendly. Ideal for tracking pregnancy progress and estimating due dates."
      }
    },

    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How to calculate pregnancy weeks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pregnancy weeks are calculated from the first day of your last menstrual period (LMP) or conception date."
          }
        },
        {
          "@type": "Question",
          "name": "What is my pregnancy due date?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your due date is an estimate based on LMP, ultrasound, or IVF transfer date, typically 40 weeks from conception."
          }
        },
        {
          "@type": "Question",
          "name": "Can ultrasound determine pregnancy weeks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, early ultrasound is highly accurate for estimating gestational age, especially in the first trimester."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is a pregnancy calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pregnancy calculators are generally accurate within 1–2 weeks, but factors like irregular cycles or multiples can affect estimates."
          }
        },
        {
          "@type": "Question",
          "name": "Pregnancy calculation by LMP vs Ultrasound — which is better?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "LMP is simple but may be less accurate for irregular cycles. Ultrasound provides a more precise estimate early in pregnancy."
          }
        },
        {
          "@type": "Question",
          "name": "How to calculate pregnancy with irregular periods?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use conception date if known, or an early ultrasound for more accurate results."
          }
        },
        {
          "@type": "Question",
          "name": "Pregnancy calculator according to IVF transfer — how does it work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It calculates gestational age from the embryo transfer date instead of LMP."
          }
        },
        {
          "@type": "Question",
          "name": "Why is the due date only an estimate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pregnancy length varies naturally, so calculators provide an estimated window rather than an exact delivery date."
          }
        },
        {
          "@type": "Question",
          "name": "How to know conception date in pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Track ovulation or use a conception-based calculator to estimate the likely date."
          }
        },
        {
          "@type": "Question",
          "name": "Can I track my pregnancy online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, tools like Smart Pregnancy Calculator Tools and apps help monitor progress, milestones, and trimesters."
          }
        }
      ]
    }

  ]
}
  return <>
  <Script 
    type="application/ld+json"
    id="pregnancy-calc-schema"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    strategy="afterInteractive"
  />
  {children}
  </>;
}
