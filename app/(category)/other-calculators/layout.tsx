import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for other-calculators
const othercalculatorsMeta = {
  en: {
    title: "Other Calculator – Miscellaneous Tools Online | TheSmartCalculator",
    description: "Use the Other Calculator for various daily tasks and unique calculations. Accurate, free online tool for miscellaneous needs, planning, and problem-solving.",
    keywords: "other calculator, miscellaneous tool, daily calculations, unique calculator, online other, planning tool, free miscellaneous, problem solver"
  },
  br: {
    title: "Calculadora Online – Ferramentas Diversas | TheSmartCalculator",
    description: "Explore calculadoras online de outro tipo para facilitar tarefas diárias. Ferramentas úteis, rápidas e precisas para qualquer necessidade ou cálculo variado.",
    keywords: "calculadora online, ferramentas diversas, tarefas diárias, calculadoras outro tipo, precisa ferramenta, qualquer necessidade, gratuita online"
  },
  pl: {
    title: "Kalkulator inne – Oblicz Różne Dane Online | TheSmartCalculator",
    description: "Skorzystaj z kalkulatora inne online, aby szybko obliczyć różne dane i wartości. Proste, dokładne i uniwersalne narzędzie dla każdego użytkownika i zadań.",
    keywords: "kalkulator inne, obliczyć dane, różne wartości, narzędzie uniwersalne, online inne, dokładne obliczenia, darmowy kalkulator inne"
  },
  de: {
    title: "Andere Rechner – Nützliche Online Tools | TheSmartCalculator",
    description: "Entdecken Sie unseren Andere Rechner für verschiedene Berechnungen. Der Andere Rechner bietet praktische Online Tools für Alltag und Beruf mit genauen Ergebnissen.",
    keywords: "andere rechner, nützliche tools, verschiedene berechnungen, online rechner, alltag beruf, praktische tools, kostenloser andere rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && othercalculatorsMeta[langHeader as keyof typeof othercalculatorsMeta]
      ? langHeader
      : "en";

  const meta = othercalculatorsMeta[language as keyof typeof othercalculatorsMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCategoryCanonicalUrl('other-calculators', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCategoryCanonicalUrl('other-calculators', 'en'),
        'pt-BR': getCategoryCanonicalUrl('other-calculators', 'br'),
        'pl': getCategoryCanonicalUrl('other-calculators', 'pl'),
        'de': getCategoryCanonicalUrl('other-calculators', 'de'),
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

export default async function OtherCalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
