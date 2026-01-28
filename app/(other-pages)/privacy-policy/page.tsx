import { headers } from "next/headers"
import Link from "next/link"
import { Shield, Eye, Lock, UserCheck, Database, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Language = "en" | "br" | "pl" | "de" | "es"

async function getContent(language: Language) {
  try {
    const content = await import(`@/app/content/pages/privacy-policy/${language}.json`)
    return content.default || content
  } catch (error) {
    console.error("Failed to load content:", error)
    const fallbackContent = await import(`@/app/content/pages/privacy-policy/en.json`)
    return fallbackContent.default || fallbackContent
  }
}

export default async function PrivacyPolicyPage() {
  const headerList = await headers()
  const langHeader = headerList.get("x-language")
  const language: Language = (langHeader && ["en", "br", "pl", "de", "es"].includes(langHeader)) ? langHeader as Language : "en"
  
  const content = await getContent(language)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{content.heroTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.heroDescription}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            {content.heroDisclaimer}
          </p>
        </div>
      </section>

      {/* Privacy Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {content.overviewItems && content.overviewItems.map((item: any, index: number) => {
              const icons = [UserCheck, Lock, Eye]
              const colors = ["green", "blue", "purple"]
              const Icon = icons[index] || Shield
              const color = colors[index] || "blue"

              return (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-6 h-6 text-${color}-600`} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {content.sections && content.sections.map((section: any, index: number) => {
              const icons = [Database, Globe, Lock, Eye, null, null, null, null, null]
              const iconColors = ["blue", "green", "purple", "red", "blue", "blue", "blue", "blue", "blue"]
              const Icon = icons[index]
              const iconColor = iconColors[index] || "blue"

              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      {Icon && <Icon className={`w-6 h-6 text-${iconColor}-600`} />}
                      <span>{section.number}. {section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    {section.description && (
                      <p className="text-gray-600 mb-4">{section.description}</p>
                    )}

                    {section.subsections && section.subsections.map((subsection: any, subIndex: number) => (
                      <div key={subIndex}>
                        <h4 className="font-semibold text-gray-900 mb-3">{subsection.title}</h4>
                        <ul className="space-y-2 text-gray-600 mb-6">
                          {subsection.items.map((item: string, itemIndex: number) => (
                            <li key={itemIndex}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {section.items && (
                      <ul className="space-y-2 text-gray-600">
                        {section.items.map((item: string, itemIndex: number) => (
                          <li key={itemIndex}>• {item}</li>
                        ))}
                      </ul>
                    )}

                    {section.footer && (
                      <p className="text-gray-600 mt-4">
                        {section.footer.includes('thesmartcalculators@gmail.com') ? (
                          <>
                            {section.footer.split('thesmartcalculators@gmail.com')[0]}
                            <a href="mailto:thesmartcalculators@gmail.com" className="text-blue-600 hover:text-blue-700">
                              thesmartcalculators@gmail.com
                            </a>
                          </>
                        ) : section.footer}
                      </p>
                    )}

                    {section.contactInfo && (
                      <div className="space-y-2 text-gray-600 mt-4">
                        <p className="flex items-center space-x-2">
                          <span>📧</span>
                          <a href={`mailto:${section.contactInfo.email}`} className="text-blue-600 hover:text-blue-700">
                            {section.contactInfo.email}
                          </a>
                        </p>
                        <p className="flex items-center space-x-2">
                          <span>🌐</span>
                          <a href={section.contactInfo.website} className="text-blue-600 hover:text-blue-700">
                            {section.contactInfo.website}
                          </a>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
