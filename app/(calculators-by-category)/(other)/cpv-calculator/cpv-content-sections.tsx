"use client"

import { CheckCircle } from "lucide-react"

export function CPVFormula() {
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
      <p className="text-gray-700 leading-relaxed">
        The CPV calculation formula is straightforward. You only need two numbers: your total ad spend and your total number of views.
      </p>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">CPV Calculation Formula</h3>
        <div className="bg-white rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            CPV = Total Amount Spent ÷ Total Number of Views
          </div>
          <div className="text-lg text-gray-600">Or written as:</div>
          <div className="text-2xl font-bold text-green-600 mt-2">
            CPV = Ad Spend / Views
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">CPV Formula Example</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border-2 border-blue-300 p-3 text-left font-semibold">Variable</th>
                <th className="border-2 border-blue-300 p-3 text-left font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border-2 border-blue-200 p-3">Total Ad Spend</td>
                <td className="border-2 border-blue-200 p-3 font-semibold">$1,000</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border-2 border-blue-200 p-3">Total Views</td>
                <td className="border-2 border-blue-200 p-3 font-semibold">25,000</td>
              </tr>
              <tr className="bg-green-50">
                <td className="border-2 border-green-300 p-3 font-bold">CPV Result</td>
                <td className="border-2 border-green-300 p-3 font-bold text-green-600">$0.04</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 mt-4">
          This means you paid $0.04 per view or 4 cents every time someone watched your video ad.
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
        <p className="text-gray-700 leading-relaxed mb-4">
          You can also rearrange the formula to solve for other variables:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-100">
                <th className="border-2 border-purple-300 p-3 text-left font-semibold">You Want to Find</th>
                <th className="border-2 border-purple-300 p-3 text-left font-semibold">Formula</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border-2 border-purple-200 p-3">CPV</td>
                <td className="border-2 border-purple-200 p-3 font-mono">Ad Spend ÷ Views</td>
              </tr>
              <tr className="bg-purple-50">
                <td className="border-2 border-purple-200 p-3">Total Views</td>
                <td className="border-2 border-purple-200 p-3 font-mono">Ad Spend ÷ CPV</td>
              </tr>
              <tr className="bg-white">
                <td className="border-2 border-purple-200 p-3">Required Ad Spend</td>
                <td className="border-2 border-purple-200 p-3 font-mono">CPV × Views</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 mt-4">
          This flexibility makes the CPV calculator formula essential for campaign planning, not just reporting.
        </p>
      </div>
    </div>
  )
}

export function IndustryBenchmarks() {
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
      <p className="text-gray-700 leading-relaxed">
        Knowing the average CPV in your industry helps you judge whether your campaigns are efficient or overspending. These benchmarks represent typical ranges based on Google Ads and YouTube advertising data.
      </p>

      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Average CPV by Industry</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-100">
                <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Industry</th>
                <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Average CPV Range</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border-2 border-indigo-200 p-3">Retail & eCommerce</td>
                <td className="border-2 border-indigo-200 p-3 font-semibold">$0.03 – $0.08</td>
              </tr>
              <tr className="bg-indigo-50">
                <td className="border-2 border-indigo-200 p-3">Finance & Insurance</td>
                <td className="border-2 border-indigo-200 p-3 font-semibold">$0.10 – $0.30</td>
              </tr>
              <tr className="bg-white">
                <td className="border-2 border-indigo-200 p-3">Technology & Software</td>
                <td className="border-2 border-indigo-200 p-3 font-semibold">$0.05 – $0.15</td>
              </tr>
              <tr className="bg-indigo-50">
                <td className="border-2 border-indigo-200 p-3">Healthcare</td>
                <td className="border-2 border-indigo-200 p-3 font-semibold">$0.08 – $0.20</td>
              </tr>
              <tr className="bg-white">
                <td className="border-2 border-indigo-200 p-3">Education & eLearning</td>
                <td className="border-2 border-indigo-200 p-3 font-semibold">$0.03 – $0.07</td>
              </tr>
              <tr className="bg-indigo-50">
                <td className="border-2 border-indigo-200 p-3">Travel & Hospitality</td>
                <td className="border-2 border-indigo-200 p-3 font-semibold">$0.04 – $0.10</td>
              </tr>
              <tr className="bg-white">
                <td className="border-2 border-indigo-200 p-3">Food & Beverage</td>
                <td className="border-2 border-indigo-200 p-3 font-semibold">$0.02 – $0.06</td>
              </tr>
              <tr className="bg-indigo-50">
                <td className="border-2 border-indigo-200 p-3">Automotive</td>
                <td className="border-2 border-indigo-200 p-3 font-semibold">$0.06 – $0.18</td>
              </tr>
              <tr className="bg-white">
                <td className="border-2 border-indigo-200 p-3">B2B Services</td>
                <td className="border-2 border-indigo-200 p-3 font-semibold">$0.10 – $0.25</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 mt-4">
          General YouTube average CPV across all industries falls between $0.03 and $0.30, with most campaigns averaging around $0.05 to $0.10.
        </p>
        <p className="text-gray-700 mt-2">
          Highly competitive niches like finance and insurance naturally produce higher CPVs because more advertisers bid for the same audience.
        </p>
      </div>
    </div>
  )
}

