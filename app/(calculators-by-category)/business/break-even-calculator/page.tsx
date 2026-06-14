import BreakEvenCalculatorClient from "./break-even-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";



export default async function BreakEvenCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("break-even-calculator", language);
  const guideContent = await loadCalculatorGuideContent("break-even-calculator", language);
  return <BreakEvenCalculatorClient content={content} guideContent={guideContent} />;
}
