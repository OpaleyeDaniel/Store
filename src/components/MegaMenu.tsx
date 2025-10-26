import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { products, collections } from '@/lib/data';

interface MegaMenuProps {
  isOpen: boolean;
  activeCategory: string | null;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MegaMenu = ({ isOpen, activeCategory, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) => {
  if (!isOpen) return null;

  // Filter products and collections based on gender
  const isWomen = activeCategory === 'women';
  const isMen = activeCategory === 'men';
  
  let filteredProducts = products;
  let genderCategories: Array<{name: string, slug: string, description: string, count: number}> = [];
  
  if (isWomen) {
    // Filter women's products using same logic as Women.tsx
    filteredProducts = products.filter(product => 
      product.gender === 'female' || 
      product.title.toLowerCase().includes('seamless') ||
      product.title.toLowerCase().includes('sports bra') ||
      product.title.toLowerCase().includes('leggings') ||
      product.title.toLowerCase().includes('tank') ||
      product.title.toLowerCase().includes('tube top') ||
      product.title.toLowerCase().includes('midi')
    );
    
    genderCategories = [
      { name: "Leggings", slug: "leggings", description: "High-performance leggings", count: filteredProducts.filter(p => p.title.toLowerCase().includes('leggings')).length },
      { name: "Sports Bras", slug: "sports-bras", description: "Supportive sports bras", count: filteredProducts.filter(p => p.title.toLowerCase().includes('bra')).length },
      { name: "Tops & Tanks", slug: "tops", description: "Breathable activewear", count: filteredProducts.filter(p => p.title.toLowerCase().includes('tank') || p.title.toLowerCase().includes('top')).length },
      { name: "Seamless Collection", slug: "seamless", description: "Ultra-comfortable seamless wear", count: filteredProducts.filter(p => p.title.toLowerCase().includes('seamless')).length }
    ];
  } else if (isMen) {
    // Filter men's products (avoid women's specific items)
    filteredProducts = products.filter(product => {
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
    
    genderCategories = [
      { name: "Shorts", slug: "shorts", description: "Performance shorts", count: filteredProducts.filter(p => p.title.toLowerCase().includes('short')).length },
      { name: "Tops", slug: "tops", description: "Training tees and performance wear", count: filteredProducts.filter(p => p.title.toLowerCase().includes('tee') || p.title.toLowerCase().includes('shirt')).length },
      { name: "Sport Collection", slug: "sport", description: "High-performance athletic gear", count: filteredProducts.filter(p => p.title.toLowerCase().includes('sport')).length },
      { name: "New Arrivals", slug: "arrivals", description: "Latest drops and seasonal styles", count: filteredProducts.filter(p => p.title.toLowerCase().includes('arrival')).length }
    ];
  }

  // Get featured collections with real product counts (only show if not gender-specific)
  const featuredCollections = (!isWomen && !isMen) ? collections.filter(c => c.featured).slice(0, 4) : [];
  
  // Get products for featured display (first 3 gender-appropriate products)
  const featuredProducts = filteredProducts.slice(0, 3);

  return (
    <div 
      className="absolute top-full left-0 right-0 bg-background border-t border-border shadow-2xl z-[60] animate-fade-in"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Mobile mega menu - simplified */}
        <div className="md:hidden">
          <div className="space-y-6">
            {genderCategories.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Shop {isWomen ? "Women's" : "Men's"}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {genderCategories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/products?category=${category.slug}&gender=${activeCategory}`}
                      className="flex flex-col items-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      onClick={onClose}
                    >
                      <span className="font-medium text-sm text-center">{category.name}</span>
                      <Badge variant="secondary" className="text-xs mt-1">{category.count}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Shop Collections</h3>
                <div className="grid grid-cols-2 gap-2">
                  {featuredCollections.map((collection) => (
                    <Link
                      key={collection.id}
                      to={`/collections/${collection.slug}`}
                      className="flex flex-col items-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      onClick={onClose}
                    >
                      <span className="font-medium text-sm text-center">{collection.name}</span>
                      <Badge variant="secondary" className="text-xs mt-1">{collection.products.length}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/new-arrivals" onClick={onClose}>New Arrivals</Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link to={isWomen ? "/women" : isMen ? "/men" : "/products"} onClick={onClose}>
                  {isWomen ? "All Women's" : isMen ? "All Men's" : "All Products"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Desktop mega menu - simplified with real data */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {/* Gender Categories or Featured Collections */}
          <div>
            {genderCategories.length > 0 ? (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {isWomen ? "Women's Categories" : "Men's Categories"}
                </h3>
                <div className="space-y-2">
                  {genderCategories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/products?category=${category.slug}&gender=${activeCategory}`}
                      className="flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors py-1 group"
                      onClick={onClose}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-4">Featured Collections</h3>
                <div className="space-y-2">
                  {featuredCollections.map((collection) => (
                    <Link
                      key={collection.id}
                      to={`/collections/${collection.slug}`}
                      className="flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors py-1 group"
                      onClick={onClose}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{collection.name}</span>
                      <Badge variant="secondary" className="text-xs">{collection.products.length}</Badge>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/new-arrivals"
                className="flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors py-1 group"
                onClick={onClose}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">New Arrivals</span>
                <Badge variant="secondary" className="text-xs">Latest</Badge>
              </Link>
              <Link
                to={isWomen ? "/women" : isMen ? "/men" : "/products"}
                className="flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors py-1 group"
                onClick={onClose}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  {isWomen ? "All Women's" : isMen ? "All Men's" : "All Products"}
                </span>
                <Badge variant="secondary" className="text-xs">{filteredProducts.length}</Badge>
              </Link>
              <Link
                to="/collections"
                className="flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors py-1 group"
                onClick={onClose}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">All Collections</span>
                <Badge variant="secondary" className="text-xs">{collections.length}</Badge>
              </Link>
            </div>
          </div>

          {/* Featured Products */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {isWomen ? "Featured Women's Products" : isMen ? "Featured Men's Products" : "Featured Products"}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {featuredProducts.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.slug}`}
                  className="group cursor-pointer"
                  onClick={onClose}
                >
                  <Card className="product-card group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex gap-3 p-3">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={product.variants[0]?.images[0]?.url}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-2 mb-1 text-black hover:text-electric-blue transition-colors">{product.title}</h4>
                          <p className="text-electric-blue font-bold text-sm">${(product.priceCents / 100).toFixed(2)}</p>
                          {product.variants[0]?.colorName && (
                            <p className="text-xs text-neutral-500 mt-1">{product.variants[0].colorName}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;