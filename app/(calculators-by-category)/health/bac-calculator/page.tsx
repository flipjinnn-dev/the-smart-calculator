import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import BacCalculatorClient from "./bac-calculator-client";

export default async function BacCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("bac-calculator", language);
  const guideContent = await loadCalculatorGuideContent("bac-calculator", language);

  return <BacCalculatorClient content={content} guideContent={guideContent} />;
}
