export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  review_text: string;
  photos: string[];
  is_verified_purchase: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReviewStats {
  average_rating: number;
  review_count: number;
}

export interface RatingDistribution {
  rating: number;
  count: number;
}

export type ReviewSortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'with_photos';

export interface ReviewFormData {
  rating: number;
  review_text: string;
  photos: string[];
}