"use client"

import { useState } from "react"
import { Calculator, X, ChevronRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const buttons = [
  ["C", "÷", "×", "←"],
  ["7", "8", "9", "−"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "="],
  ["±", "0", "."]
]

const scientificButtons = [
  ["sin", "cos", "tan", "π"],
  ["√", "x²", "^", "log"],
  ["(", ")", "%", "e"]
]

const translations = {
  en: {
    title: "Try Our Scientific Calculator",
    subtitle: "Perform complex calculations instantly with our powerful scientific calculator",
    showScientific: "Show Scientific",
    hideScientific: "Hide Scientific",
    fullCalculatorLink: "Full Calculator",
    needMore: "Need more features? Try our full-featured scientific calculator",
    openFull: "Open Full Scientific Calculator"
  },
  br: {
    title: "Experimente Nossa Calculadora Científica",
    subtitle: "Realize cálculos complexos instantaneamente com nossa poderosa calculadora científica",
    showScientific: "Mostrar Científica",
    hideScientific: "Ocultar Científica",
    fullCalculatorLink: "Calculadora Completa",
    needMore: "Precisa de mais recursos? Experimente nossa calculadora científica completa",
    openFull: "Abrir Calculadora Científica Completa"
  },
  pl: {
    title: "Wypróbuj Nasz Kalkulator Naukowy",
    subtitle: "Wykonuj skomplikowane obliczenia natychmiast dzięki naszemu potężnemu kalkulatorowi naukowemu",
    showScientific: "Pokaż Naukowy",
    hideScientific: "Ukryj Naukowy",
    fullCalculatorLink: "Pełny Kalkulator",
    needMore: "Potrzebujesz więcej funkcji? Wypróbuj nasz w pełni funkcjonalny kalkulator naukowy",
    openFull: "Otwórz Pełny Kalkulator Naukowy"
  },
  de: {
    title: "Testen Sie unseren wissenschaftlichen Rechner",
    subtitle: "Führen Sie komplexe Berechnungen sofort mit unserem leistungsstarken wissenschaftlichen Rechner durch",
    showScientific: "Wissenschaftlich anzeigen",
    hideScientific: "Wissenschaftlich ausblenden",
    fullCalculatorLink: "Vollständiger Rechner",
    needMore: "Benötigen Sie weitere Funktionen? Probieren Sie unseren voll ausgestatteten wissenschaftlichen Rechner",
    openFull: "Vollständigen Rechner öffnen"
  },
  es: {
    title: "Prueba Nuestra Calculadora Científica",
    subtitle: "Realiza cálculos complejos al instante con nuestra potente calculadora científica",
    showScientific: "Mostrar Científica",
    hideScientific: "Ocultar Científica",
    fullCalculatorLink: "Calculadora Completa",
    needMore: "¿Necesitas más funciones? Prueba nuestra calculadora científica completa",
    openFull: "Abrir Calculadora Científica Completa"
  }
}

function evaluate(expr: string): string {
  try {
    let safeExpr = expr
      .replace(/π/g, `(${Math.PI})`)
      .replace(/e(?![0-9])/g, `(${Math.E})`)
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/−/g, '-')
      .replace(/√(\d+\.?\d*)/g, 'Math.sqrt($1)')
      .replace(/(\d+\.?\d*)²/g, 'Math.pow($1,2)')
      .replace(/sin\(([^)]+)\)/g, 'Math.sin(($1)*Math.PI/180)')
      .replace(/cos\(([^)]+)\)/g, 'Math.cos(($1)*Math.PI/180)')
      .replace(/tan\(([^)]+)\)/g, 'Math.tan(($1)*Math.PI/180)')
      .replace(/log\(([^)]+)\)/g, 'Math.log10($1)')
      .replace(/(\d+\.?\d*)%/g, '($1/100)')
    
    // eslint-disable-next-line no-eval
    const result = eval(safeExpr)
    
    if (!Number.isFinite(result)) return "Error"
    
    // Format number to avoid long decimals but keep precision
    return Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString()
  } catch {
    return "Error"
  }
}

interface HomepageScientificCalculatorProps {
  language?: string
}

