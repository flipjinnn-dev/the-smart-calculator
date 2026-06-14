import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import CarbohydrateCalculatorClient from "./carbohydrate-calculator-client";


export default async function CarbohydrateCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("carbohydrate-calculator", language);
  const guideContent = await loadCalculatorGuideContent("carbohydrate-calculator", language);

  return <CarbohydrateCalculatorClient content={content} guideContent={guideContent} />;
}
