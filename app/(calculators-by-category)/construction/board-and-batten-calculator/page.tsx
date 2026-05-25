import BoardAndBattenCalculatorClient from "./board-and-batten-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export default async function BoardAndBattenCalculator() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("board-and-batten-calculator", language);
  return <BoardAndBattenCalculatorClient content={content} />;
}
