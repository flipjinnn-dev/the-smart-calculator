import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for lean-body-mass-calculator
const leanbodymasscalculatorMeta = {
  en: {
    title: "Lean Body Mass Calculator – Weight Fat Online | TheSmartCalculator",
    description: "Use the Lean Body Mass Calculator to estimate mass based on weight and fat percentage. Accurate, free online tool for fitness and health tracking.",
    keywords: "lean body mass calculator, mass estimate, weight fat, online lean, fitness tracking, health tool, free mass calculator, body mass"
  },
  br: {
    title: "Calculadora Massa Corporal Magra – Descubra Seu Percentual Ideal",
    description: "Use a Calculadora de Massa Corporal Magra para estimar massa baseada em peso e porcentagem de gordura. Ferramenta precisa para rastreamento de fitness e saúde.",
    keywords: "calculadora massa magra, estimativa massa, peso gordura, online magra, rastreamento fitness, ferramenta saúde, gratuita calculadora massa, massa corporal"
  },
  pl: {
    title: "Kalkulator Masy Ciała Chudego – Oblicz Procent Tłuszczu",
    description: "Użyj kalkulatora masy ciała chudego online, aby oszacować masę na podstawie wagi i procentu tłuszczu. Dokładne, darmowe narzędzie do fitness i zdrowia.",
    keywords: "kalkulator masy chudego, estymacja masy, waga tłuszcz, online chudy, tracking fitness, narzędzie zdrowie, darmowy kalkulator masy, masa ciała"
  },
  de: {
    title: "Lean Body Mass Rechner – Körperfettanteil einfach berechnen",
    description: "Berechne mit dem Lean Body Mass Rechner Masse basierend auf Gewicht und Fettanteil. Präzises, kostenloses Tool für Fitness und Gesundheits-Tracking.",
    keywords: "lean body mass rechner, masse schätzung, gewicht fett, online lean, fitness tracking, gesundheit tool, kostenloser mass rechner, körper masse"
  }
,
  es: {
    title: "Calculadora de Masa Corporal Magra – Calcula Fácil y Rápido",
    description: "Calcula tu masa corporal magra al instante con nuestra herramienta precisa. ¡Optimiza tu entrenamiento y mejora tu composición corporal ahora mismo",
    keywords: "calculadora, masa, corporal, magra, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, optimiza, entrenamiento, mejora, composición"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && leanbodymasscalculatorMeta[langHeader as keyof typeof leanbodymasscalculatorMeta]
      ? langHeader
      : "en";

  const meta = leanbodymasscalculatorMeta[language as keyof typeof leanbodymasscalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('lean-body-mass-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('lean-body-mass-calculator', 'en'),
        'es': getCanonicalUrl('lean-body-mass-calculator', 'es'),
        'pt-BR': getCanonicalUrl('lean-body-mass-calculator', 'br'),
        'pl': getCanonicalUrl('lean-body-mass-calculator', 'pl'),
        'de': getCanonicalUrl('lean-body-mass-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }lean-body-mass-calculator`,
    },
  };
}

export default async function LeanBodyMassCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.thesmartcalculator.com/health/lean-body-mass-calculator",
    "name": "Lean Body Mass Calculator - Smart Calculator",
    "description": "Free Lean Body Mass Calculator. Calculate your LBM using Boer, James, Hume, and Peters formulas. Enter your age, gender, height, weight, and optional body fat % to estimate fat-free mass.",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Lean Body Mass Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "description": "An online calculator to estimate Lean Body Mass (LBM) using multiple scientific formulas and optional body fat percentage.",
      "url": "https://www.thesmartcalculator.com/health/lean-body-mass-calculator"
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
          "name": "Lean Body Mass Calculator",
          "item": "https://www.thesmartcalculator.com/health/lean-body-mass-calculator"
        }
      ]
    },
    "mainEntityOfPage": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Lean Body Mass (LBM)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lean Body Mass (LBM) is your body weight minus fat. It includes muscles, bones, water, and organs."
          }
        },
        {
          "@type": "Question",
          "name": "Which formula is most accurate for LBM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If body fat percentage is available, that method is most accurate. Otherwise, the Boer formula is commonly recommended for adults."
          }
        },
        {
          "@type": "Question",
          "name": "Is this calculator suitable for children?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the Peters formula is used for children under 14 years old."
          }
        },
        {
          "@type": "Question",
          "name": "How is LBM different from BMI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BMI is a weight-to-height ratio and does not differentiate between muscle and fat, while LBM specifically measures fat-free mass."
          }
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Smart Calculator",
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
      id="lean-body-mass-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
