"use client";
import { FiMap, FiHome, FiBookOpen, FiFolder, FiUser, FiFileText, FiShield, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function Sitemap() {
  const siteSections = [
    {
      title: "Main Pages",
      icon: FiHome,
      items: [
        { name: "Home", href: "/", description: "Homepage with latest articles and featured content" },
        { name: "Articles", href: "/articles", description: "Browse all articles by category and topic" },
        { name: "Categories", href: "/categories", description: "Explore content organized by categories" },
        { name: "Search", href: "/search", description: "Search for specific articles and topics" },
      ]
    },
    {
      title: "Content",
      icon: FiBookOpen,
      items: [
        { name: "All Articles", href: "/articles", description: "Complete collection of articles" },
        { name: "Featured Articles", href: "/articles#featured", description: "Hand-picked featured content" },
        { name: "Recent Articles", href: "/articles#recent", description: "Latest published articles" },
      ]
    },
    {
      title: "Categories",
      icon: FiFolder,
      items: [
        { name: "AI & Machine Learning", href: "/categories/ai-machine-learning", description: "Articles about AI and ML" },
        { name: "Web Development", href: "/categories/web-development", description: "Web development tutorials" },
        { name: "Mobile Development", href: "/categories/mobile-development", description: "Mobile app development" },
        { name: "DevOps & Cloud", href: "/categories/devops-cloud", description: "DevOps and cloud computing" },
        { name: "Programming Languages", href: "/categories/programming-languages", description: "Programming language guides" },
      ]
    },
    {
      title: "Company",
      icon: FiUser,
      items: [
        { name: "About Us", href: "/about-us", description: "Learn more about Gyanvora" },
        { name: "Contact", href: "/contact", description: "Get in touch with our team" },
      ]
    },
    {
      title: "Legal",
      icon: FiShield,
      items: [
        { name: "Privacy Policy", href: "/privacy", description: "How we protect your data and privacy" },
        { name: "Terms of Service", href: "/terms", description: "Terms and conditions for using our service" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors">
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
              <FiMap className="w-8 h-8" />
              <FiFileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Site Map
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Navigate through all pages and sections of Gyanvora website
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <div
                key={sectionIndex}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/60 rounded-lg flex items-center justify-center mr-3">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                </div>
                
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors duration-200 group"
                    >
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-900 dark:to-slate-900 dark:border dark:border-gray-800 rounded-xl p-8 text-white transition-colors">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Website Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-blue-100 dark:text-gray-400">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10+</div>
                <div className="text-blue-100">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-blue-100">Pages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-transparent dark:border-gray-800 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Can&apos;t Find What You&apos;re Looking For?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Use our search functionality to find specific articles, topics, or information. 
              If you need further assistance, feel free to contact our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <FiMap className="w-4 h-4 mr-2" />
                Search Website
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                <FiUser className="w-4 h-4 mr-2" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
