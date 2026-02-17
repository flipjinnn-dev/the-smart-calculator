import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for annuity-calculator
const annuitycalculatorMeta = {
  en: {
    title: "Annuity Calculator",
    description: "Plan retirement income and estimate annuity returns easily with our Annuity Calculator for long-term security.",
    keywords: "annuity calculator, future value, contributions tool, interest rates, online annuity, retirement planning, free annuity tool, investment calculator"
  },
  br: {
    title: "Calculadora de Anualidades",
    description: "Use nossa calculadora de anualidades para simular pagamentos periódicos e planejar sua renda futura de forma rápida e prática.",
    keywords: "calculadora de anualidades, valor futuro, contribuições regulares, taxas juros, online anuidade, planejamento aposentadoria, gratuita tool"
  },
  pl: {
    title: "Kalkulator Renty",
    description: "Skorzystaj z kalkulatora renty, aby obliczyć przyszłe świadczenia emerytalne i zaplanować stabilny dochód w prosty sposób.",
    keywords: "kalkulator renty, obliczyć wysokość, raty okres, narzędzie finansowe, online renta, dokładne obliczenia, darmowy kalkulator"
  },
  de: {
    title: "Annuitätenrechner",
    description: "Berechnen Sie Ihre Leibrenten mit dem Annuitätenrechner und planen Sie zukünftige Zahlungen einfach und zuverlässig online.",
    keywords: "rentenrechner, altersrente berechnen, rentenpunkte tool, vorsorgelücke, online renten, vorsorge planung, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora de Anualidad",
    description: "Calcula pagos periódicos con nuestra calculadora de anualidad y planifica tu ingreso futuro de forma sencilla y precisa.",
    keywords: "calculadora, anualidad, planifica, pagos, ahorros, calcula, fácilmente, organiza, finanzas, proyecta, ingresos, toma, decisiones, inteligentes, asegurar"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && annuitycalculatorMeta[langHeader as keyof typeof annuitycalculatorMeta]
      ? langHeader
      : "en";

  const meta = annuitycalculatorMeta[language as keyof typeof annuitycalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('annuity-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('annuity-calculator', 'en'),
        'en': getCanonicalUrl('annuity-calculator', 'en'),
        'es': getCanonicalUrl('annuity-calculator', 'es'),
        'pt-BR': getCanonicalUrl('annuity-calculator', 'br'),
        'pl': getCanonicalUrl('annuity-calculator', 'pl'),
        'de': getCanonicalUrl('annuity-calculator', 'de'),
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

export default async function AnnuityCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
