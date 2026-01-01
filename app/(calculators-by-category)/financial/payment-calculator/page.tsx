import { headers } from "next/headers";
import PaymentCalculatorClient from "./payment-calculator-client";

export default async function PaymentCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/payment-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/payment-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/payment-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/payment-calculator/en.json`)).default;
  }

  return <PaymentCalculatorClient content={content} guideContent={guideContent} />;
}
