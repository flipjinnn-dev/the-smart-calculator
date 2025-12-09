import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for anorexic-bmi-calculator
const anorexicbmicalculatorMeta = {
  en: {
    title: "Anorexic BMI Calculator – Index Online Tool | TheSmartCalculator",
    description: "Use the Anorexic BMI Calculator to compute BMI for individuals with anorexia. Accurate, free online tool for health monitoring and medical assessment in low-weight cases.",
    keywords: "anorexic bmi calculator, bmi for anorexia, health tool, online bmi, medical assessment, low weight calculator, free anorexic tool, index calculation"
  },
  br: {
    title: "Calculadora IMC Anoréxico – Índice Online | TheSmartCalculator",
    description: "Use a Calculadora IMC Anoréxico para calcular IMC em casos de anorexia. Ferramenta precisa e gratuita online para monitoramento de saúde e avaliação médica.",
    keywords: "calculadora imc anoréxico, imc anorexia, ferramenta saúde, online imc, avaliação médica, baixa peso calculadora, gratuita tool"
  },
  pl: {
    title: "Kalkulator BMI Anoreksja – Oblicz Online | TheSmartCalculator",
    description: "Użyj kalkulatora BMI anoreksja online, aby obliczyć BMI w przypadkach anoreksji. Dokładne, darmowe narzędzie do monitorowania zdrowia i oceny medycznej.",
    keywords: "kalkulator bmi anoreksja, bmi anorexia, narzędzie zdrowie, online bmi, ocena medyczna, niska waga kalkulator, darmowy tool"
  },
  de: {
    title: "Anorexie BMI Rechner – Index Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Anorexie BMI Rechner den BMI für Personen mit Anorexie. Präzises, kostenloses Online-Tool zur Gesundheitsüberwachung und medizinischen Bewertung.",
    keywords: "anorexie bmi rechner, bmi anorexie, gesundheit tool, online bmi, medizinische bewertung, niedrig gewicht rechner, kostenloser tool"
  }
,
  es: {
    title: "Calculadora de IMC – Evalúa tu Peso y Salud Fácilmente",
    description: "Calcula tu IMC al instante con nuestra herramienta precisa. ¡Monitorea tu salud y recibe orientación para mantener un peso seguro y saludable",
    keywords: "calculadora, evalúa, peso, salud, fácilmente, calcula, instante, nuestra, herramienta, precisa, monitorea, recibe, orientación, mantener, seguro"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && anorexicbmicalculatorMeta[langHeader as keyof typeof anorexicbmicalculatorMeta]
      ? langHeader
      : "en";

  const meta = anorexicbmicalculatorMeta[language as keyof typeof anorexicbmicalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('anorexic-bmi-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }anorexic-bmi-calculator`,
      languages: {
        'en': getCanonicalUrl('anorexic-bmi-calculator', 'en'),
        'es': getCanonicalUrl('anorexic-bmi-calculator', 'es'),
        'pt-BR': getCanonicalUrl('anorexic-bmi-calculator', 'br'),
        'pl': getCanonicalUrl('anorexic-bmi-calculator', 'pl'),
        'de': getCanonicalUrl('anorexic-bmi-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }anorexic-bmi-calculator`,
    },
  };
}

export default async function AnorexicBmiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Anorexic BMI Calculator",
      "operatingSystem": "Web",
      "applicationCategory": "HealthApplication",
      "description": "Free anorexic BMI calculator that computes your Body Mass Index (BMI) and categorizes it into normal, mild, moderate, severe, or extreme anorexia based on medical thresholds. For educational purposes only.",
      "url": "https://www.thesmartcalculator.com/health/anorexic-bmi-calculator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    "name": "Anorexic BMI Calculator",
    "url": "https://www.thesmartcalculator.com/health/anorexic-bmi-calculator",
    "description": "Calculate your BMI and see anorexia severity levels (mild, moderate, severe, extreme). Educational tool with health warnings and FAQs.",
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/assets/logo.png"
      }
    },
    "inLanguage": "en",
    "about": {
      "@type": "MedicalWebPage",
      "name": "Anorexic BMI Classification",
      "medicalSpecialty": "Nutrition",
      "audience": {
        "@type": "Audience",
        "audienceType": "Adults"
      }
    }
  }
  return <>
    {children}
    <Script
      id="anorexic-bmi-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
