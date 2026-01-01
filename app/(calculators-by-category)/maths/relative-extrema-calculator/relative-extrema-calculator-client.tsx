"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, TrendingDown, Minus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';

const parseExpression = (expr: string): string => {
  return expr.replace(/\*\*/g, "^")
    .replace(/Math\./g, "")
    .replace(/\s+/g, "")
    .trim();
};

const differentiate = (expression: string, variable = "x"): string => {
  try {
    const expr = parseExpression(expression);
    const terms = expr.split(/(?=[+-])/).filter(term => term.length > 0);
    const derivativeTerms: string[] = [];

    for (let term of terms) {
      term = term.trim();
      if (!term) continue;

      if (!term.includes(variable)) {
        continue;
      }

      const powerMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}\\^([+-]?\\d+)`));
      if (powerMatch) {
        const coeff = powerMatch[1] === "" || powerMatch[1] === "+" ? 1 : powerMatch[1] === "-" ? -1 : Number.parseFloat(powerMatch[1]) || 1;
        const power = Number.parseInt(powerMatch[2]);
        if (power === 0) continue;

        const newCoeff = coeff * power;
        const newPower = power - 1;

        if (newPower === 0) {
          derivativeTerms.push(newCoeff.toString());
        } else if (newPower === 1) {
          if (newCoeff === 1) derivativeTerms.push(variable);
          else if (newCoeff === -1) derivativeTerms.push(`-${variable}`);
          else derivativeTerms.push(`${newCoeff}*${variable}`);
        } else {
          if (newCoeff === 1) derivativeTerms.push(`${variable}^${newPower}`);
          else if (newCoeff === -1) derivativeTerms.push(`-${variable}^${newPower}`);
          else derivativeTerms.push(`${newCoeff}*${variable}^${newPower}`);
        }
        continue;
      }

      const linearMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}(?!\\^)`));
      if (linearMatch) {
        const coeff = linearMatch[1] === "" || linearMatch[1] === "+" ? 1 : linearMatch[1] === "-" ? -1 : Number.parseFloat(linearMatch[1]) || 1;
        derivativeTerms.push(coeff.toString());
        continue;
      }
    }

    if (derivativeTerms.length === 0) return "0";

    let result = derivativeTerms[0];
    for (let i = 1; i < derivativeTerms.length; i++) {
      const term = derivativeTerms[i];
      if (term.startsWith("-")) {
        result += ` ${term}`;
      } else {
        result += ` + ${term}`;
      }
    }
    return result.replace(/\+ -/g, "- ");
  } catch (err) {
    console.error("Differentiation error:", err);
    return `d/d${variable}[${expression}]`;
  }
};

const solveCriticalPoints = (derivative: string, variable = "x"): number[] => {
  try {
    if (derivative === "0") return [];
    if (!derivative.includes(variable)) return [];

    const linearRegex = new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}\\s*([+-]\\s*\\d+\\.?\\d*)?`);
    const linearMatch = derivative.match(linearRegex);
    
    if (linearMatch && !derivative.includes(`${variable}^`)) {
      const a = linearMatch[1] === "" || linearMatch[1] === "+" ? 1 : linearMatch[1] === "-" ? -1 : Number.parseFloat(linearMatch[1]) || 1;
      const b = linearMatch[2] ? Number.parseFloat(linearMatch[2].replace(/\s/g, "")) : 0;
      if (a !== 0) {
        return [-b / a];
      }
      return [];
    }

    const quadraticRegex = new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}\\^2\\s*([+-]\\s*\\d*\\.?\\d*)\\*?${variable}?\\s*([+-]\\s*\\d+\\.?\\d*)?`);
    const quadMatch = derivative.match(quadraticRegex);
    
    if (quadMatch) {
      const a = quadMatch[1] === "" || quadMatch[1] === "+" ? 1 : quadMatch[1] === "-" ? -1 : Number.parseFloat(quadMatch[1]) || 1;
      const b = quadMatch[2] ? (quadMatch[2].replace(/\s/g, "") === "+" || quadMatch[2].replace(/\s/g, "") === "" ? 1 : quadMatch[2].replace(/\s/g, "") === "-" ? -1 : Number.parseFloat(quadMatch[2].replace(/\s/g, ""))) : 0;
      const c = quadMatch[3] ? Number.parseFloat(quadMatch[3].replace(/\s/g, "")) : 0;

      const discriminant = b * b - 4 * a * c;
      if (discriminant < 0) return [];
      if (discriminant === 0) return [-b / (2 * a)];
      
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return [x1, x2].sort((a, b) => a - b);
    }

    return [];
  } catch (err) {
    console.error("Solving error:", err);
    return [];
  }
};

