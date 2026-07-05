import AboutUs from "@/components/Abouts/about-us";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about the Gyanvora team, our mission to empower developers with AI, and our core values.",
  alternates: {
    canonical: "https://gyanvora.vercel.app/about-us",
  },
  openGraph: {
    title: "About Us | Gyanvora",
    description:
      "Discover the people and mission behind Gyanvora - AI for Developers.",
    url: "https://gyanvora.vercel.app/about-us",
    siteName: "Gyanvora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Gyanvora",
    description:
      "Discover the people and mission behind Gyanvora - AI for Developers.",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Us",
    description: "Learn more about the Gyanvora team, our mission to empower developers with AI, and our core values.",
    url: "https://gyanvora.vercel.app/about-us",
    mainEntity: {
      "@type": "Organization",
      name: "Gyanvora",
      url: "https://gyanvora.vercel.app",
      logo: "https://gyanvora.vercel.app/logo.svg",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutUs />
    </>
  );
}
