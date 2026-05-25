import SoffitClient from "./soffit-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("soffit-calculator");
}

export default function SoffitCalculatorPage() {
  return <SoffitClient />
}
