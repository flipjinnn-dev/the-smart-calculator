"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CombinationSumCalculator from "@/components/combination-sum-calculator"
import { Calculator, Info, BookOpen, Binary, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function CombinationSumCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Combination Sum Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A combination sum calculator finds all unique groups of numbers from a given set that add up to a specific target value. You enter your numbers and a target sum, and the tool shows every possible combination no programming knowledge required.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-purple-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Combination Sum Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <CombinationSumCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What Is Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-purple-600" />
              What Is a Combination Sum Calculator?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                A combination sum calculator is a mathematical tool that takes a list of numbers and a target value, then finds every possible combination of those numbers that adds up to the target. It removes the guesswork from manual trial-and-error and gives you every valid answer instantly.
              </p>
              <p>
                This type of calculator appears in many real-world situations. Budget planning, inventory matching, exam preparation, data reconciliation in Excel or Google Sheets, and competitive programming problems all of them require you to find which numbers combine to hit a specific total.
              </p>
              <p>
                The core problem it solves is called the Combination Sum Problem in computer science and mathematics. Given a set of candidate numbers and a target, return all combinations where the chosen numbers sum to the target. Numbers can sometimes be reused (depending on the version of the problem), and the order does not matter meaning {'{2, 3}'} and {'{3, 2}'} count as the same combination.
              </p>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why the Combination Sum Problem Matters</h2>
            <p className="text-gray-700 mb-6">Before you use a combination sum calculator tool, it helps to understand why this problem is meaningful across so many fields.</p>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">In finance and accounting</h3>
                <p className="text-gray-700">
                  Reconciling transactions is a classic use case. You might have ten invoices and need to figure out which ones add up to a specific payment you received. Doing this manually for even five or six numbers becomes tedious. For ten or more numbers, it becomes nearly impossible without a tool.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">In mathematics and statistics</h3>
                <p className="text-gray-700">
                  The combination sum problem teaches core concepts about recursive thinking, backtracking, and combinatorial logic. Students preparing for competitive mathematics or data science roles encounter these problems regularly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">In software engineering</h3>
                <p className="text-gray-700">
                  This is one of the most frequently asked algorithm problems in technical interviews. Companies like Google, Amazon, and Microsoft use combination sum variants to test a candidate's ability to think recursively and optimize solutions.
                </p>
              </div>
            </div>

            <p className="text-gray-700 mt-6">
              Understanding the problem deeply not just using a calculator gives you an edge in all three areas.
            </p>
          </div>

          {/* How It Works */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How a Combination Sum Calculator Works</h2>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Core Logic Behind the Tool</h3>
            <p className="text-gray-700 mb-6">
              A combination sum calculator uses a method called backtracking. Think of backtracking like exploring a tree of choices. You start with an empty combination, then add one number at a time. If the running total equals the target, you record that combination. If it exceeds the target, you stop that branch and go back (backtrack) to try a different number.
            </p>

            <p className="text-gray-700 mb-4 font-semibold">Here is how the process flows step by step:</p>

            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <h4 className="font-bold text-gray-900 mb-2">Step 1 — Input your data</h4>
                <p className="text-gray-700">You provide two things: a list of candidate numbers (for example: 2, 3, 6, 7) and a target sum (for example: 7).</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h4 className="font-bold text-gray-900 mb-2">Step 2 — The tool begins exploring</h4>
                <p className="text-gray-700">Starting from the first number, it builds combinations by adding one number at a time.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <h4 className="font-bold text-gray-900 mb-2">Step 3 — Running total check</h4>
                <p className="text-gray-700">After each addition, the running total is checked against the target. Equal = record the combination. Exceeds target = backtrack.</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                <h4 className="font-bold text-gray-900 mb-2">Step 4 — All paths explored</h4>
                <p className="text-gray-700">Once every branch of the decision tree is explored, the tool returns a full list of valid combinations.</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-6 border-2 border-gray-300">
              <p className="text-gray-700 mb-3">For the example above (candidates: 2, 3, 6, 7 | target: 7), the valid combinations are:</p>
              <div className="font-mono text-lg space-y-2">
                <p className="text-purple-700">2 + 2 + 3 = 7</p>
                <p className="text-purple-700">7 = 7</p>
              </div>
              <p className="text-gray-700 mt-3">These are the only two unique combinations that sum to 7 from that set.</p>
            </div>
          </div>

          {/* How to Use Online */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use a Combination Sum Calculator Online</h2>
            <p className="text-gray-700 mb-6">Using a combination sum calculator online is straightforward. Most tools follow the same basic interface:</p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Step 1: Enter your candidate numbers</h4>
                <p className="text-gray-700">Type them in separated by commas. For example: 2, 3, 5, 10, 15.</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Step 2: Enter your target sum</h4>
                <p className="text-gray-700">This is the value you want your combination to reach. For example: 20.</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Step 3: Choose your settings</h4>
                <p className="text-gray-700">Some calculators let you decide whether numbers can repeat or whether each number can only be used once. Make sure you select the correct mode for your use case.</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Step 4: Click Calculate</h4>
                <p className="text-gray-700">The tool processes all possible combinations and returns a list of every group that adds up to your target.</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Step 5: Read the output</h4>
                <p className="text-gray-700">Results typically display as grouped sets. {'{5, 15}'}, {'{10, 10}'}, {'{5, 5, 10}'}, and so on — depending on what is valid.</p>
              </div>
            </div>

            <p className="text-gray-700 mt-6">
              Many online combination sum calculators also show you the number of valid combinations found, which is useful when you just need to know whether any solution exists.
            </p>
          </div>

          {/* Excel and Google Sheets */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Combination Sum Calculator in Excel and Google Sheets</h2>
            <p className="text-gray-700 mb-6">
              Many professionals need to find combinations that equal a given sum directly inside a spreadsheet without switching to an external tool. Excel and Google Sheets do not have a built-in combination sum function, but you can replicate the logic using formulas or built-in features.
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Using Excel's Solver Add-In</h3>
                <p className="text-gray-700 mb-4">The most practical approach in Excel is using the Solver add-in:</p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>List your candidate numbers in column A.</li>
                  <li>In column B, create binary decision cells (0 or 1) next to each number.</li>
                  <li>In a separate cell, write a SUMPRODUCT formula: <code className="bg-white px-2 py-1 rounded font-mono text-sm">=SUMPRODUCT(A2:A10, B2:B10)</code></li>
                  <li>Open Solver (Data &gt; Solver).</li>
                  <li>Set the objective cell to your SUMPRODUCT cell.</li>
                  <li>Set it equal to your target value.</li>
                  <li>Set the variable cells to column B.</li>
                  <li>Add a constraint that B cells must be binary (0 or 1).</li>
                  <li>Click Solve.</li>
                </ol>
                <p className="text-gray-700 mt-4">
                  Solver will find one combination. If you need all combinations, you must run Solver multiple times with exclusion constraints added each time.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Using Excel Formulas for Simple Cases</h3>
                <p className="text-gray-700">
                  For small sets, you can test combinations manually using IF and SUM formulas. However, this approach does not scale beyond five or six numbers.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Google Sheets Approach</h3>
                <p className="text-gray-700">
                  Google Sheets has no native Solver equivalent for this problem. For combination sum in Google Sheets, the cleanest approach is to use Google Apps Script to write a backtracking function and run it as a custom formula. This requires basic scripting knowledge but produces complete, automated results.
                </p>
                <p className="text-gray-700 mt-3">
                  If you regularly need this functionality, a dedicated combination sum calculator online tool is faster and more reliable than building it in a spreadsheet from scratch.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Combination Sum vs. Combination Formula — Understanding the Difference</h2>
            <p className="text-gray-700 mb-6">People sometimes confuse two related but different concepts. Here is a clear side-by-side breakdown:</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    <th className="p-4 text-left font-bold">Feature</th>
                    <th className="p-4 text-left font-bold">Combination Formula (nCr)</th>
                    <th className="p-4 text-left font-bold">Combination Sum Problem</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold bg-gray-50">What it does</td>
                    <td className="p-4">Counts how many ways you can choose r items from n items</td>
                    <td className="p-4">Finds every specific group of numbers that adds up to a target total</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold bg-gray-50">Also written as</td>
                    <td className="p-4">C(n, r) or nCr</td>
                    <td className="p-4">Combination Sum Calculator</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold bg-gray-50">Formula used</td>
                    <td className="p-4">C(n, r) = n! / (r! × (n − r)!)</td>
                    <td className="p-4">Backtracking / Recursive Algorithm</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold bg-gray-50">Example</td>
                    <td className="p-4">C(5, 2) = 10 ways to choose 2 items from 5</td>
                    <td className="p-4">Candidates: {'{2, 3, 6, 7}'} → Target: 7 → Results: {'{7}'}, {'{2, 2, 3}'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold bg-gray-50">Output type</td>
                    <td className="p-4">A single number (count of arrangements)</td>
                    <td className="p-4">A list of all valid number groups</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold bg-gray-50">Cares about order?</td>
                    <td className="p-4">No</td>
                    <td className="p-4">No</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold bg-gray-50">Cares about values?</td>
                    <td className="p-4">No only counts selections</td>
                    <td className="p-4">Yes actual numbers must sum to target</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold bg-gray-50">Used in</td>
                    <td className="p-4">Probability, statistics, combinatorics</td>
                    <td className="p-4">Finance, programming, exam prep, reconciliation</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold bg-gray-50">What you get</td>
                    <td className="p-4">How many combinations exist</td>
                    <td className="p-4">Which exact combinations exist</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold bg-gray-50">Tool needed</td>
                    <td className="p-4">nCr calculator</td>
                    <td className="p-4">Combination sum calculator</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Types of Problems */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Combination Sum Problems</h2>
            <p className="text-gray-700 mb-6">Not all combination sum problems are the same. The calculator you use should match the type of problem you have.</p>
            
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Type 1 — Numbers Can Repeat (Unlimited Use)</h3>
                <p className="text-gray-700 mb-3">
                  In this version, you can use any number from the candidate list as many times as needed. Example: candidates = {'{2, 3}'}, target = 6. Valid combinations include {'{2, 2, 2}'}, {'{3, 3}'}, and {'{2, 2, ... wait 2+2+2=6, 3+3=6}'}. Both are valid.
                </p>
                <p className="text-gray-700">
                  This is the classic LeetCode Combination Sum I problem and the most common version in programming interviews.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Type 2 — Each Number Used Once</h3>
                <p className="text-gray-700 mb-3">
                  Here, every candidate number can only be used one time. Example: candidates = {'{2, 3, 5}'}, target = 8. You cannot use 2 twice. Valid combinations are only those where each number appears at most once.
                </p>
                <p className="text-gray-700">
                  This is the LeetCode Combination Sum II variant, often seen in real-world scenarios like invoice matching.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Type 3 — Numbers From 1 to 9, Limited Count</h3>
                <p className="text-gray-700">
                  Some problems restrict candidates to digits 1–9 and require you to find combinations using exactly k numbers. This variant appears in advanced mathematics problems and some school-level competitive exams.
                </p>
              </div>
            </div>
          </div>

          {/* Real-World Use Cases */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases for a Combination Sum Calculator</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Budget and Expense Reconciliation</h3>
                <p className="text-gray-700">
                  A finance team receives a payment of PKR 85,000. They have seven open invoices of different amounts. They need to know which invoices add up to exactly 85,000 so they can allocate the payment correctly. A combination sum calculator handles this in seconds.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Classroom and Exam Preparation</h3>
                <p className="text-gray-700">
                  Students in mathematics, computer science, and data science programs encounter combination sum problems in coursework. Using a combination sum calculator helps verify manual solutions and build intuition for how backtracking works.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Inventory and Order Matching</h3>
                <p className="text-gray-700">
                  A warehouse needs to fill a 500 kg shipping container. They have items of various weights. Which items can they combine to fill exactly 500 kg? A number combination sum calculator finds every valid packing option.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Programming Interview Preparation</h3>
                <p className="text-gray-700">
                  Technical interviews at top companies regularly feature combination sum problems. Practicing with a calculator helps candidates check their algorithm's output against the correct answer.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Sports and Fantasy League Scoring</h3>
                <p className="text-gray-700">
                  In points-based games and fantasy leagues, players and managers check whether specific score combinations reach a given total for example, finding which combination of goals, assists, and bonuses reaches 50 fantasy points.
                </p>
              </div>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Mistakes When Using a Combination Sum Calculator</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 1 — Ignoring Duplicate Handling</h3>
                <p className="text-gray-700">
                  Some calculators treat {'{2, 3}'} and {'{3, 2}'} as different combinations. A correctly built tool should treat them as identical since order does not matter in combination sums. Always check whether your tool produces duplicate results.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 2 — Not Specifying Whether Repetition Is Allowed</h3>
                <p className="text-gray-700">
                  This changes the output dramatically. Always confirm whether your problem allows a number to be reused before interpreting the results.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 3 — Using Very Large Candidate Sets Without Filtering</h3>
                <p className="text-gray-700">
                  The number of valid combinations can grow exponentially as your candidate list grows. If you have 30 numbers and a large target, the calculator may produce thousands of results. Filter your candidate list first to keep results manageable.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 4 — Confusing Sum With Product</h3>
                <p className="text-gray-700">
                  A combination sum calculator adds numbers. It does not multiply them. If you need a target product (numbers that multiply to a value), you need a different type of tool.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-purple-600" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is a combination sum calculator used for?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  A combination sum calculator finds all groups of numbers from a given list that add up to a specific target value. People use it for budget reconciliation, exam preparation, programming interview practice, inventory matching, and any situation where you need to find which numbers hit a specific total.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Can I find combinations that equal a given sum in Excel?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes. Excel's Solver add-in lets you find one combination at a time. For all combinations, you either run Solver repeatedly with exclusion constraints or use a VBA macro to automate the backtracking logic. An online combination sum calculator tool is usually faster for this task.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Does the combination sum calculator allow number repetition?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  It depends on the tool and the type of problem. Some calculators allow each number to be used unlimited times (Type 1). Others restrict each number to a single use (Type 2). Always check the tool's settings before using results.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the difference between a combination and a permutation in this context?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  A combination ignores order {'{2, 3}'} and {'{3, 2}'} are the same. A permutation counts them as different. Combination sum calculators work with combinations, so order does not affect the results.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Is there a formula for calculating combination sums?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  There is no single closed-form formula for finding all combination sums the way there is for nCr. The solution requires algorithmic exploration (backtracking). However, the number of combinations can sometimes be estimated using dynamic programming counting techniques.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How many combinations can a combination sum calculator handle?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Most online tools handle candidate sets of up to 20–30 numbers comfortably. Beyond that, results can become very large and tools may slow down or time out. For very large sets, filtering candidates or using a programmatic solution (Python, Java) is more practical.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Can a combination sum calculator work with decimal numbers?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Most calculators work best with integers. Decimal inputs can sometimes cause floating-point precision errors. If you must use decimals, multiply all values by a factor (e.g., 100) to convert them to integers, run the calculator, then interpret results accordingly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the combination sum problem in computer science?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  The combination sum problem is a classic recursive algorithm problem where you find all subsets of a given candidate array that sum to a target value. It is a standard problem in coding interviews and algorithm courses, typically solved using backtracking with pruning to reduce unnecessary computation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
