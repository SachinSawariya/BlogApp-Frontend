import ArticleDetailComponent from "@/components/Article-details/ArticleDetailsPage";
import commonApi from "@/api";
import { Metadata, ResolvingMetadata } from "next";
import { Article } from "@/components/Articles/types/articlesTypes";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await commonApi({
      action: "getArticlBySlug",
      parameters: [slug],
    });
    const article: Article = response.data;

    if (!article) return { title: "Article Not Found" };

    const previousImages = (await parent).openGraph?.images || [];
    
    const canonicalUrl = article.seoCanonicalUrl || `https://gyanvora.vercel.app/articles/${slug}`;
    const metaTitle = article.seoTitle || article.title;
    const metaDesc = article.seoDescription || (article.content
      ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 160).trim()
      : "Read this interesting article on Gyanvora.");
    const keywords = article.seoKeywords ? article.seoKeywords.split(',').map(k => k.trim()) : (article.tags || []);
    const ogImage = article.seoOgImage || article.coverImage;

    return {
      title: metaTitle,
      description: metaDesc,
      keywords: keywords,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: metaTitle,
        description: metaDesc,
        url: canonicalUrl,
        images: ogImage
          ? [ogImage, ...previousImages]
          : previousImages,
        type: "article",
        publishedTime: article.createdAt,
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
  } catch (error) {
    console.error("Error generating metadata for article:", error);
    return { title: "Article | Gyanvora" };
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  let article: Article | undefined = undefined;
  let jsonLd = null;

  try {
    const response = await commonApi({
      action: "getArticlBySlug",
      parameters: [slug],
    });
    article = response.data;


    if (article) {
      const canonicalUrl = article.seoCanonicalUrl || `https://gyanvora.vercel.app/articles/${slug}`;
      const metaTitle = article.seoTitle || article.title;
      const metaDesc = article.seoDescription || (article.content
        ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 160).trim()
        : "Read this interesting article on Gyanvora.");
      const ogImage = article.seoOgImage || article.coverImage;
      const keywordsString = article.seoKeywords || article.tags?.join(", ");
        
      jsonLd = {
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
        },
        publisher: {
          "@type": "Organization",
          name: "Gyanvora",
          logo: {
            "@type": "ImageObject",
            url: "https://gyanvora.vercel.app/logo.svg",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        keywords: keywordsString,
        articleSection: typeof article.category === 'string' ? article.category : article.category?.name,
      };
    }
  } catch (error) {
    console.error("Error fetching article for JSON-LD:", error);
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ArticleDetailComponent initialArticle={article || undefined} />
    </>
  );
}
