"use client"
import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { Calculator } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/logo"

const buttons = [
  ["sin", "cos", "tan", "Deg/Rad", "AC"],
  ["sin-1", "cos-1", "tan-1", "π", "e"],
  ["xy", "x3", "x2", "ex", "10x"],
  ["y√x", "3√x", "√x", "ln", "log"],
  ["(", ")", "1/x", "%", "n!"],
  ["7", "8", "9", "+", "Back"],
  ["4", "5", "6", "–", "Ans"],
  ["1", "2", "3", "×", "M+"],
  ["0", ".", "EXP", "÷", "M-"],
  ["±", "RND", "Back", "=", "MC"],
]

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

function evaluate(expr: string, deg: boolean): string {
  try {
    let safeExpr = expr
      .replace(/π/g, `(${Math.PI})`)
      .replace(/e/g, `(${Math.E})`)
      .replace(/([0-9.]+)!/g, (_, n) => factorial(Number(n)).toString())
      .replace(/([0-9.]+)%/g, (_, n) => (Number(n) / 100).toString())
      .replace(/([0-9.]+)\^([0-9.]+)/g, (_, a, b) => `Math.pow(${a},${b})`)
      .replace(/([0-9.]+)x2/g, (_, a) => `Math.pow(${a},2)`)
      .replace(/([0-9.]+)x3/g, (_, a) => `Math.pow(${a},3)`)
      .replace(/([0-9.]+)xy([0-9.]+)/g, (_, a, b) => `Math.pow(${a},${b})`)
      .replace(/([0-9.]+)ex/g, (_, a) => `Math.exp(${a})`)
      .replace(/([0-9.]+)10x/g, (_, a) => `Math.pow(10,${a})`)
      .replace(/([0-9.]+)√x/g, (_, a) => `Math.sqrt(${a})`)
      .replace(/([0-9.]+)y√x([0-9.]+)/g, (_, a, b) => `Math.pow(${b},1/${a})`)
      .replace(/([0-9.]+)3√x/g, (_, a) => `Math.pow(${a},1/3)`)
      .replace(/sin-1\(([^)]+)\)/g, (_, x) => `Math.asin(${deg ? `(${x})*Math.PI/180` : x})${deg ? `*180/Math.PI` : ''}`)
      .replace(/cos-1\(([^)]+)\)/g, (_, x) => `Math.acos(${deg ? `(${x})*Math.PI/180` : x})${deg ? `*180/Math.PI` : ''}`)
      .replace(/tan-1\(([^)]+)\)/g, (_, x) => `Math.atan(${deg ? `(${x})*Math.PI/180` : x})${deg ? `*180/Math.PI` : ''}`)
      .replace(/sin\(([^)]+)\)/g, (_, x) => `Math.sin(${deg ? `(${x})*Math.PI/180` : x})`)
      .replace(/cos\(([^)]+)\)/g, (_, x) => `Math.cos(${deg ? `(${x})*Math.PI/180` : x})`)
      .replace(/tan\(([^)]+)\)/g, (_, x) => `Math.tan(${deg ? `(${x})*Math.PI/180` : x})`)
      .replace(/ln\(([^)]+)\)/g, (_, x) => `Math.log(${x})`)
      .replace(/log\(([^)]+)\)/g, (_, x) => `Math.log10(${x})`)
      .replace(/1\/x\(([^)]+)\)/g, (_, x) => `1/(${x})`)
      .replace(/EXP/g, 'e')
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/–/g, '-')
      .replace(/\+/g, '+')
      .replace(/RND/g, Math.random().toString())
    // eslint-disable-next-line no-eval
    const result = eval(safeExpr)
    return result.toString()
  } catch {
    return "Error"
  }
}