const evaluateExpression = (expression: string, variable: string, value: number): number => {
  try {
    const expr = parseExpression(expression);
    const evaluated = expr.replace(new RegExp(variable, 'g'), `(${value})`);
    const result = Function(`"use strict"; return (${evaluated})`)();
    return result;
  } catch (err) {
    return NaN;
  }
};

interface ExtremaPoint {
  x: number;
  fx: number;
  firstDerivative: string;
  secondDerivative: string;
  secondDerivativeValue: number;
  classification: "relative maximum" | "relative minimum" | "saddle point" | "inconclusive";
  isEndpoint?: boolean;
}


interface RelativeExtremaCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function RelativeExtremaCalculatorClient({ content, guideContent }: RelativeExtremaCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [functionInput, setFunctionInput] = useState("");
  const [variable, setVariable] = useState("x");
  const [domainMin, setDomainMin] = useState("");
  const [domainMax, setDomainMax] = useState("");
  const [result, setResult] = useState<{
    originalFunction: string;
    firstDerivative: string;
    secondDerivative: string;
    criticalPoints: ExtremaPoint[];
    steps: string[];
  } | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCalculate = () => {
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    
    setErrors({});
    
    if (!functionInput.trim()) {
      setErrors({ function: contentData.error_function_required || "Function is required" });
      return;
    }

    try {
      const steps: string[] = [];
      const expr = parseExpression(functionInput);
      
      steps.push(`Original function: f(${variable}) = ${expr}`);

      const firstDeriv = differentiate(expr, variable);
      steps.push(`First derivative: f'(${variable}) = ${firstDeriv}`);

      const secondDeriv = differentiate(firstDeriv, variable);
      steps.push(`Second derivative: f''(${variable}) = ${secondDeriv}`);

      const criticalPointsX = solveCriticalPoints(firstDeriv, variable);
      steps.push(`Solving f'(${variable}) = 0: ${criticalPointsX.length > 0 ? criticalPointsX.map(x => `${variable} = ${x.toFixed(4)}`).join(', ') : 'No solutions'}`);

      const hasDomain = domainMin !== "" && domainMax !== "";
      const minVal = hasDomain ? Number.parseFloat(domainMin) : -Infinity;
      const maxVal = hasDomain ? Number.parseFloat(domainMax) : Infinity;

      let filteredPoints = criticalPointsX;
      if (hasDomain) {
        filteredPoints = criticalPointsX.filter(x => x >= minVal && x <= maxVal);
      }

      const extremaPoints: ExtremaPoint[] = [];

      for (const x of filteredPoints) {
        const fx = evaluateExpression(expr, variable, x);
        const secondDerivValue = evaluateExpression(secondDeriv, variable, x);
        
        let classification: ExtremaPoint["classification"] = "inconclusive";
        
        if (secondDerivValue > 0) {
          classification = "relative minimum";
        } else if (secondDerivValue < 0) {
          classification = "relative maximum";
        } else {
          classification = "saddle point";
        }

        extremaPoints.push({
          x,
          fx,
          firstDerivative: firstDeriv,
          secondDerivative: secondDeriv,
          secondDerivativeValue: secondDerivValue,
          classification
        });

        steps.push(`At ${variable} = ${x.toFixed(4)}: f''(${x.toFixed(4)}) = ${secondDerivValue.toFixed(4)} → ${classification}`);
      }

      if (hasDomain) {
        const endpointMin = evaluateExpression(expr, variable, minVal);
        const endpointMax = evaluateExpression(expr, variable, maxVal);
        
        extremaPoints.push({
          x: minVal,
          fx: endpointMin,
          firstDerivative: firstDeriv,
          secondDerivative: secondDeriv,
          secondDerivativeValue: NaN,
          classification: "inconclusive",
          isEndpoint: true
        });

        extremaPoints.push({
          x: maxVal,
          fx: endpointMax,
          firstDerivative: firstDeriv,
          secondDerivative: secondDeriv,
          secondDerivativeValue: NaN,
          classification: "inconclusive",
          isEndpoint: true
        });

        steps.push(`Endpoint check: f(${minVal}) = ${endpointMin.toFixed(4)}, f(${maxVal}) = ${endpointMax.toFixed(4)}`);
      }

      extremaPoints.sort((a, b) => a.x - b.x);

      setResult({
        originalFunction: expr,
        firstDerivative: firstDeriv,
        secondDerivative: secondDeriv,
        criticalPoints: extremaPoints,
        steps
      });
      setShowResult(true);
    } catch (error) {
      setErrors({ general: contentData.error_calculation || "Error calculating extrema. Please check your function." });
    }
  };

  const handleReset = () => {
    setFunctionInput("");
    setVariable("x");
    setDomainMin("");
    setDomainMax("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {contentData.pageTitle || "Relative Extrema Calculator"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {contentData.pageDescription || "Find all relative maxima, minima, and saddle points with detailed step-by-step solutions"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <span>{contentData.calculator_inputs || "Calculator Inputs"}</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {contentData.enter_function || "Enter your function and optional domain"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {errors.general && (
                    <Alert className="mb-4 border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-600">{errors.general}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-6 mb-8">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        {contentData.function_label || "Function f(x)"}
                      </Label>
                      <Input
                        className={`h-12 ${errors.function ? "border-red-300" : ""}`}
                        type="text"
                        placeholder="x^3 - 6*x^2 + 9*x + 1"
                        value={functionInput}
                        onChange={(e) => setFunctionInput(e.target.value)}
                      />
                      {errors.function && <p className="text-red-500 text-sm mt-1">{errors.function}</p>}
                      <p className="text-xs text-gray-500 mt-1">
                        {contentData.function_hint || "Use ^ for powers (e.g., x^2, x^3)"}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        {contentData.variable_label || "Variable (optional)"}
                      </Label>
                      <Input
                        className="h-12"
                        type="text"
                        placeholder="x"
                        value={variable}
                        onChange={(e) => setVariable(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          {contentData.domain_min || "Domain Min (optional)"}
                        </Label>
                        <Input
                          className="h-12"
                          type="number"
                          placeholder="-10"
                          value={domainMin}
                          onChange={(e) => setDomainMin(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          {contentData.domain_max || "Domain Max (optional)"}
                        </Label>
                        <Input
                          className="h-12"
                          type="number"
                          placeholder="10"
                          value={domainMax}
                          onChange={(e) => setDomainMax(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={handleCalculate}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg"
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      {contentData.calculate_button || "Find Extrema"}
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="h-12 px-6 border-2 border-gray-300 hover:bg-gray-50"
                    >
                      {contentData.reset_button || "Reset"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {contentData.quick_guide || "Quick Guide"}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{contentData.guide_1 || "Enter polynomial functions using ^ for powers"}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{contentData.guide_2 || "Example: x^3 - 3*x^2 + 2"}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{contentData.guide_3 || "Domain is optional (defaults to all real numbers)"}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{contentData.guide_4 || "Uses second derivative test for classification"}</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {showResult && result && (
            <div className="mt-8" ref={resultsRef}>
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <span>{contentData.results_title || "Extrema Results"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      {contentData.derivatives_title || "Derivatives"}
                    </h3>
                    <div className="space-y-3 font-mono text-sm">
                      <div>
                        <span className="text-gray-600">f({variable}) = </span>
                        <span className="font-semibold text-gray-900">{result.originalFunction}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">f'({variable}) = </span>
                        <span className="font-semibold text-blue-700">{result.firstDerivative}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">f''({variable}) = </span>
                        <span className="font-semibold text-purple-700">{result.secondDerivative}</span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="mb-8"> */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {contentData.critical_points_title || "Critical Points & Classification"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.criticalPoints.map((point, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-2 ${
                            point.isEndpoint
                              ? "bg-gray-50 border-gray-300"
                              : point.classification === "relative maximum"
                              ? "bg-red-50 border-red-300"
                              : point.classification === "relative minimum"
                              ? "bg-green-50 border-green-300"
                              : "bg-yellow-50 border-yellow-300"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">
                              {variable} = {point.x.toFixed(4)}
                            </span>
                            {!point.isEndpoint && (
                              point.classification === "relative maximum" ? (
                                <TrendingDown className="w-5 h-5 text-red-600" />
                              ) : point.classification === "relative minimum" ? (
                                <TrendingUp className="w-5 h-5 text-green-600" />
                              ) : (
                                <Minus className="w-5 h-5 text-yellow-600" />
                              )
                            )}
                          </div>
                          <div className="text-sm space-y-1">
                            <div>
                              <span className="text-gray-600">f({point.x.toFixed(4)}) = </span>
                              <span className="font-semibold">{point.fx.toFixed(4)}</span>
                            </div>
                            {!point.isEndpoint && (
                              <>
                                <div>
                                  <span className="text-gray-600">f'({point.x.toFixed(4)}) = </span>
                                  <span className="font-semibold">0</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">f''({point.x.toFixed(4)}) = </span>
                                  <span className="font-semibold">{point.secondDerivativeValue.toFixed(4)}</span>
                                </div>
                                <div className="mt-2 pt-2 border-t border-gray-300">
                                  <span className={`font-semibold ${
                                    point.classification === "relative maximum"
                                      ? "text-red-700"
                                      : point.classification === "relative minimum"
                                      ? "text-green-700"
                                      : "text-yellow-700"
                                  }`}>
                                    {point.classification.toUpperCase()}
                                  </span>
                                </div>
                              </>
                            )}
                            {point.isEndpoint && (
                              <div className="mt-2 pt-2 border-t border-gray-300">
                                <span className="font-semibold text-gray-700">ENDPOINT</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
