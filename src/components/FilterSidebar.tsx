import { useState } from 'react';
import { FilterState } from '@/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { categories, products } from '@/lib/data';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearFilters: () => void;
  onClearFilter: (key: keyof FilterState) => void;
}

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, onClearFilter }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange || [0, 20000]);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['categories', 'colors', 'price']));

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  // Get all unique colors from products
  const availableColors = [...new Set(
    products.flatMap(p => p.variants.map(v => v.colorName))
  )].sort();

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    onFilterChange('priceRange', value);
  };

  const handleColorToggle = (color: string, checked: boolean) => {
    const currentColors = filters.colors || [];
    if (checked) {
      onFilterChange('colors', [...currentColors, color]);
    } else {
      onFilterChange('colors', currentColors.filter(c => c !== color));
    }
  };

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(0);
  };

  // Map color names to actual color values
  const getColorValue = (colorName: string): string => {
    const color = colorName.toLowerCase();
    
    // Handle compound colors (take the primary color)
    if (color.includes('/')) {
      const primaryColor = color.split('/')[0].trim();
      return getColorValue(primaryColor);
    }
    
    // Map specific product colors to accurate hex values
    if (color.includes('build pink')) return '#FF69B4'; // Hot pink for Build Pink
    if (color.includes('cherry purple')) return '#8B008B'; // Dark magenta for Cherry Purple
    if (color.includes('chestnut pink')) return '#CD5C5C'; // Indian red for Chestnut Pink
    if (color.includes('heavy blue')) return '#1E3A8A'; // Deep blue
    if (color.includes('smoke blue')) return '#6B82A6'; // Steel blue
    if (color.includes('core olive')) return '#556B2F'; // Dark olive green
    if (color.includes('black')) return '#000000';
    if (color.includes('dark grey')) return '#374151';
    if (color.includes('silhouette grey')) return '#6B7280';
    if (color.includes('white')) return '#FFFFFF';
    
    // Fallback for unmapped colors
    return '#9CA3AF';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </div>

      <Separator />

      {/* Categories */}
      <Collapsible open={openSections.has('categories')} onOpenChange={() => toggleSection('categories')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
          <h4 className="font-medium text-foreground">Categories</h4>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.has('categories') ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.category === category.id}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFilterChange('category', category.id);
                  } else {
                    onClearFilter('category');
                  }
                }}
              />
              <Label htmlFor={`category-${category.id}`} className="text-sm">
                {category.name}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Price Range */}
      <Collapsible open={openSections.has('price')} onOpenChange={() => toggleSection('price')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
          <h4 className="font-medium text-foreground">Price Range</h4>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.has('price') ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-3">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={20000}
              min={0}
              step={500}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${formatPrice(priceRange[0])}</span>
            <span>${formatPrice(priceRange[1])}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Colors */}
      <Collapsible open={openSections.has('colors')} onOpenChange={() => toggleSection('colors')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
          <h4 className="font-medium text-foreground">Colors</h4>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.has('colors') ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          {availableColors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={filters.colors?.includes(color) || false}
                onCheckedChange={(checked) => handleColorToggle(color, !!checked)}
              />
              <Label htmlFor={`color-${color}`} className="text-sm flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full border border-neutral-200"
                  style={{
                    backgroundColor: getColorValue(color)
                  }}
                />
                {color}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Special Filters */}
      <Collapsible open={openSections.has('special')} onOpenChange={() => toggleSection('special')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
          <h4 className="font-medium text-foreground">Special</h4>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.has('special') ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-arrivals"
              checked={filters.isNew || false}
              onCheckedChange={(checked) => onFilterChange('isNew', !!checked)}
            />
            <Label htmlFor="new-arrivals" className="text-sm">
              New Arrivals
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.isFeatured || false}
              onCheckedChange={(checked) => onFilterChange('isFeatured', !!checked)}
            />
            <Label htmlFor="featured" className="text-sm">
              Featured
            </Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FilterSidebar;