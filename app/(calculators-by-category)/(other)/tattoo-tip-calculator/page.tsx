import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
  generateCalculatorMetadata,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("tattoo-tip-calculator");
}

import TattooTipCalculatorClient from "./tattoo-tip-calculator-client";

export default async function TattooTipCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("tattoo-tip-calculator", language);
  const guideContent = await loadCalculatorGuideContent("tattoo-tip-calculator", language);

  return (
    <TattooTipCalculatorClient content={content} guideContent={guideContent} />
  );
}
