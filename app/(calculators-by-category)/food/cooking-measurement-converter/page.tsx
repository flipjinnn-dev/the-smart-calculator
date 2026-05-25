import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import CookingMeasurementConverterClient from "./cooking-measurement-converter-client";

export default async function CookingMeasurementConverterCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("cooking-measurement-converter", language);
  const guideContent = await loadCalculatorGuideContent("cooking-measurement-converter", language);

  return <CookingMeasurementConverterClient content={content} guideContent={guideContent} />;
}
