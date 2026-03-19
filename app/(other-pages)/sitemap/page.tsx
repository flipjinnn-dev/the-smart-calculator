import Link from "next/link"
import { Map, Globe, Home, FileText, Calculator, Gamepad2, BookOpen, Users } from "lucide-react"
import { calculators } from "@/lib/calculator-data"
import { getAllBlogPosts } from "@/lib/sanity/client"
import { getAllGames } from "@/lib/games-data"
import { calculatorsMeta } from "@/meta/calculators"

interface SitemapContent {
  heroTitle: string
  heroDescription: string
  categoriesTitle: string
  staticPagesTitle: string
  blogsTitle?: string
  gamesTitle?: string
  categories: {
    [key: string]: string
  }
  staticPages: {
    name: string
    url: string
  }[]
}

interface LanguageInfo {
  code: string
  name: string
  homeUrl: string
}

async function getContent(language: string): Promise<SitemapContent> {
  try {
    const content = await import(`@/app/content/pages/sitemap/${language}.json`)
    return content.default || content
  } catch (error) {
    const fallback = await import(`@/app/content/pages/sitemap/en.json`)
    return fallback.default || fallback
  }
}

// Get all available languages dynamically from calculatorsMeta
function getAvailableLanguages(): LanguageInfo[] {
  const languageSet = new Set<string>()
  
  // Extract all unique language codes from calculatorsMeta
  Object.values(calculatorsMeta).forEach((calcMeta) => {
    Object.keys(calcMeta).forEach((lang) => {
      languageSet.add(lang)
    })
  })
  
  // Map language codes to full names and home URLs
  const languageMap: { [key: string]: { name: string; homeUrl: string } } = {
    en: { name: 'English', homeUrl: '/' },
    br: { name: 'Portuguese (Brazil)', homeUrl: '/br' },
    pl: { name: 'Polish', homeUrl: '/pl' },
    de: { name: 'German', homeUrl: '/de' },
    es: { name: 'Spanish', homeUrl: '/es' }
  }
  
  // Convert to array and sort (English first, then alphabetically)
  const languages: LanguageInfo[] = Array.from(languageSet)
    .filter(code => languageMap[code]) // Only include mapped languages
    .sort((a, b) => {
      if (a === 'en') return -1
      if (b === 'en') return 1
      return a.localeCompare(b)
    })
    .map(code => ({
      code,
      name: languageMap[code].name,
      homeUrl: languageMap[code].homeUrl
    }))
  
  return languages
}

export default async function SitemapPage() {
  const content = await getContent('en')
  
  // Fetch blog posts
  let blogPosts: any[] = []
  try {
    blogPosts = await getAllBlogPosts()
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
  }
  
  // Get all games dynamically from games-data.ts
  const allGames = getAllGames()
  const games = allGames.map(game => ({
    title: game.name,
    url: game.href
  }))

  // Get all available languages dynamically
  const languages = getAvailableLanguages()

  // Define category order
  const categoryOrder = ['financial', 'health', 'maths', 'physics', 'construction', 'food', 'sports', 'software', 'business', 'other-calculators']

  // English-only static pages
  const englishOnlyStaticPages = [
    { name: 'About Us', url: '/about-us' },
    { name: 'Contact Us', url: '/contact-us' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
    { name: 'Terms & Conditions', url: '/terms-and-conditions' },
    { name: 'Editorial Guidelines', url: '/editorial-policy-mission-statement' },
    { name: 'Sitemap', url: '/sitemap' }
  ]

  // Organize calculators by language and category
  const calculatorsByLanguage: { [lang: string]: { [category: string]: Array<{ id: string; name: string; url: string }> } } = {}
  
  languages.forEach(({ code }) => {
    calculatorsByLanguage[code] = {}
    
    // Get calculators for this language from metadata
    Object.entries(calculatorsMeta).forEach(([calcId, calcMeta]) => {
      const langData = calcMeta[code]
      if (!langData) return // Skip if calculator doesn't have this language
      
      // Find the calculator in the main calculators array to get category
      const calcInfo = calculators.find(c => c.id === calcId)
      if (!calcInfo) return
      
      const category = calcInfo.category
      
      if (!calculatorsByLanguage[code][category]) {
        calculatorsByLanguage[code][category] = []
      }
      
      calculatorsByLanguage[code][category].push({
        id: calcId,
        name: langData.title,
        url: langData.slug
      })
    })

    // Sort calculators alphabetically within each category
    Object.keys(calculatorsByLanguage[code]).forEach((category) => {
      calculatorsByLanguage[code][category].sort((a, b) => a.name.localeCompare(b.name))
    })
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-2xl border border-white/30">
              <Map className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            {content.heroTitle}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {content.heroDescription}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Language-wise Pages */}
        {languages.map(({ code, name, homeUrl }, langIndex) => {
          const hasCalculators = Object.keys(calculatorsByLanguage[code] || {}).length > 0
          if (!hasCalculators && code !== 'en') return null // Skip languages with no calculators except English
          
          const gradients = [
            'from-blue-500 to-cyan-500',
            'from-purple-500 to-pink-500',
            'from-green-500 to-emerald-500',
            'from-orange-500 to-red-500',
            'from-indigo-500 to-purple-500'
          ]
          const gradient = gradients[langIndex % gradients.length]
          
          return (
            <section key={code} className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">
                    {name} Pages
                  </h2>
                  <div className={`h-1.5 w-24 bg-gradient-to-r ${gradient} rounded-full mt-2`}></div>
                </div>
              </div>

              {/* Homepage Link */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center`}>
                        <Home className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Homepage</h3>
                    </div>
                    <Link 
                      href={homeUrl}
                      className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <span>{name} - Home</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Static Pages (English only) */}
              {code === 'en' && (
                <div className="mb-8">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center`}>
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Static Pages
                          <span className="text-sm text-gray-500 font-normal ml-2">({englishOnlyStaticPages.length})</span>
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {englishOnlyStaticPages.map((page, index) => (
                          <Link 
                            key={index}
                            href={page.url}
                            className="group flex items-center gap-2 p-3 rounded-xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></span>
                            <span className="text-gray-700 group-hover:text-blue-600 font-medium transition-colors">{page.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Calculators by Category */}
              <div className="grid gap-6">
                {categoryOrder.map((category) => {
                  const categoryCalculators = calculatorsByLanguage[code]?.[category]
                  if (!categoryCalculators || categoryCalculators.length === 0) return null

                  return (
                    <div key={category} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center`}>
                            <Calculator className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                            <span className="text-sm text-gray-500 font-normal ml-2">({categoryCalculators.length})</span>
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {categoryCalculators.map((calc) => (
                            <Link 
                              key={calc.id}
                              href={calc.url}
                              className="group flex items-center gap-2 p-3 rounded-xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></span>
                              <span className="text-gray-700 group-hover:text-blue-600 font-medium transition-colors text-sm">{calc.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}

        {/* English-Only Content Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900">
                English-Only Content
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
            </div>
          </div>

          {/* Games Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Games
                    <span className="text-sm text-gray-500 font-normal ml-2">({games.length + 1})</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <Link 
                    href="/games"
                    className="group flex items-center gap-2 p-3 rounded-xl hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform"></span>
                    <span className="text-gray-700 group-hover:text-purple-600 font-medium transition-colors">Games - Main Page</span>
                  </Link>
                  {games.map((game, index) => (
                    <Link 
                      key={index}
                      href={game.url}
                      className="group flex items-center gap-2 p-3 rounded-xl hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform"></span>
                      <span className="text-gray-700 group-hover:text-purple-600 font-medium transition-colors">{game.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blogs Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Blog Posts
                    <span className="text-sm text-gray-500 font-normal ml-2">({blogPosts.length + 1})</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <Link 
                    href="/blogs"
                    className="group flex items-center gap-2 p-3 rounded-xl hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform"></span>
                    <span className="text-gray-700 group-hover:text-purple-600 font-medium transition-colors">Blogs - Main Page</span>
                  </Link>
                  {blogPosts.map((post) => (
                    <Link 
                      key={post._id}
                      href={`/${post.slug}`}
                      className="group flex items-center gap-2 p-3 rounded-xl hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform"></span>
                      <span className="text-gray-700 group-hover:text-purple-600 font-medium transition-colors">{post.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Community Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Community</h3>
                </div>
                <Link 
                  href="/community"
                  className="group flex items-center gap-2 p-3 rounded-xl hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-200 w-fit"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform"></span>
                  <span className="text-gray-700 group-hover:text-purple-600 font-medium transition-colors">Community - Main Page</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
