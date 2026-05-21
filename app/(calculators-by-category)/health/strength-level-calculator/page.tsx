import type { Metadata } from "next";
import { headers } from "next/headers";
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

  let content = null;
  let guideContent = null;

  try {
    content = (
      await import(`@/app/content/calculator-ui/strength-level-calculator/${language}.json`)
    ).default;
  } catch {
    content = (
      await import(`@/app/content/calculator-ui/strength-level-calculator/en.json`)
    ).default;
  }

  try {
    guideContent = (
      await import(`@/app/content/calculator-guide/strength-level-calculator/${language}.json`)
    ).default;
  } catch {
    guideContent = (
      await import(`@/app/content/calculator-guide/strength-level-calculator/en.json`)
    ).default;
  }

  return (
    <StrengthLevelCalculatorClient content={content} guideContent={guideContent} />
  );
}
