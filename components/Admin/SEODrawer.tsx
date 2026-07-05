"use client";

import { useState, useEffect } from 'react';
import { FiX, FiSave, FiAlertCircle } from 'react-icons/fi';
import commonApi from '@/api';
import { Article } from '@/components/Articles/types/articlesTypes';

interface SEODrawerProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
  onSuccess: () => void;
}

export const SEODrawer = ({ isOpen, onClose, article, onSuccess }: SEODrawerProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    seoCanonicalUrl: '',
    seoAuthor: '',
    seoOgImage: ''
  });

  useEffect(() => {
    if (article) {
      setFormData({
        seoTitle: article.seoTitle || '',
        seoDescription: article.seoDescription || '',
        seoKeywords: article.seoKeywords || '',
        seoCanonicalUrl: article.seoCanonicalUrl || '',
        seoAuthor: article.seoAuthor || '',
        seoOgImage: article.seoOgImage || ''
      });
    }
  }, [article]);

  if (!isOpen) return null;

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
    } catch (err: any) {
      console.error('Error saving SEO data:', err);
      setError(err?.response?.data?.message || 'Failed to save SEO data');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-gray-900/40  backdrop-blur-sm z-[100] transition-opacity duration-300" 
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 max-w-xl w-full bg-white shadow-2xl z-[110] transform transition-transform duration-300 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-black text-gray-900">SEO Settings</h2>
            <p className="text-sm text-gray-500 mt-1 truncate max-w-[280px]">
              {article?.title}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
              <FiAlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block">SEO Title</label>
            <input 
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleChange}
              placeholder="Custom title for search engines"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block">SEO Description</label>
            <textarea 
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleChange}
              rows={4}
              placeholder="Meta description for search results"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block">SEO Keywords</label>
            <input 
              type="text"
              name="seoKeywords"
              value={formData.seoKeywords}
              onChange={handleChange}
              placeholder="Comma separated keywords (e.g., tech, coding)"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block">Canonical URL</label>
            <input 
              type="text"
              name="seoCanonicalUrl"
              value={formData.seoCanonicalUrl}
              onChange={handleChange}
              placeholder="Override default canonical URL"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block">SEO Author</label>
            <input 
              type="text"
              name="seoAuthor"
              value={formData.seoAuthor}
              onChange={handleChange}
              placeholder="Author name for metadata"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block">OpenGraph Image URL</label>
            <input 
              type="text"
              name="seoOgImage"
              value={formData.seoOgImage}
              onChange={handleChange}
              placeholder="URL for social media image preview"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FiSave size={18} />
                Save SEO
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
