import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
import NoticePeriodCalculatorClient from "./notice-period-calculator-client";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("notice-period-calculator");
}

export default function NoticePeriodCalculatorPage() {
  return <NoticePeriodCalculatorClient />;
}
