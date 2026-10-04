"use client";

import { useState, useEffect } from 'react';
import commonApi from '@/api';

interface Article {
  _id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  categoryId: {
    name: string;
    slug: string;
  };
  createdAt: string;
  views: number;
}

export const useManageArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await commonApi({
        action: 'getAdminBlogList'
      });
      setArticles(response.data || []);
    } catch (err) {
      setError('Failed to fetch articles');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const [indexingSlug, setIndexingSlug] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await commonApi({
        action: 'deleteBlog',
        parameters: [id]
      });
      setArticles(prev => prev.filter(article => article._id !== id));
    } catch (err) {
      alert('Failed to delete article');
      console.error(err);
    }
  };

  const handleIndexUrl = async (slug: string) => {
    try {
      setIndexingSlug(slug);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gyanvora.vercel.app';
      const url = `${baseUrl}/articles/${slug}`;
      
      await commonApi({
        action: 'indexUrl',
        data: { url, type: 'URL_UPDATED' }
      });
      
      alert('URL indexing request sent to Google successfully');
    } catch (err) {
      alert('Failed to send indexing request');
      console.error(err);
    } finally {
      setIndexingSlug(null);
    }
  };

  return {
    articles,
    isLoading,
    error,
    indexingSlug,
    handleDelete,
    handleIndexUrl,
    refreshArticles: fetchArticles
  };
};
