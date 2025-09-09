"use client"
import Link from "next/link"
import { Mail, MessageCircle, Clock, Users, Bug, Lightbulb, Handshake, Instagram, Twitter, Youtube } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us - Smart Calculator"
        description="Get in touch with the Smart Calculator team. Contact us for support, feedback, or partnership opportunities."
        slug="/contact-us"
        keywords="contact smart calculator, support, feedback, calculator help"
      />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Contact Us</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us – The Smart Calculator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At The Smart Calculator, we value your feedback, questions, and suggestions. Whether you're facing an
              issue with one of our calculators, have a feature request, or simply want to share your experience, our
              team is here to listen.
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
                    <span>How You Can Reach Us</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                      <p className="text-gray-600 mb-3">
                        For general inquiries, technical support, or partnership opportunities, reach us at:
                      </p>
                      <a
                        href="mailto:thesmartcalculators@gmail.com"
                        className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-lg"
                      >
                        thesmartcalculators@gmail.com
                      </a>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Website Feedback</h3>
                      <p className="text-gray-600 mb-3">
                        Found a bug or calculation error? Please let us know via our feedback form so we can fix it
                        quickly and improve your experience, reach us at:
                      </p>
                      <a
                        href="mailto:thesmartcalculators@gmail.com"
                        className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-lg"
                      >
                        thesmartcalculators@gmail.com
                      </a>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Business & Collaboration</h3>
                      <p className="text-gray-600 mb-3">
                        If you're interested in collaborations, embedding our calculators, or advertising opportunities,
                        reach us at:
                      </p>
                      <a
                        href="mailto:thesmartcalculators@gmail.com"
                        className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-lg"
                      >
                        thesmartcalculators@gmail.com
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
                    <span>Response Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    We aim to reply to all inquiries within <strong>24–48 business hours</strong>. For urgent issues,
                    please mark your email as <strong>"High Priority"</strong> in the subject line.
                  </p>
                </CardContent>
              </Card>

              {/* Why Contact Us */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r py-6 from-purple-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center space-x-3">
                    <Users className="w-8 h-8 text-purple-600" />
                    <span>Why Contact Us?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <Bug className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Report bugs or incorrect calculations</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Suggest new calculator ideas</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Get help with using our tools</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Handshake className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Discuss business partnerships and collaborations</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stay Connected */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r py-6 from-indigo-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="text-2xl">Stay Connected</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-600 text-lg mb-6">
                    Follow us on social media to stay updated about new calculators and features:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a
                      href="https://www.instagram.com/thesmartcalculators/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      <Instagram className="w-6 h-6" />
                      <span className="font-semibold">Instagram</span>
                    </a>
                    <a
                      href="https://x.com/SmartCalculat0r"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      <Twitter className="w-6 h-6" />
                      <span className="font-semibold">Twitter/X</span>
                    </a>
                    <a
                      href="https://www.pinterest.com/thesmartcalculators/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.713-1.227s.179.179.566.179c1.074 0 1.794-.956 1.794-2.236 0-1.928-1.148-3.759-2.666-3.759-.943 0-1.794.465-1.794 1.227 0 .465.179.956.465 1.227.107.107.179.286.107.465-.107.286-.465.956-.572 1.227-.179.465-.465.465-.572.179-.465-.465-.751-1.227-.751-2.236 0-2.236 1.688-4.294 4.759-4.294 2.594 0 4.294 1.794 4.294 4.115 0 2.773-1.227 4.937-3.044 4.937z" />
                      </svg>
                      <span className="font-semibold">Pinterest</span>
                    </a>
                    <a
                      href="https://www.youtube.com/@TheSmartCalculators"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      <Youtube className="w-6 h-6" />
                      <span className="font-semibold">YouTube</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
