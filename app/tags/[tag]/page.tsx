import TagArticlesPageComponent from "@/components/Articles/TagArticlesPage";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import commonApi from "@/api";
import { Article, PaginationInfo } from "@/components/Articles/types/articlesTypes";

export const revalidate = 60;

type Props = {
  params: Promise<{ tag: string }>;
};

const formatTagFallback = (rawTag: string): string => {
  try {
    return decodeURIComponent(rawTag)
      .trim()
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  } catch {
    return rawTag;
  }
};

const getNormalizedTagSlug = (rawTag: string): string => {
  try {
    return decodeURIComponent(rawTag)
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "");
  } catch {
    return rawTag.trim().toLowerCase().replace(/[\s_]+/g, "-");
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const normalizedSlug = getNormalizedTagSlug(tag);
  let displayTag = formatTagFallback(tag);

  try {
    const response = await commonApi({
      action: "getArticlesByTag",
      parameters: [normalizedSlug],
    });
    if (response.data && response.data.tag) {
      displayTag = response.data.tag;
    }
  } catch (error) {
    console.error("Error fetching tag for metadata:", error);
  }

  return {
    title: `Articles tagged with #${displayTag}`,
    description: `Browse all articles and tutorials tagged with #${displayTag} on Gyanvora. Stay updated with the latest in AI and web development.`,
    keywords: [displayTag, "Blog", "Tutorials", "Tech", normalizedSlug],
    alternates: {
      canonical: `https://gyanvora.vercel.app/tags/${normalizedSlug}`,
    },
    openGraph: {
      title: `Explore articles about #${displayTag} | Gyanvora`,
      description: `Collection of insights and guides related to ${displayTag}.`,
      url: `https://gyanvora.vercel.app/tags/${normalizedSlug}`,
    },
  };
}

export default async function TagArticlesPage({ params }: Props) {
  const { tag } = await params;
  const normalizedSlug = getNormalizedTagSlug(tag);

  // If URL has spaces, %20, uppercase characters, or underscores, redirect to clean SEO slug
  if (tag !== normalizedSlug && decodeURIComponent(tag) !== normalizedSlug) {
    redirect(`/tags/${normalizedSlug}`);
  }

  let initialData: { articles: Article[]; pagination: PaginationInfo; tag?: string } | undefined = undefined;

  try {
    const response = await commonApi({
      action: "getArticlesByTag",
      parameters: [normalizedSlug],
    });
    initialData = response.data;
  } catch (error) {
    console.error("Error fetching tag articles for SSR:", error);
  }

  const displayTag = initialData?.tag || formatTagFallback(tag);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Articles tagged with #${displayTag}`,
    description: `Browse our collection of articles tagged with #${displayTag} on Gyanvora.`,
    url: `https://gyanvora.vercel.app/tags/${normalizedSlug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://gyanvora.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tags",
          item: `https://gyanvora.vercel.app/tags/${normalizedSlug}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: displayTag,
          item: `https://gyanvora.vercel.app/tags/${normalizedSlug}`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TagArticlesPageComponent tag={normalizedSlug} initialData={initialData || undefined} />
    </>
  );
}
