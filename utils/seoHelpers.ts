import { Metadata } from "next";
import { Article } from "@/components/Articles/types/articlesTypes";

export const DEFAULT_OG_IMAGE = "https://gyanvora.vercel.app/images/sachin-pic.png";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://gyanvora.vercel.app";

/**
 * Strips HTML tags and normalizes whitespace to extract a plain text snippet.
 */
export function extractTextSnippet(html?: string, maxLength = 160): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>?/gm, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}
export type CategoryLike = string | { name?: string; slug?: string } | null | undefined;

/**
 * Safely extracts normalized category name and slug from string or Category object.
 */
export function normalizeCategory(category: CategoryLike): { name: string; slug: string } {
  if (!category) return { name: "General", slug: "general" };
  if (typeof category === "string") {
    return {
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, "-"),
    };
  }
  return {
    name: category.name || "General",
    slug: category.slug || (category.name ? category.name.toLowerCase().replace(/\s+/g, "-") : "general"),
  };
}

/**
 * Builds Next.js Metadata object for an article detail page.
 */
export function buildArticleMetadata(
  article: Article | null,
  slug: string,
  previousImages: NonNullable<NonNullable<Metadata["openGraph"]>["images"]> = []
): Metadata {
  if (!article) {
    return {
      title: "Article Not Found | Gyanvora",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = article.seoCanonicalUrl || `${BASE_URL}/articles/${slug}`;
  const metaTitle = article.seoTitle || article.title;
  const metaDesc =
    article.seoDescription ||
    extractTextSnippet(article.content, 160) ||
    "Read this interesting article on Gyanvora.";
  const keywords = article.seoKeywords
    ? article.seoKeywords.split(",").map((k) => k.trim()).filter(Boolean)
    : article.tags || [];
  const ogImage = article.seoOgImage || article.coverImage || DEFAULT_OG_IMAGE;

  const prevImgList = Array.isArray(previousImages)
    ? previousImages
    : previousImages
    ? [previousImages]
    : [];

  return {
    title: metaTitle,
    description: metaDesc,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      images: ogImage ? [ogImage, ...prevImgList] : prevImgList,
      type: "article",
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt || article.createdAt,
      authors: [article.seoAuthor || article.authorName || "Gyanvora Team"],
      tags: keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: ogImage ? [ogImage] : [],
    },
  };
}

/**
 * Builds JSON-LD structured schema (BlogPosting & BreadcrumbList) for an article.
 */
export function buildArticleJsonLd(article: Article, slug: string) {
  const { name: categoryName, slug: categorySlug } = normalizeCategory(article.category);
  const canonicalUrl = article.seoCanonicalUrl || `${BASE_URL}/articles/${slug}`;
  const metaTitle = article.seoTitle || article.title;
  const metaDesc =
    article.seoDescription ||
    extractTextSnippet(article.content, 160) ||
    "Read this interesting article on Gyanvora.";
  const ogImage = article.seoOgImage || article.coverImage || DEFAULT_OG_IMAGE;
  const keywordsString = article.seoKeywords || article.tags?.join(", ");

  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: metaTitle,
      description: metaDesc,
      image: ogImage,
      datePublished: article.createdAt,
      dateModified: article.updatedAt || article.createdAt,
      author: {
        "@type": "Person",
        name: article.seoAuthor || article.authorName || "Gyanvora Team",
        url: `${BASE_URL}/about-us`,
      },
      publisher: {
        "@type": "Organization",
        name: "Gyanvora",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.svg`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      keywords: keywordsString,
      articleSection: categoryName,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Articles",
          item: `${BASE_URL}/articles`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryName,
          item: `${BASE_URL}/categories/${categorySlug}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: metaTitle,
          item: canonicalUrl,
        },
      ],
    },
  ];
}

/**
 * Escapes unsafe XML characters for RSS feeds and XML sitemaps.
 */
export function escapeXml(unsafe: string): string {
  return (unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

