"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
;
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, DollarSign, Percent, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMobileScroll } from "@/hooks/useMobileScroll";
;
import CalculatorGuide from "@/components/calculator-guide";
;
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
export default function RetirementCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('retirement-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('retirement-calculator', language, "calculator-guide");

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
    "your_current_age_0": "",
    "your_planned_retirement_age_1": "",
    "your_life_expectancy_2": "",
    "current_annual_income_3": "",
    "expected_annual_income_increase_4": "",
    "income_needed_after_retirement_5": "",
    "average_investment_return_6": "",
    "inflation_rate_7": "",
    "other_income_after_retirement_8": "",
    "your_current_income_9": "",
    "your_current_retirement_savings_10": "",
    "your_age_now_11": "",
    "planned_retirement_age_12": "",
    "amount_needed_at_retirement_age_13": "",
    "retirement_savings_now_14": "",
    "average_investment_return_year_15": "",
    "your_age_now_16": "",
    "planned_retirement_age_17": "",
    "life_expectancy_18": "",
    "retirement_savings_today_19": "",
    "annual_contribution_20": "",
    "monthly_contribution_21": "",
    "average_investment_return_year_22": "",
    "inflation_rate_year_23": "",
    "amount_you_have_24": "",
    "planned_monthly_withdrawal_25": "",
    "average_investment_return_year_26": "",
    "home_27": "",
    "financial_28": "",
    "retirement_calculator_29": "",
    "retirement_details_30": "",
    "enter_your_retirement_information_below_31": "",
    "calculation_type_32": "",
    "how_much_do_you_need_to_retire_33": "",
    "how_can_you_save_for_retirement_34": "",
    "how_much_can_you_withdraw_after_retirement_35": "",
    "how_long_can_your_money_last_36": "",
    "calculate_plan_37": "",
    "your_retirement_results_38": "",
    "see_your_retirement_calculation_results_here_39": "",
    "retirement_calculation_40": "",
    "fill_in_your_details_and_click_calculate_see_your__41": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;

  // State for results
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
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
    const r_m = Math.pow(1 + r_ann, 1 / 12) - 1;
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
    setResult(`Future Value (Monthly): $${Math.round(FV_monthly).toLocaleString()}
Future Value (Yearly): $${Math.round(FV_yearly).toLocaleString()}
Total Principal (Monthly): $${Math.round(Total_Principal_monthly).toLocaleString()}
Total Interest (Monthly): $${Math.round(Total_Interest_monthly).toLocaleString()}
Equivalent in Today's Money: $${Math.round(PV_today).toLocaleString()}`);
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
        return <>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.your_current_age_0}</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm" type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} />
                </div>
              </div>
              <div className="relative">
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.your_planned_retirement_age_1}</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm" type="number" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.your_life_expectancy_2}</Label>
                <Input className="w-full" type="number" value={lifeExpectancy} onChange={e => setLifeExpectancy(Number(e.target.value))} />
              </div>
              <div className="relative">
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.current_annual_income_3}</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm" type="number" value={currentIncome} onChange={e => setCurrentIncome(Number(e.target.value))} />
                </div>
              </div>
              <div className="relative">
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.expected_annual_income_increase_4}</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm" type="number" value={incomeIncrease} onChange={e => setIncomeIncrease(Number(e.target.value))} />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.income_needed_after_retirement_5}</Label>
                <Input className="w-full" type="number" value={incomeNeededPercent} onChange={e => setIncomeNeededPercent(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.average_investment_return_6}</Label>
                <Input className="w-full" type="number" value={investmentReturn} onChange={e => setInvestmentReturn(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.inflation_rate_7}</Label>
                <Input className="w-full" type="number" value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.other_income_after_retirement_8}</Label>
                <Input className="w-full" type="number" value={otherIncome} onChange={e => setOtherIncome(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.your_current_income_9}</Label>
                <Input className="w-full" type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.your_current_retirement_savings_10}</Label>
                <Input className="w-full" type="number" value={futureSavingsPercent} onChange={e => setFutureSavingsPercent(Number(e.target.value))} />
              </div>
            </div>
          </>;
      case "save":
        return <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.your_age_now_11}</Label>
                <Input className="w-full" type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.planned_retirement_age_12}</Label>
                <Input className="w-full" type="number" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.amount_needed_at_retirement_age_13}</Label>
                <Input className="w-full" type="number" value={neededAtRetirement} onChange={e => setNeededAtRetirement(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.retirement_savings_now_14}</Label>
                <Input className="w-full" type="number" value={savingsNow} onChange={e => setSavingsNow(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.average_investment_return_year_15}</Label>
                <Input className="w-full" type="number" value={saveReturn} onChange={e => setSaveReturn(Number(e.target.value))} />
              </div>
            </div>
          </>;
      case "withdraw":
        return <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.your_age_now_16}</Label>
                  <Input className="w-full" type="number" value={withdrawAgeNow} onChange={e => setWithdrawAgeNow(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-3 block">{contentData.planned_retirement_age_17}</Label>
                  <Input className="w-full" type="number" value={withdrawRetireAge} onChange={e => setWithdrawRetireAge(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.life_expectancy_18}</Label>
                  <Input className="w-full" type="number" value={withdrawLifeExpectancy} onChange={e => setWithdrawLifeExpectancy(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.retirement_savings_today_19}</Label>
                  <Input className="w-full" type="number" value={withdrawSavings} onChange={e => setWithdrawSavings(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.annual_contribution_20}</Label>
                  <Input className="w-full" type="number" value={withdrawAnnualContribution} onChange={e => setWithdrawAnnualContribution(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.monthly_contribution_21}</Label>
                  <Input className="w-full" type="number" value={withdrawMonthlyContribution} onChange={e => setWithdrawMonthlyContribution(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.average_investment_return_year_22}</Label>
                  <Input className="w-full" type="number" value={withdrawReturn} onChange={e => setWithdrawReturn(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.inflation_rate_year_23}</Label>
                  <Input className="w-full" type="number" value={withdrawInflation} onChange={e => setWithdrawInflation(Number(e.target.value))} />
              </div>
            </div>
          </>;
      case "last":
        return <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.amount_you_have_24}</Label>
                  <Input className="w-full" type="number" value={amountHave} onChange={e => setAmountHave(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.planned_monthly_withdrawal_25}</Label>
                  <Input className="w-full" type="number" value={withdrawMonthly} onChange={e => setWithdrawMonthly(Number(e.target.value))} />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.average_investment_return_year_26}</Label>
                  <Input className="w-full" type="number" value={lastReturn} onChange={e => setLastReturn(Number(e.target.value))} />
              </div>
            </div>
          </>;
      default:
        return null;
    }
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  }
  return <>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 ring-4 ring-blue-100">
                  <TrendingUp className="w-10 h-10 text-white drop-shadow-md" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
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
                      <span className="text-blue-800 font-semibold">{contentData.retirement_details_30}</span>
                    </CardTitle>
                    <CardDescription className="text-sm mt-2 text-blue-700/70">{contentData.enter_your_retirement_information_below_31}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="mb-6">
                      <Label htmlFor="calcType" className="text-sm font-semibold mb-3 block text-blue-800">{contentData.calculation_type_32}</Label>
                      <div className="relative">
                        <select id="calcType" className="w-full mt-1 border border-blue-200 rounded-xl h-12 px-4 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 shadow-sm appearance-none bg-white pr-10 text-gray-700" value={calcType} onChange={e => setCalcType(e.target.value)}>
                          <option value="need">{contentData.how_much_do_you_need_to_retire_33}</option>
                          <option value="save">{contentData.how_can_you_save_for_retirement_34}</option>
                          <option value="withdraw">{contentData.how_much_can_you_withdraw_after_retirement_35}</option>
                          <option value="last">{contentData.how_long_can_your_money_last_36}</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {calcType === "need" && <>
                          {renderCalculatorForm()}
                        </>}
                      {calcType !== "need" && renderCalculatorForm()}
                    </div>
                    <Button onClick={() => {
                    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
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
                      const r_m = Math.pow(1 + r_ann, 1 / 12) - 1;
                      // Monthly PMT
                      const PMT_m = (fv_target - PV0 * Math.pow(1 + r_m, n)) / ((Math.pow(1 + r_m, n) - 1) / r_m);
                      // Yearly PMT
                      const PMT_y = (fv_target - PV0 * Math.pow(1 + r_ann, n_years)) / ((Math.pow(1 + r_ann, n_years) - 1) / r_ann);
                      // 3) Lump sum needed today for FV_target
                      const Lump_needed_today = fv_target / Math.pow(1 + r_ann, n_years);
                      const Additional_needed = Lump_needed_today - PV0;
                      setResult(`Monthly Savings Needed: $${PMT_m.toLocaleString(undefined, {
                        maximumFractionDigits: 2
                      })}\nYearly Savings Needed: $${PMT_y.toLocaleString(undefined, {
                        maximumFractionDigits: 2
                      })}\nLump Sum Needed Today: $${Lump_needed_today.toLocaleString(undefined, {
                        maximumFractionDigits: 2
                      })}\nAdditional Needed: $${Additional_needed.toLocaleString(undefined, {
                        maximumFractionDigits: 2
                      })}`);
                      setShowResult(true);
                    } else if (calcType === 'withdraw') {
                      // 5) Withdrawals after Retirement
                      const age_now = withdrawAgeNow;
                      const age_ret = withdrawRetireAge;
                      const n_years = age_ret - age_now;
                      const T_years = withdrawLifeExpectancy - withdrawRetireAge;
                      const r_ann = withdrawReturn / 100;
                      const infl = withdrawInflation / 100;
                      const r_m = Math.pow(1 + r_ann, 1 / 12) - 1;
                      const N_m = T_years * 12;
                      const PV_retirement = withdrawSavings * Math.pow(1 + r_ann, n_years) + (withdrawAnnualContribution + withdrawMonthlyContribution * 12) * ((Math.pow(1 + r_ann, n_years) - 1) / r_ann);
                      // A) Fixed Purchasing Power (growing withdrawals)
                      const g = infl; // withdrawal growth rate (often = infl)
                      // Annual withdrawal (W1) for fixed purchasing power
                      const denom = 1 - Math.pow((1 + g) / (1 + r_ann), T_years);
                      const W1 = PV_retirement * (r_ann - g) / denom;
                      // B) Fixed Amount Withdrawals (deplete to zero)
                      const PMT_m = PV_retirement * r_m / (1 - Math.pow(1 + r_m, -N_m));
                      setResult(`Balance at Retirement: $${PV_retirement.toLocaleString(undefined, {
                        maximumFractionDigits: 0
                      })}\nAnnual Withdrawal (growing with inflation): $${W1.toLocaleString(undefined, {
                        maximumFractionDigits: 0
                      })}\nMonthly Withdrawal (fixed): $${PMT_m.toLocaleString(undefined, {
                        maximumFractionDigits: 0
                      })}`);
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
                      setResult(`Your money will last: ${years} years and ${months} months.`);
                      setShowResult(true);
                    }
                  }} className="w-full h-12 text-base bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 shadow-lg mt-6 rounded-xl font-medium transition-all duration-300 transform hover:translate-y-[-2px] flex items-center justify-center gap-2">
                      <Calculator className="w-5 h-5" />{contentData.calculate_plan_37}</Button>
                  </CardContent>
                </Card>
              </div>
              {/* Right: Results card */}
              <div>
                <Card ref={resultsRef} className="shadow-xl border-0 pt-0 min-h-0 rounded-xl overflow-hidden hover:shadow-blue-100/50 transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-t-xl py-5 px-6 border-b border-blue-100/50">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-blue-800 font-semibold">{contentData.your_retirement_results_38}</span>
                    </CardTitle>
                    <CardDescription className="text-base text-gray-700">{contentData.see_your_retirement_calculation_results_here_39}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <div className="min-h-[200px] space-y-6">
                      {showResult && result ? <div className="space-y-4">
                          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 shadow-md">
                            <h3 className="text-xl font-bold text-blue-800 mb-3">{contentData.retirement_calculation_40}</h3>
                            <div className="space-y-3">
                              {result.split('\n').map((line, index) => <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-blue-200 shadow-sm">
                                  <span className="font-medium text-gray-700">{line.split(':')[0]}:</span>
                                  <span className="font-bold text-blue-600">{line.split(':')[1]}</span>
                                </div>)}
                            </div>
                          </div>
                        </div> : <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 shadow-inner">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md border border-blue-100">
                              <Calculator className="w-8 h-8 text-blue-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-700">{contentData.fill_in_your_details_and_click_calculate_see_your__41}</p>
                          </div>
                        </div>}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* How to Use Section (below main grid) */}
            
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="retirement-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />

         <SimilarCalculators calculators={[{
            calculatorName: "Pension Calculator",
            calculatorHref: "/financial/pension-calculator",
            calculatorDescription: "Calculate benefits and retirement income"
          }, {
            calculatorName: "Investment Calculator",
            calculatorHref: "/financial/investment-calculator",
            calculatorDescription: "Calculate returns and portfolio growth"
          }, {
            calculatorName: "Savings Calculator",
            calculatorHref: "/financial/savings-calculator",
            calculatorDescription: "Calculate value of savings with compound interest"
          }]} color="blue" title="Related Financial Calculators" />
          </div>
        </main>
        {/* Footer */}

      </div>

    </>;
}