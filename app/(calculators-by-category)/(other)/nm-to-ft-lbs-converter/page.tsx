import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
  generateCalculatorMetadata,
} from "@/lib/calculator-page-runtime";
import NmToFtLbsConverterClient from "./nm-to-ft-lbs-converter-client";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("nm-to-ft-lbs-converter");
}

export default async function NmToFtLbsConverterPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent(
    "nm-to-ft-lbs-converter",
    language
  );
  const guideContent = await loadCalculatorGuideContent(
    "nm-to-ft-lbs-converter",
    language
  );

  return (
    <NmToFtLbsConverterClient content={content} guideContent={guideContent} />
  );
}
