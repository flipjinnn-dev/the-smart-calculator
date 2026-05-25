import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import EnterpriseSeoRoiCalculatorClient from "./enterprise-seo-roi-calculator-client";

export default async function EnterpriseSeoRoiCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("enterprise-seo-roi-calculator", language);
  const guideContent = await loadCalculatorGuideContent("enterprise-seo-roi-calculator", language);

  return <EnterpriseSeoRoiCalculatorClient content={content} guideContent={guideContent} />;
}
