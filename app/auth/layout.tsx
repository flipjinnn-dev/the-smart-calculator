import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - The Smart Calculator",
  description: "Sign in to access community features",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
