import { Metadata } from "next";
import { headers } from "next/headers";
import { calculatorsMeta } from "@/meta/calculators";
import { getCanonicalUrl } from "@/lib/url-utils";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  const calculatorId = 'empirical-rule-calculator';
  
  const meta = calculatorsMeta[calculatorId]?.[language] || calculatorsMeta[calculatorId]?.['en'] || {
    title: 'Empirical Rule Calculator',
    description: 'Calculate data ranges using the 68-95-99.7 rule for normal distributions.',
  };

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('empirical-rule-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('empirical-rule-calculator', 'en'),
        'en': getCanonicalUrl('empirical-rule-calculator', 'en'),
        'es': getCanonicalUrl('empirical-rule-calculator', 'es'),
        'pt-BR': getCanonicalUrl('empirical-rule-calculator', 'br'),
        'pl': getCanonicalUrl('empirical-rule-calculator', 'pl'),
        'de': getCanonicalUrl('empirical-rule-calculator', 'de'),
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

export default function EmpiricalRuleCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
