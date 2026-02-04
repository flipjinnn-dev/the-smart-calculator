import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for interest-calculator
const interestcalculatorMeta = {
  en: {
    title: "Interest Calculator",
    description: "Calculate simple or compound interest accurately using our Interest Calculator for loans and savings.",
    keywords: "interest calculator, investment growth, interest calculation, buying power, online interest, inflation adjustment, financial projection, free interest tool"
  },
  br: {
    title: "Calculadora de Juros Grátis",
    description: "Use a calculadora de juros online grátis para calcular rendimentos e crescimento do seu dinheiro. Planeje seus investimentos de forma simples e rápida!",
    keywords: "calculadora juros, crescimento investimento, cálculo juros, poder compra, online juros, ajuste inflação, projeção financeira, gratuita ferramenta juros"
  },
  pl: {
    title: "Kalkulator Odsetek – Oblicz Odsetki od Kwoty Online",
    description: "Użyj kalkulatora odsetek online, aby obliczyć odsetki od kwoty, kredytu lub zaległości. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator odsetek, wzrost inwestycji, obliczenia odsetek, siła nabywcza, online odsetki, dostosowanie inflacji, prognoza finansowa, darmowe narzędzie odsetki"
  },
  de: {
    title: "Zinsrechner – Zinsen & Laufzeit online ermitteln",
    description: "Mit dem Zinsrechner berechnen Sie Zinssatz, Laufzeit, Anfangs- und Endkapital genau – nutzen Sie den Zinsrechner für Ihre Finanz- oder Anlageplanung.",
    keywords: "zinsrechner, investitionswachstum, zinsberechnung, kaufkraft, online zins, inflationsanpassung, finanzprojektion, kostenloser zins tool"
  }
,
  es: {
    title: "Cálculo de Intereses – Calcula Interés, Tasa y Tiempo",
    description: "Utiliza nuestra herramienta de cálculo de intereses para estimar el interés generado, analizar la tasa de interés y planificar el tiempo de tus inversiones o préstamos de manera precisa.",
    keywords: "cálculo, intereses, calcula, interés, tasa, tiempo, utiliza, nuestra, herramienta, estimar, generado, analizar, planificar, inversiones, préstamos"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && interestcalculatorMeta[langHeader as keyof typeof interestcalculatorMeta]
      ? langHeader
      : "en";

  const meta = interestcalculatorMeta[language as keyof typeof interestcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('interest-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('interest-calculator', 'en'),
        'en': getCanonicalUrl('interest-calculator', 'en'),
        'es': getCanonicalUrl('interest-calculator', 'es'),
        'pt-BR': getCanonicalUrl('interest-calculator', 'br'),
        'pl': getCanonicalUrl('interest-calculator', 'pl'),
        'de': getCanonicalUrl('interest-calculator', 'de'),
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

export default async function InterestCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
