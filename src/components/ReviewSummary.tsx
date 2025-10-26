import { Star } from 'lucide-react';
import { ReviewStats, RatingDistribution } from '@/types/reviews';
import { cn } from '@/lib/utils';

interface ReviewSummaryProps {
  stats: ReviewStats;
  distribution: RatingDistribution[];
}

const ReviewSummary = ({ stats, distribution }: ReviewSummaryProps) => {
  const { average_rating, review_count } = stats;

  const renderStars = (rating: number, size: 'sm' | 'md' = 'md') => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeClass,
              star <= Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : star - 0.5 <= rating
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'text-gray-300'
            )}
          />
        ))}
      </div>
    );
  };

  const getPercentage = (count: number) => {
    return review_count > 0 ? (count / review_count) * 100 : 0;
  };

  return (
    <div className="bg-background border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Rating */}
        <div className="flex flex-col items-center text-center">
          <div className="text-4xl font-bold text-foreground mb-2">
            {average_rating.toFixed(1)}
          </div>
          {renderStars(average_rating)}
          <p className="text-sm text-muted-foreground mt-2">
            Based on {review_count} {review_count === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {distribution.map((item) => (
            <div key={item.rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 min-w-[60px]">
                <span className="text-sm font-medium">{item.rating}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-500 ease-out"
                  style={{ width: `${getPercentage(item.count)}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground min-w-[30px] text-right">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;