import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import RpeCalculatorClient from "./rpe-calculator-client";


export default async function RpeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("rpe-calculator", language);
  const guideContent = await loadCalculatorGuideContent("rpe-calculator", language);

  return <RpeCalculatorClient content={content} guideContent={guideContent} />;
}
