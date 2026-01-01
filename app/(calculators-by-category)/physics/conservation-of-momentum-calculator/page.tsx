import { headers } from "next/headers";
import ConservationOfMomentumCalculatorClient from "./conservation-of-momentum-calculator-client";

export default async function ConservationOfMomentumCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/conservation-of-momentum-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/conservation-of-momentum-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/conservation-of-momentum-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/conservation-of-momentum-calculator/en.json`)).default;
  }

  return <ConservationOfMomentumCalculatorClient content={content} guideContent={guideContent} />;
}
