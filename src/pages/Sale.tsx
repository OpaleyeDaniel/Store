import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductListingGrid from "@/components/ProductListingGrid";
import FilterSidebar from "@/components/FilterSidebar";
import FilterDrawer from "@/components/FilterDrawer";
import SortDropdown from "@/components/SortDropdown";
import ActiveFilters from "@/components/ActiveFilters";
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { FilterState } from "@/types";
import { Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Sale = () => {
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high'>('featured');
  const [activeFilters, setActiveFilters] = useState<FilterState>({});
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const { products } = useProducts(activeFilters, sortBy);

  // Filter products to show sale items only - using a simple mock filter
  const saleProducts = products.filter(product => 
    Math.random() > 0.7 // Mock: show ~30% of products as "sale" items
  );

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilter = (key: keyof FilterState) => {
    const newFilters = { ...activeFilters };
    delete newFilters[key];
    setActiveFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setActiveFilters({});
  };

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-electric-blue to-electric-blue/80 text-white py-16">
          <div className="container-fluid">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                LIMITED TIME
              </Badge>
              <h1 className="heading-display text-white mb-6">
                SALE UP TO 50% OFF
              </h1>
              <p className="text-xl leading-relaxed text-white/90 mb-8 max-w-2xl">
                Gear up for less. Premium performance wear at unbeatable prices. 
                Limited quantities available.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="container-fluid">
            <div className="flex gap-8">
              {/* Desktop Sidebar */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <FilterSidebar 
                  filters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearAllFilters}
                  onClearFilter={handleClearFilter}
                />
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="heading-lg text-black mb-2">Sale Items</h2>
                    <p className="text-neutral-600">
                      {saleProducts.length} {saleProducts.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Button */}
                    {isMobile && (
                      <Button
                        variant="outline"
                        onClick={() => setIsFilterDrawerOpen(true)}
                        className="flex items-center gap-2"
                      >
                        <Filter size={16} />
                        Filters
                      </Button>
                    )}
                    
                    <SortDropdown 
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value as any)}
                    />
                  </div>
                </div>

                {/* Active Filters */}
                <ActiveFilters 
                  filters={activeFilters}
                  onClearFilter={handleClearFilter}
                  onClearAllFilters={handleClearAllFilters}
                />

                {/* Product Grid */}
                <ProductListingGrid products={saleProducts} enablePagination={true} itemsPerPage={6} />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Drawer */}
        <FilterDrawer
          open={isFilterDrawerOpen}
          onOpenChange={setIsFilterDrawerOpen}
          filters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearAllFilters}
          onClearFilter={handleClearFilter}
        />
      </main>
      <Footer />
    </>
  );
};

export default Sale;