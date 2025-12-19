"use client"

import { useState, useEffect } from "react"
import { useParams, usePathname, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft, Clock } from "lucide-react"
import { getBlogPostBySlug, type BlogPost } from "@/lib/sanity/client"
import { PortableText } from "@/components/portable-text"

const blogContent = {
  en: {
    backToBlogs: "Back to Blogs",
    by: "by",
    publishedOn: "Published on",
    readTime: "min read",
    loading: "Loading...",
    notFound: "Blog post not found",
  },
  br: {
    backToBlogs: "Voltar para Blogs",
    by: "por",
    publishedOn: "Publicado em",
    readTime: "min de leitura",
    loading: "Carregando...",
    notFound: "Postagem do blog não encontrada",
  },
  pl: {
    backToBlogs: "Powrót do Blogów",
    by: "przez",
    publishedOn: "Opublikowano",
    readTime: "min czytania",
    loading: "Ładowanie...",
    notFound: "Nie znaleziono wpisu na blogu",
  },
  de: {
    backToBlogs: "Zurück zu Blogs",
    by: "von",
    publishedOn: "Veröffentlicht am",
    readTime: "Min. Lesezeit",
    loading: "Wird geladen...",
    notFound: "Blog-Beitrag nicht gefunden",
  },
  es: {
    backToBlogs: "Volver a Blogs",
    by: "por",
    publishedOn: "Publicado el",
    readTime: "min de lectura",
    loading: "Cargando...",
    notFound: "Publicación de blog no encontrada",
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const pathname = usePathname()
  const slug = params?.slug as string
  const pathParts = pathname.split('/')
  const potentialLang = pathParts[1]
  const validLanguages = ['br', 'pl', 'de', 'es']
  const language = validLanguages.includes(potentialLang) ? potentialLang : 'en'
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return
      
      setLoading(true)
      try {
        const blogPost = await getBlogPostBySlug(slug, language)
        if (!blogPost) {
          notFound()
        }
        setPost(blogPost)
      } catch (error) {
        console.error("Error fetching blog post:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug, language])

  const content = blogContent[language as keyof typeof blogContent] || blogContent.en

  const getBlogsUrl = () => {
    if (language === "en") {
      return "/blogs"
    }
    return `/${language}/blogs`
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

  const calculateReadTime = (body: any) => {
    if (!body) return 5
    const text = JSON.stringify(body)
    const words = text.split(/\s+/).length
    return Math.ceil(words / 200)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">{content.loading}</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">{content.notFound}</p>
      </div>
    )
  }

  return (
    <>

      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href={getBlogsUrl()}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            {content.backToBlogs}
          </Link>

          {post.featuredImage && (
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 shadow-xl">
              <Image
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-sm text-gray-500">{content.by}</p>
                    <p className="font-semibold text-gray-900">{post.author.name}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                <span>{calculateReadTime(post.body)} {content.readTime}</span>
              </div>
            </div>

            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            {post.body && <PortableText value={post.body} />}
          </div>

          {post.author?.bio && (
            <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {content.by} {post.author.name}
              </h3>
              <p className="text-gray-700 leading-relaxed">{post.author.bio}</p>
            </div>
          )}
        </article>
      </div>
    </>
  )
}
