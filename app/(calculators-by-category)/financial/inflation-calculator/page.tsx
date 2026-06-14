import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import InflationCalculatorClient from "./inflation-calculator-client";


export default async function InflationCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("inflation-calculator", language);
  const guideContent = await loadCalculatorGuideContent("inflation-calculator", language);

  return <InflationCalculatorClient content={content} guideContent={guideContent} />;
}
