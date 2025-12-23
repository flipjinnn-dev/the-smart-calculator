"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllBlogPosts, type BlogPost } from "@/lib/sanity/client"
import { getCurrentLanguage } from "@/lib/url-utils"

const blogContent = {
  en: {
    title: "Blog",
    subtitle: "Insights, tips, and guides from our experts",
    readMore: "Read More",
    publishedOn: "Published on",
    by: "by",
    noPosts: "No blog posts available yet.",
    loading: "Loading blog posts...",
  },
  br: {
    title: "Blog",
    subtitle: "Insights, dicas e guias de nossos especialistas",
    readMore: "Leia Mais",
    publishedOn: "Publicado em",
    by: "por",
    noPosts: "Nenhuma postagem de blog disponível ainda.",
    loading: "Carregando postagens do blog...",
  },
  pl: {
    title: "Blog",
    subtitle: "Spostrzeżenia, wskazówki i przewodniki od naszych ekspertów",
    readMore: "Czytaj Więcej",
    publishedOn: "Opublikowano",
    by: "przez",
    noPosts: "Brak dostępnych postów na blogu.",
    loading: "Ładowanie postów na blogu...",
  },
  de: {
    title: "Blog",
    subtitle: "Einblicke, Tipps und Anleitungen von unseren Experten",
    readMore: "Weiterlesen",
    publishedOn: "Veröffentlicht am",
    by: "von",
    noPosts: "Noch keine Blog-Beiträge verfügbar.",
    loading: "Blog-Beiträge werden geladen...",
  },
  es: {
    title: "Blog",
    subtitle: "Perspectivas, consejos y guías de nuestros expertos",
    readMore: "Leer Más",
    publishedOn: "Publicado el",
    by: "por",
    noPosts: "Aún no hay publicaciones de blog disponibles.",
    loading: "Cargando publicaciones del blog...",
  },
}

export default function BlogsPage() {
  const pathname = usePathname()
  const pathParts = pathname.split('/')
  const potentialLang = pathParts[1]
  const validLanguages = ['br', 'pl', 'de', 'es']
  const language = validLanguages.includes(potentialLang) ? potentialLang : 'en'
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const blogPosts = await getAllBlogPosts(language)
        setPosts(blogPosts)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [language])

  const content = blogContent[language as keyof typeof blogContent] || blogContent.en

  const getBlogUrl = (slug: string) => {
    if (language === "en") {
      return `/${slug}`
    }
    return `/${language}/${slug}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    
    const localeMap: Record<string, string> = {
      en: 'en-US',
      br: 'pt-BR',
      pl: 'pl-PL',
      de: 'de-DE',
      es: 'es-ES',
    }
    
    return date.toLocaleDateString(localeMap[language] || 'en-US', options)
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: content.title,
    description: content.subtitle,
    url: `https://www.thesmartcalculator.com${language === 'en' ? '' : `/${language}`}/blogs`,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.featuredImage,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author?.name || "Smart Calculator Team",
      },
      url: `https://www.thesmartcalculator.com${getBlogUrl(post.slug)}`,
    })),
  }

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-white">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{content.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content.subtitle}</p>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">{content.loading}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">{content.noPosts}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card key={post._id} className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
                    {post.featuredImage && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.featuredImage}
                          alt={post.featuredImageAlt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </span>
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author.name}
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-600 mb-4 line-clamp-3">
                        {typeof post.excerpt === 'string' ? (
                          <p>{post.excerpt}</p>
                        ) : (
                          <p>{post.title}</p>
                        )}
                      </div>
                      <Link
                        href={getBlogUrl(post.slug)}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold group-hover:gap-3 transition-all"
                      >
                        {content.readMore}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
