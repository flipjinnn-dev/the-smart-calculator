import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import BodyFatCalculatorClient from "./body-fat-calculator-client";


export default async function BodyFatCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("body-fat-calculator", language);
  const guideContent = await loadCalculatorGuideContent("body-fat-calculator", language);

  return <BodyFatCalculatorClient content={content} guideContent={guideContent} />;
}
