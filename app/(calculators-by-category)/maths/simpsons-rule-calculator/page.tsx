"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Calculator, FenceIcon as Function, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SimilarCalculators from "@/components/similar-calculators";

// Function parser for mathematical expressions
const evaluateFunction = (expression: string, x: number): number => {
  try {
    // Replace x with the actual value and common math functions
    const expr = expression.replace(/x/g, x.toString()).replace(/\^/g, "**").replace(/sin/g, "Math.sin").replace(/cos/g, "Math.cos").replace(/tan/g, "Math.tan").replace(/log/g, "Math.log").replace(/ln/g, "Math.log").replace(/sqrt/g, "Math.sqrt").replace(/pi/g, "Math.PI").replace(/e/g, "Math.E");
    return eval(expr);
  } catch (error) {
    throw new Error(`Invalid function at x = ${x}`);
  }
};
export default function SimpsonsRuleCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('simpsons-rule-calculator', language, "calculator-ui");

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
    "simpsons_rule_integration_0": "",
    "enter_your_function_and_integration_limits_to_calc_1": "",
    "function_fx_2": "",
    "use_x_as_variable_for_powers_3": "",
    "supported_sin_cos_tan_sqrt_log_ln_pi_e_4": "",
    "lower_limit_a_5": "",
    "upper_limit_b_6": "",
    "number_of_subintervals_n_7": "",
    "must_be_even_8": "",
    "simpsons_13_rule_formula_9": "",
    "a_10": "",
    "b_11": "",
    "fxdx_ba3n_fx_4fx_2fx_4fx_fx_12": "",
    "where_fx_x_7_13": "",
    "k_13_14": "",
    "for_the_example_n_is_even_and_x_15": "",
    "i_16": "",
    "a_iban_17": "",
    "calculate_18": "",
    "try_example_19": "",
    "result_20": "",
    "approximate_integral_21": "",
    "x_22": "",
    "subintervals_23": "",
    "enter_function_and_limits_then_click_24": "",
    "calculate_25": "",
    "to_see_result_26": "",
    "stepbystep_solution_27": "",
    "k_1_given_information_28": "",
    "function_fx_29": "",
    "lower_limit_a_30": "",
    "upper_limit_b_31": "",
    "number_of_subintervals_n_32": "",
    "k_2_calculate_width_33": "",
    "x_b_a_n_34": "",
    "k_3_partition_points_and_function_values_35": "",
    "i_36": "",
    "x_37": "",
    "fx_38": "",
    "coefficient_39": "",
    "k_4_apply_simpsons_rule_40": "",
    "sum_41": "",
    "sum_42": "",
    "integral_ba3n_sum_43": "",
    "to_44": "",
    "k_3_45": "",
    "what_is_simpsons_rule_46": "",
    "simpsons_rule_is_a_numerical_integration_technique_47": "",
    "the_method_divides_the_integration_interval_into_a_48": "",
    "how_to_use_the_calculator_49": "",
    "enter_your_function_fx_using_standard_mathematical_50": "",
    "set_the_lower_limit_a_and_upper_limit_b_of_integra_51": "",
    "choose_an_even_number_of_subintervals_n_more_subin_52": "",
    "click_calculate_to_get_the_approximate_result_53": "",
    "use_show_steps_to_see_the_detailed_calculation_pro_54": "",
    "formula_55": "",
    "a_56": "",
    "b_57": "",
    "fxdx_x3fx_4fx_2fx_4fx_4fx_58": "",
    "n1_59": "",
    "fx_60": "",
    "n_61": "",
    "where_62": "",
    "x_b_a_n_subinterval_width_63": "",
    "n_even_number_of_subintervals_64": "",
    "coefficients_1_for_endpoints_4_for_odd_indices_2_f_65": "",
    "example_66": "",
    "problem_67": "",
    "approximate_1x_7_dx_using_n_4_68": "",
    "solution_69": "",
    "k_1_x_1_0_4_025_70": "",
    "k_2_points_x_0_x_025_x_05_x_075_x_1_71": "",
    "k_3_function_values_f0_0142857_f025_0142653_f05_0141_72": "",
    "k_4_apply_coefficients_1_4_2_4_1_sum_1133_73": "",
    "k_5_result_0253_1133_74": "",
    "k_0094417_75": "",
    "faq_76": "",
    "what_is_simpsons_rule_77": "",
    "simpsons_rule_is_a_numerical_method_for_approximat_78": "",
    "why_must_n_be_even_79": "",
    "simpsons_13_rule_requires_pairing_adjacent_interva_80": "",
    "how_accurate_is_simpsons_rule_81": "",
    "simpsons_rule_has_an_error_of_oh_making_it_much_mo_82": "",
    "difference_between_trapezoidal_rule_and_simpsons_r_83": "",
    "the_trapezoidal_rule_uses_linear_approximations_st_84": "",
    "smart_calculator_85": "",
    "k_2025_smart_calculator_all_rights_reserved_86": ""
  };
  const [functionExpression, setFunctionExpression] = useState("(x**5 + 7)**(-1/3)");
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(1);
  const [subintervals, setSubintervals] = useState(4);
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const [showSteps, setShowSteps] = useState(false);
  const calculateSimpsonsRule = () => {
    setError("");

    // Validation
    if (subintervals % 2 !== 0) {
      setError("n must be an even integer. Simpson's 1/3 rule requires an even number of subintervals.");
      return;
    }
    if (subintervals <= 0) {
      setError("Number of subintervals must be positive.");
      return;
    }
    if (upperLimit <= lowerLimit) {
      setError("Upper limit must be greater than lower limit.");
      return;
    }
    if (!functionExpression.trim()) {
      setError("Please enter a function.");
      return;
    }
    try {
      const a = lowerLimit;
      const b = upperLimit;
      const n = subintervals;

      // Calculate width
      const deltaX = (b - a) / n;
      // For formula clarity, also calculate (b - a) / (3 * n)
      const simpsonFactor = (b - a) / (3 * n);

      // Generate partition points
      const points = [];
      const functionValues = [];
      const coefficients = [];
      for (let i = 0; i <= n; i++) {
        const xi = a + i * deltaX;
        points.push(xi);
        try {
          const fxi = evaluateFunction(functionExpression, xi);
          if (!isFinite(fxi)) {
            throw new Error(`Function undefined at x = ${xi}`);
          }
          functionValues.push(fxi);
        } catch (err) {
          let message = 'Unknown error';
          if (err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string') {
            message = (err as any).message;
          }
          setError(`Function evaluation error at x = ${xi}: ${message}`);
          return;
        }

        // Determine coefficients: 1 for endpoints, 4 for odd indices, 2 for even indices
        if (i === 0 || i === n) {
          coefficients.push(1);
        } else if (i % 2 === 1) {
          coefficients.push(4);
        } else {
          coefficients.push(2);
        }
      }

      // Apply Simpson's Rule formula
      let sum = 0;
      for (let i = 0; i <= n; i++) {
        sum += coefficients[i] * functionValues[i];
      }

      // Simpson's 1/3 Rule: (b - a) / (3n) * sum
      const approximateIntegral = simpsonFactor * sum;
      setResult({
        approximateIntegral,
        deltaX,
        simpsonFactor,
        points,
        functionValues,
        coefficients,
        sum,
        formula: "∫ₐᵇ f(x)dx ≈ (b-a)/(3n)[f(x₀) + 4f(x₁) + 2f(x₂) + ... + 4f(xₙ₋₁) + f(xₙ)]",
        functionExpression,
        lowerLimit: a,
        upperLimit: b,
        subintervals: n
      });
      setShowResult(true);
    } catch (err) {
      let message = 'Unknown error';
      if (err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string') {
        message = (err as any).message;
      }
      setError(`Calculation error: ${message}`);
    }
  };
  const runExample = () => {
    setFunctionExpression("1/(x**5 + 7)");
    setLowerLimit(0);
    setUpperLimit(1);
    setSubintervals(4);
    setTimeout(() => calculateSimpsonsRule(), 100);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Function className="w-8 h-8 text-white" />
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
                    <Function className="w-6 h-6 text-green-600" />
                    <span>{contentData.simpsons_rule_integration_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_your_function_and_integration_limits_to_calc_1}</CardDescription>
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
                      <Input className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm font-mono" type="text" value={functionExpression} onChange={e => setFunctionExpression(e.target.value)} placeholder="e.g., x**2 + 3*x + 1" />
                      <p className="text-xs text-gray-500 mt-1">{contentData.supported_sin_cos_tan_sqrt_log_ln_pi_e_4}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.lower_limit_a_5}</Label>
                        <Input className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" type="number" step="any" value={lowerLimit} onChange={e => setLowerLimit(Number(e.target.value))} />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.upper_limit_b_6}</Label>
                        <Input className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" type="number" step="any" value={upperLimit} onChange={e => setUpperLimit(Number(e.target.value))} />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.number_of_subintervals_n_7}<span className="text-red-500">{contentData.must_be_even_8}</span>
                      </Label>
                      <Input className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" type="number" min="2" step="2" value={subintervals} onChange={e => setSubintervals(Number(e.target.value))} />
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-700">
                        <strong>{contentData.simpsons_13_rule_formula_9}</strong><br />
                        <span className="font-mono">
                          ∫<sub>{contentData.a_10}</sub><sup>{contentData.b_11}</sup>{contentData.fxdx_ba3n_fx_4fx_2fx_4fx_fx_12}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{contentData.where_fx_x_7_13}<sup>{contentData.k_13_14}</sup>{contentData.for_the_example_n_is_even_and_x_15}<sub>{contentData.i_16}</sub>{contentData.a_iban_17}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button onClick={calculateSimpsonsRule} className="flex-1 h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">{contentData.calculate_18}</Button>
                    <Button onClick={runExample} variant="outline" className="h-12 px-6 border-green-200 text-green-700 hover:bg-green-50 bg-transparent">{contentData.try_example_19}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Result Card (right side) */}
            <div className="hidden lg:block">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-blue-100 h-full flex flex-col justify-center items-center p-8 sticky top-24">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-3 shadow-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.result_20}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center w-full">
                    <p className="text-lg text-gray-600 mb-2 font-medium">{contentData.approximate_integral_21}</p>
                    <p className="text-4xl font-extrabold text-green-900 mb-4 drop-shadow-lg break-all">
                      {result.approximateIntegral.toFixed(6)}
                    </p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{contentData.x_22}{result.deltaX.toFixed(4)}</p>
                      <p>{contentData.subintervals_23}{result.subintervals}</p>
                    </div>
                    <Button onClick={() => setShowSteps(!showSteps)} variant="outline" size="sm" className="mt-4 border-green-200 text-green-700 hover:bg-green-50">
                      {showSteps ? "Hide Steps" : "Show Steps"}
                    </Button>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Function className="w-8 h-8 text-green-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_function_and_limits_then_click_24}{" "}
                      <span className="font-semibold text-green-600">{contentData.calculate_25}</span>{contentData.to_see_result_26}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>
          <SimilarCalculators calculators={[{
            calculatorName: "Mean Value Theorem Calculator",
            calculatorHref: "/maths/mean-value-theorem-calculator",
            calculatorDescription: "The Mean Value Theorem (MVT) is a key result in differential calculus"
          },
          ]}
            color="green"
            title="Related Math Calculators" />
          {/* Step-by-step breakdown */}
          {showResult && result && showSteps && <div className="mt-8">
            <Card className="shadow-xl border-0 p-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b px-8 py-6">
                <CardTitle className="text-xl font-bold text-green-700">{contentData.stepbystep_solution_27}</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.k_1_given_information_28}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>{contentData.function_fx_29}{result.functionExpression}</p>
                      <p>{contentData.lower_limit_a_30}{result.lowerLimit}</p>
                      <p>{contentData.upper_limit_b_31}{result.upperLimit}</p>
                      <p>{contentData.number_of_subintervals_n_32}{result.subintervals}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.k_2_calculate_width_33}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>{contentData.x_b_a_n_34}{result.upperLimit} - {result.lowerLimit}) / {result.subintervals} ={" "}
                        {result.deltaX.toFixed(4)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.k_3_partition_points_and_function_values_35}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">{contentData.i_36}</th>
                            <th className="text-left py-2">{contentData.x_37}</th>
                            <th className="text-left py-2">{contentData.fx_38}</th>
                            <th className="text-left py-2">{contentData.coefficient_39}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.points.map((point: number, i: number) => <tr key={i} className="border-b">
                            <td className="py-1">{i}</td>
                            <td className="py-1">{point.toFixed(4)}</td>
                            <td className="py-1">{result.functionValues[i].toFixed(6)}</td>
                            <td className="py-1">{result.coefficients[i]}</td>
                          </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.k_4_apply_simpsons_rule_40}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="mb-2">{contentData.sum_41}{" "}
                        {result.coefficients.map((coef: number, i: number) => `${coef} × ${result.functionValues[i].toFixed(6)}`).join(" + ")}
                      </p>
                      <p className="mb-2">{contentData.sum_42}{result.sum.toFixed(6)}</p>
                      <p>{contentData.integral_ba3n_sum_43}{result.lowerLimit}{contentData.to_44}{result.upperLimit}{contentData.k_3_45}{result.subintervals} × {result.sum.toFixed(6)} = <strong>{result.approximateIntegral.toFixed(6)}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}

          {/* Educational Content */}
          <div className="mt-12 space-y-8">
            {/* What is Simpson's Rule */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.what_is_simpsons_rule_46}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-gray-700 leading-relaxed mb-4">{contentData.simpsons_rule_is_a_numerical_integration_technique_47}</p>
                <p className="text-gray-700 leading-relaxed">{contentData.the_method_divides_the_integration_interval_into_a_48}</p>
              </CardContent>
            </Card>

            {/* How to Use */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.how_to_use_the_calculator_49}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>{contentData.enter_your_function_fx_using_standard_mathematical_50}</li>
                  <li>{contentData.set_the_lower_limit_a_and_upper_limit_b_of_integra_51}</li>
                  <li>{contentData.choose_an_even_number_of_subintervals_n_more_subin_52}</li>
                  <li>{contentData.click_calculate_to_get_the_approximate_result_53}</li>
                  <li>{contentData.use_show_steps_to_see_the_detailed_calculation_pro_54}</li>
                </ol>
              </CardContent>
            </Card>

            {/* Formula */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.formula_55}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <p className="text-lg font-mono text-center mb-4">
                    ∫<sub>{contentData.a_56}</sub>
                    <sup>{contentData.b_57}</sup>{contentData.fxdx_x3fx_4fx_2fx_4fx_4fx_58}<sub>{contentData.n1_59}</sub>{contentData.fx_60}<sub>{contentData.n_61}</sub>)]
                  </p>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>
                      <strong>{contentData.where_62}</strong>
                    </p>
                    <p>{contentData.x_b_a_n_subinterval_width_63}</p>
                    <p>{contentData.n_even_number_of_subintervals_64}</p>
                    <p>{contentData.coefficients_1_for_endpoints_4_for_odd_indices_2_f_65}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Example */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.example_66}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>{contentData.problem_67}</strong>{contentData.approximate_1x_7_dx_using_n_4_68}</p>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">{contentData.solution_69}</p>
                    <p>{contentData.k_1_x_1_0_4_025_70}</p>
                    <p>{contentData.k_2_points_x_0_x_025_x_05_x_075_x_1_71}</p>
                    <p>{contentData.k_3_function_values_f0_0142857_f025_0142653_f05_0141_72}</p>
                    <p>{contentData.k_4_apply_coefficients_1_4_2_4_1_sum_1133_73}</p>
                    <p>{contentData.k_5_result_0253_1133_74}<strong>{contentData.k_0094417_75}</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.faq_76}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.what_is_simpsons_rule_77}</h3>
                    <p className="text-gray-700">{contentData.simpsons_rule_is_a_numerical_method_for_approximat_78}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.why_must_n_be_even_79}</h3>
                    <p className="text-gray-700">{contentData.simpsons_13_rule_requires_pairing_adjacent_interva_80}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.how_accurate_is_simpsons_rule_81}</h3>
                    <p className="text-gray-700">{contentData.simpsons_rule_has_an_error_of_oh_making_it_much_mo_82}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.difference_between_trapezoidal_rule_and_simpsons_r_83}</h3>
                    <p className="text-gray-700">{contentData.the_trapezoidal_rule_uses_linear_approximations_st_84}</p>
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