import { headers } from "next/headers";
import RadiusOfConvergenceCalculatorClient from "./radius-of-convergence-calculator-client";

export default async function RadiusOfConvergenceCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/radius-of-convergence-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/radius-of-convergence-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/radius-of-convergence-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/radius-of-convergence-calculator/en.json`)).default;
  }

  return <RadiusOfConvergenceCalculatorClient content={content} guideContent={guideContent} />;
}
