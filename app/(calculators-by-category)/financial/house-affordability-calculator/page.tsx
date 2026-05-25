import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import HouseAffordabilityCalculatorClient from "./house-affordability-calculator-client";

export default async function HouseAffordabilityCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("house-affordability-calculator", language);
  const guideContent = await loadCalculatorGuideContent("house-affordability-calculator", language);

  return <HouseAffordabilityCalculatorClient content={content} guideContent={guideContent} />;
}
