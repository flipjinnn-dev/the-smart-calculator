import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import MgToMlCalculatorClient from "./mg-to-ml-calculator-client";

export default async function MgToMlCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("mg-to-ml-calculator", language);
  const guideContent = await loadCalculatorGuideContent("mg-to-ml-calculator", language);

  return <MgToMlCalculatorClient content={content} guideContent={guideContent} />;
}
