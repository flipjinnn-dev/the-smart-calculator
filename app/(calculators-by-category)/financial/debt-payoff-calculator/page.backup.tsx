"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";

import { Calculator, CreditCardIcon, DollarSign, TrendingDown, HelpCircle, Plus, Trash2, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;
interface Debt {
  id: number;
  name: string;
  balance: number;
  minPayment: number;
  apr: number;
}
interface PaymentScheduleEntry {
  month: number;
  debts: {
    id: number;
    name: string;
    beginningBalance: number;
    interestCharged: number;
    paymentMade: number;
    principalPaid: number;
    endingBalance: number;
  }[];
  totalInterest: number;
  totalPayment: number;
}
export default function DebtPayoffCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('debt-payoff-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('debt-payoff-calculator', language, "calculator-guide");

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
    "debt_payoff_calculator_0": "",
    "extra_payments_1": "",
    "extra_monthly_payment_2": "",
    "extra_annual_payment_3": "",
    "onetime_extra_payment_4": "",
    "apply_onetime_in_month_5": "",
    "fixed_total_amount_mode_6": "",
    "reallocate_payments_from_paidoff_debts_to_remainin_7": "",
    "your_debts_8": "",
    "add_debt_9": "",
    "debt_10": "",
    "debt_name_11": "",
    "current_balance_12": "",
    "minimum_payment_13": "",
    "apr_14": "",
    "calculate_strategy_15": "",
    "payoff_results_16": "",
    "your_debt_avalanche_strategy_17": "",
    "payoff_time_18": "",
    "y_19": "",
    "m_20": "",
    "total_interest_21": "",
    "total_amount_paid_22": "",
    "payoff_order_avalanche_method_23": "",
    "payment_schedule_24": "",
    "download_csv_25": "",
    "month_26": "",
    "debt_27": "",
    "balance_28": "",
    "interest_29": "",
    "payment_30": "",
    "remaining_31": "",
    "showing_first_24_months_download_csv_for_complete__32": "",
    "enter_your_debt_information_to_see_your_payoff_str_33": "",
    "how_the_debt_avalanche_works_34": "",
    "the_debt_avalanche_method_is_a_mathematically_opti_35": "",
    "list_all_debts_36": "",
    "with_their_balances_minimum_payments_and_aprs_37": "",
    "make_minimum_payments_38": "",
    "on_all_debts_to_avoid_penalties_39": "",
    "apply_extra_payments_40": "",
    "to_the_debt_with_the_highest_interest_rate_first_41": "",
    "once_paid_off_42": "",
    "redirect_all_payments_to_the_next_highestrate_debt_43": "",
    "repeat_44": "",
    "until_all_debts_are_eliminated_45": "",
    "inputs_you_provide_46": "",
    "for_each_debt_47": "",
    "current_balance_b_48": "",
    "i_49": "",
    "minimum_monthly_payment_m_50": "",
    "i_51": "",
    "annual_apr_r_52": "",
    "i_53": "",
    "optional_extra_payments_54": "",
    "extra_per_month_e_55": "",
    "monthly_56": "",
    "extra_per_year_e_57": "",
    "annual_58": "",
    "onetime_extra_payment_e_59": "",
    "onetime_60": "",
    "fixed_total_amount_mode_yesno_61": "",
    "formulas_and_calculation_logic_62": "",
    "k_1_interest_accrual_63": "",
    "i_64": "",
    "i_65": "",
    "k_b_66": "",
    "i_67": "",
    "k1_r_68": "",
    "i_69": "",
    "k_12_70": "",
    "monthly_interest_previous_balance_monthly_rate_71": "",
    "k_2_balance_after_interest_72": "",
    "b_73": "",
    "i_74": "",
    "k_b_75": "",
    "i_76": "",
    "k1_i_77": "",
    "i_78": "",
    "k_79": "",
    "k_3_payment_application_80": "",
    "b_81": "",
    "i_82": "",
    "k_max0_b_83": "",
    "i_84": "",
    "k_p_85": "",
    "i_86": "",
    "k_87": "",
    "new_balance_max0_balance_after_interest_payment_88": "",
    "k_4_avalanche_priority_89": "",
    "extra_payments_are_applied_to_debts_in_order_of_hi_90": "",
    "example_debt_payoff_schedule_91": "",
    "example_scenario_92": "",
    "credit_card_a_5000_at_1899_apr_100_minimum_93": "",
    "credit_card_b_3000_at_2499_apr_75_minimum_94": "",
    "extra_monthly_payment_200_95": "",
    "fixed_total_mode_yes_96": "",
    "strategy_result_97": "",
    "pay_minimums_175_total_98": "",
    "apply_extra_200_to_card_b_higher_apr_99": "",
    "card_b_paid_off_first_in_11_months_100": "",
    "reallocate_card_bs_275_payment_to_card_a_101": "",
    "total_payoff_time_18_months_102": "",
    "interest_saved_vs_minimum_payments_2400_103": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [extraMonthly, setExtraMonthly] = useState("0");
  const [extraAnnual, setExtraAnnual] = useState("0");
  const [oneTimeAmount, setOneTimeAmount] = useState("0");
  const [oneTimeMonth, setOneTimeMonth] = useState("1");
  const [fixedTotalMode, setFixedTotalMode] = useState(true);
  const [debts, setDebts] = useState<Debt[]>([{
    id: 1,
    name: "Credit Card 1",
    balance: 5000,
    minPayment: 100,
    apr: 18.99
  }, {
    id: 2,
    name: "Credit Card 2",
    balance: 3000,
    minPayment: 75,
    apr: 24.99
  }]);
  const [results, setResults] = useState<{
    payoffTime: number;
    totalInterest: number;
    totalPaid: number;
    totalPrincipal: number;
    schedule: PaymentScheduleEntry[];
    payoffOrder: string[];
  } | null>(null);
  const addDebt = () => {
    const newId = Math.max(...debts.map(d => d.id)) + 1;
    setDebts([...debts, {
      id: newId,
      name: `Debt ${newId}`,
      balance: 0,
      minPayment: 0,
      apr: 0
    }]);
  };
  const removeDebt = (id: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter(d => d.id !== id));
    }
  };
  const updateDebt = (id: number, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(d => d.id === id ? {
      ...d,
      [field]: value
    } : d));
  };
  const calculateDebtPayoff = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const extraMonthlyAmount = Number.parseFloat(extraMonthly) || 0;
    const extraAnnualAmount = Number.parseFloat(extraAnnual) || 0;
    const oneTimePayment = Number.parseFloat(oneTimeAmount) || 0;
    const oneTimePaymentMonth = Number.parseInt(oneTimeMonth) || 1;

    // Initialize working debts with current balances
    let workingDebts = debts.filter(debt => debt.balance > 0).map(debt => ({
      ...debt,
      currentBalance: debt.balance,
      isActive: true
    }));
    if (workingDebts.length === 0) {
      alert("Please add debts with positive balances");
      return;
    }
    const schedule: PaymentScheduleEntry[] = [];
    const payoffOrder: string[] = [];
    let month = 0;
    let totalInterestPaid = 0;
    const totalMinPayments = workingDebts.reduce((sum, debt) => sum + debt.minPayment, 0);
    let availableForReallocation = 0;
    while (workingDebts.some(debt => debt.currentBalance > 0.01) && month < 600) {
      month++;
      const monthEntry: PaymentScheduleEntry = {
        month,
        debts: [],
        totalInterest: 0,
        totalPayment: 0
      };

      // Step 1: Apply interest to all active debts
      workingDebts.forEach(debt => {
        if (debt.currentBalance > 0) {
          const monthlyRate = debt.apr / 100 / 12;
          const interestCharged = debt.currentBalance * monthlyRate;
          debt.currentBalance += interestCharged;
          totalInterestPaid += interestCharged;
          monthEntry.totalInterest += interestCharged;
        }
      });

      // Step 2: Calculate extra payments for this month
      let monthlyExtra = extraMonthlyAmount;

      // Add annual extra payment (1/12 each month)
      if (extraAnnualAmount > 0) {
        monthlyExtra += extraAnnualAmount / 12;
      }

      // Add one-time payment if this is the specified month
      if (month === oneTimePaymentMonth && oneTimePayment > 0) {
        monthlyExtra += oneTimePayment;
      }

      // Add any reallocated payments from paid-off debts
      monthlyExtra += availableForReallocation;

      // Step 3: Make minimum payments first
      workingDebts.forEach(debt => {
        if (debt.currentBalance > 0) {
          const payment = Math.min(debt.minPayment, debt.currentBalance);
          debt.currentBalance = Math.max(0, debt.currentBalance - payment);
          monthEntry.totalPayment += payment;
        }
      });

      // Step 4: Apply extra payments using avalanche method (highest APR first)
      if (monthlyExtra > 0) {
        // Sort debts by APR (descending), then by balance (ascending) for tiebreaker
        const sortedDebts = workingDebts.filter(debt => debt.currentBalance > 0).sort((a, b) => {
          if (b.apr !== a.apr) return b.apr - a.apr;
          return a.currentBalance - b.currentBalance;
        });
        let remainingExtra = monthlyExtra;
        for (const debt of sortedDebts) {
          if (remainingExtra <= 0 || debt.currentBalance <= 0) break;
          const extraPayment = Math.min(remainingExtra, debt.currentBalance);
          debt.currentBalance = Math.max(0, debt.currentBalance - extraPayment);
          remainingExtra -= extraPayment;
          monthEntry.totalPayment += extraPayment;
        }
      }

      // Step 5: Record this month's activity and track payoffs
      let newlyPaidOffAmount = 0;
      debts.forEach(originalDebt => {
        const workingDebt = workingDebts.find(d => d.id === originalDebt.id);
        if (workingDebt) {
          const beginningBalance = workingDebt.currentBalance + monthEntry.totalPayment - monthEntry.totalInterest;
          const interestCharged = beginningBalance * (originalDebt.apr / 100 / 12);
          const totalPaymentForDebt = Math.min(workingDebt.minPayment + (monthlyExtra > 0 ? Math.min(monthlyExtra, beginningBalance) : 0), beginningBalance + interestCharged);

          // Check if debt was just paid off
          if (beginningBalance > 0 && workingDebt.currentBalance <= 0.01 && !payoffOrder.includes(workingDebt.name)) {
            payoffOrder.push(workingDebt.name);
            if (fixedTotalMode) {
              newlyPaidOffAmount += workingDebt.minPayment;
            }
          }
          monthEntry.debts.push({
            id: workingDebt.id,
            name: workingDebt.name,
            beginningBalance: Math.max(0, beginningBalance),
            interestCharged: beginningBalance > 0 ? interestCharged : 0,
            paymentMade: beginningBalance > 0 ? totalPaymentForDebt : 0,
            principalPaid: Math.max(0, totalPaymentForDebt - interestCharged),
            endingBalance: Math.max(0, workingDebt.currentBalance)
          });
        }
      });

      // Step 6: Handle reallocation for fixed total mode
      if (fixedTotalMode && newlyPaidOffAmount > 0) {
        availableForReallocation += newlyPaidOffAmount;
      }
      schedule.push(monthEntry);

      // Remove paid off debts
      workingDebts = workingDebts.filter(debt => debt.currentBalance > 0.01);
    }
    const totalPrincipal = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const totalPaid = totalPrincipal + totalInterestPaid;
    setResults({
      payoffTime: month,
      totalInterest: totalInterestPaid,
      totalPaid,
      totalPrincipal,
      schedule,
      payoffOrder
    });
  };
  const downloadCSV = () => {
    if (!results) return;
    const headers = ["Month", "Debt Name", "Beginning Balance", "Interest Charged", "Payment Made", "Principal Paid", "Ending Balance"];
    const csvContent = [headers.join(","), ...results.schedule.flatMap(entry => entry.debts.map(debt => [entry.month, `"${debt.name}"`, debt.beginningBalance.toFixed(2), debt.interestCharged.toFixed(2), debt.paymentMade.toFixed(2), debt.principalPaid.toFixed(2), debt.endingBalance.toFixed(2)].join(",")))].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv"
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "debt-payoff-schedule.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CreditCardIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-red-600" />
                    <span>{contentData.debt_payoff_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Extra Payments Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.extra_payments_1}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.extra_monthly_payment_2}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={extraMonthly} onChange={e => setExtraMonthly(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-red-500" placeholder="200" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.extra_annual_payment_3}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={extraAnnual} onChange={e => setExtraAnnual(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-red-500" placeholder="1200" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.onetime_extra_payment_4}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={oneTimeAmount} onChange={e => setOneTimeAmount(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-red-500" placeholder="500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.apply_onetime_in_month_5}</Label>
                        <Input type="number" min="1" value={oneTimeMonth} onChange={e => setOneTimeMonth(e.target.value)} className="h-12 text-lg border-2 focus:border-red-500" placeholder="1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-base font-semibold text-gray-900">{contentData.fixed_total_amount_mode_6}</Label>
                        <p className="text-sm text-gray-600">{contentData.reallocate_payments_from_paidoff_debts_to_remainin_7}</p>
                      </div>
                      <Switch checked={fixedTotalMode} onCheckedChange={setFixedTotalMode} />
                    </div>
                  </div>

                  <Separator />

                  {/* Debts Section */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <CreditCardIcon className="w-5 h-5 text-red-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{contentData.your_debts_8}</h3>
                      </div>
                      <Button onClick={addDebt} variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                        <Plus className="w-4 h-4 mr-2" />{contentData.add_debt_9}</Button>
                    </div>

                    <div className="space-y-4">
                      {debts.map((debt, index) => <Card key={debt.id} className="border-2 border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold text-gray-900">{contentData.debt_10}{index + 1}</h4>
                              {debts.length > 1 && <Button onClick={() => removeDebt(debt.id)} variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="w-4 h-4" />
                                </Button>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">{contentData.debt_name_11}</Label>
                                <Input value={debt.name} onChange={e => updateDebt(debt.id, "name", e.target.value)} className="h-10 border-2 focus:border-red-500" placeholder="Credit Card 1" />
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">{contentData.current_balance_12}</Label>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <Input type="number" value={debt.balance} onChange={e => updateDebt(debt.id, "balance", Number.parseFloat(e.target.value) || 0)} className="pl-9 h-10 border-2 focus:border-red-500" placeholder="5000" />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">{contentData.minimum_payment_13}</Label>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <Input type="number" value={debt.minPayment} onChange={e => updateDebt(debt.id, "minPayment", Number.parseFloat(e.target.value) || 0)} className="pl-9 h-10 border-2 focus:border-red-500" placeholder="100" />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">{contentData.apr_14}</Label>
                                <Input type="number" step="0.01" value={debt.apr} onChange={e => updateDebt(debt.id, "apr", Number.parseFloat(e.target.value) || 0)} className="h-10 border-2 focus:border-red-500" placeholder="18.99" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>)}
                    </div>
                  </div>

                  <Button onClick={calculateDebtPayoff} className="w-full h-14 text-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-xl font-bold mt-12">{contentData.calculate_strategy_15}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.payoff_results_16}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_debt_avalanche_strategy_17}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                          <p className="text-sm mb-1 font-semibold text-green-800">{contentData.payoff_time_18}</p>
                          <p className="text-2xl font-bold text-green-700">
                            {Math.floor(results.payoffTime / 12)}{contentData.y_19}{results.payoffTime % 12}{contentData.m_20}</p>
                        </div>

                        <div className="text-center p-4 rounded-2xl border-2 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300">
                          <p className="text-sm mb-1 font-semibold text-blue-800">{contentData.total_interest_21}</p>
                          <p className="text-2xl font-bold text-blue-700">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </p>
                        </div>
                      </div>

                      <div className="text-center p-4 rounded-2xl border-2 bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300">
                        <p className="text-sm mb-1 font-semibold text-purple-800">{contentData.total_amount_paid_22}</p>
                        <p className="text-3xl font-bold text-purple-700">
                          $
                          {results.totalPaid.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                        </p>
                      </div>

                      {results.payoffOrder.length > 0 && <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <h3 className="font-semibold text-yellow-800 mb-2">{contentData.payoff_order_avalanche_method_23}</h3>
                          <ol className="text-yellow-700 space-y-1">
                            {results.payoffOrder.map((debtName, index) => <li key={index}>
                                {index + 1}. {debtName}
                              </li>)}
                          </ol>
                        </div>}

                      {/* Payment Schedule */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-gray-900">{contentData.payment_schedule_24}</h3>
                          <Button onClick={downloadCSV} variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                            <Download className="w-4 h-4 mr-2" />{contentData.download_csv_25}</Button>
                        </div>

                        <div className="max-h-96 overflow-y-auto border rounded-lg">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>{contentData.month_26}</TableHead>
                                <TableHead>{contentData.debt_27}</TableHead>
                                <TableHead>{contentData.balance_28}</TableHead>
                                <TableHead>{contentData.interest_29}</TableHead>
                                <TableHead>{contentData.payment_30}</TableHead>
                                <TableHead>{contentData.remaining_31}</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {results.schedule.slice(0, 24).flatMap(entry => entry.debts.map((debt, debtIndex) => <TableRow key={`${entry.month}-${debt.id}`}>
                                    {debtIndex === 0 && <TableCell rowSpan={entry.debts.length} className="font-medium">
                                        {entry.month}
                                      </TableCell>}
                                    <TableCell className="font-medium">{debt.name}</TableCell>
                                    <TableCell>${debt.beginningBalance.toFixed(0)}</TableCell>
                                    <TableCell>${debt.interestCharged.toFixed(2)}</TableCell>
                                    <TableCell>${debt.paymentMade.toFixed(2)}</TableCell>
                                    <TableCell>${debt.endingBalance.toFixed(0)}</TableCell>
                                  </TableRow>))}
                            </TableBody>
                          </Table>
                        </div>
                        {results.schedule.length > 24 && <p className="text-sm text-gray-500 text-center">{contentData.showing_first_24_months_download_csv_for_complete__32}</p>}
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <TrendingDown className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_debt_information_to_see_your_payoff_str_33}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "Interest Calculator",
            calculatorHref: "/financial/interest-calculator",
            calculatorDescription: "Calculate and compound interest for loans and investments"
          }, {
            calculatorName: "Loan Calculator",
            calculatorHref: "/financial/loan-calculator",
            calculatorDescription: "Calculate payments and total costs for various loan types"
          }, {
            calculatorName: "Compound Interest Calculator",
            calculatorHref: "/financial/compound-interest-calculator",
            calculatorDescription: "See how compound interest grows your investments over time"
          }]} color="red" title="Related Financial Calculators" />

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* How the Debt Avalanche Works */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.how_the_debt_avalanche_works_34}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">{contentData.the_debt_avalanche_method_is_a_mathematically_opti_35}</p>
                    <ol className="space-y-3 text-gray-700">
                      <li>
                        <strong>{contentData.list_all_debts_36}</strong>{contentData.with_their_balances_minimum_payments_and_aprs_37}</li>
                      <li>
                        <strong>{contentData.make_minimum_payments_38}</strong>{contentData.on_all_debts_to_avoid_penalties_39}</li>
                      <li>
                        <strong>{contentData.apply_extra_payments_40}</strong>{contentData.to_the_debt_with_the_highest_interest_rate_first_41}</li>
                      <li>
                        <strong>{contentData.once_paid_off_42}</strong>{contentData.redirect_all_payments_to_the_next_highestrate_debt_43}</li>
                      <li>
                        <strong>{contentData.repeat_44}</strong>{contentData.until_all_debts_are_eliminated_45}</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Inputs You Provide */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.inputs_you_provide_46}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">{contentData.for_each_debt_47}</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>{contentData.current_balance_b_48}<sub>{contentData.i_49}</sub>)
                        </li>
                        <li>{contentData.minimum_monthly_payment_m_50}<sub>{contentData.i_51}</sub>)
                        </li>
                        <li>{contentData.annual_apr_r_52}<sub>{contentData.i_53}</sub>)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">{contentData.optional_extra_payments_54}</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>{contentData.extra_per_month_e_55}<sub>{contentData.monthly_56}</sub>)
                        </li>
                        <li>{contentData.extra_per_year_e_57}<sub>{contentData.annual_58}</sub>)
                        </li>
                        <li>{contentData.onetime_extra_payment_e_59}<sub>{contentData.onetime_60}</sub>)
                        </li>
                        <li>{contentData.fixed_total_amount_mode_yesno_61}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Formulas and Calculation Logic */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.formulas_and_calculation_logic_62}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_1_interest_accrual_63}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-3 rounded">{contentData.i_64}<sub>{contentData.i_65}</sub>{contentData.k_b_66}<sub>{contentData.i_67}</sub>{contentData.k1_r_68}<sub>{contentData.i_69}</sub>{contentData.k_12_70}</p>
                      <p className="text-sm text-gray-600 mt-2">{contentData.monthly_interest_previous_balance_monthly_rate_71}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_2_balance_after_interest_72}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-3 rounded">{contentData.b_73}<sub>{contentData.i_74}</sub>{contentData.k_b_75}<sub>{contentData.i_76}</sub>{contentData.k1_i_77}<sub>{contentData.i_78}</sub>{contentData.k_79}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_3_payment_application_80}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-3 rounded">{contentData.b_81}<sub>{contentData.i_82}</sub>{contentData.k_max0_b_83}<sub>{contentData.i_84}</sub>{contentData.k_p_85}<sub>{contentData.i_86}</sub>{contentData.k_87}</p>
                      <p className="text-sm text-gray-600 mt-2">{contentData.new_balance_max0_balance_after_interest_payment_88}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_4_avalanche_priority_89}</h3>
                      <p className="text-gray-700">{contentData.extra_payments_are_applied_to_debts_in_order_of_hi_90}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Calculator Guide */}
              
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="debt-payoff-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
              {/* Example Debt Payoff Schedule */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.example_debt_payoff_schedule_91}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold mb-2 text-blue-800">{contentData.example_scenario_92}</h3>
                      <ul className="text-blue-700 space-y-1">
                        <li>{contentData.credit_card_a_5000_at_1899_apr_100_minimum_93}</li>
                        <li>{contentData.credit_card_b_3000_at_2499_apr_75_minimum_94}</li>
                        <li>{contentData.extra_monthly_payment_200_95}</li>
                        <li>{contentData.fixed_total_mode_yes_96}</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold mb-2 text-green-800">{contentData.strategy_result_97}</h3>
                      <ul className="text-green-700 space-y-1">
                        <li>{contentData.pay_minimums_175_total_98}</li>
                        <li>{contentData.apply_extra_200_to_card_b_higher_apr_99}</li>
                        <li>{contentData.card_b_paid_off_first_in_11_months_100}</li>
                        <li>{contentData.reallocate_card_bs_275_payment_to_card_a_101}</li>
                        <li>{contentData.total_payoff_time_18_months_102}</li>
                        <li>{contentData.interest_saved_vs_minimum_payments_2400_103}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </main>
      </div>
    </>;
}