import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductListingGrid from "@/components/ProductListingGrid";
import FilterSidebar from "@/components/FilterSidebar";
import FilterDrawer from "@/components/FilterDrawer";
import SortDropdown from "@/components/SortDropdown";
import ActiveFilters from "@/components/ActiveFilters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useIsMobile } from "@/hooks/use-mobile";
import { FilterState } from "@/types";

const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Parse URL parameters into initial filters
  const getInitialFilters = (): FilterState => {
    const filters: FilterState = {};
    
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    
    if (category && gender) {
      // Set category filter correctly
      filters.category = `${gender}-${category}`;
    }
    
    return filters;
  };
  
  const {
    products: filteredProducts,
    filters,
    sortBy,
    setFilters,
    setSortBy,
    updateFilter,
    clearFilters,
    clearFilter,
    totalProducts
  } = useProducts(getInitialFilters());

  // Apply URL-based filtering when component mounts or URL changes
  useEffect(() => {
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    
    const newFilters: FilterState = {};
    
    if (category && gender) {
      // Apply category-based filtering with correct filter structure
      newFilters.category = `${gender}-${category}`;
    } else if (gender) {
      // Apply gender-only filtering by passing gender as category
      newFilters.category = gender;
    }
    
    if (Object.keys(newFilters).length > 0) {
      setFilters(newFilters);
    }
  }, [searchParams, setFilters]);

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    updateFilter(key, value);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy as any);
  };

  const handleClearFilter = (key: keyof typeof filters) => {
    clearFilter(key);
  };

  const handleClearAllFilters = () => {
    clearFilters();
  };

  // Get page title based on current filters and URL parameters
  const getPageTitle = () => {
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    
    // Check if we have the category filter set correctly
    const hasMatchingFilters = category && gender && filters.category === `${gender}-${category}`;
    
    if (hasMatchingFilters) {
      const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
      const genderTitle = gender === 'men' ? "Men's" : "Women's";
      return `${genderTitle} ${categoryTitle}`;
    }
    
    return "All Products";
  };

  // Get page description based on current filters and URL parameters
  const getPageDescription = () => {
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    
    // Check if we have the category filter set correctly
    const hasMatchingFilters = category && gender && filters.category === `${gender}-${category}`;
    
    if (hasMatchingFilters) {
      return `Discover our ${gender}'s ${category} collection. Premium athletic wear designed for performance and style.`;
    }
    
    return "Discover our complete range of premium athletic wear. From high-performance leggings to innovative sports bras, find everything you need to elevate your workout.";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "All Products" }
          ]} 
        />
        
        <div className="container mx-auto px-4 pt-24 pb-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-4">
              {(() => {
                const category = searchParams.get('category');
                const gender = searchParams.get('gender');
                const hasMatchingFilters = category && gender && filters.category === `${gender}-${category}`;
                return hasMatchingFilters ? 'Category Collection' : 'Complete Collection';
              })()}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {getPageDescription()}
            </p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            {!isMobile && (
              <div className="w-80 flex-shrink-0">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilter={handleClearFilter}
                  onClearFilters={handleClearAllFilters}
                />
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
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
                  
                  <div className="text-sm text-muted-foreground">
                    Showing 1-{Math.min(6, filteredProducts.length)} of {filteredProducts.length} products
                  </div>
                </div>

                <SortDropdown value={sortBy} onValueChange={handleSortChange} />
              </div>

              {/* Active Filters */}
              <ActiveFilters
                filters={filters}
                onClearFilter={handleClearFilter}
                onClearAllFilters={handleClearAllFilters}
              />

              {/* Products Grid */}
              <ProductListingGrid products={filteredProducts} enablePagination={true} itemsPerPage={6} />

              {/* No Results Message */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button onClick={handleClearAllFilters} variant="outline">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <FilterDrawer
          open={isFilterDrawerOpen}
          onOpenChange={setIsFilterDrawerOpen}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilter={handleClearFilter}
          onClearFilters={handleClearAllFilters}
        />
      </main>
      <Footer />
    </div>
  );
};

export default AllProducts;