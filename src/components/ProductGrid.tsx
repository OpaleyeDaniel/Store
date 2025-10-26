import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import QuickAddModal from '@/components/QuickAddModal';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import productLeggings from '@/assets/product-leggings.jpg';
import productSportsBra from '@/assets/product-sports-bra.jpg';
import productShorts from '@/assets/product-shorts.jpg';

const ProductGrid = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Get first 3 featured products from data
  const featuredProducts = products.slice(0, 3);
  
  // Use real products from data, get first 3 featured products  
  const displayProducts = featuredProducts.map((product, index) => ({
    id: product.id,
    name: product.title,
    price: Math.floor(product.priceCents / 100),
    originalPrice: product.compareAtCents ? Math.floor(product.compareAtCents / 100) : null,
    image: product.variants[0]?.images[0]?.url || [productLeggings, productSportsBra, productShorts][index],
    colors: ['black', 'charcoal', 'navy'], // Static colors for showcase
    isNew: index === 0,
    isBestseller: index === 2,
    rating: index === 1 ? 4.9 : null,
    originalProduct: product
  }));

  const handleAddToCart = (product) => {
    // Check if product has multiple variants/sizes
    if (product.originalProduct.variants && product.originalProduct.variants.length > 1) {
      setQuickAddProduct(product.originalProduct);
    } else {
      // Add directly to cart for single variant products
      const variant = product.originalProduct.variants[0];
      addItem(product.originalProduct, 1, variant.id, variant.size);

      toast({
        title: "Added to cart",
        description: `${product.originalProduct.title} has been added to your cart.`,
      });
    }
  };

  const ColorSwatch = ({ color, isSelected = false }: { color: string; isSelected?: boolean }) => {
    const colorMap: Record<string, string> = {
      black: 'bg-black',
      charcoal: 'bg-neutral-700',
      navy: 'bg-blue-900',
      gray: 'bg-neutral-400',
      white: 'bg-white border-2 border-neutral-200',
      forest: 'bg-green-800'
    };

    return (
      <button
        className={`w-6 h-6 rounded-full ${colorMap[color]} ${
          isSelected ? 'ring-2 ring-electric-blue ring-offset-2' : ''
        } transition-all duration-200 hover:scale-110`}
      />
    );
  };

  return (
    <section className="py-24">
      <div className="container-fluid">
        <div className="text-center mb-16">
          <p className="label-sm text-neutral-600 mb-4">BESTSELLERS</p>
          <h2 className="display-lg text-black mb-6">
            ATHLETE
            <br />
            <span className="text-electric-blue">FAVORITES</span>
          </h2>
          <p className="body-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            The gear that powers champion performances. Tested by athletes, 
            loved by champions.
          </p>
          <Link to="/products" className="btn-outline text-black border-black hover:bg-black hover:text-white">
            VIEW ALL PRODUCTS
          </Link>
        </div>

        <div className="grid-responsive stagger-children">
          {displayProducts.map((product, index) => {
            // Determine badge for this product
            let badge = '';
            if (product.isNew) badge = 'NEW';
            else if (product.isBestseller) badge = 'BESTSELLER';
            else if (product.originalPrice) badge = 'SALE';

            return (
              <ProductCard
                key={product.id}
                product={product.originalProduct}
                badgeOverride={badge || undefined}
                showQuickAdd={true}
                showWishlist={false}
                animationDelay={index * 100}
              />
            );
          })}
        </div>
      </div>

      {/* Quick Add Modal */}
      {quickAddProduct && (
        <QuickAddModal
          product={quickAddProduct}
          isOpen={!!quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
        />
      )}
    </section>
  );
};

export default ProductGrid;