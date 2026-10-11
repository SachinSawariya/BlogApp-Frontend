"use client";

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export const WriteArticleHeader = () => {
  return (
    <>
      <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors group">
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>
      
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Write New <span className="text-blue-600 dark:text-blue-400">Article</span></h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Create high-quality content for your developers community</p>
      </div>
    </>
  );
};
