"use client";

import { useState, useEffect } from 'react';
import commonApi from '@/api';

interface SEODrawerData {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoCanonicalUrl: string;
  seoAuthor: string;
  seoOgImage: string;
}

interface UseSEODrawerReturn {
  formData: SEODrawerData;
  isSaving: boolean;
  isLoadingArticle: boolean;
  error: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => Promise<void>;
}

export interface SEODrawerArticleTarget {
  _id: string;
  title: string;
  slug: string;
}

export const useSEODrawer = (
  article: SEODrawerArticleTarget | null,
  isOpen: boolean,
  onSuccess: () => void,
  onClose: () => void
): UseSEODrawerReturn => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);
  
  const [formData, setFormData] = useState<SEODrawerData>({
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    seoCanonicalUrl: '',
    seoAuthor: '',
    seoOgImage: ''
  });

  useEffect(() => {
    const fetchArticleSEO = async () => {
      if (article && isOpen) {
        setIsLoadingArticle(true);
        try {
          const response = await commonApi({
            action: 'getArticleSEO',
            parameters: [article.slug]
          });
          const fetchedSEO = response.data;
          setFormData({
            seoTitle: fetchedSEO.seoTitle || '',
            seoDescription: fetchedSEO.seoDescription || '',
            seoKeywords: fetchedSEO.seoKeywords || '',
            seoCanonicalUrl: fetchedSEO.seoCanonicalUrl || '',
            seoAuthor: fetchedSEO.seoAuthor || '',
            seoOgImage: fetchedSEO.seoOgImage || ''
          });
        } catch (err) {
          console.error('Error fetching article SEO data:', err);
        } finally {
          setIsLoadingArticle(false);
        }
      } else if (!isOpen) {
        setFormData({
          seoTitle: '',
          seoDescription: '',
          seoKeywords: '',
          seoCanonicalUrl: '',
          seoAuthor: '',
          seoOgImage: ''
        });
      }
    };

    fetchArticleSEO();
  }, [article, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!article) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      await commonApi({
        action: 'updateBlog',
        parameters: [article._id],
        data: formData
      });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error('Error saving SEO data:', err);
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : err instanceof Error
          ? err.message
          : 'Failed to save SEO data';
      setError(message || 'Failed to save SEO data');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    formData,
    isSaving,
    isLoadingArticle,
    error,
    handleChange,
    handleSave
  };
};
