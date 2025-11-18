import { headers } from "next/headers";
import type { Metadata } from "next";

type Language = "en" | "br" | "pl" | "de";

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
  }
};

// Hardcoded canonical and hreflang URLs matching middleware/sitemap
const pageUrls: Record<Language, string> = {
  en: "https://www.thesmartcalculator.com/contact-us",
  br: "https://www.thesmartcalculator.com/br/contato",
  pl: "https://www.thesmartcalculator.com/pl/kontakt",
  de: "https://www.thesmartcalculator.com/de/kontakt"
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get("x-language");
  const language: Language = langHeader && contactMeta[langHeader as Language] ? (langHeader as Language) : "en";

  const meta = contactMeta[language];
  const canonicalUrl = pageUrls[language];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: pageUrls.en,
        "pt-BR": pageUrls.br,
        pl: pageUrls.pl,
        de: pageUrls.de
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl
    }
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
