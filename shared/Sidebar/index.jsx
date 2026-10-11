"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiChevronDown, FiChevronRight, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { sections } from '@/data/articles';

const Sidebar = ({ activeArticle, onArticleSelect }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const initialState = {};
    sections.forEach(section => {
      initialState[section.id] = true;
    });
    setExpandedSections(initialState);
    
    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [activeArticle]);

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <div className="md:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      )}

      {/* Overlay */}
      {isMobileMenuOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:relative top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-30 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        aria-label="Article navigation"
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Documentation</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Browse all tutorials and guides</p>
            
            {/* Search on all devices */}
            <div className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-2">
            <nav className="space-y-1">
              {sections.map((section) => (
                <div key={section.id} className="mb-2">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between text-left py-2 px-3 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                    aria-expanded={expandedSections[section.id]}
                    aria-controls={`section-${section.id}`}
                  >
                    <span>{section.title}</span>
                    {expandedSections[section.id] ? (
                      <FiChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <FiChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  
                  <div 
                    id={`section-${section.id}`}
                    className={`transition-all duration-200 overflow-hidden ${
                      expandedSections[section.id] ? 'max-h-96 mt-1' : 'max-h-0'
                    }`}
                  >
                    <div className="py-1 pl-4 pr-2 space-y-1">
                      {section.articles.map((article) => (
                        <button
                          key={article.id}
                          onClick={(e) => {
                            e.preventDefault();
                            onArticleSelect(article.id);
                          }}
                          className={`w-full text-left py-2 px-4 text-sm rounded-md transition-colors ${
                            activeArticle === article.id 
                              ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-medium' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {article.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div>
          
          {/* Bottom gradient for content indication */}
          <div className="sticky bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
