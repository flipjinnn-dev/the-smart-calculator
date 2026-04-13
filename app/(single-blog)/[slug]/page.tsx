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

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
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

// Helper to strip head-only elements from HTML content
const stripHeadElements = (html: string): string => {
  if (!html) return html;
  
  // Remove all head-only elements that should never appear in body content:
  // - meta tags (including Open Graph, Twitter cards, charset, viewport, etc.)
  // - link tags (canonical, alternate, preload, dns-prefetch, etc.)
  // - title tags
  // - script tags (especially JSON-LD schema markup)
  // - style tags in head
  // - base tags
  // - noscript tags
  return html
    // Remove meta tags (all variations including self-closing and non-self-closing)
    .replace(/<meta\s+[^>]*\/?>/gi, '')
    .replace(/<meta\s+[^>]*>.*?<\/meta>/gi, '')
    // Remove link tags (canonical, alternate, stylesheet, preload, etc.)
    .replace(/<link\s+[^>]*\/?>/gi, '')
    .replace(/<link\s+[^>]*>.*?<\/link>/gi, '')
    // Remove title tags
    .replace(/<title\s*[^>]*>[\s\S]*?<\/title>/gi, '')
    // Remove script tags (including JSON-LD schema markup)
    .replace(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<script\s+[^>]*>[\s\S]*?<\/script>/gi, '')
    // Remove style tags
    .replace(/<style\s+[^>]*>[\s\S]*?<\/style>/gi, '')
    // Remove base tags
    .replace(/<base\s+[^>]*\/?>/gi, '')
    // Remove noscript tags
    .replace(/<noscript\s+[^>]*>[\s\S]*?<\/noscript>/gi, '')
    // Remove any remaining head tags if they somehow got into content
    .replace(/<head\s*[^>]*>[\s\S]*?<\/head>/gi, '')
    // Remove html and body opening/closing tags if present
    .replace(/<\/?html[^>]*>/gi, '')
    .replace(/<\/?body[^>]*>/gi, '')
    // Clean up multiple consecutive whitespace/newlines
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
};

export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  let post: BlogPost | null = null;
  try {
    post = await getBlogPostBySlug(slug);
  } catch (error) {
    console.error(`Error fetching blog post metadata for slug "${slug}":`, error);
  }

  if (!post) {
    return {
      title: "Blog Post Not Found | Smart Calculator",
      description: "The requested blog post could not be found.",
    };
  }

  const metaTitle = post.metaTitle || post.title;
  const metaDescription = post.metaDescription || post.excerpt;
  const keywords = post.keywords || "";
  const canonicalUrl = `https://www.thesmartcalculator.com/${slug}`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      url: canonicalUrl,
      siteName: 'Smart Calculator',
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      publishedTime: post.publishedAt,
      locale: 'en_US',
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  
  // List of calculator routes that should not be handled by blog route
  const calculatorRoutes = [
    'depop-fee-calculator',
    'whatnot-fee-calculator',
    'water-potential-calculator',
    'msi-calculator',
    'ethnicity-calculator',
    'song-length-calculator',
    'wall-panelling-calculator',
    'home-inspection-cost-calculator',
    'pressure-washing-estimate-calculator',
    'ssc-gpa-calculator',
    'notice-period-calculator',
    'acres-per-hour-calculator',
    'grade-curve-calculator',
    'ovr-calculator',
    'end-of-service-calculator',
    'therapy-productivity-calculator',
    'implant-size-calculator',
    'cpv-calculator',
    'home-reversion-calculator',
    'rip-rap-calculator',
    'soffit-calculator',
    'seatime-calculator',
    'ashtakavarga-calculator',
    'polymeric-sand-calculator',
    'grailed-fee-calculator',
    'loft-conversion-cost-calculator',
  ]
  
  // If this is a calculator route, return 404 to let Next.js handle it properly
  if (calculatorRoutes.includes(slug)) {
    redirect(`/${slug}`)
  }
  
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
          {post.body && Array.isArray(post.body) && post.body.length > 0 ? (
            <PortableText value={post.body} />
          ) : post.htmlBody ? (
            <>
              <style>{`
                  .html-blog-body h1 { font-size: 2.25rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.2; }
                  .html-blog-body h2 { font-size: 1.875rem; font-weight: 700; color: #111827; margin-top: 1.75rem; margin-bottom: 0.75rem; line-height: 1.3; }
                  .html-blog-body h3 { font-size: 1.5rem; font-weight: 600; color: #111827; margin-top: 1.5rem; margin-bottom: 0.65rem; line-height: 1.4; }
                  .html-blog-body h4 { font-size: 1.25rem; font-weight: 600; color: #111827; margin-top: 1.25rem; margin-bottom: 0.5rem; }
                  .html-blog-body p { font-size: 1.1rem; color: #374151; line-height: 1.75; margin-bottom: 1rem; }
                  .html-blog-body ul { list-style-type: disc; padding-left: 2rem; margin-bottom: 1rem; color: #374151; }
                  .html-blog-body ol { list-style-type: decimal; padding-left: 2rem; margin-bottom: 1rem; color: #374151; }
                  .html-blog-body li { margin-bottom: 0.35rem; }
                  .html-blog-body blockquote { border-left: 4px solid #3b82f6; padding-left: 1.25rem; font-style: italic; color: #4b5563; margin: 1.25rem 0; }
                  .html-blog-body pre { background: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; font-family: monospace; font-size: 0.9rem; margin: 1rem 0; }
                  .html-blog-body code { background: #f3f4f6; color: #dc2626; padding: 0.15rem 0.4rem; border-radius: 0.25rem; font-size: 0.875rem; font-family: monospace; }
                  .html-blog-body a { color: #2563eb; text-decoration: underline; }
                  .html-blog-body a:hover { color: #1e40af; }
                  .html-blog-body strong { font-weight: 700; }
                  .html-blog-body em { font-style: italic; }
                  .html-blog-body img { border-radius: 0.5rem; max-width: 100%; height: auto; margin: 1rem 0; }
                  .html-blog-body hr { border: none; border-top: 2px solid #e5e7eb; margin: 1.5rem 0; }
                  .html-blog-body table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
                  .html-blog-body td, .html-blog-body th { border: 1px solid #d1d5db; padding: 0.5rem 0.75rem; }
                  .html-blog-body th { background: #f9fafb; font-weight: 600; }
                `}</style>
              <div
                className="html-blog-body"
                dangerouslySetInnerHTML={{ __html: stripHeadElements(post.htmlBody) }}
              />
            </>
          ) : null}
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
