import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import BodyTypeCalculatorClient from "./body-type-calculator-client";

export default async function BodyTypeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("body-type-calculator", language);
  const guideContent = await loadCalculatorGuideContent("body-type-calculator", language);

  return <BodyTypeCalculatorClient content={content} guideContent={guideContent} />;
}
