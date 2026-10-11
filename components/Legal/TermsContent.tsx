"use client";
import { FiFileText, FiCheckCircle, FiBook, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function TermsContent() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 text-white border-b border-transparent dark:border-gray-800/80 transition-colors">
        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-0"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white dark:bg-blue-600 opacity-5 dark:opacity-10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white dark:bg-purple-600 opacity-5 dark:opacity-10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12">
          <div className="flex items-center mb-6">
            <Link 
              href="/"
              className="flex items-center text-white/90 hover:text-white transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <FiFileText className="w-8 h-8" />
              <FiBook className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using Gyanvora website and services.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 transition-colors">
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-white">Last Updated:</strong> {lastUpdated}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiFileText className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                Agreement to Terms
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  By accessing and using Gyanvora (the &quot;Website&quot;), you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiCheckCircle className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                Use License
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Permission is granted to temporarily download one copy of the materials on Gyanvora for personal, non-commercial transitory viewing only.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
