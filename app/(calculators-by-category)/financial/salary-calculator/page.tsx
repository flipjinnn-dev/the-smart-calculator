import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import SalaryCalculatorClient from "./salary-calculator-client";


export default async function SalaryCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("salary-calculator", language);
  const guideContent = await loadCalculatorGuideContent("salary-calculator", language);

  return <SalaryCalculatorClient content={content} guideContent={guideContent} />;
}
