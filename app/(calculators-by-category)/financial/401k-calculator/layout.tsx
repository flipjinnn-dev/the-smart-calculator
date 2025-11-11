import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for 401k-calculator
const calculator401kMeta = {
  en: {
    title: "401(k) Calculator – Savings Growth Online | TheSmartCalculator",
    description: "Use the 401(k) Calculator to estimate savings growth and retirement income with contributions and rates. Accurate, free online tool for financial planning and projections.",
    keywords: "401k calculator, savings growth, retirement income, contributions tool, online 401k, financial planning, free 401k calculator, estimate income"
  },
  br: {
    title: "Calculadora 401(k) – Crescimento Poupança | TheSmartCalculator",
    description: "Use a Calculadora 401(k) para estimar crescimento de poupança e renda de aposentadoria com contribuições. Ferramenta precisa e gratuita para planejamento financeiro.",
    keywords: "calculadora 401k, crescimento poupança, renda aposentadoria, contribuições tool, online 401k, planejamento financeiro, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator 401(k) – Wzrost Oszczędności Online | TheSmartCalculator",
    description: "Użyj kalkulatora 401(k) online, aby oszacować wzrost oszczędności i dochód emerytalny z wkładami. Dokładne, darmowe narzędzie do planowania finansowego.",
    keywords: "kalkulator 401k, wzrost oszczędności, dochód emerytalny, wkłady tool, online 401k, planowanie finansowe, darmowy kalkulator, 401(k) Rechner – Sparwachstum Berechnen | TheSmartCalculator"
  },
  de: {
    title: "401(k) Calculator – Savings Growth Online | TheSmartCalculator",
    description: "kostenloses Online-Tool für Finanzplanung und Prognosen., 401k rechner, sparwachstum berechnen, renteneinkommen, beiträge tool, online 401k, finanzplanung, kostenloser rechner",
    keywords: "401k rechner, savings growth, retirement income, contributions tool, online 401k, financial planning, kostenlos 401k rechner, estimate income"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && calculator401kMeta[langHeader as keyof typeof calculator401kMeta]
      ? langHeader
      : "en";

  const meta = calculator401kMeta[language as keyof typeof calculator401kMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('401k-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('401k-calculator', 'en'),
        'pt-BR': getCanonicalUrl('401k-calculator', 'br'),
        'pl': getCanonicalUrl('401k-calculator', 'pl'),
        'de': getCanonicalUrl('401k-calculator', 'de'),
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

export default async function Calculator401kLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
