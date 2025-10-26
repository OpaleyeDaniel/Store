export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  priceCents: number;
  compareAtCents?: number | null;
  currency: string;
  gender?: string | null;
  fit?: string | null;
  categories: string[];
  collections: string[];
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  colorName: string;
  size?: string | null;
  priceCents: number;
  images: ProductImage[];
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductColor {
  name: string;
  value: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentCategory?: string;
  image: string;
  sortOrder: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  type: string;
  featured: boolean;
  products: string[];
}

export interface ContentBlock {
  id: string;
  type: 'hero' | 'collection_showcase' | 'editorial' | 'product_grid';
  title: string;
  subtitle?: string;
  description?: string;
  cta_text: string;
  cta_link: string;
  background_image: string;
  position: string;
}

export interface FilterState {
  category?: string;
  collection?: string;
  priceRange?: [number, number];
  colors?: string[];
  sizes?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

export type SortBy = 'featured' | 'newest' | 'price-low' | 'price-high' | 'name-az' | 'name-za';