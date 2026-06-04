import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
  generateCalculatorMetadata,
} from "@/lib/calculator-page-runtime";
import StrengthLevelCalculatorClient from "./strength-level-calculator-client";



export default async function StrengthLevelCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent(
    "strength-level-calculator",
    language
  );
  const guideContent = await loadCalculatorGuideContent(
    "strength-level-calculator",
    language
  );

  return (
    <StrengthLevelCalculatorClient
      content={content}
      guideContent={guideContent}
    />
  );
}
