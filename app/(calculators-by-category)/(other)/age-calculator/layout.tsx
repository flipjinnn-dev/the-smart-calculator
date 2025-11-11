import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for age-calculator
const agecalculatorMeta = {
  en: {
    title: "Age Calculator – Exact Age Online Tool | TheSmartCalculator",
    description: "Use the Age  – Exact Age Online Tool | TheSmartCalculator calculator to get instant, accurate results. Fast inputs, clear outputs, and helpful context for quick.",
    keywords: "age calculator, calculate age, exact age, birthdate age, online age tool, age in months, age in days, free age calculator"
  },
  br: {
    title: "Calculadora de Idade – Idade Exata Online | TheSmartCalculator",
    description: "Use a age  – exact age online tool | thesmartcalculator para obter resultados rápidos e precisos. Entradas simples, saídas claras e contexto útil — grátis e fác.",
    keywords: "calculadora de idade, calcular idade, idade exata, idade data nascimento, ferramenta idade online, idade em meses, idade em dias, calculadora idade gratuita"
  },
  pl: {
    title: "Kalkulator Wieku – Oblicz Wiek Online | TheSmartCalculator",
    description: "Użyj age  – exact age online tool | thesmartcalculator do szybkich i dokładnych wyników. Proste dane wejściowe, czytelne wyniki i pomocny kontekst — za darmo i.",
    keywords: "kalkulator wieku, obliczyć wiek, dokładny wiek, wiek data urodzenia, narzędzie wiek online, wiek w miesiącach, wiek w dniach, darmowy kalkulator wieku"
  },
  de: {
    title: "Altersrechner – Alter Berechnen Online | TheSmartCalculator",
    description: "Nutzen Sie den age  – exact age online tool | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher Kontext — kos.",
    keywords: "altersrechner, alter berechnen, genaues alter, geburtsdatum alter, online alter tool, alter in monaten, alter in tagen, kostenloser altersrechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && agecalculatorMeta[langHeader as keyof typeof agecalculatorMeta]
      ? langHeader
      : "en";

  const meta = agecalculatorMeta[language as keyof typeof agecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('age-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('age-calculator', 'en'),
        'pt-BR': getCanonicalUrl('age-calculator', 'br'),
        'pl': getCanonicalUrl('age-calculator', 'pl'),
        'de': getCanonicalUrl('age-calculator', 'de'),
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

export default async function AgeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
