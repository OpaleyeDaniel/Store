import { useState } from 'react';
import { Product, ProductVariant } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ShoppingCart, Plus, Minus, Check, ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AddToCartSectionProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  selectedSize: string;
}

const AddToCartSection = ({ product, selectedVariant, selectedSize }: AddToCartSectionProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { state, addItem } = useCart();
  const { toast } = useToast();

  // Get available sizes for validation
  const availableSizes = selectedVariant 
    ? product.variants
        .filter(v => v.colorName === selectedVariant.colorName)
        .map(v => v.size)
        .filter(Boolean)
    : [];

  const canAddToCart = selectedVariant && (availableSizes.length === 0 || selectedSize);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!canAddToCart) {
      toast({
        title: "Selection Required",
        description: availableSizes.length > 0 && !selectedSize 
          ? "Please select a size before adding to cart."
          : "Please select a variant before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addItem(product, quantity, selectedVariant?.colorName, selectedSize || undefined);
    setIsAdding(false);
    setIsCartOpen(true);
    
    toast({
      title: "Added to Cart!",
      description: `${quantity}x ${product.title} added to your cart.`,
    });
  };

  const cartTotal = state.totalCents;

  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-r-none hover:scale-105 transition-all duration-300"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-16 text-center border-y border-x-0 rounded-none focus-visible:ring-0"
              min={1}
              max={10}
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-l-none hover:scale-105 transition-all duration-300"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 10}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            Max 10 per order
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          disabled={!canAddToCart || isAdding}
          className="w-full h-12 text-lg font-semibold rounded-xl btn-electric hover:scale-105 transition-all duration-300"
          size="lg"
        >
          {isAdding ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart • ${formatPrice((selectedVariant?.priceCents || product.priceCents) * quantity)}
            </>
          )}
        </Button>
        
        {!canAddToCart && (
          <p className="text-sm text-destructive text-center">
            {!selectedVariant ? 'Please select a color' : 'Please select a size'}
          </p>
        )}
      </div>

      {/* Shipping & Returns Info */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="w-4 h-4 text-green-600" />
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">Free shipping</span> on orders over $75
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw className="w-4 h-4 text-blue-600" />
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">Free returns</span> within 30 days
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="w-4 h-4 text-purple-600" />
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">2-year warranty</span> on all products
          </span>
        </div>
      </div>

      {/* Cart Drawer */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:w-96">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Added to Cart
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {state.items.slice(-3).map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <div className="text-sm text-muted-foreground">
                      {item.selectedVariant && <span>Color: {item.selectedVariant}</span>}
                      {item.selectedVariant && item.selectedSize && <span> • </span>}
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm">Qty: {item.quantity}</span>
                      <span className="font-medium">${formatPrice(item.priceCents * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Cart Total */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">{cartTotal >= 7500 ? 'Free' : '$5.00'}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${formatPrice(cartTotal + (cartTotal >= 7500 ? 0 : 500))}</span>
              </div>
            </div>

            {/* Cart Actions */}
            <div className="space-y-3">
              <Link to="/cart">
                <Button className="w-full rounded-xl btn-electric hover:scale-105 transition-all duration-300" size="lg">
                  View Cart & Checkout
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="w-full rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </Button>
            </div>

            {/* Free Shipping Progress */}
            {cartTotal < 7500 && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  Add ${formatPrice(7500 - cartTotal)} more for free shipping!
                </p>
                <Progress 
                  value={(cartTotal / 7500) * 100} 
                  className="h-2"
                />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Sticky Mobile Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 lg:hidden z-50">
        <Button
          onClick={handleAddToCart}
          disabled={!canAddToCart || isAdding}
          className="w-full h-12 text-lg font-semibold rounded-xl btn-electric hover:scale-105 transition-all duration-300"
          size="lg"
        >
          {isAdding ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Adding...
            </>
          ) : (
            <>
              Add to Cart • ${formatPrice((selectedVariant?.priceCents || product.priceCents) * quantity)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddToCartSection;