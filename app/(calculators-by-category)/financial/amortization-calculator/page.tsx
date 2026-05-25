import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import { calculatorsMeta } from "@/meta/calculators";
import { withSelfReferencingHreflang } from "@/lib/seo-hreflang";
import AmortizationCalculatorClient from "./amortization-calculator-client";

const CALCULATOR_ID = "amortization-calculator";

function amortizationAlternateLanguages(): Record<string, string> {
  return {
    "x-default": getCanonicalUrl(CALCULATOR_ID, "en"),
    en: getCanonicalUrl(CALCULATOR_ID, "en"),
    "pt-BR": getCanonicalUrl(CALCULATOR_ID, "br"),
    pl: getCanonicalUrl(CALCULATOR_ID, "pl"),
    de: getCanonicalUrl(CALCULATOR_ID, "de"),
    es: getCanonicalUrl(CALCULATOR_ID, "es"),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const pathname =
    headersList.get("x-pathname") || "/financial/amortization-calculator";
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  /** Meta slugs keep canonical aligned with localized URLs (not mixed paths like /de/financial/...). */
  const canonicalUrl = getCanonicalUrl(CALCULATOR_ID, language);

  const meta =
    calculatorsMeta[CALCULATOR_ID]?.[language] || calculatorsMeta[CALCULATOR_ID]?.en;

  return {
    title: meta?.title || "Amortization Calculator",
    description: meta?.description || "Generate detailed amortization schedules for loans",
    keywords: meta?.keywords || "amortization, calculator, loan schedule",
    alternates: {
      canonical: canonicalUrl,
      languages: withSelfReferencingHreflang(
        amortizationAlternateLanguages(),
        canonicalUrl,
        path
      ),
    },
    openGraph: {
      title: meta?.title || "Amortization Calculator",
      description: meta?.description || "Generate detailed amortization schedules for loans",
      url: canonicalUrl,
      type: "website",
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta?.title || "Amortization Calculator",
        },
      ],
    },
  };
}

export default async function AmortizationCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("amortization-calculator", language);
  const guideContent = await loadCalculatorGuideContent("amortization-calculator", language);

  return <AmortizationCalculatorClient content={content} guideContent={guideContent} />;
}
