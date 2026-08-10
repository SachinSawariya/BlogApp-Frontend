"use client";

import Link from 'next/link';
import { FiEdit2, FiTrash2, FiEye, FiClock, FiCheckCircle, FiMoreVertical, FiLayout, FiGlobe, FiRefreshCw } from 'react-icons/fi';
import { useManageArticles } from './hooks/useManageArticles';
import { ConfirmationModal } from '@/shared/Modal/ConfirmationModal';
import { useState } from 'react';
import { SEODrawer } from './SEODrawer';
import { Article } from '@/components/Articles/types/articlesTypes';


export const ManageArticles = () => {
  const { articles, isLoading, error, handleDelete, handleIndexUrl, refreshArticles } = useManageArticles();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null
  });
  const [seoDrawer, setSeoDrawer] = useState<{ isOpen: boolean; article: Article | null; isLoading: boolean }>({
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
      <div className="bg-white rounded-3xl p-12 border border-gray-100 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading your articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 font-bold text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
      <div className="p-8 border-bottom border-gray-100 flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">Articles Management</h2>
        <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold">
          {articles.length} Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Article</th>
              <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Stats</th>
              <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {articles.map((article) => (
              <tr key={article._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-900 line-clamp-1">{article.title}</span>
                    <span className="text-xs font-medium text-gray-400">{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider">
                    {article.categoryId?.name || 'Uncategorized'}
                  </span>
                </td>
                <td className="px-8 py-6">
                  {article.status === 'published' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">
                      <FiCheckCircle size={14} />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">
                      <FiClock size={14} />
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3 text-gray-500">
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
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="View Live"
                    >
                      <FiEye size={18} />
                    </Link>
                    <button 
                      onClick={() => setSeoDrawer({ isOpen: true, article: article as any, isLoading: false })}
                      className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                      title="SEO Settings"
                    >
                      <FiGlobe size={18} />
                    </button>
                    <button 
                      onClick={() => handleIndexUrl(article.slug)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                      title="Index with Google"
                    >
                      <FiRefreshCw size={18} />
                    </button>
                    <Link 
                      href={`/admin/edit/${article.slug}`}
                      className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </Link>
                    <button 
                      onClick={() => openDeleteModal(article._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
            <FiLayout size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">No articles found</h3>
            <p className="text-gray-500">Start by creating your first article.</p>
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

