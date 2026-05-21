import type { Metadata } from "next";
import { headers } from "next/headers";
import PoolVolumeCalculatorClient from "./pool-volume-calculator-client";

export const metadata: Metadata = {
  title: "Pool Volume Calculator | Calculate Gallons & Litres",
  description:
    "Calculate pool volume in gallons, litres, and m³ instantly. Use our pool volume calculator for rectangular, round, oval, and kidney pools.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/pool-volume-calculator",
  },
};

export default async function PoolVolumeCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  let content = null;
  let guideContent = null;

  try {
    content = (
      await import(`@/app/content/calculator-ui/pool-volume-calculator/${language}.json`)
    ).default;
  } catch {
    content = (
      await import(`@/app/content/calculator-ui/pool-volume-calculator/en.json`)
    ).default;
  }

  try {
    guideContent = (
      await import(`@/app/content/calculator-guide/pool-volume-calculator/${language}.json`)
    ).default;
  } catch {
    guideContent = (
      await import(`@/app/content/calculator-guide/pool-volume-calculator/en.json`)
    ).default;
  }

  return <PoolVolumeCalculatorClient content={content} guideContent={guideContent} />;
}
