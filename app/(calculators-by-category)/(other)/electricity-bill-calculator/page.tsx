import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
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

  const content = await loadCalculatorUiContent("electricity-bill-calculator", language);
  const guideContent = await loadCalculatorGuideContent("electricity-bill-calculator", language);

  return (
    <ElectricityBillCalculatorClient content={content} guideContent={guideContent} />
  );
}
