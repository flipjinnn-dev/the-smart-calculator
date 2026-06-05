import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  generateStaticPageMetadata,
  languageFromStaticPathname,
} from "@/lib/static-page-seo";

type Language = "en" | "br" | "pl" | "de" | "es";

const contactMeta: Record<Language, { title: string; description: string; keywords: string }> = {
  en: {
    title: "Contact Us – TheSmartCalculator",
    description: "Get in touch with TheSmartCalculator team for support, feedback, or partnerships.",
    keywords: "contact, support, feedback, TheSmartCalculator"
  },
  br: {
    title: "Fale Conosco – TheSmartCalculator",
    description: "Entre em contato com a equipe TheSmartCalculator para suporte, feedback ou parcerias.",
    keywords: "contato, suporte, feedback, TheSmartCalculator"
  },
  pl: {
    title: "Kontakt – TheSmartCalculator",
    description: "Skontaktuj się z zespołem TheSmartCalculator w sprawie wsparcia, opinii lub współpracy.",
    keywords: "kontakt, wsparcie, opinie, TheSmartCalculator"
  },
  de: {
    title: "Kontakt – TheSmartCalculator",
    description: "Kontaktieren Sie das TheSmartCalculator-Team für Support, Feedback oder Partnerschaften.",
    keywords: "kontakt, support, feedback, TheSmartCalculator"
  },
  es: {
    title: "Contacto – TheSmartCalculator",
    description: "Ponte en contacto con el equipo de TheSmartCalculator para soporte, comentarios o asociaciones.",
    keywords: "contacto, soporte, comentarios, TheSmartCalculator"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "/contact-us";
  const language = languageFromStaticPathname(pathname);

  return generateStaticPageMetadata("contact-us", contactMeta, pathname, language);
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
