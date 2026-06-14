import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import FatIntakeCalculatorClient from "./fat-intake-calculator-client";


export default async function FatIntakeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("fat-intake-calculator", language);
  const guideContent = await loadCalculatorGuideContent("fat-intake-calculator", language);

  return <FatIntakeCalculatorClient content={content} guideContent={guideContent} />;
}
