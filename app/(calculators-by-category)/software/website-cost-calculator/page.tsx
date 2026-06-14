import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import WebsiteCostCalculatorClient from "./website-cost-calculator-client";


export default async function WebsiteCostCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("website-cost-calculator", language);
  const guideContent = await loadCalculatorGuideContent("website-cost-calculator", language);

  return <WebsiteCostCalculatorClient content={content} guideContent={guideContent} />;
}
