import type { Metadata } from "next";

import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "uf-gpa-calculator";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function UfGpaCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
