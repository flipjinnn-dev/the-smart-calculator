import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
  generateCalculatorMetadata,
} from "@/lib/calculator-page-runtime";



import PoolVolumeCalculatorClient from "./pool-volume-calculator-client";

export default async function PoolVolumeCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("pool-volume-calculator", language);
  const guideContent = await loadCalculatorGuideContent("pool-volume-calculator", language);

  return <PoolVolumeCalculatorClient content={content} guideContent={guideContent} />;
}
