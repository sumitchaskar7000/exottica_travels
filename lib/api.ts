import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DestinationOption {
  id: string;
  name: string;
  type: string;
  country?: string;
  code?: string;
}

export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  status: "draft" | "published";
  featured: boolean;
  views?: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PageData {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
  status: "draft" | "published";
  featured: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SpecialOffer {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  discount: number;
  discountType: "percentage" | "fixed";
  originalPrice?: number;
  discountedPrice?: number;
  code: string;
  validFrom: string;
  validUntil: string;
  image: string;
  destinations: string[];
  packages: string[];
  terms: string;
  status: "active" | "expired" | "draft";
  featured: boolean;
  remainingUses?: number;
  usesCount: number;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Image Upload ────────────────────────────────────────────────────────────

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  
  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

// ─── Destinations ────────────────────────────────────────────────────────────

export async function fetchDestinations(query: string): Promise<DestinationOption[]> {
  if (!query || query.length < 2) return [];
  try {
    const response = await api.get(`/destinations?q=${encodeURIComponent(query)}`);
    return response.data.destinations ?? [];
  } catch {
    return [];
  }
}

export async function fetchPackages(destination?: string): Promise<{ slug: string; title: string; destination: string; duration: string; priceFrom: string }[]> {
  try {
    const url = destination?.trim()
      ? `/packages?destination=${encodeURIComponent(destination)}`
      : "/packages";
    const response = await api.get(url);
    return response.data.packages ?? [];
  } catch {
    return [];
  }
}

// ─── Blog API ────────────────────────────────────────────────────────────────

export const blogAPI = {
  
  // Public routes (no auth required)
  getPublicPosts: (params?: { category?: string; search?: string; featured?: boolean }) =>
    api.get("/blog/public", { params }),
  
  getPublicPostBySlug: (slug: string) => api.get(`/blog/public/${slug}`),
  
  getPublicCategories: () => api.get("/blog/public/categories"),
  
  // Admin routes (auth required)
  getPages: (params?: { status?: string; category?: string; search?: string }) =>
    api.get("/blog/pages", { params }),
  
  getPage: (id: string) => api.get(`/blog/pages/${id}`),
  
  createPage: (data: Partial<BlogPost>) => api.post("/blog/pages", data),
  
  updatePage: (id: string, data: Partial<BlogPost>) => api.put(`/blog/pages/${id}`, data),
  
  deletePage: (id: string) => api.delete(`/blog/pages/${id}`),
  
  getCategories: () => api.get("/blog/categories"),
};

// ─── Special Offers API ─────────────────────────────────────────────────────

export const specialOffersAPI = {
  // Public routes (no auth required)
  getPublicOffers: () => api.get("/special-offers/public"),
  getPublicOfferBySlug: (slug: string) => api.get(`/special-offers/public/${slug}`),
  validateOfferCode: (data: { code: string; destination?: string; packageId?: string }) =>
    api.post("/special-offers/validate", data),
  
  // Admin routes (auth required)
  getAllOffers: () => api.get("/special-offers"),
  getOfferStats: () => api.get("/special-offers/stats"),
  getOfferById: (id: string) => api.get(`/special-offers/${id}`),
  createOffer: (data: Partial<SpecialOffer>) => api.post("/special-offers", data),
  updateOffer: (id: string, data: Partial<SpecialOffer>) => api.put(`/special-offers/${id}`, data),
  deleteOffer: (id: string) => api.delete(`/special-offers/${id}`),
  incrementUsage: (id: string) => api.post(`/special-offers/${id}/usage`),
};

// ─── Auth API ────────────────────────────────────────────────────────────────

export const authAPI = {
  login: (email: string, password: string) => api.post("/auth/login", { email, password }),
  verify: () => api.get("/auth/verify"),
};

// ─── Pages API (for custom pages) ───────────────────────────────────────────

export const pagesAPI = {
  getPublicPages: () => api.get("/pages"),
  getPublicPageBySlug: (slug: string) => api.get(`/pages/${slug}`),
};

// ─── Newsletter API ─────────────────────────────────────────────────────────

export const newsletterAPI = {
  subscribe: (email: string, name?: string) => api.post("/newsletter", { email, name }),
};

// ─── Enquiries API ──────────────────────────────────────────────────────────

export const enquiriesAPI = {
  submitQuote: (data: {
    name: string;
    email: string;
    phone?: string;
    destination: string;
    departureDate?: string;
    travellers?: number;
    message?: string;
  }) => api.post("/enquiries/quote", data),
  
  submitContact: (data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) => api.post("/enquiries/contact", data),
};

// ─── Flights API ────────────────────────────────────────────────────────────

export const flightsAPI = {
  search: (params: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers?: number;
    cabinClass?: string;
  }) => api.post("/flights/search", params),
};

// ─── Helper Functions ───────────────────────────────────────────────────────

// Get all posts (for admin dashboard)
export const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await blogAPI.getPages();
    return response.data;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
};

// Get published posts only (for blog page)
export const getPublishedPosts = async (params?: { category?: string; search?: string; featured?: boolean }): Promise<BlogPost[]> => {
  try {
    const response = await blogAPI.getPublicPosts(params);
    return response.data;
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return [];
  }
};

// Get single post by slug
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await blogAPI.getPublicPostBySlug(slug);
    return response.data;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
};

// Get all categories
export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await blogAPI.getPublicCategories();
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Format date for display
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Admin API - alias for blogAPI methods with consistent naming
export const adminAPI = {
  getCategories: () => blogAPI.getCategories(),
  getPost: (id: string) => blogAPI.getPage(id),
  createPost: (data: Partial<BlogPost>) => blogAPI.createPage(data),
  updatePost: (id: string, data: Partial<BlogPost>) => blogAPI.updatePage(id, data),
  deletePost: (id: string) => blogAPI.deletePage(id),
  getPosts: (params?: { status?: string; category?: string; search?: string }) => blogAPI.getPages(params),
};

// Format read time from content length
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// ─── Default Export ─────────────────────────────────────────────────────────

export default api;