import { Product, Category, Collection, ContentBlock, FilterState, SortBy } from '@/types';

// Import JSON data (these will be replaced with actual files)
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import collectionsData from '@/data/collections.json';
import contentBlocksData from '@/data/content-blocks.json';

export const products: Product[] = productsData as Product[];
export const categories: Category[] = categoriesData as Category[];
export const collections: Collection[] = collectionsData as Collection[];
export const contentBlocks: ContentBlock[] = contentBlocksData as ContentBlock[];

// Data utility functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const getCollectionById = (id: string): Collection | undefined => {
  return collections.find(collection => collection.id === id);
};

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find(collection => collection.slug === slug);
};

export const getContentBlocksByPosition = (position: string): ContentBlock[] => {
  return contentBlocks.filter(block => block.position === position);
};

export const getFeaturedProducts = (): Product[] => {
  // For now, return sport/arrival products as featured since we don't have isFeatured in data
  return products.filter(product => 
    product.title.toLowerCase().includes('sport') || 
    product.title.toLowerCase().includes('arrival')
  );
};

export const getNewProducts = (): Product[] => {
  // Return arrival products as new products
  return products.filter(product => product.title.toLowerCase().includes('arrival'));
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categories.includes(categoryId));
};

export const getProductsByCollection = (collectionId: string): Product[] => {
  const collection = collections.find(c => c.id === collectionId);
  if (!collection) return [];
  return products.filter(product => collection.products.includes(product.id.toString()));
};

// Filtering and sorting logic
export const filterProducts = (products: Product[], filters: FilterState): Product[] => {
  return products.filter(product => {
    // Handle URL-based category filtering (e.g., men-shorts, women-leggings)
    if (filters.category && filters.category.includes('-')) {
      const [gender, category] = filters.category.split('-');
      
      // Apply gender and category based filtering
      if (gender === 'men') {
        // Men's filtering logic
        const title = product.title.toLowerCase();
        
        // Exclude women's items
        if (title.includes('sports bra') || title.includes('bra') || 
            title.includes('leggings') || title.includes('seamless') ||
            title.includes('tube top') || title.includes('midi')) {
          return false;
        }
        
        // Apply category-specific filtering
        if (category === 'shorts' && !title.includes('short')) return false;
        if (category === 'tops' && !(title.includes('tee') || title.includes('shirt'))) return false;
        if (category === 'sport' && !(title.includes('sport') && !title.includes('bra'))) return false;
        if (category === 'arrivals' && !title.includes('arrival')) return false;
        
      } else if (gender === 'women') {
        // Women's filtering logic
        const title = product.title.toLowerCase();
        
        // Include only women's items
        if (!(product.gender === 'female' || 
              title.includes('seamless') || title.includes('sports bra') ||
              title.includes('leggings') || title.includes('tank') ||
              title.includes('tube top') || title.includes('midi'))) {
          return false;
        }
        
        // Apply category-specific filtering
        if (category === 'leggings' && !title.includes('leggings')) return false;
        if (category === 'sports-bras' && !title.includes('bra')) return false;
        if (category === 'tops' && !(title.includes('tank') || title.includes('top') || title.includes('tee'))) return false;
        if (category === 'seamless' && !title.includes('seamless')) return false;
      }
      
      return true;
    }
    
    // Handle gender-only filtering (e.g., just "men" or "women")
    if (filters.category === 'men') {
      const title = product.title.toLowerCase();
      // Exclude women's items
      if (title.includes('sports bra') || title.includes('bra') || 
          title.includes('leggings') || title.includes('seamless') ||
          title.includes('tube top') || title.includes('midi')) {
        return false;
      }
      return true;
    }
    
    if (filters.category === 'women') {
      const title = product.title.toLowerCase();
      // Include only women's items
      if (product.gender === 'female' || 
          title.includes('seamless') || title.includes('sports bra') ||
          title.includes('leggings') || title.includes('tank') ||
          title.includes('tube top') || title.includes('midi')) {
        return true;
      }
      return false;
    }

    // Regular category filter
    if (filters.category && !product.categories.includes(filters.category)) {
      return false;
    }

    // Collection filter
    if (filters.collection && !product.collections.includes(filters.collection)) {
      return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const price = product.compareAtCents || product.priceCents;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }
    }

    // Colors filter
    if (filters.colors && filters.colors.length > 0) {
      const productColors = product.variants.map(variant => variant.colorName.toLowerCase());
      if (!filters.colors.some(color => productColors.includes(color.toLowerCase()))) {
        return false;
      }
    }

    // New products filter (arrival products)
    if (filters.isNew === true && !product.title.toLowerCase().includes('arrival')) {
      return false;
    }

    // Featured products filter (sport/arrival products)
    if (filters.isFeatured === true && !(
      product.title.toLowerCase().includes('sport') || 
      product.title.toLowerCase().includes('arrival')
    )) {
      return false;
    }

    return true;
  });
};

export const sortProducts = (products: Product[], sortBy: SortBy): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'featured':
      return sorted.sort((a, b) => {
        const aFeatured = a.title.toLowerCase().includes('sport') || a.title.toLowerCase().includes('arrival');
        const bFeatured = b.title.toLowerCase().includes('sport') || b.title.toLowerCase().includes('arrival');
        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;
        return 0;
      });
    
    case 'newest':
      return sorted.sort((a, b) => {
        const aNew = a.title.toLowerCase().includes('arrival');
        const bNew = b.title.toLowerCase().includes('arrival');
        if (aNew && !bNew) return -1;
        if (!aNew && bNew) return 1;
        return 0;
      });
    
    case 'price-low':
      return sorted.sort((a, b) => {
        const priceA = a.compareAtCents || a.priceCents;
        const priceB = b.compareAtCents || b.priceCents;
        return priceA - priceB;
      });
    
    case 'price-high':
      return sorted.sort((a, b) => {
        const priceA = a.compareAtCents || a.priceCents;
        const priceB = b.compareAtCents || b.priceCents;
        return priceB - priceA;
      });
    
    case 'name-az':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    
    case 'name-za':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    
    default:
      return sorted;
  }
};