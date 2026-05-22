import type { Metadata } from "next";
import { headers } from "next/headers";
import ElectricityBillCalculatorClient from "./electricity-bill-calculator-client";

export const metadata: Metadata = {
  title: "Electricity Bill Calculator | Calculate Cost by kWh",
  description:
    "Calculate your electricity bill instantly using kWh, wattage, and usage hours. Free electricity cost calculator for home and business use.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/electricity-bill-calculator",
  },
};

export default async function ElectricityBillCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  let content = null;
  let guideContent = null;

  try {
    content = (
      await import(`@/app/content/calculator-ui/electricity-bill-calculator/${language}.json`)
    ).default;
  } catch {
    content = (
      await import(`@/app/content/calculator-ui/electricity-bill-calculator/en.json`)
    ).default;
  }

  try {
    guideContent = (
      await import(`@/app/content/calculator-guide/electricity-bill-calculator/${language}.json`)
    ).default;
  } catch {
    guideContent = (
      await import(`@/app/content/calculator-guide/electricity-bill-calculator/en.json`)
    ).default;
  }

  return (
    <ElectricityBillCalculatorClient content={content} guideContent={guideContent} />
  );
}
