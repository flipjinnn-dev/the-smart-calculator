import { headers } from "next/headers"
import Link from "next/link"
import { Mail, MessageCircle, Clock, Users, Bug, Lightbulb, Handshake, Instagram, Twitter, Youtube } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Language = "en" | "br" | "pl" | "de" | "es"

async function getContent(language: Language) {
  try {
    const content = await import(`@/app/content/pages/contact-us/${language}.json`)
    return content.default || content
  } catch (error) {
    console.error("Failed to load content:", error)
    const fallbackContent = await import(`@/app/content/pages/contact-us/en.json`)
    return fallbackContent.default || fallbackContent
  }
}

export default async function ContactPage() {
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
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{content.heroTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.heroDescription}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* How You Can Reach Us */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r py-6 from-blue-50 to-purple-50 rounded-t-lg">
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <Mail className="w-8 h-8 text-blue-600" />
                  <span>{content.reachUsTitle}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.emailSupportTitle}</h3>
                    <p className="text-gray-600 mb-3">
                      {content.emailSupportDescription}
                    </p>
                    <a
                      href={`mailto:${content.emailAddress}`}
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-lg"
                    >
                      {content.emailAddress}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.websiteFeedbackTitle}</h3>
                    <p className="text-gray-600 mb-3">
                      {content.websiteFeedbackDescription}
                    </p>
                    <a
                      href={`mailto:${content.emailAddress}`}
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-lg"
                    >
                      {content.emailAddress}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.businessCollaborationTitle}</h3>
                    <p className="text-gray-600 mb-3">
                      {content.businessCollaborationDescription}
                    </p>
                    <a
                      href={`mailto:${content.emailAddress}`}
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-lg"
                    >
                      {content.emailAddress}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r py-6 from-green-50 to-blue-50 rounded-t-lg">
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-green-600" />
                  <span>{content.responseTimeTitle}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 text-lg leading-relaxed" dangerouslySetInnerHTML={{
                  __html: content.responseTimeDescription.replace(/24–48 business hours/g, '<strong>24–48 business hours</strong>').replace(/"High Priority"/g, '<strong>"High Priority"</strong>')
                }} />
              </CardContent>
            </Card>

            {/* Why Contact Us */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r py-6 from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <Users className="w-8 h-8 text-purple-600" />
                  <span>{content.whyContactTitle}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.whyContactItems && content.whyContactItems.map((item: string, index: number) => {
                    const icons = [Bug, Lightbulb, MessageCircle, Handshake]
                    const colors = ["text-red-500", "text-yellow-500", "text-blue-500", "text-green-500"]
                    const Icon = icons[index] || MessageCircle
                    const colorClass = colors[index] || "text-blue-500"

                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <Icon className={`w-6 h-6 ${colorClass} mt-1 flex-shrink-0`} />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Stay Connected */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r py-6 from-indigo-50 to-purple-50 rounded-t-lg">
                <CardTitle className="text-2xl">{content.socialMediaTitle}</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 text-lg mb-6">
                  {content.socialMediaDescription}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {content.socialLinks && (
                    <>
                      <a
                        href={content.socialLinks.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        <Instagram className="w-6 h-6" />
                        <span className="font-semibold">{content.socialLinks.instagram.name}</span>
                      </a>
                      <a
                        href={content.socialLinks.twitter.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        <Twitter className="w-6 h-6" />
                        <span className="font-semibold">{content.socialLinks.twitter.name}</span>
                      </a>
                      <a
                        href={content.socialLinks.pinterest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.713-1.227s.179.179.566.179c1.074 0 1.794-.956 1.794-2.236 0-1.928-1.148-3.759-2.666-3.759-.943 0-1.794.465-1.794 1.227 0 .465.179.956.465 1.227.107.107.179.286.107.465-.107.286-.465.956-.572 1.227-.179.465-.465.465-.572.179-.465-.465-.751-1.227-.751-2.236 0-2.236 1.688-4.294 4.759-4.294 2.594 0 4.294 1.794 4.294 4.115 0 2.773-1.227 4.937-3.044 4.937z" />
                        </svg>
                        <span className="font-semibold">{content.socialLinks.pinterest.name}</span>
                      </a>
                      <a
                        href={content.socialLinks.youtube.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        <Youtube className="w-6 h-6" />
                        <span className="font-semibold">{content.socialLinks.youtube.name}</span>
                      </a>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
