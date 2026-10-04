import { Article } from "../components/Articles/types/articlesTypes";

export interface RawApiArticle {
  id?: string;
  _id?: string;
  title?: string;
  content?: string;
  excerpt?: string;
  category?: string | { name: string; slug: string };
  categoryId?: string | { name: string; slug: string };
  slug?: string;
  readTime?: string;
  imageUrl?: string;
  coverImage?: string;
  likes?: number;
  comments?: number;
  views?: number;
  authorName?: string;
  createdAt?: string;
}

/**
 * Transforms article data from the API format to the frontend Article interface.
 * Handles differences in ID fields and ensures all required fields have defaults.
 * 
 * @param apiArticle - The article object returned from the API
 * @returns A formatted Article object for use in the frontend
 */
export const transformArticle = (apiArticle?: RawApiArticle | Article | null): Article => {
  if (!apiArticle) return {} as Article;

  const raw = apiArticle as RawApiArticle;
  return {
    _id: raw.id || raw._id || '',
    title: raw.title || 'Untitled',
    content: raw.content || raw.excerpt || '',
    category: (typeof raw.category === 'object' && raw.category !== null)
      ? raw.category
      : (raw.category || (typeof raw.categoryId === 'string' ? raw.categoryId : 'Uncategorized')),
    slug: raw.slug || '',
    readTime: raw.readTime || '5 min read',
    coverImage: raw.imageUrl || raw.coverImage || '',
    likes: raw.likes || 0,
    comments: raw.comments || 0,
    views: raw.views || 0,
    authorName: raw.authorName || 'Anonymous',
    createdAt: raw.createdAt || new Date().toISOString()
  };
};

/**
 * Transforms an array of API article objects.
 * 
 * @param apiArticles - Array of article objects from the API
 * @returns Array of transformed Article objects
 */
export const transformArticles = (apiArticles: (RawApiArticle | Article)[]): Article[] => {
  if (!Array.isArray(apiArticles)) return [];
  return apiArticles.map(transformArticle);
};