export function CPVComparison() {
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
      <p className="text-gray-700 leading-relaxed">
        Understanding how CPV compares to other ad pricing models helps you choose the right strategy for your campaign goals.
      </p>

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Comparison Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100">
                <th className="border-2 border-orange-300 p-3 text-left font-semibold">Metric</th>
                <th className="border-2 border-orange-300 p-3 text-left font-semibold">Full Name</th>
                <th className="border-2 border-orange-300 p-3 text-left font-semibold">You Pay When</th>
                <th className="border-2 border-orange-300 p-3 text-left font-semibold">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border-2 border-orange-200 p-3 font-semibold">CPV</td>
                <td className="border-2 border-orange-200 p-3">Cost Per View</td>
                <td className="border-2 border-orange-200 p-3">Someone watches 30+ seconds</td>
                <td className="border-2 border-orange-200 p-3">Video brand awareness, engagement</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border-2 border-orange-200 p-3 font-semibold">CPC</td>
                <td className="border-2 border-orange-200 p-3">Cost Per Click</td>
                <td className="border-2 border-orange-200 p-3">Someone clicks your ad</td>
                <td className="border-2 border-orange-200 p-3">Traffic, leads, conversions</td>
              </tr>
              <tr className="bg-white">
                <td className="border-2 border-orange-200 p-3 font-semibold">CPM</td>
                <td className="border-2 border-orange-200 p-3">Cost Per Mille</td>
                <td className="border-2 border-orange-200 p-3">Per 1,000 impressions</td>
                <td className="border-2 border-orange-200 p-3">Maximum reach, brand awareness</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border-2 border-orange-200 p-3 font-semibold">CPE</td>
                <td className="border-2 border-orange-200 p-3">Cost Per Engagement</td>
                <td className="border-2 border-orange-200 p-3">Someone engages with your ad</td>
                <td className="border-2 border-orange-200 p-3">Interactive ads, rich media</td>
              </tr>
              <tr className="bg-white">
                <td className="border-2 border-orange-200 p-3 font-semibold">CPCV</td>
                <td className="border-2 border-orange-200 p-3">Cost Per Completed View</td>
                <td className="border-2 border-orange-200 p-3">Someone watches your full video</td>
                <td className="border-2 border-orange-200 p-3">High-value engagement campaigns</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Choose CPV when:</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Your goal is video engagement and brand awareness</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>You want to pay only for genuine viewer interest (30+ seconds)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>You are running YouTube TrueView campaigns</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>You want to build emotional connection with your audience through storytelling</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Choose CPC when:</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Your goal is driving website traffic or conversions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>You want to pay only for direct responses</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>You run text, display, or search ads</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Choose CPM when:</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>Your goal is maximum reach and impressions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>You want to dominate visibility in a specific market</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>You run bumper ads or non-skippable video formats</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
