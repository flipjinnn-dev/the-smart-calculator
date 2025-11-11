"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Calculator, RotateCcw, TrendingUp, PiggyBank, Target } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
export default function FinanceCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('finance-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('finance-calculator', language, "calculator-guide");

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
    "tvm_variables_0": "",
    "enter_4_values_to_solve_for_1": "",
    "what_do_you_want_to_calculate_2": "",
    "present_value_pv_3": "",
    "future_value_fv_4": "",
    "payment_pmt_5": "",
    "interest_rate_iy_6": "",
    "number_of_periods_n_7": "",
    "select_the_variable_you_want_to_solve_for_then_ent_8": "",
    "present_value_pv_9": "",
    "lump_sum_at_start_negative_for_outflow_10": "",
    "future_value_fv_11": "",
    "lump_sum_at_end_12": "",
    "payment_pmt_13": "",
    "recurring_payment_negative_for_withdrawal_14": "",
    "interest_rate_iy_15": "",
    "annual_interest_rate_16": "",
    "number_of_periods_n_17": "",
    "total_compounding_periods_18": "",
    "settings_19": "",
    "payments_per_year_py_20": "",
    "k_1_annual_21": "",
    "k_2_semiannual_22": "",
    "k_4_quarterly_23": "",
    "k_12_monthly_24": "",
    "k_52_weekly_25": "",
    "k_365_daily_26": "",
    "compounds_per_year_cy_27": "",
    "k_1_annual_28": "",
    "k_2_semiannual_29": "",
    "k_4_quarterly_30": "",
    "k_12_monthly_31": "",
    "k_52_weekly_32": "",
    "k_365_daily_33": "",
    "payment_timing_34": "",
    "of_period_35": "",
    "calculate_36": "",
    "reset_37": "",
    "tvm_result_38": "",
    "total_payments_39": "",
    "total_interest_40": "",
    "select_what_to_calculate_enter_4_values_then_click_41": "",
    "tvm_calculation_results_42": "",
    "calculated_variable_43": "",
    "payment_summary_44": "",
    "total_payments_45": "",
    "payment_frequency_46": "",
    "x_per_year_47": "",
    "payment_timing_48": "",
    "of_period_49": "",
    "interest_summary_50": "",
    "total_interest_51": "",
    "compound_frequency_52": "",
    "x_per_year_53": "",
    "complete_tvm_summary_54": "",
    "final_values_55": "",
    "pv_present_value_56": "",
    "fv_future_value_57": "",
    "pmt_payment_58": "",
    "iy_interest_rate_59": "",
    "n_periods_60": "",
    "settings_used_61": "",
    "payments_per_year_62": "",
    "compounds_per_year_63": "",
    "payment_timing_64": "",
    "of_period_65": "",
    "effective_rate_per_period_66": "",
    "tvm_formula_used_67": "",
    "pv_1_iycyn_pmt_1_iycyn_1_iycy_1_iycy_fv_68": "",
    "where_69": "",
    "of_period_payments_70": "",
    "understanding_time_value_of_money_71": "",
    "tvm_variables_72": "",
    "pv_present_value_73": "",
    "current_worth_of_future_cash_flows_74": "",
    "fv_future_value_75": "",
    "value_of_investment_at_end_of_period_76": "",
    "pmt_payment_77": "",
    "regular_payment_amount_annuity_78": "",
    "iy_interest_rate_79": "",
    "annual_interest_rate_as_percentage_80": "",
    "n_periods_81": "",
    "total_number_of_compounding_periods_82": "",
    "key_concepts_83": "",
    "compounding_84": "",
    "interest_earned_on_interest_85": "",
    "regular_contributions_86": "",
    "consistent_periodic_payments_87": "",
    "time_horizon_88": "",
    "length_of_investment_period_89": "",
    "risk_vs_return_90": "",
    "higher_returns_often_mean_higher_risk_91": "",
    "example_calculation_92": "",
    "scenario_retirement_savings_93": "",
    "pv_20000_initial_investment_94": "",
    "pmt_2000_annual_contribution_95": "",
    "iy_6_annual_return_96": "",
    "n_10_years_97": "",
    "py_cy_1_annual_98": "",
    "result_fv_62317_99": "",
    "sign_conventions_100": "",
    "positive_101": "",
    "money_received_inflows_102": "",
    "negative_103": "",
    "money_paid_out_outflows_104": "",
    "pv_105": "",
    "negative_if_you_invest_money_106": "",
    "pmt_107": "",
    "negative_if_you_make_payments_108": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [calculateFor, setCalculateFor] = useState("fv"); // What to calculate: pv, fv, pmt, iy, n

  // Main TVM inputs
  const [pv, setPv] = useState("");
  const [fv, setFv] = useState("");
  const [pmt, setPmt] = useState("");
  const [iy, setIy] = useState("");
  const [n, setN] = useState("");

  // Settings
  const [py, setPy] = useState("12"); // Payments per year
  const [cy, setCy] = useState("12"); // Compounds per year
  const [paymentTiming, setPaymentTiming] = useState("end"); // beginning or end

  // Helper function for iterative solving (Newton-Raphson method)
  const solveForRate = (pv: number, fv: number, pmt: number, n: number, py: number, cy: number, delta: number): number => {
    let rate = 0.1; // Initial guess
    const tolerance = 1e-10;
    const maxIterations = 100;
    for (let i = 0; i < maxIterations; i++) {
      const r = rate / cy;
      const compoundFactor = Math.pow(1 + r, n);

      // TVM equation
      const f = pv * compoundFactor + pmt * ((compoundFactor - 1) / r) * (1 + r * delta) - fv;

      // Derivative for Newton-Raphson
      const df = pv * n * Math.pow(1 + r, n - 1) / cy + pmt * ((n * Math.pow(1 + r, n - 1) / cy * r - (compoundFactor - 1) / (r * r)) * (1 + r * delta) + (compoundFactor - 1) / r * delta / cy);
      const newRate = rate - f / df;
      if (Math.abs(newRate - rate) < tolerance) {
        return newRate * 100; // Convert to percentage
      }
      rate = newRate;
    }
    return rate * 100; // Return as percentage
  };
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    const filledCount = 0;
    const requiredInputs = ["pv", "fv", "pmt", "iy", "n"].filter(input => input !== calculateFor);
    requiredInputs.forEach(input => {
      const value = input === "pv" ? pv : input === "fv" ? fv : input === "pmt" ? pmt : input === "iy" ? iy : n;
      if (value === "" || value === null || value === undefined) {
        newErrors[input] = `${input.toUpperCase()} is required when calculating ${calculateFor.toUpperCase()}`;
      } else if (isNaN(Number(value))) {
        newErrors[input] = `${input.toUpperCase()} must be a valid number`;
      } else if (input === "iy" && Number(value) < 0) {
        newErrors[input] = "Interest rate must be positive";
      } else if (input === "n" && Number(value) <= 0) {
        newErrors[input] = "Number of periods must be positive";
      }
    });

    // Validate settings
    if (isNaN(Number(py)) || Number(py) <= 0) {
      newErrors.py = "Payments per year must be positive";
    }
    if (isNaN(Number(cy)) || Number(cy) <= 0) {
      newErrors.cy = "Compounds per year must be positive";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateTVM = () => {
    if (!validateInputs()) return;
    try {
      const pvVal = calculateFor !== "pv" ? Number(pv) : null;
      const fvVal = calculateFor !== "fv" ? Number(fv) : null;
      const pmtVal = calculateFor !== "pmt" ? Number(pmt) : null;
      const iyVal = calculateFor !== "iy" ? Number(iy) : null;
      const nVal = calculateFor !== "n" ? Number(n) : null;
      const pyVal = Number(py);
      const cyVal = Number(cy);
      const delta = paymentTiming === "beginning" ? 1 : 0;
      let calculatedValue: number;
      let calculatedVariable: string;

      // Calculate on selected variable
      if (calculateFor === "pv") {
        calculatedVariable = "PV";
        const r = iyVal! / cyVal;
        const compoundFactor = Math.pow(1 + r, nVal!);
        const annuityFactor = (compoundFactor - 1) / r * (1 + r * delta);
        calculatedValue = (fvVal! - pmtVal! * annuityFactor) / compoundFactor;
      } else if (calculateFor === "fv") {
        calculatedVariable = "FV";
        const r = iyVal! / cyVal;
        const compoundFactor = Math.pow(1 + r, nVal!);
        const annuityFactor = (compoundFactor - 1) / r * (1 + r * delta);
        calculatedValue = pvVal! * compoundFactor + pmtVal! * annuityFactor;
      } else if (calculateFor === "pmt") {
        calculatedVariable = "PMT";
        const r = iyVal! / cyVal;
        const compoundFactor = Math.pow(1 + r, nVal!);
        const annuityFactor = (compoundFactor - 1) / r * (1 + r * delta);
        calculatedValue = (fvVal! - pvVal! * compoundFactor) / annuityFactor;
      } else if (calculateFor === "iy") {
        calculatedVariable = "I/Y";
        calculatedValue = solveForRate(pvVal!, fvVal!, pmtVal!, nVal!, pyVal, cyVal, delta);
      } else if (calculateFor === "n") {
        calculatedVariable = "N";
        const r = iyVal! / cyVal;
        const adjustedPmt = pmtVal! * (1 + r * delta);
        if (Math.abs(adjustedPmt + pvVal! * r) < 1e-10) {
          throw new Error("Cannot solve for N with these values");
        }
        calculatedValue = Math.log((fvVal! * r + adjustedPmt) / (pvVal! * r + adjustedPmt)) / Math.log(1 + r);
      } else {
        throw new Error("Invalid calculation type");
      }

      // Calculate metrics
      const finalPv = pvVal || calculatedValue;
      const finalFv = fvVal || calculatedValue;
      const finalPmt = pmtVal || calculatedValue;
      const finalN = nVal || calculatedValue;
      const totalPayments = finalPmt * finalN;
      const totalInterest = finalFv - finalPv - totalPayments;
      setResult({
        calculatedVariable,
        calculatedValue,
        inputs: {
          pv: pvVal,
          fv: fvVal,
          pmt: pmtVal,
          iy: iyVal,
          n: nVal,
          py: pyVal,
          cy: cyVal,
          paymentTiming
        },
        results: {
          totalPayments,
          totalInterest,
          finalPv,
          finalFv,
          finalPmt: finalPmt,
          finalN,
          finalIy: iyVal || calculatedValue
        }
      });
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating TVM. Please check your inputs and try again."
      });
    }
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  const resetCalculator = () => {
    setPv("");
    setFv("");
    setPmt("");
    setIy("");
    setN("");
    setPy("12");
    setCy("12");
    setPaymentTiming("end");
    setCalculateFor("fv");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-emerald-600" />
                      <span>{contentData.tvm_variables_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_4_values_to_solve_for_1}{calculateFor.toUpperCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="mb-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center justify-center space-x-6">
                        <div className="flex items-center space-x-3">
                          <Calculator className="w-5 h-5 text-emerald-600" />
                          <span className="text-lg font-semibold text-gray-700">{contentData.what_do_you_want_to_calculate_2}</span>
                        </div>
                        <Select value={calculateFor} onValueChange={setCalculateFor}>
                          <SelectTrigger className="w-48 h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pv">{contentData.present_value_pv_3}</SelectItem>
                            <SelectItem value="fv">{contentData.future_value_fv_4}</SelectItem>
                            <SelectItem value="pmt">{contentData.payment_pmt_5}</SelectItem>
                            <SelectItem value="iy">{contentData.interest_rate_iy_6}</SelectItem>
                            <SelectItem value="n">{contentData.number_of_periods_n_7}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-center text-sm text-gray-500 mt-3">{contentData.select_the_variable_you_want_to_solve_for_then_ent_8}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* PV Input - hide if calculating PV */}
                      {calculateFor !== "pv" && <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.present_value_pv_9}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign className="h-5 w-5 text-emerald-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.pv ? "border-red-300" : ""}`} type="text" placeholder="20000" value={pv} onChange={e => setPv(e.target.value)} />
                          </div>
                          {errors.pv && <p className="text-red-600 text-xs mt-1">{errors.pv}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.lump_sum_at_start_negative_for_outflow_10}</p>
                        </div>}

                      {/* FV Input - hide if calculating FV */}
                      {calculateFor !== "fv" && <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.future_value_fv_11}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <TrendingUp className="h-5 w-5 text-emerald-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.fv ? "border-red-300" : ""}`} type="text" placeholder="100000" value={fv} onChange={e => setFv(e.target.value)} />
                          </div>
                          {errors.fv && <p className="text-red-600 text-xs mt-1">{errors.fv}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.lump_sum_at_end_12}</p>
                        </div>}

                      {/* PMT Input - hide if calculating PMT */}
                      {calculateFor !== "pmt" && <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.payment_pmt_13}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <PiggyBank className="h-5 w-5 text-emerald-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.pmt ? "border-red-300" : ""}`} type="text" placeholder="-2000" value={pmt} onChange={e => setPmt(e.target.value)} />
                          </div>
                          {errors.pmt && <p className="text-red-600 text-xs mt-1">{errors.pmt}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.recurring_payment_negative_for_withdrawal_14}</p>
                        </div>}

                      {/* I/Y Input - hide if calculating I/Y */}
                      {calculateFor !== "iy" && <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.interest_rate_iy_15}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Target className="h-5 w-5 text-emerald-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.iy ? "border-red-300" : ""}`} type="text" placeholder="6" value={iy} onChange={e => setIy(e.target.value)} />
                          </div>
                          {errors.iy && <p className="text-red-600 text-xs mt-1">{errors.iy}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.annual_interest_rate_16}</p>
                        </div>}

                      {/* N Input - hide if calculating N */}
                      {calculateFor !== "n" && <div className={calculateFor === "pv" || calculateFor === "fv" ? "md:col-span-2" : ""}>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.number_of_periods_n_17}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calculator className="h-5 w-5 text-emerald-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.n ? "border-red-300" : ""}`} type="text" placeholder="10" value={n} onChange={e => setN(e.target.value)} />
                          </div>
                          {errors.n && <p className="text-red-600 text-xs mt-1">{errors.n}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.total_compounding_periods_18}</p>
                        </div>}
                    </div>

                    {/* Settings */}
                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">{contentData.settings_19}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.payments_per_year_py_20}</Label>
                          <Select value={py} onValueChange={setPy}>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">{contentData.k_1_annual_21}</SelectItem>
                              <SelectItem value="2">{contentData.k_2_semiannual_22}</SelectItem>
                              <SelectItem value="4">{contentData.k_4_quarterly_23}</SelectItem>
                              <SelectItem value="12">{contentData.k_12_monthly_24}</SelectItem>
                              <SelectItem value="52">{contentData.k_52_weekly_25}</SelectItem>
                              <SelectItem value="365">{contentData.k_365_daily_26}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.compounds_per_year_cy_27}</Label>
                          <Select value={cy} onValueChange={setCy}>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">{contentData.k_1_annual_28}</SelectItem>
                              <SelectItem value="2">{contentData.k_2_semiannual_29}</SelectItem>
                              <SelectItem value="4">{contentData.k_4_quarterly_30}</SelectItem>
                              <SelectItem value="12">{contentData.k_12_monthly_31}</SelectItem>
                              <SelectItem value="52">{contentData.k_52_weekly_32}</SelectItem>
                              <SelectItem value="365">{contentData.k_365_daily_33}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.payment_timing_34}</Label>
                          <div className="flex items-center space-x-4 h-12">
                            <div className="flex items-center space-x-2">
                              <Switch checked={paymentTiming === "beginning"} onCheckedChange={checked => setPaymentTiming(checked ? "beginning" : "end")} />
                              <span className="text-sm text-gray-700">
                                {paymentTiming === "beginning" ? "Beginning" : "End"}{contentData.of_period_35}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateTVM} className="flex-1 h-12 text-lg bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800">{contentData.calculate_36}{calculateFor.toUpperCase()}
                      </Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_37}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-emerald-50 to-green-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 flex items-center justify-center mb-3 shadow-lg">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-emerald-700 tracking-tight">{contentData.tvm_result_38}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-emerald-200">
                          <p className="text-lg font-bold text-emerald-900">
                            {result.calculatedVariable === "I/Y" ? "" : "$"}
                            {Math.abs(result.calculatedValue).toLocaleString(undefined, {
                          minimumFractionDigits: result.calculatedVariable === "I/Y" ? 4 : 2,
                          maximumFractionDigits: result.calculatedVariable === "I/Y" ? 4 : 2
                        })}
                            {result.calculatedVariable === "I/Y" ? "%" : ""}
                          </p>
                          <p className="text-gray-600 text-sm">{result.calculatedVariable}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-emerald-200">
                          <p className="text-lg font-bold text-emerald-900">
                            $
                            {Math.abs(result.results.totalPayments).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </p>
                          <p className="text-gray-600 text-sm">{contentData.total_payments_39}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-emerald-200">
                          <p className="text-lg font-bold text-emerald-900">
                            $
                            {result.results.totalInterest.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </p>
                          <p className="text-gray-600 text-sm">{contentData.total_interest_40}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <DollarSign className="w-8 h-8 text-emerald-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.select_what_to_calculate_enter_4_values_then_click_41}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-emerald-600" />
                      <span>{contentData.tvm_calculation_results_42}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Summary Results */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <h3 className="text-lg font-semibold text-emerald-700 mb-3">{contentData.calculated_variable_43}</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>{result.calculatedVariable}:</strong>{" "}
                            {result.calculatedVariable === "I/Y" ? "" : "$"}
                            {Math.abs(result.calculatedValue).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: result.calculatedVariable === "I/Y" ? 4 : 2
                        })}
                            {result.calculatedVariable === "I/Y" ? "%" : ""}
                            {result.calculatedVariable === "N" ? " periods" : ""}
                          </p>
                          <p className="text-xs text-gray-500">
                            {result.calculatedVariable === "PV" && "Present value of investment" || result.calculatedVariable === "FV" && "Future value of investment" || result.calculatedVariable === "PMT" && "Required payment amount" || result.calculatedVariable === "I/Y" && "Annual interest rate" || result.calculatedVariable === "N" && "Number of compounding periods"}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.payment_summary_44}</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>{contentData.total_payments_45}</strong> $
                            {Math.abs(result.results.totalPayments).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </p>
                          <p>
                            <strong>{contentData.payment_frequency_46}</strong> {result.inputs.py}{contentData.x_per_year_47}</p>
                          <p>
                            <strong>{contentData.payment_timing_48}</strong>{" "}
                            {result.inputs.paymentTiming === "beginning" ? "Beginning" : "End"}{contentData.of_period_49}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <h3 className="text-lg font-semibold text-emerald-700 mb-3">{contentData.interest_summary_50}</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>{contentData.total_interest_51}</strong> $
                            {result.results.totalInterest.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </p>
                          <p>
                            <strong>{contentData.compound_frequency_52}</strong> {result.inputs.cy}{contentData.x_per_year_53}</p>
                          <p className="text-xs text-gray-500">
                            {result.results.totalInterest >= 0 ? "Interest earned" : "Interest paid"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* All Variables Summary */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-emerald-700 mb-6">{contentData.complete_tvm_summary_54}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-700 mb-3">{contentData.final_values_55}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.pv_present_value_56}</strong> $
                              {result.results.finalPv?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) || "N/A"}
                            </p>
                            <p>
                              <strong>{contentData.fv_future_value_57}</strong> $
                              {result.results.finalFv?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) || "N/A"}
                            </p>
                            <p>
                              <strong>{contentData.pmt_payment_58}</strong> $
                              {result.results.finalPmt?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) || "N/A"}
                            </p>
                            <p>
                              <strong>{contentData.iy_interest_rate_59}</strong> {result.results.finalIy?.toFixed(4) || "N/A"}%
                            </p>
                            <p>
                              <strong>{contentData.n_periods_60}</strong> {result.results.finalN?.toFixed(2) || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                          <h4 className="font-semibold text-emerald-700 mb-3">{contentData.settings_used_61}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.payments_per_year_62}</strong> {result.inputs.py}
                            </p>
                            <p>
                              <strong>{contentData.compounds_per_year_63}</strong> {result.inputs.cy}
                            </p>
                            <p>
                              <strong>{contentData.payment_timing_64}</strong>{" "}
                              {result.inputs.paymentTiming === "beginning" ? "Beginning" : "End"}{contentData.of_period_65}</p>
                            <p>
                              <strong>{contentData.effective_rate_per_period_66}</strong>{" "}
                              {((result.results.finalIy || 0) / result.inputs.cy).toFixed(6)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TVM Formula */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                      <h4 className="font-semibold text-emerald-700 mb-2">{contentData.tvm_formula_used_67}</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p className="font-mono text-xs bg-white p-2 rounded border">{contentData.pv_1_iycyn_pmt_1_iycyn_1_iycy_1_iycy_fv_68}</p>
                        <p className="text-xs">{contentData.where_69}{result.inputs.paymentTiming === "beginning" ? "1" : "0"} (
                          {result.inputs.paymentTiming}{contentData.of_period_payments_70}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "Investment Calculator",
            calculatorHref: "/financial/investment-calculator",
            calculatorDescription: "Calculate on investments and compare different investment scenarios"
          }, {
            calculatorName: "Estate Tax Calculator",
            calculatorHref: "/financial/estate-tax-calculator",
            calculatorDescription: "Estimate estate taxes and plan for wealth transfer strategies"
          }, {
            calculatorName: "Credit Card Payoff Calculator",
            calculatorHref: "/financial/credit-card-payoff-calculator",
            calculatorDescription: "Calculate and interest to pay off credit card debt"
          }]} color="green" title="Related Financial Calculators" />

            {/* Educational Content */} 
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-emerald-50 to-green-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 flex items-center justify-center mr-3 shadow-lg">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-emerald-700 tracking-tight">{contentData.understanding_time_value_of_money_71}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">{contentData.tvm_variables_72}</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.pv_present_value_73}</strong>{contentData.current_worth_of_future_cash_flows_74}</li>
                          <li>
                            <strong>{contentData.fv_future_value_75}</strong>{contentData.value_of_investment_at_end_of_period_76}</li>
                          <li>
                            <strong>{contentData.pmt_payment_77}</strong>{contentData.regular_payment_amount_annuity_78}</li>
                          <li>
                            <strong>{contentData.iy_interest_rate_79}</strong>{contentData.annual_interest_rate_as_percentage_80}</li>
                          <li>
                            <strong>{contentData.n_periods_81}</strong>{contentData.total_number_of_compounding_periods_82}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">{contentData.key_concepts_83}</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.compounding_84}</strong>{contentData.interest_earned_on_interest_85}</li>
                          <li>
                            <strong>{contentData.regular_contributions_86}</strong>{contentData.consistent_periodic_payments_87}</li>
                          <li>
                            <strong>{contentData.time_horizon_88}</strong>{contentData.length_of_investment_period_89}</li>
                          <li>
                            <strong>{contentData.risk_vs_return_90}</strong>{contentData.higher_returns_often_mean_higher_risk_91}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">{contentData.example_calculation_92}</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.scenario_retirement_savings_93}</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>{contentData.pv_20000_initial_investment_94}</p>
                          <p>{contentData.pmt_2000_annual_contribution_95}</p>
                          <p>{contentData.iy_6_annual_return_96}</p>
                          <p>{contentData.n_10_years_97}</p>
                          <p>{contentData.py_cy_1_annual_98}</p>
                          <p>
                            <strong>{contentData.result_fv_62317_99}</strong>
                          </p>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">{contentData.sign_conventions_100}</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.positive_101}</strong>{contentData.money_received_inflows_102}</li>
                          <li>
                            <strong>{contentData.negative_103}</strong>{contentData.money_paid_out_outflows_104}</li>
                          <li>
                            <strong>{contentData.pv_105}</strong>{contentData.negative_if_you_invest_money_106}</li>
                          <li>
                            <strong>{contentData.pmt_107}</strong>{contentData.negative_if_you_make_payments_108}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mt-8">
            <CalculatorGuide data={guideData} />
          </div>
          
        </main>
      </div>
    </>;
}