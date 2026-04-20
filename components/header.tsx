"use client"

import Link from "next/link"
import Logo from "@/components/logo"
import { usePathname } from "next/navigation"
import { useState, useEffect, useMemo, memo } from "react"
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb"
import { getLanguageSwitcherUrl } from "@/lib/url-utils"
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut, Shield, Users, Menu, X } from "lucide-react"

// Static data moved outside component for performance
const KNOWN_PAGES = [
  'blogs', 'about-us', 'contact-us', 'privacy-policy', 'terms-and-conditions', 'studio', 'editorial-policy-mission-statement', 'sitemap',
  'sobre-nos', 'contato', 'politica-de-privacidade', 'termos-e-condicoes', 'politica-editorial-declaracao-missao', 'mapa-do-site',
  'o-nas', 'kontakt', 'polityka-prywatnosci', 'warunki', 'polityka-redakcyjna-deklaracja-misji', 'mapa-strony',
  'uber-uns', 'datenschutz', 'nutzungsbedingungen', 'redaktionelle-richtlinien-leitbild',
  'sobre-nosotros', 'contacto', 'politica-de-privacidad', 'terminos-y-condiciones', 'politica-editorial-declaracion-mision', 'mapa-del-sitio'
]

const CATEGORIES = [
  'physics', 'health', 'maths', 'financial', 'construction', 'food', 'sports', 'other', 'other-calculators', 'software', 'business', 'games',
  'fisica', 'saude', 'matematica', 'financeiro', 'construcao', 'alimento', 'esportes', 'outro', 'software', 'negocios', 'jogos',
  'fizyka', 'zdrowie', 'matematyka', 'finansowy', 'budowa', 'zywnosc', 'lekkoatletyka', 'inne', 'oprogramowanie', 'biznes', 'gry',
  'physik', 'gesundheit', 'mathe', 'finanziell', 'konstruktion', 'essen', 'sport', 'andere', 'software', 'geschaeft', 'spiele',
  'fisica', 'salud', 'matematicas', 'financiero', 'construccion', 'alimentos', 'deportes', 'otra', 'software', 'negocios', 'juegos'
]

const OTHER_CALCULATORS = [
  'age-calculator', 'piecewise-function-calculator-grapher', 'enterprise-seo-roi-calculator',
  'rpe-calculator', 'indiana-child-support-calculator', 'time-calculator', 'gpa-calculator',
  'height-calculator', 'ip-subnet-calculator', 'towing-estimate-calculator',
  'calculadora-de-idade', 'calculadora-de-funcao-por-partes-e-graficador', 'calculadora-de-roi-de-seo-empresarial',
  'calculadora-de-epe', 'calculadora-de-pensao-alimenticia-de-indiana', 'calculadora-de-tempo', 'calculadora-gpa',
  'calculadora-de-altura', 'calculadora-desub-rede-IP', 'calculadora-de-custo-de-reboque',
  'kalkulator-wieku', 'kalkulator-odcinkowy-funkcja-kalkulador-wykres-kalkulador', 'kalkulator-przedsiebiorstwo-seo-roi-kalkulador',
  'kalkulator-rpe-kalkulador', 'kalkulator-indiana-dziecko-wsparcie-kalkulador', 'kalkulator-czasu', 'kalkulator-sredniej-ocen',
  'kalkulator-wzrostu', 'kalkulator-podsieci-ip', 'kalkulator-kosztow-holowania',
  'alter-rechner', 'stuckweise-funktion-rechner-grafik-rechner', 'unternehmen-seo-roi-rechner',
  'rpe-rechner', 'indiana-kind-unterhalt-rechner', 'zeit-rechner', 'notendurchschnitt-rechner',
  'groben-rechner', 'ip-subnetz-rechner', 'abschleppkosten-rechner',
  'calculadora-de-edad', 'calculadora-de-funciones-por-tramos', 'calculadora-de-roi-seo',
  'calculadora-rpe', 'calculadora-de-manutencion-infantil', 'calculadora-de-tiempo', 'calculadora-de-gpa',
  'calculadora-de-altura', 'calculadora-subnet', 'calculadora-de-costos-de-remolque',
  'therapy-productivity-calculator'
]

const ENGLISH_ONLY_PATHS = [
  // English-only calculators
  '/implant-size-calculator',
  '/business/break-even-roas-calculator',
  '/health/dental-implant-cost-calculator',
  '/maths/reverse-percentage-calculator',
  '/therapy-productivity-calculator',
  '/financial/bank-statement-converter',
  '/financial/reverse-sales-tax-calculator',
  '/end-of-service-calculator',
  '/ovr-calculator',
  '/construction/board-and-batten-calculator',
  '/physics/power-to-weight-ratio-calculator',
  '/grade-curve-calculator',
  '/acres-per-hour-calculator',
  '/notice-period-calculator',
  '/ssc-gpa-calculator',
  '/pressure-washing-estimate-calculator',
  '/financial/venmo-fee-calculator',
  '/home-inspection-cost-calculator',
  '/wall-panelling-calculator',
  '/song-length-calculator',
  '/ethnicity-calculator',
  '/construction/flange-weight-calculator',
  '/msi-calculator',
  '/water-potential-calculator',
  '/whatnot-fee-calculator',
  '/depop-fee-calculator',
  '/cpv-calculator',
  '/home-reversion-calculator',
  '/construction/rip-rap-calculator',
  '/construction/soffit-calculator',
  '/seatime-calculator',
  '/ashtakavarga-calculator',
  '/construction/polymeric-sand-calculator',
  '/financial/grailed-fee-calculator',
  '/construction/loft-conversion-cost-calculator',
  '/aquarium-substrate-calculator',
  '/health/peth-test-calculator',
  '/evony-troop-calculator',
  '/physics/phasor-calculator',
  '/financial/fix-and-flip-calculator',
  '/sports/kite-size-calculator',
  '/sports/era-calculator',
  '/maths/extrapolation-calculator',
  '/construction/garage-conversion-cost-calculator',
  '/health/newborn-weight-loss-calculator',
  '/food/sourdough-calculator',
  '/physics/lmtd-calculator',
  '/maths/combination-sum-calculator',
  // All games
  '/games',
  '/games/blox-fruits-wheel',
  '/games/animal-wheel-spinner',
  '/games/wordle',
  '/games/money-master',
  '/games/aesthetic-wheel-spinner',
  '/games/age-generator-wheel',
  '/games/anime-character-wheel',
  '/games/cashier-simulator',
  '/games/coin-saver-challenge',
  '/games/grocery-cashier',
  '/games/what-is-the-wordle-today',
  '/games/mental-maths',
  '/games/sort-coins',
  // Community & creator pages
  '/community',
  '/blogs',
  '/creator',
  // Other pages
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/terms-and-conditions',
  '/editorial-policy-mission-statement',
  '/sitemap'
]

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "br", name: "Português" },
  { code: "pl", name: "Polski" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
]

