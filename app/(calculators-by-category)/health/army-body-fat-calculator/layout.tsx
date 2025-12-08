import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for army-body-fat-calculator
const armybodyfatcalculatorMeta = {
  en: {
    title: "Army Body Fat Calculator – Percentage Online | TheSmartCalculator",
    description: "Use the Army Body Fat Calculator to estimate percentage using U.S. Army method. Accurate, free online tool for fitness tracking and military standards compliance.",
    keywords: "army body fat calculator, fat percentage, army method, fitness tool, online fat calculator, military standards, free army tool, body analysis"
  },
  br: {
    title: "Army Body Fat Calculator – Percentage Online | TheSmartCalcula",
    description: "Use a Calculadora Gordura Corporal Exército para estimar porcentagem pelo método do Exército dos EUA. Ferramenta precisa e gratuita para fitness e padrões militares.",
    keywords: "calculadora gordura exército, porcentagem gordura, método exército, ferramenta fitness, online gordura, padrões militares, gratuita tool"
  },
  pl: {
    title: "Army Body Fat Calculator – Percentage Online | TheSmartCalcula",
    description: "Użyj kalkulatora tkanki tłuszczowej armia online, aby oszacować procent metodą armii USA. Dokładne, darmowe narzędzie do śledzenia fitness i standardów.",
    keywords: "kalkulator tkanki armia, procent tłuszczu, metoda armia, narzędzie fitness, online tłuszcz, standardy wojskowe, darmowy tool"
  },
  de: {
    title: "Army Körperfett Rechner – Prozent Berechnen | TheSmartCalculator",
    description: "Berechne dein Körperfett mit dem Army Körperfett Rechner. Schnelle & genaue Analyse für Männer und Frauen – einfach, effektiv und kostenlos online!",
    keywords: "army körperfett rechner, prozent berechnen, analyse männer frauen, einfach tool, online fett, effektiv kostenlos, genaue rechner"
  }
,
  es: {
    title: "Calculadora de Grasa Corporal del Ejército – Fácil y Rápida",
    description: "Calcula tu porcentaje de grasa corporal militar al instante. ¡Cumple con los estándares del ejército y optimiza tu entrenamiento ahora mismo",
    keywords: "calculadora, grasa, corporal, ejército, fácil, rápida, calcula, porcentaje, militar, instante, cumple, estándares, optimiza, entrenamiento, ahora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && armybodyfatcalculatorMeta[langHeader as keyof typeof armybodyfatcalculatorMeta]
      ? langHeader
      : "en";

  const meta = armybodyfatcalculatorMeta[language as keyof typeof armybodyfatcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('army-body-fat-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('army-body-fat-calculator', 'en'),
        'pt-BR': getCanonicalUrl('army-body-fat-calculator', 'br'),
        'pl': getCanonicalUrl('army-body-fat-calculator', 'pl'),
        'de': getCanonicalUrl('army-body-fat-calculator', 'de'),
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

export default async function ArmyBodyFatCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate Army body fat percentage using this tool?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enter your gender, age, weight, and abdominal (or required) measurement into the form. Then the calculator applies the Army tape-test formula (AR 600-9) to estimate your body fat percentage."
        }
      },
      {
        "@type": "Question",
        "name": "What are the Army standards for body fat under AR 600-9?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The allowable body fat percentages vary by age and gender. The page provides a chart showing these standards per AR 600-9."
        }
      },
      {
        "@type": "Question",
        "name": "Is this calculator valid for official enlistment measurement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This is an estimation tool for preparation and self-check. Official measurements at recruitment or unit level are final."
        }
      }
      /* Add more Q&A items here as needed */
    ]
  }
  return <>
    {children}
    <Script
      id="army-body-fat-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
