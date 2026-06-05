import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  generateStaticPageMetadata,
  languageFromStaticPathname,
} from "@/lib/static-page-seo";

type Language = "en" | "br" | "pl" | "de" | "es";

const termsMeta: Record<Language, { title: string; description: string; keywords: string }> = {
  en: {
    title: "Terms and Conditions – TheSmartCalculator",
    description: "Review the terms and conditions for using TheSmartCalculator services and tools.",
    keywords: "terms, conditions, legal, TheSmartCalculator"
  },
  br: {
    title: "Termos e Condições – TheSmartCalculator",
    description: "Leia os termos e condições para usar os serviços e ferramentas do TheSmartCalculator.",
    keywords: "termos, condições, legal, TheSmartCalculator"
  },
  pl: {
    title: "Regulamin – TheSmartCalculator",
    description: "Przeczytaj regulamin korzystania z usług i narzędzi TheSmartCalculator.",
    keywords: "regulamin, warunki, prawne, TheSmartCalculator"
  },
  de: {
    title: "Nutzungsbedingungen – TheSmartCalculator",
    description: "Lesen Sie die Nutzungsbedingungen für die Nutzung der Dienste und Tools von TheSmartCalculator.",
    keywords: "bedingungen, rechtliches, TheSmartCalculator"
  },
  es: {
    title: "Términos y Condiciones – TheSmartCalculator",
    description: "Revisa los términos y condiciones para usar los servicios y herramientas de TheSmartCalculator.",
    keywords: "términos, condiciones, legal, TheSmartCalculator"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "/terms-and-conditions";
  const language = languageFromStaticPathname(pathname);

  return generateStaticPageMetadata("terms-and-conditions", termsMeta, pathname, language);
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
