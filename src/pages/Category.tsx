import { useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductListingGrid from "@/components/ProductListingGrid";
import FilterSidebar from "@/components/FilterSidebar";
import FilterDrawer from "@/components/FilterDrawer";
import SortDropdown from "@/components/SortDropdown";
import ActiveFilters from "@/components/ActiveFilters";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data";
import { useProducts } from "@/hooks/useProducts";
import { FilterState, SortBy } from "@/types";

const Category = () => {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug || "");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const initialFilters: FilterState = category ? { category: category.id } : {};
  const { products, filters, sortBy, setFilters, setSortBy, updateFilter, clearFilters, clearFilter, totalProducts } = useProducts(initialFilters);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
            <Button asChild>
              <a href="/">Go Home</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: category.name }
          ]} 
        />
        
        <div className="container mx-auto px-4 pt-24 pb-8">
          {/* Category Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>

          <div className="flex gap-8">
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">
                    {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
                  </span>
                  
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    className="lg:hidden"
                    onClick={() => setShowMobileFilters(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>

                <SortDropdown value={sortBy} onValueChange={setSortBy} />
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

export default Category;