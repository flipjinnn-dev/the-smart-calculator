"use client"

import { useState, useEffect } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft, Clock } from "lucide-react"
import { getBlogPostBySlug, type BlogPost } from "@/lib/sanity/client"
import { PortableText } from "@/components/portable-text"

const blogContent = {
  backToBlogs: "Back to Blogs",
  by: "by",
  publishedOn: "Published on",
  readTime: "min read",
  loading: "Loading...",
  notFound: "Blog post not found",
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return
      
      setLoading(true)
      try {
        const blogPost = await getBlogPostBySlug(slug)
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
  }, [slug])

  const getBlogsUrl = () => {
    return "/blogs"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    
    return date.toLocaleDateString('en-US', options)
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
        <p className="text-xl text-gray-600">{blogContent.loading}</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">{blogContent.notFound}</p>
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
            {blogContent.backToBlogs}
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
                    <p className="text-sm text-gray-500">{blogContent.by}</p>
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
                <span>{calculateReadTime(post.body)} {blogContent.readTime}</span>
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
                {blogContent.by} {post.author.name}
              </h3>
              <div className="text-gray-700 leading-relaxed">
                {Array.isArray(post.author.bio) ? (
                  <PortableText value={post.author.bio} />
                ) : (
                  <p>{post.author.bio}</p>
                )}
              </div>
            </div>
          )}
        </article>
      </div>
    </>
  )
}
