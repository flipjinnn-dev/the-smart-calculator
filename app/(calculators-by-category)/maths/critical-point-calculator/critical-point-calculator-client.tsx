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
  
  const contentData = content || {};
  

}
