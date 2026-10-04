"use client";

import { useAdminDashboard } from '@/components/Admin/hooks/useAdminDashboard';
import { WriteArticleForm } from '@/components/Admin/WriteArticleForm';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { useParams } from 'next/navigation';

export default function EditArticlePage() {
  const { user, isLoading } = useAdminDashboard();
  const params = useParams();
  const slug = params.slug as string;

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-6 md:pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8 flex items-center gap-4">
          <Link href="/admin/manage" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-500 border border-gray-100 hover:text-blue-600 transition-all shadow-sm">
            <FiChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Edit Article</h1>
        </div>
        <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
          <WriteArticleForm slug={slug} />
        </div>
      </div>
    </div>
  );
}
