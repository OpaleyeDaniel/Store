import { useState, useMemo } from 'react';
import { Product, FilterState, SortBy } from '@/types';
import { 
  products, 
  filterProducts, 
  sortProducts, 
  getProductsByCategory, 
  getProductsByCollection,
  getFeaturedProducts,
  getNewProducts
} from '@/lib/data';

export const useProducts = (initialFilters?: FilterState, initialSort: SortBy = 'featured') => {
  const [filters, setFilters] = useState<FilterState>(initialFilters || {});
  const [sortBy, setSortBy] = useState<SortBy>(initialSort);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sortBy);
  }, [filters, sortBy]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const clearFilter = (key: keyof FilterState) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  return {
    products: filteredAndSortedProducts,
    filters,
    sortBy,
    setFilters,
    setSortBy,
    updateFilter,
    clearFilters,
    clearFilter,
    totalProducts: filteredAndSortedProducts.length
  };
};

export const useProductsByCategory = (categoryId: string) => {
  return useMemo(() => getProductsByCategory(categoryId), [categoryId]);
};

export const useProductsByCollection = (collectionId: string) => {
  return useMemo(() => getProductsByCollection(collectionId), [collectionId]);
};

export const useFeaturedProducts = () => {
  return useMemo(() => getFeaturedProducts(), []);
};

export const useNewProducts = () => {
  return useMemo(() => getNewProducts(), []);
};