const STATIC_PAGES_CONFIG = {
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

function Header() {
  const pathname = usePathname()
  const [language, setLanguage] = useState("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  // Memoize expensive path calculations
  const pathWithoutLang = useMemo(() => pathname.replace(/^\/(br|pl|de|es)/, '') || '/', [pathname])

  const isGamesPage = useMemo(() =>
    pathWithoutLang.startsWith('/games') || pathWithoutLang === '/games',
    [pathWithoutLang]
  )

  const isBlogListingPage = useMemo(() =>
    pathWithoutLang === '/blogs' || pathWithoutLang.startsWith('/blogs/'),
    [pathWithoutLang]
  )

  const isBlogPostPage = useMemo(() => {
    const segments = pathWithoutLang.split('/').filter(Boolean)

    if (segments.length === 1) {
      return !KNOWN_PAGES.includes(segments[0]) &&
        !CATEGORIES.includes(segments[0]) &&
        !OTHER_CALCULATORS.includes(segments[0])
    }
    return false
  }, [pathWithoutLang])

  const isBlogPage = useMemo(() => isBlogListingPage || isBlogPostPage, [isBlogListingPage, isBlogPostPage])

  const isEnglishOnlyCalculator = useMemo(() =>
    ENGLISH_ONLY_PATHS.some(path => pathWithoutLang === path),
    [pathWithoutLang]
  )

  const shouldHideLanguageSwitcher = useMemo(() =>
    isBlogPage || isGamesPage || isEnglishOnlyCalculator,
    [isBlogPage, isGamesPage, isEnglishOnlyCalculator]
  )

  // Extract language from pathname - optimized
  useEffect(() => {
    const langMatch = pathname.match(/^\/(br|pl|de|es)/)
    const newLang = langMatch ? langMatch[1] : "en"
    if (newLang !== language) {
      setLanguage(newLang)
    }
  }, [pathname, language])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const changeLanguage = useMemo(() => (newLanguage: string) => {
    const newPath = getLanguageSwitcherUrl(pathname, newLanguage)
    if (newPath && newPath !== pathname) {
      window.location.href = newPath
    }
  }, [pathname])

  const homepageUrl = useMemo(() => language === "en" ? "/" : `/${language}/`, [language])

  const currentPages = useMemo(() =>
    STATIC_PAGES_CONFIG[language as keyof typeof STATIC_PAGES_CONFIG] || STATIC_PAGES_CONFIG.en,
    [language]
  )

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href={homepageUrl} aria-label="Smart Calculator Home" className="shrink-0">
                <Logo />
              </Link>
              <div className="hidden sm:block">
                <Link
                  href={homepageUrl}
                  className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Smart Calculator
                </Link>
                <p className="text-xs sm:text-sm text-gray-500">Free Online Calculators</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              {/* Community Link - Desktop */}
              <Link href="/community" className="hidden md:flex text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Community</span>
              </Link>

              {/* Navigation Links - Desktop */}
              <nav className="hidden xl:flex items-center gap-3">
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

              {/* Language Selector - Desktop */}
              {!shouldHideLanguageSwitcher && (
                <div className="hidden md:block relative">
                  <label htmlFor="language-selector" className="sr-only">Select Language</label>
                  <select
                    id="language-selector"
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md py-1.5 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select Language"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              {/* User Profile Menu */}
              {status === "loading" ? (
                <div className="hidden md:block w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              ) : session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden md:flex relative h-10 w-10 rounded-full border-2 border-blue-500/30 hover:border-blue-500 transition-all">
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
                <Button onClick={() => signIn()} size="sm" className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu - Enhanced with scrolling and better UI */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
              <div className="max-h-[70vh] overflow-y-auto py-3">
                {/* Navigation Section */}
                <div className="px-3 mb-3">
                  <Link
                    href="/community"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>Community</span>
                  </Link>
                </div>

                {/* Quick Links */}
                <div className="px-3 mb-3">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Quick Links</p>
                  <div className="space-y-1">
                    <Link
                      href={currentPages.aboutUs.url}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {currentPages.aboutUs.text}
                    </Link>
                    <Link
                      href={currentPages.contactUs.url}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {currentPages.contactUs.text}
                    </Link>
                    <Link
                      href={currentPages.privacyPolicy.url}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {currentPages.privacyPolicy.text}
                    </Link>
                    <Link
                      href={currentPages.termsConditions.url}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {currentPages.termsConditions.text}
                    </Link>
                    <Link
                      href={currentPages.editorialGuidelines.url}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {currentPages.editorialGuidelines.text}
                    </Link>
                  </div>
                </div>

                {/* Language Selector */}
                {!shouldHideLanguageSwitcher && (
                  <div className="px-3 mb-3">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Language</p>
                    <div className="px-4">
                      <select
                        id="mobile-language-selector"
                        value={language}
                        onChange={(e) => { changeLanguage(e.target.value); setMobileMenuOpen(false); }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Sign In Button */}
                {!session && (
                  <div className="px-3 mb-3">
                    <div className="px-4">
                      <Button
                        onClick={() => { signIn(); setMobileMenuOpen(false); }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                )}

                {/* User Profile Section */}
                {session && (
                  <div className="px-3 pt-3 border-t border-gray-200 mt-2">
                    <div className="px-4 mb-3">
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                        <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                          <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{session.user?.name}</p>
                          <p className="text-xs text-gray-600 truncate">{session.user?.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 px-4 pb-2">
                      {/* @ts-ignore */}
                      {session.user?.role === "admin" && (
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Shield className="h-4 w-4 text-blue-600" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <button
                        onClick={() => { signOut({ callbackUrl: "/" }); setMobileMenuOpen(false); }}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <DynamicBreadcrumb />
    </>
  )
}

export default memo(Header)