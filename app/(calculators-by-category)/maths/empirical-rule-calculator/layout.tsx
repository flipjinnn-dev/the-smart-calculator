import { Metadata } from "next";
import { headers } from "next/headers";
import { calculatorsMeta } from "@/meta/calculators";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  const calculatorId = 'empirical-rule-calculator';
  
  const meta = calculatorsMeta[calculatorId]?.[language] || calculatorsMeta[calculatorId]?.['en'] || {
    title: 'Empirical Rule Calculator',
    description: 'Calculate data ranges using the 68-95-99.7 rule for normal distributions.',
  };

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default function EmpiricalRuleCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
