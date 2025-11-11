import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for rpe-calculator
const rpecalculatorMeta = {
  en: {
    title: "RPE Calculator – Training Intensity Online | TheSmartCalculator",
    description: "Use the RPE Calculator to determine training intensity based on perceived exertion. Accurate, free online tool for fitness, strength, and endurance planning.",
    keywords: "rpe calculator, training intensity, perceived exertion, fitness tool, online rpe, strength calculator, endurance planning, free rpe tool"
  },
  br: {
    title: "Calculadora RPE – Intensidade Treino Online | TheSmartCalculator",
    description: "Use a Calculadora RPE para calcular intensidade de treino com base em esforço percebido. Ferramenta precisa e gratuita online para fitness e planejamento de força.",
    keywords: "calculadora rpe, intensidade treino, esforço percebido, ferramenta fitness online, força calculadora, planejamento endurance, gratuita rpe"
  },
  pl: {
    title: "Kalkulator RPE – Intensywność Treningu Online | TheSmartCalculator",
    description: "Użyj kalkulatora RPE online, aby obliczyć intensywność treningu na podstawie postrzeganego wysiłku. Dokładne, darmowe narzędzie do fitness i planowania wytrzymałości.",
    keywords: "kalkulator rpe, intensywność treningu, postrzegany wysiłek, narzędzie fitness, online rpe, siła kalkulator, planowanie endurance"
  },
  de: {
    title: "RPE Rechner – Trainingsintensität Berechnen | TheSmartCalculator",
    description: "Berechne mit dem RPE Rechner deine Trainingsintensität nach dem RPE-System. Ideal für Fitness, Krafttraining & Ausdauer – schnell & kostenlos online!",
    keywords: "rpe rechner, trainingsintensität berechnen, rpe system, fitness tool, krafttraining, ausdauer rechner, kostenloser online tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && rpecalculatorMeta[langHeader as keyof typeof rpecalculatorMeta]
      ? langHeader
      : "en";

  const meta = rpecalculatorMeta[language as keyof typeof rpecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('rpe-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('rpe-calculator', 'en'),
        'pt-BR': getCanonicalUrl('rpe-calculator', 'br'),
        'pl': getCanonicalUrl('rpe-calculator', 'pl'),
        'de': getCanonicalUrl('rpe-calculator', 'de'),
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

export default async function RpeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
