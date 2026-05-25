import KiteClient from "./kite-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("kite-size-calculator");
}

export default function KiteSizeCalculatorPage() {
  return <KiteClient />
}
