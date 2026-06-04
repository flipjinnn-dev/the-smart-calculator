import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  generateCalculatorMetadata,
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import TwinFlameCalculatorClient from "./twin-flame-calculator-client";


const CALCULATOR_ID = "twin-flame-calculator";


export default async function TwinFlameCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent(CALCULATOR_ID, language);
  const guideContent = await loadCalculatorGuideContent(CALCULATOR_ID, language);

  return (
    <TwinFlameCalculatorClient content={content} guideContent={guideContent} />
  );
}
