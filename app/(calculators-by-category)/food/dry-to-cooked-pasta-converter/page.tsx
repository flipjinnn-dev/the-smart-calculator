import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import DryToCookedPastaConverterClient from "./dry-to-cooked-pasta-converter-client";

export default async function DryToCookedPastaConverterCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("dry-to-cooked-pasta-converter", language);
  const guideContent = await loadCalculatorGuideContent("dry-to-cooked-pasta-converter", language);

  return <DryToCookedPastaConverterClient content={content} guideContent={guideContent} />;
}
