import AppCostCalculatorClient from "./app-cost-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";



export default async function AppCostCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("app-cost-calculator", language);
  const guideContent = await loadCalculatorGuideContent("app-cost-calculator", language);
  return <AppCostCalculatorClient content={content} guideContent={guideContent} />;
}
