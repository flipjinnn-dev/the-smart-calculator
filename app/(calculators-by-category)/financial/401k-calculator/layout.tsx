import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for 401k-calculator
const calculator401kMeta = {
  en: {
    title: "401(k) Calculator – Estimate Your Retirement Savings",
    description: "Use our 401(k) calculator to estimate retirement savings, employer match, and growth. Plan your future easily with accurate projections online.",
    keywords: "401k calculator, savings growth, retirement income, contributions tool, online 401k, financial planning, free 401k calculator, estimate income"
  },
  br: {
    title: "Calculadora de Aposentadoria – Projeções de Aposentadoria",
    description: "Use nossa calculadora de aposentadoria para estimar economias e crescimento até a aposentadoria. Simule agora e planeje seu futuro!",
    keywords: "calculadora 401k, crescimento poupança, renda aposentadoria, contribuições tool, online 401k, planejamento financeiro, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Emerytalny – Oblicz Swoje Oszczędności",
    description: "Użyj naszego kalkulatora emerytalnego, aby oszacować oszczędności i dopasowanie pracodawcy. Oblicz teraz i zaplanuj swoją emeryturę!",
    keywords: "kalkulator 401k, wzrost oszczędności, dochód emerytalny, wkłady tool, online 401k, planowanie finansowe, darmowy kalkulator, 401(k) Rechner – Sparwachstum Berechnen | TheSmartCalculator"
  },
  de: {
    title: "Rentenrechner – Berechne Deine Altersvorsorge Einfach",
    description: "Nutze unseren Rentenrechner, um Ersparnisse und Arbeitgeberbeiträge zu schätzen. Jetzt berechnen und Deine Altersvorsorge planen!",
    keywords: "401k rechner, savings growth, retirement income, contributions tool, online 401k, financial planning, kostenlos 401k rechner, estimate income"
  }
,
  es: {
    title: "Calculadora de Jubilación – Planifica tu Retiro Fácil",
    description: "Usa nuestra calculadora de jubilación para estimar ahorros y aportes del empleador. Calcula ahora y asegura tu futuro financiero!",
    keywords: "calculadora, planifica, retiro, fácilmente, nuestra, estimar, ahorros, jubilación, aportes, crecimiento, futuro, financiero, proyecciones, claras, confiables"
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
        'es': getCanonicalUrl('401k-calculator', 'es'),
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
