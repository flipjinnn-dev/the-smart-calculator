import { headers } from "next/headers";
import RandomNumberGeneratorClient from "./random-number-generator-client";

export default async function RandomNumberGeneratorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/random-number-generator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/random-number-generator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/random-number-generator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/random-number-generator/en.json`)).default;
  }

  return <RandomNumberGeneratorClient content={content} guideContent={guideContent} />;
}
