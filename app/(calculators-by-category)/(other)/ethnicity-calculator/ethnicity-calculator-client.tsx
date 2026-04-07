"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EthnicityCalculator from "@/components/ethnicity-calculator"
import { Dna, Calculator, Users, Info, Globe, Heart, TrendingUp, AlertCircle, BookOpen } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function EthnicityCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Ethnicity Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Calculate Your Ethnic % Fast
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-purple-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Answer</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                An ethnicity calculator helps you estimate your ethnic background percentages based on your parents' and ancestors' nationalities, cultural origins, or DNA test results. Enter each parent's known ethnicities with percentages, and the calculator automatically blends them to show your estimated ethnic makeup. It works best when you combine family history research with DNA ancestry data.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Dna className="w-8 h-8" />
                Ethnicity Percentage Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <EthnicityCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* What Is Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8 text-purple-600" />
                What Is an Ethnicity Calculator?
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  An ethnicity calculator is a free online tool that estimates your ethnic background percentages using information you know your parents' nationalities, your grandparents' cultural origins, or results from a DNA ancestry test. It translates real family history data into easy-to-read percentage breakdowns.
                </p>
                <p className="font-semibold text-gray-900 mt-6 mb-3">People use ethnicity calculators for many reasons:</p>
                <ul className="space-y-3 ml-6">
                  {[
                    { icon: "🔍", title: "Personal curiosity", desc: "You want to understand your cultural roots and where your family came from." },
                    { icon: "👶", title: "Baby planning", desc: "Expecting parents want to estimate their child's ethnic heritage before birth." },
                    { icon: "🧬", title: "DNA test interpretation", desc: "You received raw DNA results and need help understanding what the percentages mean." },
                    { icon: "📚", title: "Family history research", desc: "You are actively building a family tree and want to track how ethnic origins pass through generations." },
                    { icon: "⚕️", title: "Medical relevance", desc: "Some health conditions and BMI standards vary by ethnic background, making ethnicity data medically useful." },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <strong>{item.title}</strong> — {item.desc}
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <strong>Important:</strong> An ethnicity calculator does not replace a professional DNA test or genealogical research. Instead, it gives you a fast, free starting estimate based on the information you already have.
                </p>
              </div>
            </div>

            {/* How to Calculate */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Your Ethnicity Percentage</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Calculating your ethnicity percentage follows a simple mathematical principle: each parent contributes 50% of your genetic and cultural heritage, each grandparent contributes 25%, each great-grandparent contributes 12.5%, and so on.
              </p>

              <div className="bg-white border-2 border-blue-300 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">The Ethnicity Percentage Formula</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Generation</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Contribution to You</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-700 font-semibold">Parent</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">50%</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-700 font-semibold">Grandparent</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">25%</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-700 font-semibold">Great-Grandparent</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">12.5%</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-700 font-semibold">Great-Great-Grandparent</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">6.25%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Step-by-Step: How to Calculate Ethnicity</h3>
                <div className="space-y-4">
                  {[
                    "List your mother's known ethnic origins — for example, 100% Pakistani, or 50% Punjabi and 50% Sindhi.",
                    "List your father's known ethnic origins — for example, 75% Afghan and 25% Kashmiri.",
                    "Divide each value by 2 because each parent contributes exactly 50% to your ethnic makeup.",
                    "Add the results together to get your combined ethnic percentage breakdown.",
                    "Repeat for grandparents if you have that data, dividing each grandparent's ethnic values by 4.",
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed pt-2">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-5 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3">Example Calculation</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>• Mother: <strong>100% Punjabi</strong> → Contributes <strong className="text-blue-600">50% Punjabi</strong> to you</p>
                    <p>• Father: <strong>50% Sindhi, 50% Balochi</strong> → Contributes <strong className="text-blue-600">25% Sindhi and 25% Balochi</strong> to you</p>
                    <p className="mt-4 pt-4 border-t-2 border-blue-300">
                      <strong>Your result:</strong> <span className="text-blue-600 font-bold text-lg">50% Punjabi, 25% Sindhi, 25% Balochi</span>
                    </p>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    This is exactly the logic a reliable ethnicity percentage calculator uses behind the scenes.
                  </p>
                </div>
              </div>
            </div>

            {/* Based on Parents */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Users className="w-8 h-8" />
                  Ethnicity Calculator Based on Parents
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  The most accurate free method to calculate your ethnicity without a DNA test is to use your parents' known ethnic backgrounds. This approach is called cultural ethnicity estimation and relies on family history records, immigration history, and regional ancestry knowledge.
                </p>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">What You Need</h3>
                  <ul className="space-y-2 ml-6">
                    {[
                      "Your mother's ethnic or national background (ideally broken into percentages if she is mixed)",
                      "Your father's ethnic or national background (same format)",
                      "Any grandparent data you have access to for higher accuracy",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Why Parent-Based Calculation Works</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Biologically, you inherit exactly 50% of your DNA from each parent. Culturally, family traditions, language, religion, and regional identity also pass down through parents. When you calculate ethnicity from parents, you capture both dimensions at once.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    If you do not know your exact parental breakdown, start with what you know. Enter 100% of a nationality for one parent if that is all you know. Add exceptions from grandparents to refine the estimate.
                  </p>
                </div>

                <div className="p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>💡 Pro Tip:</strong> Even approximate data gives useful results. A calculator that shows you are approximately 60% South Asian, 30% Central Asian, and 10% Middle Eastern is far more informative than knowing nothing about your heritage.
                  </p>
                </div>
              </div>
            </div>

            {/* Baby Ethnicity Calculator */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-pink-600" />
                Baby Ethnicity Calculator
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                One of the most popular uses of an ethnicity calculator for babies is among expecting parents especially couples from different ethnic backgrounds who want to estimate what ethnic heritage their child will carry.
              </p>

              <div className="bg-white border-2 border-pink-300 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How a Baby Ethnicity Calculator Works</h3>
                <p className="text-gray-700 mb-4">The logic is identical to the parent-based method:</p>
                <div className="space-y-3">
                  {[
                    "Enter your ethnic breakdown as the mother's data.",
                    "Enter your partner's ethnic breakdown as the father's data.",
                    "The calculator divides each figure by 2 and combines the results.",
                    "The output shows your baby's estimated ethnicity percentages.",
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-pink-300 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Example: Mixed-Heritage Baby</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>• Mother: <strong>100% Arab</strong></p>
                    <p>• Father: <strong>100% Pakistani</strong></p>
                    <p className="mt-4 pt-4 border-t-2 border-pink-200">
                      <strong>Baby's estimated ethnicity:</strong><br />
                      <span className="text-pink-600 font-bold">50% Arab, 50% Pakistani</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-pink-300 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">For mixed-race couples with more complex backgrounds:</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>• Mother: <strong>50% Nigerian, 50% British</strong></p>
                    <p>• Father: <strong>50% Indian, 50% Caribbean</strong></p>
                    <p className="mt-4 pt-4 border-t-2 border-pink-200">
                      <strong>Baby:</strong><br />
                      <span className="text-pink-600 font-bold">25% Nigerian, 25% British, 25% Indian, 25% Caribbean</span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-gray-700 leading-relaxed">
                This gives expectant parents a fascinating cultural picture of their future child's heritage.
              </p>
            </div>

            {/* DNA Ethnicity Calculator */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Dna className="w-8 h-8" />
                  DNA Ethnicity Calculator
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  A DNA ethnicity calculator interprets results from genetic ancestry tests such as those from AncestryDNA, 23andMe, MyHeritage DNA, or FamilyTreeDNA and presents them in an easy-to-understand percentage format.
                </p>

                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">How DNA Ethnicity Testing Works</h3>
                  <p className="text-gray-700 leading-relaxed">
                    DNA testing companies compare your genetic markers (called SNPs Single Nucleotide Polymorphisms) against reference populations from around the world. They then estimate what percentage of your DNA matches populations from different geographic regions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">What DNA Ethnicity Results Tell You</h3>
                  <ul className="space-y-2 ml-6">
                    {[
                      { title: "Regional ancestry percentages", desc: "For example, 42% South Asian, 35% Central Asian, 23% Middle Eastern" },
                      { title: "Haplogroup information", desc: "Your paternal and maternal lineage groups that trace deep ancestral migration paths" },
                      { title: "Ethnicity communities", desc: "Specific sub-regional groupings, such as Punjabi communities or Afghan Pashtun populations" },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-indigo-600 font-bold">•</span>
                        <div>
                          <strong>{item.title}</strong> — {item.desc}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                    Limitations of DNA Ethnicity Estimates
                  </h3>
                  <ul className="space-y-2 ml-6">
                    {[
                      "Results vary between testing companies because each uses a different reference panel",
                      "Results can change as companies update their reference populations",
                      "DNA ethnicity reflects ancestry from hundreds of years ago it may differ from your self-identified cultural ethnicity today",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    An ethnicity estimate calculator that combines your DNA results with your known family history gives you the most complete picture.
                  </p>
                </div>
              </div>
            </div>

            {/* Cultural vs Genetic */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cultural Ethnicity vs. Genetic Ethnicity</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Many people confuse cultural ethnicity with genetic ethnicity. Understanding the difference helps you use any ethnicity calculator more effectively.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border-2 border-green-300 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-600 mb-3">Cultural Ethnicity</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Cultural ethnicity is the ethnic identity you carry based on your language, traditions, religion, national origin, and family culture. It is what you and your family identify with. A person whose family has lived in Pakistan for five generations is culturally Pakistani, regardless of what their DNA shows.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Cultural ethnicity is calculated through genealogical research tracing family trees, immigration records, historical documents, and oral family history.
                  </p>
                </div>

                <div className="bg-white border-2 border-green-300 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-600 mb-3">Genetic Ethnicity</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Genetic ethnicity is what your DNA markers reveal about the populations your distant ancestors belonged to sometimes going back hundreds or thousands of years. It reflects migrations, historical mixing of populations, and ancient geographic patterns.
                  </p>
                </div>
              </div>

              <div className="bg-white border-2 border-green-300 rounded-xl p-6 overflow-x-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Differences at a Glance</h3>
                <table className="w-full">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Feature</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Cultural Ethnicity</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Genetic Ethnicity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { feature: "Based on", cultural: "Family history & culture", genetic: "DNA markers" },
                      { feature: "Timeframe", cultural: "Recent ancestors (3–5 generations)", genetic: "Deep history (hundreds of years)" },
                      { feature: "Calculated by", cultural: "Genealogy research", genetic: "DNA testing companies" },
                      { feature: "Changes over time", cultural: "Yes, with assimilation", genetic: "No (DNA is fixed)" },
                      { feature: "Best tool", cultural: "Parent/ancestor calculator", genetic: "DNA ethnicity calculator" },
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-green-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">{row.feature}</td>
                        <td className="px-6 py-4 text-gray-700">{row.cultural}</td>
                        <td className="px-6 py-4 text-gray-700">{row.genetic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-6 text-gray-700 leading-relaxed font-semibold">
                Both are valid and valuable. The best ethnicity calculators allow you to work with both types.
              </p>
            </div>

            {/* BMI with Ethnicity */}
            <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <TrendingUp className="w-8 h-8" />
                  BMI Calculator with Ethnicity Adjustment
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  A BMI calculator with ethnicity applies ethnicity-specific cutoff values when calculating your Body Mass Index health classification. This is medically important because research shows that health risks associated with body fat vary by ethnic background.
                </p>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why Ethnicity Matters in BMI Calculations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The standard BMI categories (Underweight: below 18.5, Normal: 18.5–24.9, Overweight: 25–29.9, Obese: 30+) were developed based primarily on European populations. Studies published in organizations like the World Health Organization (WHO) and the International Obesity Task Force have found that:
                  </p>
                  <ul className="space-y-2 ml-6">
                    {[
                      "South Asian, East Asian, and Southeast Asian populations face higher risks of type 2 diabetes and cardiovascular disease at lower BMI values",
                      "WHO recommends lower action points for Asian populations: overweight threshold at 23.0 and obesity threshold at 27.5",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">How a BMI Ethnicity Calculator Helps</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    A BMI calculator with ethnicity adjustment asks for your ethnic background and then applies the appropriate thresholds, giving you a more accurate health assessment than a standard BMI calculator.
                  </p>
                  <p className="text-gray-700 mb-3">Ethnic groups that benefit from adjusted BMI thresholds include:</p>
                  <ul className="space-y-2 ml-6">
                    {[
                      "South Asian (Pakistani, Indian, Bangladeshi, Sri Lankan)",
                      "East Asian (Chinese, Japanese, Korean)",
                      "Southeast Asian (Filipino, Thai, Vietnamese, Indonesian)",
                      "Arab and Middle Eastern populations",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-red-50 border-2 border-red-200 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>⚕️ Important:</strong> If you are calculating BMI for health purposes, always use an ethnic BMI calculator that accounts for your specific background. Share results with a healthcare professional for personalized advice.
                  </p>
                </div>
              </div>
            </div>

            {/* Ethnicity by Face */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-red-600" />
                Ethnicity by Face & Photo — What Science Says
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Many people search for an ethnicity calculator by face or ethnicity calculator by photo, hoping an app can analyze facial features and predict ethnic origin. Here is what you need to know:
              </p>

              <div className="bg-white border-2 border-red-300 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Can an App Really Detect Ethnicity by Face?</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some AI-powered apps claim to estimate ethnicity from a photo by analyzing facial features like bone structure, skin tone, and facial proportions. The accuracy of these tools is highly limited and controversial for several reasons:
                </p>
                <div className="space-y-3">
                  {[
                    { num: "1", text: "Facial features do not reliably map to ethnicity — Many ethnic groups share similar features, and wide variation exists within every group." },
                    { num: "2", text: "Ethnic ancestry is not visible in faces — A person who is 50% Pakistani and 50% Irish may look entirely like either background." },
                    { num: "3", text: "Algorithmic bias is well-documented — AI face analysis tools have repeatedly shown significant racial and ethnic bias in academic studies." },
                    { num: "4", text: "DNA and family history remain far more accurate — No photo app can replace a DNA ethnicity calculator or parent-based ethnicity estimate." },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        {item.num}
                      </div>
                      <p className="text-gray-700 pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">What These Tools Are Actually Good For</h3>
                <p className="text-gray-700 leading-relaxed">
                  Face analysis apps can be an entertaining starting point for curiosity, but treat results as novelty, not science. For any serious purpose family history, health, legal documentation use a DNA test or a parent/ancestor-based ethnicity percentage calculator instead.
                </p>
              </div>
            </div>

            {/* Ancestry & Family Research */}
            <div className="bg-white border-2 border-teal-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <BookOpen className="w-8 h-8" />
                  Ethnic Background by Ancestry & Family Research
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  An ethnicity calculator ancestry approach uses your family tree data to estimate ethnic origins. This is the method used by professional genealogists and is considered highly reliable when family records are thorough.
                </p>

                <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">How to Research Your Ethnic Ancestry</h3>
                  <div className="space-y-3">
                    {[
                      { num: "1", text: "Start with what you know — Your parents' birthplaces and nationalities are the foundation." },
                      { num: "2", text: "Interview older family members — Grandparents and great-aunts/uncles often know family stories, migration histories, and original homelands." },
                      { num: "3", text: "Search immigration and census records — Government archives, national records offices, and platforms like Ancestry.com hold historical documents that reveal ethnic origins." },
                      { num: "4", text: "Look for religious records — Church, mosque, and temple records often contain detailed information about families, including their geographic origins." },
                      { num: "5", text: "Build a family tree — Documenting 3–5 generations gives you enough data to produce a meaningful ethnicity estimate." },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                          {item.num}
                        </div>
                        <p className="text-gray-700 pt-1">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-cyan-50 border-2 border-cyan-200 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Free Ethnicity Calculator + Genealogy Research</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Combining an ethnicity calculator free tool with your own genealogy research gives you the most complete picture. Enter what you know into the calculator, note the gaps, then research those gaps through family interviews and archival records.
                  </p>
                </div>
              </div>
            </div>

            {/* Tips for Accuracy */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips for Accurate Ethnicity Estimation</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Whether you use a free ethnicity calculator online, a DNA test, or family research, these tips will help you get the most accurate results.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">7 Practical Tips</h3>
                {[
                  { num: "1", title: "Use precise percentages when you know them", desc: "Instead of entering \"some German,\" enter \"50% German\" if that is what you know. Precise input produces precise output." },
                  { num: "2", title: "Include all ethnicities, even small ones", desc: "A 6.25% great-great-grandparent contribution is still real. Including it gives a more accurate full picture." },
                  { num: "3", title: "Separate cultural and genetic ethnicity in your mind", desc: "You may be culturally 100% Pakistani but genetically show Persian, Turkic, or Dravidian ancestry from ancient history. Both facts are true." },
                  { num: "4", title: "Cross-check DNA results from multiple companies", desc: "Different DNA testing companies use different reference panels. Comparing results from two companies helps identify what is consistent." },
                  { num: "5", title: "Start with parents and work backward", desc: "Begin with what you know for certain your parents' backgrounds and then add grandparent data as you research." },
                  { num: "6", title: "Use the ethnicity calculator for babies carefully", desc: "Baby ethnicity estimates are averages. Actual DNA inheritance involves random recombination a child of two 50/50 parents may not be exactly 50/50 themselves." },
                  { num: "7", title: "Combine tools for the best results", desc: "Use a free ethnic percentage calculator for quick estimates, then invest in a DNA test for deeper analysis. Both complement each other." },
                ].map((tip, index) => (
                  <div key={index} className="p-5 bg-white border-2 border-indigo-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                        {tip.num}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
                        <p className="text-gray-700">{tip.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the difference between ethnicity and race?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Ethnicity refers to shared cultural characteristics including language, religion, national origin, and traditions. Race is a broader social and physical classification based on appearance and ancestry. Our calculator focuses on ethnic and national origin percentages, which are more specific and culturally meaningful than broad racial categories.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How accurate is an ethnicity calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    A parent-based ethnicity percentage calculator is as accurate as the information you enter. If you know your parents' backgrounds precisely, results are very accurate. DNA-based calculations depend on the testing company's reference populations and are highly accurate for regional ancestry but less precise for very specific ethnic sub-groups.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can I use an ethnicity calculator for free?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes. Most ethnicity calculator free tools online require no payment, registration, or DNA test. You simply enter your parents' ethnic backgrounds and the tool calculates your estimated percentages instantly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do I calculate my baby's ethnicity?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Enter your own ethnic breakdown as the mother's data and your partner's ethnic breakdown as the father's data. The calculator automatically divides each value by 2 and combines the results to estimate your baby's ethnic heritage percentages.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What if I don't know my full ethnic background?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Enter what you do know and use broader categories for the rest. For example, if you know one parent is from Pakistan but do not know the specific regional background, enter 100% Pakistani. You can refine this later as you research your family history.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Is ethnicity the same as nationality?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    No. Nationality is the country of your citizenship or birth. Ethnicity refers to cultural and ancestral heritage. A person can hold Pakistani nationality while having Balochi, Sindhi, Punjabi, or Pashtun ethnic heritage these are different things.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can a DNA test tell me my exact ethnicity?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    DNA tests give you highly detailed genetic ethnicity estimates, broken down by region. However, they reflect deep genetic ancestry sometimes going back hundreds of years and may differ from your self-identified cultural ethnicity. They are accurate and informative, but should be interpreted alongside your family history.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is an ethnic background calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    An ethnic background calculator is another name for an ethnicity calculator. It estimates the percentage breakdown of your ethnic origins based on your family's known nationalities, cultural heritage, or DNA data.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How does a BMI ethnicity calculator work?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    A BMI ethnicity calculator asks for your height, weight, age, and ethnic background. It then calculates your BMI and applies ethnicity-adjusted health thresholds particularly important for South Asian, East Asian, and Middle Eastern individuals who face higher health risks at lower BMI values compared to European populations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the most accurate ethnicity calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    The most accurate approach combines a free online ethnicity calculator (for a quick estimate based on parents' backgrounds) with a professional DNA ancestry test. The DNA test adds deep genetic data that family history research alone cannot reveal.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Summary</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  An ethnicity calculator gives you a fast, free, and meaningful estimate of your ethnic heritage percentages using information you already know. By entering your parents' and grandparents' ethnic backgrounds, the calculator applies simple percentage arithmetic — each parent contributes 50%, each grandparent 25% to produce your personal ethnic breakdown.
                </p>
                <p>
                  For expecting parents, a baby ethnicity calculator estimates your child's future heritage based on both parents' backgrounds. For health purposes, a BMI calculator with ethnicity applies ethnicity-specific health thresholds that are more accurate than standard BMI for South Asian, East Asian, and Middle Eastern populations. For deep ancestry research, a DNA ethnicity calculator interprets genetic test results to reveal ancient migration patterns and regional ancestry going back hundreds of years.
                </p>
                <div className="bg-white border-2 border-purple-300 rounded-xl p-6 mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Always remember:</h3>
                  <ul className="space-y-2 ml-6">
                    {[
                      "Cultural ethnicity (family history) and genetic ethnicity (DNA) can both be different and both valid.",
                      "Free online calculators work best with precise, well-researched input.",
                      "DNA testing companies like AncestryDNA and 23andMe provide the deepest genetic ancestry analysis.",
                      "Use multiple methods together for the most complete picture of who you are and where you come from.",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
