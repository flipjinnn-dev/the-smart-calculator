"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

import { Calculator, DollarSign, Percent, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
export default function CompoundInterestCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('compound-interest-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('compound-interest-calculator', language, "calculator-guide");

  // Use content or fallback to defaults
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "form": "",
    "results": "",
    "educational": "",
    "messages": "",
    "disclaimer": "",
    "seekHelp": "",
    "errors": "",
    "tooltips": "",
    "investment_details_0": "",
    "enter_your_investment_information_1": "",
    "initial_investment_2": "",
    "monthly_contribution_3": "",
    "annual_interest_rate_4": "",
    "investment_period_years_5": "",
    "compound_frequency_6": "",
    "annually_7": "",
    "quarterly_8": "",
    "monthly_9": "",
    "daily_10": "",
    "calculate_11": "",
    "investment_growth_12": "",
    "your_investment_projection_13": "",
    "final_amount_14": "",
    "total_interest_earned_15": "",
    "total_contributions_16": "",
    "enter_investment_details_to_see_growth_projection_17": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compound, setCompound] = useState("12");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [results, setResults] = useState<{
    finalAmount: number;
    totalInterest: number;
    totalContributions: number;
  } | null>(null);
  const calculateCompoundInterest = () => {
    const p = Number.parseFloat(principal);
    const r = Number.parseFloat(rate) / 100;
    const t = Number.parseFloat(time);
    const n = Number.parseFloat(compound);
    const pmt = Number.parseFloat(monthlyContribution || "0");
    if (p <= 0 || r <= 0 || t <= 0 || n <= 0) return;

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const compoundAmount = p * Math.pow(1 + r / n, n * t);

    // Future value of annuity for monthly contributions
    const monthlyRate = r / 12;
    const months = t * 12;
    let annuityAmount = 0;
    if (pmt > 0 && monthlyRate > 0) {
      annuityAmount = pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else if (pmt > 0) {
      annuityAmount = pmt * months;
    }
    const finalAmount = compoundAmount + annuityAmount;
    const totalContributions = p + pmt * months;
    const totalInterest = finalAmount - totalContributions;
    setResults({
      finalAmount,
      totalInterest,
      totalContributions
    });
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

      <div className="min-h-screen bg-white">

        {/* Breadcrumb */}

        {/* Main Content */}
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Form */}
              <Card className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r py-4 from-green-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>{contentData.investment_details_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_your_investment_information_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="principal" className="flex items-center space-x-2 text-base font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>{contentData.initial_investment_2}</span>
                    </Label>
                    <Input id="principal" type="number" placeholder="10000" value={principal} onChange={e => setPrincipal(e.target.value)} className="h-12 text-lg" />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="monthlyContribution" className="flex items-center space-x-2 text-base font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>{contentData.monthly_contribution_3}</span>
                    </Label>
                    <Input id="monthlyContribution" type="number" placeholder="500" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="h-12 text-lg" />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="rate" className="flex items-center space-x-2 text-base font-semibold">
                      <Percent className="w-4 h-4" />
                      <span>{contentData.annual_interest_rate_4}</span>
                    </Label>
                    <Input id="rate" type="number" step="0.01" placeholder="7" value={rate} onChange={e => setRate(e.target.value)} className="h-12 text-lg" />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="time" className="flex items-center space-x-2 text-base font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>{contentData.investment_period_years_5}</span>
                    </Label>
                    <Input id="time" type="number" placeholder="10" value={time} onChange={e => setTime(e.target.value)} className="h-12 text-lg" />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="compound" className="text-base font-semibold">{contentData.compound_frequency_6}</Label>
                    <Select value={compound} onValueChange={setCompound}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">{contentData.annually_7}</SelectItem>
                        <SelectItem value="4">{contentData.quarterly_8}</SelectItem>
                        <SelectItem value="12">{contentData.monthly_9}</SelectItem>
                        <SelectItem value="365">{contentData.daily_10}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={() => {
                  calculateCompoundInterest();
                  scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                }} className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg">{contentData.calculate_11}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r py-4 from-blue-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="text-2xl">{contentData.investment_growth_12}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_investment_projection_13}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {results ? <div className="space-y-8">
                      <div className="text-center p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl">
                        <p className="text-lg text-gray-600 mb-3">{contentData.final_amount_14}</p>
                        <p className="text-5xl font-bold text-green-600 mb-4">
                          $
                          {results.finalAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="text-center p-6 bg-blue-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">{contentData.total_interest_earned_15}</p>
                          <p className="text-2xl font-bold text-blue-600">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">{contentData.total_contributions_16}</p>
                          <p className="text-2xl font-bold text-gray-900">
                            $
                            {results.totalContributions.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </p>
                        </div>
                      </div>
                    </div> : <div className="text-center py-16 text-gray-500">
                      <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-50" />
                      <p className="text-lg">{contentData.enter_investment_details_to_see_growth_projection_17}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Calculators */}
          <div className="mt-12">
            <SimilarCalculators calculators={[{
            calculatorName: "Interest Calculator",
            calculatorHref: "/financial/interest-calculator",
            calculatorDescription: "Calculate and compound interest on loans, investments, and savings accounts."
          }, {
            calculatorName: "Interest Rate Calculator",
            calculatorHref: "/financial/interest-rate-calculator",
            calculatorDescription: "Determine the interest rate on loans with fixed terms and monthly payments."
          }, {
            calculatorName: "Credit Card Calculator",
            calculatorHref: "/financial/credit-card-calculator",
            calculatorDescription: "Calculate card payments, payoff time, and interest costs for different payment strategies."
          }]} color="green" title="Related Financial Calculators" />
          </div>

          <CalculatorGuide data={guideData} />
        </main>

      </div>
    </>;
}