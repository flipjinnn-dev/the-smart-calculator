import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import VoriciCalculatorClient from "./vorici-calculator-client";

export default async function VoriciCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("vorici-calculator", language);
  const guideContent = await loadCalculatorGuideContent("vorici-calculator", language);

  return <VoriciCalculatorClient content={content} guideContent={guideContent} />;
}
