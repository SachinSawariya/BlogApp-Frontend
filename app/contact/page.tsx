import ContactForm from "@/components/Contacts/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Gyanvora team. We're here to help with your AI and development inquiries.",
  alternates: {
    canonical: "https://gyanvora.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Us | Gyanvora",
    description: "Get in touch with the Gyanvora team.",
    url: "https://gyanvora.vercel.app/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    description: "Get in touch with the Gyanvora team. We're here to help with your AI and development inquiries.",
    url: "https://gyanvora.vercel.app/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Gyanvora",
      url: "https://gyanvora.vercel.app",
      contactPoint: {
        "@type": "ContactPoint",
        email: "sachin.developer32@gmail.com",
        contactType: "customer service",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactForm />
    </>
  );
}
