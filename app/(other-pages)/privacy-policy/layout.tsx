import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  generateStaticPageMetadata,
  languageFromStaticPathname,
} from "@/lib/static-page-seo";

type Language = "en" | "br" | "pl" | "de" | "es";

const privacyMeta: Record<Language, { title: string; description: string; keywords: string }> = {
  en: {
    title: "Privacy Policy – TheSmartCalculator",
    description: "Read TheSmartCalculator's privacy policy to understand how we collect and use data.",
    keywords: "privacy, policy, data, TheSmartCalculator"
  },
  br: {
    title: "Política de Privacidade – TheSmartCalculator",
    description: "Leia a política de privacidade do TheSmartCalculator para entender como coletamos e usamos dados.",
    keywords: "privacidade, política, dados, TheSmartCalculator"
  },
  pl: {
    title: "Polityka Prywatności – TheSmartCalculator",
    description: "Przeczytaj politykę prywatności TheSmartCalculator, aby dowiedzieć się, jak zbieramy i wykorzystujemy dane.",
    keywords: "prywatność, polityka, dane, TheSmartCalculator"
  },
  de: {
    title: "Datenschutzerklärung – TheSmartCalculator",
    description: "Lesen Sie die Datenschutzerklärung von TheSmartCalculator, um zu verstehen, wie wir Daten erheben und verwenden.",
    keywords: "datenschutz, richtlinie, daten, TheSmartCalculator"
  },
  es: {
    title: "Política de Privacidad – TheSmartCalculator",
    description: "Lee la política de privacidad de TheSmartCalculator para entender cómo recopilamos y usamos los datos.",
    keywords: "privacidad, política, datos, TheSmartCalculator"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "/privacy-policy";
  const language = languageFromStaticPathname(pathname);

  return generateStaticPageMetadata("privacy-policy", privacyMeta, pathname, language);
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
