"use client";

import React, { useRef, useState } from "react";
import { Calculator, DollarSign, Calendar, FileText, HelpCircle, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useMobileScroll } from "@/hooks/useMobileScroll";

type ClaimType = "unemployment" | "maternity";

interface UIFResults {
  monthlyBenefit: number;
  dailyBenefit: number;
  maxDuration: number;
  totalPotential: number;
  replacementRate: number;
  creditDays: number;
}

interface UIFCalculatorClientProps {
  content: any;
}

export default function UIFCalculatorClient({ content }: UIFCalculatorClientProps) {
  const contentData = content || {};
  
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [monthlySalary, setMonthlySalary] = useState("15000");
  const [contributionMonths, setContributionMonths] = useState("12");
  const [claimType, setClaimType] = useState<ClaimType>("unemployment");
  const [results, setResults] = useState<UIFResults | null>(null);

  const calculateUIF = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    
    const salary = parseFloat(monthlySalary);
    const months = parseFloat(contributionMonths);

    const dailyIncome = salary / 30;
    
    let replacementRate: number;
    if (dailyIncome <= 100) {
      replacementRate = 0.60;
    } else if (dailyIncome <= 200) {
      replacementRate = 0.50;
    } else if (dailyIncome <= 300) {
      replacementRate = 0.45;
    } else {
      replacementRate = 0.38;
    }

    const dailyBenefit = dailyIncome * replacementRate;
    const monthlyBenefit = dailyBenefit * 30;

    const creditDays = Math.min(months * 4, 365);

    let maxDuration: number;
    if (claimType === "maternity") {
      maxDuration = 121;
    } else {
      if (months >= 48) {
        maxDuration = 365;
      } else if (months >= 24) {
        maxDuration = 238;
      } else if (months >= 12) {
        maxDuration = 180;
      } else {
        maxDuration = Math.min(creditDays, 120);
      }
    }

    const totalPotential = dailyBenefit * Math.min(creditDays, maxDuration);

    setResults({
      monthlyBenefit,
      dailyBenefit,
      maxDuration,
      totalPotential,
      replacementRate: replacementRate * 100,
      creditDays
    });
  };

  const loadExample = () => {
    setMonthlySalary("15000");
    setContributionMonths("24");
    setClaimType("unemployment");
  };

  const resetForm = () => {
    setMonthlySalary("");
    setContributionMonths("");
    setClaimType("unemployment");
    setResults(null);
  };

  const formatCurrency = (value: number) => {
    return `R ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            UIF Calculator (South Africa): Estimate Your Unemployment Benefits
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estimate your unemployment and maternity benefits
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardContent className="p-8">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A UIF calculator helps employees in South Africa estimate how much they may receive from the Unemployment Insurance Fund (UIF) if they become unemployed, take maternity leave, or claim other UIF benefits. By entering your monthly salary, contribution history, and leave type, a UIF calculator online estimates potential payouts using the official UIF calculation formula used by the Department of Employment and Labour.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">In simple terms:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    <span><strong>UIF contributions:</strong> 2% of salary (1% from employee + 1% from employer)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    <span><strong>Maximum salary cap:</strong> UIF calculations use a capped salary threshold</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    <span><strong>Benefit payments:</strong> Typically 38%–60% of your average salary depending on income level</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    <span><strong>Claim period:</strong> Up to 365 days depending on credits</span>
                  </li>
                </ul>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                A reliable UIF calculator South Africa 2026 helps workers quickly estimate unemployment benefits, maternity leave payouts, and monthly deductions.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b px-8 py-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Calculator className="w-6 h-6 text-green-600" />
                <span>UIF Calculator</span>
              </CardTitle>
              <CardDescription className="text-base">Enter your details to estimate benefits</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-900">
                  Monthly Salary (R)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="number"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(e.target.value)}
                    className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                    placeholder="15000"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-900">
                  Contribution Months
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="number"
                    value={contributionMonths}
                    onChange={(e) => setContributionMonths(e.target.value)}
                    className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                    placeholder="12"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-900">
                  Claim Type
                </Label>
                <Select value={claimType} onValueChange={(value: ClaimType) => setClaimType(value)}>
                  <SelectTrigger className="h-12 border-2 focus:border-green-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unemployment">Unemployment</SelectItem>
                    <SelectItem value="maternity">Maternity Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={calculateUIF}
                  className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-xl font-bold"
                >
                  Calculate UIF Benefits
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={loadExample} variant="outline" className="h-12">
                    Try Example
                  </Button>
                  <Button onClick={resetForm} variant="outline" className="h-12">
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card ref={resultsRef} className="shadow-2xl border-0 bg-white sticky top-24">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b px-8 py-6">
              <CardTitle className="text-2xl">
                UIF Benefit Estimate
              </CardTitle>
              <CardDescription className="text-base">Your estimated benefits breakdown</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {results ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                      <p className="text-lg mb-2 font-semibold text-green-800">Monthly Benefit</p>
                      <p className="text-3xl font-bold text-green-700">{formatCurrency(results.monthlyBenefit)}</p>
                      <p className="text-sm text-green-600 mt-1">Approximately per month</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300">
                      <p className="text-lg mb-2 font-semibold text-blue-800">Daily Benefit</p>
                      <p className="text-3xl font-bold text-blue-700">{formatCurrency(results.dailyBenefit)}</p>
                      <p className="text-sm text-blue-600 mt-1">Per day</p>
                    </div>
                  </div>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-semibold text-gray-700">Replacement Rate:</span>
                      <span className="font-bold text-gray-900">{results.replacementRate.toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-semibold text-gray-700">Credit Days:</span>
                      <span className="font-bold text-gray-900">{results.creditDays} days</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-semibold text-gray-700">Max Duration:</span>
                      <span className="font-bold text-gray-900">{results.maxDuration} days</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-gray-700">Total Potential:</span>
                      <span className="font-bold text-green-600">{formatCurrency(results.totalPotential)}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This is an estimate. Actual benefits depend on your UIF contribution history and approval by the Department of Labour.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your details to calculate UIF benefits
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">UIF Calculator (South Africa) – Complete Guide</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              This guide explains how the UIF calculator online South Africa works, how UIF benefits are calculated, and how to estimate your unemployment or maternity payouts.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-3">Topics covered:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• What UIF is and how contributions work</li>
                <li>• The UIF calculation formula</li>
                <li>• Using a UIF unemployment benefit calculator</li>
                <li>• UIF calculator for maternity leave</li>
                <li>• UIF deduction calculator South Africa</li>
                <li>• Real UIF calculation examples</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">What Is UIF in South Africa?</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              The Unemployment Insurance Fund (UIF) is a government program managed by the Department of Employment and Labour in South Africa. It provides short-term financial relief to workers who:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-gray-700">• Become unemployed</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-gray-700">• Take maternity leave</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-gray-700">• Are unable to work due to illness</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <p className="text-gray-700">• Go on adoption or parental leave</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-gray-700">• Lose income due to reduced working hours</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              Both employees and employers contribute to UIF every month. A UIF contribution calculator South Africa helps determine these deductions from your salary.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">What Is UIF Calculated On?</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Many workers ask: "What is UIF calculated on?"
            </p>
            <p className="text-gray-700 mb-4">
              UIF is calculated based on:
            </p>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-gray-900">Monthly salary</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-gray-900">UIF contribution rate</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-gray-900">Contribution period</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-gray-900">Income Replacement Rate (IRR)</p>
              </div>
            </div>
            <div className="mt-4 bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Key points:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• UIF contribution = 2% of gross salary</li>
                <li>• Maximum contribution threshold applies</li>
                <li>• Benefits depend on credits accumulated</li>
              </ul>
            </div>
            <p className="text-gray-700 mt-4">
              A UIF benefits calculator South Africa automatically applies these rules to estimate payouts.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">UIF Contribution Calculation (Monthly Deductions)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Before calculating benefits, you must understand how contributions work.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">UIF Contribution Rate</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Employee contribution: <strong>1%</strong></li>
                <li>• Employer contribution: <strong>1%</strong></li>
                <li>• Total: <strong>2%</strong></li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Example</h3>
              <p className="text-gray-700 mb-2">If your salary is <strong>R20,000 per month</strong></p>
              <div className="space-y-2 mt-4">
                <p className="text-gray-700">Employee UIF deduction: <strong>R20,000 × 1% = R200</strong></p>
                <p className="text-gray-700">Employer contribution: <strong>R20,000 × 1% = R200</strong></p>
                <p className="text-gray-900 font-bold text-lg mt-2">Total UIF contribution: R400 per month</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              A UIF deduction calculator South Africa helps estimate these deductions automatically.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">UIF Calculation Formula (Benefits)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-6">
              The official UIF calculation formula determines the daily benefit amount.
            </p>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 1: Calculate Daily Salary</h3>
                <p className="text-gray-700 font-mono text-lg">Monthly Salary ÷ 30 = Daily Income</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 2: Apply Income Replacement Rate (IRR)</h3>
                <p className="text-gray-700 mb-2">The IRR ranges from: <strong>38% – 60%</strong></p>
                <p className="text-gray-600 text-sm">Lower salaries receive a higher percentage.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 3: Calculate Daily UIF Benefit</h3>
                <p className="text-gray-700 font-mono text-lg">Daily Income × IRR = Daily Benefit</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 4: Multiply by Payable Days</h3>
                <p className="text-gray-700 font-mono text-lg">Daily Benefit × number of claim days</p>
              </div>
            </div>
            <p className="text-gray-700 mt-6">
              A UIF unemployment calculator performs this entire process instantly.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">How Do You Calculate UIF Benefits?</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Many people ask: <strong>How do you calculate UIF benefits manually?</strong>
            </p>
            <p className="text-gray-700 mb-4">Follow these steps:</p>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Step 1: Determine Salary</h4>
                  <p className="text-gray-700">Example salary: <strong>R15,000 per month</strong></p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Step 2: Calculate Daily Rate</h4>
                  <p className="text-gray-700">15,000 ÷ 30 = <strong>R500</strong></p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Step 3: Apply IRR (example 50%)</h4>
                  <p className="text-gray-700">500 × 50% = <strong>R250</strong></p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Step 4: Monthly Benefit Estimate</h4>
                  <p className="text-gray-700">R250 × 30 = <strong>R7,500</strong></p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <p className="text-gray-900 font-bold text-lg">
                This means the worker could receive approximately: <span className="text-green-700">R7,500 per month</span> from UIF.
              </p>
            </div>
            <p className="text-gray-700 mt-4">
              A UIF benefits calculator simplifies this process.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">UIF Calculation Example (Realistic Scenario)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">Here is a practical UIF calculation example.</p>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-4">Employee salary: <strong>R18,000 per month</strong></p>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span className="font-semibold text-gray-700">Daily Income</span>
                  <span className="font-bold text-gray-900">18,000 ÷ 30 = R600</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span className="font-semibold text-gray-700">Estimated IRR</span>
                  <span className="font-bold text-gray-900">45%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span className="font-semibold text-gray-700">Daily Benefit</span>
                  <span className="font-bold text-gray-900">600 × 45% = R270</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold text-gray-700">Monthly UIF Benefit</span>
                  <span className="font-bold text-green-600 text-lg">R270 × 30 = R8,100</span>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <p className="text-gray-900 font-bold text-lg">
                Estimated UIF payout: <span className="text-green-700">R8,100 per month</span>
              </p>
            </div>
            <p className="text-gray-700 mt-4">
              A UIF calculator payout tool can estimate this automatically.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle className="text-2xl">UIF Contribution Rates</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 font-semibold">Contributor</th>
                      <th className="text-right py-3 font-semibold">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-medium">Employee</td>
                      <td className="py-3 text-right font-semibold text-green-600">1%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">Employer</td>
                      <td className="py-3 text-right font-semibold text-blue-600">1%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 font-bold">Total</td>
                      <td className="py-3 text-right font-bold text-gray-900">2%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> On a R15,000 salary, you contribute R150 and your employer contributes R150 monthly.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle className="text-2xl">Income Replacement Rates</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 font-semibold">Daily Income</th>
                      <th className="text-right py-3 font-semibold">Replacement Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-medium">R0 - R100</td>
                      <td className="py-3 text-right font-semibold text-green-600">60%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">R101 - R200</td>
                      <td className="py-3 text-right font-semibold text-green-600">50%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">R201 - R300</td>
                      <td className="py-3 text-right font-semibold text-blue-600">45%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 font-medium">R300+</td>
                      <td className="py-3 text-right font-semibold text-blue-600">38%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Higher earners receive a lower replacement rate percentage.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">Maximum Benefit Duration</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-semibold">Contribution Period</th>
                    <th className="text-right py-3 font-semibold">Max Days</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Less than 12 months</td>
                    <td className="py-3 text-right font-semibold">120 days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">12-23 months</td>
                    <td className="py-3 text-right font-semibold text-green-600">180 days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">24-47 months</td>
                    <td className="py-3 text-right font-semibold text-green-600">238 days</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 font-bold">48+ months (4 years)</td>
                    <td className="py-3 text-right font-bold text-blue-600">365 days</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="py-3 font-bold">Maternity Leave</td>
                    <td className="py-3 text-right font-bold text-pink-600">121 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle className="text-2xl">UIF Credits Explained</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Your UIF payout also depends on credit days. For every 4 days worked, you earn 1 credit day. Maximum: 365 days.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 font-semibold">Work Period</th>
                      <th className="text-right py-3 font-semibold">Credit Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-medium">6 months</td>
                      <td className="py-3 text-right font-semibold text-green-600">45 days</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">12 months</td>
                      <td className="py-3 text-right font-semibold text-green-600">121 days</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 font-bold">4 years</td>
                      <td className="py-3 text-right font-bold text-blue-600">365 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 mt-4">
                A UIF unemployment benefit calculator factors this into your payout estimate.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle className="text-2xl">UIF Payout Estimates by Salary</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Rough estimates using typical IRR ranges. Actual payouts depend on credits, UIF contribution history, and salary cap.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 font-semibold">Monthly Salary</th>
                      <th className="text-right py-3 font-semibold">Estimated UIF Monthly Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-medium">R8,000</td>
                      <td className="py-3 text-right font-semibold text-green-600">R4,000 – R4,800</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">R12,000</td>
                      <td className="py-3 text-right font-semibold text-green-600">R5,500 – R7,200</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">R18,000</td>
                      <td className="py-3 text-right font-semibold text-blue-600">R7,000 – R9,000</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 font-bold">R25,000</td>
                      <td className="py-3 text-right font-bold text-blue-600">R9,000 – R12,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 mt-4">
                A UIF calculator payout tool gives more accurate estimates.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">Common Mistakes When Calculating UIF</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-6">Many workers miscalculate UIF benefits. Common mistakes include:</p>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-gray-900 mb-2">Ignoring Salary Caps</h4>
                <p className="text-gray-700 text-sm">UIF calculations may use a maximum salary threshold.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-gray-900 mb-2">Forgetting Contribution Months</h4>
                <p className="text-gray-700 text-sm">UIF benefits depend on how long you contributed.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-bold text-gray-900 mb-2">Using Gross Salary Incorrectly</h4>
                <p className="text-gray-700 text-sm">Some calculators require capped earnings, not full salary.</p>
              </div>
            </div>
            <p className="text-gray-700 mt-6">
              Using a UIF benefits calculator South Africa avoids these errors.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">Benefits Covered by UIF</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Unemployment Benefits</h3>
                <p className="text-gray-700 text-sm">If you lose your job. Use a UIF unemployment calculator.</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Maternity Benefits</h3>
                <p className="text-gray-700 text-sm">For pregnant employees. Use a UIF maternity leave calculator South Africa.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Illness Benefits</h3>
                <p className="text-gray-700 text-sm">For extended sick leave.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Adoption Benefits</h3>
                <p className="text-gray-700 text-sm">For adopting parents.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">Who Qualifies for UIF?</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg text-green-700 mb-3">You qualify if:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>You worked more than 24 hours per month</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>You contributed to UIF</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>You lost your job involuntarily</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-red-700 mb-3">You may not qualify if:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>You resigned voluntarily</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>You are self-employed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>You work for government in certain cases</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">How to Claim UIF Benefits</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-6">Steps to claim UIF in South Africa:</p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Register at the Department of Employment and Labour</h4>
                  <p className="text-gray-600 text-sm">Visit your nearest labour centre with required documents.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Submit required documents</h4>
                  <p className="text-gray-600 text-sm">ID, proof of employment termination, banking details, and payslips.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Complete claim forms</h4>
                  <p className="text-gray-600 text-sm">Fill out UI-2.8 form and ensure employer completes UI-19 form.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Wait for verification</h4>
                  <p className="text-gray-600 text-sm">Processing typically takes 6-8 weeks.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Receive payments</h4>
                  <p className="text-gray-600 text-sm">Payments are made directly to your bank account.</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mt-6">
              Many people first estimate payments using a UIF calculator online.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <HelpCircle className="w-6 h-6 text-green-600" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">What is a UIF calculator?</h3>
                <p className="text-gray-700">
                  A UIF calculator estimates how much money you may receive from the Unemployment Insurance Fund if you become unemployed or take maternity leave.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">How do you calculate UIF benefits?</h3>
                <p className="text-gray-700">
                  UIF benefits are calculated using: Daily income, Income Replacement Rate (38%-60% depending on income), and Contribution credits. A UIF benefits calculator automatically performs this calculation.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">How to calculate how much UIF I will get?</h3>
                <p className="text-gray-700">
                  Multiply your salary by approximately 38%–60%, depending on your income level. A UIF calculator South Africa provides a more accurate estimate based on your specific circumstances.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">What is UIF calculated on?</h3>
                <p className="text-gray-700">
                  UIF is calculated based on: Monthly salary, UIF contribution history, Income replacement rate (which varies by income level), and Credit days accumulated through contributions.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Is there a UIF calculator for maternity leave?</h3>
                <p className="text-gray-700">
                  Yes. A UIF calculator for maternity leave estimates payments during maternity leave based on your salary and UIF contributions. Maternity benefits are available for up to 121 days.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">What is a UIF deduction calculator South Africa?</h3>
                <p className="text-gray-700">
                  A UIF deduction calculator South Africa estimates monthly deductions from your salary (1%) and your employer's contribution (1%), totaling 2% of your gross salary.
                </p>
              </div>

              <div className="pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Is there a UIF calculator online South Africa?</h3>
                <p className="text-gray-700">
                  Yes. Many websites offer a UIF calculator online South Africa where you can enter your salary to estimate benefits instantly. This calculator is one such tool.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">Final Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              A UIF calculator South Africa helps workers estimate unemployment or maternity benefits from the Unemployment Insurance Fund. The calculation depends on your monthly salary, contribution period, and income replacement rate, typically paying 38%–60% of earnings for up to 365 days depending on credits.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

