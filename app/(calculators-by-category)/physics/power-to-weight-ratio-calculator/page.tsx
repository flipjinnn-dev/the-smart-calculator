import PowerToWeightRatioCalculatorClient from "./power-to-weight-ratio-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
} from "@/lib/calculator-page-runtime";


export default async function PowerToWeightRatioCalculator() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("power-to-weight-ratio-calculator", language);
  return <PowerToWeightRatioCalculatorClient content={content} />;
}
