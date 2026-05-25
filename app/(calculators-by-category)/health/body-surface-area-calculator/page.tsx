import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import BodySurfaceAreaCalculatorClient from "./body-surface-area-calculator-client";

export default async function BodySurfaceAreaCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("body-surface-area-calculator", language);
  const guideContent = await loadCalculatorGuideContent("body-surface-area-calculator", language);

  return <BodySurfaceAreaCalculatorClient content={content} guideContent={guideContent} />;
}
