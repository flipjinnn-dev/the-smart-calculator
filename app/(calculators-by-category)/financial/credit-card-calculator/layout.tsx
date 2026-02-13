import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for credit-card-calculator
const creditcardcalculatorMeta = {
  en: {
    title: "Credit Card Calculator",
    description: "Calculate payments, balances, and interest accurately using our Credit Card Calculator to manage credit smarter.",
    keywords: "credit card calculator, payments tool, interest charges, payoff timeline, online credit, debt management, free card calculator, budgeting tool"
  },
  br: {
    title: "Simulador de Cartão de Crédito",
    description: "Use o simulador de cartão de crédito para calcular juros, parcelas e saldo rapidamente. Planeje melhor seus gastos e simule agora mesmo!",
    keywords: "Simulador de Cartão de crédito, simular juros, parcelas saldo, organizar finanças, precisa tool, detalhes calculadora, pagamento entender"
  },
  pl: {
    title: "Kalkulator Karty Kredytowej",
    description: "Kalkulator Karty Kredytowej – oblicz odsetki, minimalną spłatę i całkowity koszt zadłużenia. Sprawdź i kontroluj finanse już dziś!",
    keywords: "kalkulator karty kredytowej, obliczyć koszty, oprocentowanie limity, narzędzie finansowe, online karta, dokładne darmowe, zarządzanie długiem"
  },
  de: {
    title: "Kreditkartenrechner",
    description: "Mit dem Kreditkartenrechner vergleichen Sie Gebühren, Umsätze und Zusatzleistungen. Der Kreditkartenrechner zeigt Ihnen die passende Karte ganz einfach online.",
    keywords: "Kreditkartenrechner, kosten prüfen, gebühren umsätze, zusatzleistungen tool, online karte, passende rechner, einfach tool"
  }
,
  es: {
    title: "Calculadoras para tarjetas de crédito",
    description: "Calculadora de Tarjeta de Crédito: calcula intereses, pago mínimo y deuda total al instante. Controla tus finanzas y ahorra hoy mismo.",
    keywords: "Calculadoras para tarjetas de crédito, controla, deuda, fácil, calcula, pagos, conoce, intereses, planifica, toma, control, finanzas, reduce"
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
