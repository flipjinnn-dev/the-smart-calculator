import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for body-surface-area-calculator
const bodysurfaceareacalculatorMeta = {
  en: {
    title: "Body Surface Area Calculator – BSA Methods Online | TheSmartCa",
    description: "Use the Body Surface Area Calculator to compute BSA using various methods. Accurate, free online tool for medical dosing and health assessments.",
    keywords: "body surface area calculator, bsa tool, methods calculation, online bsa, medical dosing, health assessment, free surface calculator, area estimate"
  },
  br: {
    title: "Body Surface Area Calculator – BSA Methods Online | TheSmartCa",
    description: "Use a Calculadora Área Superficial Corporal para calcular BSA com métodos variados. Ferramenta precisa e gratuita para dosagem médica e avaliações de saúde.",
    keywords: "calculadora área superficial, bsa tool, métodos cálculo, online bsa, dosagem médica, avaliação saúde, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Powierzchni Ciała – Oblicz Online | TheSmartCalculator",
    description: "Użyj kalkulatora powierzchni ciała online, aby obliczyć powierzchnię skóry i wskaźniki zdrowotne. Proste, szybkie i darmowe narzędzie dla każdego do medycznych celów.",
    keywords: "kalkulator powierzchni ciała, obliczyć powierzchnia, skóry wskaźniki, narzędzie zdrowotne, online powierzchnia, szybkie darmowe, medyczne tool"
  },
  de: {
    title: "Körperoberfläche Rechner – BSA Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Körperoberfläche Rechner (BSA) deine Körperfläche schnell & genau. Ideal für Medizin, Gesundheit und Dosierungsberechnung mit Methoden!",
    keywords: "körperoberfläche rechner, bsa berechnen, medizin gesundheit, dosierung tool, online körper, schnell genau, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora de Superficie Corporal – Calcula Fácil y Rápido",
    description: "Calcula la superficie corporal al instante con nuestra herramienta precisa. ¡Optimiza evaluaciones médicas y controla tu salud ahora mismo!",
    keywords: "calculadora, superficie, corporal, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, optimiza, evaluaciones, médicas, controla, salud"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && bodysurfaceareacalculatorMeta[langHeader as keyof typeof bodysurfaceareacalculatorMeta]
      ? langHeader
      : "en";

  const meta = bodysurfaceareacalculatorMeta[language as keyof typeof bodysurfaceareacalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('body-surface-area-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('body-surface-area-calculator', 'en'),
        'es': getCanonicalUrl('body-surface-area-calculator', 'es'),
        'pt-BR': getCanonicalUrl('body-surface-area-calculator', 'br'),
        'pl': getCanonicalUrl('body-surface-area-calculator', 'pl'),
        'de': getCanonicalUrl('body-surface-area-calculator', 'de'),
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

export default async function BodySurfaceAreaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.thesmartcalculator.com/health/body-surface-area-calculator",
    "url": "https://www.thesmartcalculator.com/health/body-surface-area-calculator",
    "name": "Body Surface Area (BSA) Calculator",
    "description": "Free Body Surface Area (BSA) Calculator online. Estimate body surface area using Du Bois, Mosteller, Haycock, Boyd, Fujimoto, Gehan & George, and Takahira formulas. Useful for chemotherapy dosing, burn assessment, and clinical applications.",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Body Surface Area Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Any",
      "url": "https://www.thesmartcalculator.com/health/body-surface-area-calculator",
      "featureList": [
        "Du Bois Formula",
        "Mosteller Formula",
        "Haycock Formula",
        "Boyd Formula",
        "Fujimoto Formula",
        "Gehan & George Formula",
        "Takahira Formula"
      ],
      "about": {
        "@type": "MedicalEntity",
        "name": "Body Surface Area (BSA)",
        "description": "Body Surface Area (BSA) is the measured or calculated surface area of a human body. It is commonly used in medicine to determine drug dosages and medical indicators such as cardiac index and burn assessments."
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.thesmartcalculator.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Health",
          "item": "https://www.thesmartcalculator.com/health/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Body Surface Area Calculator",
          "item": "https://www.thesmartcalculator.com/health/body-surface-area-calculator"
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/logo.png"
      }
    }
  }
  return <>
    {children}
    <Script
      id="body-surface-area-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
