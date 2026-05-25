import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import { calculatorsMeta } from "@/meta/calculators";
import OrthogonalProjectionCalculatorClient from "./orthogonal-projection-calculator-client";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  const calculatorId = 'orthogonal-projection-calculator';
  const meta = calculatorsMeta[calculatorId]?.[language] || calculatorsMeta[calculatorId]?.['en'];
  const canonicalUrl = getCanonicalUrl(calculatorId, language);

  return {
    title: meta?.title || 'Orthogonal Projection Calculator',
    description: meta?.description || 'Calculate orthogonal projections',
    keywords: meta?.keywords || 'orthogonal, projection, calculator',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl(calculatorId, 'en'),
        'en': getCanonicalUrl(calculatorId, 'en'),
        'pt-BR': getCanonicalUrl(calculatorId, 'br'),
        'pl': getCanonicalUrl(calculatorId, 'pl'),
        'de': getCanonicalUrl(calculatorId, 'de'),
        'es': getCanonicalUrl(calculatorId, 'es'),
      }
    },
    openGraph: {
      title: meta?.title || 'Orthogonal Projection Calculator',
      description: meta?.description || 'Calculate orthogonal projections',
      url: canonicalUrl,
      type: 'website',
      siteName: 'Smart Calculator',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: meta?.title || 'Orthogonal Projection Calculator',
        },
      ],
    }
  };
}

export default async function OrthogonalProjectionCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("orthogonal-projection-calculator", language);
  const guideContent = await loadCalculatorGuideContent("orthogonal-projection-calculator", language);

  return <OrthogonalProjectionCalculatorClient content={content} guideContent={guideContent} />;
}
