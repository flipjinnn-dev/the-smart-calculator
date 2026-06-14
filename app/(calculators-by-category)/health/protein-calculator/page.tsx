import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import ProteinCalculatorClient from "./protein-calculator-client";


export default async function ProteinCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("protein-calculator", language);
  const guideContent = await loadCalculatorGuideContent("protein-calculator", language);

  return <ProteinCalculatorClient content={content} guideContent={guideContent} />;
}
