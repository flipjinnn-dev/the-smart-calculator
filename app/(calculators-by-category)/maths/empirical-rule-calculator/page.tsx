import EmpiricalRuleCalculatorClient from "./empirical-rule-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
} from "@/lib/calculator-page-runtime";


export default async function EmpiricalRuleCalculator() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("empirical-rule-calculator", language);
  return <EmpiricalRuleCalculatorClient content={content} />;
}
