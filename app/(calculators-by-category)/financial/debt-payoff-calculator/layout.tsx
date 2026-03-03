import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

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
    title: "Kalkulator spłat zadłużenia – kompletny przewodnik",
    description: "Kalkulator spłat zadłużenia to narzędzie finansowe, które pozwala dokładnie zaplanować i obliczyć raty kredytu, pożyczki czy zobowiązań finansowych. Dzięki niemu można stworzyć harmonogram spłat kredytu, uwzględnić nadpłaty i obliczyć całkowity koszt kredytu.",
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
    title: {
      absolute: meta.title,
    },
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
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language = langHeader || 'en';

  // Only add schema for Polish version
  const jsonLdSchema = language === 'pl' ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Kalkulator spłat zadłużenia",
        "description": "Kalkulator spłat zadłużenia to narzędzie finansowe, które pozwala dokładnie zaplanować i obliczyć raty kredytu, pożyczki czy zobowiązań finansowych. Dzięki niemu można stworzyć harmonogram spłat kredytu, uwzględnić nadpłaty i obliczyć całkowity koszt kredytu. Narzędzie jest przydatne zarówno dla osób indywidualnych, jak i przedsiębiorców, pomagając świadomie zarządzać finansami, redukować długi i planować spłatę zobowiązań.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "softwareVersion": "5.2.1",
        "url": "https://www.thesmartcalculator.com/pl/finansowy/kalkulator-dlugu-splaty-kalkulador",
        "image": "https://cdn.sanity.io/images/f0wclefz/production/237b4add8e6cdfc2a0bd1d48d42ce6aebd994b49-1113x1292.png",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "ratingCount": "3000",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "Neo Nicholas"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Jak obliczyć spłatę kredytu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Najłatwiej użyć kalkulatora spłaty, który uwzględnia kwotę kredytu, oprocentowanie i okres spłaty"
            }
          },
          {
            "@type": "Question",
            "name": "Czy kalkulator nadpłaty kredytu hipotecznego jest darmowy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tak, wiele kalkulatorów online jest bezpłatnych i dostępnych dla każdego."
            }
          },
          {
            "@type": "Question",
            "name": "Czy mogę zrobić harmonogram spłat kredytu kalkulator online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tak, większość kalkulatorów generuje pełny harmonogram spłat z podziałem na raty kapitałowe i odsetkowe."
            }
          },
          {
            "@type": "Question",
            "name": "Jak wyjść z długów kalkulator może pomóc?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pozwala zobaczyć realne scenariusze spłaty zadłużenia, konsolidacji i nadpłat, co ułatwia planowanie i unikanie pułapek finansowych."
            }
          }
        ]
      }
    ]
  } : null;

  return <>
    {children}
    {jsonLdSchema && (
      <Script
        id="debt-payoff-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    )}
  </>;
}
