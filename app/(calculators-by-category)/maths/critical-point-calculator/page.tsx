"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, FenceIcon as Function, AlertCircle, Download, Printer } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMobileScroll } from "@/hooks/useMobileScroll";
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
          if (newCoeff === 1) derivativeTerms.push(variable);else if (newCoeff === -1) derivativeTerms.push(`-${variable}`);else derivativeTerms.push(`${newCoeff}*${variable}`);
        } else {
          if (newCoeff === 1) derivativeTerms.push(`${variable}^${newPower}`);else if (newCoeff === -1) derivativeTerms.push(`-${variable}^${newPower}`);else derivativeTerms.push(`${newCoeff}*${variable}^${newPower}`);
        }
        continue;
      }

      // Handle linear terms like ax, x, -x, +x
      const linearMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}(?!\\^)`));
      if (linearMatch) {
        const coeff = linearMatch[1] === "" || linearMatch[1] === "+" ? 1 : linearMatch[1] === "-" ? -1 : Number.parseFloat(linearMatch[1]) || 1;
        if (coeff === 1) derivativeTerms.push("1");else if (coeff === -1) derivativeTerms.push("-1");else derivativeTerms.push(coeff.toString());
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
          if (coeff === 1) derivativeTerms.push("y");else if (coeff === -1) derivativeTerms.push("-y");else derivativeTerms.push(`${coeff}*y`);
          continue;
        }
      }
      if (variable === "y" && term.includes("x")) {
        // Extract coefficient of xy term
        const xyMatch = term.match(/([+-]?\d*\.?\d*)\*?x\*?y/);
        if (xyMatch) {
          const coeff = xyMatch[1] === "" || xyMatch[1] === "+" ? 1 : xyMatch[1] === "-" ? -1 : Number.parseFloat(xyMatch[1]) || 1;
          if (coeff === 1) derivativeTerms.push("x");else if (coeff === -1) derivativeTerms.push("-x");else derivativeTerms.push(`${coeff}*x`);
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
          if (newCoeff === 1) derivativeTerms.push(variable);else if (newCoeff === -1) derivativeTerms.push(`-${variable}`);else derivativeTerms.push(`${newCoeff}*${variable}`);
        } else {
          if (newCoeff === 1) derivativeTerms.push(`${variable}^${newPower}`);else if (newCoeff === -1) derivativeTerms.push(`-${variable}^${newPower}`);else derivativeTerms.push(`${newCoeff}*${variable}^${newPower}`);
        }
        continue;
      }

      // Handle linear terms like ax, x
      const linearMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}(?!\\^)`));
      if (linearMatch) {
        const coeff = linearMatch[1] === "" || linearMatch[1] === "+" ? 1 : linearMatch[1] === "-" ? -1 : Number.parseFloat(linearMatch[1]) || 1;
        if (coeff === 1) derivativeTerms.push("1");else if (coeff === -1) derivativeTerms.push("-1");else derivativeTerms.push(coeff.toString());
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
export default function CriticalPointCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('critical-point-calculator', language, "calculator-ui");

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
    "no_critical_points_found_14": "",
    "no_critical_points_found_15": "",
    "pdf_16": "",
    "print_17": "",
    "enter_function_and_click_18": "",
    "calculate_19": "",
    "to_find_critical_points_20": "",
    "critical_points_found_21": "",
    "x_22": "",
    "no_critical_points_found_23": "",
    "no_critical_points_found_24": "",
    "pdf_25": "",
    "print_26": "",
    "enter_function_and_click_27": "",
    "calculate_28": "",
    "to_find_critical_points_29": "",
    "stepbystep_process_30": "",
    "calculate_the_critical_point_of_31": "",
    "step_i_find_the_first_derivative_of_the_given_func_32": "",
    "fx_33": "",
    "fx_34": "",
    "step_ii_set_the_first_derivative_equal_to_zero_and_35": "",
    "fx_0_36": "",
    "k_0_37": "",
    "x_38": "",
    "hence_the_critical_points_of_the_given_function_x_39": "",
    "calculate_the_critical_points_of_40": "",
    "step_i_calculate_the_first_partial_derivative_wrt__41": "",
    "fx_42": "",
    "step_ii_calculate_the_first_partial_derivative_wrt_43": "",
    "fy_44": "",
    "step_iii_set_both_partial_derivatives_equal_to_zer_45": "",
    "for_fx_46": "",
    "k_0_47": "",
    "for_fy_48": "",
    "k_0_49": "",
    "critical_point_50": "",
    "hence_the_critical_points_of_the_given_function_ar_51": "",
    "how_to_find_critical_points_step_by_step_52": "",
    "for_singlevariable_functions_fx_53": "",
    "find_the_first_derivative_fx_54": "",
    "set_fx_0_and_solve_for_x_55": "",
    "find_points_where_fx_is_undefined_56": "",
    "list_all_critical_points_57": "",
    "for_multivariable_functions_fxy_58": "",
    "find_partial_derivatives_fx_and_fy_59": "",
    "set_both_partial_derivatives_equal_to_zero_60": "",
    "solve_the_system_of_equations_simultaneously_61": "",
    "check_for_points_where_partials_are_undefined_62": "",
    "single_variable_functions_example_63": "",
    "example_64": "",
    "find_critical_points_of_fx_3x_4x_9_65": "",
    "step_1_66": "",
    "fx_3x_4x_9_67": "",
    "step_2_68": "",
    "fx_6x_4_69": "",
    "step_3_70": "",
    "set_fx_0_6x_4_0_71": "",
    "step_4_72": "",
    "solve_6x_4_x_46_23_73": "",
    "step_5_74": "",
    "critical_point_23_06667_75": "",
    "the_function_has_one_critical_point_at_x_23_where__76": "",
    "multivariable_functions_example_77": "",
    "example_78": "",
    "find_critical_points_of_fxy_4x_6xy_8y_79": "",
    "step_1_80": "",
    "fxy_4x_6xy_8y_81": "",
    "step_2_82": "",
    "fx_8x_6y_83": "",
    "step_3_84": "",
    "fy_6x_8_85": "",
    "step_4_86": "",
    "solve_system_87": "",
    "k_8x_6y_0_88": "",
    "k_6x_8_0_89": "",
    "step_5_90": "",
    "from_equation_2_x_86_43_91": "",
    "step_6_92": "",
    "substitute_843_6y_0_y_169_93": "",
    "step_7_94": "",
    "critical_point_43_169_13333_17778_95": "",
    "the_function_has_one_critical_point_at_43_169_wher_96": "",
    "faq_section_97": "",
    "what_is_a_critical_point_98": "",
    "a_critical_point_is_a_point_in_the_domain_of_a_fun_99": "",
    "how_do_you_find_critical_points_100": "",
    "for_singlevariable_functions_find_fx_and_solve_fx__101": "",
    "why_are_critical_points_important_102": "",
    "critical_points_help_identify_local_extrema_maxima_103": "",
    "whats_the_difference_between_critical_points_and_i_104": "",
    "critical_points_occur_where_fx_0_or_is_undefined_w_105": "",
    "disclaimer_106": "",
    "this_tool_is_for_educational_use_only_verify_resul_107": "",
    "smart_calculator_0": "",
    "critical_point_calculator_1": "",
    "home_2": "",
    "math_calculators_3": "",
    "critical_point_calculator_4": "",
    "critical_point_calculator_5": "",
    "find_critical_points_of_singlevariable_or_multivar_6": "",
    "critical_point_finder_7": "",
    "enter_your_function_to_find_critical_points_automa_8": "",
    "function_9": "",
    "use_x_for_singlevariable_x_and_y_for_multivariable_10": "",
    "supported_sin_cos_tan_sqrt_log_ln_pi_e_11": "",
    "how_it_works_12": "",
    "if_your_function_only_uses_x_it_finds_fx_and_solve_13": "",
    "if_your_function_uses_x_and_y_it_finds_fx_fy_and_s_14": "",
    "calculate_15": "",
    "example_16": "",
    "critical_points_found_17": "",
    "x_18": "",
    "no_critical_points_found_19": "",
    "no_critical_points_found_20": "",
    "pdf_21": "",
    "print_22": "",
    "enter_function_and_click_23": "",
    "calculate_24": "",
    "to_find_critical_points_25": "",
    "critical_points_found_26": "",
    "x_27": "",
    "no_critical_points_found_28": "",
    "no_critical_points_found_29": "",
    "pdf_30": "",
    "print_31": "",
    "enter_function_and_click_32": "",
    "calculate_33": "",
    "to_find_critical_points_34": "",
    "stepbystep_process_35": "",
    "calculate_the_critical_point_of_36": "",
    "step_i_find_the_first_derivative_of_the_given_func_37": "",
    "fx_38": "",
    "fx_39": "",
    "step_ii_set_the_first_derivative_equal_to_zero_and_40": "",
    "fx_0_41": "",
    "k_0_42": "",
    "x_43": "",
    "hence_the_critical_points_of_the_given_function_x_44": "",
    "calculate_the_critical_points_of_45": "",
    "step_i_calculate_the_first_partial_derivative_wrt__46": "",
    "fx_47": "",
    "step_ii_calculate_the_first_partial_derivative_wrt_48": "",
    "fy_49": "",
    "step_iii_set_both_partial_derivatives_equal_to_zer_50": "",
    "for_fx_51": "",
    "k_0_52": "",
    "for_fy_53": "",
    "k_0_54": "",
    "critical_point_55": "",
    "hence_the_critical_points_of_the_given_function_ar_56": "",
    "how_to_find_critical_points_step_by_step_57": "",
    "for_singlevariable_functions_fx_58": "",
    "find_the_first_derivative_fx_59": "",
    "set_fx_0_and_solve_for_x_60": "",
    "find_points_where_fx_is_undefined_61": "",
    "list_all_critical_points_62": "",
    "for_multivariable_functions_fxy_63": "",
    "find_partial_derivatives_fx_and_fy_64": "",
    "set_both_partial_derivatives_equal_to_zero_65": "",
    "solve_the_system_of_equations_simultaneously_66": "",
    "check_for_points_where_partials_are_undefined_67": "",
    "single_variable_functions_example_68": "",
    "example_69": "",
    "find_critical_points_of_fx_3x_4x_9_70": "",
    "step_1_71": "",
    "fx_3x_4x_9_72": "",
    "step_2_73": "",
    "fx_6x_4_74": "",
    "step_3_75": "",
    "set_fx_0_6x_4_0_76": "",
    "step_4_77": "",
    "solve_6x_4_x_46_23_78": "",
    "step_5_79": "",
    "critical_point_23_06667_80": "",
    "the_function_has_one_critical_point_at_x_23_where__81": "",
    "multivariable_functions_example_82": "",
    "example_83": "",
    "find_critical_points_of_fxy_4x_6xy_8y_84": "",
    "step_1_85": "",
    "fxy_4x_6xy_8y_86": "",
    "step_2_87": "",
    "fx_8x_6y_88": "",
    "step_3_89": "",
    "fy_6x_8_90": "",
    "step_4_91": "",
    "solve_system_92": "",
    "k_8x_6y_0_93": "",
    "k_6x_8_0_94": "",
    "step_5_95": "",
    "from_equation_2_x_86_43_96": "",
    "step_6_97": "",
    "substitute_843_6y_0_y_169_98": "",
    "step_7_99": "",
    "critical_point_43_169_13333_17778_100": "",
    "the_function_has_one_critical_point_at_43_169_wher_101": "",
    "faq_section_102": "",
    "what_is_a_critical_point_103": "",
    "a_critical_point_is_a_point_in_the_domain_of_a_fun_104": "",
    "how_do_you_find_critical_points_105": "",
    "for_singlevariable_functions_find_fx_and_solve_fx__106": "",
    "why_are_critical_points_important_107": "",
    "critical_points_help_identify_local_extrema_maxima_108": "",
    "whats_the_difference_between_critical_points_and_i_109": "",
    "critical_points_occur_where_fx_0_or_is_undefined_w_110": "",
    "disclaimer_111": "",
    "this_tool_is_for_educational_use_only_verify_resul_112": ""
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

    // Check if it's a simple fraction
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
  const runSingleExample = () => {
    setFunctionExpression("3*x^2 + 4*x + 9");
    setTimeout(() => calculateCriticalPoints(), 100);
  };
  const runMultiExample = () => {
    setFunctionExpression("4*x^2 + 6*x*y + 8*y");
    setTimeout(() => calculateCriticalPoints(), 100);
  };
  const exportToPDF = () => {
    window.print();
  };
  return <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Function className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.critical_point_calculator_0}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.find_critical_points_of_singlevariable_or_multivar_1}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
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
                    {error && <Alert className="mb-6 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">{error}</AlertDescription>
                      </Alert>}

                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.function_4}{" "}
                          <span className="text-gray-500">{contentData.use_x_for_singlevariable_x_and_y_for_multivariable_5}</span>
                        </Label>
                        <Input className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm font-mono" type="text" value={functionExpression} onChange={e => setFunctionExpression(e.target.value)} placeholder="e.g., 3*x^2 + 4*x + 9" />
                        <p className="text-xs text-gray-500 mt-1">{contentData.supported_sin_cos_tan_sqrt_log_ln_pi_e_6}</p>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-gray-700">
                          <strong>{contentData.how_it_works_7}</strong>
                          <br />{contentData.if_your_function_only_uses_x_it_finds_fx_and_solve_8}<br />{contentData.if_your_function_uses_x_and_y_it_finds_fx_fy_and_s_9}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Button onClick={calculateCriticalPoints} className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">{contentData.calculate_10}</Button>
                      <Button onClick={() => {
                      if (/y/.test(functionExpression)) {
                        runMultiExample();
                      } else {
                        runSingleExample();
                      }
                    }} variant="outline" className="h-12 px-6 border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent">{contentData.example_11}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Result Card */}
              <div ref={resultsRef} className="lg:hidden" id="results">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-red-100 p-6 mb-6">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.critical_points_found_12}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center w-full">
                        <div className="space-y-3">
                          {result.type === "single" ? result.criticalPoints.length > 0 ? result.criticalPoints.map((point: number, index: number) => <div key={index} className="text-2xl font-bold text-orange-900">{contentData.x_13}{formatNumber(point)}
                                </div>) : <p className="text-lg text-gray-600">{contentData.no_critical_points_found_14}</p> : result.criticalPoints.length > 0 ? result.criticalPoints.map((point: Point2D, index: number) => <div key={index} className="text-xl font-bold text-orange-900">
                                {formatPoint(point)}
                              </div>) : <p className="text-lg text-gray-600">{contentData.no_critical_points_found_15}</p>}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button onClick={exportToPDF} size="sm" variant="outline" className="border-orange-200 text-orange-700 bg-transparent">
                            <Download className="w-4 h-4 mr-1" />{contentData.pdf_16}</Button>
                          <Button onClick={() => window.print()} size="sm" variant="outline" className="border-orange-200 text-orange-700">
                            <Printer className="w-4 h-4 mr-1" />{contentData.print_17}</Button>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Function className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_function_and_click_18}<span className="font-semibold text-orange-600">{contentData.calculate_19}</span>{contentData.to_find_critical_points_20}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>

              {/* Desktop Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-red-100 h-full flex flex-col justify-center items-center p-8 sticky top-24">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.critical_points_found_21}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center w-full">
                        <div className="space-y-3">
                          {result.type === "single" ? result.criticalPoints.length > 0 ? result.criticalPoints.map((point: number, index: number) => <div key={index} className="text-2xl font-bold text-orange-900">{contentData.x_22}{formatNumber(point)}
                                </div>) : <p className="text-lg text-gray-600">{contentData.no_critical_points_found_23}</p> : result.criticalPoints.length > 0 ? result.criticalPoints.map((point: Point2D, index: number) => <div key={index} className="text-xl font-bold text-orange-900">
                                {formatPoint(point)}
                              </div>) : <p className="text-lg text-gray-600">{contentData.no_critical_points_found_24}</p>}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button onClick={exportToPDF} size="sm" variant="outline" className="border-orange-200 text-orange-700 bg-transparent">
                            <Download className="w-4 h-4 mr-1" />{contentData.pdf_25}</Button>
                          <Button onClick={() => window.print()} size="sm" variant="outline" className="border-orange-200 text-orange-700">
                            <Printer className="w-4 h-4 mr-1" />{contentData.print_26}</Button>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Function className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_function_and_click_27}<span className="font-semibold text-orange-600">{contentData.calculate_28}</span>{contentData.to_find_critical_points_29}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step-by-step breakdown */}
            {showResult && result && <div className="mt-12">
                <Card className="shadow-xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b px-8 py-6">
                    <CardTitle className="text-xl font-bold text-orange-700">{contentData.stepbystep_process_30}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      {result.type === "single" ? <div className="text-lg space-y-6">
                          <p className="font-semibold">{contentData.calculate_the_critical_point_of_31}{result.function}</p>

                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">{contentData.step_i_find_the_first_derivative_of_the_given_func_32}</p>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>{contentData.fx_33}{result.function}</p>
                                <p>{contentData.fx_34}{result.derivative}</p>
                              </div>
                            </div>

                            <div>
                              <p className="font-semibold">{contentData.step_ii_set_the_first_derivative_equal_to_zero_and_35}</p>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>{contentData.fx_0_36}</p>
                                <p>{result.derivative}{contentData.k_0_37}</p>
                                {result.criticalPoints.length > 0 && <p>{contentData.x_38}{result.criticalPoints.map(p => formatNumber(p)).join(", ")}</p>}
                              </div>
                            </div>

                            <div>
                              <p className="font-semibold">{contentData.hence_the_critical_points_of_the_given_function_x_39}{" "}
                                {result.criticalPoints.length > 0 ? result.criticalPoints.map(p => formatNumber(p)).join(", ") : "No critical points found"}
                              </p>
                            </div>
                          </div>
                        </div> : <div className="text-lg space-y-6">
                          <p className="font-semibold">{contentData.calculate_the_critical_points_of_40}{result.function}</p>

                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">{contentData.step_i_calculate_the_first_partial_derivative_wrt__41}</p>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>{contentData.fx_42}{result.partialX}</p>
                              </div>
                            </div>

                            <div>
                              <p className="font-semibold">{contentData.step_ii_calculate_the_first_partial_derivative_wrt_43}</p>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>{contentData.fy_44}{result.partialY}</p>
                              </div>
                            </div>

                            <div>
                              <p className="font-semibold">{contentData.step_iii_set_both_partial_derivatives_equal_to_zer_45}</p>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>{contentData.for_fx_46}{result.partialX}{contentData.k_0_47}</p>
                                <p>{contentData.for_fy_48}{result.partialY}{contentData.k_0_49}</p>
                                {result.criticalPoints.length > 0 && result.criticalPoints.map((point: Point2D, index: number) => <p key={index}>{contentData.critical_point_50}{formatPoint(point)}</p>)}
                              </div>
                            </div>

                            <div>
                              <p className="font-semibold">{contentData.hence_the_critical_points_of_the_given_function_ar_51}{" "}
                                {result.criticalPoints.length > 0 ? result.criticalPoints.map(p => formatPoint(p)).join(", ") : "No critical points found"}
                              </p>
                            </div>
                          </div>
                        </div>}
                    </div>
                  </CardContent>
                </Card>
              </div>}

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* How to Find Critical Points */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">{contentData.how_to_find_critical_points_step_by_step_52}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{contentData.for_singlevariable_functions_fx_53}</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                        <li>{contentData.find_the_first_derivative_fx_54}</li>
                        <li>{contentData.set_fx_0_and_solve_for_x_55}</li>
                        <li>{contentData.find_points_where_fx_is_undefined_56}</li>
                        <li>{contentData.list_all_critical_points_57}</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{contentData.for_multivariable_functions_fxy_58}</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                        <li>{contentData.find_partial_derivatives_fx_and_fy_59}</li>
                        <li>{contentData.set_both_partial_derivatives_equal_to_zero_60}</li>
                        <li>{contentData.solve_the_system_of_equations_simultaneously_61}</li>
                        <li>{contentData.check_for_points_where_partials_are_undefined_62}</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Single Variable Example */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">{contentData.single_variable_functions_example_63}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <strong>{contentData.example_64}</strong>{contentData.find_critical_points_of_fx_3x_4x_9_65}</p>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2 font-mono text-sm">
                        <p>
                          <strong>{contentData.step_1_66}</strong>{contentData.fx_3x_4x_9_67}</p>
                        <p>
                          <strong>{contentData.step_2_68}</strong>{contentData.fx_6x_4_69}</p>
                        <p>
                          <strong>{contentData.step_3_70}</strong>{contentData.set_fx_0_6x_4_0_71}</p>
                        <p>
                          <strong>{contentData.step_4_72}</strong>{contentData.solve_6x_4_x_46_23_73}</p>
                        <p>
                          <strong>{contentData.step_5_74}</strong>{contentData.critical_point_23_06667_75}</p>
                      </div>
                    </div>

                    <p className="text-gray-700">{contentData.the_function_has_one_critical_point_at_x_23_where__76}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Multivariable Example */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">{contentData.multivariable_functions_example_77}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <strong>{contentData.example_78}</strong>{contentData.find_critical_points_of_fxy_4x_6xy_8y_79}</p>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2 font-mono text-sm">
                        <p>
                          <strong>{contentData.step_1_80}</strong>{contentData.fxy_4x_6xy_8y_81}</p>
                        <p>
                          <strong>{contentData.step_2_82}</strong>{contentData.fx_8x_6y_83}</p>
                        <p>
                          <strong>{contentData.step_3_84}</strong>{contentData.fy_6x_8_85}</p>
                        <p>
                          <strong>{contentData.step_4_86}</strong>{contentData.solve_system_87}</p>
                        <p className="ml-4">{contentData.k_8x_6y_0_88}</p>
                        <p className="ml-4">{contentData.k_6x_8_0_89}</p>
                        <p>
                          <strong>{contentData.step_5_90}</strong>{contentData.from_equation_2_x_86_43_91}</p>
                        <p>
                          <strong>{contentData.step_6_92}</strong>{contentData.substitute_843_6y_0_y_169_93}</p>
                        <p>
                          <strong>{contentData.step_7_94}</strong>{contentData.critical_point_43_169_13333_17778_95}</p>
                      </div>
                    </div>

                    <p className="text-gray-700">{contentData.the_function_has_one_critical_point_at_43_169_wher_96}</p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">{contentData.faq_section_97}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{contentData.what_is_a_critical_point_98}</h3>
                      <p className="text-gray-700">{contentData.a_critical_point_is_a_point_in_the_domain_of_a_fun_99}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{contentData.how_do_you_find_critical_points_100}</h3>
                      <p className="text-gray-700">{contentData.for_singlevariable_functions_find_fx_and_solve_fx__101}</p>
                    </div>

                    <div> 
                      <h3 className="font-semibold text-gray-900 mb-2">{contentData.why_are_critical_points_important_102}</h3>
                      <p className="text-gray-700">{contentData.critical_points_help_identify_local_extrema_maxima_103}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{contentData.whats_the_difference_between_critical_points_and_i_104}</h3>
                      <p className="text-gray-700">{contentData.critical_points_occur_where_fx_0_or_is_undefined_w_105}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>{contentData.disclaimer_106}</strong>{contentData.this_tool_is_for_educational_use_only_verify_resul_107}</p>
            </div>
          </div>
        </main>
      </div>
    </>;
}