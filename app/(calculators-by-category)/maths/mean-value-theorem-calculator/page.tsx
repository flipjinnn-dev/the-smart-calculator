"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CalculatorGuide from "@/components/calculator-guide";
import { Calculator, FenceIcon, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";

// mathematical expression evaluator using safer Function constructor
const evaluateFunction = (expression: string, x: number): number => {
  try {
    const safeExpr = expression.replace(/x/g, `(${x})`).replace(/\^/g, '**').replace(/([a-z]+)/gi, (m, p1) => {
      const lower = p1.toLowerCase();
      if (lower === 'log') return 'Math.log10';
      if (lower === 'ln') return 'Math.log';
      return `Math.${lower}`;
    }).replace(/pi/g, 'Math.PI').replace(/e/g, 'Math.E');
    const func = Function(`return ${safeExpr};`);
    const result = func();
    return isFinite(result) ? result : Number.NaN;
  } catch (error) {
    throw new Error(`Invalid function at x = ${x}`);
  }
};

// Numerical differentiation for fallback
const calculateDerivative = (expression: string, x: number, h = 1e-5): number => {
  try {
    const f_x_plus_h = evaluateFunction(expression, x + h);
    const f_x_minus_h = evaluateFunction(expression, x - h);
    if (!isFinite(f_x_plus_h) || !isFinite(f_x_minus_h)) {
      throw new Error("Function not differentiable at this point");
    }
    return (f_x_plus_h - f_x_minus_h) / (2 * h);
  } catch (error) {
    throw new Error("Cannot compute derivative");
  }
};

// Improved symbolic derivative for polynomials and basic functions
const getSymbolicDerivative = (expression: string): string => {
  let expr = expression.trim().replace(/\s+/g, '').replace(/\^/g, '**');

  // Handle basic non-polynomial functions
  const lowerExpr = expr.toLowerCase();
  if (lowerExpr === 'sin(x)') return 'cos(x)';
  if (lowerExpr === 'cos(x)') return '-sin(x)';
  if (lowerExpr === 'tan(x)') return '1/(cos(x)**2)';
  if (lowerExpr === 'exp(x)') return 'exp(x)';
  if (lowerExpr === 'ln(x)') return '1/x';
  if (lowerExpr === 'log(x)') return '1/(x*ln(10))'; // log10
  if (lowerExpr.startsWith('sqrt(x**2+') || lowerExpr.startsWith('sqrt(x**2 +')) {
    const constantMatch = lowerExpr.match(/sqrt\(x\*\*2\s*\+\s*([\d.]+)\)/);
    if (constantMatch) {
      const constant = constantMatch[1];
      return `x/sqrt(x**2+${constant})`;
    }
  }

  // Assume polynomial, parse terms
  if (!expr.startsWith('+') && !expr.startsWith('-')) expr = '+' + expr;
  const termList: string[] = [];
  let current = '';
  for (let i = 0; i < expr.length; i++) {
    if ((expr[i] === '+' || expr[i] === '-') && i > 0 && expr[i - 1] !== '*') {
      termList.push(current);
      current = expr[i];
    } else {
      current += expr[i];
    }
  }
  if (current) termList.push(current);
  const derivTerms: string[] = [];
  for (let term of termList) {
    let sign = term[0];
    let rest = term.slice(1);
    if (sign !== '+' && sign !== '-') {
      rest = term;
      sign = '+';
    }
    if (!rest.includes('x')) continue; // constant term

    let coeff = '1';
    let power = '1';
    if (rest === 'x') {
      // ok
    } else if (rest.includes('**')) {
      const parts = rest.split('**');
      power = parts[1];
      const left = parts[0];
      if (left === 'x') {
        coeff = '1';
      } else if (left.endsWith('*x')) {
        coeff = left.slice(0, -2);
      } else {
        return "f'(x)"; // fallback
      }
    } else if (rest.endsWith('x')) {
      coeff = rest.slice(0, -1) || '1';
    } else {
      return "f'(x)"; // fallback
    }
    let coeffNum = parseFloat(coeff);
    let powerNum = parseFloat(power);
    if (sign === '-') coeffNum = -coeffNum;
    if (powerNum === 0) continue;
    const newCoeff = coeffNum * powerNum;
    const newPower = powerNum - 1;
    let newSign = newCoeff > 0 ? '+' : '-';
    let absCoeff = Math.abs(newCoeff);
    let newCoeffStr = absCoeff === 1 && newPower !== 0 ? '' : absCoeff.toString();
    let newTerm = newSign + newCoeffStr;
    if (newPower > 0) {
      if (newCoeffStr && newPower !== 0) newTerm += '*';
      newTerm += 'x';
      if (newPower !== 1) newTerm += '**' + newPower;
    }
    derivTerms.push(newTerm);
  }
  let deriv = derivTerms.join('');
  if (deriv.startsWith('+')) deriv = deriv.slice(1);
  if (!deriv) deriv = '0';
  return deriv;
};

// Numerical root finder for f(c) = target
const findRoots = (derivFunc: (x: number) => number, a: number, b: number, target: number): number[] => {
  const f = (x: number) => derivFunc(x) - target;
  const solutions: number[] = [];
  const numIntervals = 50; // Increased for better detection
  const dx = (b - a) / numIntervals;
  let prev = f(a + 1e-6);
  for (let i = 1; i <= numIntervals; i++) {
    const x = a + i * dx;
    const curr = f(x);
    if (curr * prev <= 0) {
      // Sign change
      let low = x - dx;
      let high = x;
      for (let j = 0; j < 60; j++) {
        // More iterations for precision
        const mid = (low + high) / 2;
        const val = f(mid);
        if (Math.abs(val) < 1e-8) {
          solutions.push(Number(mid.toFixed(8)));
          break;
        }
        if (val * f(low) <= 0) {
          high = mid;
        } else {
          low = mid;
        }
      }
    }
    prev = curr;
  }

  // Remove duplicates
  return solutions.filter((v, i, arr) => arr.findIndex(t => Math.abs(t - v) < 1e-4) === i).sort();
};
const solveForC = (functionExpr: string, symbolicDerivative: string, targetSlope: number, a: number, b: number): number[] => {
  // Handle constant derivative
  const constVal = parseFloat(symbolicDerivative);
  if (!isNaN(constVal)) {
    if (Math.abs(constVal - targetSlope) < 1e-8) {
      return [Number(((a + b) / 2).toFixed(8))];
    }
    return [];
  }
  let derivFunc: (x: number) => number;
  if (symbolicDerivative.includes("f'")) {
    derivFunc = (x: number) => calculateDerivative(functionExpr, x);
  } else {
    derivFunc = (x: number) => evaluateFunction(symbolicDerivative, x);
  }
  return findRoots(derivFunc, a, b, targetSlope);
};
export default function MeanValueTheoremCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('mean-value-theorem-calculator', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'mean-value-theorem-calculator',
    language,
    "calculator-guide"
  )
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  }

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
    "mean_value_theorem_calculator_0": "",
    "enter_your_function_and_interval_to_find_the_point_1": "",
    "function_fx_2": "",
    "use_x_as_variable_for_powers_3": "",
    "supported_sin_cos_tan_sqrt_log_ln_exp_abs_pi_e_4": "",
    "interval_start_a_5": "",
    "interval_end_b_6": "",
    "mean_value_theorem_formula_7": "",
    "where_a_c_b_8": "",
    "calculate_point_9": "",
    "try_example_10": "",
    "result_11": "",
    "mvt_points_c_12": "",
    "c_13": "",
    "no_solution_found_in_interval_14": "",
    "aroc_15": "",
    "f_16": "",
    "f_17": "",
    "enter_function_and_interval_then_click_18": "",
    "calculate_19": "",
    "to_see_result_20": "",
    "result_21": "",
    "mvt_points_c_22": "",
    "c_23": "",
    "no_solution_found_in_interval_24": "",
    "aroc_25": "",
    "f_26": "",
    "f_27": "",
    "enter_function_and_interval_then_click_28": "",
    "calculate_29": "",
    "to_see_result_30": "",
    "stepbystep_solution_31": "",
    "k_1_given_information_32": "",
    "function_fx_33": "",
    "interval_34": "",
    "k_2_compute_fa_and_fb_35": "",
    "f_36": "",
    "f_37": "",
    "k_3_compute_average_rate_of_change_aroc_38": "",
    "aroc_fb_fa_b_a_39": "",
    "aroc_40": "",
    "aroc_41": "",
    "k_4_find_derivative_fx_42": "",
    "fx_43": "",
    "k_5_solve_fc_aroc_44": "",
    "equation_45": "",
    "solving_the_equation_algebraically_or_numerically__46": "",
    "k_6_verify_that_c_lies_in_the_interval_a_b_47": "",
    "solutions_48": "",
    "c_49": "",
    "the_mean_value_theorem_is_satisfied_50": "",
    "no_solution_found_in_the_open_interval_51": "",
    "the_function_may_not_satisfy_the_mvt_conditions_co_52": "",
    "what_is_the_mean_value_theorem_53": "",
    "the_mean_value_theorem_mvt_is_a_key_result_in_diff_54": "",
    "geometrically_this_means_there_is_at_least_one_poi_55": "",
    "mean_value_theorem_formula_56": "",
    "mean_value_theorem_formula_57": "",
    "where_a_c_b_58": "",
    "stepbystep_logic_59": "",
    "verify_the_function_is_continuous_on_a_b_and_diffe_60": "",
    "find_the_derivative_fx_61": "",
    "conditions_for_mvt_62": "",
    "fx_must_be_continuous_on_the_closed_interval_ab_63": "",
    "fx_must_be_differentiable_on_the_open_interval_ab_64": "",
    "the_theorem_guarantees_at_least_one_such_c_but_the_65": "",
    "how_to_use_this_calculator_66": "",
    "enter_your_function_fx_using_standard_mathematical_67": "",
    "specify_the_interval_endpoints_a_and_b_with_a_b_68": "",
    "click_calculate_point_to_find_the_values_of_c_69": "",
    "review_the_stepbystep_solution_showing_all_calcula_70": "",
    "verify_that_each_c_lies_in_the_open_interval_a_b_71": "",
    "examples_72": "",
    "example_1_fx_x_1_3_73": "",
    "stepbystep_solution_74": "",
    "f1_1_f3_9_75": "",
    "aroc_9131_4_76": "",
    "fx_2x_77": "",
    "solve_2c_4_c_2_78": "",
    "verify_2_13_79": "",
    "example_2_fx_x_0_2_80": "",
    "stepbystep_solution_81": "",
    "f0_0_f2_8_82": "",
    "aroc_8020_4_83": "",
    "fx_3x_84": "",
    "solve_3c_4_c_43_c_43_1154_only_positive_in_interva_85": "",
    "verify_1154_02_86": "",
    "example_3_fx_4x_6x_2_4_2_corrected_calculation_87": "",
    "stepbystep_solution_88": "",
    "f4_230_f2_22_89": "",
    "aroc_22_2302_4_2526_42_90": "",
    "fx_12x_6_91": "",
    "solve_12c_6_42_12c_48_c_4_c_2_92": "",
    "verify_2_and_2_42_2_2_2_is_endpoint_but_open_inter_93": "",
    "faqs_94": "",
    "what_is_the_mean_value_theorem_in_simple_words_95": "",
    "the_mean_value_theorem_states_that_for_any_smooth__96": "",
    "how_does_this_calculator_work_97": "",
    "the_calculator_evaluates_your_function_at_the_endp_98": "",
    "what_are_the_conditions_for_applying_the_mean_valu_99": "",
    "the_function_must_be_1_continuous_on_the_closed_in_100": "",
    "can_there_be_more_than_one_value_of_c_101": "",
    "yes_the_mean_value_theorem_guarantees_at_least_one_102": "",
    "what_is_the_difference_between_mean_value_theorem__103": "",
    "the_standard_mvt_relates_to_derivatives_and_rates__104": ""
  };
  const [functionExpression, setFunctionExpression] = useState("(x**2+4)**(1/2)");
  const [intervalA, setIntervalA] = useState(1);
  const [intervalB, setIntervalB] = useState(3);
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const [showSteps, setShowSteps] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const calculateMVT = () => {
    setError("");
    if (intervalB <= intervalA) {
      setError("Upper limit (b) must be greater than lower limit (a).");
      return;
    }
    if (!functionExpression.trim()) {
      setError("Please enter a function.");
      return;
    }
    try {
      const a = intervalA;
      const b = intervalB;
      const f_a = evaluateFunction(functionExpression, a);
      const f_b = evaluateFunction(functionExpression, b);
      if (!isFinite(f_a)) {
        setError(`Function is undefined at x = ${a}`);
        return;
      }
      if (!isFinite(f_b)) {
        setError(`Function is undefined at x = ${b}`);
        return;
      }
      const aroc = (f_b - f_a) / (b - a);
      const symbolicDerivative = getSymbolicDerivative(functionExpression);
      const cValues = solveForC(functionExpression, symbolicDerivative, aroc, a, b);
      setResult({
        functionExpression,
        intervalA: a,
        intervalB: b,
        f_a,
        f_b,
        aroc,
        symbolicDerivative,
        cValues,
        equation: `f'(c) = ${aroc.toFixed(6)}`,
        mvtSatisfied: cValues.length > 0
      });
      setShowResult(true);
      scrollToRef(resultRef as React.RefObject<HTMLElement>);
    } catch (err: any) {
      setError(`Calculation error: ${err.message}`);
    }
  };
  const runExample = () => {
    setFunctionExpression("x**2");
    setIntervalA(1);
    setIntervalB(3);
    setTimeout(() => calculateMVT(), 100);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FenceIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form (left) */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <FenceIcon className="w-6 h-6 text-green-600" />
                    <span>{contentData.mean_value_theorem_calculator_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_your_function_and_interval_to_find_the_point_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {error && <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>}

                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.function_fx_2}<span className="text-gray-500">{contentData.use_x_as_variable_for_powers_3}</span>
                      </Label>
                      <Input className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm font-mono" type="text" value={functionExpression} onChange={e => setFunctionExpression(e.target.value)} placeholder="e.g., x**2, sin(x), x**3 + 2*x" />
                      <p className="text-xs text-gray-500 mt-1">{contentData.supported_sin_cos_tan_sqrt_log_ln_exp_abs_pi_e_4}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.interval_start_a_5}</Label>
                        <Input className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" type="number" step="any" value={intervalA} onChange={e => setIntervalA(Number(e.target.value))} />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.interval_end_b_6}</Label>
                        <Input className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" type="number" step="any" value={intervalB} onChange={e => setIntervalB(Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-700">
                        <strong>{contentData.mean_value_theorem_formula_7}</strong>
                        <br />
                        <span className="text-lg font-mono text-center block my-2">{`f'(c) = \frac{f(b) - f(a)}{b - a}`}</span>
                        <span className="text-lg font-mono text-center block my-2">{contentData.where_a_c_b_8}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button onClick={calculateMVT} className="flex-1 h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">{contentData.calculate_point_9}</Button>
                    <Button onClick={runExample} variant="outline" className="h-12 px-6 border-green-200 text-green-700 hover:bg-green-50 bg-transparent">{contentData.try_example_10}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Result Card */}
            <div className="lg:hidden" ref={resultRef}>
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-blue-100 p-6 mb-6">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-3 shadow-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.result_11}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center w-full">
                    <p className="text-lg text-gray-600 mb-2 font-medium">{contentData.mvt_points_c_12}</p>
                    {result.cValues.length > 0 ? <div className="space-y-2">
                      {result.cValues.map((c: number, index: number) => <p key={index} className="text-3xl font-extrabold text-green-900 drop-shadow-lg">{contentData.c_13}{c}
                      </p>)}
                    </div> : <p className="text-lg text-red-600 font-semibold">{contentData.no_solution_found_in_interval_14}</p>}
                    <div className="text-sm text-gray-600 space-y-1 mt-4">
                      <p>{contentData.aroc_15}{result.aroc.toFixed(6)}</p>
                      <p>{contentData.f_16}{result.intervalA}) = {result.f_a.toFixed(6)}
                      </p>
                      <p>{contentData.f_17}{result.intervalB}) = {result.f_b.toFixed(6)}
                      </p>
                    </div>
                    <Button onClick={() => setShowSteps(!showSteps)} variant="outline" size="sm" className="mt-4 border-green-200 text-green-700 hover:bg-green-50">
                      {showSteps ? "Hide Steps" : "Show Steps"}
                    </Button>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <FenceIcon className="w-8 h-8 text-green-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_function_and_interval_then_click_18}{" "}
                      <span className="font-semibold text-green-600">{contentData.calculate_19}</span>{contentData.to_see_result_20}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>

            {/* Desktop Result Card (right side) */}
            <div className="hidden lg:block">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-blue-100 h-full flex flex-col justify-center items-center p-8 sticky top-24">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-3 shadow-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.result_21}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center w-full">
                    <p className="text-lg text-gray-600 mb-2 font-medium">{contentData.mvt_points_c_22}</p>
                    {result.cValues.length > 0 ? <div className="space-y-2">
                      {result.cValues.map((c: number, index: number) => <p key={index} className="text-3xl font-extrabold text-green-900 drop-shadow-lg">{contentData.c_23}{c}
                      </p>)}
                    </div> : <p className="text-lg text-red-600 font-semibold">{contentData.no_solution_found_in_interval_24}</p>}
                    <div className="text-sm text-gray-600 space-y-1 mt-4">
                      <p>{contentData.aroc_25}{result.aroc.toFixed(6)}</p>
                      <p>{contentData.f_26}{result.intervalA}) = {result.f_a.toFixed(6)}
                      </p>
                      <p>{contentData.f_27}{result.intervalB}) = {result.f_b.toFixed(6)}
                      </p>
                    </div>
                    <Button onClick={() => setShowSteps(!showSteps)} variant="outline" size="sm" className="mt-4 border-green-200 text-green-700 hover:bg-green-50">
                      {showSteps ? "Hide Steps" : "Show Steps"}
                    </Button>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <FenceIcon className="w-8 h-8 text-green-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_function_and_interval_then_click_28}{" "}
                      <span className="font-semibold text-green-600">{contentData.calculate_29}</span>{contentData.to_see_result_30}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Step-by-step breakdown */}
          {showResult && result && showSteps && <div className="mt-8">
            <Card className="shadow-xl border-0 p-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b px-8 py-6">
                <CardTitle className="text-xl font-bold text-green-700">{contentData.stepbystep_solution_31}</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.k_1_given_information_32}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>{contentData.function_fx_33}{result.functionExpression}</p>
                      <p>{contentData.interval_34}{result.intervalA}, {result.intervalB}]
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.k_2_compute_fa_and_fb_35}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>{contentData.f_36}{result.intervalA}) = {result.f_a.toFixed(6)}
                      </p>
                      <p>{contentData.f_37}{result.intervalB}) = {result.f_b.toFixed(6)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.k_3_compute_average_rate_of_change_aroc_38}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>{contentData.aroc_fb_fa_b_a_39}</p>
                      <p>{contentData.aroc_40}{result.f_b.toFixed(6)} - {result.f_a.toFixed(6)}) / ({result.intervalB} - {result.intervalA})
                      </p>
                      <p>{contentData.aroc_41}{result.aroc.toFixed(6)}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.k_4_find_derivative_fx_42}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>{contentData.fx_43}{result.symbolicDerivative}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.k_5_solve_fc_aroc_44}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>{contentData.equation_45}{result.symbolicDerivative} = {result.aroc.toFixed(6)}
                      </p>
                      <p className="mt-2">{contentData.solving_the_equation_algebraically_or_numerically__46}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.k_6_verify_that_c_lies_in_the_interval_a_b_47}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {result.cValues.length > 0 ? <div>
                        <p className="mb-2">{contentData.solutions_48}</p>
                        {result.cValues.map((c: number, index: number) => <p key={index} className="font-semibold text-green-700">{contentData.c_49}{c} ∈ ({result.intervalA}, {result.intervalB}) ✅
                        </p>)}
                        <p className="mt-2 text-green-700">
                          <strong>{contentData.the_mean_value_theorem_is_satisfied_50}</strong>
                        </p>
                      </div> : <p className="text-red-600">{contentData.no_solution_found_in_the_open_interval_51}{result.intervalA}, {result.intervalB}{contentData.the_function_may_not_satisfy_the_mvt_conditions_co_52}</p>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Percentage Calculator",
            calculatorHref: "/maths/percentage-calculator",
            calculatorDescription: "Calculate percentages, ratios, and percentage changes easily with our comprehensive percentage calculator"
          }, {
            calculatorName: "Volume Calculator",
            calculatorHref: "/maths/volume-calculator",
            calculatorDescription: "Calculate car loan payments and total cost"
          },
          ]}
            color="green"
            title="Related Math Calculators" />
          {/* Educational Content */}
          <div className="mt-12 space-y-8">
            {/* What is the Mean Value Theorem */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.what_is_the_mean_value_theorem_53}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-gray-700 leading-relaxed mb-4">{contentData.the_mean_value_theorem_mvt_is_a_key_result_in_diff_54}</p>
                <p className="text-gray-700 leading-relaxed">{contentData.geometrically_this_means_there_is_at_least_one_poi_55}</p>
              </CardContent>
            </Card>

            {/* Mean Value Theorem Formula */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.mean_value_theorem_formula_56}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
                  <h4 className="font-semibold mb-4">{contentData.mean_value_theorem_formula_57}</h4>
                  <span className="text-lg font-mono text-center mb-4">{`f'(c) = \frac{f(b) - f(a)}{b - a}`}</span>
                  <p className="text-lg font-mono text-center mb-4">{contentData.where_a_c_b_58}</p>

                  <h4 className="font-semibold mb-4 mt-6">{contentData.stepbystep_logic_59}</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>{contentData.verify_the_function_is_continuous_on_a_b_and_diffe_60}</li>
                    <li>{`Compute the average rate of change: \frac{f(b) - f(a)}{b - a}.`}</li>
                    <li>{contentData.find_the_derivative_fx_61}</li>
                    <li>{`Solve f'(c) = \frac{f(b) - f(a)}{b - a} for c in (a, b).`}</li>
                  </ol>
                </div>

                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>{contentData.conditions_for_mvt_62}</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{contentData.fx_must_be_continuous_on_the_closed_interval_ab_63}</li>
                    <li>{contentData.fx_must_be_differentiable_on_the_open_interval_ab_64}</li>
                    <li>{contentData.the_theorem_guarantees_at_least_one_such_c_but_the_65}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How to Use This Calculator */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.how_to_use_this_calculator_66}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>{contentData.enter_your_function_fx_using_standard_mathematical_67}</li>
                  <li>{contentData.specify_the_interval_endpoints_a_and_b_with_a_b_68}</li>
                  <li>{contentData.click_calculate_point_to_find_the_values_of_c_69}</li>
                  <li>{contentData.review_the_stepbystep_solution_showing_all_calcula_70}</li>
                  <li>{contentData.verify_that_each_c_lies_in_the_open_interval_a_b_71}</li>
                </ol>
              </CardContent>
            </Card>

            {/* Examples */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.examples_72}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{contentData.example_1_fx_x_1_3_73}</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        <strong>{contentData.stepbystep_solution_74}</strong>
                      </p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p>{contentData.f1_1_f3_9_75}</p>
                        <p>{contentData.aroc_9131_4_76}</p>
                        <p>{contentData.fx_2x_77}</p>
                        <p>{contentData.solve_2c_4_c_2_78}</p>
                        <p>{contentData.verify_2_13_79}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{contentData.example_2_fx_x_0_2_80}</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        <strong>{contentData.stepbystep_solution_81}</strong>
                      </p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p>{contentData.f0_0_f2_8_82}</p>
                        <p>{contentData.aroc_8020_4_83}</p>
                        <p>{contentData.fx_3x_84}</p>
                        <p>{contentData.solve_3c_4_c_43_c_43_1154_only_positive_in_interva_85}</p>
                        <p>{contentData.verify_1154_02_86}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{contentData.example_3_fx_4x_6x_2_4_2_corrected_calculation_87}</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        <strong>{contentData.stepbystep_solution_88}</strong>
                      </p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p>{contentData.f4_230_f2_22_89}</p>
                        <p>{contentData.aroc_22_2302_4_2526_42_90}</p>
                        <p>{contentData.fx_12x_6_91}</p>
                        <p>{contentData.solve_12c_6_42_12c_48_c_4_c_2_92}</p>
                        <p>{contentData.verify_2_and_2_42_2_2_2_is_endpoint_but_open_inter_93}</p>
                      </div>
                    </div>
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