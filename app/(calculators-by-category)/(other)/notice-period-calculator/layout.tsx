import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
import { CalculatorLayoutShell } from "@/components/calculator-layout-shell";

const CALCULATOR_ID = "notice-period-calculator";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CalculatorLayoutShell calculatorId={CALCULATOR_ID}>
      {children}
    </CalculatorLayoutShell>
  );
}
