import TermsContent from "@/components/Legal/TermsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using the Gyanvora website and services.",
  alternates: {
    canonical: "https://gyanvora.vercel.app/terms",
  },
  openGraph: {
    title: "Terms of Service | Gyanvora",
    description: "Terms and conditions for Gyanvora.",
    url: "https://gyanvora.vercel.app/terms",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
