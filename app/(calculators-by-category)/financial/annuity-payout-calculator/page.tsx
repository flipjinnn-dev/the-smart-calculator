import { headers } from "next/headers";
import AnnuityPayoutCalculatorClient from "./annuity-payout-calculator-client";

export default async function AnnuityPayoutCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/annuity-payout-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/annuity-payout-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/annuity-payout-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/annuity-payout-calculator/en.json`)).default;
  }

  return <AnnuityPayoutCalculatorClient content={content} guideContent={guideContent} />;
}
