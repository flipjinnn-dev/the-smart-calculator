"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, FenceIcon as Function, AlertCircle, Download, Printer } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';
const parseExpression = (expr: string): string => {
  return expr.replace(/\*\*/g, "^") // Convert ** to ^ for powers
    .replace(/Math\./g, "") // Remove Math. prefix
    .replace(/\s+/g, "") // Remove all spaces
    .trim();
};
const differentiate = (expression: string, variable = "x"): string => {
  try {
    const expr = parseExpression(expression);

    // Handle polynomial terms like ax^n, ax^2, ax, x^n, x
    const terms = expr.split(/(?=[+-])/).filter(term => term.length > 0);
    const derivativeTerms: string[] = [];
    for (let term of terms) {
      term = term.trim();
      if (!term) continue;

      // Check if term contains the variable
      if (!term.includes(variable)) {
        // Constant term - derivative is 0, skip
        continue;
      }

      // Handle x^n terms
      const powerMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}\\^([+-]?\\d+)`));
      if (powerMatch) {
        const coeff = powerMatch[1] === "" || powerMatch[1] === "+" ? 1 : powerMatch[1] === "-" ? -1 : Number.parseFloat(powerMatch[1]) || 1;
        const power = Number.parseInt(powerMatch[2]);
        if (power === 0) continue; // Derivative of constant is 0

        const newCoeff = coeff * power;
        const newPower = power - 1;
        if (newPower === 0) {
          derivativeTerms.push(newCoeff.toString());
        } else if (newPower === 1) {
          if (newCoeff === 1) derivativeTerms.push(variable); else if (newCoeff === -1) derivativeTerms.push(`-${variable}`); else derivativeTerms.push(`${newCoeff}*${variable}`);
        } else {
          if (newCoeff === 1) derivativeTerms.push(`${variable}^${newPower}`); else if (newCoeff === -1) derivativeTerms.push(`-${variable}^${newPower}`); else derivativeTerms.push(`${newCoeff}*${variable}^${newPower}`);
        }
        continue;
      }

      // Handle linear terms like ax, x, -x, +x
      const linearMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}(?!\\^)`));
      if (linearMatch) {
        const coeff = linearMatch[1] === "" || linearMatch[1] === "+" ? 1 : linearMatch[1] === "-" ? -1 : Number.parseFloat(linearMatch[1]) || 1;
        if (coeff === 1) derivativeTerms.push("1"); else if (coeff === -1) derivativeTerms.push("-1"); else derivativeTerms.push(coeff.toString());
        continue;
      }
    }
    if (derivativeTerms.length === 0) return "0";

    // Join terms with proper signs
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

    // Handle simple constants
    if (!derivative.includes(variable)) {
      return []; // No variable means no solution
    }

    // Handle linear equations like ax + b = 0
    const linearRegex = new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}\\s*([+-]\\s*\\d+\\.?\\d*)?`);
    const linearMatch = derivative.match(linearRegex);
    if (linearMatch && !derivative.includes(`${variable}^`)) {
      const a = linearMatch[1] === "" || linearMatch[1] === "+" ? 1 : linearMatch[1] === "-" ? -1 : Number.parseFloat(linearMatch[1]) || 1;
      const b = linearMatch[2] ? Number.parseFloat(linearMatch[2].replace(/\s/g, "")) : 0;
      if (a !== 0) {
        return [-b / a];
      }
    }

    // Handle quadratic equations like ax^2 + bx + c = 0
    const quadraticRegex = new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}\\^2\\s*([+-]\\s*\\d*\\.?\\d*\\*?${variable})?\\s*([+-]\\s*\\d+\\.?\\d*)?`);
    const quadraticMatch = derivative.match(quadraticRegex);
    if (quadraticMatch) {
      const a = quadraticMatch[1] === "" || quadraticMatch[1] === "+" ? 1 : quadraticMatch[1] === "-" ? -1 : Number.parseFloat(quadraticMatch[1]) || 1;
      let b = 0;
      if (quadraticMatch[2]) {
        const bStr = quadraticMatch[2].replace(/\s/g, "").replace(variable, "").replace("*", "");
        b = bStr === "" || bStr === "+" ? 1 : bStr === "-" ? -1 : Number.parseFloat(bStr) || 0;
      }
      const c = quadraticMatch[3] ? Number.parseFloat(quadraticMatch[3].replace(/\s/g, "")) : 0;
      const discriminant = b * b - 4 * a * c;
      if (discriminant >= 0) {
        const sqrt = Math.sqrt(discriminant);
        return [(-b + sqrt) / (2 * a), (-b - sqrt) / (2 * a)];
      }
    }
    return [];
  } catch (err) {
    console.error("Solving error:", err);
    return [];
  }
};
const partialDerivative = (expression: string, variable: string): string => {
  try {
    const expr = parseExpression(expression);
    const terms = expr.split(/(?=[+-])/).filter(term => term.length > 0);
    const derivativeTerms: string[] = [];
    for (let term of terms) {
      term = term.trim();
      if (!term) continue;

      // Check if term contains the variable we're differentiating with respect to
      if (!term.includes(variable)) {
        // Term doesn't contain this variable - derivative is 0, skip
        continue;
      }

      // Handle terms with both x and y (like 6xy)
      if (variable === "x" && term.includes("y")) {
        // Extract coefficient of xy term
        const xyMatch = term.match(/([+-]?\d*\.?\d*)\*?x\*?y/);
        if (xyMatch) {
          const coeff = xyMatch[1] === "" || xyMatch[1] === "+" ? 1 : xyMatch[1] === "-" ? -1 : Number.parseFloat(xyMatch[1]) || 1;
          if (coeff === 1) derivativeTerms.push("y"); else if (coeff === -1) derivativeTerms.push("-y"); else derivativeTerms.push(`${coeff}*y`);
          continue;
        }
      }
      if (variable === "y" && term.includes("x")) {
        // Extract coefficient of xy term
        const xyMatch = term.match(/([+-]?\d*\.?\d*)\*?x\*?y/);
        if (xyMatch) {
          const coeff = xyMatch[1] === "" || xyMatch[1] === "+" ? 1 : xyMatch[1] === "-" ? -1 : Number.parseFloat(xyMatch[1]) || 1;
          if (coeff === 1) derivativeTerms.push("x"); else if (coeff === -1) derivativeTerms.push("-x"); else derivativeTerms.push(`${coeff}*x`);
          continue;
        }
      }

      // Handle power terms like ax^n
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
          if (newCoeff === 1) derivativeTerms.push(variable); else if (newCoeff === -1) derivativeTerms.push(`-${variable}`); else derivativeTerms.push(`${newCoeff}*${variable}`);
        } else {
          if (newCoeff === 1) derivativeTerms.push(`${variable}^${newPower}`); else if (newCoeff === -1) derivativeTerms.push(`-${variable}^${newPower}`); else derivativeTerms.push(`${newCoeff}*${variable}^${newPower}`);
        }
        continue;
      }

      // Handle linear terms like ax, x
      const linearMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}(?!\\^)`));
      if (linearMatch) {
        const coeff = linearMatch[1] === "" || linearMatch[1] === "+" ? 1 : linearMatch[1] === "-" ? -1 : Number.parseFloat(linearMatch[1]) || 1;
        if (coeff === 1) derivativeTerms.push("1"); else if (coeff === -1) derivativeTerms.push("-1"); else derivativeTerms.push(coeff.toString());
        continue;
      }
    }
    if (derivativeTerms.length === 0) return "0";

    // Join terms with proper signs
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
    console.error("Partial derivative error:", err);
    return `∂/∂${variable}[${expression}]`;
  }
};
const solveSystem = (eq1: string, eq2: string): Array<{
  x: number;
  y: number;
}> => {
  try {
    // Parse equations to extract coefficients
    const parseLinear = (eq: string) => {
      let a = 0,
        b = 0,
        c = 0;

      // Extract x coefficient
      const xMatch = eq.match(/([+-]?\d*\.?\d*)\*?x/);
      if (xMatch) {
        a = xMatch[1] === "" || xMatch[1] === "+" ? 1 : xMatch[1] === "-" ? -1 : Number.parseFloat(xMatch[1]) || 0;
      }

      // Extract y coefficient
      const yMatch = eq.match(/([+-]?\d*\.?\d*)\*?y/);
      if (yMatch) {
        b = yMatch[1] === "" || yMatch[1] === "+" ? 1 : yMatch[1] === "-" ? -1 : Number.parseFloat(yMatch[1]) || 0;
      }

      // Extract constant term
      const constMatch = eq.match(/([+-]?\d+\.?\d*)(?!\*[xy])/);
      if (constMatch) {
        c = -Number.parseFloat(constMatch[1]); // Move to right side
      }
      return {
        a,
        b,
        c
      };
    };
    const eq1Parsed = parseLinear(eq1);
    const eq2Parsed = parseLinear(eq2);

    // Solve using substitution method (like competitor)
    // From eq2: if we can solve for x or y directly
    if (eq2Parsed.a !== 0 && eq2Parsed.b === 0) {
      // eq2 is just ax + c = 0, so x = -c/a
      const x = eq2Parsed.c / eq2Parsed.a;
      // Substitute into eq1 to find y
      if (eq1Parsed.b !== 0) {
        const y = (eq1Parsed.c - eq1Parsed.a * x) / eq1Parsed.b;
        return [{
          x,
          y
        }];
      }
    }
    if (eq2Parsed.b !== 0 && eq2Parsed.a === 0) {
      // eq2 is just by + c = 0, so y = -c/b
      const y = eq2Parsed.c / eq2Parsed.b;
      // Substitute into eq1 to find x
      if (eq1Parsed.a !== 0) {
        const x = (eq1Parsed.c - eq1Parsed.b * y) / eq1Parsed.a;
        return [{
          x,
          y
        }];
      }
    }

    // General case: solve using Cramer's rule
    const det = eq1Parsed.a * eq2Parsed.b - eq1Parsed.b * eq2Parsed.a;
    if (Math.abs(det) < 1e-10) {
      return []; // No unique solution
    }
    const x = (eq1Parsed.c * eq2Parsed.b - eq1Parsed.b * eq2Parsed.c) / det;
    const y = (eq1Parsed.a * eq2Parsed.c - eq1Parsed.c * eq2Parsed.a) / det;
    return [{
      x,
      y
    }];
  } catch (err) {
    console.error("System solving error:", err);
    return [];
  }
};

interface CriticalPointCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function CriticalPointCalculatorClient({ content, guideContent }: CriticalPointCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "critical_point_calculator_0": "",
    "find_critical_points_of_singlevariable_or_multivar_1": "",
    "critical_point_finder_2": "",
    "enter_your_function_to_find_critical_points_automa_3": "",
    "function_4": "",
    "use_x_for_singlevariable_x_and_y_for_multivariable_5": "",
    "supported_sin_cos_tan_sqrt_log_ln_pi_e_6": "",
    "how_it_works_7": "",
    "if_your_function_only_uses_x_it_finds_fx_and_solve_8": "",
    "if_your_function_uses_x_and_y_it_finds_fx_fy_and_s_9": "",
    "calculate_10": "",
    "example_11": "",
    "critical_points_found_12": "",
    "x_13": "",
    "no_critical_points_found_14": ""
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [functionExpression, setFunctionExpression] = useState("3*x^2 + 4*x + 9");
  
  type Point2D = {
    x: number;
    y: number;
  };
  
  type SingleVariableResult = {
    type: "single";
    function: string;
    derivative: string;
    criticalPoints: number[];
    steps: string[];
  };
  
  type MultiVariableResult = {
    type: "multi";
    function: string;
    partialX: string;
    partialY: string;
    criticalPoints: Point2D[];
    steps: string[];
  };
  
  type CalculatorResult = SingleVariableResult | MultiVariableResult;
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const formatNumber = (value: number): string => {
    if (!isFinite(value) || isNaN(value)) return "undefined";
    const tolerance = 1e-10;
    for (let denom = 1; denom <= 20; denom++) {
      const num = Math.round(value * denom);
      if (Math.abs(value - num / denom) < tolerance) {
        if (denom === 1) return num.toString();
        if (num < 0) return `-${Math.abs(num)}/${denom}`;
        return `${num}/${denom}`;
      }
    }
    return Math.abs(value) < 1e-10 ? "0" : value.toFixed(4);
  };

  const formatPoint = (point: Point2D): string => {
    return `(${formatNumber(point.x)}, ${formatNumber(point.y)})`;
  };

  const calculateCriticalPoints = () => {
    setError("");
    if (!functionExpression.trim()) {
      setError("Please enter a function.");
      return;
    }
    try {
      const cleanedExpression = functionExpression.replace(/\^/g, "**").replace(/\s+/g, "").trim();
      const hasX = /(?:^|[^a-zA-Z])x(?:[^a-zA-Z]|$)/.test(cleanedExpression);
      const hasY = /(?:^|[^a-zA-Z])y(?:[^a-zA-Z]|$)/.test(cleanedExpression);
      
      if (hasX && hasY) {
        const partialX = partialDerivative(functionExpression, "x");
        const partialY = partialDerivative(functionExpression, "y");
        const criticalPoints = solveSystem(partialX, partialY);
        const steps = [`Step I: Calculate the first partial derivative w.r.t "x"`, `∂f/∂x = ${partialX}`, `Step II: Calculate the first partial derivative w.r.t "y"`, `∂f/∂y = ${partialY}`, `Step III: Set both partial derivatives equal to zero`, `${partialX} = 0`, `${partialY} = 0`, criticalPoints.length > 0 ? `Critical point(s): ${criticalPoints.map(p => formatPoint(p)).join(", ")}` : "No critical points found"];
        setResult({
          type: "multi",
          function: functionExpression,
          partialX,
          partialY,
          criticalPoints,
          steps
        });
      } else {
        const variable = hasX ? "x" : "y";
        const derivative = differentiate(functionExpression, variable);
        const criticalPoints = solveCriticalPoints(derivative, variable);
        const steps = [`Step I: Find the first derivative of the given function`, `f'(${variable}) = ${derivative}`, `Step II: Set the first derivative equal to zero and solve`, `${derivative} = 0`, criticalPoints.length > 0 ? `Critical point(s): ${variable} = ${criticalPoints.map(p => formatNumber(p)).join(", ")}` : "No critical points found"];
        setResult({
          type: "single",
          function: functionExpression,
          derivative,
          criticalPoints,
          steps
        });
      }
      setShowResult(true);
      scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    } catch (err) {
      setError("Calculation error. Please check your function syntax.");
      console.error("Calculation error:", err);
    }
  };

  const runExample = () => {
    setFunctionExpression("3*x^2 + 4*x + 9");
    setTimeout(() => calculateCriticalPoints(), 100);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Function className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Function className="w-6 h-6 text-orange-600" />
                      <span>{contentData.critical_point_finder_2}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_function_to_find_critical_points_automa_3}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {error && (
                      <Alert className="mb-6 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 h-4 text-red-600" />
                        <AlertDescription className="text-red-700">{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          {contentData.function_4}{" "}
                          <span className="text-gray-500">{contentData.use_x_for_singlevariable_x_and_y_for_multivariable_5}</span>
                        </Label>
                        <Input 
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm font-mono" 
                          type="text" 
                          value={functionExpression} 
                          onChange={e => setFunctionExpression(e.target.value)} 
                          placeholder="e.g., 3*x^2 + 4*x + 9" 
                        />
                        <p className="text-xs text-gray-500 mt-1">{contentData.supported_sin_cos_tan_sqrt_log_ln_pi_e_6}</p>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-gray-700">
                          <strong>{contentData.how_it_works_7}</strong>
                          <br />{contentData.if_your_function_only_uses_x_it_finds_fx_and_solve_8}
                          <br />{contentData.if_your_function_uses_x_and_y_it_finds_fx_fy_and_s_9}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Button onClick={calculateCriticalPoints} className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                        {contentData.calculate_10}
                      </Button>
                      <Button onClick={runExample} variant="outline" className="h-12 px-6 border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent">
                        {contentData.example_11}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-red-100 h-full flex flex-col justify-center items-center p-8 sticky top-24">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.critical_points_found_12}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center w-full">
                        <div className="space-y-3">
                          {result.type === "single" ? (
                            result.criticalPoints.length > 0 ? (
                              result.criticalPoints.map((point: number, index: number) => (
                                <div key={index} className="text-2xl font-bold text-orange-900">
                                  {contentData.x_13}{formatNumber(point)}
                                </div>
                              ))
                            ) : (
                              <p className="text-lg text-gray-600">{contentData.no_critical_points_found_14}</p>
                            )
                          ) : (
                            result.criticalPoints.length > 0 ? (
                              result.criticalPoints.map((point: Point2D, index: number) => (
                                <div key={index} className="text-xl font-bold text-orange-900">
                                  {formatPoint(point)}
                                </div>
                              ))
                            ) : (
                              <p className="text-lg text-gray-600">{contentData.no_critical_points_found_14}</p>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Function className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter function and click <span className="font-semibold text-orange-600">Calculate</span> to find critical points
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
                  calculatorName: "Scientific Calculator",
                  calculatorHref: "/maths/scientific-calculator",
                  calculatorDescription: "Calculate loan payments and schedules for any type of loan"
                }
              ]}
              color="orange"
              title="Related Math Calculators" 
            />

            <RatingProfileSection
              entityId="critical-point-calculator"
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
