"use client"

import Link from "next/link"
import Logo from "@/components/logo"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb"
import { getLanguageSwitcherUrl } from "@/lib/url-utils"

export default function Header() {
  const pathname = usePathname()
  const [language, setLanguage] = useState("en")

  // Extract language from pathname
  useEffect(() => {
    if (pathname) {
      const langMatch = pathname.match(/^\/(br|pl|de|es)/)
      setLanguage(langMatch ? langMatch[1] : "en")
    }
  }, [pathname])

  // Get available languages with their full names
  const languages = [
    { code: "en", name: "English" },
    { code: "br", name: "Português" },
    { code: "pl", name: "Polski" },
    { code: "de", name: "Deutsch" },
    { code: "es", name: "Español" },
  ]

  // Function to change language
  const changeLanguage = (newLanguage: string) => {
    // Use the url-utils function to generate the correct language-switched URL
    const newPath = getLanguageSwitcherUrl(pathname, newLanguage)

    // Navigate to new path with full page reload to ensure content updates
    if (newPath && newPath !== pathname) {
      window.location.href = newPath;
    }
  }

  // Determine the correct homepage URL based on current language
  const getHomepageUrl = () => {
    if (language === "en") return "/"
    return `/${language}/`
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Link href={getHomepageUrl()}>
                <Logo />
              </Link>
              <div>
                <Link
                  href={getHomepageUrl()}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Smart Calculator
                </Link>
                <p className="text-sm text-gray-500">Free Online Calculators</p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>
      <DynamicBreadcrumb />
    </>
  )
}