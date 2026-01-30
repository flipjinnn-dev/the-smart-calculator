import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for software
const softwareMeta = {
  en: {
    title: "Software Calculator – Web & IT Development Tools | TheSmartCalculator",
    description: "Use the Software Calculator for web development, programming, and IT infrastructure calculations. Accurate, free online tools for developers, designers, and IT professionals.",
    keywords: "software calculator, web development tool, IT calculator, programming tools, online software, development calculator, free IT tools, code calculator"
  },
  br: {
    title: "Calculadora Software – Ferramentas Web e TI | TheSmartCalculator",
    description: "Use a Calculadora Software para desenvolvimento web, programação e TI. Ferramentas online gratuitas e precisas para desenvolvedores, designers e profissionais de TI.",
    keywords: "calculadora software, desenvolvimento web, ferramentas TI, programação online, calculadora desenvolvimento, profissionais TI, ferramenta gratuita"
  },
  pl: {
    title: "Kalkulator Oprogramowanie – Narzędzia Web i IT | TheSmartCalculator",
    description: "Skorzystaj z kalkulatora oprogramowanie do tworzenia stron, programowania i IT. Dokładne narzędzie online dla programistów, projektantów i specjalistów IT.",
    keywords: "kalkulator oprogramowanie, tworzenie stron, narzędzia IT, programowanie online, kalkulator rozwoju, narzędzie dla programistów, darmowy kalkulator IT"
  },
  de: {
    title: "Software Rechner – Web & IT Entwicklungstools | TheSmartCalculator",
    description: "Nutzen Sie den Software Rechner für Webentwicklung, Programmierung und IT-Infrastruktur. Kostenlose Online-Tools für Entwickler, Designer und IT-Profis.",
    keywords: "software rechner, webentwicklung tool, IT kalkulator, programmierung tools, online software, entwicklungsrechner, kostenlose IT tools"
  },
  es: {
    title: "Calculadora Software – Herramientas Web e IT | TheSmartCalculator",
    description: "Usa la Calculadora Software para desarrollo web, programación e infraestructura IT. Herramientas online gratuitas y precisas para desarrolladores, diseñadores y profesionales IT.",
    keywords: "calculadora software, desarrollo web, herramientas IT, programación online, calculadora desarrollo, profesionales IT, herramienta gratuita"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && softwareMeta[langHeader as keyof typeof softwareMeta]
      ? langHeader
      : "en";

  const meta = softwareMeta[language as keyof typeof softwareMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCategoryCanonicalUrl('software', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCategoryCanonicalUrl('software', 'en'),
        'en': getCategoryCanonicalUrl('software', 'en'),
        'pt-BR': getCategoryCanonicalUrl('software', 'br'),
        'pl': getCategoryCanonicalUrl('software', 'pl'),
        'de': getCategoryCanonicalUrl('software', 'de'),
        'es': getCategoryCanonicalUrl('software', 'es'),
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

export default async function SoftwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
