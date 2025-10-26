import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const RatingInput = ({ value, onChange, size = 'md', disabled = false }: RatingInputProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const starSize = sizeClasses[size];

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((rating) => {
        const isActive = rating <= (hoverRating || value);
        
        return (
          <button
            key={rating}
            type="button"
            disabled={disabled}
            className={cn(
              "transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded",
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            )}
            onMouseEnter={() => !disabled && setHoverRating(rating)}
            onMouseLeave={() => !disabled && setHoverRating(0)}
            onClick={() => !disabled && onChange(rating)}
          >
            <Star
              className={cn(
                starSize,
                "transition-colors duration-200",
                isActive 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-gray-300 hover:text-yellow-200"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingInput;