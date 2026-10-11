"use client";

import { useAdminDashboard } from '@/components/Admin/hooks/useAdminDashboard';
import { ManageArticles } from '@/components/Admin/ManageArticles';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';

export default function ManageArticlesPage() {
  const { user, isLoading } = useAdminDashboard();

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-10 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/admin/dashboard" className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-300 border border-gray-100 dark:border-gray-700/80 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm">
            <FiChevronLeft size={20} />
          </Link>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Manage Articles</h1>
        </div>

        <ManageArticles />
      </div>
    </div>
  );
}
