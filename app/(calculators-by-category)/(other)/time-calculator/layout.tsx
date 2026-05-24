import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import {
  loadCalculatorSeo,
  buildMetadataFromSeo,
} from "@/lib/calculator-seo";
import { getCanonicalUrl } from "@/lib/url-utils";

const CALCULATOR_ID = "time-calculator";

const fallbackMeta = {
  en: {
    title: "Time Calculator – Add, Subtract & Track Hours Fast",
    description:
      "Use our free time calculator to add hours and minutes, calculate work hours, find time between two times, convert to decimal, and track payroll easily.",
    keywords:
      "time calculator, add hours and minutes, subtract time, work hours calculator, time between two times, decimal time converter, payroll hours calculator, track hours, free time calculator",
  },
  br: {
    title: "Calculadora de Tempo",
    description:
      "Use a calculadora de tempo para calcular intervalos e durações facilmente. Planeje suas atividades e organize seu tempo de forma rápida agora mesmo!",
    keywords:
      "calculadora de tempo, medir duração, datas horários, ferramenta tempo online, planejamento estudos, projetos calculadora, precisa tempo",
  },
  pl: {
    title: "Kalkulator Czasu – Upływ Czasu Online | TheSmartCalculator",
    description:
      "Użyj kalkulatora czasu online, aby obliczyć różnicę między datami i godzinami. Proste, szybkie i darmowe narzędzie do planowania i obliczeń czasowych.",
    keywords:
      "kalkulator czasu, obliczyć różnicę, daty godziny, narzędzie czasu online, planowanie obliczenia, darmowy kalkulator, szybkie narzędzie",
  },
  de: {
    title: "Zeitrechner – Zeitspannen Berechnen Online | TheSmartCalculator",
    description:
      "Berechne mit dem Zeitrechner Zeitspannen, Additionen & Differenzen. Schnell, genau & kostenlos – ideal für Arbeit, Projekte & Alltag in Planung.",
    keywords:
      "zeitrechner, zeitspannen berechnen, additionen differenzen, online rechner, arbeit projekte, alltag tool, kostenloser zeitrechner",
  },
  es: {
    title: "Calculadora de Tiempo – Calcula Duraciones Rápida y Fácil",
    description:
      "Calcula tiempos y duraciones al instante con nuestra herramienta precisa. ¡Ahorra tiempo y organiza tus actividades de manera eficiente ahora mismo!",
    keywords:
      "calculadora, tiempo, calcula, duraciones, rápida, fácil, tiempos, instante, nuestra, herramienta, precisa, ahorra, organiza, actividades, manera",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get("x-language");
  const language =
    langHeader && fallbackMeta[langHeader as keyof typeof fallbackMeta]
      ? langHeader
      : "en";

  if (language === "en") {
    const seo = await loadCalculatorSeo(CALCULATOR_ID, "en");
    if (seo) {
      return buildMetadataFromSeo(CALCULATOR_ID, language, seo);
    }
  }

  const meta = fallbackMeta[language as keyof typeof fallbackMeta];
  const canonicalUrl = getCanonicalUrl(CALCULATOR_ID, language);

  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": getCanonicalUrl(CALCULATOR_ID, "en"),
        en: getCanonicalUrl(CALCULATOR_ID, "en"),
        es: getCanonicalUrl(CALCULATOR_ID, "es"),
        "pt-BR": getCanonicalUrl(CALCULATOR_ID, "br"),
        pl: getCanonicalUrl(CALCULATOR_ID, "pl"),
        de: getCanonicalUrl(CALCULATOR_ID, "de"),
      },
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

export default async function TimeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await loadCalculatorSeo(CALCULATOR_ID, "en");
  const jsonLdSchema = seo?.schema ?? null;

  return (
    <>
      {jsonLdSchema ? (
        <Script
          id="time-calculator-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
          strategy="afterInteractive"
        />
      ) : null}
      {children}
    </>
  );
}
