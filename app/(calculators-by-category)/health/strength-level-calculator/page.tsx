import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import StrengthLevelCalculatorClient from "./strength-level-calculator-client";

export const metadata: Metadata = {
  title: "Strength Level Calculator & 1RM Strength Standards",
  description:
    "Use our Strength Level Calculator to calculate your 1RM, compare strength standards, and check your bench, squat, or deadlift strength level online.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/health/strength-level-calculator",
  },
};

export default async function StrengthLevelCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("strength-level-calculator", language);
  const guideContent = await loadCalculatorGuideContent("strength-level-calculator", language);

  return (
    <StrengthLevelCalculatorClient content={content} guideContent={guideContent} />
  );
}
