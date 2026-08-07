-- Add UPDATE policy for contact_submissions table
CREATE POLICY "Admins can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add DELETE policy for contact_submissions table  
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));