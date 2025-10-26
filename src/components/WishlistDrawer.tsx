import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, X, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';

interface WishlistDrawerProps {
  children: React.ReactNode;
}

const WishlistDrawer = ({ children }: WishlistDrawerProps) => {
  const { state, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleMoveToCart = (item: any) => {
    // Add to cart (with first available variant)
    const firstVariant = item.product.variants[0];
    if (firstVariant) {
      addItem(item.product, 1, firstVariant.colorName, null);
      removeFromWishlist(item.product.id);
    }
  };

  const handleBuyNow = (item: any) => {
    // Add to cart and navigate to checkout
    const firstVariant = item.product.variants[0];
    if (firstVariant) {
      addItem(item.product, 1, firstVariant.colorName, null);
      removeFromWishlist(item.product.id);
      navigate('/cart');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Wishlist
            {state.totalItems > 0 && (
              <Badge variant="secondary">{state.totalItems}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Your wishlist is empty</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Save items you love for later
                </p>
                <Link to="/products">
                  <Button className="rounded-xl btn-electric hover:scale-105 transition-all duration-300">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {state.totalItems} item{state.totalItems !== 1 ? 's' : ''}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearWishlist}
                  className="text-destructive hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Clear all
                </Button>
              </div>

              {state.items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3 border-0 rounded-xl shadow-elegant bg-card">
                  <div className="relative h-16 w-16 shrink-0">
                    <img
                      src={item.product.variants[0]?.images[0]?.url}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="text-sm font-medium text-foreground hover:text-primary line-clamp-2 transition-colors duration-300"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      {formatPrice(item.product.priceCents)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Added {formatDate(item.dateAdded)}
                    </p>
                    
                    <div className="flex gap-1 mt-2 justify-center">
                      <Button
                        size="sm"
                        className="h-7 text-xs flex-1 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg bg-blue-500 text-white hover:bg-blue-600 px-2"
                        onClick={() => handleBuyNow(item)}
                      >
                        Buy Now
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs flex-1 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg border-primary/20 px-2"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <ShoppingBag className="w-3 h-3 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 text-xs rounded-xl hover:scale-105 transition-all duration-300 hover:bg-destructive/10 hover:text-destructive p-0 flex items-center justify-center"
                        onClick={() => removeFromWishlist(item.product.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            <Link to="/products" className="w-full">
              <Button variant="outline" className="w-full rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistDrawer;