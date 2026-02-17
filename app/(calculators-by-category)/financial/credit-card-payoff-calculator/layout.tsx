import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for credit-card-payoff-calculator
const creditcardpayoffcalculatorMeta = {
  en: {
    title: "Credit Card Payoff Calculator",
    description: "Plan faster debt reduction and save on interest using our Credit Card Payoff Calculator with clear payoff timelines.",
    keywords: "credit card payoff calculator, debt timeline, interest savings, online payoff, debt reduction, financial planning, free payoff tool, time calculation"
  },
  br: {
    title: "calculadora de pagamento de cartão de crédito",
    description: "Calculadora de Pagamento de Cartão de Crédito: calcule juros, parcela mínima e valor total da dívida. Simule agora e organize suas finanças!",
    keywords: "calculadora de pagamento de cartão de crédito, calcular juros, parcelas saldo, planejamento finanças, online simulador, rapidez precisão, redução dívida"
  },
  pl: {
    title: "Kalkulator spłaty karty kredytowej",
    description: "Kalkulator Spłaty Karty Kredytowej – oblicz ratę, odsetki i czas spłaty zadłużenia. Sprawdź koszty i uporządkuj finanse już dziś!",
    keywords: "Kalkulator spłaty karty kredytowej, obliczyć raty, odsetki czas, narzędzie finansowe, online spłata, szybkie dokładne, darmowy tool"
  },
  de: {
    title: "Kreditkarte abbezahlen Rechner",
    description: "Kreditkarte abbezahlen leicht gemacht – berechne Raten, Zinsen und Tilgungsdauer schnell online. Jetzt Finanzen planen und sparen!",
    keywords: "Kreditkarte abbezahlen, rückzahlung berechnen, laufzeit restsuld, darlehen tool, online rechner, präzise nutzen, baufinanzierung"
  }
,
  es: {
    title: "Calculadora de pago de tarjeta de crédito",
    description: "Calcula pagos de tu tarjeta de crédito fácil y rápido. Usa nuestra calculadora online y controla tus finanzas hoy mismo. ¡Prueba ahora!",
    keywords: "Calculadora de pago de tarjeta de crédito, reduce, deuda, rápido, calcula, pagos, crédito, planifica, forma, rápida, reducir, toma, control"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && creditcardpayoffcalculatorMeta[langHeader as keyof typeof creditcardpayoffcalculatorMeta]
      ? langHeader
      : "en";

  const meta = creditcardpayoffcalculatorMeta[language as keyof typeof creditcardpayoffcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('credit-card-payoff-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('credit-card-payoff-calculator', 'en'),
        'en': getCanonicalUrl('credit-card-payoff-calculator', 'en'),
        'es': getCanonicalUrl('credit-card-payoff-calculator', 'es'),
        'pt-BR': getCanonicalUrl('credit-card-payoff-calculator', 'br'),
        'pl': getCanonicalUrl('credit-card-payoff-calculator', 'pl'),
        'de': getCanonicalUrl('credit-card-payoff-calculator', 'de'),
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

export default async function CreditCardPayoffCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
