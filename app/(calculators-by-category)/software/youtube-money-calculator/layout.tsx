import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for youtube-money-calculator
const youtubemoneycalculatorMeta = {
  en: {
    title: "YouTube Money Calculator 2026 – Free YouTube Earnings Estimator",
    description: "Estimate YouTube earnings with RPM, views, CPM & sponsorship. Get daily, monthly & yearly revenue in 2026 with our free calculator.",
    keywords: "youtube money calculator, youtube earnings calculator, youtube revenue calculator, youtube income estimator, how much money youtube pays, youtube cpm calculator, youtube rpm calculator, youtube sponsorship calculator, youtube ad revenue calculator 2026"
  },
  br: {
    title: "Calculadora de Dinheiro do YouTube 2026 – Estimador de Ganhos Grátis",
    description: "Estime os ganhos do YouTube com RPM, visualizações, CPM e patrocínio. Obtenha receita diária, mensal e anual em 2026 com nossa calculadora gratuita.",
    keywords: "calculadora de dinheiro youtube, calculadora de ganhos youtube, calculadora de receita youtube, estimador de renda youtube, quanto o youtube paga, calculadora cpm youtube, calculadora rpm youtube, calculadora de patrocínio youtube"
  },
  pl: {
    title: "Kalkulator Zarobków YouTube 2026 – Darmowy Estymator Przychodów",
    description: "Oszacuj zarobki YouTube za pomocą RPM, wyświetleń, CPM i sponsoringu. Uzyskaj przychody dzienne, miesięczne i roczne w 2026 roku za pomocą naszego bezpłatnego kalkulatora.",
    keywords: "kalkulator zarobków youtube, kalkulator przychodów youtube, estymator dochodów youtube, ile płaci youtube, kalkulator cpm youtube, kalkulator rpm youtube, kalkulator sponsoringu youtube"
  },
  de: {
    title: "YouTube Geld Rechner 2026 – Kostenloser Einnahmen-Schätzer",
    description: "Schätzen Sie YouTube-Einnahmen mit RPM, Aufrufen, CPM und Sponsoring. Erhalten Sie tägliche, monatliche und jährliche Einnahmen 2026 mit unserem kostenlosen Rechner.",
    keywords: "youtube geld rechner, youtube einnahmen rechner, youtube umsatz rechner, youtube einkommensrechner, wie viel zahlt youtube, youtube cpm rechner, youtube rpm rechner, youtube sponsoring rechner"
  },
  es: {
    title: "Calculadora de Dinero de YouTube 2026 – Estimador de Ganancias Gratis",
    description: "Estime las ganancias de YouTube con RPM, vistas, CPM y patrocinio. Obtenga ingresos diarios, mensuales y anuales en 2026 con nuestra calculadora gratuita.",
    keywords: "calculadora de dinero youtube, calculadora de ganancias youtube, calculadora de ingresos youtube, estimador de ingresos youtube, cuanto paga youtube, calculadora cpm youtube, calculadora rpm youtube, calculadora de patrocinio youtube"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && youtubemoneycalculatorMeta[langHeader as keyof typeof youtubemoneycalculatorMeta]
      ? langHeader
      : "en";

  const meta = youtubemoneycalculatorMeta[language as keyof typeof youtubemoneycalculatorMeta];
  
  const canonicalUrl = getCanonicalUrl('youtube-money-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('youtube-money-calculator', 'en'),
        'en': getCanonicalUrl('youtube-money-calculator', 'en'),
        'es': getCanonicalUrl('youtube-money-calculator', 'es'),
        'pt-BR': getCanonicalUrl('youtube-money-calculator', 'br'),
        'pl': getCanonicalUrl('youtube-money-calculator', 'pl'),
        'de': getCanonicalUrl('youtube-money-calculator', 'de'),
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

export default async function YouTubeMoneyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
