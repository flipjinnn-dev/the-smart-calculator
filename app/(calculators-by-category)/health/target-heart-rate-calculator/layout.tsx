import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for target-heart-rate-calculator
const targetheartratecalculatorMeta = {
  en: {
    title: "Target Heart Rate Calculator",
    description: "Find your ideal exercise heart rate with our Target Heart Rate Calculator to optimize workouts.",
    keywords: "target heart rate calculator, heart rate zone, exercise tool, online target, fitness training, cardio calculator, free heart tool, rate zone"
  },
  br: {
    title: "Frequência Cardíaca Máxima",
    description: "Use a calculadora de frequência cardíaca máxima para planejar treinos e monitorar seu coração. Descubra seu valor agora mesmo!",
    keywords: "calculadora frequência cardíaca alvo, zona frequência cardíaca, ferramenta exercício, online alvo, treinamento fitness, calculadora cardio, gratuita ferramenta coração, zona taxa"
  },
  pl: {
    title: "Kalkulator Docelowego Tętna – Strefa Online | TheSmartCalculator",
    description: "Użyj kalkulatora docelowego tętna online, aby obliczyć strefę tętna do ćwiczeń. Dokładne, darmowe narzędzie do fitness i treningu cardio.",
    keywords: "kalkulator docelowego tętna, strefa tętna, narzędzie ćwiczenia, online cel, trening fitness, kalkulator cardio, darmowe narzędzie serce"
  },
  de: {
    title: "Herzfrequenz Rechner – Berechne deine ideale Pulsrate",
    description: "Finde mit dem Herzfrequenz Rechner deine optimale Pulsrate. Einfach online berechnen – für Training, Gesundheit & Fitness, schnell und kostenlos!",
    keywords: "herzfrequenz rechner, herzfrequenz zone, übung tool, online ziel, fitness training, cardio rechner, kostenloser herz tool, rate zone"
  }
,
  es: {
    title: "Calculadora de Frecuencia Cardíaca Objetivo – Fácil y Rápida",
    description: "Calcula tu frecuencia cardíaca objetivo al instante con nuestra herramienta precisa. ¡Optimiza tu entrenamiento y alcanza tus metas fitness ahora mismo",
    keywords: "calculadora, frecuencia, cardíaca, objetivo, fácil, rápida, calcula, instante, nuestra, herramienta, precisa, optimiza, entrenamiento, alcanza, metas"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && targetheartratecalculatorMeta[langHeader as keyof typeof targetheartratecalculatorMeta]
      ? langHeader
      : "en";

  const meta = targetheartratecalculatorMeta[language as keyof typeof targetheartratecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('target-heart-rate-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('target-heart-rate-calculator', 'en'),
        'en': getCanonicalUrl('target-heart-rate-calculator', 'en'),
        'es': getCanonicalUrl('target-heart-rate-calculator', 'es'),
        'pt-BR': getCanonicalUrl('target-heart-rate-calculator', 'br'),
        'pl': getCanonicalUrl('target-heart-rate-calculator', 'pl'),
        'de': getCanonicalUrl('target-heart-rate-calculator', 'de'),
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

export default async function TargetHeartRateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.thesmartcalculator.com/health/target-heart-rate-calculator",
    "url": "https://www.thesmartcalculator.com/health/target-heart-rate-calculator",
    "name": "Target Heart Rate Calculator",
    "description": "Free Target Heart Rate Calculator to find training zones using age, maximum heart rate, and resting heart rate. Includes Haskell & Fox, Tanaka, and Nes formulas with Basic and Karvonen methods.",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All",
      "name": "Target Heart Rate Calculator",
      "description": "An online tool to calculate target heart rate zones based on age and formulas like Haskell & Fox, Tanaka et al., and Nes et al. Supports both percentage of max HR and Karvonen method.",
      "url": "https://www.thesmartcalculator.com/health/target-heart-rate-calculator",
      "featureList": [
        "Target Heart Rate Zones (Light, Moderate, Vigorous, Maximum)",
        "Formulas: Haskell & Fox (220 - age), Tanaka et al. (208 - 0.7 × age), Nes et al. (211 - 0.64 × age)",
        "Calculation Methods: Basic % of Max HR and Karvonen (Heart Rate Reserve)",
        "Custom Maximum Heart Rate input option",
        "Educational guide on training zones and best practices"
      ],
      "softwareHelp": {
        "@type": "CreativeWork",
        "name": "Training Zones Explained",
        "text": "Light: 50–60%, Moderate: 60–70%, Vigorous: 70–85%, Maximum: 85–95%. Includes formula accuracy notes and workout guidance."
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/logo.png"
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
          "name": "Health Calculators",
          "item": "https://www.thesmartcalculator.com/health/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Target Heart Rate Calculator",
          "item": "https://www.thesmartcalculator.com/health/target-heart-rate-calculator"
        }
      ]
    },
    "faqPage": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is Target Heart Rate calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Target Heart Rate can be calculated using formulas like Haskell & Fox (220 - age), Tanaka (208 - 0.7 × age), or Nes (211 - 0.64 × age). Then, apply percentage zones (50–95%) or use the Karvonen method with resting heart rate."
          }
        },
        {
          "@type": "Question",
          "name": "What are the main heart rate training zones?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Light: 50–60% of MHR, Moderate: 60–70%, Vigorous: 70–85%, Maximum: 85–95%."
          }
        },
        {
          "@type": "Question",
          "name": "Which method is more accurate: % of Max HR or Karvonen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Karvonen method is generally more accurate because it considers resting heart rate (RHR) along with maximum heart rate (MHR)."
          }
        }
      ]
    }
  }
  return <>
    {children}
    <Script
      id="target-heart-rate-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
