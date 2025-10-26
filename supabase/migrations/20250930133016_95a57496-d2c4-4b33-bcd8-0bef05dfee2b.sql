-- Fix: Update the public_reviews view to use SECURITY INVOKER
-- This ensures the view respects the permissions of the querying user
-- rather than bypassing RLS with the creator's permissions

DROP VIEW IF EXISTS public.public_reviews;

-- Recreate the view with SECURITY INVOKER (explicit, more secure)
CREATE VIEW public.public_reviews 
WITH (security_invoker = true) AS
SELECT 
  id,
  product_id,
  rating,
  review_text,
  photos,
  is_verified_purchase,
  created_at,
  -- Exclude user_id to prevent user tracking and profiling
  NULL::uuid as user_id
FROM public.reviews;

-- Grant public access to the view
GRANT SELECT ON public.public_reviews TO anon;
GRANT SELECT ON public.public_reviews TO authenticated;

-- Since we're using security_invoker, we need to ensure the base table
-- has appropriate RLS policies for anonymous access through the view
-- Add policy for anonymous users to read reviews (but they won't see user_id through the view)
CREATE POLICY "Anonymous can view reviews via view" ON public.reviews
FOR SELECT
TO anon
USING (true);

COMMENT ON VIEW public.public_reviews IS 'Public view of reviews with user_id anonymized for privacy. Uses security_invoker to respect RLS policies.';