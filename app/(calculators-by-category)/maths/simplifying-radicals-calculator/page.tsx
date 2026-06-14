import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import SimplifyingRadicalsCalculatorClient from "./simplifying-radicals-calculator-client";




export default async function SimplifyingRadicalsCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent(
    "simplifying-radicals-calculator",
    language
  );
  const guideContent = await loadCalculatorGuideContent(
    "simplifying-radicals-calculator",
    language
  );

  return (
    <SimplifyingRadicalsCalculatorClient
      content={content}
      guideContent={guideContent}
    />
  );
}
