"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import { Search, X, Calculator, ArrowRight, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { calculators, getCalculatorFileName } from "@/lib/calculator-data"
import { calculatorsMeta } from "@/meta/calculators"

interface SearchBarProps {
  language?: string
}

export default function SearchBar({ language = "en" }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Memoize the localized calculators list
  const localizedCalculators = useMemo(() => {
    return calculators.map(calc => {
      // Get metadata for this calculator using the helper to resolve ID
      const metaKey = getCalculatorFileName(calc.id)
      const meta = calculatorsMeta[metaKey]

      // If we have metadata for the requested language, use it
      // Otherwise fall back to English or the default data
      if (meta) {
        const langMeta = meta[language] || meta['en']
        if (langMeta) {
          return {
            ...calc,
            name: langMeta.title,
            description: langMeta.description,
            href: langMeta.slug,
            // Keep other properties like category, id, popular
          }
        }
      }

      return calc
    })
  }, [language])

  const popularCalculators = useMemo(() =>
    localizedCalculators.filter((calc) => calc.popular),
    [localizedCalculators])

  const [filteredCalculators, setFilteredCalculators] = useState(popularCalculators)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCalculators(popularCalculators)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = localizedCalculators.filter(
        (calc) =>
          calc.name.toLowerCase().includes(query) ||
          calc.category.toLowerCase().includes(query) ||
          calc.description.toLowerCase().includes(query),
      )
      setFilteredCalculators(filtered)
    }
  }, [searchQuery, popularCalculators, localizedCalculators])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const firstMatch = filteredCalculators[0]
      if (firstMatch) {
        window.location.href = firstMatch.href
      }
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "financial":
        return "text-green-600 bg-green-50"
      case "health":
        return "text-red-500 bg-red-50"
      case "physics":
        return "text-purple-600 bg-purple-50"
      case "real-estate":
        return "text-orange-600 bg-orange-50"
      case "construction":
        return "text-amber-600 bg-amber-50"
      case "maths":
        return "text-blue-600 bg-blue-50"
      case "food":
        return "text-pink-600 bg-pink-50"
      case "sports":
        return "text-indigo-600 bg-indigo-50"
      case "other":
        return "text-gray-600 bg-gray-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  const placeholderText = language === 'br' ? "Pesquisar calculadora..." :
    language === 'pl' ? "Szukaj kalkulatora..." :
      language === 'de' ? "Rechner suchen..." :
        language === "es" ? "Buscar calculadora..." :
          "Search for any calculator..."

  return (
    <div
      className={`relative z-[50] w-full`}
      ref={searchRef}
    >
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}>
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full relative group"
        >
          <div className="relative flex-1">
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className={`relative flex items-center bg-white border-2 rounded-2xl transition-all duration-300 ${isFocused ? 'border-blue-500 shadow-xl shadow-blue-500/10' : 'border-gray-100 shadow-lg'}`}>
              <div className="pl-5">
                <Search
                  className={`w-6 h-6 transition-colors duration-300 ${isFocused ? 'text-blue-500' : 'text-gray-400'}`}
                />
              </div>
              
              <Input
                type="text"
                placeholder={placeholderText}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  setIsOpen(true)
                  setIsFocused(true)
                }}
                className="pl-4 pr-12 py-7 w-full bg-transparent border-0 shadow-none focus-visible:ring-0 text-lg text-gray-800 placeholder:text-gray-400 h-auto"
              />

              {searchQuery && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsOpen(false)
                      setSearchQuery("")
                    }}
                    className="h-9 w-9 p-0 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl bg-white/95 ring-1 ring-black/5">
              <CardContent className="p-0">
                <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                  {searchQuery.trim() === "" && (
                    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {
                          language === 'br' ? "Calculadoras Populares" :
                            language === 'pl' ? "Popularne Kalkulatory" :
                              language === 'de' ? "Beliebte Rechner" :
                                language === 'es' ? "Calculadoras Populares" :
                                  "Popular Tools"
                        }
                      </p>
                    </div>
                  )}

                  {filteredCalculators.length > 0 ? (
                    <div className="p-2">
                      {filteredCalculators.map((calc) => {
                        const style = getCategoryColor(calc.category)
                        return (
                          <Link
                            key={calc.id}
                            href={calc.href}
                            onClick={() => {
                              setIsOpen(false)
                              setSearchQuery("")
                            }}
                          >
                            <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${style.split(' ')[1]}`}>
                                <Calculator className={`w-6 h-6 ${style.split(' ')[0]}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-bold text-gray-900 text-base truncate pr-4">{calc.name}</p>
                                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-1">{calc.description}</p>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="px-6 py-16 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-900 font-semibold text-lg">
                        {
                          language === 'br' ? "Nenhuma calculadora encontrada" :
                            language === 'pl' ? "Nie znaleziono kalkulatorów" :
                              language === 'de' ? "Keine Rechner gefunden" :
                                language === "es" ? "No se encontraron calculadoras" :
                                  "No calculators found"
                        }
                      </p>
                      <p className="text-gray-500 mt-2">
                        {
                          language === 'br' ? "Tente pesquisar por termos diferentes" :
                            language === 'pl' ? "Spróbuj wyszukać inne hasła" :
                              language === 'de' ? "Versuchen Sie es mit anderen Begriffen" :
                                "Try adjusting your search terms"
                        }
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
