import { headers } from "next/headers"
import AppCostCalculatorClient from "./app-cost-calculator-client"

export default async function AppCostCalculatorPage() {
  const headersList = await headers()
  const language = headersList.get('x-language') || 'en'
  
  let uiContent = null
  let guideContent = null
  
  try {
    uiContent = (await import(`@/app/content/calculator-ui/app-cost-calculator/${language}.json`)).default
  } catch {
    uiContent = (await import(`@/app/content/calculator-ui/app-cost-calculator/en.json`)).default
  }

  try {
    guideContent = (await import(`@/app/content/calculator-guide/app-cost-calculator/${language}.json`)).default
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/app-cost-calculator/en.json`)).default
  }

  return <AppCostCalculatorClient uiContent={uiContent} guideContent={guideContent} />
}
