import { headers } from "next/headers"
import BreakEvenCalculatorClient from "./break-even-calculator-client"

export default async function BreakEvenCalculatorPage() {
  const headersList = await headers()
  const language = headersList.get('x-language') || 'en'
  
  let content = null
  let guideContent = null
  
  try {
    content = (await import(`@/app/content/calculator-ui/break-even-calculator/${language}.json`)).default
  } catch {
    content = (await import(`@/app/content/calculator-ui/break-even-calculator/en.json`)).default
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/break-even-calculator/${language}.json`)).default
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/break-even-calculator/en.json`)).default
  }

  return <BreakEvenCalculatorClient uiContent={content} guideData={guideContent} />
}
