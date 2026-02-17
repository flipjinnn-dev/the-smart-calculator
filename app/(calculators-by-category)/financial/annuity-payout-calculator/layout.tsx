import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for annuity-payout-calculator
const annuitypayoutcalculatorMeta = {
  en: {
    title: "Annuity Payout Calculator",
    description: "Estimate monthly or yearly retirement income using our Annuity Payout Calculator for confident financial planning.",
    keywords: "annuity payout calculator, payout amount, principal tool, rates calculation, online payout, annuity planning, free payout tool, income estimator"
  },
  br: {
    title: "Calculadora de Pagamento de Anuidade",
    description: "Calcule facilmente o pagamento de anuidade com nossa calculadora. Descubra valores e parcelas rapidamente. Experimente agora mesmo!",
    keywords: "calculadora pagamento anuidade, valor pagamento, fatores tool, online anuidade, planejamento renda, gratuita calculadora, estimativa pagamento"
  },
  pl: {
    title: "Kalkulator Wypłaty Renty",
    description: "Oblicz wypłatę swojej renty szybko i dokładnie! Skorzystaj z kalkulatora i zaplanuj finanse emerytalne już dziś.",
    keywords: "rentenzahlung rechner, monatliche zahlungen, vorsorgebedarf tool, altersvorsorge, online berechnung, präzise tool, kostenloser rechner"
  },
  de: {
    title: "Kalkulator Wypłaty Renty – Oblicz Online | TheSmartCalculator",
    description: "Użyj kalkulatora wypłaty renty online, aby obliczyć kwoty wypłat na podstawie czynników. Dokładne, darmowe narzędzie do planowania renty i dochodu.",
    keywords: "kalkulator wypłaty renty, obliczyć kwoty, czynniki tool, planowanie renty, online wypłata, dochód estymacja, darmowy tool"
  }
,
  es: {
    title: "Calculadora de pagos de anualidades: Planifica tu futuro hoy",
    description: "Calcula los pagos de tus anualidades fácilmente. Organiza tus ingresos futuros y toma decisiones financieras inteligentes para asegurar tu estabilidad hoy mismo.",
    keywords: "calculadora, pagos, anualidades, planifica, futuro, calcula, fácilmente, organiza, ingresos, futuros, toma, decisiones, financieras, inteligentes, asegurar"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && annuitypayoutcalculatorMeta[langHeader as keyof typeof annuitypayoutcalculatorMeta]
      ? langHeader
      : "en";

  const meta = annuitypayoutcalculatorMeta[language as keyof typeof annuitypayoutcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('annuity-payout-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('annuity-payout-calculator', 'en'),
        'en': getCanonicalUrl('annuity-payout-calculator', 'en'),
        'es': getCanonicalUrl('annuity-payout-calculator', 'es'),
        'pt-BR': getCanonicalUrl('annuity-payout-calculator', 'br'),
        'pl': getCanonicalUrl('annuity-payout-calculator', 'pl'),
        'de': getCanonicalUrl('annuity-payout-calculator', 'de'),
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

export default async function AnnuityPayoutCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
