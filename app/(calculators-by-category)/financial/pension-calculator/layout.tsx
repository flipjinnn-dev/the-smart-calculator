import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for pension-calculator
const pensioncalculatorMeta = {
  en: {
    title: "Pension Calculator",
    description: "Calculate expected pension income accurately with our Pension Calculator and plan a secure retirement.",
    keywords: "pension calculator, benefits estimate, salary years, online pension, retirement planning, free pension tool, service calculation, pension projection"
  },
  br: {
    title: "Calculadora de Pensão",
    description: "Use a calculadora de pensão online grátis e fácil para calcular valores e parcelas. Planeje seus pagamentos rapidamente e sem complicações!",
    keywords: "calculadora pensão, estimativa benefícios, salário anos, online pensão, planejamento aposentadoria, gratuita ferramenta pensão, cálculo serviço, projeção pensão"
  },
  pl: {
    title: "Kalkulator Emerytury – Oblicz Wysokość Emerytury Online",
    description: "Użyj kalkulatora emerytury online, aby obliczyć przyszłą emeryturę, składki i okres pracy. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator emerytury, estymacja korzyści, pensja lata, online emerytura, planowanie emerytury, darmowe narzędzie emerytura, obliczenia usługi, projekcja emerytury"
  },
  de: {
    title: "Rentenrechner – Ihre Rentenplanung online berechnen",
    description: "Mit dem Rentenrechner berechnen Sie Ihre monatliche Rente, Vorsorgebedarf und Ersparnisse. Nutzen Sie den Pensionsrechner für Ihre Altersplanung.",
    keywords: "rentenrechner, leistungen schätzung, gehalt jahre, online pension, rentenplanung, kostenloser pension tool, dienst berechnung, pension prognose"
  }
,
  es: {
    title: "Simulador de Pensiones – Calcula tu Pensión, Jubilación y Ahorro",
    description: "Utiliza nuestro simulador de pensiones para planificar tu jubilación, estimar tu pensión y optimizar tu ahorro de manera sencilla y precisa.",
    keywords: "simulador, pensiones, calcula, pensión, jubilación, ahorro, utiliza, nuestro, planificar, estimar, optimizar, manera, sencilla, precisa"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && pensioncalculatorMeta[langHeader as keyof typeof pensioncalculatorMeta]
      ? langHeader
      : "en";

  const meta = pensioncalculatorMeta[language as keyof typeof pensioncalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('pension-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('pension-calculator', 'en'),
        'en': getCanonicalUrl('pension-calculator', 'en'),
        'es': getCanonicalUrl('pension-calculator', 'es'),
        'pt-BR': getCanonicalUrl('pension-calculator', 'br'),
        'pl': getCanonicalUrl('pension-calculator', 'pl'),
        'de': getCanonicalUrl('pension-calculator', 'de'),
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

export default async function PensionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
