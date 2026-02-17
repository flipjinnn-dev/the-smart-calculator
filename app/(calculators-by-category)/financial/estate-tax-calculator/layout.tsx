import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for estate-tax-calculator
const estatetaxcalculatorMeta = {
  en: {
    title: "Estate Tax Calculator Online Estate Tax Estimate",
    description: "Estimate estate or inheritance taxes quickly and accurately with our Estate Tax Calculator for smarter tax planning.",
    keywords: "estate tax calculator, taxes planning, inheritance tool, deductions calculation, online estate, financial legacy, free tax tool, estimate taxes"
  },
  br: {
    title: "Calculadora ITCMD | Calcule seu imposto sobre herança",
    description: "Use nossa Calculadora ITCMD para calcular rapidamente o imposto sobre herança no Brasil. Ferramenta gratuita, online e fácil de usar.",
    keywords: "podatek od nieruchomości kalkulator, obliczyć wysokość, narzędzie finansowe, online podatek, proste dokładne, darmowy tool, każdy planowanie"
  },
  pl: {
    title: "Erbschaftsteuer­rechner – Ihre Online-Berechnung für Erbe",
    description: "Mit dem Erbschaftsteuer­rechner ermitteln Sie Steuern, Freibeträge und Abgaben im Erbfall schnell und einfach online — präzise und kostenfrei.",
    keywords: "erbschaftsteuerrechner, steuern berechnen, freibeträge abgaben, erbfall tool, online erbschaft, präzise kostenfrei, planung rechner"
  },
  de: {
    title: "Estate Tax Calculator – Taxes Planning Online | TheSmartCalcul",
    description: "Mit dem Erbschaftsteuer­rechner ermitteln Sie Steuern, Freibeträge und Abgaben im Erbfall schnell und einfach online — präzise und kostenfrei.",
    keywords: "estate tax rechner, taxes planning, inheritance tool, deductions calculation, online estate, financial legacy, kostenlos tax tool, estimate taxes"
  }
,
  es: {
    title: "Calculadora del impuesto sobre el patrimonio: Planifica hoy",
    description: "Calcula tu impuesto sobre el patrimonio fácilmente. Conoce cuánto debes pagar y organiza tus finanzas para optimizar tu planificación fiscal de forma segura.",
    keywords: "calculadora, impuesto, sobre, patrimonio, planifica, calcula, fácilmente, conoce, cuánto, debes, pagar, organiza, finanzas, optimizar, planificación"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && estatetaxcalculatorMeta[langHeader as keyof typeof estatetaxcalculatorMeta]
      ? langHeader
      : "en";

  const meta = estatetaxcalculatorMeta[language as keyof typeof estatetaxcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('estate-tax-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('estate-tax-calculator', 'en'),
        'en': getCanonicalUrl('estate-tax-calculator', 'en'),
        'es': getCanonicalUrl('estate-tax-calculator', 'es'),
        'pt-BR': getCanonicalUrl('estate-tax-calculator', 'br'),
        'pl': getCanonicalUrl('estate-tax-calculator', 'pl'),
        'de': getCanonicalUrl('estate-tax-calculator', 'de'),
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

export default async function EstateTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
