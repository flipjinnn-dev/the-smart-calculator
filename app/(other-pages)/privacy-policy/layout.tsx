import { headers } from "next/headers";
import type { Metadata } from "next";
import { getStaticPageCanonicalUrl } from "@/lib/url-utils";

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
  const langHeader = headerList.get('x-language');
  const language: Language = langHeader && privacyMeta[langHeader as Language] ? (langHeader as Language) : 'en';

  const meta = privacyMeta[language];
  const canonicalUrl = getStaticPageCanonicalUrl('privacy-policy', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getStaticPageCanonicalUrl('privacy-policy', 'en'),
        'en': getStaticPageCanonicalUrl('privacy-policy', 'en'),
        'pt-BR': getStaticPageCanonicalUrl('privacy-policy', 'br'),
        'pl': getStaticPageCanonicalUrl('privacy-policy', 'pl'),
        'de': getStaticPageCanonicalUrl('privacy-policy', 'de'),
        'es': getStaticPageCanonicalUrl('privacy-policy', 'es')
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
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

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
