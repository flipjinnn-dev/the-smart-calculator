"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MSICalculator from "@/components/msi-calculator"
import { Zap, Calculator, Info, AlertCircle, BookOpen, TrendingUp, Cpu, HardDrive, CheckCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function MSICalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            MSI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Power Supply, Wattage & PC Build Calculator
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Answer</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                An MSI calculator helps you estimate your PC's power consumption, PSU wattage requirements, and component compatibility. It analyzes CPU, GPU, RAM, storage, and other hardware to calculate total wattage and recommend the ideal power supply for stable performance.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                MSI Calculator (Power Supply, PSU, Wattage & PC Build Tool)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <MSICalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-blue-600" />
                MSI Calculator (Power Supply, PSU, Wattage & PC Build Tool)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  An MSI calculator is a powerful online tool designed for gamers, PC builders, and IT professionals who want to calculate system power consumption, choose the right PSU, and avoid performance bottlenecks.
                </p>
                <p className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <strong>Real-World Experience:</strong> From my hands-on experience building gaming PCs and workstations, choosing the wrong power supply is one of the most common mistakes. Many users either overspend on high wattage or underestimate their system needs. A reliable MSI power supply calculator solves this problem instantly.
                </p>
              </div>
            </div>

            {/* What Is Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is an MSI Calculator?</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                An MSI calculator is a digital tool that helps you estimate:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Total system wattage",
                  "PSU (Power Supply Unit) requirements",
                  "GPU and CPU power consumption",
                  "Bottleneck analysis",
                  "PC build compatibility",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white border-2 border-purple-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                It works by analyzing your hardware configuration and applying real-world power consumption data.
              </p>
            </div>

            {/* Why You Need */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Why You Need an MSI Power Supply Calculator</h2>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "1. Prevent System Crashes", desc: "An underpowered PSU can cause random shutdowns and instability." },
                    { title: "2. Optimize Performance", desc: "Correct wattage ensures stable GPU and CPU performance." },
                    { title: "3. Save Money", desc: "Avoid overspending on unnecessarily high wattage PSUs." },
                    { title: "4. Improve System Longevity", desc: "Balanced power distribution increases hardware lifespan." },
                  ].map((item, index) => (
                    <div key={index} className="p-5 bg-blue-50 border-2 border-blue-200 rounded-xl">
                      <h3 className="text-xl font-bold text-blue-600 mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MSI PSU Calculator */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">MSI Calculator Power Supply (PSU)</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The MSI PSU calculator estimates how much power your system needs based on:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  "CPU TDP",
                  "GPU consumption",
                  "Number of drives",
                  "Cooling systems",
                  "Motherboard and RAM usage",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white border-2 border-green-200 rounded-lg">
                    <Cpu className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white border-2 border-green-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Recommended PSU Buffer</h3>
                <p className="text-gray-700 leading-relaxed">
                  Always add a 20–30% buffer to calculated wattage for safety and future upgrades.
                </p>
              </div>
            </div>

            {/* Wattage Calculator */}
            <div className="bg-white border-2 border-yellow-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">MSI Wattage Calculator & Power Consumption</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  The MSI wattage calculator determines total system power usage.
                </p>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Components Affecting Power:</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "CPU (Processor)",
                      "GPU (Graphics Card)",
                      "RAM",
                      "SSD/HDD",
                      "Cooling Fans",
                      "RGB lighting",
                    ].map((component, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span className="font-semibold">{component}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg text-gray-700">
                  <strong>Experience Note:</strong> From my experience, GPUs contribute the most to power consumption, especially in gaming PCs.
                </p>
              </div>
            </div>

            {/* PC Build Calculator */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">MSI PC Build Calculator</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The MSI PC build calculator helps you plan your entire system.
              </p>

              <div className="bg-white border-2 border-indigo-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Features:</h3>
                <div className="space-y-3">
                  {[
                    "Component compatibility check",
                    "Power requirement estimation",
                    "Upgrade planning",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-indigo-50 border-2 border-indigo-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-gray-700">
                  This tool is extremely useful for beginners building their first PC.
                </p>
              </div>
            </div>

            {/* GPU Calculator */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">MSI GPU Calculator</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  A GPU calculator estimates power usage of graphics cards.
                </p>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Why It Matters:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Modern GPUs like RTX series consume high wattage, making accurate calculation essential.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottleneck Calculator */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">MSI Bottleneck Calculator</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The MSI bottleneck calculator analyzes CPU and GPU pairing.
              </p>

              <div className="bg-white border-2 border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits:</h3>
                <div className="space-y-3">
                  {[
                    "Prevent performance imbalance",
                    "Optimize gaming FPS",
                    "Improve system efficiency",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-semibold">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Power Consumption Calculator */}
            <div className="bg-white border-2 border-teal-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">MSI Power Consumption Calculator</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  This tool calculates total energy usage of your PC.
                </p>

                <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Use Cases:</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      "Gaming setups",
                      "Workstations",
                      "Mining rigs",
                    ].map((useCase, index) => (
                      <div key={index} className="p-4 bg-white border-2 border-teal-200 rounded-lg text-center">
                        <p className="text-gray-700 font-semibold">{useCase}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* TDP Calculator */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">MSI TDP Calculator</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                TDP (Thermal Design Power) is critical for estimating heat and power usage.
              </p>

              <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Importance:</h3>
                <div className="space-y-3">
                  {[
                    "Helps select cooling systems",
                    "Impacts PSU selection",
                  ].map((point, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 border-2 border-orange-200 rounded-lg">
                      <HardDrive className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-semibold">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Afterburner Calculator */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">MSI Afterburner Calculator</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Used alongside MSI Afterburner for GPU tuning.
                </p>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Functions:</h3>
                  <div className="space-y-2">
                    {[
                      "Voltage adjustments",
                      "Power limit settings",
                      "Overclocking calculations",
                    ].map((func, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-700">
                        <span className="text-blue-600 font-bold">•</span>
                        <span className="font-semibold">{func}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DRAM Calculator */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">MSI DRAM Calculator</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                This calculator helps optimize RAM timings and performance.
              </p>

              <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Better memory performance",
                    "Improved system stability",
                  ].map((benefit, index) => (
                    <div key={index} className="p-4 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                      <p className="text-gray-700 font-semibold">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Motherboard Calculator */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">MSI Motherboard Calculator</h2>
              <p className="text-gray-700 leading-relaxed">
                Helps evaluate motherboard compatibility and power distribution.
              </p>
            </div>

            {/* Price Calculator */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">MSI Price Calculator</h2>
              <p className="text-gray-700 leading-relaxed">
                Useful for estimating total PC build cost.
              </p>
            </div>

            {/* Formula Section */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">MSI Calculator Formula (Power Consumption)</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  The basic formula used is:
                </p>

                <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-6">
                  <div className="bg-indigo-100 border-2 border-indigo-400 rounded-lg p-4 font-mono text-lg mb-4">
                    <p className="text-gray-900"><strong>Total Wattage = Sum of Component Power Consumption</strong></p>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Where:</strong></p>
                    <p>• CPU Wattage</p>
                    <p>• GPU Wattage</p>
                    <p>• RAM + Storage + Fans</p>
                  </div>
                </div>

                <div className="bg-white border-2 border-indigo-300 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Example:</h3>
                  <div className="space-y-2 text-gray-700 font-mono text-sm">
                    <p>CPU (125W) + GPU (300W) + Other Components (100W) = 525W</p>
                    <p className="text-green-600 font-bold">Recommended PSU = 650W–750W</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                MSI PC Power Supply Calculator (Step-by-Step)
              </h2>
              <div className="space-y-4">
                {[
                  { step: "Step 1: Select CPU", desc: "Choose your processor model." },
                  { step: "Step 2: Select GPU", desc: "Pick your graphics card." },
                  { step: "Step 3: Add Components", desc: "Include RAM, storage, and cooling." },
                  { step: "Step 4: Calculate Wattage", desc: "The tool provides total consumption." },
                  { step: "Step 5: Choose PSU", desc: "Add buffer and select appropriate PSU." },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 bg-white border-2 border-blue-200 rounded-lg">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.step}</h4>
                      <p className="text-gray-700">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reddit Insights */}
            <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">MSI PSU Calculator Reddit Insights</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Many users on Reddit recommend:
                </p>

                <div className="space-y-3">
                  {[
                    "Always add extra wattage headroom",
                    "Avoid cheap PSUs",
                    "Use branded power supplies for safety",
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-semibold">{tip}</span>
                    </div>
                  ))}
                </div>

                <p className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg text-gray-700">
                  <strong>From my experience,</strong> this advice is absolutely correct.
                </p>
              </div>
            </div>

            {/* Different Languages */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">MSI Calculator in Different Languages</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                This tool is globally used:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "kalkulator zasilacza MSI (Polish)",
                  "MSI zasilacz kalkulator",
                  "MSI calculator alimentation (French)",
                  "MSI calculator de watts",
                ].map((lang, index) => (
                  <div key={index} className="p-4 bg-white border-2 border-purple-200 rounded-lg">
                    <p className="text-gray-700 font-semibold">{lang}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-white border-2 border-red-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <AlertCircle className="w-8 h-8" />
                  Common Mistakes When Using MSI Calculator
                </h2>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  {[
                    "Ignoring PSU efficiency rating",
                    "Not adding wattage buffer",
                    "Underestimating GPU usage",
                    "Choosing low-quality PSU brands",
                  ].map((mistake, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-semibold">{mistake}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-World Experience */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
                Real-World Experience & Expert Tips
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  In real PC builds, I have seen systems fail due to poor PSU choices. A good MSI power watt calculator prevents this issue.
                </p>
                <div className="bg-white border-2 border-yellow-300 rounded-xl p-6">
                  <p className="font-bold text-gray-900 mb-3">Always choose:</p>
                  <ul className="space-y-2 ml-6">
                    {[
                      "80+ certified PSU",
                      "Trusted brands",
                      "Slightly higher wattage than calculated",
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQs</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is an MSI PSU calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    It calculates the required power supply wattage for your PC.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How accurate is the MSI wattage calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    It is highly accurate when correct components are selected.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What wattage PSU do I need?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Depends on your system, but always add 20–30% buffer.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can I use MSI calculator for gaming PCs?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes, it is ideal for gaming setups.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is MSI bottleneck calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    It checks CPU and GPU compatibility.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Final Thoughts */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Final Thoughts</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  An MSI calculator is a must-have tool for anyone building or upgrading a PC. It ensures accuracy, improves performance, and prevents costly mistakes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
