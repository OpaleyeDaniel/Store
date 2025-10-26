import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
}

interface UsePaginationReturn<T> {
  paginatedItems: T[];
  currentPage: number;
  totalPages: number;
  hasMoreItems: boolean;
  loadMore: () => void;
  reset: () => void;
  isShowingAll: boolean;
  setPage: (page: number) => void;
  goNext: () => void;
  goPrev: () => void;
}

export function usePagination<T>({ 
  items, 
  itemsPerPage = 6 
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const hasMoreItems = currentPage < totalPages;
  const isShowingAll = currentPage >= totalPages;

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const loadMore = () => {
    if (hasMoreItems) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const reset = () => {
    setCurrentPage(1);
  };

  const setPage = (page: number) => {
    const clamped = Math.max(1, Math.min(page, totalPages || 1));
    setCurrentPage(clamped);
  };

  const goNext = () => setPage(currentPage + 1);
  const goPrev = () => setPage(currentPage - 1);

  return {
    paginatedItems,
    currentPage,
    totalPages,
    hasMoreItems,
    loadMore,
    reset,
    isShowingAll,
    setPage,
    goNext,
    goPrev
  };
}