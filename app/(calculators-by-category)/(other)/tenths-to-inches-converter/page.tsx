import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
  generateCalculatorMetadata,
} from "@/lib/calculator-page-runtime";
import TenthsToInchesConverterClient from "./tenths-to-inches-converter-client";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("tenths-to-inches-converter");
}

export default async function TenthsToInchesConverterPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent(
    "tenths-to-inches-converter",
    language
  );
  const guideContent = await loadCalculatorGuideContent(
    "tenths-to-inches-converter",
    language
  );

  return (
    <TenthsToInchesConverterClient
      content={content}
      guideContent={guideContent}
    />
  );
}
