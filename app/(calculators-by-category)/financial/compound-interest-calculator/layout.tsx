import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for compound-interest-calculator
const compoundinterestcalculatorMeta = {
  en: {
    title: "Compound Interest Calculator – Growth Online | TheSmartCalculator",
    description: "See how money grows over time with compounding using our Compound Interest Calculator.",
    keywords: "compound interest calculator, growth tool, contributions calculation, online compound, investment projections, savings calculator, free interest tool, time growth"
  },
  br: {
    title: "Calculadora de Juros Compostos Online Grátis",
    description: "Use a calculadora de juros compostos para calcular rendimentos e crescimento do investimento. Planeje seus ganhos e simule agora mesmo!",
    keywords: "calculadora juros compostos, simular ganhos, investimentos tool, render dinheiro, cálculos rápidos, precisa calculadora, tempo crescimento"
  },
  pl: {
    title: "Kalkulator Procentu Składanego – Zysk Online | TheSmartCalculator",
    description: "Użyj kalkulatora procentu składanego online, aby obliczyć zysk z inwestycji i odsetki. Proste, szybkie i dokładne narzędzie finansowe do projekcji.",
    keywords: "kalkulator procentu składanego, obliczyć zysk, inwestycji odsetki, narzędzie finansowe, online składany, szybkie dokładne, darmowy tool"
  },
  de: {
    title: "Zinseszinsrechner – Vermögen Berechnen Online | TheSmartCalculator",
    description: "Mit dem Zinseszinsrechner berechnen Sie Kapitalwachstum, Sparraten und Laufzeit effizient. Nutzen Sie den Zinseszinsrechner für Ihre Finanz- und Anlageplanung.",
    keywords: "zinseszinsrechner, vermögen berechnen, kapitalwachstum tool, sparraten laufzeit, finanz anlage, effizient nutzen, rechner online"
  }
,
  es: {
    title: "Calculadora de Interés Compuesto – Calcula Capitalización y Valor Futuro",
    description: "Utiliza nuestra calculadora de interés compuesto para estimar la capitalización de tu dinero, proyectar el valor futuro y optimizar tus inversiones de manera sencilla y precisa.",
    keywords: "calculadora, interés, compuesto, calcula, capitalización, valor, futuro, utiliza, nuestra, estimar, dinero, proyectar, optimizar, inversiones, manera"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && compoundinterestcalculatorMeta[langHeader as keyof typeof compoundinterestcalculatorMeta]
      ? langHeader
      : "en";

  const meta = compoundinterestcalculatorMeta[language as keyof typeof compoundinterestcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('compound-interest-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('compound-interest-calculator', 'en'),
        'en': getCanonicalUrl('compound-interest-calculator', 'en'),
        'es': getCanonicalUrl('compound-interest-calculator', 'es'),
        'pt-BR': getCanonicalUrl('compound-interest-calculator', 'br'),
        'pl': getCanonicalUrl('compound-interest-calculator', 'pl'),
        'de': getCanonicalUrl('compound-interest-calculator', 'de'),
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

export default async function CompoundInterestCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
