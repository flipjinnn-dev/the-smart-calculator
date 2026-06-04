import MortgageCalculatorClient from "./mortgage-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
} from "@/lib/calculator-page-runtime";


export default async function MortgageCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("mortgage-calculator", language);
  return <MortgageCalculatorClient content={content} />;
}
