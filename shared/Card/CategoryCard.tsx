'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiTag } from 'react-icons/fi';
import type { ReactNode, MouseEvent, ComponentType } from 'react';

interface CategoryCardProps {
  name: string;
  count: number;
  icon?: ComponentType<{ className?: string }> | string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  href?: string;
  children?: ReactNode;
}

export const CategoryCard = ({
  name,
  count,
  icon: Icon = FiTag,
  className = '',
  onClick,
  href,
  children,
}: CategoryCardProps) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (onClick) {
      onClick(e);
    } else if (href) {
      router.push(href);
    }
  };

  const renderIcon = () => {
    if (!Icon) return null;
    
    if (typeof Icon === 'string') {
      return (
        <span className="text-2xl" role="img" aria-label={name}>
          {Icon}
        </span>
      );
    }
    
    return <Icon className="text-2xl text-blue-600 dark:text-blue-400" />;
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`block bg-white dark:bg-gray-800/95 border border-gray-100 dark:border-gray-700/60 p-6 rounded-xl shadow-md dark:shadow-black/30 text-center hover:shadow-lg transition-all transform hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-500 ${className}`}
      >
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/60 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
          {renderIcon()}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
          {count} {count === 1 ? 'article' : 'articles'}
        </p>
        {children}
      </Link>
    );
  }

  return (
    <div 
      className={`bg-white dark:bg-gray-800/95 border border-gray-100 dark:border-gray-700/60 p-6 rounded-xl shadow-md dark:shadow-black/30 text-center hover:shadow-lg transition-all cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick(e)}
    >
      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/60 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
        {renderIcon()}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
        {count} {count === 1 ? 'article' : 'articles'}
      </p>
      {children}
    </div>
  );
};

export default CategoryCard;

