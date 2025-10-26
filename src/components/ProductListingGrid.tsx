import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart, Eye, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { usePagination } from '@/hooks/usePagination';
import ProductCard from '@/components/ProductCard';
import PaginationControls from '@/components/PaginationControls';

interface ProductListingGridProps {
  products: Product[];
  enablePagination?: boolean;
  itemsPerPage?: number;
}

const ProductListingGrid = ({ 
  products, 
  enablePagination = true, 
  itemsPerPage = 6 
}: ProductListingGridProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addItem } = useCart();
  const { toast } = useToast();

  const {
    paginatedItems: displayedProducts,
    currentPage,
    totalPages,
    reset,
    setPage
  } = usePagination({ 
    items: products, 
    itemsPerPage: enablePagination ? itemsPerPage : products.length 
  });

  // Reset pagination when products change
  useEffect(() => {
    reset();
  }, [products, reset]);

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-foreground mb-4">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  const handleQuickAdd = async (product: Product) => {
    // Check if product needs size/variant selection
    const hasMultipleVariants = product.variants.length > 1;
    const hasSizes = product.variants.some(v => v.size);
    
    if (hasMultipleVariants || hasSizes) {
      // Open modal for selection
      setQuickAddProduct(product);
    } else {
      // Direct add to cart
      const variant = product.variants[0];
      addItem(product, 1, variant?.colorName, undefined);
      
      toast({
        title: "Added to Cart!",
        description: `${product.title} added to your cart.`,
      });
    }
  };

  const handleModalAddToCart = async (product: Product, size: string) => {
    const variant = product.variants.find(v => v.size === size) || product.variants[0];
    addItem(product, 1, variant?.colorName, size || undefined);
    
    toast({
      title: "Added to Cart!",
      description: `${product.title} added to your cart.`,
    });
  };

  const getProductBadges = (product: Product) => {
    const badges = [];
    
    if (product.title.toLowerCase().includes('arrival')) {
      badges.push({ text: 'NEW', variant: 'default' as const });
    }
    
    if (product.title.toLowerCase().includes('sport') || product.title.toLowerCase().includes('bestseller')) {
      badges.push({ text: 'BESTSELLER', variant: 'secondary' as const });
    }
    
    if (product.compareAtCents) {
      badges.push({ text: 'SALE', variant: 'destructive' as const });
    }
    
    return badges;
  };

  const getAvailableSizes = (product: Product) => {
    const sizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))];
    return sizes.sort();
  };

  const ColorSwatch = ({ color }: { color: string }) => {
    // Map actual product colors to accurate visual representations
    const getColorValue = (colorName: string): string => {
      const color = colorName.toLowerCase();
      
      // Handle compound colors (take the primary color)
      if (color.includes('/')) {
        const primaryColor = color.split('/')[0].trim();
        return getColorValue(primaryColor);
      }
      
      // Map specific product colors to accurate hex values
      if (color.includes('build pink')) return '#FF69B4'; // Hot pink for Build Pink
      if (color.includes('cherry purple')) return '#8B008B'; // Dark magenta for Cherry Purple
      if (color.includes('chestnut pink')) return '#CD5C5C'; // Indian red for Chestnut Pink
      if (color.includes('heavy blue')) return '#1E3A8A'; // Deep blue
      if (color.includes('smoke blue')) return '#6B82A6'; // Steel blue
      if (color.includes('core olive')) return '#556B2F'; // Dark olive green
      if (color.includes('black')) return '#000000';
      if (color.includes('dark grey')) return '#374151';
      if (color.includes('silhouette grey')) return '#6B7280';
      if (color.includes('white')) return '#FFFFFF';
      
      // Fallback for unmapped colors
      return '#9CA3AF';
    };

    const colorValue = getColorValue(color);
    const isWhite = colorValue === '#FFFFFF';

    return (
      <div
        className={`w-5 h-5 rounded-full border ${isWhite ? 'border-2 border-neutral-300' : 'border-neutral-200'}`}
        style={{ backgroundColor: colorValue }}
        title={color}
      />
    );
  };

  return (
    <>
      <div className="grid-responsive stagger-children">
        {displayedProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            showQuickAdd={true}
            showWishlist={false}
            animationDelay={index * 50}
          />
        ))}
      </div>
      
      {/* Pagination */}
      {enablePagination && totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        </div>
      )}
    </>
  );
};

export default ProductListingGrid;