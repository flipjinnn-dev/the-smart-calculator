import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"

export const metadata: Metadata = {
  title: "Terms of Service - Smart Calculator",
  description:
    "Read our terms of service to understand the rules and guidelines for using Smart Calculator's free online calculators.",
  keywords: "terms of service, terms and conditions, user agreement, smart calculator terms",
}

export default function TermsPage() {
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
                <p className="text-sm text-gray-500">Terms of Service</p>
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our calculator services.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2025</p>
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
                <h3 className="font-bold text-lg text-gray-900 mb-2">Free to Use</h3>
                <p className="text-gray-600 text-sm">
                  All our calculators are completely free for personal and commercial use
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Fair Use</h3>
                <p className="text-gray-600 text-sm">
                  Use our services responsibly and in accordance with applicable laws
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">No Warranty</h3>
                <p className="text-gray-600 text-sm">Calculators are provided "as is" without warranties of any kind</p>
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
                  <span>Acceptance of Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  By accessing and using Smart Calculator, you accept and agree to be bound by the terms and provision
                  of this agreement.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• You must be at least 13 years old to use our services</li>
                  <li>• You agree to use the service for lawful purposes only</li>
                  <li>• You understand that calculations are for informational purposes</li>
                  <li>• You will not attempt to disrupt or damage our services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Scale className="w-6 h-6 text-blue-600" />
                  <span>Use License</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Permission is granted to temporarily use Smart Calculator for personal and commercial purposes. This
                  is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Modify or copy the materials</li>
                  <li>• Use the materials for any commercial purpose without permission</li>
                  <li>• Attempt to reverse engineer any software</li>
                  <li>• Remove any copyright or proprietary notations</li>
                </ul>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-medium">
                    <strong>Permitted Uses:</strong> You may freely use our calculators for personal calculations,
                    business planning, educational purposes, and embed results in your own projects.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <span>Disclaimer</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="bg-red-50 p-4 rounded-lg mb-6">
                  <p className="text-red-800 font-medium">
                    <strong>Important:</strong> The calculations provided are for informational purposes only and should
                    not be considered as professional financial, medical, or legal advice.
                  </p>
                </div>
                <p className="text-gray-600 mb-4">
                  The materials on Smart Calculator are provided on an 'as is' basis. Smart Calculator makes no
                  warranties, expressed or implied, and hereby disclaims and negates all other warranties including
                  without limitation:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Implied warranties or conditions of merchantability</li>
                  <li>• Fitness for a particular purpose</li>
                  <li>• Non-infringement of intellectual property</li>
                  <li>• Accuracy, reliability, or completeness of calculations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <XCircle className="w-6 h-6 text-purple-600" />
                  <span>Limitations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  In no event shall Smart Calculator or its suppliers be liable for any damages (including, without
                  limitation, damages for loss of data or profit, or due to business interruption) arising out of the
                  use or inability to use Smart Calculator, even if Smart Calculator or an authorized representative has
                  been notified orally or in writing of the possibility of such damage.
                </p>
                <h4 className="font-semibold text-gray-900 mb-3">Service Availability</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
                  <li>• Maintenance windows may temporarily affect availability</li>
                  <li>• We reserve the right to modify or discontinue services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Info className="w-6 h-6 text-indigo-600" />
                  <span>User Conduct</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-600 mb-4">You agree not to use Smart Calculator to:</p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Violate any applicable laws or regulations</li>
                  <li>• Transmit harmful, offensive, or inappropriate content</li>
                  <li>• Attempt to gain unauthorized access to our systems</li>
                  <li>• Interfere with other users' ability to use the service</li>
                  <li>• Use automated tools to scrape or download content</li>
                  <li>• Impersonate any person or entity</li>
                </ul>
                <p className="text-gray-600">
                  Violation of these terms may result in immediate termination of your access to our services.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Modifications to Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Smart Calculator may revise these terms of service at any time without notice. By using this website,
                  you are agreeing to be bound by the then current version of these terms of service.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Changes will be posted on this page</li>
                  <li>• Continued use constitutes acceptance of new terms</li>
                  <li>• Major changes will be highlighted with effective dates</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>
                    Email:{" "}
                    <a href="mailto:legal@smartcalculator.com" className="text-blue-600 hover:text-blue-700">
                      legal@smartcalculator.com
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
