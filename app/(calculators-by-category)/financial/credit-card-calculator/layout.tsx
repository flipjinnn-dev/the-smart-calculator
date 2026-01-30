import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for credit-card-calculator
const creditcardcalculatorMeta = {
  en: {
    title: "Credit Card Calculator Payments & Interest Breakdown",
    description: "Calculate payments, balances, and interest accurately using our Credit Card Calculator to manage credit smarter.",
    keywords: "credit card calculator, payments tool, interest charges, payoff timeline, online credit, debt management, free card calculator, budgeting tool"
  },
  br: {
    title: "Calculadora Cartão Crédito – Juros Parcelas Online",
    description: "Use a Calculadora de Cartão de Crédito para simular juros, parcelas e saldo. Entenda quanto vai pagar e organize suas finanças com precisão e detalhes.",
    keywords: "calculadora cartão crédito, simular juros, parcelas saldo, organizar finanças, precisa tool, detalhes calculadora, pagamento entender"
  },
  pl: {
    title: "Kalkulator Karty Kredytowej – Koszty Online | TheSmartCalculator",
    description: "Użyj kalkulatora karty kredytowej online, aby szybko obliczyć koszty, oprocentowanie i limity. Proste, dokładne i darmowe narzędzie finansowe do zarządzania.",
    keywords: "kalkulator karty kredytowej, obliczyć koszty, oprocentowanie limity, narzędzie finansowe, online karta, dokładne darmowe, zarządzanie długiem"
  },
  de: {
    title: "Kreditkartenrechner – Kosten Online Prüfen | TheSmartCalculator",
    description: "Mit dem Kreditkartenrechner vergleichen Sie Gebühren, Umsätze und Zusatzleistungen. Der Kreditkartenrechner zeigt Ihnen die passende Karte ganz einfach online.",
    keywords: "kreditkartenrechner, kosten prüfen, gebühren umsätze, zusatzleistungen tool, online karte, passende rechner, einfach tool"
  }
,
  es: {
    title: "Calculadora de tarjetas de crédito: Controla tu deuda fácil",
    description: "Calcula tus pagos de tarjetas de crédito, conoce intereses y planifica tu deuda. Toma el control de tus finanzas y reduce tu carga financiera hoy mismo.",
    keywords: "calculadora, tarjetas, crédito, controla, deuda, fácil, calcula, pagos, conoce, intereses, planifica, toma, control, finanzas, reduce"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && creditcardcalculatorMeta[langHeader as keyof typeof creditcardcalculatorMeta]
      ? langHeader
      : "en";

  const meta = creditcardcalculatorMeta[language as keyof typeof creditcardcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('credit-card-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('credit-card-calculator', 'en'),
        'en': getCanonicalUrl('credit-card-calculator', 'en'),
        'es': getCanonicalUrl('credit-card-calculator', 'es'),
        'pt-BR': getCanonicalUrl('credit-card-calculator', 'br'),
        'pl': getCanonicalUrl('credit-card-calculator', 'pl'),
        'de': getCanonicalUrl('credit-card-calculator', 'de'),
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

export default async function CreditCardCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
