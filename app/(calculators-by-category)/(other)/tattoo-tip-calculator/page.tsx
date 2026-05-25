import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import TattooTipCalculatorClient from "./tattoo-tip-calculator-client";

export const metadata: Metadata = {
  title: "Tattoo Tip Calculator | Calculate Artist Tip Online",
  description:
    "Use our tattoo tip calculator to instantly calculate the perfect tip for your tattoo artist. Enter cost, choose %, and get fast accurate results online.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/tattoo-tip-calculator/",
  },
};

export default async function TattooTipCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("tattoo-tip-calculator", language);
  const guideContent = await loadCalculatorGuideContent("tattoo-tip-calculator", language);

  return (
    <TattooTipCalculatorClient content={content} guideContent={guideContent} />
  );
}
