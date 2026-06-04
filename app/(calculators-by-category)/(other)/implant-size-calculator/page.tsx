import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
import BreastImplantSizeCalculatorClient from "./breast-client";



export default async function BreastImplantSizeCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("implant-size-calculator", language);
  const guideContent = await loadCalculatorGuideContent("implant-size-calculator", language);

  return <BreastImplantSizeCalculatorClient content={content} guideContent={guideContent} />;
}
