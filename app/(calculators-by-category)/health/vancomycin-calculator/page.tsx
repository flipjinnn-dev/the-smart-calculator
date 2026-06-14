import VancomycinCalculatorClient from "./vancomycin-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
} from "@/lib/calculator-page-runtime";



export default async function VancomycinCalculator() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("vancomycin-calculator", language);
  return <VancomycinCalculatorClient content={content} />;
}
