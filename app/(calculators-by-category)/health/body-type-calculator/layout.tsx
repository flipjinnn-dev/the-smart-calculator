import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for body-type-calculator
const bodytypecalculatorMeta = {
  en: {
    title: "Body Type Calculator - Body Shape Identifier",
    description: "Discover your body shape using our Body Type Calculator to optimize workout routines.",
    keywords: "body type calculator, measurements tool, characteristics analysis, online type, fitness planning, health calculator, free body tool, type estimate"
  },
  br: {
    title: "Body Type Calculator – Measurements Online | TheSmartCalculato",
    description: "Use a Calculadora de Biotipo Corporal para identificar se você é ectomorfo, mesomorfo ou endomorfo. Entenda seu corpo e otimize seus treinos com precisão.",
    keywords: "calculadora biotipo corporal, tipo físico, ectomorfo mesomorfo, ferramenta corpo online, otimizar treinos, precisa calculadora, saúde física"
  },
  pl: {
    title: "Kalkulator Typu Sylwetki – Budowa Ciała Online | TheSmartCalculator",
    description: "Użyj kalkulatora typu sylwetki online, aby określić swój typ ciała: ektomorfik, mezomorfik lub endomorfik. Proste, szybkie i darmowe narzędzie do planowania.",
    keywords: "kalkulator typu sylwetki, budowa ciała, ektomorfik mezomorfik, narzędzie sylwetki online, proste szybkie, darmowy tool, planowanie fitness"
  },
  de: {
    title: "Körperform Rechner – Typ Bestimmen Online | TheSmartCalculator",
    description: "Finde mit dem Körperform Rechner heraus, welcher Körpertyp du bist. Schnell, genau & kostenlos – ideal für Fitness, Mode und Gesundheitsziele mit Messungen!",
    keywords: "körperform rechner, typ bestimmen, fitness mode, gesundheitsziele tool, online körper, schnell genau, kostenloser rechner"
  }
  ,
  es: {
    title: "Calculadora de Tipo de Cuerpo – Descubre tu Morfología",
    description: "Descubre tu tipo de cuerpo al instante con nuestra calculadora precisa. ¡Conoce tu morfología y optimiza tu entrenamiento y estilo de vida ahora mismo!",
    keywords: "calculadora, tipo, cuerpo, descubre, morfología, instante, nuestra, precisa, conoce, optimiza, entrenamiento, estilo, vida, ahora, mismo"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && bodytypecalculatorMeta[langHeader as keyof typeof bodytypecalculatorMeta]
      ? langHeader
      : "en";

  const meta = bodytypecalculatorMeta[language as keyof typeof bodytypecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('body-type-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('body-type-calculator', 'en'),
        'en': getCanonicalUrl('body-type-calculator', 'en'),
        'es': getCanonicalUrl('body-type-calculator', 'es'),
        'pt-BR': getCanonicalUrl('body-type-calculator', 'br'),
        'pl': getCanonicalUrl('body-type-calculator', 'pl'),
        'de': getCanonicalUrl('body-type-calculator', 'de'),
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

export default async function BodyTypeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
