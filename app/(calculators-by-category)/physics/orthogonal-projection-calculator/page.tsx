import { headers } from "next/headers";
import OrthogonalProjectionCalculatorClient from "./orthogonal-projection-calculator-client";

export default async function OrthogonalProjectionCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/orthogonal-projection-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/orthogonal-projection-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/orthogonal-projection-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/orthogonal-projection-calculator/en.json`)).default;
  }

  return <OrthogonalProjectionCalculatorClient content={content} guideContent={guideContent} />;
}
