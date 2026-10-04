import commonApi from '@/api';
import { Article } from '@/components/Articles/types/articlesTypes';
import { escapeXml, extractTextSnippet, normalizeCategory } from '@/utils/seoHelpers';

export const revalidate = 3600; // Refresh RSS feed every hour

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gyanvora.vercel.app';

  let articles: Article[] = [];
  try {
    const response = await commonApi({
      action: 'getBlogList',
      config: { next: { revalidate: 3600 } },
    });
    articles = response?.data || [];
  } catch (error) {
    console.error('Error fetching articles for RSS feed:', error);
  }

  // Sort by latest first
  articles.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA;
  });

  const itemsXml = articles
    .map((article) => {
      const articleUrl = `${baseUrl}/articles/${article.slug}`;
      const pubDate = new Date(article.createdAt || Date.now()).toUTCString();
      const { name: categoryName } = normalizeCategory(article.category);
      const cleanDesc = extractTextSnippet(article.seoDescription || article.content || '', 300);

      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${cleanDesc}]]></description>
      <category>${escapeXml(categoryName)}</category>
      ${article.authorName ? `<author>${escapeXml(article.authorName)}</author>` : ''}
    </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Gyanvora - AI for Developers</title>
    <link>${baseUrl}</link>
    <description>A comprehensive blog about AI, machine learning, and modern web development for developers.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
