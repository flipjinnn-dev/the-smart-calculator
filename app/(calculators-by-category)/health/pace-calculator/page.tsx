import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import PaceCalculatorClient from "./pace-calculator-client";


export default async function PaceCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("pace-calculator", language);
  const guideContent = await loadCalculatorGuideContent("pace-calculator", language);

  return <PaceCalculatorClient content={content} guideContent={guideContent} />;
}
