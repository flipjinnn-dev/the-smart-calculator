import AngleWeightCalculatorClient from "./angle-weight-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";


export default async function AngleWeightCalculator() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("angle-weight-calculator", language);
  const guideContent = await loadCalculatorGuideContent("angle-weight-calculator", language);
  return <AngleWeightCalculatorClient content={content} guideContent={guideContent} />;
}
