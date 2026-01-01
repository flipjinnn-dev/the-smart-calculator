"use client";

import { useState, useEffect, useRef } from "react";
import { Calculator, Home, DollarSign, Percent, Calendar, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface ExtraPayment {
  id: string;
  type: "monthly" | "yearly" | "one-time";
  amount: string;
  startMonth: string;
  startYear: string;
}

interface MortgageCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function MortgageCalculatorClient({ content, guideContent }: MortgageCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [homePrice, setHomePrice] = useState("400000");
  const [downPaymentType, setDownPaymentType] = useState("percent");
  const [downPaymentAmount, setDownPaymentAmount] = useState("80000");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("6.512");
  const [startMonth, setStartMonth] = useState("08");
  const [startYear, setStartYear] = useState("2025");

  // Annual Tax & Costs
  const [propertyTaxType, setPropertyTaxType] = useState("amount");
  const [propertyTaxAmount, setPropertyTaxAmount] = useState("4800");
  const [propertyTaxPercent, setPropertyTaxPercent] = useState("1.2");
  const [homeInsuranceType, setHomeInsuranceType] = useState("amount");
  const [homeInsuranceAmount, setHomeInsuranceAmount] = useState("1500");
  const [homeInsurancePercent, setHomeInsurancePercent] = useState("0.375");
  const [pmiType, setPmiType] = useState("amount");
  const [pmiAmount, setPmiAmount] = useState("200");
  const [pmiPercent, setPmiPercent] = useState("0.75");
  const [hoaFeeType, setHoaFeeType] = useState("amount");
  const [hoaFeeAmount, setHoaFeeAmount] = useState("0");
  const [hoaFeePercent, setHoaFeePercent] = useState("0");
  const [otherCostsType, setOtherCostsType] = useState("amount");
  const [otherCostsAmount, setOtherCostsAmount] = useState("4000");
  const [otherCostsPercent, setOtherCostsPercent] = useState("1");

  // Annual Increases
  const [propertyTaxIncrease, setPropertyTaxIncrease] = useState("3");
  const [homeInsuranceIncrease, setHomeInsuranceIncrease] = useState("3");
  const [hoaFeeIncrease, setHoaFeeIncrease] = useState("3");
  const [otherCostsIncrease, setOtherCostsIncrease] = useState("3");

  // Extra Payments
  const [extraPayments, setExtraPayments] = useState<ExtraPayment[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showExtraPayments, setShowExtraPayments] = useState(false);

  // Test the calculation on component mount and calculate initial results
  useEffect(() => {
    testMortgageCalculation();
    // Calculate initial results with default values
    setTimeout(() => {
      calculateMortgage();
    }, 100);
  }, []);
  const [results, setResults] = useState<{
    monthlyPayment: number;
    principalAndInterest: number;
    propertyTax: number;
    homeInsurance: number;
    pmi: number;
    hoaFees: number;
    otherCosts: number;
    totalMonthly: number;
    totalInterest: number;
    totalPayments: number;
    loanAmount: number;
    payoffDate: string;
    principalPercent: number;
    taxPercent: number;
    insurancePercent: number;
    otherPercent: number;
  } | null>(null);
  const calculateDownPayment = () => {
    const price = Number.parseFloat(homePrice);
    if (downPaymentType === "percent") {
      return price * Number.parseFloat(downPaymentPercent) / 100;
    }
    return Number.parseFloat(downPaymentAmount);
  };
  const calculateTaxCost = (type: string, amount: string, percent: string) => {
    const price = Number.parseFloat(homePrice);
    if (type === "percent") {
      return price * Number.parseFloat(percent) / 100;
    }
    return Number.parseFloat(amount);
  };
  const addExtraPayment = (type: "monthly" | "yearly" | "one-time") => {
    const newPayment: ExtraPayment = {
      id: Date.now().toString(),
      type,
      amount: "100",
      startMonth: "01",
      startYear: "2025"
    };
    setExtraPayments([...extraPayments, newPayment]);
  };
  const removeExtraPayment = (id: string) => {
    setExtraPayments(extraPayments.filter(p => p.id !== id));
  };

  // Test function to validate mortgage calculation
  const testMortgageCalculation = () => {
    // Test with your exact values
    const testPrincipal = 320000;
    const testMonthlyRate = 6.512 / 100 / 12; // 0.0054267
    const testNumberOfPayments = 30 * 12; // 360

    const testMonthlyPI = testPrincipal * testMonthlyRate * Math.pow(1 + testMonthlyRate, testNumberOfPayments) / (Math.pow(1 + testMonthlyRate, testNumberOfPayments) - 1);
    console.log('=== Mortgage Calculation Validation ===');
    console.log('Principal: $' + testPrincipal.toLocaleString());
    console.log('Monthly Rate: ' + testMonthlyRate.toFixed(7));
    console.log('Number of Payments: ' + testNumberOfPayments);
    console.log('Expected Monthly Payment: $2,025.14');
    console.log('Calculated Monthly Payment: $' + testMonthlyPI.toFixed(2));
    console.log('Difference: $' + Math.abs(testMonthlyPI - 2025.14).toFixed(2));

    // Verify accuracy
    if (Math.abs(testMonthlyPI - 2025.14) < 0.01) {
      console.log('✅ Calculation is ACCURATE!');
    } else {
      console.log('❌ Calculation needs adjustment');
    }
    return testMonthlyPI;
  };
  const calculateMortgage = () => {
    const price = Number.parseFloat(homePrice);
    const downPayment = calculateDownPayment();
    const principal = price - downPayment;
    const monthlyRate = Number.parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = Number.parseFloat(loanTerm) * 12;
    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) return;

    // Standard mortgage payment formula: M = P × [r(1+r)^n] / [(1+r)^n - 1]
    // Where: M = Monthly payment, P = Principal, r = Monthly interest rate, n = Total number of payments
    // Calculate monthly principal and interest payment with high precision
    const monthlyPI = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate additional monthly costs
    const annualPropertyTax = calculateTaxCost(propertyTaxType, propertyTaxAmount, propertyTaxPercent);
    const annualHomeInsurance = calculateTaxCost(homeInsuranceType, homeInsuranceAmount, homeInsurancePercent);
    const annualPMI = calculateTaxCost(pmiType, pmiAmount, pmiPercent);
    const annualHOA = calculateTaxCost(hoaFeeType, hoaFeeAmount, hoaFeePercent);
    const annualOtherCosts = calculateTaxCost(otherCostsType, otherCostsAmount, otherCostsPercent);
    const monthlyPropertyTax = annualPropertyTax / 12;
    const monthlyInsurance = annualHomeInsurance / 12;
    const monthlyPMI = annualPMI / 12;
    const monthlyHOA = annualHOA / 12;
    const monthlyOtherCosts = annualOtherCosts / 12;

    // Calculate total monthly payment and loan summary
    const totalMonthly = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA + monthlyOtherCosts;
    const totalPayments = monthlyPI * numberOfPayments;
    const totalInterest = totalPayments - principal;

    // Calculate payoff date
    const startDate = new Date(Number.parseInt(startYear), Number.parseInt(startMonth) - 1, 1);
    const payoffDate = new Date(startDate);
    payoffDate.setMonth(payoffDate.getMonth() + numberOfPayments);

    // Calculate percentages for pie chart
    const principalPercent = Math.round(monthlyPI / totalMonthly * 100);
    const taxPercent = Math.round(monthlyPropertyTax / totalMonthly * 100);
    const insurancePercent = Math.round(monthlyInsurance / totalMonthly * 100);
    const otherPercent = 100 - principalPercent - taxPercent - insurancePercent;
    setResults({
      monthlyPayment: monthlyPI,
      principalAndInterest: monthlyPI,
      propertyTax: monthlyPropertyTax,
      homeInsurance: monthlyInsurance,
      pmi: monthlyPMI,
      hoaFees: monthlyHOA,
      otherCosts: monthlyOtherCosts,
      totalMonthly,
      totalInterest,
      totalPayments,
      loanAmount: principal,
      payoffDate: payoffDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
      }),
      principalPercent,
      taxPercent,
      insurancePercent,
      otherPercent
    });
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Home className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.advanced_mortgage_calculator_0}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.calculate_your_complete_mortgage_costs_with_advanc_1}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white pt-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>{contentData.mortgage_calculator_2}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.home_price_3}</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="number" placeholder="400,000" value={homePrice} onChange={e => setHomePrice(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.down_payment_4}</Label>
                      <div className="flex space-x-2">
                        <Select value={downPaymentType} onValueChange={setDownPaymentType}>
                          <SelectTrigger className="w-20 h-12 border-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percent">%</SelectItem>
                            <SelectItem value="amount">$</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="relative flex-1">
                          {downPaymentType === "amount" && <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />}
                          {downPaymentType === "percent" && <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />}
                          <Input type="number" placeholder={downPaymentType === "percent" ? "20" : "80,000"} value={downPaymentType === "percent" ? downPaymentPercent : downPaymentAmount} onChange={e => downPaymentType === "percent" ? setDownPaymentPercent(e.target.value) : setDownPaymentAmount(e.target.value)} className={`h-12 text-lg border-2 focus:border-green-500 ${downPaymentType === "amount" ? "pl-10" : "pr-10"}`} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.loan_term_5}</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Select value={loanTerm} onValueChange={setLoanTerm}>
                          <SelectTrigger className="pl-10 h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">{contentData.k_10_years_6}</SelectItem>
                            <SelectItem value="15">{contentData.k_15_years_7}</SelectItem>
                            <SelectItem value="20">{contentData.k_20_years_8}</SelectItem>
                            <SelectItem value="25">{contentData.k_25_years_9}</SelectItem>
                            <SelectItem value="30">{contentData.k_30_years_10}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.interest_rate_11}</Label>
                      <div className="relative">
                        <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="number" step="0.001" placeholder="6.609" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="pr-10 h-12 text-lg border-2 focus:border-green-500" />
                      </div>
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <Label className="text-base font-semibold text-gray-900">{contentData.start_date_12}</Label>
                      <div className="flex space-x-2">
                        <Select value={startMonth} onValueChange={setStartMonth}>
                          <SelectTrigger className="h-12 border-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="01">{contentData.jan_13}</SelectItem>
                            <SelectItem value="02">{contentData.feb_14}</SelectItem>
                            <SelectItem value="03">{contentData.mar_15}</SelectItem>
                            <SelectItem value="04">{contentData.apr_16}</SelectItem>
                            <SelectItem value="05">{contentData.may_17}</SelectItem>
                            <SelectItem value="06">{contentData.jun_18}</SelectItem>
                            <SelectItem value="07">{contentData.jul_19}</SelectItem>
                            <SelectItem value="08">{contentData.aug_20}</SelectItem>
                            <SelectItem value="09">{contentData.sep_21}</SelectItem>
                            <SelectItem value="10">{contentData.oct_22}</SelectItem>
                            <SelectItem value="11">{contentData.nov_23}</SelectItem>
                            <SelectItem value="12">{contentData.dec_24}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input type="number" placeholder="2025" value={startYear} onChange={e => setStartYear(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>
                    </div>
                  </div>

                  {/* Advanced Options */}
                  <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full mb-6 h-12 text-base border-2 hover:bg-gray-50 bg-transparent">
                        {showAdvanced ? <Minus className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                        {showAdvanced ? "Fewer Options" : "More Options"}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-8">
                      {/* Annual Tax & Costs */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">{contentData.annual_tax_costs_25}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[{
                            label: "Property Taxes",
                            type: propertyTaxType,
                            setType: setPropertyTaxType,
                            amount: propertyTaxAmount,
                            setAmount: setPropertyTaxAmount,
                            percent: propertyTaxPercent,
                            setPercent: setPropertyTaxPercent
                          }, {
                            label: "Home Insurance",
                            type: homeInsuranceType,
                            setType: setHomeInsuranceType,
                            amount: homeInsuranceAmount,
                            setAmount: setHomeInsuranceAmount,
                            percent: homeInsurancePercent,
                            setPercent: setHomeInsurancePercent
                          }, {
                            label: "PMI Insurance",
                            type: pmiType,
                            setType: setPmiType,
                            amount: pmiAmount,
                            setAmount: setPmiAmount,
                            percent: pmiPercent,
                            setPercent: setPmiPercent
                          }, {
                            label: "HOA Fee",
                            type: hoaFeeType,
                            setType: setHoaFeeType,
                            amount: hoaFeeAmount,
                            setAmount: setHoaFeeAmount,
                            percent: hoaFeePercent,
                            setPercent: setHoaFeePercent
                          }, {
                            label: "Other Costs",
                            type: otherCostsType,
                            setType: setOtherCostsType,
                            amount: otherCostsAmount,
                            setAmount: setOtherCostsAmount,
                            percent: otherCostsPercent,
                            setPercent: setOtherCostsPercent
                          }].map((item, index) => <div key={index} className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">{item.label}</Label>
                            <div className="flex space-x-2">
                              <Select value={item.type} onValueChange={item.setType}>
                                <SelectTrigger className="w-20 h-10 border-2">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="percent">%</SelectItem>
                                  <SelectItem value="amount">$</SelectItem>
                                </SelectContent>
                              </Select>
                              <div className="relative flex-1">
                                {item.type === "amount" && <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />}
                                {item.type === "percent" && <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />}
                                <Input type="number" value={item.type === "percent" ? item.percent : item.amount} onChange={e => item.type === "percent" ? item.setPercent(e.target.value) : item.setAmount(e.target.value)} className={`h-10 border-2 focus:border-green-500 ${item.type === "amount" ? "pl-10" : "pr-10"}`} />
                              </div>
                            </div>
                          </div>)}
                        </div>
                      </div>

                      {/* Annual Increases */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">{contentData.annual_tax_cost_increases_26}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[{
                            label: "Property Taxes Increase",
                            value: propertyTaxIncrease,
                            setValue: setPropertyTaxIncrease
                          }, {
                            label: "Home Insurance Increase",
                            value: homeInsuranceIncrease,
                            setValue: setHomeInsuranceIncrease
                          }, {
                            label: "HOA Fee Increase",
                            value: hoaFeeIncrease,
                            setValue: setHoaFeeIncrease
                          }, {
                            label: "Other Costs Increase",
                            value: otherCostsIncrease,
                            setValue: setOtherCostsIncrease
                          }].map((item, index) => <div key={index} className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">{item.label}</Label>
                            <div className="relative">
                              <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <Input type="number" step="0.1" value={item.value} onChange={e => item.setValue(e.target.value)} className="pr-10 h-10 border-2 focus:border-green-500" />
                            </div>
                          </div>)}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Extra Payments */}
                  <Collapsible open={showExtraPayments} onOpenChange={setShowExtraPayments}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full mb-6 h-12 text-base border-2 hover:bg-gray-50 bg-transparent">
                        {showExtraPayments ? <Minus className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}{contentData.extra_payments_27}</Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-6">
                      <div className="flex flex-wrap gap-3">
                        <Button onClick={() => addExtraPayment("monthly")} variant="outline" size="sm">{contentData.extra_monthly_pay_28}</Button>
                        <Button onClick={() => addExtraPayment("yearly")} variant="outline" size="sm">{contentData.extra_yearly_pay_29}</Button>
                        <Button onClick={() => addExtraPayment("one-time")} variant="outline" size="sm">{contentData.extra_onetime_pay_30}</Button>
                      </div>

                      {extraPayments.map(payment => <div key={payment.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium capitalize">{payment.type.replace("-", " ")}</span>
                        <Input type="number" placeholder="100" value={payment.amount} onChange={e => {
                          setExtraPayments(extraPayments.map(p => p.id === payment.id ? {
                            ...p,
                            amount: e.target.value
                          } : p));
                        }} className="w-24 h-8" />
                        <span className="text-sm text-gray-500">{contentData.from_31}</span>
                        <Select value={payment.startMonth} onValueChange={value => {
                          setExtraPayments(extraPayments.map(p => p.id === payment.id ? {
                            ...p,
                            startMonth: value
                          } : p));
                        }}>
                          <SelectTrigger className="w-20 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="01">{contentData.jan_32}</SelectItem>
                            <SelectItem value="02">{contentData.feb_33}</SelectItem>
                            <SelectItem value="03">{contentData.mar_34}</SelectItem>
                            <SelectItem value="04">{contentData.apr_35}</SelectItem>
                            <SelectItem value="05">{contentData.may_36}</SelectItem>
                            <SelectItem value="06">{contentData.jun_37}</SelectItem>
                            <SelectItem value="07">{contentData.jul_38}</SelectItem>
                            <SelectItem value="08">{contentData.aug_39}</SelectItem>
                            <SelectItem value="09">{contentData.sep_40}</SelectItem>
                            <SelectItem value="10">{contentData.oct_41}</SelectItem>
                            <SelectItem value="11">{contentData.nov_42}</SelectItem>
                            <SelectItem value="12">{contentData.dec_43}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input type="number" placeholder="2025" value={payment.startYear} onChange={e => {
                          setExtraPayments(extraPayments.map(p => p.id === payment.id ? {
                            ...p,
                            startYear: e.target.value
                          } : p));
                        }} className="w-20 h-8" />
                        <Button onClick={() => removeExtraPayment(payment.id)} variant="outline" size="sm" className="text-red-600 hover:text-red-700">{contentData.remove_44}</Button>
                      </div>)}
                    </CollapsibleContent>
                  </Collapsible>

                  <Button onClick={() => {
                    calculateMortgage();
                    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                  }} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12">{contentData.calculate_mortgage_45}</Button>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-1">
              <Card ref={resultsRef} className="shadow-2xl border-0 bg-white sticky top-24 pt-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.monthly_payment_46}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_complete_payment_breakdown_47}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                    {/* Monthly Payment */}
                    <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                      <p className="text-lg text-gray-600 mb-2">{contentData.monthly_pay_48}</p>
                      <p className="text-4xl font-bold text-green-600 mb-2">
                        $
                        {results.totalMonthly.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                      <p className="text-sm text-gray-500">{contentData.total_monthly_payment_49}</p>
                    </div>

                    {/* Payment Breakdown */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-gray-900">{contentData.payment_breakdown_50}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="font-medium text-gray-700">{contentData.mortgage_payment_51}</span>
                          <span className="font-bold text-green-600">
                            $
                            {results.principalAndInterest.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="font-medium text-gray-700">{contentData.property_tax_52}</span>
                          <span className="font-bold text-blue-600">
                            $
                            {results.propertyTax.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <span className="font-medium text-gray-700">{contentData.home_insurance_53}</span>
                          <span className="font-bold text-purple-600">
                            $
                            {results.homeInsurance.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-medium text-gray-700">{contentData.other_costs_54}</span>
                          <span className="font-bold text-orange-600">
                            $
                            {results.otherCosts.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pie Chart Representation */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-gray-900">{contentData.payment_distribution_55}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-sm">{results.principalPercent}{contentData.principal_interest_56}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span className="text-sm">{results.taxPercent}{contentData.property_taxes_57}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-purple-500 rounded"></div>
                          <span className="text-sm">{results.insurancePercent}{contentData.home_insurance_58}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-orange-500 rounded"></div>
                          <span className="text-sm">{results.otherPercent}{contentData.other_costs_59}</span>
                        </div>
                      </div>
                    </div>

                    {/* Loan Summary */}
                    <div className="space-y-3 pt-4 border-t">
                      <h3 className="font-bold text-lg text-gray-900">{contentData.loan_summary_60}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{contentData.house_price_61}</span>
                          <span className="font-bold">${Number.parseFloat(homePrice).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{contentData.loan_amount_62}</span>
                          <span className="font-bold">${results.loanAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{contentData.down_payment_63}</span>
                          <span className="font-bold">${calculateDownPayment().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{contentData.interest_rate_64}</span>
                          <span className="font-bold">{interestRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{contentData.loan_term_65}</span>
                          <span className="font-bold">{loanTerm}{contentData.years_66}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{contentData.total_interest_67}</span>
                          <span className="font-bold text-red-600">${results.totalInterest.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{contentData.payoff_date_68}</span>
                          <span className="font-bold">{results.payoffDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Current Rates */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-bold text-sm text-blue-900 mb-2">{contentData.latest_mortgage_rates_69}</h4>
                      <div className="space-y-1 text-xs text-blue-800">
                        <div className="flex justify-between">
                          <span>{contentData.k_30_years_70}</span>
                          <span className="font-bold">{contentData.k_6512_71}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{contentData.k_15_years_72}</span>
                          <span className="font-bold">{contentData.k_5608_73}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{contentData.k_10_years_74}</span>
                          <span className="font-bold">{contentData.k_5494_75}</span>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1">
                        <Button size="sm" className="w-full text-xs bg-blue-600 hover:bg-blue-700">{contentData.see_your_local_rates_76}</Button>
                        <Button size="sm" variant="outline" className="w-full text-xs border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">{contentData.get_preapproval_77}</Button>
                      </div>
                    </div>
                  </div> : <div className="text-center py-12 text-gray-500">
                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">{contentData.enter_mortgage_details_to_see_your_payment_breakdo_78}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>

          </div>

        </div>

        {/* Similar Calculators Section */}
        <SimilarCalculators calculators={[{
          calculatorName: "Amortization Calculator",
          calculatorHref: "/financial/amortization-calculator",
          calculatorDescription: "Calculate loan payments and schedules for any type of loan"
        }, {
          calculatorName: "Mortgage Payoff Calculator",
          calculatorHref: "/financial/mortgage-payoff-calculator",
          calculatorDescription: "Calculate car loan payments and total cost"
        }, {
          calculatorName: "House Affordability Calculator",
          calculatorHref: "/financial/house-affordability-calculator",
          calculatorDescription: "Determine how much house you can afford based on your income"
        }]}
          color="green"
          title="Related Financial Calculators" />

        
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="mortgage-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <div className="mt-8">
          <CalculatorGuide data={guideData} />
        </div>
      </main>

    </div>
  </>;
}
