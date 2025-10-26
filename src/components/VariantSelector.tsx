import { useState } from 'react';
import { Product, ProductVariant } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Ruler, Info } from 'lucide-react';

interface VariantSelectorProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const VariantSelector = ({ 
  product, 
  selectedVariant, 
  onVariantChange, 
  selectedSize, 
  onSizeChange 
}: VariantSelectorProps) => {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Get unique colors from variants
  const uniqueColors = product.variants.reduce((acc: ProductVariant[], variant) => {
    if (!acc.find(v => v.colorName === variant.colorName)) {
      acc.push(variant);
    }
    return acc;
  }, []);

  // Get available sizes for selected color
  const availableSizes = selectedVariant 
    ? product.variants
        .filter(v => v.colorName === selectedVariant.colorName)
        .map(v => v.size)
        .filter(Boolean)
        .sort((a, b) => {
          // Custom size sorting (XS, S, M, L, XL, XXL)
          const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
          return sizeOrder.indexOf(a!) - sizeOrder.indexOf(b!);
        })
    : [];

  // Remove duplicates and get unique sizes
  const uniqueSizes = [...new Set(availableSizes)];

  const ColorSwatch = ({ variant, isSelected }: { variant: ProductVariant; isSelected: boolean }) => {
    const colorMap: Record<string, string> = {
      black: 'bg-black',
      charcoal: 'bg-neutral-700',
      navy: 'bg-blue-900',
      gray: 'bg-neutral-400',
      grey: 'bg-neutral-400',
      white: 'bg-white border-2 border-neutral-200',
      forest: 'bg-green-800',
      blue: 'bg-blue-600',
      red: 'bg-red-600',
      green: 'bg-green-600',
      pink: 'bg-pink-500',
      purple: 'bg-purple-600',
      yellow: 'bg-yellow-500',
      orange: 'bg-orange-500'
    };

    const colorClass = colorMap[variant.colorName.toLowerCase()] || 'bg-neutral-400';

    return (
      <button
        className={`w-12 h-12 rounded-full transition-all duration-200 ${colorClass} ${
          isSelected 
            ? 'ring-4 ring-primary ring-offset-2 scale-110' 
            : 'hover:scale-105 ring-2 ring-transparent hover:ring-neutral-300'
        }`}
        onClick={() => {
          onVariantChange(variant);
          // Reset size selection when color changes
          if (selectedSize && !product.variants.find(v => v.colorName === variant.colorName && v.size === selectedSize)) {
            onSizeChange('');
          }
        }}
        title={variant.colorName}
      />
    );
  };

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      {uniqueColors.length > 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">
              Color: {selectedVariant?.colorName}
            </h3>
            {selectedVariant && selectedVariant.priceCents !== product.priceCents && (
              <Badge variant="outline">
                ${formatPrice(selectedVariant.priceCents)}
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {uniqueColors.map((variant) => (
              <ColorSwatch
                key={variant.id}
                variant={variant}
                isSelected={selectedVariant?.colorName === variant.colorName}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {uniqueSizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Size: {selectedSize || 'Select a size'}</h3>
            <Dialog open={showSizeGuide} onOpenChange={setShowSizeGuide}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-primary hover:text-primary/80 rounded-xl transition-all duration-300 hover:scale-105">
                  <Ruler className="w-4 h-4 mr-1" />
                  Size Guide
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Size Guide</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Women's Sizing</h4>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-3 gap-2 font-medium border-b pb-2">
                          <span>Size</span>
                          <span>Bust</span>
                          <span>Waist</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span>XS</span>
                          <span>32-34"</span>
                          <span>24-26"</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span>S</span>
                          <span>34-36"</span>
                          <span>26-28"</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span>M</span>
                          <span>36-38"</span>
                          <span>28-30"</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span>L</span>
                          <span>38-40"</span>
                          <span>30-32"</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span>XL</span>
                          <span>40-42"</span>
                          <span>32-34"</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Men's Sizing</h4>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-3 gap-2 font-medium border-b pb-2">
                          <span>Size</span>
                          <span>Chest</span>
                          <span>Waist</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span>S</span>
                          <span>34-36"</span>
                          <span>28-30"</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span>M</span>
                          <span>38-40"</span>
                          <span>30-32"</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span>L</span>
                          <span>42-44"</span>
                          <span>32-34"</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span>XL</span>
                          <span>46-48"</span>
                          <span>36-38"</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span>XXL</span>
                          <span>50-52"</span>
                          <span>40-42"</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium mb-1">Fit Tips:</p>
                        <ul className="space-y-1">
                          <li>• Measure yourself wearing minimal clothing</li>
                          <li>• Our activewear has a athletic fit - choose your normal size</li>
                          <li>• If between sizes, size up for a looser fit</li>
                          <li>• Check individual product notes for specific fit guidance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {uniqueSizes.map((size) => {
              const isAvailable = true; // In real app, check inventory
              const isSelected = selectedSize === size;
              
              return (
                <button
                  key={size}
                  className={`px-4 py-3 border-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground shadow-electric-glow'
                      : isAvailable
                      ? 'border-border hover:border-primary hover:bg-primary/5 hover:shadow-lg'
                      : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                  onClick={() => isAvailable && onSizeChange(size)}
                  disabled={!isAvailable}
                >
                  {size}
                </button>
              );
            })}
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-muted-foreground">In Stock - Ships within 1-2 business days</span>
          </div>
        </div>
      )}

      {/* Fit Information */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Fit Information</h4>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>• {product.fit || 'Athletic fit'} - true to size</p>
          <p>• High-waisted design with 4-way stretch</p>
          <p>• 25" inseam (size M)</p>
          <p>• Model is 5'8" and wearing size M</p>
        </div>
      </div>
    </div>
  );
};

export default VariantSelector;