const baseUrl = 'api/v1';

export const apiList = {
  // Auth
  login: {
    url: () => `/${baseUrl}/auth/login`,
    method: 'POST'
  },
  getProfile: {
    url: () => `/${baseUrl}/auth/profile`,
    method: 'GET'
  },

  // Articles
  getArticleSections: {
    url: () => `/${baseUrl}/blogs/get-sections`,
    method: 'GET'
  },
  getBlogList: {
    url: () => `/${baseUrl}/blogs/all-articles`,
    method: 'GET'
  },
  getFeaturedArticles: {
    url: () => `/${baseUrl}/blogs/featured-articles`,
    method: 'GET'
  },
  getArticlBySlug: {
    url: (slug) => `/${baseUrl}/blogs/article/${slug}`,
    method: 'GET'
  },
  getArticleSEO: {
    url: (slug) => `/${baseUrl}/blogs/article-seo/${slug}`,
    method: 'GET'
  },
  getCategoryArticles: {
    url: (slug, page = 1, limit = 12) => `/${baseUrl}/blogs/articles/${slug}?page=${page}&limit=${limit}`,
    method: 'GET'
  },
  getArticlesByTag: {
    url: (tag, page = 1, limit = 12) => `/${baseUrl}/blogs/tag/${tag}?page=${page}&limit=${limit}`,
    method: 'GET'
  },
  createBlog: {
    url: () => `/${baseUrl}/blogs`,
    method: 'POST'
  },
  getAdminBlogList: {
    url: () => `/${baseUrl}/blogs/admin-articles`,
    method: 'GET'
  },
  getAdminArticleBySlug: {
    url: (slug) => `/${baseUrl}/blogs/admin-article/${slug}`,
    method: 'GET'
  },
  updateBlog: {

    url: (id) => `/${baseUrl}/blogs/${id}`,
    method: 'PUT'
  },
  deleteBlog: {
    url: (id) => `/${baseUrl}/blogs/${id}`,
    method: 'DELETE'
  },

  // Categories
  getCategoriesList: {
    url: () => `/${baseUrl}/categories/list`,
    method: 'GET'
  },
  getTopCategories: {
    url: () => `/${baseUrl}/categories/top-categories`,
    method: 'GET'
  },
  getCategoryArticlesTitles: {
    url: (category) => `/${baseUrl}/categories/${category}/articles/titles`,
    method: 'GET'
  },

  // Contacts
  saveContactFormMsgToDB: {
    url: () => `/${baseUrl}/contact/send-msg`,
    method: 'POST'
  },
  getAllMsg: {
    url: () => `/${baseUrl}/contact/get-msgs`,
    method: 'GET'
  },

};

export default apiList;
