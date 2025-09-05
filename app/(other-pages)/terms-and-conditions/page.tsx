import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Terms and Conditions - The Smart Calculator",
  description:
    "Read our terms and conditions to understand the rules and guidelines for using The Smart Calculator's free online calculators.",
  keywords: "terms and conditions, user agreement, smart calculator terms, terms of service",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms and Conditions - The Smart Calculator",
  description:
    "Read the Terms and Conditions of The Smart Calculator to understand the rules, disclaimers, and user responsibilities when using our free online calculators.",
  url: "https://www.thesmartcalculator.com/terms-and-conditions",
  mainEntity: {
    "@type": "Organization",
    name: "The Smart Calculator",
    url: "https://www.thesmartcalculator.com",
    logo: "https://www.thesmartcalculator.com/logo.png",
    sameAs: ["https://www.instagram.com/thesmartcalculators", "https://x.com/SmartCalculat0r"],
  },
}

export default function TermsPage() {
  return (
    <>
      <Script
        id="terms-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                    The Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Terms & Conditions</p>
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
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Welcome to The Smart Calculator. By accessing or using our website www.thesmartcalculator.com and its
              services, you agree to be bound by the following Terms & Conditions. Please read them carefully.
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
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span>1. Acceptance of Terms</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    By using our website, you confirm that you have read, understood, and agreed to these Terms. If you
                    do not agree, please do not use our services.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Scale className="w-6 h-6 text-blue-600" />
                    <span>2. Services Provided</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The Smart Calculator offers free online calculators, tools, and resources to assist users with
                    various calculations. We strive for accuracy but do not guarantee that all results are 100%
                    error-free.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    <span>3. User Responsibilities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>You agree to use our website for lawful purposes only.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>You shall not misuse, attempt to hack, or disrupt the functionality of the website.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>
                        You are responsible for ensuring that any results or data from our calculators are verified
                        independently before use in professional or financial decisions.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Info className="w-6 h-6 text-purple-600" />
                    <span>4. Intellectual Property Rights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>All content, tools, design, and branding of The Smart Calculator are owned by us.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        You may not copy, reproduce, or distribute our content without prior written permission.
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        You may share or link our calculators for personal and educational purposes, but commercial use
                        requires approval.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <span>5. Accuracy of Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <p className="text-red-800 font-medium">
                      While we aim to provide accurate and reliable calculators, results are provided "as is" without
                      warranty of correctness. The Smart Calculator shall not be held liable for any loss, damage, or
                      decision made based on our tools.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    <span>6. Third-Party Links</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our website may include links to third-party websites. We are not responsible for their content,
                    policies, or practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <span>7. Limitation of Liability</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600 mb-4">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>
                        The Smart Calculator is not liable for any direct, indirect, incidental, or consequential
                        damages arising from the use of our website.
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>
                        All tools are provided for informational and educational purposes only and should not be
                        considered professional advice.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Info className="w-6 h-6 text-indigo-600" />
                    <span>8. Privacy Policy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your use of this website is also governed by our{" "}
                    <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">
                      Privacy Policy
                    </Link>
                    , which explains how we collect, use, and protect your data.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-green-600" />
                    <span>9. Changes to Terms</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We may update these Terms & Conditions at any time. Changes will be posted on this page with the
                    updated date. Continued use of our website means you accept those changes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Scale className="w-6 h-6 text-blue-600" />
                    <span>10. Governing Law</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    These Terms & Conditions shall be governed by and construed under the laws of [Insert
                    Country/Region].
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Info className="w-6 h-6 text-purple-600" />
                    <span>11. Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    For questions or concerns about these Terms, please contact us at:
                  </p>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span>📧</span>
                    <a
                      href="mailto:thesmartcalculators@gmail.com"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      thesmartcalculators@gmail.com
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
