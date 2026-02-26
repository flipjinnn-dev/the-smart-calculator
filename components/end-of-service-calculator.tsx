"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, AlertCircle } from "lucide-react";

interface CalculationResult {
  dailyWage: number;
  eligibleDays: number;
  totalGratuity: number;
  cappedGratuity?: number;
  breakdown: {
    years: number;
    days: number;
    amount: number;
  }[];
}

export default function EndOfServiceCalculator() {
  const [country, setCountry] = useState<string>("uae");
  const [basicSalary, setBasicSalary] = useState<string>("");
  const [yearsOfService, setYearsOfService] = useState<string>("");
  const [monthsOfService, setMonthsOfService] = useState<string>("0");
  const [contractType, setContractType] = useState<string>("unlimited");
  const [terminationReason, setTerminationReason] = useState<string>("employer");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateUAEGratuity = (salary: number, years: number, months: number): CalculationResult => {
    const dailyWage = salary / 30;
    const totalYears = years + months / 12;
    
    const breakdown: { years: number; days: number; amount: number }[] = [];
    let totalGratuity = 0;

    if (totalYears <= 5) {
      const days = 21;
      const amount = dailyWage * days * totalYears;
      breakdown.push({ years: totalYears, days, amount });
      totalGratuity = amount;
    } else {
      const firstFiveYears = dailyWage * 21 * 5;
      breakdown.push({ years: 5, days: 21, amount: firstFiveYears });
      
      const remainingYears = totalYears - 5;
      const remainingAmount = dailyWage * 30 * remainingYears;
      breakdown.push({ years: remainingYears, days: 30, amount: remainingAmount });
      
      totalGratuity = firstFiveYears + remainingAmount;
    }

    const maxCap = salary * 24;
    const cappedGratuity = Math.min(totalGratuity, maxCap);

    return {
      dailyWage,
      eligibleDays: totalYears <= 5 ? 21 : 30,
      totalGratuity,
      cappedGratuity: totalGratuity > maxCap ? cappedGratuity : undefined,
      breakdown,
    };
  };

  const calculateKSAGratuity = (
    salary: number,
    years: number,
    months: number,
    reason: string
  ): CalculationResult => {
    const dailyWage = salary / 30;
    const totalYears = years + months / 12;
    
    const breakdown: { years: number; days: number; amount: number }[] = [];
    let totalGratuity = 0;

    if (totalYears <= 5) {
      const days = 15;
      const amount = dailyWage * days * totalYears;
      breakdown.push({ years: totalYears, days, amount });
      totalGratuity = amount;
    } else {
      const firstFiveYears = dailyWage * 15 * 5;
      breakdown.push({ years: 5, days: 15, amount: firstFiveYears });
      
      const remainingYears = totalYears - 5;
      const remainingAmount = dailyWage * 30 * remainingYears;
      breakdown.push({ years: remainingYears, days: 30, amount: remainingAmount });
      
      totalGratuity = firstFiveYears + remainingAmount;
    }

    if (reason === "resignation") {
      if (totalYears < 2) {
        totalGratuity = 0;
      } else if (totalYears >= 2 && totalYears < 5) {
        totalGratuity = totalGratuity * (1 / 3);
      } else if (totalYears >= 5 && totalYears < 10) {
        totalGratuity = totalGratuity * (2 / 3);
      }
    }

    return {
      dailyWage,
      eligibleDays: totalYears <= 5 ? 15 : 30,
      totalGratuity,
      breakdown,
    };
  };

  const calculateQatarGratuity = (salary: number, years: number, months: number): CalculationResult => {
    const dailyWage = salary / 30;
    const totalYears = years + months / 12;
    
    const days = 21;
    const totalGratuity = dailyWage * days * totalYears;

    return {
      dailyWage,
      eligibleDays: days,
      totalGratuity,
      breakdown: [{ years: totalYears, days, amount: totalGratuity }],
    };
  };

  const handleCalculate = () => {
    const salary = parseFloat(basicSalary);
    const years = parseInt(yearsOfService) || 0;
    const months = parseInt(monthsOfService) || 0;

    if (!salary || salary <= 0) {
      alert("Please enter a valid basic salary");
      return;
    }

    if (years === 0 && months === 0) {
      alert("Please enter years or months of service");
      return;
    }

    const totalYears = years + months / 12;
    if (totalYears < 1) {
      alert("Minimum 1 year of service required for gratuity");
      return;
    }

    let calculationResult: CalculationResult;

    switch (country) {
      case "uae":
        calculationResult = calculateUAEGratuity(salary, years, months);
        break;
      case "ksa":
        calculationResult = calculateKSAGratuity(salary, years, months, terminationReason);
        break;
      case "qatar":
        calculationResult = calculateQatarGratuity(salary, years, months);
        break;
      default:
        return;
    }

    setResult(calculationResult);
  };

  const handleReset = () => {
    setBasicSalary("");
    setYearsOfService("");
    setMonthsOfService("0");
    setContractType("unlimited");
    setTerminationReason("employer");
    setResult(null);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="shadow-2xl border-0">
        <div className="h-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <CardHeader className="bg-gradient-to-br from-blue-50 to-purple-50">
          <CardTitle className="text-3xl font-bold flex items-center text-gray-900">
            <Calculator className="w-8 h-8 mr-3 text-blue-600" />
            End of Service Gratuity Calculator
          </CardTitle>
          <CardDescription className="text-lg">
            Calculate your end of service benefits for UAE, KSA, or Qatar based on labor laws
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-base font-semibold">
                Country
              </Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country" className="h-12 text-base">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uae">United Arab Emirates (UAE)</SelectItem>
                  <SelectItem value="ksa">Saudi Arabia (KSA)</SelectItem>
                  <SelectItem value="qatar">Qatar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="basicSalary" className="text-base font-semibold">
                Basic Salary (Monthly)
              </Label>
              <Input
                id="basicSalary"
                type="number"
                placeholder="Enter basic salary"
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
                className="h-12 text-base"
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsOfService" className="text-base font-semibold">
                Years of Service
              </Label>
              <Input
                id="yearsOfService"
                type="number"
                placeholder="Enter years"
                value={yearsOfService}
                onChange={(e) => setYearsOfService(e.target.value)}
                className="h-12 text-base"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthsOfService" className="text-base font-semibold">
                Additional Months
              </Label>
              <Input
                id="monthsOfService"
                type="number"
                placeholder="Enter months (0-11)"
                value={monthsOfService}
                onChange={(e) => setMonthsOfService(e.target.value)}
                className="h-12 text-base"
                min="0"
                max="11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractType" className="text-base font-semibold">
                Contract Type
              </Label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger id="contractType" className="h-12 text-base">
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unlimited">Unlimited Contract</SelectItem>
                  <SelectItem value="limited">Limited Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="terminationReason" className="text-base font-semibold">
                Termination Reason
              </Label>
              <Select value={terminationReason} onValueChange={setTerminationReason}>
                <SelectTrigger id="terminationReason" className="h-12 text-base">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employer">Employer Termination</SelectItem>
                  <SelectItem value="resignation">Employee Resignation</SelectItem>
                  <SelectItem value="mutual">Mutual Agreement</SelectItem>
                  <SelectItem value="contract_end">Contract Completion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {country === "ksa" && terminationReason === "resignation" && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-yellow-800">KSA Resignation Impact</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Resignation in Saudi Arabia reduces gratuity: No gratuity for &lt;2 years, 1/3 for 2-5 years, 2/3 for 5-10 years, full for 10+ years.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              onClick={handleCalculate}
              className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate Gratuity
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-14 px-8 text-lg font-semibold"
            >
              Reset
            </Button>
          </div>

          {result && (
            <div className="mt-8 space-y-6">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-2xl shadow-xl">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold">Your End of Service Gratuity</h3>
                </div>
                <div className="text-5xl font-bold mb-2">
                  {formatCurrency(result.cappedGratuity || result.totalGratuity)}
                </div>
                <p className="text-green-100 text-lg">
                  {country === "uae" && "AED"}
                  {country === "ksa" && "SAR"}
                  {country === "qatar" && "QAR"}
                </p>
                {result.cappedGratuity && (
                  <div className="mt-4 bg-white/20 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Note:</strong> Original calculation was {formatCurrency(result.totalGratuity)}, but capped at 2 years' salary ({formatCurrency(result.cappedGratuity)}) as per UAE law.
                    </p>
                  </div>
                )}
              </div>

              <Card className="border-2 border-blue-100">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-xl">Calculation Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="font-semibold text-gray-700">Daily Wage:</span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(result.dailyWage)}
                      </span>
                    </div>

                    {result.breakdown.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-700">
                            {index === 0 && result.breakdown.length > 1
                              ? "First 5 Years"
                              : index === 1
                              ? "After 5 Years"
                              : "Total Service"}
                          </span>
                          <span className="text-lg font-bold text-blue-600">
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {item.years.toFixed(2)} years × {item.days} days per year
                        </p>
                      </div>
                    ))}

                    <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                      <span className="font-bold text-gray-900 text-lg">Total Gratuity:</span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(result.cappedGratuity || result.totalGratuity)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  <strong>Disclaimer:</strong> This calculator provides estimates based on standard labor law formulas. Actual gratuity may vary based on specific employment contracts, company policies, unpaid leave, and other factors. Please consult with your HR department or legal advisor for precise calculations.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
