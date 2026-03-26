import { headers } from "next/headers";
import MortgageCalculatorClient from "./mortgage-calculator-client";

export default async function MortgageCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';

  let content = null;

  try {
    content = (await import(`@/app/content/calculator-ui/mortgage-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/mortgage-calculator/en.json`)).default;
  }

  return <MortgageCalculatorClient content={content} />;
}
