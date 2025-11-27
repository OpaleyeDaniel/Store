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
import heroMenImage from "@/assets/hero-men.jpg";
import PaginationControls from "@/components/PaginationControls";

const Men = () => {
  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const { addItem } = useCart();
  const { toast } = useToast();
  const { images: categoryImages, loading: imagesLoading } = useCategoryImages();

  // Filter products for men (avoid women's specific items)
  const menProducts = products.filter(product => {
    const title = product.title.toLowerCase();
    
    // Exclude clearly women's items
    if (title.includes('sports bra') || 
        title.includes('bra') || 
        title.includes('leggings') || 
        title.includes('seamless') ||
        title.includes('tube top') ||
        title.includes('midi')) {
      return false;
    }
    
    // Include men's specific items
    return product.gender === 'male' || 
           title.includes('shorts') ||
           (title.includes('sport') && !title.includes('bra')) ||
           title.includes('arrival') ||
           title.includes('tee') ||
           title.includes('shirt');
  });

  // Get featured men's products (all men's products)
  const featuredProducts = menProducts;

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
      name: "Shorts", 
      slug: "shorts", 
      description: "Performance shorts for every workout", 
      count: menProducts.filter(p => p.title.toLowerCase().includes('short')).length
    },
    { 
      name: "Tops", 
      slug: "tops", 
      description: "Training tees and performance wear", 
      count: menProducts.filter(p => p.title.toLowerCase().includes('tee') || p.title.toLowerCase().includes('shirt')).length
    },
    { 
      name: "Product Collection", 
      slug: "product", 
      description: "High-performance product gear", 
      count: menProducts.filter(p => p.title.toLowerCase().includes('sport')).length
    },
    { 
      name: "New Arrivals", 
      slug: "arrivals", 
      description: "Latest drops and seasonal styles", 
      count: menProducts.filter(p => p.title.toLowerCase().includes('arrival')).length
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
          src={heroMenImage} 
          alt="Men's product lifestyle" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 text-center px-4 sm:px-6 animate-fade-in max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4 sm:mb-6">
            Train <span className="text-primary">Different</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Engineered for performance. Built for athletes who demand more from their gear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products?gender=men" className="btn-electric w-full sm:w-auto">
              SHOP MEN'S COLLECTION
            </Link>
            <Link to="/new-arrivals" className="btn-outline text-white border-white hover:bg-white hover:text-black w-full sm:w-auto">
              NEW ARRIVALS
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Category Navigation Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">Find your perfect fit for every training session</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category.slug} 
                to={`/products?category=${category.slug}&gender=men`}
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
            <p className="text-muted-foreground text-lg">Hand-picked essentials for the modern product</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Unleash Your product Potential</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Performance-Driven Design</h3>
                <p className="text-muted-foreground mb-4">
                  Every piece in our men's collection is engineered with the serious athlete in mind. From moisture-wicking fabrics 
                  to ergonomic cuts that move with your body, our gear doesn't just look good—it performs when it matters most.
                </p>
                <p className="text-muted-foreground">
                  Whether you're pushing through a high-intensity workout, going for a morning run, or hitting the gym, 
                  our collection provides the comfort and durability you need to train at your peak.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Built for Every Workout</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Strength Training:</strong> Shorts and tees designed for maximum mobility</li>
                  <li>• <strong>Cardio:</strong> Lightweight, breathable fabrics that keep you cool</li>
                  <li>• <strong>Recovery:</strong> Comfortable leisurewear for post-workout relaxation</li>
                  <li>• <strong>Everyday:</strong> Versatile pieces that transition from gym to street</li>
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

export default Men;