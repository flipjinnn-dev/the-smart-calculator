import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import FutureValueCalculatorClient from "./future-value-calculator-client";

export default async function FutureValueCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("future-value-calculator", language);
  const guideContent = await loadCalculatorGuideContent(
    "future-value-calculator",
    language
  );

  return (
    <FutureValueCalculatorClient content={content} guideContent={guideContent} />
  );
}
