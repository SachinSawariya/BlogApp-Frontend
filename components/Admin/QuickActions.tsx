"use client";

import Link from 'next/link';
import { FiPlusCircle, FiLayout, FiMessageSquare } from 'react-icons/fi';

export const QuickActions = () => {
  return (
    <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
      <Link href="/admin/write" className="group p-8 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-600/20 hover:scale-[1.02] transition-all">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <FiPlusCircle size={28} />
        </div>
        <h3 className="text-2xl font-bold mb-2">Write Article</h3>
        <p className="text-blue-100 font-medium">Create and publish a new blog post to the site.</p>
      </Link>

      <Link href="/admin/manage" className="group p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-100/50 dark:shadow-none hover:border-blue-100 dark:hover:border-blue-900/50 hover:scale-[1.02] transition-all">
        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/60 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
          <FiLayout size={28} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Manage Blogs</h3>
        <p className="text-gray-500 dark:text-gray-400 font-medium">View, edit, or delete your existing blog articles.</p>
      </Link>

      <Link href="/admin/messages" className="group p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-100/50 dark:shadow-none hover:border-indigo-100 dark:hover:border-indigo-900/50 hover:scale-[1.02] transition-all sm:col-span-2">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0 w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
            <FiMessageSquare size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Messages</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium">View contact form submissions sent by users.</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
