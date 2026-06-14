import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import RandomNumberGeneratorClient from "./random-number-generator-client";


export default async function RandomNumberGeneratorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("random-number-generator", language);
  const guideContent = await loadCalculatorGuideContent("random-number-generator", language);

  return <RandomNumberGeneratorClient content={content} guideContent={guideContent} />;
}
