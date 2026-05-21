import type { Metadata } from "next";
import { headers } from "next/headers";
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

  let content = null;
  let guideContent = null;

  try {
    content = (
      await import(
        `@/app/content/calculator-ui/septic-tank-size-calculator/${language}.json`
      )
    ).default;
  } catch {
    content = (
      await import(`@/app/content/calculator-ui/septic-tank-size-calculator/en.json`)
    ).default;
  }

  try {
    guideContent = (
      await import(
        `@/app/content/calculator-guide/septic-tank-size-calculator/${language}.json`
      )
    ).default;
  } catch {
    guideContent = (
      await import(
        `@/app/content/calculator-guide/septic-tank-size-calculator/en.json`
      )
    ).default;
  }

  return (
    <SepticTankSizeCalculatorClient content={content} guideContent={guideContent} />
  );
}
