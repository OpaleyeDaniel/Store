import { Link, useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const subtotal = state.subtotalCents;
  const bundleDiscount = state.bundleDiscountCents;
  const shipping = subtotal >= 7500 ? 0 : 500; // Free shipping over $75
  const tax = Math.round((subtotal - bundleDiscount) * 0.08); // 8% tax on discounted amount
  const promoDiscount = appliedPromo === 'WELCOME10' ? Math.round((subtotal - bundleDiscount) * 0.1) : 0;
  const total = subtotal - bundleDiscount + shipping + tax - promoDiscount;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleApplyPromo = () => {
    if (promoCode === 'WELCOME10') {
      setAppliedPromo(promoCode);
      toast({
        title: "Promo Code Applied!",
        description: "You saved 10% with code WELCOME10",
      });
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 bg-neutral-50">
          <div className="container mx-auto px-4 pt-24 pb-16">
            <div className="max-w-md mx-auto text-center">
              <ShoppingBag size={64} className="mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <Link to="/">
                <Button size="lg" className="w-full py-4 rounded-xl btn-electric hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-electric-glow">
                  Continue Shopping
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-neutral-50">
        <div className="container mx-auto px-4 pt-24 pb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {state.totalItems} {state.totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="product-card overflow-hidden rounded-xl border-0 shadow-elegant">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {state.items.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-background rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg bg-neutral-100"
                          />
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <Link 
                                  to={`/product/${item.slug}`}
                                  className="font-semibold text-lg hover:text-electric-blue transition-colors block mb-1"
                                >
                                  {item.title}
                                </Link>
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                  {item.selectedVariant && (
                                    <span>Color: {item.selectedVariant}</span>
                                  )}
                                  {item.selectedSize && (
                                    <span>Size: {item.selectedSize}</span>
                                  )}
                                </div>
                              </div>
                              
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-muted-foreground hover:text-red-500 transition-all duration-300 p-2 hover:bg-red-50 rounded-xl hover:scale-110 hover:-translate-y-0.5 hover:shadow-md"
                                title="Remove item"
                              >
                                <X size={18} />
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border/50 rounded-xl overflow-hidden bg-background shadow-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0 hover:bg-electric-blue/10 hover:text-electric-blue hover:scale-105 transition-all duration-300 rounded-none border-r border-border/30"
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="w-12 text-center text-sm font-medium h-8 flex items-center justify-center bg-muted/20">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0 hover:bg-electric-blue/10 hover:text-electric-blue hover:scale-105 transition-all duration-300 rounded-none border-l border-border/30"
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                                <span className="text-sm text-muted-foreground">
                                  ${formatPrice(item.priceCents)} each
                                </span>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-lg font-bold text-foreground">
                                  ${formatPrice(item.priceCents * item.quantity)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {index < state.items.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-center">
                    <Button 
                      variant="outline" 
                      onClick={handleClearCart} 
                      className="w-full sm:w-auto px-6 py-2 rounded-xl border-destructive/20 text-destructive hover:bg-red-50 hover:border-red-500 hover:text-red-600 hover:scale-105 transition-all duration-300 shadow-sm hover:-translate-y-0.5"
                    >
                      Clear Cart
                    </Button>
                    
                    <Link to="/" className="w-full sm:w-auto">
                      <Button 
                        variant="ghost" 
                        className="w-full px-6 py-2 rounded-xl hover:bg-electric-blue/10 hover:text-electric-blue hover:scale-105 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 product-card overflow-hidden rounded-xl border-0 shadow-elegant">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        className="flex-1 rounded-lg"
                      />
                      <Button 
                        onClick={handleApplyPromo} 
                        variant="outline" 
                        className="px-4 py-2 rounded-xl border-primary/20 hover:bg-electric-blue/5 hover:border-electric-blue/30 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        Apply
                      </Button>
                    </div>
                    {appliedPromo && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ Code {appliedPromo} applied
                      </p>
                    )}
                  </div>
                  
                   <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${formatPrice(subtotal)}</span>
                    </div>
                    
                    {state.hasBundleDiscount && (
                      <div className="flex justify-between text-green-600">
                        <span>Bundle Discount (15% off)</span>
                        <span>-${formatPrice(bundleDiscount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${formatPrice(shipping)}`}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${formatPrice(tax)}</span>
                    </div>
                    
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedPromo})</span>
                        <span>-${formatPrice(promoDiscount)}</span>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  {/* Bundle Discount Notice */}
                  {state.totalItems === 1 && (
                    <div className="mb-6 p-3 bg-green-50 rounded-xl border-l-4 border-green-500">
                      <p className="text-sm text-green-700 font-medium">
                        🎉 Add 1 more item to get 15% off your entire order!
                      </p>
                    </div>
                  )}
                  
                  {state.hasBundleDiscount && (
                    <div className="mb-6 p-3 bg-green-50 rounded-xl border-l-4 border-green-500">
                      <p className="text-sm text-green-700 font-medium">
                        ✅ Bundle discount applied! You're saving ${formatPrice(bundleDiscount)}
                      </p>
                    </div>
                  )}
                  
                  {/* Shipping Progress */}
                  {subtotal < 7500 && (
                    <div className="mb-6 p-3 bg-blue-50 rounded-xl border-l-4 border-electric-blue">
                      <p className="text-sm text-blue-700 font-medium">
                        Add ${formatPrice(7500 - subtotal)} more for free shipping!
                      </p>
                      <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-electric-blue h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(subtotal / 7500) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    size="lg" 
                    className="w-full mb-4 py-4 rounded-xl btn-electric hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-electric-glow" 
                    onClick={() => {
                      toast({
                        title: "Shopify Integration Required",
                        description: (
                          <div className="space-y-3">
                            <p>This process is pending Shopify integration - please prompt the agent to integrate your store using Shopify API and Store ID.</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              asChild
                              className="w-full rounded-xl hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 border-primary/20 hover:bg-electric-blue/5"
                            >
                              <a href="https://docs.lovable.dev/integrations/shopify" target="_blank" rel="noopener noreferrer">
                                More Info
                              </a>
                            </Button>
                          </div>
                        ),
                        duration: 8000,
                      });
                    }}
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                  
                  {/* Trust Signals */}
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Truck size={12} />
                      <span>Free shipping on orders over $75</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={12} />
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw size={12} />
                      <span>30-day return policy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;