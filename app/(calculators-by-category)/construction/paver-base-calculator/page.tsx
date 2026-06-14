import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import PaverBaseCalculatorClient from "./paver-base-calculator-client";


export default async function PaverBaseCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("paver-base-calculator", language);
  const guideContent = await loadCalculatorGuideContent("paver-base-calculator", language);

  return <PaverBaseCalculatorClient content={content} guideContent={guideContent} />;
}
