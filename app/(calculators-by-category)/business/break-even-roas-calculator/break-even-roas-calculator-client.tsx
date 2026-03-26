"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Target, DollarSign, Percent, BarChart, Info, ArrowRight, CheckCircle2, Zap, AlertTriangle, Check, BookOpen, Layers, LineChart, Building2, Server, RefreshCw, ShoppingCart, Box, HelpCircle, Lightbulb, TrendingUp, Table as TableIcon } from "lucide-react"

interface RoasResult {
  grossMarginPercent: number
  grossProfitPerUnit: number
  breakEvenRoas: number
  targetRoas: number | null
  breakEvenAcos: number
}

export default function BreakEvenRoasCalculatorClient() {
  const [sellingPrice, setSellingPrice] = useState<string>("100")
  const [cogs, setCogs] = useState<string>("40")
  const [variableCosts, setVariableCosts] = useState<string>("10")
  const [fees, setFees] = useState<string>("3")
  const [targetProfitMargin, setTargetProfitMargin] = useState<string>("15")
  
  const [result, setResult] = useState<RoasResult | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const calculate = () => {
    setErrorMsg(null)
    const price = parseFloat(sellingPrice)
    const costGoods = parseFloat(cogs || "0")
    const variable = parseFloat(variableCosts || "0")
    const merchantFees = parseFloat(fees || "0")
    const targetProfit = parseFloat(targetProfitMargin || "0")

    if (isNaN(price) || price <= 0) {
      setErrorMsg("Please enter a valid Selling Price greater than 0.")
      return
    }

    const totalCosts = costGoods + variable + merchantFees
    
    if (totalCosts >= price) {
      setErrorMsg("Total costs cannot be greater than or equal to the selling price. You have no gross margin!")
      return
    }

    const grossProfitPerUnit = price - totalCosts
    const grossMarginPercent = (grossProfitPerUnit / price) * 100
    
    // Break-Even ROAS = 1 ÷ Gross Margin % (as decimal)
    const decimalGrossMargin = grossMarginPercent / 100
    const breakEvenRoas = 1 / decimalGrossMargin

    // Break-Even ACOS = Gross Margin %
    const breakEvenAcos = grossMarginPercent

    // Target ROAS = 1 ÷ (Gross Margin - Desired Profit Margin)
    let targetRoas: number | null = null
    const decimalTargetProfit = targetProfit / 100
    
    if (decimalTargetProfit > 0 && decimalTargetProfit < decimalGrossMargin) {
      targetRoas = 1 / (decimalGrossMargin - decimalTargetProfit)
    } else if (decimalTargetProfit >= decimalGrossMargin) {
      setErrorMsg("Target profit margin must be less than your gross margin to be achievable.")
      // Still show the break-even results if the target profit is invalid
    }

    setResult({
      grossMarginPercent,
      grossProfitPerUnit,
      breakEvenRoas,
      targetRoas,
      breakEvenAcos
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header Region */}
      <div className="bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-800 text-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/30 backdrop-blur-md mb-6 border border-indigo-400/30 shadow-2xl">
            <Target className="w-8 h-8 text-indigo-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Break-Even ROAS <span className="text-indigo-400">Calculator</span>
          </h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto font-medium">
            Find the exact Return on Ad Spend threshold where your advertising stops losing money and starts generating profit.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Calculator Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-0 shadow-2xl overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl">
              <CardHeader className="bg-slate-50 border-b border-slate-100 py-6 px-8">
                <CardTitle className="text-2xl font-bold flex items-center text-slate-800">
                  <Calculator className="w-6 h-6 mr-3 text-indigo-600" />
                  Your Business Metrics
                </CardTitle>
                <CardDescription className="text-base text-slate-500 mt-2">
                  Enter your unit economics to determine your Break-Even threshold.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                
                {/* Error Message */}
                {errorMsg && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-800 rounded-md flex items-start">
                    <Info className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                    <p>{errorMsg}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center">
                      Selling Price <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input
                        type="number"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        placeholder="100.00"
                        className="pl-11 h-14 text-lg border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                      COGS (Cost of Goods)
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input
                        type="number"
                        value={cogs}
                        onChange={(e) => setCogs(e.target.value)}
                        placeholder="40.00"
                        className="pl-11 h-14 text-lg border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                      Variable Fulfilment Costs
                    </Label>
                     <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input
                        type="number"
                        value={variableCosts}
                        onChange={(e) => setVariableCosts(e.target.value)}
                        placeholder="10.00"
                        className="pl-11 h-14 text-lg border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                      Merchant/Platform Fees
                    </Label>
                     <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input
                        type="number"
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                        placeholder="3.00"
                        className="pl-11 h-14 text-lg border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-3">
                  <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Target Net Profit Margin (Optional)
                  </Label>
                  <p className="text-sm text-slate-500 pb-1">Calculate the required ROAS to achieve this specific profit margin.</p>
                  <div className="relative max-w-xs">
                    <Input
                      type="number"
                      value={targetProfitMargin}
                      onChange={(e) => setTargetProfitMargin(e.target.value)}
                      placeholder="15"
                      className="pr-11 h-14 text-lg border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl transition-all shadow-sm"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <Percent className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={calculate} 
                  className="w-full h-16 text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
                >
                  Calculate Break-Even ROAS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-6">
              {result ? (
                <>
                  <Card className="border-0 shadow-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-900 text-white">
                    <CardHeader className="bg-white/10 border-b border-white/10 pb-4">
                      <CardTitle className="text-xl font-bold flex items-center justify-between">
                        <span className="flex items-center"><BarChart className="w-5 h-5 mr-2 text-indigo-300" /> Your Minimum ROAS</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                      <div className="mb-2 text-indigo-200 font-medium tracking-wide uppercase text-sm">Break-Even ROAS Floor</div>
                      <div className="text-7xl font-extrabold tracking-tighter mb-4 text-white drop-shadow-lg">
                        {result.breakEvenRoas.toFixed(2)}<span className="text-4xl text-indigo-300">×</span>
                      </div>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-sm font-medium border border-white/20">
                        Gross Margin: {result.grossMarginPercent.toFixed(1)}%
                      </div>
                    </CardContent>
                  </Card>

                  {result.targetRoas && (
                    <Card className="border border-emerald-100 shadow-xl rounded-2xl bg-emerald-50 overflow-hidden">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-1">Target ROAS</p>
                          <p className="text-xs text-emerald-600 font-medium">For {targetProfitMargin}% Net Profit</p>
                        </div>
                        <div className="text-3xl font-extrabold text-emerald-700">
                          {result.targetRoas.toFixed(2)}×
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                     <Card className="border-slate-100 shadow-md rounded-xl">
                      <CardContent className="p-4 flex flex-col items-center text-center justify-center h-full">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Gross Profit / Unit</p>
                        <p className="text-xl font-bold text-slate-800">${result.grossProfitPerUnit.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-slate-100 shadow-md rounded-xl">
                      <CardContent className="p-4 flex flex-col items-center text-center justify-center h-full">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Break-Even ACOS</p>
                        <p className="text-xl font-bold text-slate-800">{result.breakEvenAcos.toFixed(1)}%</p>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <Card className="border-2 border-dashed border-indigo-200 shadow-none rounded-2xl bg-indigo-50/50 h-[400px] flex items-center justify-center">
                  <CardContent className="p-8 text-center flex flex-col items-center justify-center text-indigo-400">
                    <Target className="w-16 h-16 mb-6 opacity-50" />
                    <p className="text-xl font-bold text-indigo-900 mb-2">Awaiting Figures</p>
                    <p className="text-indigo-600/80 max-w-xs">Enter your selling price and costs on the left to instantly reveal your break-even metrics.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

        </div>

        {/* Extensive Article Area */}
        <div className="mt-24 mb-32 max-w-5xl mx-auto space-y-20 px-4 sm:px-0">
          
          {/* Section 1: What Is Break-Even ROAS? */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-2xl">
                <Target className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight m-0">What Is Break-Even ROAS?</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 leading-relaxed text-slate-700 text-lg hover:shadow-md transition-shadow">
                <span className="font-extrabold text-indigo-600 text-xl block mb-2">The Definition</span>
                Break-even ROAS is the minimum Return on Ad Spend a business must achieve to ensure that advertising costs are entirely covered by the gross profit generated from those sales — neither making a net profit nor a loss from that campaign. It is the floor below which every dollar spent on advertising actively destroys business value.
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 leading-relaxed text-slate-700 text-lg hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full pointer-events-none -z-10"></div>
                <span className="font-extrabold text-rose-600 text-xl block mb-2">The Threshold</span>
                Unlike a "good ROAS" target (which factors in desired profit), break-even ROAS is a <strong className="text-rose-600">cost-covering threshold</strong>. It answers the critical question every paid media manager, e-commerce founder, and growth marketer must answer before hitting publish on an ad campaign: <br/><br/><strong className="text-slate-900 text-xl font-serif italic border-l-4 border-rose-300 pl-4 block">"At what revenue multiple does my advertising stop costing me money?"</strong>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-[2rem] p-8 md:p-14 shadow-2xl relative overflow-hidden my-12 border border-indigo-800">
              <div className="absolute top-0 right-0 -mr-24 -mt-24 text-indigo-500/20 w-80 h-80 pointer-events-none blur-sm">
                <Calculator className="w-full h-full" />
              </div>
              <div className="absolute bottom-0 left-0 text-white/5 font-black text-9xl -ml-6 -mb-10 pointer-events-none select-none">
                ROAS
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-6 bg-white/10 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
                  <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold uppercase tracking-widest text-sm text-amber-50">The Golden Formula</span>
                </div>
                
                <div className="text-2xl md:text-5xl font-black text-white mb-8 font-mono bg-white/10 backdrop-blur-md inline-block px-8 py-6 rounded-3xl border border-white/20 shadow-2xl tracking-tight leading-tight">
                  <span className="text-indigo-300 mr-2 md:mr-4">ROAS =</span>
                  1 ÷ <span className="text-amber-400">Gross Margin %</span>
                </div>
                
                <div className="bg-black/20 px-6 py-4 rounded-xl border border-white/5 inline-block max-w-2xl w-full">
                  <p className="text-sm md:text-base text-indigo-200 font-medium m-0 flex items-center justify-center gap-2">
                    <Info className="w-5 h-5 shrink-0" />
                    <span>Where: <strong className="text-white">Gross Margin %</strong> = (Revenue − COGS − Variable Costs − Fees) ÷ Revenue</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl shadow-sm flex items-start gap-6 relative overflow-hidden">
              <div className="bg-emerald-100 p-4 rounded-2xl shrink-0">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-lg text-emerald-900 leading-relaxed m-0 font-medium">
                This single formula is the cornerstone of sustainable performance marketing. A business with a <strong className="text-emerald-700 bg-emerald-200/50 px-2 py-1 rounded">25% net margin needs a ROAS of 4.0×</strong> to break even on ad spend. A business with a <strong className="text-emerald-700 bg-emerald-200/50 px-2 py-1 rounded">50% margin only needs 2.0×</strong>. Understanding this relationship allows marketers to set data-driven bid strategies, establish Target CPA goals, and evaluate the true profitability of every channel.
              </p>
            </div>
          </section>

          {/* Section 2: Step by Step */}
          <section className="space-y-8 relative">
            <h2 className="text-3xl font-extrabold text-slate-900">The Break-Even ROAS Formula — Step by Step</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
              <Card className="border-0 shadow-lg bg-white relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4 font-mono text-lg">1</div>
                  <CardTitle className="text-xl">Calculate Your Gross Margin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Gross margin is the percentage of revenue remaining after subtracting all cost of goods sold (COGS) and variable fulfilment costs. This is not your operating margin or net profit — it is purely the contribution margin available to cover marketing, overheads, and profit.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl text-sm border border-slate-100 font-mono break-all">
                    <div className="font-bold text-slate-800 mb-2 leading-tight">Gross Margin = (Selling Price − COGS − Variable Costs − Merchant Fees) ÷ Selling Price × 100</div>
                    <div className="text-slate-500 mt-2">Example: ($100 − $40 − $10 − $3) ÷ $100 = <strong className="text-emerald-600">47% gross margin</strong></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-4 font-mono text-lg">2</div>
                  <CardTitle className="text-xl">Apply the Break-Even Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 flex flex-col items-center justify-center text-center py-6">
                    <div className="text-indigo-900 font-bold mb-2 font-mono">Break-Even ROAS = 1 ÷ 0.47</div>
                    <div className="text-4xl font-black text-indigo-600">= 2.13×</div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed text-center font-medium">
                    This business must generate $2.13 in revenue for every $1 spent on ads to avoid a loss.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold mb-4 font-mono text-lg">3</div>
                  <CardTitle className="text-xl">Calculate Your Target ROAS (for Profitability)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Break-even is only the starting point. To achieve a target profit margin, you need a higher ROAS. The formula adjusts the effective margin by subtracting your desired profit:
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl text-sm border border-slate-100 font-mono break-all">
                    <div className="font-bold text-slate-800 mb-2 leading-tight">Target ROAS = 1 ÷ (Gross Margin − Desired Profit Margin)</div>
                    <div className="text-slate-500 mt-2">Example (15% target profit): 1 ÷ (0.47 − 0.15) = <strong className="text-purple-600">3.13× Target ROAS</strong></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 3: Reference Table */}
          <section className="space-y-8 my-16">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-100 rounded-2xl">
                <TableIcon className="w-8 h-8 text-teal-600" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight m-0">Break-Even ROAS by Gross Margin — Reference Table</h2>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200 leading-relaxed text-slate-700 text-lg">
              Use this reference table to quickly identify your <strong className="text-teal-700">minimum viable ROAS threshold</strong> based on your business's gross margin profile. Businesses with thin margins — common in competitive consumer electronics or commodity products — need significantly higher ROAS to remain profitable from paid traffic.
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mt-8 ring-1 ring-slate-900/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                      <th className="px-6 py-5 font-bold border-b border-slate-800">Gross Margin</th>
                      <th className="px-6 py-5 font-bold border-b border-slate-800">Break-Even ROAS</th>
                      <th className="px-6 py-5 font-bold text-slate-300 border-b border-slate-800">ROAS for 10% Profit</th>
                      <th className="px-6 py-5 font-bold text-slate-300 hidden md:table-cell border-b border-slate-800">ROAS for 20% Profit</th>
                      <th className="px-6 py-5 font-bold text-slate-300 hidden lg:table-cell border-b border-slate-800">Typical Industry</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 divide-y divide-slate-100">
                    <tr className="hover:bg-rose-50/50 transition-colors group">
                      <td className="px-6 py-5 font-bold text-slate-900 bg-rose-50/30 group-hover:bg-rose-100/50">20%</td>
                      <td className="px-6 py-5 font-black text-rose-600 text-xl tracking-tight">5.00×</td>
                      <td className="px-6 py-5 text-slate-500 font-medium">10.00×</td>
                      <td className="px-6 py-5 text-slate-400 hidden md:table-cell">—</td>
                      <td className="px-6 py-5 text-slate-500 hidden lg:table-cell text-sm">Grocery, commodity retail</td>
                    </tr>
                    <tr className="hover:bg-orange-50/50 transition-colors bg-slate-50/30 group">
                      <td className="px-6 py-5 font-bold text-slate-900 bg-orange-50/30 group-hover:bg-orange-100/50">30%</td>
                      <td className="px-6 py-5 font-black text-orange-600 text-xl tracking-tight">3.33×</td>
                      <td className="px-6 py-5 text-slate-500 font-medium">5.00×</td>
                      <td className="px-6 py-5 text-slate-500 hidden md:table-cell font-medium">10.00×</td>
                      <td className="px-6 py-5 text-slate-500 hidden lg:table-cell text-sm">Consumer electronics, FMCG</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition-colors group">
                      <td className="px-6 py-5 font-bold text-slate-900 bg-amber-50/30 group-hover:bg-amber-100/50">40%</td>
                      <td className="px-6 py-5 font-black text-amber-600 text-xl tracking-tight">2.50×</td>
                      <td className="px-6 py-5 text-slate-500 font-medium">3.33×</td>
                      <td className="px-6 py-5 text-slate-500 hidden md:table-cell font-medium">5.00×</td>
                      <td className="px-6 py-5 text-slate-500 hidden lg:table-cell text-sm">Apparel, home goods</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/50 transition-colors bg-slate-50/30 group">
                      <td className="px-6 py-5 font-bold text-slate-900 bg-emerald-50/30 group-hover:bg-emerald-100/50">50%</td>
                      <td className="px-6 py-5 font-black text-emerald-600 text-xl tracking-tight">2.00×</td>
                      <td className="px-6 py-5 text-slate-500 font-medium">2.50×</td>
                      <td className="px-6 py-5 text-slate-500 hidden md:table-cell font-medium">3.33×</td>
                      <td className="px-6 py-5 text-slate-500 hidden lg:table-cell text-sm">Beauty, supplements</td>
                    </tr>
                    <tr className="hover:bg-teal-50/50 transition-colors group">
                      <td className="px-6 py-5 font-bold text-slate-900 bg-teal-50/30 group-hover:bg-teal-100/50">60%</td>
                      <td className="px-6 py-5 font-black text-teal-600 text-xl tracking-tight">1.67×</td>
                      <td className="px-6 py-5 text-slate-500 font-medium">2.00×</td>
                      <td className="px-6 py-5 text-slate-500 hidden md:table-cell font-medium">2.50×</td>
                      <td className="px-6 py-5 text-slate-500 hidden lg:table-cell text-sm">SaaS, digital products</td>
                    </tr>
                    <tr className="hover:bg-cyan-50/50 transition-colors bg-slate-50/30 group">
                      <td className="px-6 py-5 font-bold text-slate-900 bg-cyan-50/30 group-hover:bg-cyan-100/50">70%</td>
                      <td className="px-6 py-5 font-black text-cyan-600 text-xl tracking-tight">1.43×</td>
                      <td className="px-6 py-5 text-slate-500 font-medium">1.67×</td>
                      <td className="px-6 py-5 text-slate-500 hidden md:table-cell font-medium">2.00×</td>
                      <td className="px-6 py-5 text-slate-500 hidden lg:table-cell text-sm">Software, courses</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-6 py-5 font-bold text-slate-900 bg-blue-50/30 group-hover:bg-blue-100/50">80%</td>
                      <td className="px-6 py-5 font-black text-blue-600 text-xl tracking-tight">1.25×</td>
                      <td className="px-6 py-5 text-slate-500 font-medium">1.43×</td>
                      <td className="px-6 py-5 text-slate-500 hidden md:table-cell font-medium">1.67×</td>
                      <td className="px-6 py-5 text-slate-500 hidden lg:table-cell text-sm">Pure digital, licensing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why Break-Even ROAS Matters More Than Average ROAS</h2>
            
            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-lg bg-white relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>
                <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
                  <div className="text-5xl font-black text-rose-500 mb-4 tracking-tighter">68%</div>
                  <p className="text-slate-600 font-medium">of advertisers don't account for COGS when setting ROAS targets</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
                  <div className="text-5xl font-black text-amber-500 mb-4 tracking-tighter">3.7×</div>
                  <p className="text-slate-600 font-medium">average e-commerce ROAS across Google Shopping campaigns</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
                  <div className="text-5xl font-black text-indigo-500 mb-4 tracking-tighter">40%</div>
                  <p className="text-slate-600 font-medium">of brands with "good" ROAS are still losing money on ads due to margin blindness</p>
                </CardContent>
              </Card>
            </div>

            <div className="prose prose-lg prose-slate max-w-none text-slate-600">
              <p>The advertising industry has long treated ROAS as a performance metric, but it is fundamentally a profitability signal only when interpreted relative to margin. A 4.0× ROAS sounds excellent — but if your gross margin is 20%, you're still losing money. A 2.2× ROAS sounds weak — but a 60% margin business is generating healthy profit at that level.</p>
              <p>Break-even ROAS reframes the conversation from "how much revenue are we generating per ad dollar?" to "are we covering our costs and building sustainable growth?" This is the distinction between vanity metrics and operational intelligence.</p>
            </div>
          </section>

          {/* Section 5: When to Recalculate */}
          <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl my-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/10 rounded-xl">
                  <RefreshCw className="w-8 h-8 text-indigo-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold m-0 text-white">When to Recalculate Your Break-Even ROAS</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  "Supplier cost changes (COGS increase affects margin directly)",
                  "New fulfilment partners, 3PL pricing renegotiation",
                  "Platform fee changes (Shopify, Amazon, Stripe rate updates)",
                  "New product lines with different margin profiles",
                  "Seasonal promotions and discounting strategies",
                  "Currency fluctuations for international brands",
                  "Introducing new ad channels with different cost structures"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 flex-none" />
                    <span className="text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 6: Break-Even ROAS vs. Target ROAS vs. MER */}
          <section className="space-y-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight border-b pb-4">Break-Even ROAS vs. Target ROAS vs. MER</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3 text-slate-900">
                  <Target className="w-5 h-5 text-rose-500" /> Break-Even ROAS
                </h3>
                <p className="text-slate-600 leading-relaxed">The floor. The minimum return needed to avoid losing money on advertising. Set this as your absolute campaign-level threshold — if a campaign falls below this for more than one attribution window, it requires immediate review or pausing.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3 text-slate-900">
                  <LineChart className="w-5 h-5 text-emerald-500" /> Target ROAS (tROAS)
                </h3>
                <p className="text-slate-600 leading-relaxed">Your profitable ROAS goal. This is break-even ROAS plus the uplift needed to achieve your desired net margin. In Google Ads and Meta Ads, Target ROAS is the bid strategy input — platforms will optimise toward this number. Setting it too close to break-even gives no room for error; setting it too high can throttle spend and prevent scale.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3 text-slate-900">
                  <Layers className="w-5 h-5 text-indigo-500" /> Marketing Efficiency Ratio (MER)
                </h3>
                <p className="text-slate-600 leading-relaxed">MER (also called blended ROAS) is the ratio of total revenue to total ad spend across all channels. It corrects for attribution fragmentation — the problem where Meta Ads, Google Ads, and email all claim credit for the same conversion. MER is your business's true advertising efficiency signal. Your break-even ROAS should be benchmarked against MER, not just channel-level ROAS, which is almost always overstated.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mt-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 text-slate-900 text-sm tracking-wide">
                      <th className="px-6 py-4 font-bold border-b">Metric</th>
                      <th className="px-6 py-4 font-bold border-b">What It Measures</th>
                      <th className="px-6 py-4 font-bold border-b">How To Use It</th>
                      <th className="px-6 py-4 font-bold border-b">Limitation</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600 divide-y divide-slate-100 text-sm">
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">Break-Even ROAS</td>
                      <td className="px-6 py-4">Cost-covering threshold</td>
                      <td className="px-6 py-4">Set campaign floor; pause below this</td>
                      <td className="px-6 py-4 text-slate-400">Ignores overhead costs</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">Target ROAS</td>
                      <td className="px-6 py-4">Profit-generating goal</td>
                      <td className="px-6 py-4">Bid strategy input in ad platforms</td>
                      <td className="px-6 py-4 text-slate-400">Attribution dependent</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">MER (Blended ROAS)</td>
                      <td className="px-6 py-4">Whole-business ad efficiency</td>
                      <td className="px-6 py-4">Monthly business health check</td>
                      <td className="px-6 py-4 text-slate-400">Doesn't isolate channels</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">POAS (Profit on Ad Spend)</td>
                      <td className="px-6 py-4">Actual dollar profit per ad dollar</td>
                      <td className="px-6 py-4">Product-level profitability analysis</td>
                      <td className="px-6 py-4 text-slate-400">Requires advanced data setup</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 7: How to Use Break-Even ROAS in Google Ads & Meta Ads */}
          <section className="space-y-6 pt-5">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How to Use Break-Even ROAS in Google Ads & Meta Ads</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">Google Ads: Smart Bidding with tROAS</h3>
                <p className="text-slate-600 leading-relaxed">In Google Ads, you input your Target ROAS as a bidding strategy for Shopping campaigns, Performance Max, and Search. Google's machine learning system will adjust bids in real time to achieve that ROAS across auctions. The critical error most advertisers make is inputting a tROAS without first establishing their break-even floor — meaning they might "achieve" their stated ROAS goal while still operating below the profitability threshold.</p>
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 flex gap-4 mt-4">
                  <Info className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                  <p className="text-indigo-900 leading-relaxed m-0 text-sm">
                    <strong>Best practice:</strong> Set your tROAS at least 15–30% above your break-even ROAS to absorb attribution inaccuracies, seasonal variance, and platform learning periods. For a business with a 2.13× break-even ROAS, a minimum campaign tROAS of 2.50–2.75× is prudent before scaling.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">Meta Ads: Cost Cap and Minimum ROAS Bidding</h3>
                <p className="text-slate-600 leading-relaxed">Meta's Minimum ROAS bid strategy (available in Advantage+ Shopping Campaigns) allows advertisers to set a purchase value floor. If Meta cannot find conversions meeting your minimum ROAS, it will reduce delivery rather than spend below your profitability threshold. This feature directly operationalises break-even ROAS as a guardrail within campaign delivery — making it one of the most powerful applications of this metric for DTC brands.</p>
                
                <h3 className="text-xl font-bold mt-8">Handling Attribution Windows</h3>
                <p className="text-slate-600 leading-relaxed">Both Google and Meta report ROAS based on their own attribution models, which typically lead to double-counting. A blended view using your actual revenue (from Shopify, WooCommerce, or your CRM) divided by total ad spend gives a more accurate MER. Your break-even ROAS target should be applied to this blended figure for strategic decisions, while platform-level tROAS is used for bid management within each channel.</p>
              </div>
            </div>
          </section>

          {/* Section 8: Common Mistakes When Calculating Break-Even ROAS */}
          <section className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Common Mistakes When Calculating Break-Even ROAS</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50/50 border border-red-100 p-8 rounded-2xl hover:bg-red-50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600 shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900 m-0">Mistake 1: Using Revenue Margin Instead of Gross Margin</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">Net profit margin includes fixed overheads (salaries, rent, SaaS tools). Gross margin is the correct denominator — it represents only variable costs directly tied to each unit sold. Using net margin inflates your break-even ROAS artificially.</p>
              </div>

              <div className="bg-red-50/50 border border-red-100 p-8 rounded-2xl hover:bg-red-50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600 shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900 m-0">Mistake 2: Ignoring Returns and Refund Rates</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">A 15% return rate in apparel means your effective revenue per sale is 85% of the sale price. Build return rate adjustments into your COGS or gross margin calculation to avoid optimising campaigns toward revenue that doesn't materialise.</p>
              </div>

              <div className="bg-red-50/50 border border-red-100 p-8 rounded-2xl hover:bg-red-50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600 shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900 m-0">Mistake 3: Setting One ROAS Target Across All Products</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">A hero product with 60% margin and a loss-leader bundle with 20% margin require radically different break-even ROAS thresholds. Blending them into one target causes the algorithm to favour high-revenue but low-margin products, destroying overall profitability.</p>
              </div>

              <div className="bg-red-50/50 border border-red-100 p-8 rounded-2xl hover:bg-red-50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600 shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900 m-0">Mistake 4: Treating Break-Even ROAS as a Fixed Number</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">Costs change. Supplier prices increase, platform fees shift, new fulfilment partners are onboarded. Recalculate break-even ROAS quarterly or whenever a material cost change occurs. Treating it as static allows margin erosion to go undetected for months.</p>
              </div>
            </div>
          </section>

          {/* Section 9: Break-Even ROAS for Different Business Models */}
          <section className="space-y-6 pt-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Break-Even ROAS for Different Business Models</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4 text-indigo-600 gap-3">
                    <ShoppingCart className="w-6 h-6 shrink-0" />
                    <h3 className="text-xl font-bold m-0 p-0">D2C E-Commerce (Shopify / WooCommerce)</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed m-0">Direct-to-consumer brands typically have gross margins of 40–65%. At these margins, break-even ROAS ranges from 1.54× to 2.50×. The greater challenge is accounting for customer lifetime value (LTV). If your average customer purchases 3× per year, you can afford to acquire them at a break-even or slight loss on the first purchase, banking on repeat revenue to justify the initial CAC.</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4 text-orange-500 gap-3">
                    <Box className="w-6 h-6 shrink-0" />
                    <h3 className="text-xl font-bold m-0 p-0">Amazon FBA and Marketplace Sellers</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed m-0">Amazon FBA introduces significant additional variable costs: referral fees (typically 8–15% of sale price), FBA fulfilment fees, storage fees, and optional advertising placement. These must all be factored into your gross margin before calculating break-even ROAS for Sponsored Products or Sponsored Brands campaigns. Amazon's own metric, ACOS (Advertising Cost of Sale), is the inverse of ROAS and can be directly derived: Break-Even ACOS = Gross Margin %.</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4 text-blue-500 gap-3">
                    <Building2 className="w-6 h-6 shrink-0" />
                    <h3 className="text-xl font-bold m-0 p-0">Lead Generation and Service Businesses</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed m-0">For non-e-commerce businesses, ROAS in the traditional sense is replaced by Cost Per Lead (CPL) or Cost Per Acquisition (CPA). However, the break-even logic applies identically: your maximum allowable CPA equals gross margin per customer ÷ desired acquisition efficiency. This is calculated directly in the calculator above.</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4 text-teal-500 gap-3">
                    <Server className="w-6 h-6 shrink-0" />
                    <h3 className="text-xl font-bold m-0 p-0">SaaS and Subscription Models</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed m-0">SaaS businesses benefit from high gross margins (70–90%) but must consider LTV:CAC ratio as the primary profitability indicator. Break-even ROAS is still relevant for paid acquisition channels targeting trial signups or demos, but must be modelled against monthly churn rate and average contract value to determine payback period — typically 12–18 months for healthy SaaS companies.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 10: FAQs */}
          <section className="space-y-8 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-indigo-600" />
              <h2 className="text-3xl font-extrabold text-slate-900 m-0">Frequently Asked Questions</h2>
            </div>
            
            <div className="grid gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">What is a good ROAS for e-commerce?</h3>
                <p className="text-slate-600 leading-relaxed m-0">A "good" ROAS is entirely relative to your gross margin. As a baseline, most e-commerce brands aim for a 3×–5× ROAS, but this is meaningless without context. A business with a 30% margin needs at least 3.33× to break even; that same 3× ROAS represents a loss. A business with 60% margin is profitable at 2×. Always calculate your break-even ROAS first, then define "good" as any ROAS that meaningfully exceeds that threshold while allowing for scale.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">How does break-even ROAS relate to ACOS on Amazon?</h3>
                <p className="text-slate-600 leading-relaxed m-0">ACOS (Advertising Cost of Sale) is the inverse of ROAS: ACOS = 1 ÷ ROAS × 100. Your break-even ACOS is numerically equal to your gross margin percentage. If your gross margin is 35%, your break-even ACOS is 35%. Anything above this and your ads are running at a net loss. Amazon sellers should target an ACOS meaningfully below their gross margin — typically 15–25% below — to ensure sustainable profitability after all fees.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Should I include shipping costs in my break-even ROAS calculation?</h3>
                <p className="text-slate-600 leading-relaxed m-0">Yes, always. If you offer free shipping, the cost is borne by your business and must be treated as a variable cost deducted from gross margin. If shipping is charged to the customer, only include any subsidised portion. Fulfilment costs — picking, packing, warehouse handling — should also be included. Omitting these systematically overstates your margin and understates your true break-even ROAS, leading to campaigns that appear profitable but are not.</p>
              </div>

               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Can break-even ROAS be below 1?</h3>
                <p className="text-slate-600 leading-relaxed m-0">Mathematically, break-even ROAS can only be below 1× if gross margin exceeds 100%, which is not possible for physical products but can theoretically occur with certain digital licensing models involving no marginal costs. In practice, a break-even ROAS below 1.0× would mean spending more on ads than total revenue generated, which is never a sustainable strategy. Any realistic business has a break-even ROAS above 1×, and typically above 2×.</p>
              </div>

               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">How does customer LTV affect break-even ROAS?</h3>
                <p className="text-slate-600 leading-relaxed m-0">Lifetime value (LTV) allows you to advertise at or even below break-even ROAS on the first purchase, provided subsequent purchases are profitable and predictable. This is common in subscription businesses and brands with strong repeat purchase rates. To incorporate LTV, calculate the NPV (net present value) of future repeat purchases, discount by churn probability, and add to your first-order margin. This gives an LTV-adjusted break-even ROAS that can be substantially lower than the single-order figure.</p>
              </div>

               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Does break-even ROAS apply to brand awareness campaigns?</h3>
                <p className="text-slate-600 leading-relaxed m-0">Break-even ROAS is a direct-response metric most applicable to performance campaigns with trackable conversions. Brand awareness campaigns — YouTube bumper ads, display prospecting, influencer top-of-funnel — generate value through assisted conversions and long-term brand equity that isn't captured in platform-reported ROAS. For these campaigns, use blended MER (total revenue ÷ total ad spend) as your profitability signal, measured over 30–90 day windows to capture delayed attribution.</p>
              </div>

               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">What's the difference between break-even ROAS and target ROAS?</h3>
                <p className="text-slate-600 leading-relaxed m-0">Break-even ROAS is the minimum threshold to avoid a net loss. Target ROAS is the return required to achieve a specific profit margin. Break-even ROAS is a floor; target ROAS is a goal. For example: if your break-even ROAS is 2.5× (40% margin) and you want 20% net profit from advertising, your target ROAS is 1 ÷ (0.40 − 0.20) = 5.0×. In Google Ads bid strategies, you input target ROAS — never break-even ROAS, as that leaves zero margin for error.</p>
              </div>
            </div>
          </section>

          {/* Section 11 & 12: Summary & Quick Reference */}
          <section className="bg-gradient-to-b from-indigo-900 to-indigo-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-indigo-800 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-3"><Lightbulb className="w-8 h-8 text-amber-400" /> Summary: Key Takeaways</h2>
              <div className="prose prose-lg prose-invert max-w-none text-indigo-100 mb-10">
                <p className="lead text-xl text-white font-medium">Break-even ROAS is the foundational metric of profitable paid advertising. It is derived directly from gross margin, is product-specific, and must be recalculated whenever costs change. Every campaign strategy — from Google Smart Bidding tROAS inputs to Meta Minimum ROAS bid caps — should be anchored to this number.</p>
                <p>The hierarchy is simple: <strong>Know your margin → Calculate break-even ROAS → Set target ROAS above it → Measure MER as the truth layer → Scale what exceeds your target.</strong> Advertisers who operate without this framework are flying blind, optimising for revenue at the expense of profit, and building campaigns that look successful on the platform dashboard while destroying business value in the P&L.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6 text-indigo-200 border-b border-white/10 pb-4">Quick Reference Formulas</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0 m-0">
                  <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 group hover:bg-white/10 transition-colors">
                    <Calculator className="w-5 h-5 text-indigo-300 shrink-0" />
                    <div>
                      <strong className="block text-white mb-1">Gross Margin</strong>
                      <span className="font-mono text-sm text-indigo-200 break-all">(Price − COGS − Variable Costs − Fees) ÷ Price</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 group hover:bg-white/10 transition-colors">
                    <Calculator className="w-5 h-5 text-indigo-300 shrink-0" />
                    <div>
                      <strong className="block text-white mb-1">Break-Even ROAS</strong>
                      <span className="font-mono text-sm text-indigo-200">1 ÷ Gross Margin</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 group hover:bg-white/10 transition-colors">
                    <Calculator className="w-5 h-5 text-indigo-300 shrink-0" />
                    <div>
                      <strong className="block text-white mb-1">Target ROAS</strong>
                      <span className="font-mono text-sm text-indigo-200 break-all">1 ÷ (Gross Margin − Target Profit %)</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 group hover:bg-white/10 transition-colors">
                    <Calculator className="w-5 h-5 text-indigo-300 shrink-0" />
                    <div>
                      <strong className="block text-white mb-1">Max CPA</strong>
                      <span className="font-mono text-sm text-indigo-200">Gross Profit per Unit × Conversion Rate</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 group hover:bg-white/10 transition-colors">
                    <Calculator className="w-5 h-5 text-indigo-300 shrink-0" />
                    <div>
                      <strong className="block text-white mb-1">Break-Even ACOS</strong>
                      <span className="font-mono text-sm text-indigo-200">Gross Margin % (for Amazon sellers)</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 group hover:bg-white/10 transition-colors">
                    <Calculator className="w-5 h-5 text-indigo-300 shrink-0" />
                    <div>
                      <strong className="block text-white mb-1">MER</strong>
                      <span className="font-mono text-sm text-indigo-200">Total Revenue ÷ Total Ad Spend</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}