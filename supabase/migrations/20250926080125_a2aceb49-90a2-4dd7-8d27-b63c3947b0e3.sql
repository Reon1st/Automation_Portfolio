-- Security fix: Restrict SELECT access on contact_submissions to admins only
-- Add explicit DENY policy for non-admin users on contact_submissions

-- First, drop the existing admin SELECT policy to recreate it with proper ordering
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;

-- Create a restrictive DENY policy for non-admin users (evaluated first)
CREATE POLICY "Deny contact submissions access to non-admins"
ON public.contact_submissions
FOR SELECT
TO authenticated, anon
USING (false);

-- Recreate the admin SELECT policy (will override the DENY for admins)
CREATE POLICY "Admins can view all contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Ensure RLS is enabled (should already be, but double-check)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;