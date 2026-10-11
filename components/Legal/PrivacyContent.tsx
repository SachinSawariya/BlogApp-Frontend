"use client";
import { FiShield, FiLock, FiDatabase, FiEye, FiMail, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function PrivacyContent() {
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
              <FiShield className="w-8 h-8" />
              <FiLock className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                <FiEye className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  At Gyanvora, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information when you visit our website and use our services.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and email address when subscribing to our newsletter</li>
                  <li>Comments and feedback you provide on our articles</li>
                  <li>Contact information when you reach out to us</li>
                  <li>Account information for registered users</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiDatabase className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Send newsletters and updates you subscribe to</li>
                  <li>Respond to your inquiries and provide support</li>
                  <li>Improve our website and user experience</li>
                  <li>Analyze usage patterns and optimize content</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiLock className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                Data Protection and Security
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiMail className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-lg p-6 border border-transparent dark:border-gray-800">
                  <ul className="space-y-2">
                    <li><strong className="text-gray-900 dark:text-white">Email:</strong> sachin.developer32@gmail.com</li>
                    <li><strong className="text-gray-900 dark:text-white">Website:</strong> <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:text-blue-700">Contact Form</Link></li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
