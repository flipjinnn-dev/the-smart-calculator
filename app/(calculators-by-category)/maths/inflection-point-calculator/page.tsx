import InflectionPointCalculatorClient from "./inflection-point-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";


export default async function InflectionPointCalculator() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("inflection-point-calculator", language);
  const guideContent = await loadCalculatorGuideContent("inflection-point-calculator", language);
  return <InflectionPointCalculatorClient content={content} guideContent={guideContent} />;
}
