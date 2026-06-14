import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import TwinFlameCalculatorClient from "./twin-flame-calculator-client";


export default async function TwinFlameCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent(CALCULATOR_ID, language);
  const guideContent = await loadCalculatorGuideContent(CALCULATOR_ID, language);

  return (
    <TwinFlameCalculatorClient content={content} guideContent={guideContent} />
  );
}
