import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import PensionCalculatorClient from "./pension-calculator-client";


export default async function PensionCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("pension-calculator", language);
  const guideContent = await loadCalculatorGuideContent("pension-calculator", language);

  return <PensionCalculatorClient content={content} guideContent={guideContent} />;
}
