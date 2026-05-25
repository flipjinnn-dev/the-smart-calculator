import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import CalorieCalculatorClient from "./calorie-calculator-client";

export default async function CalorieCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("calorie-calculator", language);
  const guideContent = await loadCalculatorGuideContent("calorie-calculator", language);

  return <CalorieCalculatorClient content={content} guideContent={guideContent} />;
}
