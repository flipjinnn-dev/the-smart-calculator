import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import BmiCalculatorClient from "./bmi-calculator-client";

export default async function BmiCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("bmi-calculator", language);
  const guideContent = await loadCalculatorGuideContent("bmi-calculator", language);

  return <BmiCalculatorClient content={content} guideContent={guideContent} />;
}
