import { useState, useEffect, useRef } from 'react';
import { X, Search, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/data';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingSearches = ['seamless leggings', 'sport shorts', 'arrival collection', 'tank tops'];

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      const searchResults = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.variants.some(variant => 
          variant.colorName.toLowerCase().includes(query.toLowerCase())
        )
      ).slice(0, 6); // Limit to 6 results for better UX
      
      setTimeout(() => {
        setResults(searchResults);
        setIsSearching(false);
      }, 200); // Small delay to show loading state
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [query]);

  const handleTrendingSearch = (term: string) => {
    setQuery(term);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-primary/20 text-primary">$1</mark>');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 animate-fade-in">
      <div className="container mx-auto px-4 py-8 h-full flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Search Products</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={24} />
            </Button>
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for products, colors, or collections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg rounded-lg border-2 focus:border-primary"
            />
          </div>

          {/* Content - Scrollable Area */}
          <div className="flex-1 overflow-y-auto space-y-8">
            {/* Trending Searches (shown when no query) */}
            {!query && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={20} className="text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Trending Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <Badge
                      key={term}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleTrendingSearch(term)}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isSearching && (
              <div className="text-center py-8">
                <div className="animate-pulse">Searching...</div>
              </div>
            )}

            {/* Search Results */}
            {query && !isSearching && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {results.length > 0 ? `Found ${results.length} products` : 'No products found'}
                </h3>
                
                {results.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((product) => (
                      <div key={product.id} onClick={onClose}>
                        <ProductCard 
                          product={product}
                          showQuickAdd={true}
                          showWishlist={true}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground mb-4">
                      No products found for "{query}"
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">Try searching for:</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {trendingSearches.map((term) => (
                          <Badge
                            key={term}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => handleTrendingSearch(term)}
                          >
                            {term}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;