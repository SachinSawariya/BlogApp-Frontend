export interface Category {
  name: string;
  count: number;
  slug: string;
  icon?: string;
}

/**
 * Assigns an emoji icon based on category name
 */
export const getCategoryIcon = (categoryName: string): string => {
  const name = categoryName.toLowerCase();
  
  if (name.includes('ai') || name.includes('machine learning') || name.includes('ml')) {
    return '🤖';
  } else if (name.includes('web') || name.includes('javascript') || name.includes('react')) {
    return '🌐';
  } else if (name.includes('data') || name.includes('analytics')) {
    return '📊';
  } else if (name.includes('cloud') || name.includes('aws') || name.includes('azure')) {
    return '☁️';
  } else if (name.includes('devops') || name.includes('docker') || name.includes('kubernetes')) {
    return '🔧';
  } else if (name.includes('mobile') || name.includes('ios') || name.includes('android')) {
    return '📱';
  } else if (name.includes('security') || name.includes('cyber')) {
    return '🔒';
  } else if (name.includes('database') || name.includes('sql')) {
    return '🗄️';
  } else if (name.includes('python') || name.includes('programming')) {
    return '🐍';
  } else if (name.includes('design') || name.includes('ui') || name.includes('ux')) {
    return '🎨';
  } else {
    return '📚'; // Default icon
  }
};

export interface RawApiCategory {
  name?: string;
  title?: string;
  articleCount?: number;
  count?: number;
  slug?: string;
  icon?: string;
  [key: string]: unknown;
}

/**
 * Transforms category data from the API format to the frontend Category interface.
 */
export const transformCategory = (apiCategory?: RawApiCategory | null): Category => {
  if (!apiCategory) return {} as Category;

  const name = apiCategory.name || apiCategory.title || 'Unknown';
  return {
    name: name,
    count: apiCategory.articleCount || apiCategory.count || 0,
    slug: apiCategory.slug || name.toLowerCase().replace(/\s+/g, '-') || 'unknown',
    icon: apiCategory.icon || getCategoryIcon(name)
  };
};

/**
 * Transforms an array of API category objects.
 */
export const transformCategories = (apiCategories: RawApiCategory[]): Category[] => {
  if (!Array.isArray(apiCategories)) return [];
  return apiCategories.map(transformCategory);
};
