import type { Metadata } from "next";
import { normalizeUsername, createUsernameSlug } from "@/lib/utils/username-slug";

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  try {
    // Normalize username from slug
    const username = normalizeUsername(params.username);
    const usernameSlug = createUsernameSlug(username);
    
    // Create properly slugified URL
    const profileUrl = `https://www.thesmartcalculator.com/profile/${usernameSlug}`;

    return {
      title: `${username}'s Profile - Community`,
      description: `View ${username}'s profile, posts, and contributions on The Smart Calculator community.`,
      alternates: {
        canonical: profileUrl,
        languages: {
          'x-default': profileUrl,
          'en': profileUrl,
        }
      },
      openGraph: {
        title: `${username}'s Profile`,
        description: `View ${username}'s profile and contributions on The Smart Calculator community.`,
        type: 'profile',
        url: profileUrl,
        siteName: 'Smart Calculator',
        images: [
          {
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: `${username}'s Profile`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${username}'s Profile`,
        description: `View ${username}'s profile and contributions on The Smart Calculator community.`,
        images: ['/og-image.png'],
      },
    };
  } catch (error) {
    console.error('Error generating profile metadata:', error);
    return {
      title: 'User Profile - Community',
      description: 'View user profile on The Smart Calculator community.',
      openGraph: {
        title: 'User Profile',
        description: 'View user profile on The Smart Calculator community.',
        type: 'profile',
        siteName: 'Smart Calculator',
        images: [
          {
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: 'User Profile',
          },
        ],
      },
    };
  }
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
