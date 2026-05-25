import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import GpaCalculatorClient from "./gpa-calculator-client";

export default async function GpaCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("gpa-calculator", language);
  const guideContent = await loadCalculatorGuideContent("gpa-calculator", language);

  return <GpaCalculatorClient content={content} guideContent={guideContent} />;
}
