import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import CakePanCalculatorClient from "./cake-pan-calculator-client";


export default async function CakePanCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("cake-pan", language);
  const guideContent = await loadCalculatorGuideContent("cake-pan", language);

  return <CakePanCalculatorClient content={content} guideContent={guideContent} />;
}
