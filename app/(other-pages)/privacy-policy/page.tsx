import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Eye, Lock, UserCheck, Database, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Privacy Policy - The Smart Calculator",
  description:
    "Learn how The Smart Calculator protects your privacy and handles your data. We are committed to transparency and user privacy.",
  keywords: "privacy policy, data protection, user privacy, smart calculator privacy",
  alternates: {
      canonical: "https://www.thesmartcalculator.com/privacy-policy",
    },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy - The Smart Calculator",
  description:
    "This Privacy Policy explains how The Smart Calculator collects, uses, and safeguards your information when using our free online calculators.",
  url: "https://www.thesmartcalculator.com/privacy-policy",
  mainEntity: {
    "@type": "Organization",
    name: "The Smart Calculator",
    url: "https://www.thesmartcalculator.com",
    logo: "https://www.thesmartcalculator.com/logo.png",
    sameAs: ["https://www.instagram.com/thesmartcalculators", "https://x.com/SmartCalculat0r"],
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Script
        id="privacy-jsonld"
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
                  <p className="text-sm text-gray-500">Privacy Policy</p>
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
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At The Smart Calculator, your privacy is important to us. This Privacy Policy explains how we collect,
              use, and protect your personal information when you use our website and our free online calculators.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              By accessing or using our website, you agree to the practices described in this policy.
            </p>
          </div>
        </section>

        {/* Privacy Overview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">SSL Encryption</h3>
                  <p className="text-gray-600 text-sm">
                    We use SSL encryption to protect data transmitted via our website
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">No Data Selling</h3>
                  <p className="text-gray-600 text-sm">
                    We do not sell, rent, or trade your personal information with third parties
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Restricted Access</h3>
                  <p className="text-gray-600 text-sm">
                    Access to personal data is restricted to authorized team members only
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Database className="w-6 h-6 text-blue-600" />
                    <span>1. Information We Collect</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-gray-600 mb-4">
                    When you use our website, we may collect the following types of information:
                  </p>

                  <h4 className="font-semibold text-gray-900 mb-3">Personal Information (Optional):</h4>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li>
                      • Name, email address, or contact details (only if you choose to contact us via our form or email)
                    </li>
                  </ul>

                  <h4 className="font-semibold text-gray-900 mb-3">
                    Non-Personal Information (Automatically Collected):
                  </h4>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li>• Device type, browser type, IP address, operating system</li>
                    <li>• Pages visited, time spent, and general usage data for analytics</li>
                  </ul>

                  <h4 className="font-semibold text-gray-900 mb-3">Cookies & Tracking:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• We use cookies to enhance your browsing experience and to analyze website performance</li>
                    <li>• You can disable cookies in your browser settings at any time</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Globe className="w-6 h-6 text-green-600" />
                    <span>2. How We Use Your Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-gray-600 mb-4">We use collected information to:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Improve our calculators and website functionality</li>
                    <li>• Provide better customer support and respond to your inquiries</li>
                    <li>• Analyze usage patterns and optimize user experience</li>
                    <li>• Ensure website security and prevent misuse</li>
                    <li>• Share updates, newsletters, or promotional content (only if you subscribe)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Lock className="w-6 h-6 text-purple-600" />
                    <span>3. Data Protection & Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-gray-600 mb-4">
                    We take your privacy seriously and implement appropriate measures to safeguard your data.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• SSL encryption is used to protect data transmitted via our website</li>
                    <li>• We do not sell, rent, or trade your personal information with third parties</li>
                    <li>• Access to personal data is restricted to authorized team members only</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Eye className="w-6 h-6 text-red-600" />
                    <span>4. Sharing of Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      • We may share non-personal, aggregated data with trusted third-party service providers (e.g.,
                      analytics tools like Google Analytics) to improve website performance
                    </li>
                    <li>• We do not sell or disclose personal data to advertisers or unauthorized parties</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>5. Third-Party Links</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-gray-600">
                    Our website may contain links to third-party websites. We are not responsible for their privacy
                    practices. Please review their privacy policies before providing personal information.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>6. Your Rights</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-gray-600 mb-4">Depending on your location, you may have the right to:</p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li>• Access the personal data we hold about you</li>
                    <li>• Request corrections or deletion of your information</li>
                    <li>• Opt out of cookies or marketing communications</li>
                  </ul>

                  <p className="text-gray-600">
                    To exercise these rights, please contact us at:{" "}
                    <a href="mailto:thesmartcalculators@gmail.com" className="text-blue-600 hover:text-blue-700">
                      thesmartcalculators@gmail.com
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>7. Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-gray-600">
                    Our website and calculators are not intended for children under 13 years of age. We do not knowingly
                    collect personal data from children.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>8. Updates to This Policy</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-gray-600">
                    We may update this Privacy Policy from time to time to reflect changes in technology, law, or our
                    services. The updated policy will always be posted on this page with the revised date.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>9. Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about this Privacy Policy or how your information is handled, please
                    contact us:
                  </p>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center space-x-2">
                      <span>📧</span>
                      <a href="mailto:thesmartcalculators@gmail.com" className="text-blue-600 hover:text-blue-700">
                        thesmartcalculators@gmail.com
                      </a>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span>🌐</span>
                      <a href="https://www.thesmartcalculator.com/" className="text-blue-600 hover:text-blue-700">
                        https://www.thesmartcalculator.com/
                      </a>
                    </p>
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
