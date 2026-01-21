import { headers } from "next/headers"
import YouTubeMoneyCalculatorClient from "./youtube-money-calculator-client"

export default async function YouTubeMoneyCalculatorPage() {
  const headersList = await headers()
  const language = headersList.get('x-language') || 'en'
  
  let uiContent = null
  let guideContent = null
  
  try {
    uiContent = (await import(`@/app/content/calculator-ui/youtube-money-calculator/${language}.json`)).default
  } catch {
    uiContent = (await import(`@/app/content/calculator-ui/youtube-money-calculator/en.json`)).default
  }

  try {
    guideContent = (await import(`@/app/content/calculator-guide/youtube-money-calculator/${language}.json`)).default
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/youtube-money-calculator/en.json`)).default
  }

  return <YouTubeMoneyCalculatorClient uiContent={uiContent} guideContent={guideContent} />
}
