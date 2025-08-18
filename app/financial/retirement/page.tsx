"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, DollarSign, Percent, Calendar } from "lucide-react";

import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function RetirementCalculator() {
  // State for results
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Calculation logic for 'need' scenario
  function calculateNeed() {
    // --- Updated calculation logic to match provided formulas and notation ---
    const age_now = currentAge;
    const age_ret = retirementAge;
    const n_years = age_ret - age_now;
    const r_ann = investmentReturn / 100;
    const infl = inflationRate / 100;
    const r_m = Math.pow(1 + r_ann, 1/12) - 1;
    const N_m = n_years * 12;
    const PV0 = currentSavings;
    const PMT_y = currentIncome * (futureSavingsPercent / 100); // yearly savings
    const PMT_m = PMT_y / 12; // monthly savings
    // 1) Future Value (FV)
    const FV_monthly = PV0 * Math.pow(1 + r_m, N_m) + PMT_m * ((Math.pow(1 + r_m, N_m) - 1) / r_m);
    const FV_yearly = PV0 * Math.pow(1 + r_ann, n_years) + PMT_y * ((Math.pow(1 + r_ann, n_years) - 1) / r_ann);
    // Total principal
    const Total_Principal_monthly = PV0 + PMT_m * N_m;
    const Total_Principal_yearly = PV0 + PMT_y * n_years;
    // Total interest
    const Total_Interest_monthly = FV_monthly - Total_Principal_monthly;
    const Total_Interest_yearly = FV_yearly - Total_Principal_yearly;
    // 4) Equivalent in Today's Money
    const PV_today = FV_yearly / Math.pow(1 + infl, n_years);
    setResult(
      `Future Value (Monthly): $${Math.round(FV_monthly).toLocaleString()}\nFuture Value (Yearly): $${Math.round(FV_yearly).toLocaleString()}\nTotal Principal (Monthly): $${Math.round(Total_Principal_monthly).toLocaleString()}\nTotal Interest (Monthly): $${Math.round(Total_Interest_monthly).toLocaleString()}\nEquivalent in Today's Money: $${Math.round(PV_today).toLocaleString()}`
    );
    setShowResult(true);
  }

  const [calcType, setCalcType] = useState("need");
  // Section 1: How much do you need to retire?
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(67);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentIncome, setCurrentIncome] = useState(70000);
  const [incomeIncrease, setIncomeIncrease] = useState(3);
  const [incomeNeededPercent, setIncomeNeededPercent] = useState(75);
  const [investmentReturn, setInvestmentReturn] = useState(6);
  const [inflationRate, setInflationRate] = useState(3);
  const [otherIncome, setOtherIncome] = useState(0);
  const [currentSavings, setCurrentSavings] = useState(30000);
  const [futureSavingsPercent, setFutureSavingsPercent] = useState(10);

  // Section 2: How can you save for retirement?
  const [neededAtRetirement, setNeededAtRetirement] = useState(600000);
  const [savingsNow, setSavingsNow] = useState(30000);
  const [saveReturn, setSaveReturn] = useState(6);

  // Section 3: How much can you withdraw after retirement?
  const [withdrawAgeNow, setWithdrawAgeNow] = useState(35);
  const [withdrawRetireAge, setWithdrawRetireAge] = useState(67);
  const [withdrawLifeExpectancy, setWithdrawLifeExpectancy] = useState(85);
  const [withdrawSavings, setWithdrawSavings] = useState(30000);
  const [withdrawAnnualContribution, setWithdrawAnnualContribution] = useState(0);
  const [withdrawMonthlyContribution, setWithdrawMonthlyContribution] = useState(500);
  const [withdrawReturn, setWithdrawReturn] = useState(6);
  const [withdrawInflation, setWithdrawInflation] = useState(3);

  // Section 4: How long can your money last?
  const [amountHave, setAmountHave] = useState(600000);
  const [withdrawMonthly, setWithdrawMonthly] = useState(5000);
  const [lastReturn, setLastReturn] = useState(6);

  // Helper to render the correct calculator form
  function renderCalculatorForm() {
    switch (calcType) {
      case "need":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Your current age</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input 
                    className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm" 
                    type="number" 
                    value={currentAge} 
                    onChange={e => setCurrentAge(Number(e.target.value))} 
                  />
                </div>
              </div>
              <div className="relative">
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Your planned retirement age</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input 
                    className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm" 
                    type="number" 
                    value={retirementAge} 
                    onChange={e => setRetirementAge(Number(e.target.value))} 
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Your life expectancy</Label>
                <Input className="w-full" type="number" value={lifeExpectancy} onChange={e => setLifeExpectancy(Number(e.target.value))} />
              </div>
              <div className="relative">
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Current annual income</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input 
                    className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm" 
                    type="number" 
                    value={currentIncome} 
                    onChange={e => setCurrentIncome(Number(e.target.value))} 
                  />
                </div>
              </div>
              <div className="relative">
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Expected annual income increase (%)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input 
                    className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm" 
                    type="number" 
                    value={incomeIncrease} 
                    onChange={e => setIncomeIncrease(Number(e.target.value))} 
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Income needed after retirement (%)</Label>
                <Input className="w-full" type="number" value={incomeNeededPercent} onChange={e => setIncomeNeededPercent(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Average investment return (%)</Label>
                <Input className="w-full" type="number" value={investmentReturn} onChange={e => setInvestmentReturn(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Inflation rate (%)</Label>
                <Input className="w-full" type="number" value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Other income after retirement</Label>
                <Input className="w-full" type="number" value={otherIncome} onChange={e => setOtherIncome(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Your current income</Label>
                <Input className="w-full" type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Your current retirement savings</Label>
                <Input className="w-full" type="number" value={futureSavingsPercent} onChange={e => setFutureSavingsPercent(Number(e.target.value))} />
              </div>
            </div>
          </>
        );
      case "save":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Your age now</Label>
                <Input className="w-full" type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Planned retirement age</Label>
                <Input className="w-full" type="number" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Amount needed at retirement age</Label>
                <Input className="w-full" type="number" value={neededAtRetirement} onChange={e => setNeededAtRetirement(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Retirement savings now</Label>
                <Input className="w-full" type="number" value={savingsNow} onChange={e => setSavingsNow(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Average investment return (%/year)</Label>
                <Input className="w-full" type="number" value={saveReturn} onChange={e => setSaveReturn(Number(e.target.value))} />
              </div>
            </div>
          </>
        );
      case "withdraw":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Your age now</Label>
                  <Input className="w-full" type="number" value={withdrawAgeNow} onChange={e => setWithdrawAgeNow(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">Planned retirement age</Label>
                  <Input className="w-full" type="number" value={withdrawRetireAge} onChange={e => setWithdrawRetireAge(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">Life expectancy</Label>
                  <Input className="w-full" type="number" value={withdrawLifeExpectancy} onChange={e => setWithdrawLifeExpectancy(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">Retirement savings today</Label>
                  <Input className="w-full" type="number" value={withdrawSavings} onChange={e => setWithdrawSavings(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">Annual contribution</Label>
                  <Input className="w-full" type="number" value={withdrawAnnualContribution} onChange={e => setWithdrawAnnualContribution(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">Monthly contribution</Label>
                  <Input className="w-full" type="number" value={withdrawMonthlyContribution} onChange={e => setWithdrawMonthlyContribution(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">Average investment return (%/year)</Label>
                  <Input className="w-full" type="number" value={withdrawReturn} onChange={e => setWithdrawReturn(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">Inflation rate (%/year)</Label>
                  <Input className="w-full" type="number" value={withdrawInflation} onChange={e => setWithdrawInflation(Number(e.target.value))} />
              </div>
            </div>
          </>
        );
      case "last":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">Amount you have</Label>
                  <Input className="w-full" type="number" value={amountHave} onChange={e => setAmountHave(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">Planned monthly withdrawal</Label>
                  <Input className="w-full" type="number" value={withdrawMonthly} onChange={e => setWithdrawMonthly(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">Average investment return (%/year)</Label>
                  <Input className="w-full" type="number" value={lastReturn} onChange={e => setLastReturn(Number(e.target.value))} />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <Head>
        <title>Retirement Calculator - Smart Calculator</title>
        <meta name="description" content="Calculate your retirement savings, income, and plan your future with our Retirement Calculator." />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity">Smart Calculator</Link>
                  <p className="text-sm text-gray-500 font-medium">Retirement Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Breadcrumb */}
        <nav className="bg-white/50 backdrop-blur-sm border-b px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                <span>Home</span>
              </Link>
              <span className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <Link href="/financial" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Financial</Link>
              <span className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-blue-600 font-medium">Retirement Calculator</span>
            </div>
          </div>
        </nav>
        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 ring-4 ring-blue-100">
                  <TrendingUp className="w-10 h-10 text-white drop-shadow-md" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Retirement Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Plan your retirement savings, withdrawals, and future with this all-in-one tool.</p>
              <div className="flex justify-center mt-4">
                <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left: Option selector and calculator form */}
              <div>
                <Card className="shadow-xl border-0 min-h-0 rounded-xl pt-0 overflow-hidden hover:shadow-green-100/50 transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-t-xl py-5 px-6 border-b border-blue-100/50">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Calculator className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-blue-800 font-semibold">Retirement Details</span>
                    </CardTitle>
                    <CardDescription className="text-sm mt-2 text-blue-700/70">Enter your retirement information below</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="mb-6">
                      <Label htmlFor="calcType" className="text-sm font-semibold mb-3 block text-blue-800">Calculation Type</Label>
                      <div className="relative">
                        <select
                          id="calcType"
                          className="w-full mt-1 border border-blue-200 rounded-xl h-12 px-4 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 shadow-sm appearance-none bg-white pr-10 text-gray-700"
                          value={calcType}
                          onChange={e => setCalcType(e.target.value)}
                        >
                          <option value="need">How much do you need to retire?</option>
                          <option value="save">How can you save for retirement?</option>
                          <option value="withdraw">How much can you withdraw after retirement?</option>
                          <option value="last">How long can your money last?</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {calcType === "need" && (
                        <>
                          {renderCalculatorForm()}
                        </>
                      )}
                      {calcType !== "need" && renderCalculatorForm()}
                    </div>
                    <Button
                      onClick={() => {
                        if (calcType === 'need') {
                          calculateNeed();
                        } else if (calcType === 'save') {
                          // 2) Required Savings (PMT) to reach FV_target
                          const years = retirementAge - currentAge;
                          const n_years = years;
                          const fv_target = neededAtRetirement;
                          const PV0 = savingsNow;
                          const r_ann = saveReturn / 100;
                          const n = n_years * 12;
                          const r_m = Math.pow(1 + r_ann, 1/12) - 1;
                          // Monthly PMT
                          const PMT_m = (fv_target - PV0 * Math.pow(1 + r_m, n)) / ((Math.pow(1 + r_m, n) - 1) / r_m);
                          // Yearly PMT
                          const PMT_y = (fv_target - PV0 * Math.pow(1 + r_ann, n_years)) / ((Math.pow(1 + r_ann, n_years) - 1) / r_ann);
                          // 3) Lump sum needed today for FV_target
                          const Lump_needed_today = fv_target / Math.pow(1 + r_ann, n_years);
                          const Additional_needed = Lump_needed_today - PV0;
                          setResult(
                            `Monthly Savings Needed: $${PMT_m.toLocaleString(undefined, {maximumFractionDigits:2})}\nYearly Savings Needed: $${PMT_y.toLocaleString(undefined, {maximumFractionDigits:2})}\nLump Sum Needed Today: $${Lump_needed_today.toLocaleString(undefined, {maximumFractionDigits:2})}\nAdditional Needed: $${Additional_needed.toLocaleString(undefined, {maximumFractionDigits:2})}`
                          );
                          setShowResult(true);
                        } else if (calcType === 'withdraw') {
                          // 5) Withdrawals after Retirement
                          const age_now = withdrawAgeNow;
                          const age_ret = withdrawRetireAge;
                          const n_years = age_ret - age_now;
                          const T_years = withdrawLifeExpectancy - withdrawRetireAge;
                          const r_ann = withdrawReturn / 100;
                          const infl = withdrawInflation / 100;
                          const r_m = Math.pow(1 + r_ann, 1/12) - 1;
                          const N_m = T_years * 12;
                          const PV_retirement = withdrawSavings * Math.pow(1 + r_ann, n_years) + (withdrawAnnualContribution + withdrawMonthlyContribution * 12) * ((Math.pow(1 + r_ann, n_years) - 1) / r_ann);
                          // A) Fixed Purchasing Power (growing withdrawals)
                          const g = infl; // withdrawal growth rate (often = infl)
                          // Annual withdrawal (W1) for fixed purchasing power
                          const denom = 1 - Math.pow((1 + g) / (1 + r_ann), T_years);
                          const W1 = PV_retirement * (r_ann - g) / denom;
                          // B) Fixed Amount Withdrawals (deplete to zero)
                          const PMT_m = PV_retirement * r_m / (1 - Math.pow(1 + r_m, -N_m));
                          setResult(
                            `Balance at Retirement: $${PV_retirement.toLocaleString(undefined, {maximumFractionDigits:0})}\nAnnual Withdrawal (growing with inflation): $${W1.toLocaleString(undefined, {maximumFractionDigits:0})}\nMonthly Withdrawal (fixed): $${PMT_m.toLocaleString(undefined, {maximumFractionDigits:0})}`
                          );
                          setShowResult(true);
                        } else if (calcType === 'last') {
                          // Duration money will last (given withdrawal)
                          const PV_retirement = amountHave;
                          const PMT_m = withdrawMonthly;
                          const r_m = lastReturn / 100 / 12;
                          // N = -log(1 - PV*r/P)/log(1+r)
                          const N = -Math.log(1 - PV_retirement * r_m / PMT_m) / Math.log(1 + r_m);
                          const years = Math.floor(N / 12);
                          const months = Math.round(N % 12);
                          setResult(
                            `Your money will last: ${years} years and ${months} months.`
                          );
                          setShowResult(true);
                        }
                      }}
                      className="w-full h-12 text-base bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 shadow-lg mt-6 rounded-xl font-medium transition-all duration-300 transform hover:translate-y-[-2px] flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-5 h-5" />
                      Calculate Retirement Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>
              {/* Right: Results card */}
              <div>
                <Card className="shadow-xl border-0 pt-0 min-h-0 rounded-xl overflow-hidden hover:shadow-blue-100/50 transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-t-xl py-5 px-6 border-b border-blue-100/50">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-blue-800 font-semibold">Your Retirement Results</span>
                    </CardTitle>
                    <CardDescription className="text-base text-gray-700">See your retirement calculation results here</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <div className="min-h-[200px] space-y-6">
                      {showResult && result ? (
                        <div className="space-y-4">
                          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 shadow-md">
                            <h3 className="text-xl font-bold text-blue-800 mb-3">Retirement Calculation</h3>
                            <div className="space-y-3">
                              {result.split('\n').map((line, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-blue-200 shadow-sm">
                                  <span className="font-medium text-gray-700">{line.split(':')[0]}:</span>
                                  <span className="font-bold text-blue-600">{line.split(':')[1]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 shadow-inner">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md border border-blue-100">
                              <Calculator className="w-8 h-8 text-blue-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-700">Fill in your details and click Calculate to see your retirement results</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* How to Use Section (below main grid) */}
            <section className="max-w-6xl mx-auto mt-16 mb-12 px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                  How to Use the Retirement Calculator
                </h2>
                <ol className="list-decimal pl-5 space-y-2">
                  <li className="text-gray-700">Select the calculation type from the dropdown above</li>
                  <li className="text-gray-700">Fill in your details for the selected calculation</li>
                  <li className="text-gray-700">Click <span className="font-medium text-blue-600">Calculate Retirement Plan</span> to see your results</li>
                  <li className="text-gray-700">Review the results and adjust your inputs as needed</li>
                </ol>
              </div>
            </section>
          </div>
        </main>
        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="transform hover:scale-110 transition-transform duration-300">
                  <Logo />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Smart Calculator</span>
              </div>
              <div className="flex justify-center space-x-6 mb-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <div className="border-t border-gray-700 pt-6">
                <p className="text-gray-400">&copy; {new Date().getFullYear()} Smart Calculator. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
