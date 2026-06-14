import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import RentCalculatorClient from "./rent-calculator-client";


export default async function RentCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("rent-calculator", language);
  const guideContent = await loadCalculatorGuideContent("rent-calculator", language);

  return <RentCalculatorClient content={content} guideContent={guideContent} />;
}
