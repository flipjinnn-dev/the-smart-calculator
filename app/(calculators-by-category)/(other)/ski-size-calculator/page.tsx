import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
  generateCalculatorMetadata,
} from "@/lib/calculator-page-runtime";
import SkiSizeCalculatorClient from "./ski-size-calculator-client";



export default async function SkiSizeCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("ski-size-calculator", language);
  const guideContent = await loadCalculatorGuideContent(
    "ski-size-calculator",
    language
  );

  return (
    <SkiSizeCalculatorClient content={content} guideContent={guideContent} />
  );
}
