"use client"

import CPVCalculator from "@/components/cpv-calculator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calculator, Info, BookOpen, TrendingUp, Target, Lightbulb, BarChart3, CheckCircle, Youtube, ArrowRight, TrendingDown } from "lucide-react"

export default function CPVCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        {/* H1 - Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CPV Calculator – Calculate Cost Per View Free Online
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our free CPV calculator to calculate cost per view instantly. Learn the CPV formula, how to calculate CPV for YouTube ads, convert CPV to CPM, and reduce your ad spend.
          </p>
        </div>

        {/* Quick Answer */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white p-3 rounded-xl">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Answer</h2>
              <p className="text-gray-700 leading-relaxed">
                CPV (Cost Per View) tells you how much you pay every time someone watches your video ad. You calculate CPV by dividing your total ad spend by the total number of views. For example, if you spend $500 and get 10,000 views, your CPV is $0.05. Use the calculator above to get your result in seconds.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator */}
        <div className="mb-16">
          <CPVCalculator />
        </div>

        {/* What Is CPV Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            What Is CPV — Cost Per View?
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              CPV stands for Cost Per View. It is a digital advertising pricing model where you pay only when someone watches your video ad. Advertisers use CPV primarily for video ad campaigns on platforms like YouTube, Google Display Network, Facebook, Instagram, and TikTok.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In a CPV model, a "view" is counted when a viewer watches your ad for a minimum period — usually 30 seconds or until the end of the video, whichever comes first. If someone skips your ad before that threshold, you do not pay.
            </p>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-600" />
                Why CPV Matters for Advertisers
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                CPV gives advertisers a clear and honest measurement of how much their video ad engagement actually costs. Unlike impressions (which simply count how many times an ad appears), a CPV view represents genuine viewer engagement. Someone who watches 30 seconds of your ad is actively engaging with your message.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Marketers, digital advertising agencies, media buyers, and brand managers all rely on CPV to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Measure the efficiency of video ad campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Compare performance across different video ad formats</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Set and optimize bidding strategies on platforms like Google Ads and YouTube Ads</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Justify video ad budget allocation to clients and stakeholders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Track the cost-effectiveness of brand awareness campaigns</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CPV Formula Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-green-600" />
            CPV Formula — How to Calculate CPV
          </h2>
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
        </section>

        {/* Step-by-Step Calculation - PART 1 OF FILE */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <ArrowRight className="w-8 h-8 text-orange-600" />
            Step-by-Step CPV Calculation
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Follow these steps to calculate your CPV manually or verify what our calculator produces.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">How to Calculate CPV — Step by Step</h3>
              
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 p-5 rounded-r-xl">
                <div className="font-semibold text-gray-900 mb-2">Step 1: Find your total ad spend.</div>
                <p className="text-gray-700">
                  Log into your Google Ads, YouTube Ads, or social media ad manager account and note the total amount spent on your video campaign during the period you want to measure.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
                <div className="font-semibold text-gray-900 mb-2">Step 2: Find your total measured views.</div>
                <p className="text-gray-700">
                  In the same dashboard, find the total number of views your video ad received. Make sure you are looking at measured views — these are views that meet the platform's minimum watch-time threshold, not raw impressions.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-5 rounded-r-xl">
                <div className="font-semibold text-gray-900 mb-2">Step 3: Divide ad spend by total views.</div>
                <p className="text-gray-700">
                  Use the formula: CPV = Total Ad Spend ÷ Total Views
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-5 rounded-r-xl">
                <div className="font-semibold text-gray-900 mb-2">Step 4: Interpret your result.</div>
                <p className="text-gray-700">
                  Compare your calculated CPV against industry benchmarks (covered below) to judge whether your campaign is performing efficiently.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Worked CPV Calculation Example</h3>
              <p className="text-gray-700 mb-3">Imagine you run a YouTube skippable in-stream ad campaign:</p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>You spend $750 on the campaign</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Your video receives 15,000 qualifying views (watched 30+ seconds)</span>
                </li>
              </ul>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-lg text-gray-600 mb-2">CPV = $750 ÷ 15,000 = $0.05</div>
                <div className="text-gray-700 font-semibold">
                  Your cost per view is 5 cents. For YouTube, this sits within a strong performance range.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CPV to CPM Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-teal-600" />
            CPV to CPM Calculator — Key Differences
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Advertisers often need to convert CPV to CPM (Cost Per Mille, or cost per 1,000 impressions) to compare video ad performance across different campaign types.
            </p>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">CPV to CPM Conversion Formula</h3>
              <div className="bg-white rounded-lg p-6 text-center mb-4">
                <div className="text-xl font-bold text-teal-600 mb-3">
                  CPM = CPV × (Views ÷ Impressions) × 1,000
                </div>
                <div className="text-gray-600 mb-2">Or if you know your view rate (the percentage of impressions that became views):</div>
                <div className="text-xl font-bold text-teal-600">
                  CPM = CPV × View Rate × 1,000
                </div>
              </div>

              <h4 className="text-lg font-bold text-gray-900 mb-3">CPV to CPM Conversion Example</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-teal-100">
                      <th className="border-2 border-teal-300 p-3 text-left font-semibold">Variable</th>
                      <th className="border-2 border-teal-300 p-3 text-left font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border-2 border-teal-200 p-3">CPV</td>
                      <td className="border-2 border-teal-200 p-3 font-semibold">$0.05</td>
                    </tr>
                    <tr className="bg-teal-50">
                      <td className="border-2 border-teal-200 p-3">View Rate</td>
                      <td className="border-2 border-teal-200 p-3 font-semibold">30% (0.30)</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border-2 border-green-300 p-3 font-bold">CPM Equivalent</td>
                      <td className="border-2 border-green-300 p-3 font-bold text-green-600">$15.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 mt-4">
                This means a campaign with a $0.05 CPV and a 30% view rate is equivalent to a $15 CPM campaign.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">CPV vs CPM — When to Use Each</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border-2 border-blue-300 p-3 text-left font-semibold">Situation</th>
                      <th className="border-2 border-blue-300 p-3 text-left font-semibold">Best Metric</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border-2 border-blue-200 p-3">Brand awareness with impressions focus</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">CPM</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border-2 border-blue-200 p-3">Video engagement and watch time</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">CPV</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-blue-200 p-3">Comparing video vs display ad costs</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">Convert CPV to CPM</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border-2 border-blue-200 p-3">Budget planning for video reach</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">Both together</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 mt-4">
                Understanding the CPV to CPM converter relationship helps you make smarter decisions when allocating budget between video and display advertising.
              </p>
            </div>
          </div>
        </section>

        {/* YouTube CPV Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Youtube className="w-8 h-8 text-red-600" />
            YouTube CPV Calculator
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              YouTube is the world's largest video advertising platform, and YouTube CPV is one of the most important metrics for any video advertiser. Google Ads manages YouTube advertising, and it uses a TrueView pricing model for most video ad formats.
            </p>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How YouTube CPV Works</h3>
              <p className="text-gray-700 mb-3">YouTube charges you for a view when:</p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>A viewer watches 30 seconds of your skippable in-stream ad (or the full video if it is shorter than 30 seconds)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>A viewer clicks on your ad (even if they skip before 30 seconds)</span>
                </li>
              </ul>
              <p className="text-gray-700 font-semibold">
                If a viewer skips your ad before 30 seconds and does not click, you pay nothing.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">YouTube CPV Formula</h3>
              <p className="text-gray-700 mb-3">The formula is identical:</p>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-blue-600">
                  YouTube CPV = Total YouTube Ad Spend ÷ Total TrueView Views
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">TrueView Ad Formats That Use CPV Bidding</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="font-semibold text-gray-900 mb-1">Skippable in-stream ads</div>
                  <p className="text-gray-700 text-sm">
                    Play before, during, or after YouTube videos. Viewers can skip after 5 seconds. You pay only for 30+ second views or clicks.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="font-semibold text-gray-900 mb-1">In-feed video ads</div>
                  <p className="text-gray-700 text-sm">
                    Appear in YouTube search results, the homepage feed, and next-to-video placements. You pay when a viewer clicks to watch your video.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="font-semibold text-gray-900 mb-1">Bumper ads</div>
                  <p className="text-gray-700 text-sm">
                    These are 6-second non-skippable ads that use CPM bidding, not CPV. Keep this distinction in mind when comparing metrics.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Setting Your Max CPV Bid on YouTube</h3>
              <p className="text-gray-700 mb-3">
                When you set up a YouTube campaign, you set a Maximum CPV bid — the highest amount you are willing to pay per view. Google Ads runs a real-time auction, and you typically pay less than your max CPV bid. The actual amount you pay depends on:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Your maximum CPV bid</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>The competitiveness of your target audience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Your ad's quality score and relevance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>The ad format you choose</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Industry Benchmarks Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
            Average CPV Benchmarks by Industry
          </h2>
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
        </section>

        {/* What Is Good CPV Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Target className="w-8 h-8 text-green-600" />
            What Is a Good CPV?
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              A good CPV depends on your industry, your campaign goals, and your target audience. There is no single universal benchmark, but these guidelines help you evaluate your performance.
            </p>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">General Guidelines for CPV Performance</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                  <div className="font-semibold text-green-700 mb-1">Excellent CPV: Below $0.05</div>
                  <p className="text-gray-700 text-sm">
                    You are getting views at a very low cost, which suggests strong targeting, high video quality, or low competition in your niche.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="font-semibold text-blue-700 mb-1">Good CPV: $0.05 to $0.10</div>
                  <p className="text-gray-700 text-sm">
                    This is the healthy average range for most YouTube campaigns. Your cost is competitive and sustainable.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                  <div className="font-semibold text-yellow-700 mb-1">Average CPV: $0.10 to $0.20</div>
                  <p className="text-gray-700 text-sm">
                    Acceptable for competitive industries or broad audience targeting. Look for optimization opportunities.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                  <div className="font-semibold text-red-700 mb-1">High CPV: Above $0.20</div>
                  <p className="text-gray-700 text-sm">
                    Your costs are elevated. Audit your targeting, ad creative, and bidding strategy to find inefficiencies.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Factors That Influence Your CPV</h3>
              <p className="text-gray-700 mb-3">Several variables directly affect how high or low your CPV will be:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <div className="font-semibold text-gray-900">Audience targeting specificity</div>
                    <p className="text-gray-700 text-sm">Narrower, more specific audiences tend to have higher CPVs because more advertisers compete for them. Broad audiences generally cost less per view.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <div className="font-semibold text-gray-900">Video ad quality</div>
                    <p className="text-gray-700 text-sm">Engaging, high-quality videos naturally attract more views and longer watch times, which improves your quality score and can lower your effective CPV.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <div className="font-semibold text-gray-900">Ad format</div>
                    <p className="text-gray-700 text-sm">Skippable in-stream ads typically have lower CPVs than in-feed ads because of the high volume of impressions they receive.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <div className="font-semibold text-gray-900">Geographic targeting</div>
                    <p className="text-gray-700 text-sm">Ads targeting users in the United States, United Kingdom, Australia, and Canada typically cost more per view than ads targeting developing markets.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">5</div>
                  <div>
                    <div className="font-semibold text-gray-900">Time of year</div>
                    <p className="text-gray-700 text-sm">CPV rises during Q4 (October through December) due to holiday advertising competition.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Lower CPV Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingDown className="w-8 h-8 text-orange-600" />
            How to Lower Your CPV
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Reducing your CPV while maintaining or improving view quality is the core goal of any video ad optimization strategy. These proven techniques help you bring your CPV down without sacrificing campaign performance.
            </p>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">7 Proven Strategies to Lower CPV</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-5 border-l-4 border-orange-500">
                  <div className="font-semibold text-gray-900 mb-2">1. Hook viewers in the first 5 seconds</div>
                  <p className="text-gray-700 text-sm">
                    On skippable YouTube ads, viewers can skip after 5 seconds. If your ad does not grab attention immediately, viewers skip and you accumulate no views. Open with your most compelling visual or message within the first 3 to 5 seconds.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-blue-500">
                  <div className="font-semibold text-gray-900 mb-2">2. Refine your audience targeting</div>
                  <p className="text-gray-700 text-sm">
                    Broad targeting wastes spend on viewers unlikely to engage. Use custom intent audiences, remarketing lists, Customer Match, and similar audiences to reach people who are most likely to watch your full ad.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-green-500">
                  <div className="font-semibold text-gray-900 mb-2">3. Use keyword exclusions</div>
                  <p className="text-gray-700 text-sm">
                    Add negative keywords to prevent your ads from showing in irrelevant contexts. Irrelevant placements waste impressions and inflate your CPV.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-purple-500">
                  <div className="font-semibold text-gray-900 mb-2">4. Optimize for mobile viewers</div>
                  <p className="text-gray-700 text-sm">
                    Over 70% of YouTube views come from mobile devices. Design your video creative with mobile in mind — clear visuals, readable text, and a strong opening that works on a small screen.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-pink-500">
                  <div className="font-semibold text-gray-900 mb-2">5. A/B test your video creatives</div>
                  <p className="text-gray-700 text-sm">
                    Run two or three different video versions simultaneously and track which produces the lowest CPV. Test different hooks, calls to action, video lengths, and messaging.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-teal-500">
                  <div className="font-semibold text-gray-900 mb-2">6. Schedule ads strategically</div>
                  <p className="text-gray-700 text-sm">
                    Use dayparting (ad scheduling) to run your ads during peak engagement hours for your specific audience. Avoid running ads during low-engagement periods where you pay for lower-quality views.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-red-500">
                  <div className="font-semibold text-gray-900 mb-2">7. Review placement reports regularly</div>
                  <p className="text-gray-700 text-sm">
                    Check which YouTube channels, apps, and websites display your ads. Exclude placements that produce high CPVs or irrelevant views. This is one of the most impactful optimizations you can make.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CPV vs CPC vs CPM Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            CPV vs CPC vs CPM — Full Comparison
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Understanding how CPV compares to other ad pricing models helps you choose the right strategy for your campaign goals.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Comparison Table</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border-2 border-purple-300 p-3 text-left font-semibold">Metric</th>
                      <th className="border-2 border-purple-300 p-3 text-left font-semibold">Full Name</th>
                      <th className="border-2 border-purple-300 p-3 text-left font-semibold">You Pay When</th>
                      <th className="border-2 border-purple-300 p-3 text-left font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border-2 border-purple-200 p-3 font-semibold">CPV</td>
                      <td className="border-2 border-purple-200 p-3">Cost Per View</td>
                      <td className="border-2 border-purple-200 p-3">Someone watches 30+ seconds</td>
                      <td className="border-2 border-purple-200 p-3">Video brand awareness, engagement</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border-2 border-purple-200 p-3 font-semibold">CPC</td>
                      <td className="border-2 border-purple-200 p-3">Cost Per Click</td>
                      <td className="border-2 border-purple-200 p-3">Someone clicks your ad</td>
                      <td className="border-2 border-purple-200 p-3">Traffic, leads, conversions</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-purple-200 p-3 font-semibold">CPM</td>
                      <td className="border-2 border-purple-200 p-3">Cost Per Mille</td>
                      <td className="border-2 border-purple-200 p-3">Per 1,000 impressions</td>
                      <td className="border-2 border-purple-200 p-3">Maximum reach, brand awareness</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border-2 border-purple-200 p-3 font-semibold">CPE</td>
                      <td className="border-2 border-purple-200 p-3">Cost Per Engagement</td>
                      <td className="border-2 border-purple-200 p-3">Someone engages with your ad</td>
                      <td className="border-2 border-purple-200 p-3">Interactive ads, rich media</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-purple-200 p-3 font-semibold">CPCV</td>
                      <td className="border-2 border-purple-200 p-3">Cost Per Completed View</td>
                      <td className="border-2 border-purple-200 p-3">Someone watches your full video</td>
                      <td className="border-2 border-purple-200 p-3">High-value engagement campaigns</td>
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

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Choose CPM when:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Your goal is maximum reach and impressions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>You want to dominate visibility in a specific market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>You run bumper ads or non-skippable video formats</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Rank Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            How CPV Affects Ad Rank on YouTube
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Your maximum CPV bid directly influences your ad's position in YouTube's ad auction system. Understanding this relationship helps you bid more intelligently.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How YouTube's Ad Auction Works</h3>
              <p className="text-gray-700 mb-3">
                When a viewer triggers an ad opportunity on YouTube, Google runs a real-time auction among all eligible advertisers. Your ad's auction score depends on:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Maximum CPV bid</strong> — The ceiling amount you are willing to pay per view</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Ad quality score</strong> — How relevant and engaging Google considers your ad</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Expected view rate</strong> — Google's estimate of how likely viewers are to watch your ad</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                A higher maximum CPV bid increases your probability of winning the auction. However, a high-quality, highly relevant ad can win auctions against competitors with higher bids if the quality score is strong enough.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Practical CPV Bidding Strategy</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Start with a maximum CPV bid of $0.10 to $0.20 for new campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Monitor actual CPV in your Google Ads dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Lower your max CPV bid gradually if your actual CPV is consistently much lower than your max</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Raise your max CPV bid if your ads struggle to deliver impressions</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ROI Tips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-600" />
            Tips to Maximize Your CPV Campaign ROI
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Getting a low CPV is only half the equation. You also need those views to generate real business value. These tips help you maximize return on investment from your CPV campaigns.
            </p>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">8 Tips for High-ROI CPV Campaigns</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-5 border-l-4 border-yellow-500">
                  <div className="font-semibold text-gray-900 mb-2">1. Match your video length to your goal</div>
                  <p className="text-gray-700 text-sm">
                    15-second ads work for brand recall. 30-second ads work for product explanations. 2-minute ads work for detailed demos or storytelling. Choose based on what you want viewers to do after watching.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-blue-500">
                  <div className="font-semibold text-gray-900 mb-2">2. Include a clear call to action</div>
                  <p className="text-gray-700 text-sm">
                    Every video ad needs a specific call to action — visit your website, subscribe to your channel, download your app, or watch another video. A CPV view with no next step produces no business result.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-green-500">
                  <div className="font-semibold text-gray-900 mb-2">3. Use companion banners</div>
                  <p className="text-gray-700 text-sm">
                    YouTube allows you to display a companion banner ad alongside your video. Even if viewers skip your ad, the banner remains visible. This gives you brand exposure even from non-views.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-purple-500">
                  <div className="font-semibold text-gray-900 mb-2">4. Align your landing page with your video message</div>
                  <p className="text-gray-700 text-sm">
                    If your video ad promises a discount or product feature, your landing page must deliver exactly that. Disconnect between your video and landing page kills conversion rates.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-pink-500">
                  <div className="font-semibold text-gray-900 mb-2">5. Measure view-through conversions</div>
                  <p className="text-gray-700 text-sm">
                    Some viewers watch your full ad, do not click immediately, but convert later. Enable view-through conversion tracking in Google Ads to capture this delayed impact.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-teal-500">
                  <div className="font-semibold text-gray-900 mb-2">6. Cap frequency to avoid ad fatigue</div>
                  <p className="text-gray-700 text-sm">
                    If the same viewer sees your ad ten times in a week, the later views become worthless and may damage your brand perception. Set frequency caps to limit how many times one person sees your ad.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-red-500">
                  <div className="font-semibold text-gray-900 mb-2">7. Remarket to viewers who watched 50%+ of your video</div>
                  <p className="text-gray-700 text-sm">
                    Create remarketing audiences from people who watched at least half your video. These people demonstrated interest but did not convert. A follow-up ad targeting them often produces strong conversion rates.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border-l-4 border-indigo-500">
                  <div className="font-semibold text-gray-900 mb-2">8. Track CPV alongside VTR (View-Through Rate)</div>
                  <p className="text-gray-700 text-sm">
                    CPV tells you cost efficiency. VTR (the percentage of impressions that became views) tells you audience relevance. Track both together for the complete picture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - COMPLETE with all 12 questions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Info className="w-8 h-8 text-blue-600" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="bg-white rounded-2xl border-2 border-gray-200">
            <AccordionItem value="item-1" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What does CPV stand for in advertising?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                CPV stands for Cost Per View. It is a video advertising pricing model where you pay only when a viewer watches your ad for at least 30 seconds, or the full duration if your ad is shorter than 30 seconds.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How do you calculate CPV?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                You calculate CPV by dividing your total ad spend by the total number of measured views. The formula is: CPV = Total Ad Spend ÷ Total Views. For example, $200 spent with 4,000 views gives a CPV of $0.05.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What is a good CPV on YouTube?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                A good YouTube CPV typically falls between $0.03 and $0.10. Most well-optimized campaigns average around $0.05. CPVs above $0.20 suggest targeting, creative, or bidding inefficiencies that need attention.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How do I calculate CPV in Google Ads?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Google Ads calculates your CPV automatically in the campaign dashboard. You can also calculate it manually by taking your total cost from the campaign report and dividing it by the total number of views reported.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What is the difference between CPV and CPM?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                CPV charges you when someone watches your video ad for 30+ seconds. CPM charges you per 1,000 ad impressions, regardless of whether anyone watches or engages. CPV measures viewer engagement while CPM measures ad reach.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How do I convert CPV to CPM?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Use this formula: CPM = CPV × View Rate × 1,000. For example, if your CPV is $0.05 and your view rate is 30%, your equivalent CPM is $15. This conversion helps you compare video ad campaigns with display ad campaigns.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                Can I use CPV for non-video ads?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                No. CPV is exclusively a video advertising metric. Text ads, display banner ads, and search ads use CPC (Cost Per Click) or CPM (Cost Per Mille) pricing models, not CPV.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What is the difference between CPV and CPCV?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                CPV counts a view when someone watches 30 seconds of your video. CPCV (Cost Per Completed View) counts a view only when someone watches your entire video from start to finish. CPCV typically produces higher costs but represents deeper viewer engagement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How does max CPV bid work on YouTube?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Your max CPV bid is the maximum amount you are willing to pay per view on YouTube. Google Ads uses this bid in a real-time auction. You typically pay less than your max CPV bid — your actual cost depends on competition and your ad quality score.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What is calculo CPV or como calcular el CPV?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                "Calculo CPV" and "como calcular el CPV" are Spanish-language terms that mean "CPV calculation" and "how to calculate CPV." The formula is the same in any language: CPV = Total Spend ÷ Total Views. Use the calculator on this page to get instant results.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                Why does my YouTube CPV vary from day to day?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                YouTube CPV fluctuates because ad auctions are dynamic. Factors like daily budget pacing, audience competition, time of day, day of week, and seasonal advertiser demand all cause CPV to vary. Monitor weekly averages rather than daily fluctuations for accurate performance assessment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12" className="px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How do I reduce my average CPV?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                You reduce your average CPV by improving your video's opening hook to reduce skip rates, refining your audience targeting to reach more relevant viewers, excluding low-performing placements from your campaign, and testing multiple video creative variations to find the highest-performing ad.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Summary Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A CPV calculator gives you instant clarity on how much you pay every time someone genuinely watches your video ad. The formula is simple: divide your total ad spend by your total measured views. A $1,000 campaign that generates 20,000 views produces a CPV of $0.05 — five cents per view.
            </p>
            <p className="text-gray-700 font-semibold mb-3">Key takeaways from this guide:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>CPV (Cost Per View) applies specifically to video advertising, primarily on YouTube and the Google Display Network</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>The CPV formula is: CPV = Total Ad Spend ÷ Total Views</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>On YouTube, a view counts after 30 seconds of watch time or a click, whichever comes first</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>A good YouTube CPV falls between $0.03 and $0.10 for most industries</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>You can convert CPV to CPM using: CPM = CPV × View Rate × 1,000</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Lower your CPV by improving your first 5 seconds, refining targeting, and regularly excluding poor-performing placements</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>CPV measures engagement quality, while CPM measures reach, and CPC measures direct response — use the right metric for your campaign goal</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Use the CPV calculator at the top of this page to instantly calculate your cost per view, plan your video ad budget, or verify your Google Ads reporting data.
            </p>
          </div>
        </section>
        
      </div>
    </div>
  )
}
