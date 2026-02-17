import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for mortgage-calculator
const mortgagecalculatorMeta = {
  en: {
    title: "Mortgage Calculator",
    description: "Estimate monthly payments, total interest, and full amortization schedule with our Mortgage Calculator to plan your home loan confidently.",
    keywords: "mortgage calculator, monthly payments, total interest, amortization schedule, online mortgage, home financing, free mortgage tool, interest calculation"
  },
  br: {
    title: "Simulador de financiamento imobiliário",
    description: "Use nossa simulador de financiamento imobiliário e descubra seu valor mensal em segundos. Clique agora e planeje seu futuro financeiro com precisão!",
    keywords: "simulador hipoteca, pagamentos mensais, interesse total, cronograma amortização, online hipoteca, financiamento casa, gratuita ferramenta hipoteca, cálculo interesse"
  },
  pl: {
    title: "Kalkulator Kredytu Hipotecznego – Oblicz Ratę Online",
    description: "Użyj kalkulatora kredytu hipotecznego online, aby obliczyć raty, odsetki i całkowity koszt kredytu. Szybkie, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator kredytu hipotecznego, raty miesięczne, całkowite odsetki, harmonogram amortyzacji, online hipoteczny, finansowanie domu, darmowe narzędzie hipoteczne, obliczenia odsetek"
  },
  de: {
    title: "Hypothekenrechner – Online Baufinanzierung und Immobilienkredit",
    description: "Mit dem Hypothekenrechner ermitteln Sie Ihre Monatsrate, Zinssatz und Restschuld – ideal für Ihre Immobilienfinanzierung mit präzisen Online-Tools.",
    keywords: "hypothekenrechner, monatliche zahlungen, gesamt zinsen, amortisationsplan, online hypothek, hausfinanzierung, kostenloser hypothek tool, zins berechnung"
  }
,
  es: {
    title: "Simulador de Hipoteca – Calcula tu Hipoteca y Préstamo con Tasa de Interés",
    description: "Utiliza nuestro simulador de hipoteca para calcular tu préstamo hipotecario, conocer la tasa de interés y planificar tus pagos de manera rápida y precisa.",
    keywords: "simulador, hipoteca, calcula, préstamo, tasa, interés, utiliza, nuestro, calcular, hipotecario, conocer, planificar, pagos, manera, rápida"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && mortgagecalculatorMeta[langHeader as keyof typeof mortgagecalculatorMeta]
      ? langHeader
      : "en";

  const meta = mortgagecalculatorMeta[language as keyof typeof mortgagecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('mortgage-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('mortgage-calculator', 'en'),
        'en': getCanonicalUrl('mortgage-calculator', 'en'),
        'es': getCanonicalUrl('mortgage-calculator', 'es'),
        'pt-BR': getCanonicalUrl('mortgage-calculator', 'br'),
        'pl': getCanonicalUrl('mortgage-calculator', 'pl'),
        'de': getCanonicalUrl('mortgage-calculator', 'de'),
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

export default async function MortgageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
