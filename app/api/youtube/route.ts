import { NextRequest, NextResponse } from 'next/server'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://smartcalculator.com',
  'https://www.smartcalculator.com'
]

// Simple in-memory rate limiting (replace with Redis in production)
const requestCounts = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10 // requests per window
const RATE_WINDOW = 60000 // 1 minute in milliseconds

interface YouTubeChannelData {
  channelId: string
  title: string
  thumbnail: string
  subscriberCount: string
  viewCount: string
  videoCount: string
  country?: string
  publishedAt?: string
}

// Rate limiting middleware
function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const userLimit = requestCounts.get(identifier)

  if (!userLimit || now > userLimit.resetTime) {
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + RATE_WINDOW
    })
    return true
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false
  }

  userLimit.count++
  return true
}

// Sanitize input to prevent injection attacks
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>'"]/g, '') // Remove potentially dangerous characters
    .substring(0, 500) // Limit length
}

// Extract channel ID from various input formats
function extractChannelInfo(input: string): { type: 'id' | 'handle' | 'url', value: string } {
  const trimmed = input.trim()
  
  // Check if it's a channel URL
  if (trimmed.includes('youtube.com/channel/')) {
    const match = trimmed.match(/youtube\.com\/channel\/([a-zA-Z0-9_-]+)/)
    if (match) return { type: 'id', value: match[1] }
  }
  
  // Check if it's a handle URL
  if (trimmed.includes('youtube.com/@')) {
    const match = trimmed.match(/youtube\.com\/@([a-zA-Z0-9_-]+)/)
    if (match) return { type: 'handle', value: match[1] }
  }
  
  // Check if it starts with @ (handle)
  if (trimmed.startsWith('@')) {
    return { type: 'handle', value: trimmed.substring(1) }
  }
  
  // Check if it starts with UC (channel ID)
  if (trimmed.startsWith('UC')) {
    return { type: 'id', value: trimmed }
  }
  
  // Default to handle
  return { type: 'handle', value: trimmed }
}

// Resolve handle to channel ID
async function resolveHandle(handle: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${handle}&key=${YOUTUBE_API_KEY}`
    )
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    
    if (data.items && data.items.length > 0) {
      return data.items[0].id
    }
    
    return null
  } catch (error) {
    console.error('Error resolving handle:', error)
    return null
  }
}

// Fetch channel data by ID
async function fetchChannelData(channelId: string): Promise<YouTubeChannelData | null> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
    )
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    
    if (!data.items || data.items.length === 0) {
      return null
    }
    
    const channel = data.items[0]
    
    return {
      channelId: channel.id,
      title: channel.snippet.title,
      thumbnail: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.default?.url,
      subscriberCount: channel.statistics.subscriberCount || '0',
      viewCount: channel.statistics.viewCount || '0',
      videoCount: channel.statistics.videoCount || '0',
      country: channel.snippet.country,
      publishedAt: channel.snippet.publishedAt
    }
  } catch (error) {
    console.error('Error fetching channel data:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check origin for CORS security
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    
    // In development, allow localhost; in production, check allowed origins
    const isDevelopment = process.env.NODE_ENV === 'development'
    const isAllowedOrigin = isDevelopment || 
      (origin && ALLOWED_ORIGINS.includes(origin)) ||
      (referer && ALLOWED_ORIGINS.some(allowed => referer.startsWith(allowed)))
    
    if (!isAllowedOrigin && !isDevelopment) {
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      )
    }

    // Rate limiting based on IP
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    if (!YOUTUBE_API_KEY) {
      return NextResponse.json(
        { error: 'YouTube API key not configured' },
        { status: 500 }
      )
    }
    
    const body = await request.json()
    const { input } = body
    
    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    // Sanitize input
    const sanitizedInput = sanitizeInput(input)
    
    if (sanitizedInput.length === 0) {
      return NextResponse.json(
        { error: 'Invalid input after sanitization' },
        { status: 400 }
      )
    }
    
    // Extract channel info
    const channelInfo = extractChannelInfo(input)
    
    let channelId: string | null = null
    
    if (channelInfo.type === 'id') {
      channelId = channelInfo.value
    } else if (channelInfo.type === 'handle') {
      channelId = await resolveHandle(channelInfo.value)
    }
    
    if (!channelId) {
      return NextResponse.json(
        { error: 'Could not resolve channel. Please check the input and try again.' },
        { status: 404 }
      )
    }
    
    // Fetch channel data
    const channelData = await fetchChannelData(channelId)
    
    if (!channelData) {
      return NextResponse.json(
        { error: 'Channel not found or API quota exceeded. Please try again later.' },
        { status: 404 }
      )
    }
    
    // Create response with CORS headers
    const response = NextResponse.json({
      success: true,
      data: channelData
    })

    // Add security headers (reuse origin from earlier)
    if (origin && (ALLOWED_ORIGINS.includes(origin) || process.env.NODE_ENV === 'development')) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
    response.headers.set('Access-Control-Allow-Methods', 'POST')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    
    return response
    
  } catch (error) {
    console.error('YouTube API Error:', error)
    
    // Don't expose internal error details
    const errorMessage = error instanceof Error && process.env.NODE_ENV === 'development'
      ? error.message
      : 'An error occurred while fetching channel data'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const requestOrigin = request.headers.get('origin')
  const response = new NextResponse(null, { status: 204 })
  
  if (requestOrigin && (ALLOWED_ORIGINS.includes(requestOrigin) || process.env.NODE_ENV === 'development')) {
    response.headers.set('Access-Control-Allow-Origin', requestOrigin)
  }
  response.headers.set('Access-Control-Allow-Methods', 'POST')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  response.headers.set('Access-Control-Max-Age', '86400')
  
  return response
}
