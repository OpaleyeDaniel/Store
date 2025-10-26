import { useState } from 'react';
import { Product, ProductVariant } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, X } from 'lucide-react';

interface QuickAddModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const QuickAddModal = ({ product, isOpen, onClose }: QuickAddModalProps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants[0] || null
  );
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Get available sizes for the selected variant
  const availableSizes = selectedVariant
    ? product.variants
        .filter(v => v.colorName === selectedVariant.colorName)
        .map(v => v.size)
        .filter(Boolean) as string[]
    : [];

  // Get unique colors
  const uniqueColors = Array.from(
    new Set(product.variants.map(v => v.colorName))
  );

  const canAddToCart = selectedVariant && (availableSizes.length === 0 || selectedSize);

  const handleVariantChange = (colorName: string) => {
    const variant = product.variants.find(v => v.colorName === colorName);
    if (variant) {
      setSelectedVariant(variant);
      setSelectedSize(''); // Reset size when color changes
    }
  };

  const handleAddToCart = async () => {
    if (!canAddToCart) {
      toast({
        title: "Selection Required",
        description: availableSizes.length > 0 && !selectedSize 
          ? "Please select a size"
          : "Please select a color",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    addItem(product, 1, selectedVariant?.colorName, selectedSize || undefined);
    
    toast({
      title: "Added to Cart!",
      description: `${product.title} added to your cart.`,
    });
    
    setIsAdding(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Quick Add to Cart
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex gap-4">
            <img
              src={selectedVariant?.images[0]?.url || '/placeholder.svg'}
              alt={product.title}
              className="w-20 h-20 object-cover rounded-lg bg-neutral-100"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-lg font-bold text-electric-blue">
                ${formatPrice(selectedVariant?.priceCents || product.priceCents)}
              </p>
              {product.compareAtCents && (
                <p className="text-sm text-muted-foreground line-through">
                  ${formatPrice(product.compareAtCents)}
                </p>
              )}
            </div>
          </div>

          {/* Color Selection */}
          {uniqueColors.length > 1 && (
            <div className="space-y-3">
              <h4 className="font-medium">Color</h4>
              <div className="flex gap-2 flex-wrap">
                {uniqueColors.map((colorName) => {
                  const variant = product.variants.find(v => v.colorName === colorName);
                  if (!variant) return null;
                  
                  return (
                    <button
                      key={colorName}
                      onClick={() => handleVariantChange(colorName)}
                      className={`relative w-12 h-12 rounded-lg border-2 transition-all ${
                        selectedVariant?.colorName === colorName
                          ? 'border-electric-blue'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={variant.images[0]?.url || '/placeholder.svg'}
                        alt={colorName}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-muted-foreground">
                Selected: {selectedVariant?.colorName}
              </p>
            </div>
          )}

          {/* Size Selection */}
          {availableSizes.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Size</h4>
              <div className="grid grid-cols-4 gap-2">
                {availableSizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="h-10"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!canAddToCart || isAdding}
            className="w-full h-12"
            size="lg"
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart • ${formatPrice((selectedVariant?.priceCents || product.priceCents))}
              </>
            )}
          </Button>

          {!canAddToCart && (
            <p className="text-sm text-destructive text-center">
              {!selectedVariant ? 'Please select a color' : 'Please select a size'}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickAddModal;