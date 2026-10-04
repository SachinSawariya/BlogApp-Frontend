import TagArticlesPageComponent from "@/components/Articles/TagArticlesPage";
import { Metadata } from "next";
import commonApi from "@/api";
import { Article, PaginationInfo } from "@/components/Articles/types/articlesTypes";

export const revalidate = 60;

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  let displayTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  try {
    const response = await commonApi({
      action: "getArticlesByTag",
      parameters: [tag],
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
    keywords: [displayTag, "Blog", "Tutorials", "Tech", tag],
    alternates: {
      canonical: `https://gyanvora.vercel.app/tags/${tag}`,
    },
    openGraph: {
      title: `Explore articles about #${displayTag} | Gyanvora`,
      description: `Collection of insights and guides related to ${displayTag}.`,
      url: `https://gyanvora.vercel.app/tags/${tag}`,
    },
  };
}

export default async function TagArticlesPage({ params }: Props) {
  const { tag } = await params;
  let initialData: { articles: Article[]; pagination: PaginationInfo; tag?: string } | undefined = undefined;

  try {
    const response = await commonApi({
      action: "getArticlesByTag",
      parameters: [tag],
    });
    initialData = response.data;
  } catch (error) {
    console.error("Error fetching tag articles for SSR:", error);
  }

  const displayTag = initialData?.tag || tag.charAt(0).toUpperCase() + tag.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Articles tagged with #${displayTag}`,
    description: `Browse our collection of articles tagged with #${displayTag} on Gyanvora.`,
    url: `https://gyanvora.vercel.app/tags/${tag}`,
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
          item: `https://gyanvora.vercel.app/tags/${tag}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: displayTag,
          item: `https://gyanvora.vercel.app/tags/${tag}`,
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
      <TagArticlesPageComponent tag={tag} initialData={initialData || undefined} />
    </>
  );
}
