import { headers } from "next/headers";
import CupsToPoundsConverterClient from "./cups-to-pounds-converter-client";

export default async function CupsToPoundsConverterCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/cups-to-pounds-converter/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/cups-to-pounds-converter/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/cups-to-pounds-converter/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/cups-to-pounds-converter/en.json`)).default;
  }

  return <CupsToPoundsConverterClient content={content} guideContent={guideContent} />;
}
