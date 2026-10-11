"use client";

import Link from 'next/link';
import { FiEdit2, FiTrash2, FiEye, FiClock, FiCheckCircle, FiLayout, FiGlobe, FiRefreshCw } from 'react-icons/fi';
import { useManageArticles } from './hooks/useManageArticles';
import { ConfirmationModal } from '@/shared/Modal/ConfirmationModal';
import { useState } from 'react';
import { SEODrawer } from './SEODrawer';

interface ArticleSummary {
  _id: string;
  title: string;
  slug: string;
}

export const ManageArticles = () => {
  const { articles, isLoading, error, handleDelete, handleIndexUrl, indexingSlug, refreshArticles } = useManageArticles();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null
  });
  const [seoDrawer, setSeoDrawer] = useState<{ isOpen: boolean; article: ArticleSummary | null; isLoading: boolean }>({
    isOpen: false,
    article: null,
    isLoading: false
  });

  const openDeleteModal = (id: string) => {
    setDeleteModal({ isOpen: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: null });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      handleDelete(deleteModal.id);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-4 transition-colors">
        <div className="w-10 h-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading your articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 p-8 rounded-3xl border border-red-100 dark:border-red-900/40 font-bold text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-100/50 dark:shadow-none overflow-hidden transition-colors">
      <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Articles Management</h2>
        <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold">
          {articles.length} Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-800/40">
              <th className="px-8 py-5 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Article</th>
              <th className="px-8 py-5 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-8 py-5 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-8 py-5 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Stats</th>
              <th className="px-8 py-5 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
            {articles.map((article) => (
              <tr key={article._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-900 dark:text-white line-clamp-1">{article.title}</span>
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">
                    {article.categoryId?.name || 'Uncategorized'}
                  </span>
                </td>
                <td className="px-8 py-6">
                  {article.status === 'published' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/60 text-green-600 dark:text-green-400 text-xs font-bold">
                      <FiCheckCircle size={14} />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-xs font-bold">
                      <FiClock size={14} />
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <FiEye size={14} />
                      <span className="text-sm font-bold">{article.views}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/articles/${article.slug}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-all"
                      title="View Live"
                    >
                      <FiEye size={18} />
                    </Link>
                    <button 
                      onClick={() => setSeoDrawer({ isOpen: true, article, isLoading: false })}
                      className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-lg transition-all"
                      title="SEO Settings"
                    >
                      <FiGlobe size={18} />
                    </button>
                    <button 
                      onClick={() => handleIndexUrl(article.slug)}
                      disabled={indexingSlug === article.slug}
                      className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
                      title={indexingSlug === article.slug ? "Sending indexing request to Google..." : "Index with Google"}
                    >
                      <FiRefreshCw size={18} className={indexingSlug === article.slug ? "animate-spin text-green-600 dark:text-green-400" : ""} />
                    </button>
                    <Link 
                      href={`/admin/edit/${article.slug}`}
                      className="p-2 text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </Link>
                    <button 
                      onClick={() => openDeleteModal(article._id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {articles.length === 0 && (
        <div className="p-20 text-center flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-300 dark:text-gray-600">
            <FiLayout size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-400">Start by creating your first article.</p>
          </div>
          <Link href="/admin/write" className="mt-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all">
            Write New Article
          </Link>
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Article?"
        message="Are you sure you want to delete this article? This action cannot be undone."
        type="danger"
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
      
      <SEODrawer 
        isOpen={seoDrawer.isOpen}
        onClose={() => setSeoDrawer({ isOpen: false, article: null, isLoading: false })}
        article={seoDrawer.article}
        onSuccess={async () => {
          await refreshArticles();
          setSeoDrawer({ isOpen: false, article: null, isLoading: false });
        }}
      />
    </div>
  );
};

