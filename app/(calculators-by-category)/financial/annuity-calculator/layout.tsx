import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for annuity-calculator
const annuitycalculatorMeta = {
  en: {
    title: "Annuity Calculator – Estimate Future Value and Payments",
    description: "Use our free online annuity calculator to calculate future value, returns, and payouts. Plan retirement income and investments with confidence.",
    keywords: "annuity calculator, future value, contributions tool, interest rates, online annuity, retirement planning, free annuity tool, investment calculator"
  },
  br: {
    title: "Calculadora de Anuidades – Calcule Rendimentos e Pagamentos",
    description: "Calcule rendimentos e pagamentos de anuidades com rapidez. Planeje investimentos e descubra agora.",
    keywords: "calculadora anuidade, valor futuro, contribuições regulares, taxas juros, online anuidade, planejamento aposentadoria, gratuita tool"
  },
  pl: {
    title: "Kalkulator Renty – Sprawdź Swoje Świadczenia",
    description: "Oblicz swoją rentę i dowiedz się, ile możesz otrzymać. Sprawdź teraz online!",
    keywords: "kalkulator renty, obliczyć wysokość, raty okres, narzędzie finansowe, online renta, dokładne obliczenia, darmowy kalkulator"
  },
  de: {
    title: "Leibrentenrechner & Annuitätenrechner – Renten Auszahlung Berechnen",
    description: "Nutzen Sie unseren Leibrentenrechner & Annuitätenrechner, um Ihre Renten- und Rentenauszahlung zu berechnen und Ihre finanzielle Planung für den Ruhestand zu optimieren.",
    keywords: "rentenrechner, altersrente berechnen, rentenpunkte tool, vorsorgelücke, online renten, vorsorge planung, kostenloser rechner"
  }
,
  es: {
    title: "Calcula Anualidad y Conoce sus Pagos",
    description: "Calcula tu anualidad y descubre el valor exacto de tus pagos futuros para tomar decisiones financieras seguras y claras.",
    keywords: "calculadora, anualidad, planifica, pagos, ahorros, calcula, fácilmente, organiza, finanzas, proyecta, ingresos, toma, decisiones, inteligentes, asegurar"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && annuitycalculatorMeta[langHeader as keyof typeof annuitycalculatorMeta]
      ? langHeader
      : "en";

  const meta = annuitycalculatorMeta[language as keyof typeof annuitycalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('annuity-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('annuity-calculator', 'en'),
        'es': getCanonicalUrl('annuity-calculator', 'es'),
        'pt-BR': getCanonicalUrl('annuity-calculator', 'br'),
        'pl': getCanonicalUrl('annuity-calculator', 'pl'),
        'de': getCanonicalUrl('annuity-calculator', 'de'),
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

export default async function AnnuityCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
