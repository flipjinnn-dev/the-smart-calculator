import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
  generateCalculatorMetadata,
} from "@/lib/calculator-page-runtime";



import ElectricityBillCalculatorClient from "./electricity-bill-calculator-client";

export default async function ElectricityBillCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("electricity-bill-calculator", language);
  const guideContent = await loadCalculatorGuideContent("electricity-bill-calculator", language);

  return (
    <ElectricityBillCalculatorClient content={content} guideContent={guideContent} />
  );
}
