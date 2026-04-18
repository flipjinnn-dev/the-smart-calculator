"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SourdoughCalculator from "@/components/sourdough-calculator"
import { Calculator, Info, BookOpen, Wheat, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SourdoughCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Sourdough Calculator: Complete Guide to Hydration, Ratios & Loaves
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A sourdough calculator helps you scale ingredients, calculate hydration percentages, and balance your starter ratios for consistent, bakery-quality bread at home. Simply enter your desired dough weight or flour amount, set your hydration level (typically 65–80%), and the calculator outputs exact measurements for flour, water, salt, and starter.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-amber-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Sourdough Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <SourdoughCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What Is Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-amber-600" />
              What Is a Sourdough Calculator?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                A sourdough calculator is a baking tool available online and as a free resource that takes the guesswork out of sourdough bread making. Instead of doing baker's math by hand, you input your target dough weight, hydration percentage, starter percentage, and salt percentage. The calculator instantly gives you precise gram measurements for every ingredient.
              </p>
              <p>
                Sourdough baking works on a system called baker's percentages, where every ingredient is expressed as a percentage of the total flour weight. This is different from regular recipe fractions. A sourdough bread calculator makes this system easy to use for beginners and experienced bakers alike.
              </p>
              <p>
                For example, if your recipe calls for 75% hydration and 20% starter, and you want a 900g loaf, you do not need to calculate this manually. The calculator does it for you in seconds.
              </p>
            </div>
          </div>

          {/* Hydration Section */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Hydration Is the Most Important Variable in Sourdough</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Hydration is the ratio of water to flour in your dough, expressed as a percentage. It controls the texture, crumb structure, crust, and difficulty of handling your bread.
              </p>
              <p>
                A sourdough hydration calculator specifically helps you hit the exact water-to-flour ratio your recipe demands and adjust it for your flour type, climate, or personal preference.
              </p>
              <p className="font-semibold text-gray-900">Here is how hydration levels affect your bread:</p>

              <div className="space-y-4 mt-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-2">Low Hydration (60–65%)</h3>
                  <p>Dough is firm and easy to shape. Great for beginners. Produces a tighter, chewier crumb. Ideal for sandwich loaves.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-bold text-gray-900 mb-2">Medium Hydration (70–75%)</h3>
                  <p>The sweet spot for most home bakers. Produces an open crumb with good structure. Still manageable without specialized equipment.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-orange-600">
                  <h3 className="font-bold text-gray-900 mb-2">High Hydration (78–85%)</h3>
                  <p>Produces the large, irregular holes you see in artisan-style bread. Sticky and challenging to handle. Requires strong flour with high protein content and good technique.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-red-600">
                  <h3 className="font-bold text-gray-900 mb-2">Very High Hydration (85%+)</h3>
                  <p>Reserved for experienced bakers. Extremely slack dough. Produces dramatic open crumb but demands precise fermentation control.</p>
                </div>
              </div>

              <p className="mt-4">
                Understanding your hydration target is essential before you mix a single gram of flour. The sourdough hydration calculator removes the calculation burden so you can focus entirely on technique.
              </p>
            </div>
          </div>

          {/* Baker's Percentages */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Baker's Percentages Work And Why You Need a Calculator</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Baker's percentages are the language of professional baking. Every ingredient is measured as a percentage of the total flour weight, which is always set at 100%.
              </p>
              <p className="font-semibold text-gray-900">Here is a standard sourdough formula in baker's percentages:</p>

              <div className="bg-amber-50 p-6 rounded-lg my-4 border-l-4 border-amber-600">
                <ul className="space-y-2 font-mono text-lg">
                  <li><strong>Flour:</strong> 100%</li>
                  <li><strong>Water:</strong> 75% (hydration)</li>
                  <li><strong>Starter:</strong> 20%</li>
                  <li><strong>Salt:</strong> 2%</li>
                </ul>
              </div>

              <p>If your flour weight is 500g, your formula becomes:</p>

              <div className="bg-blue-50 p-6 rounded-lg my-4 border-l-4 border-blue-600">
                <ul className="space-y-2 font-mono text-lg">
                  <li><strong>Flour:</strong> 500g</li>
                  <li><strong>Water:</strong> 375g</li>
                  <li><strong>Starter:</strong> 100g</li>
                  <li><strong>Salt:</strong> 10g</li>
                </ul>
              </div>

              <p>
                This scales perfectly up or down. If you want a larger batch say for two loaves you simply double the flour and every other ingredient scales automatically.
              </p>
              <p>
                The challenge is that your starter also contains flour and water. A sourdough bread calculator accounts for this. If your starter is 100% hydration (equal parts flour and water by weight), then 100g of starter contributes 50g of flour and 50g of water to your dough. Your true flour and water amounts shift accordingly.
              </p>
              <p>
                This is called the true hydration or effective hydration of your dough, and it is nearly impossible to track accurately by mental math across multiple batches. A free sourdough calculator handles this automatically.
              </p>
            </div>
          </div>

          {/* Starter Hydration */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sourdough Starter Hydration: What It Means and Why It Matters</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Your starter is a living culture of wild yeast and lactic acid bacteria. It has its own hydration level separate from your bread dough and this affects how active it is, how sour your bread tastes, and how your final dough behaves.
              </p>
              <p>
                A sourdough starter hydration calculator helps you maintain and adjust your starter's consistency.
              </p>

              <div className="space-y-4 mt-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">100% Hydration Starter (Equal Parts Flour and Water)</h3>
                  <p>This is the most common home baker starter. It has a thick pancake batter consistency. Easy to maintain, predictable, and works well in most recipes.</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">75% Hydration Starter (Stiff Starter)</h3>
                  <p>Used in traditional Italian panettone and some French baguette traditions. Less sour, more yeasty. Produces lighter, sweeter bread. Harder to mix but very powerful.</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">125% Hydration Starter (Liquid Starter)</h3>
                  <p>Very active, more sour flavor, pourable consistency. Spreads quickly through dough. Some bakers prefer this for whole wheat loaves.</p>
                </div>
              </div>

              <p className="mt-4">
                When you change your starter's hydration, it changes the amount of flour and water it contributes to your final dough. The sourdough starter hydration calculator recalibrates your entire recipe around this shift automatically.
              </p>
            </div>
          </div>

          {/* How to Use */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use a Sourdough Calculator Step by Step</h2>
            <p className="text-gray-700 mb-6">Using a free sourdough calculator is straightforward. Here is the exact process:</p>

            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 1: Choose Your Dough Weight or Flour Weight</h3>
                <p className="text-gray-700">Decide how much dough you want to make. A standard 900g loaf needs roughly 850–880g of dough. You can enter either your total desired dough weight or your flour weight as the starting point.</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 2: Set Your Hydration Percentage</h3>
                <p className="text-gray-700">Choose your target hydration. If you are a beginner, start with 70%. If you are working with strong bread flour, you can go up to 75–80%.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 3: Set Your Starter Percentage</h3>
                <p className="text-gray-700">Most recipes use 15–25% starter relative to flour. Higher starter percentages speed up fermentation. Lower percentages slow it down, which often deepens flavor.</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 4: Enter Your Starter's Hydration</h3>
                <p className="text-gray-700">Tell the calculator whether your starter is 100%, 75%, or another hydration. This allows it to account for the flour and water your starter contributes.</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 5: Set Your Salt Percentage</h3>
                <p className="text-gray-700">Standard sourdough uses 2% salt. Some bakers go up to 2.2% for a more pronounced flavor. Salt strengthens gluten and slows fermentation, so this is not a variable to guess.</p>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 6: Read Your Results</h3>
                <p className="text-gray-700">The calculator outputs your exact ingredient weights: total flour, total water, starter, and salt. Some advanced calculators also break down the flour types if you are using a blend of bread flour and whole wheat.</p>
              </div>
            </div>
          </div>

          {/* Scaling Recipes */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Scaling Recipes: The Most Practical Use of a Sourdough Bread Calculator</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                One of the most practical uses of a sourdough bread calculator is scaling. A recipe you found online might make one small loaf. You want to make three large ones. Or you want to divide a restaurant-scale recipe down to a single home loaf.
              </p>
              <p>
                Scaling by hand introduces errors. You might divide some ingredients correctly but forget that changing the salt ratio changes flavor, or that changing the starter percentage changes fermentation timing.
              </p>
              <p>
                A sourdough bread calculator scales everything proportionally and simultaneously. You change one number the target dough weight and every ingredient adjusts.
              </p>
              <p className="font-semibold text-gray-900">This is especially useful when:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You get a new banneton in a different size and need to adjust your dough volume</li>
                <li>You are baking for a large gathering and need to multiply a recipe cleanly</li>
                <li>You are testing a new flour blend and want to keep all other variables identical</li>
                <li>You are comparing two batches at different hydrations side by side</li>
              </ul>
            </div>
          </div>

          {/* Nutrition */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sourdough Nutrition: Understanding What's in Your Loaf</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Many bakers also want to know the nutritional content of their bread. A sourdough bread nutrition calculator estimates calories, carbohydrates, protein, and fiber based on your ingredients and serving size.
              </p>
              <p>Sourdough has genuine nutritional advantages over commercial yeast bread:</p>

              <div className="space-y-3 mt-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Lower Glycemic Index</h3>
                  <p>The long fermentation process breaks down some of the starch and creates organic acids. Studies show sourdough bread raises blood sugar more slowly than conventional bread made with commercial yeast.</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Better Mineral Absorption</h3>
                  <p>Wild fermentation reduces phytic acid in the grain. Phytic acid normally blocks the absorption of minerals like iron, zinc, and magnesium. Sourdough fermentation makes these minerals more bioavailable.</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Improved Digestibility</h3>
                  <p>The lactic acid bacteria in sourdough partially break down gluten proteins during fermentation. Many people with mild gluten sensitivity report tolerating sourdough better than other breads. (This is different from celiac disease, which requires strict gluten avoidance.)</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Probiotic-Adjacent Benefits</h3>
                  <p>While baking kills the live cultures in your starter, the fermentation byproducts organic acids, enzymes, and broken-down starches remain in the bread and support digestive health.</p>
                </div>
              </div>

              <p className="mt-4">
                A nutrition calculator uses the gram weights you enter for each ingredient to calculate macros per slice. This is useful for bakers tracking their intake or baking for someone with specific dietary needs.
              </p>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Sourdough Mistakes and How the Calculator Helps Prevent Them</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 1: Eyeballing Water</h3>
                <p className="text-gray-700">Water is the most impactful variable in sourdough. Adding water by feel rather than by weight is the number one cause of inconsistent results. A hydration calculator forces you to weigh your water precisely.</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 2: Forgetting Starter Contributes Flour and Water</h3>
                <p className="text-gray-700">Many beginner recipes do not explain that your starter is not a neutral ingredient. If your recipe calls for 500g flour and 375g water, but you also add 100g of 100% hydration starter, your true hydration is higher than 75%. The calculator corrects for this automatically.</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 3: Scaling Salt Incorrectly</h3>
                <p className="text-gray-700">Salt is small in volume but critical in function. If you double a recipe but only eyeball the salt, you may end up with a bland loaf or one that ferments so fast it over-proofs. Keeping salt at exactly 2% through a calculator prevents this.</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 4: Using a Recipe Designed for Different Flour</h3>
                <p className="text-gray-700">Whole wheat flour absorbs significantly more water than white bread flour. Rye absorbs even more. If you substitute flours without recalculating hydration, your dough will be either too stiff or impossibly wet. A calculator lets you adjust hydration for your actual flour blend.</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 5: Not Accounting for Altitude or Climate</h3>
                <p className="text-gray-700">Some advanced sourdough calculators include adjustments for high altitude or very dry environments, both of which change how your dough hydrates and ferments.</p>
              </div>
            </div>
          </div>

          {/* Flour Types */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Flour Types and How They Change Your Calculations</h2>
            <p className="text-gray-700 mb-6">
              Not all flour behaves the same way. When you use a sourdough calculator, you need to choose your flour type thoughtfully.
            </p>

            <div className="space-y-3">
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-600">
                <h3 className="font-bold text-gray-900 mb-2">Bread Flour (12–14% protein)</h3>
                <p className="text-gray-700">The standard choice. High protein content builds strong gluten networks. Handles high hydration well.</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-gray-900 mb-2">All-Purpose Flour (10–12% protein)</h3>
                <p className="text-gray-700">Lower protein than bread flour. Works well at 70–72% hydration. Not ideal for very open crumb styles.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <h3 className="font-bold text-gray-900 mb-2">Whole Wheat Flour</h3>
                <p className="text-gray-700">Contains the bran and germ. The bran cuts gluten strands and absorbs more water. If you substitute 20% whole wheat into a recipe, increase hydration by 2–4%.</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <h3 className="font-bold text-gray-900 mb-2">Rye Flour</h3>
                <p className="text-gray-700">Does not form gluten like wheat flour. Very thirsty. Even a 10% rye addition changes dough behavior significantly. Adds deep, earthy flavor and active fermentation.</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                <h3 className="font-bold text-gray-900 mb-2">Einkorn or Ancient Grains</h3>
                <p className="text-gray-700">Lower gluten strength and very high absorption. Require significantly reduced hydration and gentle handling.</p>
              </div>
            </div>

            <p className="text-gray-700 mt-6">
              A good sourdough hydration calculator lets you enter your flour blend percentages so it can adjust the water recommendation accordingly.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-amber-600" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How to calculate sourdough hydration?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Divide water weight by flour weight, then multiply by 100. Example: 375g water ÷ 500g flour × 100 = 75% hydration
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How to calculate hydration of sourdough with starter included?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Include your starter's flour and water in the totals. Example: 370g total water ÷ 500g total flour × 100 = 74% true hydration.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How to calculate sourdough starter hydration?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Divide water by flour in your starter × 100. Example: 100g water ÷ 100g flour × 100 = 100% hydration
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do you calculate hydration in sourdough?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Three steps add all flour, add all water, divide water by flour and multiply by 100.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How to calculate calories in homemade sourdough bread?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Add up calories from all ingredients, then divide by number of slices. A rough estimate is 250–270 calories per 100g of sourdough bread.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Why does my bread taste different even when I follow the exact same recipe?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Sourdough is sensitive to starter health, ambient temperature, water mineral content, and flour age. Two bakers using the same calculator output can get different results. The calculator controls for ingredient ratios, but you still need to develop feel for dough texture and fermentation timing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the ideal salt percentage for sourdough?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Two percent of flour weight is the standard. This is 10g per 500g flour. Some bakers prefer 1.8% for a milder taste or 2.2% for a more seasoned loaf. Going below 1.5% results in bland bread and faster, less controlled fermentation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How does temperature affect fermentation in sourdough?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Warmer environments speed up fermentation. At 24°C (75°F), bulk fermentation typically takes 4–6 hours. At 20°C (68°F), expect 7–10 hours. Some calculators include a fermentation time estimator based on temperature and starter percentage.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
