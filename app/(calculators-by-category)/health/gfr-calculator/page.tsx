import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import GfrCalculatorClient from "./gfr-calculator-client";


export default async function GfrCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("gfr-calculator", language);
  const guideContent = await loadCalculatorGuideContent("gfr-calculator", language);

  return <GfrCalculatorClient content={content} guideContent={guideContent} />;
}
