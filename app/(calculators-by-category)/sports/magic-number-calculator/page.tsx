import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import MagicNumberCalculatorClient from "./magic-number-calculator-client";

export default async function MagicNumberCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("magic-number", language);
  const guideContent = await loadCalculatorGuideContent("magic-number", language);

  return <MagicNumberCalculatorClient content={content} guideContent={guideContent} />;
}
