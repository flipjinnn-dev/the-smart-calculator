import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import CurrencyCalculatorClient from "./currency-calculator-client";

export default async function CurrencyCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("currency-calculator", language);
  const guideContent = await loadCalculatorGuideContent("currency-calculator", language);

  return <CurrencyCalculatorClient content={content} guideContent={guideContent} />;
}
