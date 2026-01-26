import { headers } from "next/headers"
import Link from "next/link"
import { Map } from "lucide-react"
import { calculators } from "@/lib/calculator-data"
import { getAllBlogPosts } from "@/lib/sanity/client"

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

async function getContent(language: string): Promise<SitemapContent> {
  try {
    const content = await import(`@/app/content/pages/sitemap/${language}.json`)
    return content.default || content
  } catch (error) {
    const fallback = await import(`@/app/content/pages/sitemap/en.json`)
    return fallback.default || fallback
  }
}

export default async function SitemapPage() {
  const headersList = await headers()
  const language = headersList.get("x-language") || "en"
  const content = await getContent(language)
  
  // Fetch blog posts
  let blogPosts: any[] = []
  try {
    blogPosts = await getAllBlogPosts()
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
  }
  
  // Define games
  const games = [
    { title: "Wordle of the Day", url: "/games/wordle" },
    { title: "Mental Math Trainer", url: "/games/mental-maths" },
    { title: "Wordle Archive", url: "/games/what-is-the-wordle-today" }
  ]

  // Organize calculators by category
  const calculatorsByCategory: { [key: string]: typeof calculators } = {}
  
  calculators.forEach((calc) => {
    if (!calculatorsByCategory[calc.category]) {
      calculatorsByCategory[calc.category] = []
    }
    calculatorsByCategory[calc.category].push(calc)
  })

  // Sort calculators alphabetically within each category
  Object.keys(calculatorsByCategory).forEach((category) => {
    calculatorsByCategory[category].sort((a, b) => a.name.localeCompare(b.name))
  })

  // Define category order
  const categoryOrder = ['financial', 'health', 'maths', 'physics', 'construction', 'food', 'sports', 'software', 'business', 'other-calculators']
  const sortedCategories = categoryOrder.filter(cat => calculatorsByCategory[cat])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Map className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{content.heroTitle}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content.heroDescription}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Static Pages Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">{content.staticPagesTitle}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
            {content.staticPages.map((page, index) => (
              <li key={index}>
                <Link 
                  href={page.url}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm py-1 block"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Calculators by Category Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">{content.categoriesTitle}</h2>
          <div className="space-y-10">
            {sortedCategories.map((category) => {
              const categoryName = content.categories[category] || category
              const categoryCalculators = calculatorsByCategory[category]

              return (
                <div key={category}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="text-blue-600 mr-2">▸</span>
                    {categoryName}
                    <span className="text-sm text-gray-500 font-normal ml-2">({categoryCalculators.length})</span>
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 ml-4">
                    {categoryCalculators.map((calc) => (
                      <li key={calc.id}>
                        <Link 
                          href={calc.href}
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm py-1 block"
                        >
                          {calc.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        {/* Games Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
            {content.gamesTitle || "Games"}
          </h2>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-600 mr-2">▸</span>
              Games Category
              <span className="text-sm text-gray-500 font-normal ml-2">({games.length + 1})</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 ml-4">
              <li>
                <Link 
                  href="/games"
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm py-1 block"
                >
                  Games - Main Page
                </Link>
              </li>
              {games.map((game, index) => (
                <li key={index}>
                  <Link 
                    href={game.url}
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm py-1 block"
                  >
                    {game.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Blogs Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
            {content.blogsTitle || "Blogs"}
          </h2>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-600 mr-2">▸</span>
              Blog Posts
              <span className="text-sm text-gray-500 font-normal ml-2">({blogPosts.length + 1})</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 ml-4">
              <li>
                <Link 
                  href="/blogs"
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm py-1 block"
                >
                  Blogs - Main Page
                </Link>
              </li>
              {blogPosts.map((post) => (
                <li key={post._id}>
                  <Link 
                    href={`/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm py-1 block"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
