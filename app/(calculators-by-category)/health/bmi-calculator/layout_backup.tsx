import { headers } from "next/headers";
import type { Metadata } from "next";

type Lang = 'en' | 'pl' | 'br' | 'de';
type Meta = { title: string; description: string };
const meta: Record<Lang, Meta> = {
  en: { title: "BMI Calculator", description: "Calculate your Body Mass Index and understand your weight status" },
  pl: { title: "Kalkulator BMI – Oblicz Swoje BMI Online Szybko", description: "Użyj kalkulatora BMI online, aby obliczyć wskaźnik masy ciała i sprawdzić swoją wagę idealną. Proste, dokładne i darmowe narzędzie zdrowotne." },
  br: { title: "Calculadora de IMC", description: "Calcule seu Índice de Massa Corporal (IMC) e entenda sua categoria de peso (baixo, saudável, sobrepeso, obesidade)." },
  de: { title: "BMI Rechner – Body-Mass-Index einfach online berechnen", description: "Mit dem BMI Rechner berechnen Sie Ihren Body-Mass-Index schnell & präzise. Finden Sie heraus" },
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language') as Lang | null;
  const language: Lang = (langHeader && meta[langHeader]) ? (langHeader as Lang) : 'en';
  const m = meta[language];

  const baseUrl = 'https://www.thesmartcalculator.com';
  const pathEn = '/health/bmi-calculator';
  const canonicalPath = language === 'pl' ? '/pl/zdrowie/kalkulator-bmi%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20246.0K' : (language === 'en' ? pathEn : `/${language}${pathEn}`);

  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: canonicalPath.startsWith('http') ? canonicalPath : baseUrl + canonicalPath },
    openGraph: {
      title: m.title,
      description: m.description,
      type: 'website',
      url: canonicalPath.startsWith('http') ? canonicalPath : baseUrl + canonicalPath,
    },
  };
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
