import { useState } from "react";
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
import { FilterState, SortBy } from "@/types";

const NewArrivals = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const initialFilters: FilterState = { isNew: true };
  const { products, filters, sortBy, setFilters, setSortBy, updateFilter, clearFilters, clearFilter, totalProducts } = useProducts(initialFilters);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "New Arrivals" }
          ]} 
        />
        
        <div className="container mx-auto px-4 pt-24 pb-8">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12 px-4">
            <Badge variant="default" className="mb-4">
              Latest Drops
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              New Arrivals
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Fresh styles just dropped. Be first to get your hands on our latest innovations 
              in athletic performance and style.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar 
                filters={filters}
                onFilterChange={updateFilter}
                onClearFilters={clearFilters}
                onClearFilter={clearFilter}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-sm lg:text-base text-muted-foreground whitespace-nowrap">
                    {products.length} {products.length === 1 ? 'product' : 'products'}
                  </span>
                  
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowMobileFilters(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>

                <div className="w-full sm:w-auto">
                  <SortDropdown value={sortBy} onValueChange={setSortBy} />
                </div>
              </div>

              {/* Active Filters */}
              <ActiveFilters 
                filters={filters}
                onClearFilter={clearFilter}
                onClearAllFilters={clearFilters}
              />

              {/* Product Grid */}
              <ProductListingGrid products={products} enablePagination={true} itemsPerPage={6} />
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <FilterDrawer
          open={showMobileFilters}
          onOpenChange={setShowMobileFilters}
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
          onClearFilter={clearFilter}
        />
      </main>
      <Footer />
    </div>
  );
};

export default NewArrivals;