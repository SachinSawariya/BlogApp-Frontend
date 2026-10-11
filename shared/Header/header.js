"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FiSearch, FiLock } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/shared/ThemeToggle/ThemeToggle";

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
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200" role="banner">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center pl-4 md:pl-0">
            <Link href="/" className="flex items-center" aria-label="Gyanvora Home">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-500" aria-label="Gyanvora Logo">
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
                      ? "text-blue-600 dark:text-blue-400 font-bold" 
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.name}
                  {active && (
                    <div className="h-0.5 bg-blue-600 dark:bg-blue-400 w-full mt-0.5 rounded-full" />
                  )}
                </Link>
              );
            })}
            
            {isAdmin && (
              <Link 
                href="/admin/dashboard" 
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-colors ${
                  pathname.startsWith('/admin') 
                    ? "text-indigo-600 dark:text-indigo-400" 
                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                <FiLock className="mb-0.5" />
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4 pr-3 sm:pr-0">
            <form onSubmit={handleSearch} className="relative" role="search">
              <label htmlFor="search-input" className="sr-only">Search articles</label>
              <input
                id="search-input"
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            </form>

            {/* Theme Toggle (Desktop & Tablet) */}
            <div className="hidden sm:block">
              <ThemeToggle variant="dropdown" />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-1">
              <div className="sm:hidden">
                <ThemeToggle variant="icon-only" />
              </div>
              <button 
                type="button"
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg`} id="mobile-menu" role="navigation" aria-label="Mobile navigation">
        <div className="px-4 pt-2 pb-4 space-y-1">
          {mobileNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link 
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  active 
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-bold" 
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
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
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40" 
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <FiLock /> Admin Portal
            </Link>
          )}

          <div className="pt-2">
            <ThemeToggle variant="mobile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;