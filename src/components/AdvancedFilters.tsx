import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SearchFilters } from '@/hooks/useSearch';
import { products } from '@/lib/data';

interface AdvancedFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
  className?: string;
}

const AdvancedFilters = ({ filters, onFiltersChange, onClearFilters, className = '' }: AdvancedFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  // Extract unique values from products
  const availableColors = Array.from(new Set(
    products.flatMap(p => p.variants.map(v => v.colorName))
  )).filter(Boolean);

  const availableCategories = [
    { id: 'leggings', name: 'Leggings', count: products.filter(p => p.title.toLowerCase().includes('leggings')).length },
    { id: 'sports-bras', name: 'Sports Bras', count: products.filter(p => p.title.toLowerCase().includes('bra')).length },
    { id: 'tops', name: 'Tops & Tanks', count: products.filter(p => p.title.toLowerCase().includes('tank') || p.title.toLowerCase().includes('top')).length },
    { id: 'shorts', name: 'Shorts', count: products.filter(p => p.title.toLowerCase().includes('short')).length },
    { id: 'seamless', name: 'Seamless', count: products.filter(p => p.title.toLowerCase().includes('seamless')).length },
    { id: 'sport', name: 'Sport Collection', count: products.filter(p => p.title.toLowerCase().includes('sport')).length },
  ];

  const priceRange = {
    min: Math.min(...products.map(p => p.priceCents)),
    max: Math.max(...products.map(p => p.priceCents))
  };

  const handleColorToggle = (color: string) => {
    const colors = localFilters.colors || [];
    const updatedColors = colors.includes(color)
      ? colors.filter(c => c !== color)
      : [...colors, color];
    
    const newFilters = { ...localFilters, colors: updatedColors };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const categories = localFilters.categories || [];
    const updatedCategories = categories.includes(category)
      ? categories.filter(c => c !== category)
      : [...categories, category];
    
    const newFilters = { ...localFilters, categories: updatedCategories };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...localFilters, priceRange: [value[0], value[1]] as [number, number] };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAll = () => {
    setLocalFilters({});
    onClearFilters();
  };

  const activeFilterCount = 
    (localFilters.colors?.length || 0) +
    (localFilters.categories?.length || 0) +
    (localFilters.priceRange ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Active Filters</h4>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {localFilters.colors?.map(color => (
              <Badge key={color} variant="secondary" className="cursor-pointer">
                {color}
                <X size={12} className="ml-1" onClick={() => handleColorToggle(color)} />
              </Badge>
            ))}
            {localFilters.categories?.map(category => (
              <Badge key={category} variant="secondary" className="cursor-pointer">
                {availableCategories.find(c => c.id === category)?.name}
                <X size={12} className="ml-1" onClick={() => handleCategoryToggle(category)} />
              </Badge>
            ))}
            {localFilters.priceRange && (
              <Badge variant="secondary" className="cursor-pointer">
                ${(localFilters.priceRange[0] / 100).toFixed(0)} - ${(localFilters.priceRange[1] / 100).toFixed(0)}
                <X size={12} className="ml-1" onClick={() => handlePriceChange([priceRange.min, priceRange.max])} />
              </Badge>
            )}
          </div>
        </div>
      )}

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={localFilters.priceRange || [priceRange.min, priceRange.max]}
            onValueChange={handlePriceChange}
            min={priceRange.min}
            max={priceRange.max}
            step={100}
            className="mb-3"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${((localFilters.priceRange?.[0] || priceRange.min) / 100).toFixed(0)}</span>
            <span>${((localFilters.priceRange?.[1] || priceRange.max) / 100).toFixed(0)}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {availableCategories.map(category => (
            <div
              key={category.id}
              className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded"
              onClick={() => handleCategoryToggle(category.id)}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={localFilters.categories?.includes(category.id) || false}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="rounded"
                />
                <span className="text-sm">{category.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">{category.count}</Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h4 className="font-medium mb-3">Colors</h4>
        <div className="grid grid-cols-2 gap-2">
          {availableColors.map(color => (
            <div
              key={color}
              className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded text-sm"
              onClick={() => handleColorToggle(color)}
            >
              <input
                type="checkbox"
                checked={localFilters.colors?.includes(color) || false}
                onChange={() => handleColorToggle(color)}
                className="rounded"
              />
              <span>{color}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Desktop version
  const DesktopFilters = () => (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter size={20} />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {activeFilterCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FilterContent />
      </CardContent>
    </Card>
  );

  // Mobile version
  const MobileFilters = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Filter size={20} />
            Filters
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 overflow-y-auto">
          <FilterContent />
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      {/* Desktop: Hidden on mobile */}
      <div className="hidden lg:block">
        <DesktopFilters />
      </div>
      
      {/* Mobile: Hidden on desktop */}
      <div className="lg:hidden">
        <MobileFilters />
      </div>
    </>
  );
};

export default AdvancedFilters;