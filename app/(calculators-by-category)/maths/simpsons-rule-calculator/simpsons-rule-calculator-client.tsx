"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CalculatorGuide from "@/components/calculator-guide";
import { Calculator, FenceIcon as Function, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';

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

interface SimpsonsRuleCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function SimpsonsRuleCalculatorClient({ content, guideContent }: SimpsonsRuleCalculatorClientProps) {
  const guideData = guideContent || { color: 'blue', sections: [], faq: [] };
  
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "simpsons_rule_integration_0": "",
    "enter_your_function_and_integration_limits_to_calc_1": "",
    "function_fx_2": "",
    "use_x_as_variable_for_powers_3": "",
    "supported_sin_cos_tan_sqrt_log_ln_pi_e_4": "",
    "lower_limit_a_5": "",
    "upper_limit_b_6": "",
    "number_of_subintervals_n_7": "",
    "must_be_even_8": "",
    "calculate_18": "",
    "try_example_19": "",
    "result_20": "",
    "approximate_integral_21": "",
    "x_22": "",
    "subintervals_23": "",
    "enter_function_and_limits_then_click_24": "",
    "calculate_25": "",
    "to_see_result_26": ""
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
      const deltaX = (b - a) / n;
      const simpsonFactor = (b - a) / (3 * n);

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

        if (i === 0 || i === n) {
          coefficients.push(1);
        } else if (i % 2 === 1) {
          coefficients.push(4);
        } else {
          coefficients.push(2);
        }
      }

      let sum = 0;
      for (let i = 0; i <= n; i++) {
        sum += coefficients[i] * functionValues[i];
      }

      const approximateIntegral = simpsonFactor * sum;
      setResult({
        approximateIntegral,
        deltaX,
        simpsonFactor,
        points,
        functionValues,
        coefficients,
        sum,
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
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
                    {error && (
                      <Alert className="mb-6 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          {contentData.function_fx_2}
                          <span className="text-gray-500">{contentData.use_x_as_variable_for_powers_3}</span>
                        </Label>
                        <Input 
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm font-mono" 
                          type="text" 
                          value={functionExpression} 
                          onChange={e => setFunctionExpression(e.target.value)} 
                          placeholder="e.g., x**2 + 3*x + 1" 
                        />
                        <p className="text-xs text-gray-500 mt-1">{contentData.supported_sin_cos_tan_sqrt_log_ln_pi_e_4}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.lower_limit_a_5}</Label>
                          <Input 
                            className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" 
                            type="number" 
                            step="any" 
                            value={lowerLimit} 
                            onChange={e => setLowerLimit(Number(e.target.value))} 
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.upper_limit_b_6}</Label>
                          <Input 
                            className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" 
                            type="number" 
                            step="any" 
                            value={upperLimit} 
                            onChange={e => setUpperLimit(Number(e.target.value))} 
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          {contentData.number_of_subintervals_n_7}
                          <span className="text-red-500">{contentData.must_be_even_8}</span>
                        </Label>
                        <Input 
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" 
                          type="number" 
                          min="2" 
                          step="2" 
                          value={subintervals} 
                          onChange={e => setSubintervals(Number(e.target.value))} 
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Button onClick={calculateSimpsonsRule} className="flex-1 h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                        {contentData.calculate_18}
                      </Button>
                      <Button onClick={runExample} variant="outline" className="h-12 px-6 border-green-200 text-green-700 hover:bg-green-50 bg-transparent">
                        {contentData.try_example_19}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-blue-100 h-full flex flex-col justify-center items-center p-8 sticky top-24">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.result_20}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center w-full">
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
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Function className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          {contentData.enter_function_and_limits_then_click_24}{" "}
                          <span className="font-semibold text-green-600">{contentData.calculate_25}</span>
                          {contentData.to_see_result_26}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <SimilarCalculators 
              calculators={[
                {
                  calculatorName: "Mean Value Theorem Calculator",
                  calculatorHref: "/maths/mean-value-theorem-calculator",
                  calculatorDescription: "The Mean Value Theorem (MVT) is a key result in differential calculus"
                }
              ]}
              color="green"
              title="Related Math Calculators" 
            />

            <RatingProfileSection
              entityId="simpsons-rule-calculator"
              entityType="calculator"
              creatorSlug="felix-yacoub"
              initialRatingTotal={0}
              initialRatingCount={0}
            />
            <CalculatorGuide data={guideData} />
          </div>
        </main>
      </div>
    </>
  );
}
