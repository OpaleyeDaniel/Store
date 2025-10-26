import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { usePagination } from '@/hooks/usePagination';
import { ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import PaginationControls from '@/components/PaginationControls';

interface ProductGridDynamicProps {
  products: Product[];
  enablePagination?: boolean;
  itemsPerPage?: number;
}

const ProductGridDynamic = ({ 
  products, 
  enablePagination = true, 
  itemsPerPage = 6 
}: ProductGridDynamicProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
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
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found.</p>
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

  const ColorSwatch = ({ color, isSelected = false }: { color: string; isSelected?: boolean }) => {
    const colorMap: Record<string, string> = {
      black: 'bg-black',
      charcoal: 'bg-neutral-700',
      navy: 'bg-blue-900',
      gray: 'bg-neutral-400',
      white: 'bg-white border-2 border-neutral-200',
      forest: 'bg-green-800',
      blue: 'bg-blue-600',
      red: 'bg-red-600',
      green: 'bg-green-600'
    };

    return (
      <button
        className={`w-4 h-4 rounded-full ${colorMap[color.toLowerCase()] || 'bg-neutral-400'} ${
          isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
        } transition-all duration-200 hover:scale-110`}
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

export default ProductGridDynamic;