import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Eye, Lock, UserCheck, Database, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"

export const metadata: Metadata = {
  title: "Privacy Policy - Smart Calculator",
  description:
    "Learn how Smart Calculator protects your privacy and handles your data. We are committed to transparency and user privacy.",
  keywords: "privacy policy, data protection, user privacy, smart calculator privacy",
}

export default function PrivacyPage() {
  return (
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
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2025</p>
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
                <h3 className="font-bold text-lg text-gray-900 mb-2">No Personal Data Storage</h3>
                <p className="text-gray-600 text-sm">We don't store your calculation data or personal information</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Secure Browsing</h3>
                <p className="text-gray-600 text-sm">All calculations are performed locally in your browser</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Transparent Practices</h3>
                <p className="text-gray-600 text-sm">Clear information about what data we collect and why</p>
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
                  <span>Information We Collect</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h4 className="font-semibold text-gray-900 mb-3">Automatically Collected Information</h4>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Browser type and version</li>
                  <li>• Operating system</li>
                  <li>• IP address (anonymized)</li>
                  <li>• Pages visited and time spent</li>
                  <li>• Referring website</li>
                </ul>

                <h4 className="font-semibold text-gray-900 mb-3">Information You Provide</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Contact form submissions</li>
                  <li>• Email address (only when you contact us)</li>
                  <li>• Feedback and suggestions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-green-600" />
                  <span>How We Use Your Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-600 mb-4">We use the collected information for the following purposes:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• To provide and maintain our calculator services</li>
                  <li>• To improve user experience and website functionality</li>
                  <li>• To analyze usage patterns and optimize performance</li>
                  <li>• To respond to your inquiries and provide customer support</li>
                  <li>• To detect and prevent fraud or abuse</li>
                  <li>• To comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Lock className="w-6 h-6 text-purple-600" />
                  <span>Data Protection & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  We implement appropriate security measures to protect your information:
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• SSL encryption for all data transmission</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Limited access to personal information</li>
                  <li>• Secure servers and data centers</li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-medium">
                    <strong>Important:</strong> All calculator inputs and results are processed locally in your browser
                    and are never transmitted to our servers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Eye className="w-6 h-6 text-red-600" />
                  <span>Cookies & Tracking</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h4 className="font-semibold text-gray-900 mb-3">Types of Cookies We Use</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900">Essential Cookies</h5>
                    <p className="text-gray-600 text-sm">Required for basic website functionality</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Analytics Cookies</h5>
                    <p className="text-gray-600 text-sm">Help us understand how visitors use our website</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Preference Cookies</h5>
                    <p className="text-gray-600 text-sm">Remember your settings and preferences</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your Rights & Choices</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-600 mb-4">You have the following rights regarding your personal information:</p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>
                    • <strong>Access:</strong> Request a copy of your personal data
                  </li>
                  <li>
                    • <strong>Correction:</strong> Request correction of inaccurate data
                  </li>
                  <li>
                    • <strong>Deletion:</strong> Request deletion of your personal data
                  </li>
                  <li>
                    • <strong>Portability:</strong> Request transfer of your data
                  </li>
                  <li>
                    • <strong>Objection:</strong> Object to processing of your data
                  </li>
                </ul>

                <p className="text-gray-600">
                  To exercise these rights, please contact us at{" "}
                  <a href="mailto:privacy@smartcalculator.com" className="text-blue-600 hover:text-blue-700">
                    privacy@smartcalculator.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>
                    Email:{" "}
                    <a href="mailto:privacy@smartcalculator.com" className="text-blue-600 hover:text-blue-700">
                      privacy@smartcalculator.com
                    </a>
                  </p>
                  <p>
                    Website:{" "}
                    <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                      Contact Form
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}
