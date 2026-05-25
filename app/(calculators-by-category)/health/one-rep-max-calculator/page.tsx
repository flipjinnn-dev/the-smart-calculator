import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import OneRepMaxCalculatorClient from "./one-rep-max-calculator-client";

export default async function OneRepMaxCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("one-rep-max-calculator", language);
  const guideContent = await loadCalculatorGuideContent("one-rep-max-calculator", language);

  return <OneRepMaxCalculatorClient content={content} guideContent={guideContent} />;
}
