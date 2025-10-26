import { Review, ReviewSortOption } from '@/types/reviews';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import ReviewCard from './ReviewCard';
import { Star, Camera, MessageSquare } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
  loading: boolean;
  sortBy: ReviewSortOption;
  onSortChange: (sort: ReviewSortOption) => void;
  onWriteReview?: () => void;
}

const ReviewList = ({ reviews, loading, sortBy, onSortChange, onWriteReview }: ReviewListProps) => {
  const sortOptions = [
    { value: 'newest' as const, label: 'Most Recent' },
    { value: 'oldest' as const, label: 'Oldest First' },
    { value: 'highest' as const, label: 'Highest Rated' },
    { value: 'lowest' as const, label: 'Lowest Rated' },
    { value: 'with_photos' as const, label: 'With Photos' },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-background border rounded-lg p-6 animate-pulse">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-muted rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted rounded w-32" />
                <div className="h-3 bg-muted rounded w-24" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-4/5" />
              <div className="h-3 bg-muted rounded w-3/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-background border rounded-lg">
        <MessageSquare className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Be the first to review this product
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Share your experience with other customers and help them make informed decisions.
        </p>
        {onWriteReview && (
          <Button
            onClick={onWriteReview}
            className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white hover:scale-[1.03] transition-all duration-300 hover:shadow-lg"
          >
            <Star className="w-4 h-4 mr-2" />
            Write a Review
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </h3>
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {onWriteReview && (
            <Button
              onClick={onWriteReview}
              variant="outline"
              className="hover:scale-105 transition-all duration-300"
            >
              <Star className="w-4 h-4 mr-2" />
              Write Review
            </Button>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;