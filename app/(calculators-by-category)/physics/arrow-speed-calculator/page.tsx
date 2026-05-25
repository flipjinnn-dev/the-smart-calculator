import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import ArrowSpeedCalculatorClient from "./arrow-speed-calculator-client";

export default async function ArrowSpeedCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("arrow-speed", language);
  const guideContent = await loadCalculatorGuideContent("arrow-speed", language);

  return <ArrowSpeedCalculatorClient content={content} guideContent={guideContent} />;
}
