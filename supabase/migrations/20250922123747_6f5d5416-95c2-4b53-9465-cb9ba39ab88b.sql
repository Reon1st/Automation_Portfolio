-- Create a site-wide availability status table
CREATE TABLE public.site_status (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  status text NOT NULL DEFAULT 'available',
  last_updated timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for admin-only control
ALTER TABLE public.site_status ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read site status
CREATE POLICY "Site status is viewable by everyone" 
ON public.site_status 
FOR SELECT 
USING (true);

-- Allow updates (we'll handle admin auth in the app)
CREATE POLICY "Site status can be updated" 
ON public.site_status 
FOR UPDATE 
USING (true);

-- Insert initial status record
INSERT INTO public.site_status (status) VALUES ('available');

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_site_status_updated_at
BEFORE UPDATE ON public.site_status
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for site status
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_status;