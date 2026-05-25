import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import EstateTaxCalculatorClient from "./estate-tax-calculator-client";

export default async function EstateTaxCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("estate-tax-calculator", language);
  const guideContent = await loadCalculatorGuideContent("estate-tax-calculator", language);

  return <EstateTaxCalculatorClient content={content} guideContent={guideContent} />;
}
