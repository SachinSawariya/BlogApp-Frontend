import CategoryArticlesPageComponent from "@/components/Articles/CategoryArticlesPage";
import { Metadata } from "next";
import commonApi from "@/api";
import { Article, PaginationInfo } from "@/components/Articles/types/articlesTypes";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = formatSlug(slug);

  return {
    title: `${categoryName} Articles`,
    description: `Explore the latest articles and tutorials in ${categoryName}. Stay updated with expert insights on Gyanvora.`,
    keywords: [categoryName, "Tutorials", "Guides", "Insights", "Gyanvora"],
    alternates: {
      canonical: `https://gyanvora.vercel.app/categories/${slug}`,
    },
    openGraph: {
      title: `${categoryName} - AI & Development Insights`,
      description: `Browse our collection of articles about ${categoryName}.`,
      url: `https://gyanvora.vercel.app/categories/${slug}`,
    },
  };
}

export default async function CategoryArticlesPage({ params }: Props) {
  const { slug } = await params;
  const categoryName = formatSlug(slug);
  let initialData: { articles: Article[]; pagination: PaginationInfo } | undefined = undefined;

  try {
    const response = await commonApi({
      action: "getCategoryArticles",
      parameters: [slug],
    });
    initialData = response.data;
  } catch (error) {
    console.error("Error fetching category articles for SSR:", error);
  }


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} Articles`,
    description: `Browse our collection of articles about ${categoryName} on Gyanvora.`,
    url: `https://gyanvora.vercel.app/categories/${slug}`,
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
          name: "Categories",
          item: "https://gyanvora.vercel.app/categories",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryName,
          item: `https://gyanvora.vercel.app/categories/${slug}`,
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
      <CategoryArticlesPageComponent slug={slug} initialData={initialData || undefined} />
    </>
  );
}
