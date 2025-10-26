import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Plus, Percent } from 'lucide-react';
import { getProductsByCategory, products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';

interface ProductRecommendationsProps {
  currentProduct: Product;
  relatedProducts: Product[];
}

const ProductRecommendations = ({ currentProduct, relatedProducts }: ProductRecommendationsProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  
  // Handle quick add to cart
  const handleQuickAdd = (product: Product) => {
    // Get the first available variant and size
    const firstVariant = product.variants[0];
    const firstSize = firstVariant?.size;
    
    if (!firstVariant) {
      toast({
        title: "Error",
        description: "Product variant not available",
        variant: "destructive",
      });
      return;
    }

    // Add item to cart using the cart context function
    addItem(product, 1, firstVariant.colorName, firstSize);
    
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart`,
    });
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (product: Product) => {
    const productInWishlist = isInWishlist(product.id);
    
    if (productInWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.title} has been removed from your wishlist`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist", 
        description: `${product.title} has been added to your wishlist`,
      });
    }
  };
  
  // Determine current product gender
  const getCurrentProductGender = (product: Product) => {
    const title = product.title.toLowerCase();
    if (title.includes("women's") || title.includes('bra') || title.includes('legging')) return 'women';
    if (title.includes("men's") || title.includes('short')) return 'men';
    return 'unisex';
  };
  
  const currentGender = getCurrentProductGender(currentProduct);

  // Enhanced related products with fallbacks
  const getEnhancedRelatedProducts = () => {
    let enhancedProducts = [...relatedProducts];
    
    // If we have fewer than 4 related products, add gender-matched products
    if (enhancedProducts.length < 4) {
      const genderMatchedProducts = products
        .filter(p => {
          const productGender = getCurrentProductGender(p);
          const isGenderCompatible = productGender === currentGender || productGender === 'unisex' || currentGender === 'unisex';
          const isNotCurrent = p.id !== currentProduct.id;
          const isNotAlreadyIncluded = !enhancedProducts.find(existing => existing.id === p.id);
          
          return isGenderCompatible && isNotCurrent && isNotAlreadyIncluded;
        })
        .slice(0, 4 - enhancedProducts.length);
      
      enhancedProducts = [...enhancedProducts, ...genderMatchedProducts];
    }
    
    // If still not enough, add any remaining products
    if (enhancedProducts.length < 4) {
      const remainingProducts = products
        .filter(p => {
          const isNotCurrent = p.id !== currentProduct.id;
          const isNotAlreadyIncluded = !enhancedProducts.find(existing => existing.id === p.id);
          
          return isNotCurrent && isNotAlreadyIncluded;
        })
        .slice(0, 4 - enhancedProducts.length);
      
      enhancedProducts = [...enhancedProducts, ...remainingProducts];
    }
    
    return enhancedProducts.slice(0, 8); // Limit to 8 total products
  };

  const enhancedRelatedProducts = getEnhancedRelatedProducts();

  // Get "complete the look" suggestions (complementary items) with gender filtering
  const completeTheLook = products
    .filter(p => {
      // Check gender compatibility first
      const productGender = getCurrentProductGender(p);
      const isGenderCompatible = productGender === currentGender || productGender === 'unisex' || currentGender === 'unisex';
      
      const isComplementary = 
        (currentProduct.title.toLowerCase().includes('legging') && p.title.toLowerCase().includes('bra')) ||
        (currentProduct.title.toLowerCase().includes('bra') && p.title.toLowerCase().includes('legging')) ||
        (currentProduct.title.toLowerCase().includes('top') && p.title.toLowerCase().includes('bottom')) ||
        (currentProduct.title.toLowerCase().includes('short') && p.title.toLowerCase().includes('top'));
      
      return isGenderCompatible && isComplementary && p.id !== currentProduct.id;
    })
    .slice(0, 4);

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(2);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(enhancedRelatedProducts.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(enhancedRelatedProducts.length / 4)) % Math.ceil(enhancedRelatedProducts.length / 4));
  };

  return (
    <div className="space-y-12">
      {/* You May Also Like */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">You May Also Like</h2>
          {enhancedRelatedProducts.length > 4 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevSlide}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextSlide}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {enhancedRelatedProducts.map((product) => (
              <div key={product.id} className="flex-none w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                <ProductCard 
                  product={product} 
                  showQuickAdd={true}
                  showWishlist={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complete the Look */}
      {completeTheLook.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Complete the Look</h2>
            <p className="text-muted-foreground">Perfect pieces to pair with your selection</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {completeTheLook.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showQuickAdd={true}
                showWishlist={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bundle Offer */}
      <div className="bg-gradient-to-br from-background via-background to-muted/20 rounded-2xl p-8 border border-primary/10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge 
            variant="secondary" 
            className="mb-6 text-sm font-medium bg-primary/10 text-primary border-primary/20 px-4 py-2"
          >
            Bundle & Save
          </Badge>
          
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Buy 2, Get{' '}
            <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              15% Off
            </span>
          </h3>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Mix and match any items to unlock your discount
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Step 1 */}
          <Card className="relative p-6 text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group bg-card/50">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs">
                1
              </div>
            </div>
            
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <h4 className="text-lg font-semibold mb-2 text-foreground">Add to cart</h4>
            <p className="text-sm text-muted-foreground">Select your first item</p>
          </Card>

          {/* Step 2 */}
          <Card className="relative p-6 text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group bg-card/50">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs">
                2
              </div>
            </div>
            
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Plus className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <h4 className="text-lg font-semibold mb-2 text-foreground">Choose 2nd item</h4>
            <p className="text-sm text-muted-foreground">Pick any second item</p>
          </Card>

          {/* Step 3 */}
          <Card className="relative p-6 text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group bg-card/50">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs">
                3
              </div>
            </div>
            
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Percent className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <h4 className="text-lg font-semibold mb-2 text-foreground">Save 15%</h4>
            <p className="text-sm text-muted-foreground">Automatic discount</p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Start Shopping for Bundle
          </Button>
          
          <p className="text-xs text-muted-foreground mt-3">
            Add 2+ items to cart • 15% discount applied automatically
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendations;