import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/ProductGallery";
import VariantSelector from "@/components/VariantSelector";
import AddToCartSection from "@/components/AddToCartSection";
import ProductInformation from "@/components/ProductInformation";
import ProductRecommendations from "@/components/ProductRecommendations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Share2, Heart } from "lucide-react";
import { getProductBySlug, getProductsByCategory } from "@/lib/data";
import { Product, ProductVariant } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/contexts/WishlistContext";
import { useReviews } from "@/hooks/useReviews";
import ReviewSummary from "@/components/ReviewSummary";
import ReviewList from "@/components/ReviewList";
import ReviewForm from "@/components/ReviewForm";
import { supabase } from "@/integrations/supabase/client";

const ProductDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const product = getProductBySlug(slug || "");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const isWishlisted = product ? isInWishlist(product.id) : false;
  
  // Initialize reviews hook
  const {
    reviews,
    stats,
    distribution,
    loading: reviewsLoading,
    sortBy,
    setSortBy,
    submitReview
  } = useReviews(product?.id || "");
  
  // Related products from same category
  const relatedProducts = product 
    ? getProductsByCategory(product.categories[0]).filter(p => p.id !== product.id).slice(0, 8)
    : [];

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Check authentication status
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleAddToWishlist = () => {
    if (!product) return;
    
    if (isWishlisted) {
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

  const handleShare = async () => {
    const shareData = {
      title: product?.title || "Check out this product",
      text: `Check out ${product?.title} - ${product?.description}`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully",
          description: "Product shared successfully!",
        });
      } else {
        // Fallback to copying URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied",
          description: "Product link has been copied to your clipboard!",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Share failed",
        description: "Unable to share this product. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <a href="/">Go Home</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(2);
  };

  const getProductBadges = () => {
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

  const badges = getProductBadges();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/collections" },
            { label: product.title }
          ]} 
        />
        
        <div className="container mx-auto px-4 pt-24 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <div className="space-y-4">
              <ProductGallery 
                product={product} 
                selectedVariant={selectedVariant}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              {badges.length > 0 && (
                <div className="flex gap-2">
                  {badges.map((badge, index) => (
                    <Badge key={index} variant={badge.variant}>
                      {badge.text}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title and Rating */}
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {stats.review_count > 0 ? (
                      <>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(stats.average_rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : i - 0.5 < stats.average_rating 
                                ? 'fill-yellow-400/50 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          ({stats.average_rating.toFixed(1)}) {stats.review_count} {stats.review_count === 1 ? 'review' : 'reviews'}
                        </span>
                      </>
                    ) : (
                      <>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-gray-300"
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          No reviews yet
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ${formatPrice(selectedVariant?.priceCents || product.priceCents)}
                </span>
                {product.compareAtCents && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${formatPrice(product.compareAtCents)}
                  </span>
                )}
                {product.compareAtCents && (
                  <Badge variant="destructive" className="text-sm">
                    Save ${formatPrice(product.compareAtCents - product.priceCents)}
                  </Badge>
                )}
              </div>

              {/* Short Description */}
              {product.description && (
                <p className="text-muted-foreground text-lg">
                  {product.description}
                </p>
              )}

              {/* Variant Selector */}
              <VariantSelector
                product={product}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />

              <Separator />

              {/* Add to Cart */}
              <AddToCartSection
                product={product}
                selectedVariant={selectedVariant}
                selectedSize={selectedSize}
              />

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg" 
                  onClick={handleAddToWishlist}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                  {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Key Features */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Moisture-wicking fabric technology
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Four-way stretch for maximum mobility
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Flatlock seams prevent chafing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    UPF 50+ sun protection
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Information Tabs */}
          <div className="mt-16">
            <ProductInformation product={product} />
          </div>

          {/* Reviews Section */}
          <div className="mt-16 space-y-8">
            <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
            
            {/* Review Summary */}
            <ReviewSummary stats={stats} distribution={distribution} />
            
            {/* Review Form - Only for authenticated users */}
            {user && showReviewForm && (
              <ReviewForm 
                onSubmit={submitReview}
                loading={reviewsLoading}
              />
            )}
            
            {/* Auth prompt for non-authenticated users */}
            {!user && (
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <p className="text-muted-foreground mb-4">Sign in to write a review</p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Authentication required",
                      description: "Please sign in to leave a review.",
                    });
                  }}
                >
                  Sign In to Review
                </Button>
              </div>
            )}
            
            {/* Reviews List */}
            <ReviewList
              reviews={reviews}
              loading={reviewsLoading}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onWriteReview={user ? () => setShowReviewForm(!showReviewForm) : undefined}
            />
          </div>

          {/* Recommendations */}
          <div className="mt-16">
            <ProductRecommendations 
              currentProduct={product}
              relatedProducts={relatedProducts}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;