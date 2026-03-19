import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for finance-calculator
const financecalculatorMeta = {
  en: {
    title: "Finance Calculator – Calculate EMI, Loans & Savings Fast",
    description: "Use our Finance Calculator to quickly calculate EMI, loans, savings, and interest. Free, accurate, and easy-to-use tool for all your financial planning needs.",
    keywords: "finance calculator, comprehensive, tool, various, financial, calculations"
  },
  br: {
    title: "Calculadora Financeira – Juros, Empréstimos, Investimentos",
    description: "Calcule parcelas, juros e investimentos com nossa Calculadora Financeira fácil e rápida. Planeje suas finanças de forma precisa e gratuita online.",
    keywords: "conversor moedas, cotações tempo real, taxas câmbio, converta valores, online moedas, precisão rapidez, mundo finanças"
  },
  pl: {
    title: "Kalkulator Finansowy",
    description: "Skorzystaj z naszego Kalkulatora Finansowego, aby szybko i dokładnie obliczyć kredyty, odsetki, raty i inwestycje online, całkowicie za darmo.",
    keywords: "kalkulator finansowy, kompleksowe, narzędzie, różne, finansowe, obliczenia"
  },
  de: {
    title: "Finanzrechner – Kredite, Zinsen & Investitionen",
    description: "Berechnen Sie Kredite, Zinsen, Raten und Investitionen schnell, präzise und kostenlos mit unserem FinanzRechner online – ideal für Ihre Finanzplanung.",
    keywords: "finanzrechner, Kredite, tool, verschiedene, finanzielle, berechnungen"
  }
,
  es: {
    title: "Calculadora Financiera – Kredite, Zinsen & Investitionen",
    description: "Berechnen Sie Kredite, Zinsen, Raten und Investitionen schnell, präzise und kostenlos mit unserem Finanz-Rechner online – ideal für Ihre Finanzplanung.",
    keywords: "calculadora financiera, gestiona, préstamos, inversiones, intereses, utiliza, nuestra, calcular, planificar, controlar, manera, rápida, eficiente"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && financecalculatorMeta[langHeader as keyof typeof financecalculatorMeta]
      ? langHeader
      : "en";

  const meta = financecalculatorMeta[language as keyof typeof financecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('finance-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('finance-calculator', 'en'),
        'en': getCanonicalUrl('finance-calculator', 'en'),
        'es': getCanonicalUrl('finance-calculator', 'es'),
        'pt-BR': getCanonicalUrl('finance-calculator', 'br'),
        'pl': getCanonicalUrl('finance-calculator', 'pl'),
        'de': getCanonicalUrl('finance-calculator', 'de'),
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

export default async function FinanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
