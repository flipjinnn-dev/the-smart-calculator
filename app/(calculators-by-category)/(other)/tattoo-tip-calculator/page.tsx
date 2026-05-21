import type { Metadata } from "next";
import { headers } from "next/headers";
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

  let content = null;
  let guideContent = null;

  try {
    content = (
      await import(`@/app/content/calculator-ui/tattoo-tip-calculator/${language}.json`)
    ).default;
  } catch {
    content = (
      await import(`@/app/content/calculator-ui/tattoo-tip-calculator/en.json`)
    ).default;
  }

  try {
    guideContent = (
      await import(`@/app/content/calculator-guide/tattoo-tip-calculator/${language}.json`)
    ).default;
  } catch {
    guideContent = (
      await import(`@/app/content/calculator-guide/tattoo-tip-calculator/en.json`)
    ).default;
  }

  return (
    <TattooTipCalculatorClient content={content} guideContent={guideContent} />
  );
}
