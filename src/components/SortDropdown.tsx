import { SortBy } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  value: SortBy;
  onValueChange: (value: SortBy) => void;
}

const SortDropdown = ({ value, onValueChange }: SortDropdownProps) => {
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-az', label: 'Name: A to Z' },
    { value: 'name-za', label: 'Name: Z to A' }
  ] as const;

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-48 bg-background rounded-full">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          <SelectValue placeholder="Sort by" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-background border shadow-lg rounded-xl">
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortDropdown;