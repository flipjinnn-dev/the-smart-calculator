import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  generateStaticPageMetadata,
  languageFromStaticPathname,
} from "@/lib/static-page-seo";

type Language = "en" | "br" | "pl" | "de" | "es";

const aboutMeta: Record<Language, { title: string; description: string; keywords: string }> = {
  en: {
    title: "About Us – TheSmartCalculator",
    description: "Learn about TheSmartCalculator: our mission, team, and how we build useful online calculators.",
    keywords: "about, team, mission, TheSmartCalculator"
  },
  br: {
    title: "Sobre Nós – TheSmartCalculator",
    description: "Conheça o TheSmartCalculator: nossa missão, equipe e como criamos calculadoras online úteis.",
    keywords: "sobre, equipe, missão, TheSmartCalculator"
  },
  pl: {
    title: "O nas – TheSmartCalculator",
    description: "Dowiedz się więcej o TheSmartCalculator: nasza misja, zespół i tworzenie przydatnych kalkulatorów online.",
    keywords: "o nas, zespół, misja, TheSmartCalculator"
  },
  de: {
    title: "Über Uns – TheSmartCalculator",
    description: "Erfahren Sie mehr über TheSmartCalculator: unsere Mission, das Team und wie wir nützliche Online-Rechner entwickeln.",
    keywords: "über uns, team, mission, TheSmartCalculator"
  },
  es: {
    title: "Sobre Nosotros – TheSmartCalculator",
    description: "Conoce a TheSmartCalculator: nuestra misión, equipo y cómo creamos calculadoras en línea útiles.",
    keywords: "sobre nosotros, equipo, misión, TheSmartCalculator"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "/about-us";
  const language = languageFromStaticPathname(pathname);

  return generateStaticPageMetadata("about-us", aboutMeta, pathname, language);
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
