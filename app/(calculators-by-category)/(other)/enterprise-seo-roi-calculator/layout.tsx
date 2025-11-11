import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

type Lang = 'en' | 'pl' | 'br' | 'de';
type Meta = { title: string; description: string };
const meta: Record<Lang, Meta> = {
  en: { title: "Enterprise SEO ROI Calculator", description: "Calculate the return on investment (ROI) for enterprise SEO." },
  pl: { title: "Enterprise SEO ROI Kalkulator", description: "Oblicz the return on investment (ROI) dla enterprise SEO." },
  br: { title: "Calculadora de ROI de SEO Empresarial", description: "Calcule o retorno sobre investimento (ROI) para SEO empresarial. Otimize seu orçamento de marketing digital." },
  de: { title: "Unternehmens-SEO-ROI-Rechner", description: "Berechnen Sie die Rendite (ROI) für Unternehmens-SEO. Optimieren Sie Ihr digitales Marketingbudget." },
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language') as Lang | null;
  const language: Lang = (langHeader && meta[langHeader]) ? (langHeader as Lang) : 'en';
  const m = meta[language];

  const baseUrl = 'https://www.thesmartcalculator.com';
  const pathEn = '/enterprise-seo-roi-calculator';
  const canonicalPath = language === 'pl' ? '/pl/' : (language === 'en' ? pathEn : `/${language}${pathEn}`);

  return {
    title: m.title,
    description: m.description,
    alternates: { 
      canonical: canonicalPath.startsWith('http') ? canonicalPath : baseUrl + canonicalPath,
      languages: {
        'en': getCanonicalUrl('enterprise-seo-roi-calculator', 'en'),
        'pt-BR': getCanonicalUrl('enterprise-seo-roi-calculator', 'br'),
        'pl': getCanonicalUrl('enterprise-seo-roi-calculator', 'pl'),
        'de': getCanonicalUrl('enterprise-seo-roi-calculator', 'de'),
      }
    },
    openGraph: {
      title: m.title,
      description: m.description,
      type: 'website',
      url: canonicalPath.startsWith('http') ? canonicalPath : baseUrl + canonicalPath,
    },
  };
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
