import CartoonCharacterWheelClient from './cartoon-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("cartoon-character-wheel");
}

export default function CartoonCharacterWheelPage() {
  return <CartoonCharacterWheelClient />
}