export default function ScientificCalculator() {
  const [expression, setExpression] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [deg, setDeg] = useState(true)
  const [memory, setMemory] = useState<string>("")
  const [ans, setAns] = useState<string>("")

  function handleClick(val: string) {
    if (val === "AC") {
      setExpression("")
      setResult(null)
    } else if (val === "Back") {
      setExpression(expression.slice(0, -1))
    } else if (val === "=") {
      const res = evaluate(expression, deg)
      setResult(res)
      setAns(res)
    } else if (["sin", "cos", "tan", "sin-1", "cos-1", "tan-1", "log", "ln", "√x", "y√x", "3√x", "x2", "x3", "xy", "ex", "10x", "1/x", "n!"].includes(val)) {
      if (["x2", "x3", "xy", "ex", "10x", "1/x", "n!", "√x", "y√x", "3√x"].includes(val)) {
        setExpression(expression + val)
      } else {
        setExpression(expression + val + "(")
      }
    } else if (val === "Deg/Rad") {
      setDeg(!deg)
    } else if (val === "Ans") {
      setExpression(expression + ans)
    } else if (val === "M+") {
      setMemory(expression)
    } else if (val === "M-") {
      setMemory("")
    } else if (val === "MC") {
      setMemory("")
    } else if (val === "RND") {
      setExpression(expression + "RND")
    } else {
      setExpression(expression + val)
    }
  }

  return (
    <>
      <Head>
        <title>Scientific Calculator - Smart Calculator</title>
        <meta name="description" content="Free scientific calculator for advanced math calculations. Supports trigonometry, powers, roots, and more." />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Scientific Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/maths" className="text-gray-500 hover:text-blue-600">
                Math
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Scientific Calculator</span>
            </div>
          </div>
        </nav>
        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Scientific Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Perform advanced math calculations including trigonometry, powers, roots, and more.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>Scientific Calculations</span>
                    </CardTitle>
                    <CardDescription className="text-base">Enter your expression or use the buttons below</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-center gap-4">
                      <Label className="text-base font-semibold">Expression</Label>
                      <Input type="text" value={expression} onChange={e => setExpression(e.target.value)} className="h-12 text-lg mt-2" placeholder="e.g. sin(30)+5^2" />
                      <span className="text-xs text-gray-500">{deg ? "DEG" : "RAD"}</span>
                      {memory && <span className="text-xs text-blue-600">M: {memory}</span>}
                    </div>
                    <div className="grid grid-cols-5 gap-2 mb-6">
                      {buttons.map((row, rIdx) => row.map((btn, i) => (
                        btn ? (
                          <Button key={rIdx + '-' + i} variant="outline" className="h-10 text-base" onClick={() => handleClick(btn)}>{btn}</Button>
                        ) : <div key={rIdx + '-' + i}></div>
                      )))}
                    </div>
                    <Button onClick={() => setResult(evaluate(expression, deg))} className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-blue-600">Calculate</Button>
                  </CardContent>
                </Card>
              </div>
              {/* Result Card (right side) */}
              <div className="">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-blue-200 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">Result</CardTitle>
                  </CardHeader>
                  <CardContent className="w-[90%] flex flex-col items-center justify-center">
                    {result !== null ? (
                      <div className="text-center">
                        <p className="text-lg text-gray-600 mb-2 font-medium">Calculated Value</p>
                        <p className="text-5xl w-[80%] font-extrabold text-blue-900 mb-2 drop-shadow-lg break-words whitespace-pre-wrap max-w-xs lg:max-w-sm xl:max-w-md mx-auto">{result}</p>
                        <div className="mt-2 text-sm text-gray-500">You can copy or use this value as needed.</div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Calculator className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">Enter an expression and click <span className="font-semibold text-blue-600">Calculate</span> to see result.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* How to use section below both cards */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col justify-center items-start p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mr-3 shadow-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight mb-2 text-left">How to use this calculator?</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-start justify-center">
                  <ul className="list-none w-full max-w-md mx-0 text-gray-700 space-y-4 text-base text-left">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">1</span>
                      <span>Type your math expression or use the buttons.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">2</span>
                      <span>Use functions like sin(x), cos(x), tan(x), log(x), √(x), ^ for powers, n! for factorial, π, e, memory, and more.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">3</span>
                      <span>Click <span className="font-semibold text-blue-600">Calculate</span> to see the result instantly.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">4</span>
                      <span>Use Deg/Rad toggle, Ans for last answer, memory buttons, and brackets for grouping.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        {/* Footer */}
      </div>
    </>
  )
}
