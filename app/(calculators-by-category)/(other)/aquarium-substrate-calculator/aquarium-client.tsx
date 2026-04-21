"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AquariumSubstrateCalculator from "@/components/aquarium-substrate-calculator"
import { Droplets, Calculator, Info, BookOpen, CheckCircle, Lightbulb, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AquariumSubstrateCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
            Aquarium Substrate Calculator: How Much Gravel, Sand, or Soil Do You Need?
          </h1>
          {/* <p className="text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">
            Use this aquarium substrate calculator to instantly determine the exact volume and weight of substrate your aquarium requires. Enter your tank length, width, and desired depth (typically 2–4 inches or 5–10 cm for most setups), choose gravel, sand, or nutrient-rich soil, and receive precise results in liters, kilograms, or pounds. For a standard 55-gallon tank with 3 inches of depth, you need about 45–60 liters of substrate depending on type. This aquarium gravel calculator, aquarium sand calculator, and planted aquarium substrate calculator prevent over- or under-buying while ensuring optimal plant growth and fish health. You calculate once, set up confidently, and enjoy a thriving aquarium.
          </p> */}
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-blue-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Aquarium Substrate Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <AquariumSubstrateCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What Is Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Info className="w-8 h-8 text-blue-600" />
              What Is an Aquarium Substrate Calculator and Why Do You Need One?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You rely on an aquarium substrate calculator every time you set up or rescape a tank. This tool solves the common headache of guessing how much substrate for aquarium setups. It computes volume based on your tank dimensions and desired depth, then converts that into practical purchase amounts for gravel, sand, or soil.
              </p>
              <p>
                Experienced aquarists know the frustration of buying extra bags that sit unused or running short mid-setup. Our aquarium substrate volume calculator eliminates guesswork. It handles everything from small nano tanks to large 200-gallon displays. You input simple measurements, select your substrate type, and receive accurate outputs that match real-world bag sizes from brands like ADA, Fluval, Seachem, and CaribSea.
              </p>
              <p>
                Why does accurate calculation matter? Substrate forms the foundation of your aquarium ecosystem. It anchors plant roots, hosts beneficial bacteria, and influences water chemistry. Incorrect amounts lead to wasted money, poor aesthetics, or even health issues for fish and plants. You use this aquarium gravel amount calculator or aquarium sand volume calculator to create stable, beautiful tanks that thrive for years.
              </p>
              <p>
                Semantic SEO highlights related searches like aquarium substrate depth calculator, aquarium gravel depth calculator, and aquarium sand depth calculator because depth directly affects volume. You adjust for slopes, plant types, and tank style all in one place.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-green-600" />
              How Our Aquarium Substrate Calculator Works
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You operate this aquarium substrate calculator in three quick steps. First, measure your aquarium's base length and width in centimeters or inches. Second, decide your target substrate depth front-to-back average for slopes. Third, pick your substrate: gravel for fish-only tanks, sand for natural looks, or aquasoil for planted setups.
              </p>
              <p className="font-semibold">The calculator applies the core formula:</p>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-300 text-center">
                <p className="text-xl font-mono">V = L × W × D</p>
                <p className="text-sm text-gray-600 mt-2">where V is volume in cubic centimeters (or inches), L is length, W is width, and D is desired depth.</p>
              </div>
              <p>
                It then converts to liters (divide by 1,000 for cm³) and estimates weight using substrate-specific densities.
              </p>
              <p>
                You switch between metric and imperial units effortlessly. For planted aquarium substrate calculator users, it factors in higher depths and lighter aquasoil densities. Results show exact liters needed, estimated bags required, and approximate weight in kg or lbs. You edit bag sizes for custom brands to match current pricing or availability.
              </p>
              <p>
                This tool outperforms basic aquarium gravel calculators by including sloped depth averaging and water displacement notes for precise filling. You calculate for any tank size from 10-gallon to 200-gallon and receive tailored recommendations that experienced hobbyists trust.
              </p>
            </div>
          </div>

          {/* Substrate Types */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Droplets className="w-8 h-8 text-teal-600" />
              Understanding Different Types of Aquarium Substrates
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              You choose substrate based on your aquarium goals. Each type behaves differently in volume, weight, and performance. Our aquarium substrate calculator adjusts calculations automatically for these differences.
            </p>

            {/* Gravel */}
            <div className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Aquarium Gravel Calculator: Durable and Versatile</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  You select gravel for fish-only or lightly planted tanks. Gravel particles range from 2–5 mm and provide excellent surface area for beneficial bacteria. It stays clean, resists compaction, and comes in natural or colored varieties.
                </p>
                <p>
                  Our aquarium gravel calculator accounts for medium-density gravel (approximately 1,000 cm³ equals 1 kg). You need roughly 1–1.5 pounds per gallon for a 1-inch layer in standard tanks. Gravel works well for corydoras and other bottom-dwellers when you choose rounded, non-sharp varieties. You avoid fine gravel that traps debris and use our tool to calculate exact amounts for even coverage.
                </p>
              </div>
            </div>

            {/* Sand */}
            <div className="mb-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-l-4 border-orange-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Aquarium Sand Calculator: Natural and Aesthetic Appeal</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  You prefer sand for a soft, natural bottom that mimics riverbeds. Fine sand (0.5–2 mm particles) creates smooth slopes and suits sensitive fish like loaches or gobies. It compacts less than you expect when you rinse it properly.
                </p>
                <p>
                  The aquarium sand calculator uses finer density values (around 600–800 cm³ per kg). You calculate higher weight per volume than gravel because sand packs densely. Play sand or pool filter sand offers budget options, while premium aquarium sands add buffering capacity. You use the aquarium sand depth calculator to maintain 1–2 inches for fish-only setups or deeper layers in planted tanks.
                </p>
              </div>
            </div>

            {/* Aquasoil */}
            <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-l-4 border-green-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Aquarium Soil Substrate Calculator and Planted Aquarium Substrate Calculator</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  You invest in aquasoil or nutrient-rich soil for planted aquariums. These substrates contain minerals, organics, and pH-lowering properties that fuel root growth. Brands like ADA Amazonia or Fluval Stratum release nutrients slowly while supporting carpeting plants and heavy root feeders.
                </p>
                <p>
                  Our aquarium soil substrate calculator and aquarium substrate for plants calculator use lighter densities (often 600 cm³ per kg) because these soils absorb water and expand. You plan deeper layers 3–5 inches average for swords, crypts, and stem plants. You layer nutrient soil at the bottom and cap with 1–2 inches of sand or gravel to prevent clouding. This hybrid approach maximizes plant health while keeping maintenance easy.
                </p>
                <p>
                  You compare options side-by-side in the calculator and see how one bag of ADA Amazonia (9 liters) covers different tank sizes compared to Fluval Stratum.
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Depth */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-purple-600" />
              Recommended Substrate Depth and the Aquarium Substrate Depth Calculator
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You rely on the aquarium substrate depth calculator to set healthy levels. Depth affects plant rooting, bacterial colonization, and gas management.
              </p>
              <p>
                For fish-only tanks, you keep substrate at 1–2 inches (2.5–5 cm). This depth supports bacteria without trapping uneaten food. You use the aquarium gravel depth calculator or aquarium sand depth calculator to avoid excess that leads to anaerobic pockets.
              </p>
              <p>
                In planted aquariums, you aim for 2–4 inches (5–10 cm) average. You create slopes: 2 inches at the front for visibility and 4–6 inches at the back for deep-rooted plants. The planted aquarium substrate calculator recommends averaging high and low points for sloped designs. You achieve stunning aquascapes while ensuring roots access nutrients.
              </p>
              <p>
                Experienced aquarists maintain 3 inches minimum for most carpeting plants and up to 5 inches for large Amazon swords. You monitor and adjust depth during water changes to prevent compaction.
              </p>
            </div>
          </div>

          {/* Step-by-Step Guide */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Step-by-Step Guide: How Much Substrate for Aquarium Setups</h2>
            <p className="text-gray-700 mb-6">You calculate substrate needs accurately with this proven process.</p>
            <div className="space-y-4">
              {[
                { num: "1", title: "Measure your tank base", desc: "Use length and width only ignore height for substrate volume." },
                { num: "2", title: "Decide depth", desc: "Use 2–4 inches for planted tanks or 1–2 inches for fish-only. Average for slopes." },
                { num: "3", title: "Apply the formula", desc: "Volume (cm³) = Length (cm) × Width (cm) × Depth (cm). Convert to liters: divide by 1,000." },
                { num: "4", title: "Adjust for substrate type", desc: "Multiply by density factor (1 kg per 1,000 cm³ for gravel; 1 kg per 600 cm³ for fine soil/sand)." },
                { num: "5", title: "Add 10–15% buffer", desc: "You account for settling and slopes." },
                { num: "6", title: "Check bag equivalents", desc: "Divide total liters by bag size (e.g., 9 liters per ADA bag)." }
              ].map((step) => (
                <div key={step.num} className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-600">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-700">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-700 mt-6">
              You run examples through our aquarium substrate volume calculator for instant verification. For a 48×18-inch tank at 3-inch average depth, you need approximately 52 liters of gravel or 60+ liters of lighter aquasoil.
            </p>
          </div>

          {/* Real-World Examples */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Examples Using the Aquarium Gravel Amount Calculator</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You apply the aquarium gravel amount calculator to common tanks. A 20-gallon long tank (30×12 inches base) at 2 inches depth requires about 10–12 liters or 15–20 pounds of gravel. You rinse thoroughly and layer evenly for a clean look.
              </p>
              <p>
                For a 75-gallon display (48×18 inches), you calculate 40–55 liters depending on depth and type. Experienced setups use 3 inches average and cap soil with gravel to balance cost and performance.
              </p>
            </div>
          </div>

          {/* Sand Tips */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Aquarium Sand Volume Calculator: Tips for Smooth Results</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You achieve professional results with the aquarium sand volume calculator. Sand settles quickly, so you add 10% extra volume. You rinse sand in buckets until water runs clear to prevent clouding. You build gentle slopes by pouring in sections and smoothing with your hands or a tool.
              </p>
              <p>
                Sand shines in low-tech planted tanks when you cap a thin soil layer. You maintain 1.5–3 inches and stir gently during vacuuming to release trapped gases.
              </p>
            </div>
          </div>

          {/* Planted Tank Considerations */}
          <div className="bg-gradient-to-br from-teal-50 to-green-50 border-2 border-teal-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Special Considerations for Planted Aquarium Substrate Calculator Users</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You prioritize nutrient availability in planted tanks. The aquarium substrate for plants calculator factors in aquasoil's lower density and higher initial ammonia release. You plant heavily from day one and perform 50% water changes for the first two weeks.
              </p>
              <p>
                You create a layered system: 2–3 inches of aquasoil at the bottom for roots, topped with 1–2 inches of sand or gravel. This prevents floating debris and keeps the water crystal clear. You add root tabs for extra nutrition in low-nutrient soils.
              </p>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Info className="w-8 h-8 text-red-600" />
              Common Mistakes to Avoid When Calculating Substrate
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>You skip these pitfalls that plague beginners:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Never use tank height instead of substrate depth</li>
                <li>Always average slopes rather than using maximum depth only</li>
                <li>You forget to add buffer volume and end up short</li>
                <li>You ignore substrate type density – soil weighs less per liter than gravel, so you buy more bags for the same volume</li>
                <li>You also overlook maintenance: deep substrate requires occasional stirring or snails for aeration to prevent hydrogen sulfide buildup</li>
              </ul>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              Pro Tips from Experienced Aquarists
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>You gain insider knowledge that elevates your setups:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Rinse all substrates thoroughly before use</li>
                <li>Test water parameters after adding new aquasoil</li>
                <li>Choose dark substrates for shy fish – they feel more secure</li>
                <li>You vacuum only the top layer during maintenance to preserve bacteria</li>
                <li>For large tanks, you calculate in sections and mix substrates for custom looks</li>
                <li>You track costs in the calculator and shop sales for popular brands</li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How much substrate for aquarium do I need as a general rule?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  You follow 1–2 pounds per gallon for gravel at 1-inch depth, but always use the calculator for precision. Planted tanks require more volume due to deeper layers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the best depth for aquarium gravel calculator results?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  You target 1–2 inches for fish-only tanks and 2–4 inches average for planted setups using the aquarium gravel depth calculator.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Does the aquarium sand calculator differ from gravel?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes. Sand packs denser, so you calculate slightly higher weight for the same volume. Results show exact differences.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Can I use the planted aquarium substrate calculator for fish-only tanks?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Absolutely. It works for all setups you simply choose lower depths and inert substrates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do I handle sloped substrate in the calculator?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  You enter the average of highest and lowest points. The tool adjusts volume automatically for realistic coverage.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What if I change substrate types later?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  You rerun the aquarium substrate calculator with new parameters. Most aquarists reuse old substrate as a base layer to save money.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Is there a difference between aquarium soil substrate calculator and regular gravel?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes soil releases nutrients and affects pH. The calculator accounts for these properties so you buy the right amount.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How often should I recalculate substrate needs?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  You recalculate only during rescapes or major upgrades. Regular maintenance preserves your original layer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
