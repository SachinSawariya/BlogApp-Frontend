"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FiSearch, FiBookmark, FiLock } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about-us' },
  { name: 'Contact', href: '/contact' }
];

const mobileNavItems = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about-us' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const isActive = (href) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const isAdmin = user && user.role === 'admin';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" role="banner">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center pl-4 md:pl-0">
            <Link href="/" className="flex items-center" aria-label="Gyanvora Home">
              <span className="text-2xl font-bold text-blue-600" aria-label="Gyanvora Logo">
                <span className="md:hidden">Gv</span>
                <span className="hidden md:inline lg:hidden">Gv</span>
                <span className="hidden lg:inline">Gyanvora</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4 md:space-x-3 lg:space-x-8" aria-label="Main navigation">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    active 
                      ? "text-blue-600 font-bold" 
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                  {active && (
                    <div className="h-0.5 bg-blue-600 w-full mt-0.5 rounded-full" />
                  )}
                </Link>
              );
            })}
            
            {isAdmin && (
              <Link 
                href="/admin/dashboard" 
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-colors ${
                  pathname.startsWith('/admin') 
                    ? "text-indigo-600" 
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                <FiLock className="mb-0.5" />
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative" role="search">
              <label htmlFor="search-input" className="sr-only">Search articles</label>
              <input
                id="search-input"
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" aria-hidden="true" />
            </form>
            
            {/* For Future USE */}
            {/* <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => router.push('/saved')}
                className="p-2 text-gray-600 hover:text-blue-600"
                aria-label="Saved articles"
              >
                <FiBookmark className="h-5 w-5" />
              </button>
            </div> */}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                type="button"
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu" role="navigation" aria-label="Mobile navigation">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {mobileNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link 
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  active 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          {isAdmin && (
            <Link 
              href="/admin/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-bold transition-colors ${
                pathname.startsWith('/admin') 
                  ? "text-indigo-600 bg-indigo-50" 
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              <FiLock /> Admin Portal
            </Link>
          )}

          {/* For Future USE */}
          {/* <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="mt-3 space-y-1">
              <Link 
                href="/saved" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                Saved Articles
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;