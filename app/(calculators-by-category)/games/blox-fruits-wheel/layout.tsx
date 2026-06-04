import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "blox-fruits-wheel";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function BloxFruitsWheelLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
