"use client"

import Link from "next/link"
import Logo from "@/components/logo"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb"
import { getLanguageSwitcherUrl } from "@/lib/url-utils"
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut, Shield, Users } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const [language, setLanguage] = useState("en")
  const { data: session, status } = useSession()

  // Check if current page is a games page (category page or any inner game page)
  // Games paths: /games, /br/games, /games/wordle, /games/mental-maths, etc.
  const isGamesPage = (() => {
    const pathWithoutLang = pathname.replace(/^\/(br|pl|de|es)/, '') || '/'
    return pathWithoutLang.startsWith('/games') || pathWithoutLang === '/games'
  })()

  // Check if current page is a blog listing page
  // Blog listing: /blogs or /br/blogs or /pl/blogs etc.
  const isBlogListingPage = (() => {
    const pathWithoutLang = pathname.replace(/^\/(br|pl|de|es)/, '') || '/'
    return pathWithoutLang === '/blogs' || pathWithoutLang.startsWith('/blogs/')
  })()
  
  // Check if current page is an individual blog post
  // Blog posts are at root level with just slug (no category prefix)
  // NOT: /, /br, /pl, /de, /es (language roots)
  // NOT: /physics/, /health/, /maths/, /financial/, etc. (calculator categories)
  // NOT: /games (games category)
  // NOT: Other known pages and calculators (including other-category calculators)
  const isBlogPostPage = (() => {
    const pathWithoutLang = pathname.replace(/^\/(br|pl|de|es)/, '') || '/'
    const segments = pathWithoutLang.split('/').filter(Boolean)
    
    // If exactly 1 segment and not a known category/page/calculator
    if (segments.length === 1) {
      const knownPages = ['blogs', 'about-us', 'contact-us', 'privacy-policy', 'terms-and-conditions', 'studio', 'editorial-policy-mission-statement', 'sitemap', 
                         'sobre-nos', 'contato', 'politica-de-privacidade', 'termos-e-condicoes', 'politica-editorial-declaracao-missao', 'mapa-do-site',
                         'o-nas', 'kontakt', 'polityka-prywatnosci', 'warunki', 'polityka-redakcyjna-deklaracja-misji', 'mapa-strony',
                         'uber-uns', 'datenschutz', 'nutzungsbedingungen', 'redaktionelle-richtlinien-leitbild',
                         'sobre-nosotros', 'contacto', 'politica-de-privacidad', 'terminos-y-condiciones', 'politica-editorial-declaracion-mision', 'mapa-del-sitio']
      const categories = [
        // English
        'physics', 'health', 'maths', 'financial', 'construction', 'food', 'sports', 'other', 'other-calculators', 'software', 'business', 'games',
        // Portuguese (br)
        'fisica', 'saude', 'matematica', 'financeiro', 'construcao', 'alimento', 'esportes', 'outro', 'software', 'negocios', 'jogos',
        // Polish (pl)
        'fizyka', 'zdrowie', 'matematyka', 'finansowy', 'budowa', 'zywnosc', 'lekkoatletyka', 'inne', 'oprogramowanie', 'biznes', 'gry',
        // German (de)
        'physik', 'gesundheit', 'mathe', 'finanziell', 'konstruktion', 'essen', 'sport', 'andere', 'software', 'geschaeft', 'spiele',
        // Spanish (es)
        'fisica', 'salud', 'matematicas', 'financiero', 'construccion', 'alimentos', 'deportes', 'otra', 'software', 'negocios', 'juegos'
      ]
      
      // Other-category calculators at root level (without /other/ prefix)
      // These are CALCULATORS, not blog posts - language switcher should be visible
      // Include ALL language versions (English, Portuguese, Polish, German, Spanish)
      const otherCalculators = [
        // English
        'age-calculator', 'piecewise-function-calculator-grapher', 'enterprise-seo-roi-calculator',
        'rpe-calculator', 'indiana-child-support-calculator', 'time-calculator', 'gpa-calculator',
        'height-calculator', 'ip-subnet-calculator', 'towing-estimate-calculator',
        // Portuguese (br)
        'calculadora-de-idade', 'calculadora-de-funcao-por-partes-e-graficador', 'calculadora-de-roi-de-seo-empresarial',
        'calculadora-de-epe', 'calculadora-de-pensao-alimenticia-de-indiana', 'calculadora-de-tempo', 'calculadora-gpa',
        'calculadora-de-altura', 'calculadora-desub-rede-IP', 'calculadora-de-custo-de-reboque',
        // Polish (pl)
        'kalkulator-wieku', 'kalkulator-odcinkowy-funkcja-kalkulador-wykres-kalkulador', 'kalkulator-przedsiebiorstwo-seo-roi-kalkulador',
        'kalkulator-rpe-kalkulador', 'kalkulator-indiana-dziecko-wsparcie-kalkulador', 'kalkulator-czasu', 'kalkulator-sredniej-ocen',
        'kalkulator-wzrostu', 'kalkulator-podsieci-ip', 'kalkulator-kosztow-holowania',
        // German (de)
        'alter-rechner', 'stuckweise-funktion-rechner-grafik-rechner', 'unternehmen-seo-roi-rechner',
        'rpe-rechner', 'indiana-kind-unterhalt-rechner', 'zeit-rechner', 'notendurchschnitt-rechner',
        'groben-rechner', 'ip-subnetz-rechner', 'abschleppkosten-rechner',
        // Spanish (es)
        'calculadora-de-edad', 'calculadora-de-funciones-por-tramos', 'calculadora-de-roi-seo',
        'calculadora-rpe', 'calculadora-de-manutencion-infantil', 'calculadora-de-tiempo', 'calculadora-de-gpa',
        'calculadora-de-altura', 'calculadora-subnet', 'calculadora-de-costos-de-remolque'
      ]
      
      // If it's a known page, category, or other-category calculator, it's NOT a blog post
      // Only treat as blog post if it's none of these
      return !knownPages.includes(segments[0]) && 
             !categories.includes(segments[0]) && 
             !otherCalculators.includes(segments[0])
    }
    return false
  })()
  
  const isBlogPage = isBlogListingPage || isBlogPostPage
  
  // Hide language switcher ONLY on blog pages and games pages
  // Show on all other pages: calculators, static pages, homepage, etc.
  const shouldHideLanguageSwitcher = isBlogPage || isGamesPage
  
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

  // Static pages configuration with multi-language support
  const staticPagesConfig = {
    en: {
      aboutUs: { text: "About Us", url: "/about-us" },
      contactUs: { text: "Contact Us", url: "/contact-us" },
      privacyPolicy: { text: "Privacy Policy", url: "/privacy-policy" },
      termsConditions: { text: "Terms & Conditions", url: "/terms-and-conditions" },
      editorialGuidelines: { text: "Editorial Guidelines", url: "/editorial-policy-mission-statement" },
      sitemap: { text: "Sitemap", url: "/sitemap" }
    },
    br: {
      aboutUs: { text: "Sobre Nós", url: "/br/sobre-nos" },
      contactUs: { text: "Contate-Nos", url: "/br/contato" },
      privacyPolicy: { text: "Política de Privacidade", url: "/br/politica-de-privacidade" },
      termsConditions: { text: "Termos e Condições", url: "/br/termos-e-condicoes" },
      editorialGuidelines: { text: "Diretrizes Editoriais", url: "/br/politica-editorial-declaracao-missao" },
      sitemap: { text: "Mapa do Site", url: "/br/mapa-do-site" }
    },
    pl: {
      aboutUs: { text: "O Nas", url: "/pl/o-nas" },
      contactUs: { text: "Kontakt", url: "/pl/kontakt" },
      privacyPolicy: { text: "Polityka Prywatności", url: "/pl/polityka-prywatnosci" },
      termsConditions: { text: "Regulamin", url: "/pl/warunki" },
      editorialGuidelines: { text: "Wytyczne Redakcyjne", url: "/pl/polityka-redakcyjna-deklaracja-misji" },
      sitemap: { text: "Mapa Strony", url: "/pl/mapa-strony" }
    },
    de: {
      aboutUs: { text: "Über Uns", url: "/de/uber-uns" },
      contactUs: { text: "Kontakt", url: "/de/kontakt" },
      privacyPolicy: { text: "Datenschutz", url: "/de/datenschutz" },
      termsConditions: { text: "AGB", url: "/de/nutzungsbedingungen" },
      editorialGuidelines: { text: "Redaktionelle Richtlinien", url: "/de/redaktionelle-richtlinien-leitbild" },
      sitemap: { text: "Sitemap", url: "/de/sitemap" }
    },
    es: {
      aboutUs: { text: "Sobre Nosotros", url: "/es/sobre-nosotros" },
      contactUs: { text: "Contacto", url: "/es/contacto" },
      privacyPolicy: { text: "Política de Privacidad", url: "/es/politica-de-privacidad" },
      termsConditions: { text: "Términos y Condiciones", url: "/es/terminos-y-condiciones" },
      editorialGuidelines: { text: "Directrices Editoriales", url: "/es/politica-editorial-declaracion-mision" },
      sitemap: { text: "Mapa del Sitio", url: "/es/mapa-del-sitio" }
    }
  }

  const currentPages = staticPagesConfig[language as keyof typeof staticPagesConfig] || staticPagesConfig.en

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Link href={getHomepageUrl()} aria-label="Smart Calculator Home">
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

            <div className="flex items-center space-x-6">
              {/* Community Link */}
              <Link href="/community" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Community</span>
              </Link>

              {/* Navigation Links - Always visible */}
              <nav className="hidden lg:flex items-center space-x-4">
                <Link href={currentPages.aboutUs.url} className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                  {currentPages.aboutUs.text}
                </Link>
                <Link href={currentPages.contactUs.url} className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                  {currentPages.contactUs.text}
                </Link>
                <Link href={currentPages.privacyPolicy.url} className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                  {currentPages.privacyPolicy.text}
                </Link>
                <Link href={currentPages.termsConditions.url} className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                  {currentPages.termsConditions.text}
                </Link>
                <Link href={currentPages.editorialGuidelines.url} className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                  {currentPages.editorialGuidelines.text}
                </Link>
              </nav>

              {/* Language Selector - Hidden only on blog and games pages */}
              {!shouldHideLanguageSwitcher && (
                <div className="relative">
                  <label htmlFor="language-selector" className="sr-only">Select Language</label>
                  <select
                    id="language-selector"
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select Language"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* User Profile Menu */}
              {status === "loading" ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              ) : session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-blue-500/30 hover:border-blue-500 transition-all">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-xl border-2 border-gray-200 shadow-2xl" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/community" className="cursor-pointer flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Community</span>
                      </Link>
                    </DropdownMenuItem>
                    {/* @ts-ignore */}
                    {session.user?.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard" className="cursor-pointer flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => signIn()} size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <DynamicBreadcrumb />
    </>
  )
}