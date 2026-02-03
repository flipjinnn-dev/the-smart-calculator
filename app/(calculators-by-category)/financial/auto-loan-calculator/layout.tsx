import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for auto-loan-calculator
const autoloancalculatorMeta = {
  en: {
    title: "Auto Loan Calculator Car Payment Estimate",
    description: "Calculate car loan payments, interest, and totals using our Auto Loan Calculator before buying a vehicle.",
    keywords: "auto loan calculator, car payments, total cost, financing tool, online auto, budget calculator, free loan tool, vehicle estimate"
  },
  br: {
    title: "Simulador de financiamento de veículos",
    description: "Use o simulador de financiamento de veículos online grátis para calcular parcelas e juros. Planeje sua compra e simule seu financiamento rapidamente!",
    keywords: "calculadora empréstimo auto, parcelas carro, custo total, ferramenta financiamento, online auto, orçamento calculadora, gratuita tool"
  },
  pl: {
    title: "Kalkulator Kredytu Samochodowego – Rata Online | TheSmartCalculator",
    description: "Użyj kalkulatora kredytu samochodowego online, aby obliczyć raty, odsetki i całkowity koszt auta. Proste, szybkie i darmowe narzędzie finansowe.",
    keywords: "kalkulator kredytu samochodowego, obliczyć raty, odsetki koszt, narzędzie finansowe, online kredyt, proste szybkie, darmowy tool"
  },
  de: {
    title: "Auto Loan Calculator – Payments Cost Online | TheSmartCalculat",
    description: "Mit dem Autokreditrechner ermitteln Sie Ihre monatliche Rate, Gesamtkosten und Laufzeit für Autokredite. Der Autokreditrechner hilft bei Ihrer Fahrzeugfinanzierung online.",
    keywords: "autokreditrechner, finanzierung berechnen, monatliche rate, gesamt kosten, laufzeit tool, fahrzeug online, hilft rechner"
  }
,
  es: {
    title: "Calculadora de Préstamos de Auto – Calcula tu Pago Fácil",
    description: "Calcula tu préstamo de auto al instante y conoce tus pagos mensuales. ¡Ahorra tiempo y planifica tu compra de manera inteligente ahora!",
    keywords: "calculadora, préstamos, auto, calcula, pago, fácil, préstamo, instante, conoce, pagos, mensuales, ahorra, tiempo, planifica, compra"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && autoloancalculatorMeta[langHeader as keyof typeof autoloancalculatorMeta]
      ? langHeader
      : "en";

  const meta = autoloancalculatorMeta[language as keyof typeof autoloancalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('auto-loan-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('auto-loan-calculator', 'en'),
        'en': getCanonicalUrl('auto-loan-calculator', 'en'),
        'es': getCanonicalUrl('auto-loan-calculator', 'es'),
        'pt-BR': getCanonicalUrl('auto-loan-calculator', 'br'),
        'pl': getCanonicalUrl('auto-loan-calculator', 'pl'),
        'de': getCanonicalUrl('auto-loan-calculator', 'de'),
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

export default async function AutoLoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
