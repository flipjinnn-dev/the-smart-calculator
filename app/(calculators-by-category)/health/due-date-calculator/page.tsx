import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import DueDateCalculatorClient from "./due-date-calculator-client";

export default async function DueDateCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("due-date-calculator", language);
  const guideContent = await loadCalculatorGuideContent("due-date-calculator", language);

  return <DueDateCalculatorClient content={content} guideContent={guideContent} />;
}
