import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import MarriageCalculatorClient from "./marriage-calculator-client";


export default async function MarriageCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("marriage-calculator", language);
  const guideContent = await loadCalculatorGuideContent("marriage-calculator", language);

  return <MarriageCalculatorClient content={content} guideContent={guideContent} />;
}
