import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import RelativeExtremaCalculatorClient from "./relative-extrema-calculator-client";

export default async function RelativeExtremaCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("relative-extrema-calculator", language);
  const guideContent = await loadCalculatorGuideContent("relative-extrema-calculator", language);

  return <RelativeExtremaCalculatorClient content={content} guideContent={guideContent} />;
}
