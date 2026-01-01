"use client";

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

interface RetirementCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function RetirementCalculatorClient({ content, guideContent }: RetirementCalculatorClientProps) {
  const guideData = guideContent || { color: 'green', sections: [], faq: [] };
  
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
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
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [calcType, setCalcType] = useState("need");
  
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
  const [neededAtRetirement, setNeededAtRetirement] = useState(600000);
  const [savingsNow, setSavingsNow] = useState(30000);
  const [saveReturn, setSaveReturn] = useState(6);
  const [withdrawAgeNow, setWithdrawAgeNow] = useState(35);
  const [withdrawRetireAge, setWithdrawRetireAge] = useState(67);
  const [withdrawLifeExpectancy, setWithdrawLifeExpectancy] = useState(85);
  const [withdrawSavings, setWithdrawSavings] = useState(30000);
  const [withdrawAnnualContribution, setWithdrawAnnualContribution] = useState(0);
  const [withdrawMonthlyContribution, setWithdrawMonthlyContribution] = useState(500);
  const [withdrawReturn, setWithdrawReturn] = useState(6);
  const [withdrawInflation, setWithdrawInflation] = useState(3);
  const [amountHave, setAmountHave] = useState(600000);
  const [withdrawMonthly, setWithdrawMonthly] = useState(5000);
  const [lastReturn, setLastReturn] = useState(6);

  const calculateNeed = () => {
    const age_now = currentAge;
    const age_ret = retirementAge;
    const n_years = age_ret - age_now;
    const r_ann = investmentReturn / 100;
    const infl = inflationRate / 100;
    const r_m = Math.pow(1 + r_ann, 1 / 12) - 1;
    const N_m = n_years * 12;
    const PV0 = currentSavings;
    const PMT_y = currentIncome * (futureSavingsPercent / 100);
    const PMT_m = PMT_y / 12;
    const FV_monthly = PV0 * Math.pow(1 + r_m, N_m) + PMT_m * ((Math.pow(1 + r_m, N_m) - 1) / r_m);
    const FV_yearly = PV0 * Math.pow(1 + r_ann, n_years) + PMT_y * ((Math.pow(1 + r_ann, n_years) - 1) / r_ann);
    const Total_Principal_monthly = PV0 + PMT_m * N_m;
    const Total_Principal_yearly = PV0 + PMT_y * n_years;
    const Total_Interest_monthly = FV_monthly - Total_Principal_monthly;
    const Total_Interest_yearly = FV_yearly - Total_Principal_yearly;
    const PV_today = FV_yearly / Math.pow(1 + infl, n_years);
    
    setResult(`Future Value (Monthly): $${Math.round(FV_monthly).toLocaleString()}
Future Value (Yearly): $${Math.round(FV_yearly).toLocaleString()}
Total Principal (Monthly): $${Math.round(Total_Principal_monthly).toLocaleString()}
Total Interest (Monthly): $${Math.round(Total_Interest_monthly).toLocaleString()}
Equivalent in Today's Money: $${Math.round(PV_today).toLocaleString()}`);
    setShowResult(true);
  };

