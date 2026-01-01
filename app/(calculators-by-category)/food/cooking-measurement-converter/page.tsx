import { headers } from "next/headers";
import CookingMeasurementConverterClient from "./cooking-measurement-converter-client";

export default async function CookingMeasurementConverterCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/cooking-measurement-converter/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/cooking-measurement-converter/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/cooking-measurement-converter/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/cooking-measurement-converter/en.json`)).default;
  }

  return <CookingMeasurementConverterClient content={content} guideContent={guideContent} />;
}
