import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { usePagination } from "@/hooks/usePagination";
import { ChevronDown } from "lucide-react";
import QuickAddModal from "@/components/QuickAddModal";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { useCategoryImages } from "@/hooks/useCategoryImages";
import heroWomenImage from "@/assets/hero-women.jpg";
import PaginationControls from "@/components/PaginationControls";

const Women = () => {
  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const { addItem } = useCart();
  const { toast } = useToast();
  const { images: categoryImages, loading: imagesLoading } = useCategoryImages();

  // Filter products for women (seamless collection appears to be women's activewear)
  const womenProducts = products.filter(product => 
    product.gender === 'female' || 
    product.title.toLowerCase().includes('seamless') ||
    product.title.toLowerCase().includes('sports bra') ||
    product.title.toLowerCase().includes('leggings') ||
    product.title.toLowerCase().includes('tank') ||
    product.title.toLowerCase().includes('tube top') ||
    product.title.toLowerCase().includes('midi')
  );

  // Get featured women's products (all women's products)
  const featuredProducts = womenProducts;

  const {
    paginatedItems: displayedProducts,
    currentPage,
    totalPages,
    reset,
    setPage
  } = usePagination({ 
    items: featuredProducts, 
    itemsPerPage: 6
  });

  // Reset pagination when products change
  useEffect(() => {
    reset();
  }, [featuredProducts, reset]);

  const handleQuickAdd = (product) => {
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

  const formatPrice = (priceCents: number) => {
    return `$${(priceCents / 100).toFixed(2)}`;
  };

  const categories = [
    { 
      name: "Leggings", 
      slug: "leggings", 
      description: "High-performance leggings for every workout", 
      count: womenProducts.filter(p => p.title.toLowerCase().includes('leggings')).length
    },
    { 
      name: "Sports Bras", 
      slug: "sports-bras", 
      description: "Supportive and comfortable sports bras", 
      count: womenProducts.filter(p => p.title.toLowerCase().includes('bra')).length
    },
    { 
      name: "Tops & Tanks", 
      slug: "tops", 
      description: "Breathable tops and tank tops", 
      count: womenProducts.filter(p => p.title.toLowerCase().includes('tank') || p.title.toLowerCase().includes('top') || p.title.toLowerCase().includes('tee')).length
    },
    { 
      name: "Seamless Collection", 
      slug: "seamless", 
      description: "Ultra-comfortable seamless activewear", 
      count: womenProducts.filter(p => p.title.toLowerCase().includes('seamless')).length
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40 z-10" />
        <img 
          src={heroWomenImage} 
          alt="Women's athletic lifestyle" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 text-center px-4 sm:px-6 animate-fade-in max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4 sm:mb-6">
            Embrace Your <span className="text-primary">Power</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Designed for women who push boundaries. Activewear that moves with you and supports your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products?gender=women" className="btn-electric w-full sm:w-auto">
              SHOP WOMEN'S COLLECTION
            </Link>
            <Link to="/products?category=seamless&gender=women" className="btn-outline text-white border-white hover:bg-white hover:text-black w-full sm:w-auto">
              SEAMLESS COLLECTION
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Category Navigation Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">Discover pieces designed for every aspect of your fitness journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category.slug} 
                to={`/products?category=${category.slug}&gender=women`}
                className="block"
              >
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in overflow-hidden relative h-64" style={{animationDelay: `${index * 100}ms`}}>
                  {/* Generated Image Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: categoryImages[category.slug]?.startsWith('http') 
                        ? `url(${categoryImages[category.slug]})` 
                        : categoryImages[category.slug] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundColor: '#f8f9fa'
                    }}
                  />
                  
                  {/* Dark Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/80 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-300" />
                  
                  {/* Content */}
                  <CardContent className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold drop-shadow-lg group-hover:text-white transition-colors duration-300">{category.name}</h3>
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-2 h-12 drop-shadow-md">{category.description}</p>
                      <div className="pt-2">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <div className="text-xs text-white/80 mt-2 font-medium tracking-wide uppercase drop-shadow-sm">Shop Collection</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Collections */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg">Curated essentials for the empowered woman</p>
          </div>
          
          <div className="grid-responsive stagger-children">
            {displayedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                badgeOverride="FEATURED"
                showQuickAdd={true}
                showWishlist={false}
                animationDelay={index * 100}
              />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} />
            </div>
          )}
        </section>

        {/* SEO Content Block */}
        <section className="bg-card rounded-lg p-8 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Designed for Your Active Lifestyle</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Seamless Comfort Technology</h3>
                <p className="text-muted-foreground mb-4">
                  Our women's activewear collection features innovative seamless construction that eliminates chafing and provides 
                  a second-skin feel. Each piece is crafted with premium moisture-wicking fabrics that keep you dry and comfortable 
                  throughout your most intense workouts.
                </p>
                <p className="text-muted-foreground">
                  From yoga sessions to high-intensity training, our collection adapts to your movement and supports your goals 
                  with style and functionality that doesn't compromise.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Perfect for Every Activity</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Yoga & Pilates:</strong> Flexible leggings and supportive bras</li>
                  <li>• <strong>Running:</strong> Lightweight, breathable pieces for optimal performance</li>
                  <li>• <strong>Strength Training:</strong> Durable activewear that moves with you</li>
                  <li>• <strong>Lifestyle:</strong> Versatile pieces that transition from studio to street</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Quick Add Modal */}
      {quickAddProduct && (
        <QuickAddModal
          product={quickAddProduct}
          isOpen={!!quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
        />
      )}
    </div>
  );
};

export default Women;