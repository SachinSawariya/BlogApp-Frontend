"use client";

import { useWriteArticle } from '@/components/Admin/hooks/useWriteArticle';
import { WriteArticleHeader } from '@/components/Admin/WriteArticleHeader';
import { WriteArticleForm } from '@/components/Admin/WriteArticleForm';

export default function WriteArticlePage() {
  const { user, authLoading } = useWriteArticle();

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-10 lg:py-16">
        <WriteArticleHeader />
        <WriteArticleForm />
      </div>
    </div>
  );
}
