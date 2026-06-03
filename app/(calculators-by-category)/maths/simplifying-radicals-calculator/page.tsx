import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
  generateCalculatorMetadata,
} from "@/lib/calculator-page-runtime";
import SimplifyingRadicalsCalculatorClient from "./simplifying-radicals-calculator-client";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("simplifying-radicals-calculator");
}

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