export default function HomepageScientificCalculator({ language = "en" }: HomepageScientificCalculatorProps) {
  const [display, setDisplay] = useState("0")
  const [showScientific, setShowScientific] = useState(false)
  const t = translations[language as keyof typeof translations] || translations.en

  const handleClick = (value: string) => {
    if (value === "C") {
      setDisplay("0")
    } else if (value === "←") {
      setDisplay(display.length > 1 ? display.slice(0, -1) : "0")
    } else if (value === "=") {
      const result = evaluate(display)
      setDisplay(result)
    } else if (value === "±") {
      if (display !== "0" && display !== "Error") {
        setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display)
      }
    } else if (["sin", "cos", "tan", "log"].includes(value)) {
      setDisplay(display === "0" ? value + "(" : display + value + "(")
    } else if (value === "√") {
      setDisplay(display === "0" ? "√" : display + "√")
    } else if (value === "x²") {
      setDisplay(display + "²")
    } else {
      setDisplay(display === "0" && value !== "." ? value : display + value)
    }
  }

  return (
    <div className="w-full max-w-[400px] md:max-w-[440px] mx-auto transform hover:scale-[1.02] transition-transform duration-500">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-[2.5rem] opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500"></div>
        <Card className="relative bg-[#0f172a]/95 backdrop-blur-xl shadow-2xl border-0 ring-1 ring-white/10 rounded-[2.25rem] overflow-hidden">
          {/* Display Screen */}
          <div className="bg-[#020617] p-6 pb-4 relative border-b border-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>
            
            <div className="bg-[#1e293b]/50 rounded-2xl p-5 mb-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] border border-white/5 relative overflow-hidden min-h-[100px] flex flex-col justify-between group/display">
              {/* LCD Glare Effect */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 blur-3xl rounded-full pointer-events-none"></div>
              
              <div className="text-right">
                <span className="text-cyan-500/70 text-xs font-mono mb-1 block h-4 opacity-0 group-hover/display:opacity-100 transition-opacity">
                  {display === "0" ? "" : "Ans"}
                </span>
                <div className="text-4xl md:text-5xl font-mono font-medium text-white tracking-wider break-all text-right drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                  {display}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center px-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowScientific(!showScientific)}
                className="text-gray-400 hover:text-white hover:bg-white/10 text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 rounded-lg h-7"
              >
                {showScientific ? (
                  <span className="flex items-center gap-1.5">
                    <X className="w-3 h-3" />
                    {t.hideScientific}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Calculator className="w-3 h-3" />
                    {t.showScientific}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Scientific Buttons */}
          <div className={`transition-all duration-300 ease-in-out bg-[#0f172a] border-b border-white/5 ${showScientific ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="p-3 grid grid-cols-4 gap-2">
              {scientificButtons.flat().map((btn, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleClick(btn)}
                  className="h-9 text-xs font-bold text-gray-300 bg-gray-800/50 border-0 hover:bg-gray-700/80 active:scale-95 transition-all duration-200 rounded-lg"
                >
                  {btn}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Buttons */}
          <div className="p-5 bg-[#0f172a]">
            <div className="grid grid-cols-4 gap-2.5 md:gap-3">
              {buttons.flat().map((btn, idx) => {
                const isOperator = ["÷", "×", "−", "+", "="].includes(btn)
                const isSpecial = ["C", "←"].includes(btn)
                const isEquals = btn === "="
                
                return (
                  <Button
                    key={idx}
                    onClick={() => handleClick(btn)}
                    className={`
                      h-14 md:h-16 text-lg md:text-xl font-medium rounded-xl transition-all duration-200 active:scale-95 shadow-lg border-0
                      ${isOperator && !isEquals
                        ? "bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:text-blue-300"
                        : isSpecial
                        ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                        : isEquals
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-blue-900/20 row-span-2"
                        : "bg-gray-800/80 text-white hover:bg-gray-700 hover:text-white shadow-black/20"
                      }
                    `}
                    style={isEquals ? { gridRow: "span 2", height: "auto" } : {}}
                  >
                    {btn === "←" ? <RotateCcw className="w-4 h-4" /> : btn}
                  </Button>
                )
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
