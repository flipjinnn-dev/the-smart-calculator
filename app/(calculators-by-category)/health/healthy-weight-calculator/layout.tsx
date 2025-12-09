import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for healthy-weight-calculator
const healthyweightcalculatorMeta = {
  en: {
    title: "Healthy Weight Calculator – Range Online | TheSmartCalculator",
    description: "Use the Healthy Weight Calculator to determine range based on height and gender. Accurate, free online tool for health goals and weight management.",
    keywords: "healthy weight calculator, weight range, height gender, online healthy, health goals, weight management, free weight calculator, range determine"
  },
  br: {
    title: "Calculadora Peso Saudável – Faixa Online | TheSmartCalculator",
    description: "Use a Calculadora Peso Saudável para determinar faixa baseada em altura e gênero. Ferramenta precisa para metas de saúde e gerenciamento de peso.",
    keywords: "calculadora peso saudável, faixa peso, altura gênero, online saudável, metas saúde, gerenciamento peso, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Zdrowej Wagi – Zakres Online | TheSmartCalculator",
    description: "Użyj kalkulatora zdrowej wagi online, aby określić zakres na podstawie wzrostu i płci. Dokładne, darmowe narzędzie do celów zdrowotnych i zarządzania wagą.",
    keywords: "kalkulator zdrowej wagi, zakres waga, wzrost płeć, online zdrowy, cele zdrowotne, zarządzanie wagą, darmowy kalkulator"
  },
  de: {
    title: "Gesundes Gewicht Rechner – Bereich Online | TheSmartCalculator",
    description: "Berechne mit dem Gesundes Gewicht Rechner deinen idealen Gewichtsbereich basierend auf Größe und Geschlecht. Präzises Tool für Gesundheitsziele und Gewichtsmanagement.",
    keywords: "gesundes gewicht rechner, gewicht bereich, höhe geschlecht, online gesund, gesundheitsziele, gewicht management, kostenloser gewicht rechner, bereich bestimmen"
  }
,
  es: {
    title: "Calculadora de Peso Saludable – Descubre tu IMC Ideal",
    description: "Calcula tu peso saludable al instante con nuestra herramienta precisa. ¡Conoce tu IMC y lleva un estilo de vida más sano ahora mismo",
    keywords: "calculadora, peso, saludable, descubre, ideal, calcula, instante, nuestra, herramienta, precisa, conoce, lleva, estilo, vida, sano"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && healthyweightcalculatorMeta[langHeader as keyof typeof healthyweightcalculatorMeta]
      ? langHeader
      : "en";

  const meta = healthyweightcalculatorMeta[language as keyof typeof healthyweightcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('healthy-weight-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }healthy-weight-calculator`,
      languages: {
        'en': getCanonicalUrl('healthy-weight-calculator', 'en'),
        'es': getCanonicalUrl('healthy-weight-calculator', 'es'),
        'pt-BR': getCanonicalUrl('healthy-weight-calculator', 'br'),
        'pl': getCanonicalUrl('healthy-weight-calculator', 'pl'),
        'de': getCanonicalUrl('healthy-weight-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }healthy-weight-calculator`,
    },
  };
}

export default async function HealthyWeightCalculatorLayout({
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
      id="healthy-weight-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
