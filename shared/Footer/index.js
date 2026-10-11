"use client";
import Link from "next/link";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

const footerNav = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about-us' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/SachinSawariya', icon: FiGithub },
  { name: 'Twitter', href: 'https://twitter.com', icon: FiTwitter },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sachin-kumar-a91a62223/', icon: FiLinkedin },
  { name: 'Email', href: 'mailto:sachin.developer32@gmail.com', icon: FiMail },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12 transition-colors duration-200" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-500" aria-label="Gyanvora Home">
                Gyanvora
              </Link>
            </div>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
              Empowering developers with AI insights, tutorials, and resources to build the future of technology.
            </p>
            <div className="mt-6 flex space-x-6">
              {socialLinks.map((item, key) => {
                const Icon = item.icon;
                return (
                  <a
                    key={key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Quick Links</h3>
            <nav className="mt-4 space-y-3" aria-label="Footer quick links">
              {footerNav.slice(0, 4).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 block transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Legal</h3>
            <nav className="mt-4 space-y-3" aria-label="Footer legal links">
              {footerNav.slice(4).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 block transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/site-map" className="text-base text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 block transition-colors">
                Sitemap
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {currentYear} Gyanvora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
