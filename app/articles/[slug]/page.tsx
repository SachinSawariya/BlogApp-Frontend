import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailComponent from "@/components/Article-details/ArticleDetailsPage";
import { fetchArticleBySlugServer, fetchCategoryArticlesServer } from "@/utils/serverApi";
import { buildArticleMetadata, buildArticleJsonLd, normalizeCategory } from "@/utils/seoHelpers";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlugServer(slug);
  const previousImages = (await parent).openGraph?.images || [];
  return buildArticleMetadata(article, slug, previousImages);
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchArticleBySlugServer(slug);

  // Return genuine 404 for search engines and crawlers
  if (!article) {
    notFound();
  }

  const { slug: categorySlug } = normalizeCategory(article.category);
  const categoryArticles = await fetchCategoryArticlesServer(categorySlug);
  const jsonLd = buildArticleJsonLd(article, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleDetailComponent
        initialArticle={article}
        initialCategoryArticles={categoryArticles}
      />
    </>
  );
}
