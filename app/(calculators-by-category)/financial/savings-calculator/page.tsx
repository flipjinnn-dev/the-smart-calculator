import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import SavingsCalculatorClient from "./savings-calculator-client";


export default async function SavingsCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("savings-calculator", language);
  const guideContent = await loadCalculatorGuideContent("savings-calculator", language);

  return <SavingsCalculatorClient content={content} guideContent={guideContent} />;
}
