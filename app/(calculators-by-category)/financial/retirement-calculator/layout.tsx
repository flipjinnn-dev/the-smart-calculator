import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for retirement-calculator
const retirementcalculatorMeta = {
  en: {
    title: "Retirement Calculator",
    description: "Plan retirement savings and income accurately using our Retirement Calculator for a secure future.",
    keywords: "retirement calculator, savings planning, contributions calculation, online retirement, goals tool, forecasting calculator, free retirement tool, retirement estimate"
  },
  br: {
    title: "Calculadora de Aposentadoria Online Grátis",
    description: "Use o simulador de aposentadoria online grátis fácil para calcular seu futuro financeiro. Planeje sua aposentadoria de forma segura e rápida!",
    keywords: "calculadora aposentadoria, planejamento poupança, cálculo contribuições, online aposentadoria, ferramenta metas, calculadora previsão, gratuita ferramenta aposentadoria, estimativa aposentadoria"
  },
  pl: {
    title: "Kalkulator Emerytalny – Oblicz Swoją Emeryturę Online",
    description: "Użyj kalkulatora emerytalnego online, aby obliczyć przyszłą emeryturę, składki i oszczędności. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator emerytalny, planowanie oszczędności, obliczenia wpłat, online emerytura, narzędzie cele, kalkulator prognozowania, darmowe narzędzie emerytura, estymacja emerytury"
  },
  de: {
    title: "Rentenrechner – Ihre zukünftige Rente berechnen",
    description: "Mit dem Rentenrechner ermitteln Sie Ihre voraussichtliche Altersrente, Rentenpunkte und Versorgungslücke. Nutzen Sie den Rentenrechner für fundierte Vorsorgeplanung.",
    keywords: "rentenrechner, sparplanung, beitrags berechnung, online rente, ziele tool, prognose rechner, kostenloser rente tool, rente schätzung"
  }
,
  es: {
    title: "Simulador de Jubilación – Planifica tu Pensión y Ahorro",
    description: "Utiliza nuestro simulador de jubilación para calcular tu pensión futura, estimar el ahorro necesario y planificar tu retiro de manera sencilla y efectiva.",
    keywords: "simulador, jubilación, planifica, pensión, ahorro, utiliza, nuestro, calcular, futura, estimar, necesario, planificar, retiro, manera, sencilla"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && retirementcalculatorMeta[langHeader as keyof typeof retirementcalculatorMeta]
      ? langHeader
      : "en";

  const meta = retirementcalculatorMeta[language as keyof typeof retirementcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('retirement-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('retirement-calculator', 'en'),
        'en': getCanonicalUrl('retirement-calculator', 'en'),
        'es': getCanonicalUrl('retirement-calculator', 'es'),
        'pt-BR': getCanonicalUrl('retirement-calculator', 'br'),
        'pl': getCanonicalUrl('retirement-calculator', 'pl'),
        'de': getCanonicalUrl('retirement-calculator', 'de'),
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

export default async function RetirementCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
