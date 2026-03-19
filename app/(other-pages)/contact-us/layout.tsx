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
  // Always use English-only metadata (no multilingual support)
  const meta = contactMeta.en;
  const canonicalUrl = 'https://www.thesmartcalculator.com/contact-us';

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
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
