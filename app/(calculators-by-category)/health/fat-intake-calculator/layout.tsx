import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for fat-intake-calculator
const fatintakecalculatorMeta = {
  en: {
    title: "Fat Intake Calculator – Daily Goals Online | TheSmartCalculator",
    description: "Use the Fat Intake Calculator to estimate daily fat needs based on activity and goals. Accurate, free online tool for diet balancing and nutrition.",
    keywords: "fat intake calculator, daily goals, activity tool, needs calculation, online fat, diet balancing, free intake tool, nutrition planning"
  },
  br: {
    title: "Calculadora de Gordura – Ingestão Diária Online | TheSmartCalculator",
    description: "Use a Calculadora de Gordura para estimar necessidades diárias de gordura com base em atividade. Ferramenta precisa para equilíbrio dietético e nutrição.",
    keywords: "calculadora gordura, diária necessidades, atividade base, equilíbrio dietético, online gordura, nutrição planning, precisa tool"
  },
  pl: {
    title: "Kalkulator Spożycia Tłuszczu – Cele Online | TheSmartCalculator",
    description: "Użyj kalkulatora spożycia tłuszczu online, aby oszacować dzienne potrzeby tłuszczu na podstawie aktywności. Dokładne, darmowe narzędzie do diety i odżywiania.",
    keywords: "kalkulator spożycia tłuszczu, dzienne cele, aktywność tool, potrzeby obliczenia, online tłuszcz, dieta równowaga, darmowy tool"
  },
  de: {
    title: "Fettzufuhr Rechner – Bedarf Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Fettzufuhr Rechner deinen täglichen Fettbedarf basierend auf Aktivität und Zielen. Präzises Tool für Diät und Ernährungsplanung kostenlos.",
    keywords: "fettzufuhr rechner, bedarf berechnen, täglichen fett, aktivität ziele, online fett, diät planung, kostenloser tool"
  }
,
  es: {
    title: "Calculadora de Ingesta de Grasas – Controla tu Dieta Fácil",
    description: "Calcula tu ingesta diaria de grasas al instante con nuestra herramienta precisa. ¡Optimiza tu alimentación y mejora tu salud ahora mismo",
    keywords: "calculadora, ingesta, grasas, controla, dieta, fácil, calcula, diaria, instante, nuestra, herramienta, precisa, optimiza, alimentación, mejora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && fatintakecalculatorMeta[langHeader as keyof typeof fatintakecalculatorMeta]
      ? langHeader
      : "en";

  const meta = fatintakecalculatorMeta[language as keyof typeof fatintakecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('fat-intake-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('fat-intake-calculator', 'en'),
        'es': getCanonicalUrl('fat-intake-calculator', 'es'),
        'pt-BR': getCanonicalUrl('fat-intake-calculator', 'br'),
        'pl': getCanonicalUrl('fat-intake-calculator', 'pl'),
        'de': getCanonicalUrl('fat-intake-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }fat-intake-calculator`,
    },
  };
}

export default async function FatIntakeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Healthy Weight Calculator",
    "url": "https://www.thesmartcalculator.com/health/healthy-weight-calculator",
    "description": "Free Healthy Weight Calculator that helps you find your healthy weight range based on your height using standard BMI guidelines for adults 18 years and older.",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Healthy Weight Calculator Tool",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "url": "https://www.thesmartcalculator.com/health/healthy-weight-calculator",
      "description": "An online tool that calculates the healthy weight range for adults using BMI formula (18.5 - 24.9). Supports both metric and imperial units.",
      "featureList": [
        "Calculate healthy weight range from height",
        "Supports Metric and US units",
        "Based on BMI 18.5 to 24.9",
        "Instant calculation without signup"
      ],
      "provider": {
        "@type": "Organization",
        "name": "Smart Calculator",
        "url": "https://www.thesmartcalculator.com"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.thesmartcalculator.com/health/healthy-weight-calculator"
    },
    "FAQPage": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the Healthy Weight Calculator work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The calculator uses the BMI formula to estimate a healthy weight range for adults based on height. The normal BMI range 18.5 - 24.9 is applied."
          }
        },
        {
          "@type": "Question",
          "name": "Which inputs are required?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You only need to enter your height. The calculator supports both metric (cm) and US (ft/in) units."
          }
        },
        {
          "@type": "Question",
          "name": "Is this tool suitable for children?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The Healthy Weight Calculator is designed for adults aged 18 years and older."
          }
        },
        {
          "@type": "Question",
          "name": "Does the calculator consider muscle mass or body type?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. It is based only on BMI and height. It does not account for muscle mass, body composition, or medical conditions."
          }
        }
      ]
    }
  }
  return <>
    {children}
    <Script
      id="fat-intake-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
