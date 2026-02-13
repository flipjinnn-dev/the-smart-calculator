import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for debt-payoff-calculator
const debtpayoffcalculatorMeta = {
  en: {
    title: "Debt Payoff Calculator",
    description: "See how long it takes to clear debt, reduce interest, and plan payments effectively using our Debt Payoff Calculator.",
    keywords: "debt payoff calculator, debt free plan, time estimate, online debt, financial management, reduction tool, free payoff calculator, strategy planning"
  },
  br: {
    title: "Calculadora de Quitação de Dívidas Planeje Suas Dívidas",
    description: "Use nossa calculadora de quitação de dívidas para ver parcelas, juros e prazo de pagamento. Calcule agora e organize suas dívidas!",
    keywords: "calculadora quitação dívida, plano dívida, tempo estimar, online dívida, gestão financeira, estratégias redução, gratuita tool"
  },
  pl: {
    title: "Kalkulator spłaty zadłużenia",
    description: "Kalkulator spłaty zadłużenia – oblicz raty, odsetki i czas spłaty długu. Sprawdź koszty i zaplanuj wyjście z zadłużenia już dziś!",
    keywords: "Kalkulator spłaty zadłużenia, plan dług, czas oszacować, online dług, zarządzanie finansami, redukcja tool, darmowy kalkulator"
  },
  de: {
    title: "Schuldenrückzahlungsrechner",
    description: "Schuldenrückzahlungsrechner – berechnen Sie Raten, Zinsen und Tilgungsdauer einfach online. Jetzt Schulden planen und schneller abbauen!",
    keywords: "Schuldenrückzahlungsrechner, finanzierung berechnen, monatsrate zinssatz, restsuld tool, immobilien online, präzise tools, ideal rechner"
  }
,
  es: {
    title: "Calculadora de pago de deudas",
    description: "CCalculadora de pago de deuda: calcula cuotas, intereses y tiempo de pago fácilmente. Organiza tus finanzas y elimina deudas hoy mismo.",
    keywords: "Calculadora de pago de deuda, organiza, finanzas, calcula, pagos, fácilmente, planifica, amortizaciones, conoce, intereses, lograr, libertad, financiera"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && debtpayoffcalculatorMeta[langHeader as keyof typeof debtpayoffcalculatorMeta]
      ? langHeader
      : "en";

  const meta = debtpayoffcalculatorMeta[language as keyof typeof debtpayoffcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('debt-payoff-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('debt-payoff-calculator', 'en'),
        'en': getCanonicalUrl('debt-payoff-calculator', 'en'),
        'es': getCanonicalUrl('debt-payoff-calculator', 'es'),
        'pt-BR': getCanonicalUrl('debt-payoff-calculator', 'br'),
        'pl': getCanonicalUrl('debt-payoff-calculator', 'pl'),
        'de': getCanonicalUrl('debt-payoff-calculator', 'de'),
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

export default async function DebtPayoffCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
