import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for annuity-calculator
const annuitycalculatorMeta = {
  en: {
    title: "Annuity Calculator – Future Value Online | TheSmartCalculator",
    description: "Use the Annuity Calculator to compute future value based on regular contributions and interest rates. Accurate, free online tool for retirement and investment planning.",
    keywords: "annuity calculator, future value, contributions tool, interest rates, online annuity, retirement planning, free annuity tool, investment calculator"
  },
  br: {
    title: "Calculadora de Anuidade – Valor Futuro Online | TheSmartCalculator",
    description: "Use a Calculadora de Anuidade para calcular valor futuro com contribuições regulares e taxas de juros. Ferramenta precisa e gratuita para planejamento de aposentadoria.",
    keywords: "calculadora anuidade, valor futuro, contribuições regulares, taxas juros, online anuidade, planejamento aposentadoria, gratuita tool"
  },
  pl: {
    title: "Kalkulator Renty – Wysokość Renty Online | TheSmartCalculator",
    description: "Użyj kalkulatora renty online, aby szybko obliczyć wysokość renty, raty i okres wypłat. Proste, dokładne i darmowe narzędzie finansowe do planowania.",
    keywords: "kalkulator renty, obliczyć wysokość, raty okres, narzędzie finansowe, online renta, dokładne obliczenia, darmowy kalkulator"
  },
  de: {
    title: "Rentenrechner – Altersrente Berechnen Online | TheSmartCalculator",
    description: "Mit dem Rentenrechner berechnen Sie Ihre voraussichtliche Altersrente, Rentenpunkte und Vorsorgelücke. Jetzt Rentenrechner nutzen und besser vorsorgen mit Details.",
    keywords: "rentenrechner, altersrente berechnen, rentenpunkte tool, vorsorgelücke, online renten, vorsorge planung, kostenloser rechner"
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
