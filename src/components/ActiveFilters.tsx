import { FilterState } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { categories } from '@/lib/data';

interface ActiveFiltersProps {
  filters: FilterState;
  onClearFilter: (key: keyof FilterState) => void;
  onClearAllFilters: () => void;
}

const ActiveFilters = ({ filters, onClearFilter, onClearAllFilters }: ActiveFiltersProps) => {
  const activeFilters: Array<{ key: keyof FilterState; label: string; removable: boolean }> = [];

  // Category filter
  if (filters.category) {
    const category = categories.find(c => c.id === filters.category);
    if (category) {
      activeFilters.push({ 
        key: 'category', 
        label: `Category: ${category.name}`, 
        removable: true 
      });
    }
  }

  // Price range filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    activeFilters.push({ 
      key: 'priceRange', 
      label: `Price: $${(min / 100).toFixed(0)} - $${(max / 100).toFixed(0)}`, 
      removable: true 
    });
  }

  // Colors filter
  if (filters.colors && filters.colors.length > 0) {
    filters.colors.forEach(color => {
      activeFilters.push({ 
        key: 'colors', 
        label: `Color: ${color}`, 
        removable: true 
      });
    });
  }

  // Special filters
  if (filters.isNew) {
    activeFilters.push({ 
      key: 'isNew', 
      label: 'New Arrivals', 
      removable: true 
    });
  }

  if (filters.isFeatured) {
    activeFilters.push({ 
      key: 'isFeatured', 
      label: 'Featured', 
      removable: true 
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  const handleRemoveColorFilter = (colorToRemove: string) => {
    if (filters.colors) {
      const updatedColors = filters.colors.filter(color => color !== colorToRemove);
      if (updatedColors.length === 0) {
        onClearFilter('colors');
      } else {
        // We need to update the colors array, but since we don't have access to the updateFilter function,
        // we'll clear it completely for now
        onClearFilter('colors');
      }
    }
  };

  return (
    <div className="mb-4 lg:mb-6">
      <div className="flex flex-wrap items-center gap-2 p-3 lg:p-4 bg-muted/30 rounded-lg overflow-hidden">
        <span className="text-xs lg:text-sm font-medium text-foreground whitespace-nowrap">Active filters:</span>
        
        {activeFilters.map((filter, index) => (
          <Badge key={`${filter.key}-${index}`} variant="secondary" className="flex items-center gap-1 text-xs lg:text-sm">
            {filter.label}
            {filter.removable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent hover:text-foreground"
                onClick={() => {
                  if (filter.key === 'colors' && filter.label.startsWith('Color:')) {
                    const color = filter.label.replace('Color: ', '');
                    handleRemoveColorFilter(color);
                  } else {
                    onClearFilter(filter.key);
                  }
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </Badge>
        ))}
        
        {activeFilters.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAllFilters}
            className="ml-2 text-xs lg:text-sm"
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;