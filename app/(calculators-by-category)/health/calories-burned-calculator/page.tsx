import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import CaloriesBurnedCalculatorClient from "./calories-burned-calculator-client";


export default async function CaloriesBurnedCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("calories-burned-calculator", language);
  const guideContent = await loadCalculatorGuideContent("calories-burned-calculator", language);

  return <CaloriesBurnedCalculatorClient content={content} guideContent={guideContent} />;
}
