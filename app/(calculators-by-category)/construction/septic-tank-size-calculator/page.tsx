import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import SepticTankSizeCalculatorClient from "./septic-tank-size-calculator-client";

export const metadata: Metadata = {
  title: "Septic Tank Size Calculator",
  description:
    "Most homes need a 1,000-gallon septic tank. Use our calculator for exact size based on bedrooms, usage, and soil type.",
  alternates: {
    canonical:
      "https://www.thesmartcalculator.com/construction/septic-tank-size-calculator",
  },
};

export default async function SepticTankSizeCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("septic-tank-size-calculator", language);
  const guideContent = await loadCalculatorGuideContent("septic-tank-size-calculator", language);

  return (
    <SepticTankSizeCalculatorClient content={content} guideContent={guideContent} />
  );
}
