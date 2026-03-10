  import type { Metadata } from "next";
  import { Briefcase, Calculator, Globe, CheckCircle2, AlertCircle, TrendingUp, Shield, FileText } from "lucide-react";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  import EndOfServiceCalculator from "@/components/end-of-service-calculator";
  import Link from "next/link";
  import { Button } from "@/components/ui/button";
  import { RatingProfileSection } from "@/components/rating-profile-section";
  import CalculatorGuide from "@/components/calculator-guide";
  import SimilarCalculators from "@/components/similar-calculators";

  export const metadata: Metadata = {
    title: "End of Service Calculator UAE, KSA & Qatar",
    description: "Calculate end of service benefits in UAE, KSA & Qatar. Accurate gratuity calculator based on salary, contract type and labor law.",
    keywords: "end of service calculator, gratuity calculator UAE, end of service benefits calculator, end of service calculator KSA, end of service calculator Dubai, end of service calculator Abu Dhabi, end of service gratuity calculator, end of service benefits calculator UAE, end of service benefits calculator KSA, end of service calculator Qatar",
    alternates: {
      canonical: "https://www.thesmartcalculator.com/end-of-service-calculator",
      languages: {
        'x-default': "https://www.thesmartcalculator.com/end-of-service-calculator",
        'en': "https://www.thesmartcalculator.com/end-of-service-calculator",
      }
    },
    openGraph: {
      title: "End of Service Calculator UAE, KSA & Qatar",
      description: "Calculate end of service benefits in UAE, KSA & Qatar. Accurate gratuity calculator based on salary, contract type and labor law.",
      type: "website",
      url: "https://www.thesmartcalculator.com/end-of-service-calculator",
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "End of Service Calculator UAE, KSA & Qatar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "End of Service Calculator UAE, KSA & Qatar",
      description: "Calculate end of service benefits in UAE, KSA & Qatar. Accurate gratuity calculator based on salary, contract type and labor law.",
      images: ["/og-image.png"],
    },
  };

  export default function EndOfServiceCalculatorPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-xl">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              End of Service Calculator – UAE, KSA & Qatar Gratuity Calculation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              An end of service calculator helps employees and employers accurately estimate gratuity or final settlement amounts based on labor laws in the UAE, Saudi Arabia (KSA), and Qatar. By entering your last basic salary, contract type, employment period, and termination reason, the tool automatically applies the correct legal formula to calculate your end of service benefits.
            </p>
          </div>

          {/* Calculator Component */}
          <div className="mb-16">
            <EndOfServiceCalculator />
          </div>
            {/* Rating and Profile Section */}
            <RatingProfileSection
              entityId="end-of-service-calculator"
              entityType="calculator"
              creatorSlug="aiden-asher"
              initialRatingTotal={0}
              initialRatingCount={0}
            />
            <SimilarCalculators calculators={[{
              calculatorName: "Height Calculator",
              calculatorHref: "/height-calculator",
              calculatorDescription: "Convert height between different units such as centimeters, meters, feet, and inches for medical, fitness, and general use"
            },
            ]}
              color="purple"
              title="Related Other Calculators" />
          {/* What Is Section */}
          <article className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="w-8 h-8 text-blue-600 mr-3" />
                What Is an End of Service Calculator?
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                An end of service calculator (also called an <strong>end of service benefit calculator</strong> or <strong>end of service gratuity calculator</strong>) is a digital tool designed to compute the legally required severance pay owed to an employee at the end of employment.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                It simplifies complex labor law provisions and ensures compliance with regulations in:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                  <Globe className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">United Arab Emirates</h3>
                  <p className="text-gray-600">Federal labor law compliance</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                  <Globe className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Saudi Arabia</h3>
                  <p className="text-gray-600">KSA labor law regulations</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
                  <Globe className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Qatar</h3>
                  <p className="text-gray-600">Qatar labor law standards</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                The calculator eliminates manual errors and provides transparent calculations for both employees and HR departments.
              </p>
            </div>
          </article>

          {/* How It Works Section */}
          <article className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
                How End of Service Calculation Works
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The end of service calculation depends on several legal and contractual factors:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Contract type (limited or unlimited)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Total years of service</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Last drawn basic salary</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Termination reason (resignation, employer termination, mutual agreement)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Country-specific labor law</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl mb-6">
                <h3 className="text-2xl font-bold mb-4">General Gratuity Formula</h3>
                <div className="space-y-3 text-lg">
                  <p><strong>Daily Wage</strong> = Basic Salary ÷ 30</p>
                  <p><strong>Gratuity</strong> = Daily Wage × Eligible Days × Years of Service</p>
                </div>
                <p className="mt-4 text-blue-100">Eligible days per year vary depending on country and service duration.</p>
              </div>
            </div>
          </article>

          {/* UAE Section */}
          <article className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-8 h-8 text-blue-600 mr-3" />
                End of Service Calculator UAE
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In the United Arab Emirates, gratuity is governed by <strong>Federal Decree-Law No. 33 of 2021</strong>.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">UAE Gratuity Rules</h3>
              
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Service Period</th>
                      <th className="px-6 py-4 text-left font-semibold">Gratuity Entitlement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-blue-50">
                      <td className="px-6 py-4">First 5 years</td>
                      <td className="px-6 py-4 font-semibold">21 days basic salary per year</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="px-6 py-4">After 5 years</td>
                      <td className="px-6 py-4 font-semibold">30 days basic salary per year</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="px-6 py-4">Maximum cap</td>
                      <td className="px-6 py-4 font-semibold text-red-600">2 years' total salary</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="px-6 py-4">Minimum service</td>
                      <td className="px-6 py-4 font-semibold">1 year continuous service required</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  The same rules apply in <strong>Dubai</strong> and <strong>Abu Dhabi</strong>. Therefore, an <strong>end of service calculator Dubai</strong> or <strong>end of service calculator Abu Dhabi</strong> follows the UAE federal framework.
                </p>
              </div>
            </div>
          </article>

          {/* KSA Section */}
          <article className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-8 h-8 text-purple-600 mr-3" />
                End of Service Calculator KSA (Saudi Arabia)
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In Saudi Arabia, gratuity is regulated under the <strong>Saudi Labor Law</strong>.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">KSA Gratuity Formula</h3>
              
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Service Period</th>
                      <th className="px-6 py-4 text-left font-semibold">Gratuity Entitlement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-purple-50">
                      <td className="px-6 py-4">First 5 years</td>
                      <td className="px-6 py-4 font-semibold">Half-month salary per year</td>
                    </tr>
                    <tr className="hover:bg-purple-50">
                      <td className="px-6 py-4">After 5 years</td>
                      <td className="px-6 py-4 font-semibold">One full month salary per year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Resignation Impact in KSA</h3>
              
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Years of Service</th>
                      <th className="px-6 py-4 text-left font-semibold">Gratuity Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-purple-50">
                      <td className="px-6 py-4">Less than 2 years</td>
                      <td className="px-6 py-4 font-semibold text-red-600">No gratuity</td>
                    </tr>
                    <tr className="hover:bg-purple-50">
                      <td className="px-6 py-4">2–5 years</td>
                      <td className="px-6 py-4 font-semibold">1/3 of gratuity</td>
                    </tr>
                    <tr className="hover:bg-purple-50">
                      <td className="px-6 py-4">5–10 years</td>
                      <td className="px-6 py-4 font-semibold">2/3 of gratuity</td>
                    </tr>
                    <tr className="hover:bg-purple-50">
                      <td className="px-6 py-4">10+ years</td>
                      <td className="px-6 py-4 font-semibold text-green-600">Full gratuity</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  Because resignation significantly affects payout, using an <strong>end of service benefits calculator KSA</strong> ensures accuracy.
                </p>
              </div>
            </div>
          </article>

          {/* Qatar Section */}
          <article className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                End of Service Calculator Qatar
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Under labor regulations in Qatar:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Requirement</th>
                      <th className="px-6 py-4 text-left font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-green-50">
                      <td className="px-6 py-4">Minimum service</td>
                      <td className="px-6 py-4 font-semibold">1 year required</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="px-6 py-4">Gratuity rate</td>
                      <td className="px-6 py-4 font-semibold">3 weeks basic salary per year of service</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="px-6 py-4">Employer flexibility</td>
                      <td className="px-6 py-4 font-semibold">May provide higher benefits but cannot go below legal minimum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>

          {/* Limited vs Unlimited Contracts */}
          <article className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-8 h-8 text-blue-600 mr-3" />
                Limited vs Unlimited Contracts
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Limited contracts have a fixed term, while unlimited contracts are open-ended.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                End of service benefits may differ depending on:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contract Factors</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Early termination conditions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Contract completion status</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Resignation timing</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Calculator Benefits</h3>
                  <p className="text-gray-700">
                    A reliable <strong>end of service benefit calculator</strong> accounts for these distinctions automatically.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Factors Affecting Benefits */}
          <article className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Factors That Affect End of Service Benefits
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Your final gratuity may change based on:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <AlertCircle className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Salary Basis</h3>
                  <p className="text-gray-700">Basic salary (not gross salary)</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl">
                  <AlertCircle className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Leave Impact</h3>
                  <p className="text-gray-700">Unpaid leave exclusions</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <AlertCircle className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Partial Years</h3>
                  <p className="text-gray-700">Partial year calculation</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl">
                  <AlertCircle className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Misconduct</h3>
                  <p className="text-gray-700">Termination under misconduct</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <AlertCircle className="w-8 h-8 text-yellow-600 mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Legal Changes</h3>
                  <p className="text-gray-700">Legal amendments</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-xl">
                  <AlertCircle className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Contract Status</h3>
                  <p className="text-gray-700">Contract completion</p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mt-8">
                <p className="text-lg text-gray-700">
                  Using a structured <strong>end of service benefits calculator UAE</strong> or <strong>KSA</strong> ensures compliance with these variables.
                </p>
              </div>
            </div>
          </article>

          {/* Why Use This Calculator */}
          <article className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Use an End of Service Gratuity Calculator?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-red-600 mb-4">Manual Calculations Can Result In:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Legal disputes</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Payroll errors</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Incorrect settlements</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Compliance risks</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-600 mb-4">A Professional Calculator Ensures:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Accurate legal formula application</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Instant results</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Transparent breakdown</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>HR efficiency</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* Who Should Use */}
          <article className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Who Should Use This Calculator?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-600">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Employees
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">Planning resignation or end of contract</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-600">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      HR Managers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">Processing employee settlements</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-100 hover:border-green-300 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-600">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Payroll Teams
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">Ensuring accurate calculations</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-100 hover:border-red-300 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-600">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Business Owners
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">Budgeting for employee benefits</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-yellow-100 hover:border-yellow-300 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center text-yellow-600">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Legal Advisors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">Verifying compliance and settlements</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-indigo-100 hover:border-indigo-300 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center text-indigo-600">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Recruitment Agencies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">Advising candidates on benefits</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </article>

          {/* FAQ Section */}
          <article className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Is end of service calculated on gross salary?</h3>
                  <p className="text-gray-700">No. In UAE, KSA, and Qatar, gratuity is calculated using <strong>basic salary only</strong>.</p>
                </div>

                <div className="border-l-4 border-purple-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Is gratuity mandatory?</h3>
                  <p className="text-gray-700">Yes, if the employee completes the minimum required service period under local labor law.</p>
                </div>

                <div className="border-l-4 border-green-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Does resignation reduce gratuity in Saudi Arabia?</h3>
                  <p className="text-gray-700">Yes, resignation reduces gratuity unless the employee completes 10 or more years.</p>
                </div>

                <div className="border-l-4 border-red-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Is Dubai gratuity different from Abu Dhabi?</h3>
                  <p className="text-gray-700">No. Both follow UAE federal labor law.</p>
                </div>

                <div className="border-l-4 border-yellow-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Can I calculate partial years?</h3>
                  <p className="text-gray-700">Yes. Most professional calculators include proportional calculations.</p>
                </div>

                <div className="border-l-4 border-indigo-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Is there a gratuity cap in UAE?</h3>
                  <p className="text-gray-700">Yes. It cannot exceed two years' salary.</p>
                </div>

                <div className="border-l-4 border-pink-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Does unpaid leave count?</h3>
                  <p className="text-gray-700">Unpaid leave is generally excluded from total service duration.</p>
                </div>

                <div className="border-l-4 border-teal-600 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Do limited contracts affect gratuity?</h3>
                  <p className="text-gray-700">Yes, early termination of limited contracts may impact settlement calculations.</p>
                </div>
              </div>
            </div>
          </article>

        </div>
      </div>
    );
  }
