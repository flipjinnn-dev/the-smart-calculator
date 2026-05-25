import BloxFruitsClient from "./blox-fruits-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("blox-fruits-wheel");
}

export default function BloxFruitsWheelPage() {
  return <BloxFruitsClient />
}
