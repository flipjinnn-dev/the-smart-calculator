import UIFCalculatorClient from "./uif-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export default async function UIFCalculator() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("uif-calculator", language);
  return <UIFCalculatorClient content={content} />;
}
