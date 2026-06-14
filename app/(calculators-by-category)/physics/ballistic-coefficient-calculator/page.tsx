import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import BallisticCoefficientCalculatorClient from "./ballistic-coefficient-calculator-client";


export default async function BallisticCoefficientCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("ballistic-coefficient", language);
  const guideContent = await loadCalculatorGuideContent("ballistic-coefficient", language);

  return <BallisticCoefficientCalculatorClient content={content} guideContent={guideContent} />;
}
