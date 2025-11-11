import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for gpa-calculator
const gpacalculatorMeta = {
  en: {
    title: "GPA Calculator – Calculate Academic Average | TheSmartCalculator",
    description: "Use the GPA Calculator to compute your grade point average from courses and grades. Accurate, free online tool for students to track performance and academic progress.",
    keywords: "gpa calculator, calculate gpa, grade average, academic tool, online gpa, student calculator, performance tracker, free gpa tool"
  },
  br: {
    title: "Calculadora GPA – Coeficiente Desempenho | TheSmartCalculator",
    description: "Use a Calculadora GPA para calcular seu índice acadêmico. Ferramenta rápida e precisa para estudantes acompanharem desempenho, notas e progresso escolar online.",
    keywords: "calculadora gpa, calcular gpa, índice acadêmico, ferramenta estudantes, desempenho notas, calculadora online gpa, progresso escolar"
  },
  pl: {
    title: "Kalkulator Średniej Ocen – Oblicz Średnią | TheSmartCalculator",
    description: "Użyj kalkulatora średniej ocen online, aby szybko obliczyć średnią z przedmiotów i ocen. Proste, dokładne i darmowe narzędzie edukacyjne do śledzenia postępów.",
    keywords: "kalkulator średniej ocen, obliczyć średnią, średnia przedmiotów, narzędzie edukacyjne, oceny online, darmowy kalkulator średnia, postępy szkolne"
  },
  de: {
    title: "GPA Rechner – Notendurchschnitt Berechnen | TheSmartCalculator",
    description: "Berechne mit dem GPA Rechner deinen Notendurchschnitt aus Fächern und Noten. Schnelles, genaues und kostenloses Tool für Schüler zur Leistungsüberwachung.",
    keywords: "gpa rechner, notendurchschnitt berechnen, fach noten, schüler tool, online gpa, kostenloser rechner, leistungs tracker"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && gpacalculatorMeta[langHeader as keyof typeof gpacalculatorMeta]
      ? langHeader
      : "en";

  const meta = gpacalculatorMeta[language as keyof typeof gpacalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('gpa-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('gpa-calculator', 'en'),
        'pt-BR': getCanonicalUrl('gpa-calculator', 'br'),
        'pl': getCanonicalUrl('gpa-calculator', 'pl'),
        'de': getCanonicalUrl('gpa-calculator', 'de'),
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

export default async function GpaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
