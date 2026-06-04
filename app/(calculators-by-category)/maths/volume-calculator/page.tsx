import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import VolumeCalculatorClient from "./volume-calculator-client";

export default async function VolumeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("volume-calculator", language);
  const guideContent = await loadCalculatorGuideContent("volume-calculator", language);

  return <VolumeCalculatorClient content={content} guideContent={guideContent} />;
}
