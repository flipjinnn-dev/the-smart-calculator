"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import { Search, X, Calculator } from "lucide-react"
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
        return "text-green-600"
      case "health":
        return "text-red-500"
      case "physics":
        return "text-purple-600"
      case "real-estate":
        return "text-orange-600"
      case "construction":
        return "text-amber-600"
      case "maths":
        return "text-blue-600"
      case "food":
        return "text-pink-600"
      case "sports":
        return "text-indigo-600"
      case "other":
        return "text-gray-600"
      default:
        return "text-blue-600"
    }
  }

  return (
    <div
      className={`relative z-[2147483647]`}
      ref={searchRef}
    >
      <div className="relative">
        <form
          onSubmit={handleSearch}
          className="flex items-center space-x-2 w-full"
          style={{ minWidth: 0 }}
        >
          <div className="relative flex-1">
            <Search
              className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 md:text-gray-400"
              onClick={() => setIsOpen(true)}
              style={{ cursor: 'pointer' }}
            />
            <Input
              type="text"
              placeholder={
                language === 'br' ? "Pesquisar calculadora..." :
                  language === 'pl' ? "Szukaj kalkulatora..." :
                    language === 'de' ? "Rechner suchen..." :
                      "Search calculator..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              className="pl-12 pr-4 py-3 w-full bg-gray-100 border-0 rounded-xl shadow-none focus:ring-2 focus:ring-blue-500 text-base font-medium md:w-96 md:bg-white md:border-gray-300 md:rounded-2xl md:shadow-lg md:py-4"
              style={{ minWidth: 0 }}
            />
          </div>
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsOpen(false)
                setSearchQuery("")
              }}
              className="hover:bg-gray-100 rounded-xl p-3 md:rounded-2xl"
              tabIndex={-1}
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </form>

        {isOpen && (
          <Card
            className="absolute top-full left-0 right-0 mt-2 z-[2147483647] shadow-2xl border-0 rounded-2xl overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {searchQuery.trim() === "" && (
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                    <p className="text-sm font-bold text-gray-700">
                      {
                        language === 'br' ? "Calculadoras Populares" :
                          language === 'pl' ? "Popularne Kalkulatory" :
                            language === 'de' ? "Beliebte Rechner" :
                              "Popular Calculators"
                      }
                    </p>
                  </div>
                )}

                {filteredCalculators.length > 0 ? (
                  filteredCalculators.map((calc) => (
                    <Link
                      key={calc.id}
                      href={calc.href}
                      onClick={() => {
                        setIsOpen(false)
                        setSearchQuery("")
                      }}
                    >
                      <div className="flex items-center space-x-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0">
                        <div className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center`}>
                          <Calculator className={`w-5 h-5 ${getCategoryColor(calc.category)}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-base">{calc.name}</p>
                          <p className="text-sm text-gray-500">{calc.category}</p>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1">{calc.description}</p>
                        </div>
                        <Search className="w-4 h-4 text-gray-400" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">
                      {
                        language === 'br' ? "Nenhuma calculadora encontrada" :
                          language === 'pl' ? "Nie znaleziono kalkulatorów" :
                            language === 'de' ? "Keine Rechner gefunden" :
                              "No calculators found"
                      }
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {
                        language === 'br' ? "Tente pesquisar por termos diferentes" :
                          language === 'pl' ? "Spróbuj wyszukać inne hasła" :
                            language === 'de' ? "Versuchen Sie es mit anderen Begriffen" :
                              "Try searching for different terms"
                      }
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
