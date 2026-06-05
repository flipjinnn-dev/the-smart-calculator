import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  alternateLanguagesForEnglishPath,
  canonicalFromRequestPathname,
  withSelfReferencingHreflang,
} from "@/lib/seo-hreflang";

const AUTH_EN_PATH = "/auth/signin";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || AUTH_EN_PATH;
  const canonicalUrl = canonicalFromRequestPathname(pathname);

  return {
    title: "Sign In - The Smart Calculator",
    description: "Sign in to access community features",
    alternates: {
      canonical: canonicalUrl,
      languages: withSelfReferencingHreflang(
        alternateLanguagesForEnglishPath(AUTH_EN_PATH),
        canonicalUrl,
        pathname
      ),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
