import type { Metadata } from "next";
import { headers } from "next/headers";
import { normalizeUsername, createUsernameSlug } from "@/lib/utils/username-slug";
import {
  alternateLanguagesForEnglishPath,
  canonicalFromRequestPathname,
  withSelfReferencingHreflang,
  SITE_ORIGIN,
} from "@/lib/seo-hreflang";

interface ProfileLayoutParams {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: ProfileLayoutParams): Promise<Metadata> {
  try {
    const { username: rawUsername } = await params;
    const username = normalizeUsername(rawUsername);
    const usernameSlug = createUsernameSlug(username);
    const englishPath = `/profile/${usernameSlug}`;

    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || englishPath;
    const canonicalUrl = canonicalFromRequestPathname(pathname);

    return {
      title: `${username}'s Profile - Community`,
      description: `View ${username}'s profile, posts, and contributions on The Smart Calculator community.`,
      alternates: {
        canonical: canonicalUrl,
        languages: withSelfReferencingHreflang(
          alternateLanguagesForEnglishPath(englishPath),
          canonicalUrl,
          pathname
        ),
      },
      openGraph: {
        title: `${username}'s Profile`,
        description: `View ${username}'s profile and contributions on The Smart Calculator community.`,
        type: "profile",
        url: canonicalUrl,
        siteName: "Smart Calculator",
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: `${username}'s Profile`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${username}'s Profile`,
        description: `View ${username}'s profile and contributions on The Smart Calculator community.`,
        images: ["/og-image.png"],
      },
    };
  } catch (error) {
    console.error("Error generating profile metadata:", error);
    const englishPath = "/profile";
    return {
      title: "User Profile - Community",
      description: "View user profile on The Smart Calculator community.",
      alternates: {
        canonical: `${SITE_ORIGIN}${englishPath}`,
        languages: alternateLanguagesForEnglishPath(englishPath),
      },
      openGraph: {
        title: "User Profile",
        description: "View user profile on The Smart Calculator community.",
        type: "profile",
        siteName: "Smart Calculator",
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "User Profile",
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
