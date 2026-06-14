import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import TimeCalculatorClient from "./time-calculator-client";


export default async function TimeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("time-calculator", language);
  const guideContent = await loadCalculatorGuideContent("time-calculator", language);

  return <TimeCalculatorClient content={content} guideContent={guideContent} />;
}
