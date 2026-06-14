import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import ButterCalculatorClient from "./butter-calculator-client";


export default async function ButterCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("butter", language);
  const guideContent = await loadCalculatorGuideContent("butter", language);

  return <ButterCalculatorClient content={content} guideContent={guideContent} />;
}
