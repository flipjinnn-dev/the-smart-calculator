import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Smart Calculator",
  description: "Get in touch with the Smart Calculator team. Contact us for support, feedback, or partnership opportunities.",
  keywords: "contact smart calculator, support, feedback, calculator help",
  openGraph: {
    title: "Contact Us - Smart Calculator",
    description: "Get in touch with the Smart Calculator team. Contact us for support, feedback, or partnership opportunities.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
