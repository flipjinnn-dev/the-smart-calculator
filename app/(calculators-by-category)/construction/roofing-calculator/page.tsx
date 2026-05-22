import type { Metadata } from "next";
import { headers } from "next/headers";
import RoofingCalculatorClient from "./roofing-calculator-client";

export const metadata: Metadata = {
  title: "Roofing Calculator | Roof Area & Cost Estimate",
  description:
    "Estimate roof area, pitch, materials, and cost instantly with our roofing calculator. Get accurate roof squares, waste %, and replacement estimate.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/roofing-calculator",
  },
};

export default async function RoofingCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  let content = null;
  let guideContent = null;

  try {
    content = (
      await import(`@/app/content/calculator-ui/roofing-calculator/${language}.json`)
    ).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/roofing-calculator/en.json`)).default;
  }

  try {
    guideContent = (
      await import(`@/app/content/calculator-guide/roofing-calculator/${language}.json`)
    ).default;
  } catch {
    guideContent = (
      await import(`@/app/content/calculator-guide/roofing-calculator/en.json`)
    ).default;
  }

  return <RoofingCalculatorClient content={content} guideContent={guideContent} />;
}
