import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import SalesTaxCalculatorClient from "./sales-tax-calculator-client";

export default async function SalesTaxCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("sales-tax-calculator", language);
  const guideContent = await loadCalculatorGuideContent("sales-tax-calculator", language);

  return <SalesTaxCalculatorClient content={content} guideContent={guideContent} />;
}
