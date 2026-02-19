import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - The Smart Calculator",
  description: "Sign in to access community features",
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/auth/signin',
    languages: {
      'x-default': 'https://www.thesmartcalculator.com/auth/signin',
      'en': 'https://www.thesmartcalculator.com/auth/signin',
      'pt-BR': 'https://www.thesmartcalculator.com/auth/signin',
      'pl': 'https://www.thesmartcalculator.com/auth/signin',
      'de': 'https://www.thesmartcalculator.com/auth/signin',
      'es': 'https://www.thesmartcalculator.com/auth/signin',
    }
  },
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
