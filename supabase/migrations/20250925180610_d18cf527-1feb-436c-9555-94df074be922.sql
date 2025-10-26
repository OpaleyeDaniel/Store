-- Create reviews table for the product review system
CREATE TABLE public.reviews (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id TEXT NOT NULL,
    user_id UUID NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL CHECK (char_length(review_text) >= 50),
    photos TEXT[] DEFAULT '{}',
    is_verified_purchase BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(product_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" 
ON public.reviews 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" 
ON public.reviews 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to calculate average rating and review count
CREATE OR REPLACE FUNCTION public.calculate_product_rating_stats(p_product_id TEXT)
RETURNS TABLE(average_rating NUMERIC, review_count INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(ROUND(AVG(rating)::NUMERIC, 1), 0.0) as average_rating,
        COALESCE(COUNT(*)::INTEGER, 0) as review_count
    FROM public.reviews 
    WHERE product_id = p_product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create function to get rating distribution
CREATE OR REPLACE FUNCTION public.get_rating_distribution(p_product_id TEXT)
RETURNS TABLE(rating INTEGER, count INTEGER) AS $$
BEGIN
    RETURN QUERY
    WITH rating_counts AS (
        SELECT r.rating, COUNT(*)::INTEGER as count
        FROM public.reviews r
        WHERE r.product_id = p_product_id
        GROUP BY r.rating
    ),
    all_ratings AS (
        SELECT generate_series(1, 5) as rating
    )
    SELECT ar.rating, COALESCE(rc.count, 0) as count
    FROM all_ratings ar
    LEFT JOIN rating_counts rc ON ar.rating = rc.rating
    ORDER BY ar.rating DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;