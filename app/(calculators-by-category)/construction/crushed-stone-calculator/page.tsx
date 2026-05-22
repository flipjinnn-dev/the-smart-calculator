import type { Metadata } from "next";
import { headers } from "next/headers";
import CrushedStoneCalculatorClient from "./crushed-stone-calculator-client";

export const metadata: Metadata = {
  title: "Crushed Stone Calculator – Yards & Tons Estimate",
  description:
    "Calculate crushed stone in cubic yards and tons instantly. Estimate material for driveways, patios, drainage, and shed bases fast.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/crushed-stone-calculator",
  },
};

export default async function CrushedStoneCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  let content = null;
  let guideContent = null;

  try {
    content = (
      await import(`@/app/content/calculator-ui/crushed-stone-calculator/${language}.json`)
    ).default;
  } catch {
    content = (
      await import(`@/app/content/calculator-ui/crushed-stone-calculator/en.json`)
    ).default;
  }

  try {
    guideContent = (
      await import(`@/app/content/calculator-guide/crushed-stone-calculator/${language}.json`)
    ).default;
  } catch {
    guideContent = (
      await import(`@/app/content/calculator-guide/crushed-stone-calculator/en.json`)
    ).default;
  }

  return <CrushedStoneCalculatorClient content={content} guideContent={guideContent} />;
}
