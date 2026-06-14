import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import AnorexicBmiCalculatorClient from "./anorexic-bmi-calculator-client";


export default async function AnorexicBmiCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("anorexic-bmi-calculator", language);
  const guideContent = await loadCalculatorGuideContent("anorexic-bmi-calculator", language);

  return <AnorexicBmiCalculatorClient content={content} guideContent={guideContent} />;
}
