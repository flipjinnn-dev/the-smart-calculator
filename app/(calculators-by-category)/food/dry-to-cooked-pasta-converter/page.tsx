import { headers } from "next/headers";
import DryToCookedPastaConverterClient from "./dry-to-cooked-pasta-converter-client";

export default async function DryToCookedPastaConverterCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/dry-to-cooked-pasta-converter/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/dry-to-cooked-pasta-converter/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/dry-to-cooked-pasta-converter/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/dry-to-cooked-pasta-converter/en.json`)).default;
  }

  return <DryToCookedPastaConverterClient content={content} guideContent={guideContent} />;
}
