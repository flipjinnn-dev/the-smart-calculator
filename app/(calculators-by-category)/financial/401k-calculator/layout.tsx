import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for 401k-calculator
const calculator401kMeta = {
  en: {
    title: "401k Calculator",
    description: "Use our 401k calculator to estimate retirement savings, employer match, and growth. Plan your future easily with accurate projections online.",
    keywords: "401k calculator, savings growth, retirement income, contributions tool, online 401k, financial planning, free 401k calculator, estimate income"
  },
  br: {
    title: "Calculadora aposentadoria",
    description: "Use nossa calculadora aposentadoria 401(k) para planejar suas economias e projetar seu futuro financeiro com precisão e facilidade.",
    keywords: "calculadora aposentadoria, crescimento poupança, renda aposentadoria, contribuições tool, online 401k, planejamento financeiro, gratuita calculadora"
  },
  pl: {
    title: "401k Kalkulator",
    description: "Skorzystaj z kalkulatora emerytalnego 401(k), aby obliczyć oszczędności na emeryturę i zaplanować finansową przyszłość krok po kroku.",
    keywords: "kalkulator 401k, wzrost oszczędności, dochód emerytalny, wkłady tool, online 401k, planowanie finansowe, darmowy kalkulator, 401(k) Rechner – Sparwachstum Berechnen | TheSmartCalculator"
  },
  de: {
    title: " Rentenrechner",
    description: "Planen Sie Ihre Altersvorsorge mit dem 401(k) Rentenrechner. Berechnen Sie Ersparnisse und sichern Sie Ihre finanzielle Zukunft einfach.",
    keywords: "401k rechner, savings growth, retirement income, contributions tool, online 401k, financial planning, kostenlos 401k rechner, estimate income"
  }
,
  es: {
    title: "calculadora de jubilación",
    description: "Calcula tu ahorro para la jubilación con nuestra calculadora de 401(k). Proyecta tu futuro financiero de manera fácil y precisa.",
    keywords: "calculadora de jubilación, retiro, fácilmente, nuestra, estimar, ahorros, jubilación, aportes, crecimiento, futuro, financiero, proyecciones, claras, confiables"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && calculator401kMeta[langHeader as keyof typeof calculator401kMeta]
      ? langHeader
      : "en";

  const meta = calculator401kMeta[language as keyof typeof calculator401kMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('401k-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('401k-calculator', 'en'),
        'en': getCanonicalUrl('401k-calculator', 'en'),
        'es': getCanonicalUrl('401k-calculator', 'es'),
        'pt-BR': getCanonicalUrl('401k-calculator', 'br'),
        'pl': getCanonicalUrl('401k-calculator', 'pl'),
        'de': getCanonicalUrl('401k-calculator', 'de'),
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

export default async function Calculator401kLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
