import { useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGridDynamic from "@/components/ProductGridDynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { collections } from "@/lib/data";
import { useProductsByCollection } from "@/hooks/useProducts";

const Collections = () => {
  const { slug } = useParams();
  const [filterType, setFilterType] = useState<string>("all");

  // If we have a slug, render individual collection page
  if (slug) {
    return <CollectionDetail slug={slug} />;
  }

  // Filter collections by type
  const filteredCollections = filterType === "all" 
    ? collections 
    : collections.filter(collection => collection.type === filterType);

  const featuredCollections = collections.filter(c => c.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Collections" }
          ]} 
        />
        
        <div className="container mx-auto px-4 pt-24 pb-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Collections
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated collections for every workout, every season, and every goal. 
              Discover pieces that push your limits and elevate your style.
            </p>
          </div>

          {/* Featured Collections Highlight */}
          {featuredCollections.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Featured Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredCollections.map((collection) => (
                  <div key={collection.id} className="group relative overflow-hidden rounded-xl bg-card shadow-elegant hover:shadow-electric-glow transition-all duration-300 hover:scale-105">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={collection.image} 
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <Badge variant="secondary" className="mb-2 rounded-lg">Featured</Badge>
                      <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
                      <p className="text-sm text-white/90 mb-4">{collection.description}</p>
                      <Button asChild variant="outline" className="border-white text-black bg-white hover:bg-white/90 hover:text-black rounded-xl hover:scale-105 transition-all duration-300">
                        <a href={`/collections/${collection.slug}`}>Explore Collection</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button 
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => setFilterType("all")}
              className={`rounded-xl transition-all duration-300 hover:scale-105 ${filterType === "all" ? "btn-electric" : "hover:shadow-lg"}`}
            >
              All Collections
            </Button>
            <Button 
              variant={filterType === "new-arrivals" ? "default" : "outline"}
              onClick={() => setFilterType("new-arrivals")}
              className={`rounded-xl transition-all duration-300 hover:scale-105 ${filterType === "new-arrivals" ? "btn-electric" : "hover:shadow-lg"}`}
            >
              New Arrivals
            </Button>
            <Button 
              variant={filterType === "bestsellers" ? "default" : "outline"}
              onClick={() => setFilterType("bestsellers")}
              className={`rounded-xl transition-all duration-300 hover:scale-105 ${filterType === "bestsellers" ? "btn-electric" : "hover:shadow-lg"}`}
            >
              Bestsellers
            </Button>
            <Button 
              variant={filterType === "sale" ? "default" : "outline"}
              onClick={() => setFilterType("sale")}
              className={`rounded-xl transition-all duration-300 hover:scale-105 ${filterType === "sale" ? "btn-electric" : "hover:shadow-lg"}`}
            >
              Sale
            </Button>
          </div>

          {/* All Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.map((collection) => (
              <div key={collection.id} className="group relative overflow-hidden rounded-xl bg-card border-0 shadow-elegant hover:shadow-electric-glow transition-all duration-300 hover:scale-105">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{collection.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{collection.description}</p>
                  <Button asChild className="w-full rounded-xl btn-electric hover:scale-105 transition-all duration-300">
                    <a href={`/collections/${collection.slug}`}>View Collection</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const CollectionDetail = ({ slug }: { slug: string }) => {
  const collection = collections.find(c => c.slug === slug);
  const products = useProductsByCollection(collection?.id || "");
  
  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Collection Not Found</h1>
            <p className="text-muted-foreground mb-8">The collection you're looking for doesn't exist.</p>
            <Button asChild className="rounded-xl btn-electric hover:scale-105 transition-all duration-300">
              <a href="/collections">Browse All Collections</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedCollections = collections
    .filter(c => c.id !== collection.id && c.type === collection.type)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/collections" },
            { label: collection.name }
          ]} 
        />
        
        {/* Collection Hero */}
        <div className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative text-center text-white z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <Badge variant="secondary" className="mb-4">
              {collection.type.replace("-", " ")}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">{collection.name}</h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">{collection.description}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Products Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-foreground">
                Products ({products.length})
              </h2>
            </div>
            <ProductGridDynamic products={products} enablePagination={true} itemsPerPage={6} />
          </div>

          {/* Related Collections */}
          {relatedCollections.length > 0 && (
            <div className="border-t pt-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Related Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedCollections.map((relatedCollection) => (
                  <div key={relatedCollection.id} className="group relative overflow-hidden rounded-xl bg-card border-0 shadow-elegant hover:shadow-electric-glow transition-all duration-300 hover:scale-105">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={relatedCollection.image} 
                        alt={relatedCollection.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{relatedCollection.name}</h3>
                      <Button asChild size="sm" className="w-full rounded-xl btn-electric hover:scale-105 transition-all duration-300">
                        <a href={`/collections/${relatedCollection.slug}`}>View Collection</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;