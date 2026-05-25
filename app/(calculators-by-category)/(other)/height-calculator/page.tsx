import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import HeightCalculatorClient from "./height-calculator-client";

export default async function HeightCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("height-calculator", language);
  const guideContent = await loadCalculatorGuideContent("height-calculator", language);

  return <HeightCalculatorClient content={content} guideContent={guideContent} />;
}
