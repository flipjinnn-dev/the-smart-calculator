import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import OvulationCalculatorClient from "./ovulation-calculator-client";

export default async function OvulationCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("ovulation-calculator", language);
  const guideContent = await loadCalculatorGuideContent("ovulation-calculator", language);

  return <OvulationCalculatorClient content={content} guideContent={guideContent} />;
}
