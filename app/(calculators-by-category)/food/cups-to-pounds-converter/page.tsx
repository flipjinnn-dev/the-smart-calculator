import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import CupsToPoundsConverterClient from "./cups-to-pounds-converter-client";


export default async function CupsToPoundsConverterCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("cups-to-pounds-converter", language);
  const guideContent = await loadCalculatorGuideContent("cups-to-pounds-converter", language);

  return <CupsToPoundsConverterClient content={content} guideContent={guideContent} />;
}
