import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
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

  const content = await loadCalculatorUiContent("pool-volume-calculator", language);
  const guideContent = await loadCalculatorGuideContent("pool-volume-calculator", language);

  return <PoolVolumeCalculatorClient content={content} guideContent={guideContent} />;
}
