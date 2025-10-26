-- Fix: Create a secure public view for reviews that excludes sensitive user data
-- This allows public access to reviews while protecting user privacy

-- Create a public view that anonymizes user data
CREATE OR REPLACE VIEW public.public_reviews AS
SELECT 
  id,
  product_id,
  rating,
  review_text,
  photos,
  is_verified_purchase,
  created_at,
  -- Exclude user_id to prevent user tracking and profiling
  -- Only show generic "Verified Buyer" status instead
  NULL::uuid as user_id
FROM public.reviews;

-- Grant public access to the view
GRANT SELECT ON public.public_reviews TO anon;
GRANT SELECT ON public.public_reviews TO authenticated;

-- Update the reviews table RLS policy to be more restrictive
-- Drop the overly permissive public policy
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;

-- Add new policy: Only authenticated users can see full review data (including user_id)
CREATE POLICY "Authenticated users can view full reviews" ON public.reviews
FOR SELECT
TO authenticated
USING (true);

-- Add policy: Users can view their own reviews even if not authenticated (in case of session issues)
CREATE POLICY "Users can view their own reviews" ON public.reviews
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Note: Anonymous users should use the public_reviews view instead of direct table access
-- This protects user privacy while maintaining e-commerce functionality