import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for estate-tax-calculator
const estatetaxcalculatorMeta = {
  en: {
    title: "Estate Tax Calculator Online",
    description: "Calculate your estate tax instantly with our free Estate Tax Calculator. Estimate inheritance tax, assets value, deductions, and total estate tax liability online.",
    keywords: "estate tax calculator, taxes planning, inheritance tool, deductions calculation, online estate, financial legacy, free tax tool, estimate taxes"
  },
  br: {
    title: "Calculadora de Herança",
    description: "Use nossa Calculadora de Herança para estimar o imposto sobre herança no Brasil. Calcule valores, bens e veja rapidamente quanto imposto pode pagar.",
    keywords: "Calculadora de Herança, Calculadora ITCMD , narzędzie finansowe, online podatek, proste dokładne, darmowy tool, każdy planowanie"
  },
  pl: {
    title: "Kalkulator podatku od nieruchomości",
    description: "Skorzystaj z narzędzia Podatek od nieruchomości kalkulator, aby szybko obliczyć podatek od domu, mieszkania lub działki w Polsce online.",
    keywords: "Kalkulator podatku od nieruchomości, steuern berechnen, freibeträge abgaben, erbfall tool, online erbschaft, präzise kostenfrei, planung rechner"
  },
  de: {
    title: "Erbschaftssteuerrechner",
    description: "Mit unserem Erbschaftssteuerrechner können Sie schnell die Erbschaftsteuer in Deutschland berechnen. Werte, Vermögen und Freibeträge online ermitteln.",
    keywords: "Erbschaftssteuerrechner, taxes planning, inheritance tool, deductions calculation, online estate, financial legacy, kostenlos tax tool, estimate taxes"
  }
,
  es: {
    title: "Calculadora Impuesto Patrimonio",
    description: "Usa nuestra Calculadora Impuesto Patrimonio para estimar rápidamente tu impuesto sobre el patrimonio en España. Calcula bienes, valores y obligaciones online.",
    keywords: "Calculadora Impuesto Patrimonio, impuesto, sobre, patrimonio, planifica, calcula, fácilmente, conoce, cuánto, debes, pagar, organiza, finanzas, optimizar, planificación"
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
