import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import PiecewiseFunctionCalculatorGrapherClient from "./piecewise-function-calculator-grapher-client";


export default async function PiecewiseFunctionCalculatorGrapherCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("piecewise-function-calculator-grapher", language);
  const guideContent = await loadCalculatorGuideContent("piecewise-function-calculator-grapher", language);

  return <PiecewiseFunctionCalculatorGrapherClient content={content} guideContent={guideContent} />;
}
