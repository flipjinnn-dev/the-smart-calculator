import { headers } from "next/headers";
import type { Metadata } from "next";
import { getStaticPageCanonicalUrl } from "@/lib/url-utils";

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
  const langHeader = headerList.get("x-language");
  const language: Language = langHeader && contactMeta[langHeader as Language] ? (langHeader as Language) : "en";

  const meta = contactMeta[language];
  const canonicalUrl = getStaticPageCanonicalUrl('contact-us', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getStaticPageCanonicalUrl('contact-us', 'en'),
        en: getStaticPageCanonicalUrl('contact-us', 'en'),
        "pt-BR": getStaticPageCanonicalUrl('contact-us', 'br'),
        pl: getStaticPageCanonicalUrl('contact-us', 'pl'),
        de: getStaticPageCanonicalUrl('contact-us', 'de'),
        es: getStaticPageCanonicalUrl('contact-us', 'es')
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
    }
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
