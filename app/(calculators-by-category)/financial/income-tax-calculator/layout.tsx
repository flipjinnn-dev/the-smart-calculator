import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for income-tax-calculator
const incometaxcalculatorMeta = {
  en: {
    title: "Income Tax Calculator Quick Tax Estimate",
    description: "Estimate annual income tax quickly and plan savings efficiently using our Income Tax Calculator.",
    keywords: "income tax calculator, tax computation, deductions tool, exemptions, online tax, tax preparation, financial planning, free tax tool"
  },
  br: {
    title: "Calculadora de Imposto de Renda",
    description: "Use a calculadora de imposto de renda para calcular tributos e restituições. Planeje suas finanças e simule seu imposto agora mesmo!",
    keywords: "calculadora imposto renda, computação imposto, ferramenta deduções, isenções, online imposto, preparação imposto, planejamento financeiro, gratuita ferramenta imposto"
  },
  pl: {
    title: "Kalkulator Podatku Dochodowego – Oblicz Podatek Online",
    description: "Użyj kalkulatora podatku dochodowego online, aby obliczyć należny podatek, ulgi i dochód netto. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator podatku dochodowego, obliczenia podatku, narzędzie ulgi, zwolnienia, online podatek, przygotowanie podatku, planowanie finansowe, darmowe narzędzie podatek"
  },
  de: {
    title: "Einkommensteuerrechner – Ihre Steuerbelastung online ermitteln",
    description: "Mit dem Einkommensteuerrechner berechnen Sie Ihre Einkommens- und Steuerlast genau. Nutzen Sie den Einkommensteuerrechner zur besseren Finanzplanung und Vorbereitung.",
    keywords: "einkommensteuerrechner, steuer berechnung, abzug tool, freistellungen, online steuer, steuervorbereitung, finanzplanung, kostenloser steuer tool"
  }
,
  es: {
    title: "Calculadora de Impuesto sobre la Renta – Calcula tu Renta y Declaración",
    description: "Utiliza nuestra calculadora de impuesto sobre la renta para estimar tus impuestos, planificar tu declaración y gestionar tu renta de manera precisa y sencilla.",
    keywords: "calculadora, impuesto, sobre, renta, calcula, declaración, utiliza, nuestra, estimar, impuestos, planificar, gestionar, manera, precisa, sencilla"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && incometaxcalculatorMeta[langHeader as keyof typeof incometaxcalculatorMeta]
      ? langHeader
      : "en";

  const meta = incometaxcalculatorMeta[language as keyof typeof incometaxcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('income-tax-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('income-tax-calculator', 'en'),
        'en': getCanonicalUrl('income-tax-calculator', 'en'),
        'es': getCanonicalUrl('income-tax-calculator', 'es'),
        'pt-BR': getCanonicalUrl('income-tax-calculator', 'br'),
        'pl': getCanonicalUrl('income-tax-calculator', 'pl'),
        'de': getCanonicalUrl('income-tax-calculator', 'de'),
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

export default async function IncomeTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
