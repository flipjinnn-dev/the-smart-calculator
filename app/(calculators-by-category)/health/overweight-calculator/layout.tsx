import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for overweight-calculator
const overweightcalculatorMeta = {
  en: {
    title: "Overweight Calculator - Weight Status Check",
    description: "Check your weight status using our Overweight Calculator to plan diet and fitness.",
    keywords: "overweight calculator, bmi overweight, health assessment, online overweight, weight management, free overweight tool, bmi calculation, overweight analysis"
  },
  br: {
    title: "Calculadora de Sobrepeso – Verifique Seu IMC e Saúde Ideal",
    description: "Use a Calculadora de Sobrepeso para descobrir seu IMC e avaliar se está acima do peso. Acompanhe sua saúde e metas com resultados rápidos.",
    keywords: "calculadora sobrepeso, imc sobrepeso, avaliação saúde, online sobrepeso, gerenciamento peso, gratuita ferramenta sobrepeso, cálculo imc, análise sobrepeso"
  },
  pl: {
    title: "Kalkulator Nadwagi – Sprawdź Swoją Masę Ciała",
    description: "Użyj kalkulatora nadwagi online, aby obliczyć, czy masz prawidłową masę ciała. Proste, dokładne i darmowe narzędzie zdrowotne dla każdego.",
    keywords: "kalkulator nadwagi, bmi nadwaga, ocena zdrowia, online nadwaga, zarządzanie wagą, darmowe narzędzie nadwaga, obliczenia bmi, analiza nadwagi"
  },
  de: {
    title: "Übergewicht Rechner – BMI Berechnen Online | TheSmartCalculator",
    description: "Nutzen Sie den overweight  – bmi online | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher Kontext — kostenl.",
    keywords: "übergewicht rechner, bmi übergewicht, gesundheitsbewertung, online übergewicht, gewicht management, kostenloser übergewicht tool, bmi berechnung, übergewicht analyse"
  }
,
  es: {
    title: "Calculadora de Sobrepeso – Evalúa tu Peso Fácil y Rápido",
    description: "Calcula tu índice de sobrepeso al instante con nuestra herramienta precisa. ¡Monitorea tu salud y toma decisiones para un estilo de vida más saludable ahora!",
    keywords: "calculadora, sobrepeso, evalúa, peso, fácil, rápido, calcula, índice, instante, nuestra, herramienta, precisa, monitorea, salud, toma"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && overweightcalculatorMeta[langHeader as keyof typeof overweightcalculatorMeta]
      ? langHeader
      : "en";

  const meta = overweightcalculatorMeta[language as keyof typeof overweightcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('overweight-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('overweight-calculator', 'en'),
        'en': getCanonicalUrl('overweight-calculator', 'en'),
        'es': getCanonicalUrl('overweight-calculator', 'es'),
        'pt-BR': getCanonicalUrl('overweight-calculator', 'br'),
        'pl': getCanonicalUrl('overweight-calculator', 'pl'),
        'de': getCanonicalUrl('overweight-calculator', 'de'),
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

export default async function OverweightCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Overweight Calculator – Check Healthy Weight Range",
    "url": "https://www.thesmartcalculator.com/health/overweight-calculator",
    "description": "Free overweight calculator to check BMI, healthy weight range, and weight category (underweight, normal, overweight, obese) using WHO standards. Supports metric and US units.",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Overweight Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All",
      "url": "https://www.thesmartcalculator.com/health/overweight-calculator",
      "description": "An online calculator to determine BMI and healthy weight range for adults using height and weight inputs.",
      "featureList": [
        "BMI calculation (metric & imperial)",
        "Healthy weight range",
        "Overweight, underweight, obesity classification",
        "Educational content about BMI"
      ],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/assets/img/logo.png"
      }
    },
    "inLanguage": "en",
    "datePublished": "2025-01-01",
    "dateModified": "2025-09-20"
  }
  return <>
    {children}
    <Script
      id="overweight-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
