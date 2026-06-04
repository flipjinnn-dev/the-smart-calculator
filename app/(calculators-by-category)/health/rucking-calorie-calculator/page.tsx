import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import RuckingCalorieCalculatorClient from "./rucking-calorie-calculator-client";

export default async function RuckingCalorieCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("rucking-calorie-calculator", language);
  const guideContent = await loadCalculatorGuideContent("rucking-calorie-calculator", language);

  return <RuckingCalorieCalculatorClient content={content} guideContent={guideContent} />;
}
