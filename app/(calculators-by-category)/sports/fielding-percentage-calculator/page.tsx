import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import FieldingPercentageCalculatorClient from "./fielding-percentage-calculator-client";

export default async function FieldingPercentageCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("fielding-percentage", language);
  const guideContent = await loadCalculatorGuideContent("fielding-percentage", language);

  return <FieldingPercentageCalculatorClient content={content} guideContent={guideContent} />;
}
