"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  const pathname = usePathname()
  const [language, setLanguage] = useState("en")
  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    // Detect language from URL
    const langMatch = pathname?.match(/^\/(br|pl|de|es)/)
    const detectedLang = langMatch ? langMatch[1] : "en"
    setLanguage(detectedLang)

    // Load content based on language
    const loadContent = async () => {
      try {
        const contentModule = await import(`@/app/content/pages/terms-and-conditions/${detectedLang}.json`)
        setContent(contentModule.default || contentModule)
      } catch (error) {
        console.error("Failed to load content:", error)
        // Fallback to English
        const fallbackContent = await import(`@/app/content/pages/terms-and-conditions/en.json`)
        setContent(fallbackContent.default || fallbackContent)
      }
    }

    loadContent()
  }, [pathname])

  if (!content) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>
  }

  const icons = [CheckCircle, Scale, AlertTriangle, Info, XCircle, AlertTriangle, XCircle, Info, FileText, Scale, Info]
  const iconColors = ["green", "blue", "orange", "purple", "red", "yellow", "red", "indigo", "green", "blue", "purple"]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
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

      {/* Terms Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Free Services</h3>
                <p className="text-gray-600 text-sm">
                  Free online calculators, tools, and resources for various calculations
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">User Responsibility</h3>
                <p className="text-gray-600 text-sm">
                  Verify results independently before use in professional decisions
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">No Guarantee</h3>
                <p className="text-gray-600 text-sm">Results provided "as is" without warranty of 100% accuracy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {content.sections && content.sections.map((section: any, index: number) => {
              const Icon = icons[index] || Info
              const iconColor = iconColors[index] || "blue"

              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Icon className={`w-6 h-6 text-${iconColor}-600`} />
                      <span>{section.number}. {section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {section.description && (
                      <div className={index === 4 ? "bg-red-50 p-4 rounded-lg mb-4" : ""}>
                        <p className={`text-gray-600 ${index === 4 ? "text-red-800 font-medium" : ""}`}>
                          {section.description}
                          {section.number === "8" && (
                            <>
                              {" "}
                              <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">
                                Privacy Policy
                              </Link>
                              , which explains how we collect, use, and protect your data.
                            </>
                          )}
                        </p>
                      </div>
                    )}

                    {section.items && (
                      <ul className={`space-y-3 text-gray-600 ${section.description ? 'mt-4' : ''}`}>
                        {section.items.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="flex items-start space-x-2">
                            <span className={`text-${iconColor}-600 mt-1`}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.contactEmail && (
                      <div className="flex items-center space-x-2 text-gray-600 mt-4">
                        <span>📧</span>
                        <a
                          href={`mailto:${section.contactEmail}`}
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          {section.contactEmail}
                        </a>
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
