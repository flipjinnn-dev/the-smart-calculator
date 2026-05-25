import VancomycinCalculatorClient from "./vancomycin-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export default async function VancomycinCalculator() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("vancomycin-calculator", language);
  return <VancomycinCalculatorClient content={content} />;
}