  const handleCalculate = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    
    if (calcType === 'need') {
      calculateNeed();
    } else if (calcType === 'save') {
      const years = retirementAge - currentAge;
      const n_years = years;
      const fv_target = neededAtRetirement;
      const PV0 = savingsNow;
      const r_ann = saveReturn / 100;
      const n = n_years * 12;
      const r_m = Math.pow(1 + r_ann, 1 / 12) - 1;
      const PMT_m = (fv_target - PV0 * Math.pow(1 + r_m, n)) / ((Math.pow(1 + r_m, n) - 1) / r_m);
      const PMT_y = (fv_target - PV0 * Math.pow(1 + r_ann, n_years)) / ((Math.pow(1 + r_ann, n_years) - 1) / r_ann);
      const Lump_needed_today = fv_target / Math.pow(1 + r_ann, n_years);
      const Additional_needed = Lump_needed_today - PV0;
      
      setResult(`Monthly Savings Needed: $${PMT_m.toLocaleString(undefined, { maximumFractionDigits: 2 })}
Yearly Savings Needed: $${PMT_y.toLocaleString(undefined, { maximumFractionDigits: 2 })}
Lump Sum Needed Today: $${Lump_needed_today.toLocaleString(undefined, { maximumFractionDigits: 2 })}
Additional Needed: $${Additional_needed.toLocaleString(undefined, { maximumFractionDigits: 2 })}`);
      setShowResult(true);
    } else if (calcType === 'withdraw') {
      const age_now = withdrawAgeNow;
      const age_ret = withdrawRetireAge;
      const n_years = age_ret - age_now;
      const T_years = withdrawLifeExpectancy - withdrawRetireAge;
      const r_ann = withdrawReturn / 100;
      const infl = withdrawInflation / 100;
      const r_m = Math.pow(1 + r_ann, 1 / 12) - 1;
      const N_m = T_years * 12;
      const PV_retirement = withdrawSavings * Math.pow(1 + r_ann, n_years) + (withdrawAnnualContribution + withdrawMonthlyContribution * 12) * ((Math.pow(1 + r_ann, n_years) - 1) / r_ann);
      const g = infl;
      const denom = 1 - Math.pow((1 + g) / (1 + r_ann), T_years);
      const W1 = PV_retirement * (r_ann - g) / denom;
      const PMT_m = PV_retirement * r_m / (1 - Math.pow(1 + r_m, -N_m));
      
      setResult(`Balance at Retirement: $${PV_retirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}
Annual Withdrawal (growing with inflation): $${W1.toLocaleString(undefined, { maximumFractionDigits: 0 })}
Monthly Withdrawal (fixed): $${PMT_m.toLocaleString(undefined, { maximumFractionDigits: 0 })}`);
      setShowResult(true);
    } else if (calcType === 'last') {
      const PV_retirement = amountHave;
      const PMT_m = withdrawMonthly;
      const r_m = lastReturn / 100 / 12;
      const N = -Math.log(1 - PV_retirement * r_m / PMT_m) / Math.log(1 + r_m);
      const years = Math.floor(N / 12);
      const months = Math.round(N % 12);
      
      setResult(`Your money will last: ${years} years and ${months} months.`);
      setShowResult(true);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <Card className="shadow-xl border-0 rounded-xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-t-xl py-5 px-6">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <Calculator className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-800 font-semibold">{contentData.retirement_details_30}</span>
                    </CardTitle>
                    <CardDescription className="text-sm mt-2">{contentData.enter_your_retirement_information_below_31}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <Label className="text-sm font-semibold mb-3 block">{contentData.calculation_type_32}</Label>
                      <select className="w-full border rounded-xl h-12 px-4" value={calcType} onChange={e => setCalcType(e.target.value)}>
                        <option value="need">{contentData.how_much_do_you_need_to_retire_33}</option>
                        <option value="save">{contentData.how_can_you_save_for_retirement_34}</option>
                        <option value="withdraw">{contentData.how_much_can_you_withdraw_after_retirement_35}</option>
                        <option value="last">{contentData.how_long_can_your_money_last_36}</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {calcType === "need" && (
                        <>
                          <Input type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} placeholder="Current Age" />
                          <Input type="number" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} placeholder="Retirement Age" />
                        </>
                      )}
                    </div>

                    <Button onClick={handleCalculate} className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600">
                      <Calculator className="w-5 h-5 mr-2" />{contentData.calculate_plan_37}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card ref={resultsRef} className="shadow-xl border-0 rounded-xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl py-5 px-6">
                    <CardTitle className="flex items-center space-x-3">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      <span>{contentData.your_retirement_results_38}</span>
                    </CardTitle>
                    <CardDescription>{contentData.see_your_retirement_calculation_results_here_39}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {showResult && result ? (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-3">{contentData.retirement_calculation_40}</h3>
                        {result.split('\n').map((line, index) => (
                          <div key={index} className="flex justify-between p-3 bg-white rounded-lg border">
                            <span className="font-medium">{line.split(':')[0]}:</span>
                            <span className="font-bold text-blue-600">{line.split(':')[1]}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-8">
                        <Calculator className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                        <p>{contentData.fill_in_your_details_and_click_calculate_see_your__41}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <RatingProfileSection
              entityId="retirement-calculator"
              entityType="calculator"
              creatorSlug="neo-nicholas"
              initialRatingTotal={0}
              initialRatingCount={0}
            />
            <CalculatorGuide data={guideData} />
            <SimilarCalculators 
              calculators={[
                {
                  calculatorName: "Pension Calculator",
                  calculatorHref: "/financial/pension-calculator",
                  calculatorDescription: "Calculate benefits and retirement income"
                }
              ]} 
              color="blue" 
              title="Related Financial Calculators" 
            />
          </div>
        </main>
      </div>
    </>
  );
}
