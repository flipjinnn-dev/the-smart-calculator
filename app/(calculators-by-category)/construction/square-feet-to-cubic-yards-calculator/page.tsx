import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import SquareFeetToCubicYardsCalculatorClient from "./square-feet-to-cubic-yards-calculator-client";


export default async function SquareFeetToCubicYardsCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("square-feet-to-cubic-yards", language);
  const guideContent = await loadCalculatorGuideContent("square-feet-to-cubic-yards", language);

  return <SquareFeetToCubicYardsCalculatorClient content={content} guideContent={guideContent} />;
}
