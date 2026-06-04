import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
import NoticePeriodCalculatorClient from "./notice-period-calculator-client";



export default function NoticePeriodCalculatorPage() {
  return <NoticePeriodCalculatorClient />;
}
