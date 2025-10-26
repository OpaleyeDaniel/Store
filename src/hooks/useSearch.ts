import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/types';
import { products } from '@/lib/data';

export interface SearchFilters {
  colors?: string[];
  sizes?: string[];
  priceRange?: [number, number];
  categories?: string[];
}

export interface SearchOptions {
  query: string;
  filters?: SearchFilters;
  sortBy?: 'relevance' | 'price-low' | 'price-high' | 'newest';
}

export const useSearch = () => {
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    query: '',
    sortBy: 'relevance'
  });
  
  const [isSearching, setIsSearching] = useState(false);

  const searchResults = useMemo(() => {
    const { query, filters, sortBy } = searchOptions;
    
    if (!query.trim()) return [];

    let results = products.filter(product => {
      // Text search
      const matchesQuery = 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.variants.some(variant => 
          variant.colorName.toLowerCase().includes(query.toLowerCase())
        );

      if (!matchesQuery) return false;

      // Apply filters
      if (filters) {
        // Color filter
        if (filters.colors && filters.colors.length > 0) {
          const productColors = product.variants.map(v => v.colorName.toLowerCase());
          if (!filters.colors.some(color => 
            productColors.includes(color.toLowerCase())
          )) return false;
        }

        // Price filter
        if (filters.priceRange) {
          const price = product.compareAtCents || product.priceCents;
          if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
            return false;
          }
        }

        // Category filter
        if (filters.categories && filters.categories.length > 0) {
          const matchesCategory = filters.categories.some(category => {
            switch (category.toLowerCase()) {
              case 'leggings':
                return product.title.toLowerCase().includes('leggings');
              case 'sports-bras':
                return product.title.toLowerCase().includes('bra');
              case 'tops':
                return product.title.toLowerCase().includes('tank') || 
                       product.title.toLowerCase().includes('top') ||
                       product.title.toLowerCase().includes('tee');
              case 'shorts':
                return product.title.toLowerCase().includes('short');
              case 'seamless':
                return product.title.toLowerCase().includes('seamless');
              case 'sport':
                return product.title.toLowerCase().includes('sport');
              case 'arrivals':
                return product.title.toLowerCase().includes('arrival');
              default:
                return true;
            }
          });
          if (!matchesCategory) return false;
        }
      }

      return true;
    });

    // Sort results
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => {
          const priceA = a.compareAtCents || a.priceCents;
          const priceB = b.compareAtCents || b.priceCents;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        results.sort((a, b) => {
          const priceA = a.compareAtCents || a.priceCents;
          const priceB = b.compareAtCents || b.priceCents;
          return priceB - priceA;
        });
        break;
      case 'newest':
        results.sort((a, b) => {
          const aIsNew = a.title.toLowerCase().includes('arrival');
          const bIsNew = b.title.toLowerCase().includes('arrival');
          if (aIsNew && !bIsNew) return -1;
          if (!aIsNew && bIsNew) return 1;
          return 0;
        });
        break;
      case 'relevance':
      default:
        // Keep original order for relevance
        break;
    }

    return results;
  }, [searchOptions]);

  const updateSearch = (options: Partial<SearchOptions>) => {
    setSearchOptions(prev => ({ ...prev, ...options }));
  };

  const clearSearch = () => {
    setSearchOptions({ query: '', sortBy: 'relevance' });
  };

  // Simulate search delay for better UX
  useEffect(() => {
    if (searchOptions.query) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 200);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchOptions.query]);

  const getSuggestions = (query: string, limit = 5): string[] => {
    if (!query.trim()) return [];
    
    const suggestions = new Set<string>();
    
    products.forEach(product => {
      const title = product.title.toLowerCase();
      const searchQuery = query.toLowerCase();
      
      if (title.includes(searchQuery)) {
        suggestions.add(product.title);
      }
      
      product.variants.forEach(variant => {
        if (variant.colorName.toLowerCase().includes(searchQuery)) {
          suggestions.add(`${product.title} - ${variant.colorName}`);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, limit);
  };

  return {
    searchOptions,
    searchResults,
    isSearching,
    updateSearch,
    clearSearch,
    getSuggestions,
    totalResults: searchResults.length
  };
};
