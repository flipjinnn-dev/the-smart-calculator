import ReverseSalesTaxCalculatorClient from "./reverse-sales-tax-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export default async function ReverseSalesTaxCalculator() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("reverse-sales-tax-calculator", language);
  const guideContent = await loadCalculatorGuideContent("reverse-sales-tax-calculator", language);
  return <ReverseSalesTaxCalculatorClient content={content} guideContent={guideContent} />;
}
