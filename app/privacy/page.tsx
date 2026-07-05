import PrivacyContent from "@/components/Legal/PrivacyContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Gyanvora collects, uses, and protects your personal information. Your privacy is our priority.",
  alternates: {
    canonical: "https://gyanvora.vercel.app/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Gyanvora",
    description: "Our commitment to protecting your privacy at Gyanvora.",
    url: "https://gyanvora.vercel.app/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
