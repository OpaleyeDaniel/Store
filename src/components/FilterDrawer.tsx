import { FilterState } from '@/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import FilterSidebar from './FilterSidebar';

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearFilters: () => void;
  onClearFilter: (key: keyof FilterState) => void;
}

const FilterDrawer = ({ 
  open, 
  onOpenChange, 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onClearFilter 
}: FilterDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        
        <div className="py-6">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            onClearFilter={onClearFilter}
          />
        </div>
        
        <SheetFooter className="border-t pt-4">
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;