import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import FourOhOneKCalculatorClient from "./401k-calculator-client";

export const dynamic = "force-dynamic";

export default async function FourOhOneKCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("401k-calculator", language);
  const guideContent = await loadCalculatorGuideContent("401k-calculator", language);

  return <FourOhOneKCalculatorClient content={content} guideContent={guideContent} />;
}
