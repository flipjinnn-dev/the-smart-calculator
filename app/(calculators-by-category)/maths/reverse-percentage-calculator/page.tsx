import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import ReversePercentageCalculatorClient from "./reverse-percentage-calculator-client";




export default async function ReversePercentageCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("reverse-percentage-calculator", language);
  const guideContent = await loadCalculatorGuideContent("reverse-percentage-calculator", language);

  return <ReversePercentageCalculatorClient content={content} guideContent={guideContent} />;
}
