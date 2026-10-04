"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import commonApi from '@/api';

interface Category {
  _id: string;
  name: string;
}

interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  categoryId: string;
  authorName: string;
  authorAvatar: string;
  tags: string;
  readTime: number;
  section: string;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';
type SlugStatus = 'checking' | 'unique' | 'taken' | 'idle';

const INITIAL_FORM_STATE: BlogFormData = {
  title: '',
  slug: '',
  content: '',
  coverImage: '',
  categoryId: '',
  authorName: '',
  authorAvatar: '',
  tags: '',
  readTime: 5,
  section: 'Regular'
};

export const useWriteArticle = (editSlug?: string) => {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [originalStatus, setOriginalStatus] = useState<'published' | 'draft' | null>(null);
  const [formData, setFormData] = useState<BlogFormData>(INITIAL_FORM_STATE);
  
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [isSlugUnique, setIsSlugUnique] = useState<SlugStatus>('idle');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetKey, setResetKey] = useState(0);

  // Helper: Slug generator
  const generateSlug = useCallback((text: string) => {
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await commonApi({ action: 'getCategoriesList' });
        setCategories(response.data || []);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch article if in edit mode
  useEffect(() => {
    if (!editSlug) return;

    const fetchArticle = async () => {
      try {
        const response = await commonApi({
          action: 'getAdminArticleBySlug',
          parameters: [editSlug]
        });

        if (response.data) {
          const art = response.data;
          setArticleId(art.id || art._id);
          setIsEdit(true);
          setOriginalStatus(art.status);
          setFormData({
            title: art.title || '',
            slug: art.slug || '',
            content: art.content || '',
            coverImage: art.coverImage || '',
            categoryId: art.category?._id || art.categoryId || '',
            authorName: art.authorName || '',
            authorAvatar: art.authorAvatar || '',
            tags: Array.isArray(art.tags) ? art.tags.join(', ') : (art.tags || ''),
            readTime: art.readTime || 5,
            section: art.section || 'Regular'
          });
          setIsSlugManual(true);
        }
      } catch (err) {
        console.error("Error fetching article for edit", err);
        setErrorMessage("Failed to load article data");
      }
    };
    fetchArticle();
  }, [editSlug]);

  // Slug uniqueness check
  useEffect(() => {
    if (!formData.slug || isEdit) {
      setIsSlugUnique('idle');
      return;
    }

    const timer = setTimeout(async () => {
      setIsSlugUnique('checking');
      try {
        const response = await commonApi({
          action: 'getArticlBySlug',
          parameters: [formData.slug]
        });
        
        const isTaken = response.data && typeof response.data === 'object' && response.data.id;
        setIsSlugUnique(isTaken ? 'taken' : 'unique');
      } catch (err: unknown) {
        const error = err as { status?: number };
        setIsSlugUnique(error.status === 404 ? 'unique' : 'idle');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.slug, isEdit]);

  // Auth Protection & Author pre-fill
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/admin/login');
      return;
    }
    
    if (user && !isEdit) {
      setFormData(prev => ({ 
        ...prev, 
        authorName: user.name, 
        authorAvatar: user.avatar || '' 
      }));
    }
  }, [user, authLoading, router, isEdit]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'slug') setIsSlugManual(true);

    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'title' && !isSlugManual) {
        newData.slug = generateSlug(value);
      }
      return newData;
    });
  }, [isSlugManual, generateSlug]);

  const resetForm = useCallback(() => {
    setFormData({
      ...INITIAL_FORM_STATE,
      authorName: user?.name || '',
      authorAvatar: user?.avatar || ''
    });
    setResetKey(prev => prev + 1);
  }, [user]);


  const validateForm = useCallback(() => {
    const requiredFields: Record<string, string> = {
      title: 'Title',
      slug: 'Slug',
      categoryId: 'Category',
      content: 'Content'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field as keyof BlogFormData]) {
        const element = document.getElementById(field);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
            element.focus();
          }
        }
        return `${label} is required.`;
      }
    }
    return null;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent, mode: 'published' | 'draft' = 'published') => {
    e.preventDefault();

    if (isSlugUnique === 'taken' && !isEdit) {
      setStatus('error');
      setErrorMessage('This slug is already taken. Please choose a unique one.');
      return;
    }

    // Restriction: Can't revert published to draft
    if (isEdit && originalStatus === 'published' && mode === 'draft') {
      setStatus('error');
      setErrorMessage('This article is already published and cannot be reverted to a draft.');
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setStatus('error');
      setErrorMessage(validationError);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const action = isEdit ? 'updateBlog' : 'createBlog';
      const parameters = isEdit ? [articleId] : [];
      
      const payload = {
        ...formData,
        status: mode,
        tags: typeof formData.tags === 'string' 
          ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') 
          : formData.tags,
        readTime: Number(formData.readTime)
      };

      const response = await commonApi({ action, parameters, data: payload });

      const isSuccess = response.code === 'DEFAULT' || response.status === 200 || response.status === 201 || response.data;

      if (isSuccess) {
        setStatus('success');
        if (!isEdit) resetForm();
      } else {
        setStatus('error');
        setErrorMessage(response.message || 'Failed to save blog');
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setStatus('error');
      setErrorMessage(error.response?.data?.message || error.message || 'Something went wrong');
    }
  }, [isEdit, isSlugUnique, originalStatus, articleId, formData, validateForm, resetForm]);

  return {
    user,
    authLoading,
    categories,
    formData,
    status,
    errorMessage,
    isSlugUnique,
    isEdit,
    originalStatus,
    articleId,
    handleChange,
    handleSubmit,
    setFormData,
    setStatus,
    resetKey,
    router
  };
};
