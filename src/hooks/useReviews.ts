import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Review, ReviewStats, RatingDistribution, ReviewSortOption } from '@/types/reviews';
import { useToast } from '@/hooks/use-toast';

export const useReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({ average_rating: 0, review_count: 0 });
  const [distribution, setDistribution] = useState<RatingDistribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<ReviewSortOption>('newest');
  const { toast } = useToast();

  const fetchReviewStats = async () => {
    try {
      const { data, error } = await supabase.rpc('calculate_product_rating_stats', {
        p_product_id: productId
      });

      if (error) throw error;
      if (data && data.length > 0) {
        setStats({
          average_rating: Number(data[0].average_rating) || 0,
          review_count: data[0].review_count || 0
        });
      }
    } catch (error) {
      console.error('Error fetching review stats:', error);
    }
  };

  const fetchRatingDistribution = async () => {
    try {
      const { data, error } = await supabase.rpc('get_rating_distribution', {
        p_product_id: productId
      });

      if (error) throw error;
      setDistribution(data || []);
    } catch (error) {
      console.error('Error fetching rating distribution:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId);

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'highest':
          query = query.order('rating', { ascending: false });
          break;
        case 'lowest':
          query = query.order('rating', { ascending: true });
          break;
        case 'with_photos':
          query = query.not('photos', 'eq', '{}').order('created_at', { ascending: false });
          break;
      }

      const { data, error } = await query;

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (reviewData: { rating: number; review_text: string; photos: string[] }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to leave a review.",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase.from('reviews').insert({
        product_id: productId,
        user_id: user.id,
        ...reviewData
      });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Review already exists",
            description: "You have already reviewed this product.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return false;
      }

      toast({
        title: "Review submitted",
        description: "Thank you for your review!",
      });

      // Refresh data
      await Promise.all([fetchReviews(), fetchReviewStats(), fetchRatingDistribution()]);
      return true;
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    if (productId) {
      Promise.all([fetchReviews(), fetchReviewStats(), fetchRatingDistribution()]);
    }
  }, [productId, sortBy]);

  return {
    reviews,
    stats,
    distribution,
    loading,
    sortBy,
    setSortBy,
    submitReview,
    refetch: () => Promise.all([fetchReviews(), fetchReviewStats(), fetchRatingDistribution()])
  };
};