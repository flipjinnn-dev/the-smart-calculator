import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "sourdough-calculator";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function SourdoughCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
