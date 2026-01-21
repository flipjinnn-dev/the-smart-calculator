import { headers } from "next/headers"
import StartupCostsCalculatorClient from "./startup-costs-calculator-client"

export default async function StartupCostsCalculatorPage() {
  const headersList = await headers()
  const language = headersList.get('x-language') || 'en'
  
  let content = null
  let guideContent = null
  
  try {
    content = (await import(`@/app/content/calculator-ui/startup-costs-calculator/${language}.json`)).default
  } catch {
    content = (await import(`@/app/content/calculator-ui/startup-costs-calculator/en.json`)).default
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/startup-costs-calculator/${language}.json`)).default
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/startup-costs-calculator/en.json`)).default
  }

  return <StartupCostsCalculatorClient uiContent={content} guideData={guideContent} />
}
