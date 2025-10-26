import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { Heart, ShoppingCart } from 'lucide-react';
import QuickAddModal from '@/components/QuickAddModal';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
  showWishlist?: boolean;
  badgeOverride?: string;
  className?: string;
  animationDelay?: number;
}

const ProductCard = ({ 
  product, 
  showQuickAdd = true, 
  showWishlist = true, 
  badgeOverride,
  className = '',
  animationDelay = 0
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const { addItem } = useCart();
  const { state: wishlistState, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const formatPrice = (priceCents: number) => {
    return `${(priceCents / 100).toFixed(2)}`;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if product has multiple variants/sizes
    if (product.variants && product.variants.length > 1) {
      setQuickAddProduct(product);
    } else {
      // Add directly to cart for single variant products
      const variant = product.variants[0];
      addItem(product, 1, variant.id, variant.size);

      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      });
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isInWishlistAlready = isInWishlist(product.id);
    
    if (isInWishlistAlready) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.title} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.title} has been added to your wishlist.`,
      });
    }
  };

  const getBadges = () => {
    const badges = [];
    
    if (badgeOverride) {
      badges.push({ text: badgeOverride, className: 'bg-primary text-white' });
    } else {
      if (product.title.toLowerCase().includes('arrival')) {
        badges.push({ text: 'NEW', className: 'bg-electric-blue text-white' });
      }
      if (product.title.toLowerCase().includes('sport') || product.title.toLowerCase().includes('bestseller')) {
        badges.push({ text: 'BESTSELLER', className: 'bg-black text-white' });
      }
      if (product.compareAtCents) {
        badges.push({ text: 'SALE', className: 'bg-red-500 text-white' });
      }
    }
    
    return badges;
  };

  const ColorSwatch = ({ color, isSelected = false }: { color: string; isSelected?: boolean }) => {
    const getColorValue = (colorName: string): string => {
      const color = colorName.toLowerCase();
      
      // Handle compound colors (take the primary color)
      if (color.includes('/')) {
        const primaryColor = color.split('/')[0].trim();
        return getColorValue(primaryColor);
      }
      
      // Map specific product colors to accurate values
      const colorMap: Record<string, string> = {
        'build pink': '#FF69B4',
        'cherry purple': '#8B008B',
        'chestnut pink': '#CD5C5C',
        'heavy blue': '#1E3A8A',
        'smoke blue': '#6B82A6',
        'core olive': '#556B2F',
        'black': '#000000',
        'dark grey': '#374151',
        'silhouette grey': '#6B7280',
        'white': '#FFFFFF',
        'charcoal': '#374151',
        'navy': '#1E3A8A',
        'gray': '#6B7280',
        'forest': '#16A34A',
        'blue': '#3B82F6',
        'red': '#EF4444',
        'green': '#16A34A'
      };
      
      return colorMap[color] || '#9CA3AF';
    };

    const colorValue = getColorValue(color);
    const isWhite = colorValue === '#FFFFFF';

    return (
      <button
        className={`w-6 h-6 rounded-full ${isWhite ? 'border-2 border-neutral-200' : 'border border-neutral-200'} ${
          isSelected ? 'ring-2 ring-electric-blue ring-offset-2' : ''
        } transition-all duration-200 hover:scale-110`}
        style={{ backgroundColor: colorValue }}
        title={color}
      />
    );
  };

  const badges = getBadges();
  const primaryImage = product.variants[0]?.images[0];
  const secondaryImage = product.variants[0]?.images[1];
  const isProductInWishlist = isInWishlist(product.id);
  const colors = [...new Set(product.variants.map(v => v.colorName))].slice(0, 4);

  return (
    <>
      <div
        className={`product-card group ${className}`}
        style={{ animationDelay: `${animationDelay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {badges.map((badge, index) => (
            <span key={index} className={`${badge.className} px-3 py-1 text-xs font-semibold rounded-full`}>
              {badge.text}
            </span>
          ))}
        </div>

        {/* Wishlist Button */}
        {showWishlist && (
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full transition-all duration-200 hover:bg-white hover:scale-110"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${isProductInWishlist ? 'text-[#0da2e7]' : 'text-gray-600'}`} 
              fill={isProductInWishlist ? '#0da2e7' : 'none'}
            />
          </button>
        )}

        {/* Product Image */}
        <div className="aspect-square overflow-hidden">
          {primaryImage ? (
            <>
              <img
                src={primaryImage.url}
                alt={primaryImage.alt || product.title}
                className={`product-image transition-all duration-300 ${
                  isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {secondaryImage && (
                <img
                  src={secondaryImage.url}
                  alt={secondaryImage.alt || product.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
              <p className="text-neutral-400">No image</p>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-semibold text-lg mb-2 text-black hover:text-electric-blue transition-colors cursor-pointer h-14 flex items-start leading-tight">
              {product.title}
            </h3>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl font-bold text-black">
              ${formatPrice(product.priceCents)}
            </span>
            {product.compareAtCents && (
              <span className="text-sm text-neutral-500 line-through">
                ${formatPrice(product.compareAtCents)}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          {colors.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-neutral-600 mr-2">Colors:</span>
              {colors.map((color, colorIndex) => (
                <ColorSwatch
                  key={colorIndex}
                  color={color}
                  isSelected={colorIndex === 0}
                />
              ))}
              {product.variants.length > 4 && (
                <span className="text-xs text-neutral-500 ml-1">
                  +{product.variants.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Add to Cart Button */}
          {showQuickAdd && (
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-6 font-semibold rounded-full transition-all duration-300 ${
                isHovered
                  ? 'bg-electric-blue text-white transform scale-105'
                  : 'bg-black text-white hover:bg-electric-blue'
              }`}
            >
              <ShoppingCart className="w-4 h-4 inline mr-2" />
              ADD TO CART
            </button>
          )}
        </div>
      </div>

      {/* Quick Add Modal */}
      {quickAddProduct && (
        <QuickAddModal
          product={quickAddProduct}
          isOpen={!!quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
        />
      )}
    </>
  );
};

export default ProductCard;