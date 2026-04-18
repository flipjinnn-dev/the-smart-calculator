"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChaturbateTokenCalculator from "@/components/chaturbate-token-calculator"
import { Calculator, Info, BookOpen, DollarSign, HelpCircle, TrendingUp } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ChaturbateTokenCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Chaturbate Token Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Convert your Chaturbate tokens to real money instantly. Enter any token amount above — get your exact USD or EUR value in one click.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-pink-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Chaturbate Token Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <ChaturbateTokenCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Quick Answer */}
        <div className="mb-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-6 h-6 text-purple-600" />
            Quick Answer
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            On Chaturbate, 1 token = $0.05 for models. Viewers pay $0.08–$0.10 per token depending on the package. Use the calculator above to convert any amount instantly.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Why This Calculator Is Better */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why This Chaturbate Token Calculator Is Better Than Others</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Most token calculators online show you a static table and call it done. This one is different and here is exactly why:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Real-time EUR conversion</strong> — live exchange rate applied automatically, not a fixed outdated number</li>
                <li><strong>Instant results</strong> — no page reload, no form submission, answer appears as you type</li>
                <li><strong>Model-accurate rates</strong> — calculated at the true $0.05 broadcaster earning rate, not the viewer purchase rate</li>
                <li><strong>USD and EUR both supported</strong> — one tool, two currencies</li>
                <li><strong>Mobile optimized</strong> — works perfectly on any device, mid-stream</li>
              </ul>
              <p className="mt-4">
                Whether you are a new broadcaster wondering what your first tip was worth, or a full-time model tracking per-session revenue this is the most accurate free Chaturbate token to USD calculator available.
              </p>
            </div>
          </div>

          {/* Token Value Explained */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-pink-600" />
              Chaturbate Token Value Explained
            </h2>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How Much Do Models Earn Per Token on Chaturbate?</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                On Chaturbate, every token that reaches a model's account is worth exactly <strong>$0.05 USD</strong>. This rate is fixed by the platform and applies equally to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Tips received during live streams</li>
                <li>Private show payments</li>
                <li>Tip menu completions</li>
                <li>Token goal payouts</li>
              </ul>
              <p>
                So when a viewer tips 200 tokens, that is $10.00 in your Chaturbate account. A 1,000-token goal completion equals $50.00 earned. The math never changes.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Much Do Viewers Pay Per Token on Chaturbate?</h3>
              <p>
                Viewers buy tokens at a higher rate than models earn. Chaturbate structures viewer pricing in bundles bigger packages mean a slightly lower per-token cost:
              </p>

              {/* Viewer Pricing Table */}
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-pink-600 text-white">
                      <th className="border border-gray-300 p-3 text-left">Token Package</th>
                      <th className="border border-gray-300 p-3 text-left">Viewer Price</th>
                      <th className="border border-gray-300 p-3 text-left">Cost Per Token</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">100 tokens</td>
                      <td className="border border-gray-300 p-3">~$10.99</td>
                      <td className="border border-gray-300 p-3">$0.110</td>
                    </tr>
                    <tr className="bg-pink-50">
                      <td className="border border-gray-300 p-3 font-semibold">500 tokens</td>
                      <td className="border border-gray-300 p-3">~$44.99</td>
                      <td className="border border-gray-300 p-3">$0.090</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">1,000 tokens</td>
                      <td className="border border-gray-300 p-3">~$79.99</td>
                      <td className="border border-gray-300 p-3">$0.080</td>
                    </tr>
                    <tr className="bg-pink-50">
                      <td className="border border-gray-300 p-3 font-semibold">2,000 tokens</td>
                      <td className="border border-gray-300 p-3">~$159.99</td>
                      <td className="border border-gray-300 p-3">$0.080</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Price Gap — Where Chaturbate Makes Its Money</h3>
              <p>
                Viewers pay $0.08–$0.10 per token. Models earn $0.05 per token. That $0.03–$0.05 gap per token is Chaturbate's platform revenue cut covering infrastructure, payment processing, and the free viewer access model that drives millions of eyeballs to your stream.
              </p>
              <p>
                This gap is not hidden. Understanding it helps models appreciate that their earnings are direct and predictable.
              </p>
            </div>
          </div>

          {/* Conversion Chart */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Chaturbate Token to Dollar Conversion Chart</h2>
            <p className="text-gray-700 mb-6">
              Fast reference for the most common token amounts on Chaturbate. No calculator needed for these standard values:
            </p>

            {/* Conversion Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="border border-gray-300 p-3 text-left">Tokens</th>
                    <th className="border border-gray-300 p-3 text-left">Model Earnings (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">50 tokens</td>
                    <td className="border border-gray-300 p-3">$2.50</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-semibold">100 tokens</td>
                    <td className="border border-gray-300 p-3">$5.00</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">200 tokens</td>
                    <td className="border border-gray-300 p-3">$10.00</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-semibold">250 tokens</td>
                    <td className="border border-gray-300 p-3">$12.50</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">500 tokens</td>
                    <td className="border border-gray-300 p-3">$25.00</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-semibold">1,000 tokens</td>
                    <td className="border border-gray-300 p-3">$50.00</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">2,000 tokens</td>
                    <td className="border border-gray-300 p-3">$100.00</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-semibold">2,500 tokens</td>
                    <td className="border border-gray-300 p-3">$125.00</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">5,000 tokens</td>
                    <td className="border border-gray-300 p-3">$250.00</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-semibold">10,000 tokens</td>
                    <td className="border border-gray-300 p-3">$500.00</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">25,000 tokens</td>
                    <td className="border border-gray-300 p-3">$1,250.00</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-semibold">50,000 tokens</td>
                    <td className="border border-gray-300 p-3">$2,500.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 mt-6">
              For any amount not in this table enter your tokens in the calculator above and get the exact USD or EUR value instantly.
            </p>
          </div>

          {/* Earning Goals */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Many Chaturbate Tokens Do You Need to Hit Your Earning Goal?</h2>
            <p className="text-gray-700 mb-6">
              This is one of the most searched questions from Chaturbate models. Here are the exact token targets for common income milestones:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                <p className="text-lg"><strong>Earn $50</strong> → need <strong>1,000 tokens</strong></p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                <p className="text-lg"><strong>Earn $100</strong> → need <strong>2,000 tokens</strong></p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-purple-600">
                <p className="text-lg"><strong>Earn $250</strong> → need <strong>5,000 tokens</strong></p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-orange-600">
                <p className="text-lg"><strong>Earn $500</strong> → need <strong>10,000 tokens</strong></p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-pink-600">
                <p className="text-lg"><strong>Earn $1,000</strong> → need <strong>20,000 tokens</strong></p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-red-600">
                <p className="text-lg"><strong>Earn $5,000</strong> → need <strong>100,000 tokens</strong></p>
              </div>
            </div>
          </div>

          {/* Model Earnings Journey */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              Chaturbate Model Earnings — What the Journey Actually Looks Like
            </h2>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">First 30 Days — What New Chaturbate Models Should Expect</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                New models on Chaturbate almost always earn less than expected in month one not because the platform does not work, but because discoverability takes time.
              </p>
              <p><strong>Typical first-month reality:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Viewers per stream: 5–20</li>
                <li>Tips: sporadic, mostly small</li>
                <li>Monthly earnings: $200–$500 (streaming 15–20 hrs/week)</li>
              </ul>
              <p>
                The biggest variable isnot hours streamed — it is profile completeness and tip menu setup. Models who launch with a visible token goal and clear tip menu start earning meaningful tips weeks earlier.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Months 2–3 — Where Consistent Models Start Growing</h3>
              <p>
                By the 90-day mark, something shifts for models who stream regularly on Chaturbate. A base of returning viewers starts forming. These regulars often account for 60–70% of total token income.
              </p>
              <p><strong>Monthly earnings in this phase:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Consistent streamers: $1,000–$3,000/month</li>
                <li>Top performers: $3,000–$6,000/month</li>
              </ul>
              <p>
                Tracking tokens-to-dollars per session here is what separates models who plateau from models who grow.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Top Chaturbate Earners Do Differently</h3>
              <p>
                Models earning $5,000–$20,000+/month on Chaturbate are not streaming more hours. They are working the token system smarter:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Multi-stage goals</strong> — smaller sequential goals keep tip energy active all stream</li>
                <li><strong>Profitable private show pricing</strong> — accessible to viewers, still strong at $0.05/token</li>
                <li><strong>Spy show passive income</strong> — runs alongside public streams</li>
                <li><strong>Per-session tracking</strong> — they know their average and actively try to beat it</li>
              </ul>
            </div>
          </div>

          {/* Tip Menu Strategy */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Build a Tip Menu That Works at the $0.05 Rate</h2>
            <p className="text-gray-700 mb-6">
              Your tip menu is your storefront on Chaturbate. Every item is priced in tokens but you and your viewer are both dealing in real money. Build it like a pricing strategy, not a wishlist:
            </p>

            {/* Tip Menu Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-orange-600 text-white">
                    <th className="border border-gray-300 p-3 text-left">Tip Menu Tier</th>
                    <th className="border border-gray-300 p-3 text-left">Token Range</th>
                    <th className="border border-gray-300 p-3 text-left">Your Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Small interaction (shoutout, gesture)</td>
                    <td className="border border-gray-300 p-3">25–50 tokens</td>
                    <td className="border border-gray-300 p-3">$1.25–$2.50</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 p-3 font-semibold">Medium request</td>
                    <td className="border border-gray-300 p-3">100–200 tokens</td>
                    <td className="border border-gray-300 p-3">$5.00–$10.00</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Premium action</td>
                    <td className="border border-gray-300 p-3">500–1,000 tokens</td>
                    <td className="border border-gray-300 p-3">$25.00–$50.00</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 p-3 font-semibold">Exclusive content</td>
                    <td className="border border-gray-300 p-3">2,000–5,000 tokens</td>
                    <td className="border border-gray-300 p-3">$100.00–$250.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Set Token Goals That Make Financial Sense</h3>
            <p className="text-gray-700">
              A 3,000-token goal sounds exciting in a chat room. But knowing that equals $150 USD changes how you evaluate whether it is worth your time and energy.
            </p>
            <p className="text-gray-700 mt-4">
              Models who think in dollars when building goals make smarter decisions about:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li>How long to run a goal</li>
              <li>What to offer as the reward</li>
              <li>Whether to chain multiple smaller goals instead</li>
            </ul>
          </div>

          {/* Payout System */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Chaturbate Payout System — When and How You Get Paid</h2>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Methods for Chaturbate Models</h3>
            <p className="text-gray-700 mb-4">
              Chaturbate supports the following payout options for verified broadcasters:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li><strong>Paxum</strong> — fastest processing, preferred by most international models</li>
              <li><strong>Check</strong> — standard mailed payment, widely accessible</li>
              <li><strong>Wire Transfer</strong> — direct bank transfer for larger balances</li>
              <li><strong>Bitcoin</strong> — cryptocurrency option for qualifying models</li>
              <li><strong>FirstChoicePay</strong> — alternative processor for specific regions</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Payout Schedule and Minimum Threshold</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li><strong>Payment cycle:</strong> Bi-weekly (twice per calendar month)</li>
              <li><strong>Minimum threshold:</strong> $50 USD</li>
              <li><strong>Below threshold:</strong> balance rolls over to next cycle</li>
              <li><strong>First payout:</strong> requires identity verification (standard on all major cam platforms)</li>
            </ul>
          </div>

          {/* Tracking Habit */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Track Every Stream — The Habit That Builds Real Income</h2>
            <p className="text-gray-700 mb-4">
              After every session on Chaturbate, enter your total tokens into the calculator. Record the dollar figure. Do this for 4–6 weeks and you will clearly see:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li>Your highest-earning time slots</li>
              <li>Your best-performing show formats</li>
              <li>Your average per-stream revenue</li>
              <li>The gap between your best and worst sessions and why</li>
            </ul>
            <p className="text-gray-700 mt-4">
              This one tracking habit is the difference between guessing and growing.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-pink-600" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How much is 1 Chaturbate token worth?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  $0.05 USD for models. This is Chaturbate's fixed broadcaster earning rate across all model categories and applies to tips, private shows, and goal completions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How much is 100 tokens on Chaturbate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  For models, 100 tokens = $5.00 USD. Viewers pay approximately $10.99 to purchase a 100-token package.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How much is 500 tokens on Chaturbate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  500 tokens = $25.00 USD for models. Viewers pay approximately $44.99 to buy 500 tokens.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How much is 1000 tokens on Chaturbate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  1,000 tokens = $50.00 USD for models. Viewers pay approximately $79.99 to purchase the 1,000-token package.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do I convert Chaturbate tokens to dollars?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Multiply tokens × $0.05. Or use the Chaturbate token calculator above enter any token amount for an instant USD or EUR result.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How many tokens to earn $100 on Chaturbate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Exactly 2,000 tokens equals $100 USD at the $0.05 model earning rate.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How many tokens to earn $500 on Chaturbate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  10,000 tokens = $500 USD.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  When does Chaturbate pay models?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Chaturbate pays models bi-weekly with a $50 minimum payout threshold. Payment methods include Paxum, check, wire transfer, Bitcoin, and FirstChoicePay.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Is the $0.05 per token rate the same for all models?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes. The $0.05 rate is Chaturbate's standard earning rate for all broadcasters. Promotional bonuses or referral programs may stack on top but the base rate is fixed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Why do viewers pay more than models earn?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  The gap between viewer purchase price ($0.08–$0.10) and model earning rate ($0.05) is Chaturbate's platform revenue share covering infrastructure, payment processing, and free viewer access.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Can I convert Chaturbate tokens to EUR?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes. The calculator above supports live EUR conversion using the current exchange rate. As a rough reference, 1,000 tokens ≈ €46–€49 EUR.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
