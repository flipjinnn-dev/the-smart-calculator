import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowLeft, Clock } from "lucide-react"
import { getBlogPostBySlug, type BlogPost } from "@/lib/sanity/client"
import { PortableText } from "@/components/portable-text"
import type { Metadata } from "next"

const blogContent = {
  backToBlogs: "Back to Blogs",
  by: "by",
  publishedOn: "Published on",
  readTime: "min read",
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://smartcalculator.com"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  const canonicalUrl = `${SITE_URL}/blogs/${slug}`
  const ogImage = post.featuredImage || `${SITE_URL}/og-image.jpg`

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt || post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [ogImage],
    },
  }
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  let post: BlogPost | null = null
  
  try {
    post = await getBlogPostBySlug(slug)
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error)
    // Don't redirect on error, show error message instead
  }
  
  // Only redirect if blog truly doesn't exist (not on fetch errors)
  if (!post) {
    console.log(`Blog post not found for slug: ${slug}`)
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/blogs"
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
  )
}
