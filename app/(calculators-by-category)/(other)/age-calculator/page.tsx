import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import AgeCalculatorClient from "./age-calculator-client";

export default async function AgeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("age", language);
  const guideContent = await loadCalculatorGuideContent("age", language);

  return <AgeCalculatorClient content={content} guideContent={guideContent} />;
}
