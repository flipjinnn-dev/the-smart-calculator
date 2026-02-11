import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for amortization-calculator
const amortizationcalculatorMeta = {
  en: {
    title: "Amortization Calculator",
    description: "Use our Amortization Calculator to plan loans, see monthly payments, total interest, and full amortization schedule. Calculate your loan now!",
    keywords: "amortization calculator, loan schedules, payment details, interest calculation, online amortization, debt tool, free loan calculator, balance tracker"
  },
  br: {
    title: "Calculadora de Amortização",
    description: "Use nossa calculadora de amortização para calcular parcelas de empréstimos e simular seu pagamento de forma rápida e prática.",
    keywords: "calculadora de amortização, calcular parcelas, juros saldo, planejamento financiamentos, online amortização, precisa tool, detalhada calculadora"
  },
  pl: {
    title: "Kalkulator Amortyzacji",
    description: "Skorzystaj z kalkulatora amortyzacji, aby obliczyć raty kredytu i harmonogram spłat szybko i dokładnie.",
    keywords: "kalkulator amortyzacji, obliczyć koszt, wartość trwałego, narzędzie finansowe, firmy planowanie, darmowy kalkulator, dokładne obliczenia"
  },
  de: {
    title: "Tilgungsrechner",
    description: "Berechnen Sie mit dem Tilgungsrechner Ihre Kreditraten und planen Sie die Rückzahlung einfach und genau online.",
    keywords: "tilgungsrechner, darlehen berechnen, monatliche rate, laufzeit restsuld, online rückzahlung, transparent planung, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora de Amortización",
    description: "Calcula las cuotas de tu préstamo con nuestra calculadora de amortización y organiza tu plan de pagos de manera sencilla y precisa.",
    keywords: "calculadora de amortización, calcula, pagos, fácilmente, instante, conoce, mensuales, planifica, préstamo, forma, sencilla, toma, decisiones, financieras"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && amortizationcalculatorMeta[langHeader as keyof typeof amortizationcalculatorMeta]
      ? langHeader
      : "en";

  const meta = amortizationcalculatorMeta[language as keyof typeof amortizationcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('amortization-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('amortization-calculator', 'en'),
        'en': getCanonicalUrl('amortization-calculator', 'en'),
        'es': getCanonicalUrl('amortization-calculator', 'es'),
        'pt-BR': getCanonicalUrl('amortization-calculator', 'br'),
        'pl': getCanonicalUrl('amortization-calculator', 'pl'),
        'de': getCanonicalUrl('amortization-calculator', 'de'),
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

export default async function AmortizationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
