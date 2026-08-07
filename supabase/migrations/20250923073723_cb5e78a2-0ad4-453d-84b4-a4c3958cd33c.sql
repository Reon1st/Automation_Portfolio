-- Configure site_status table for real-time updates
ALTER TABLE public.site_status REPLICA IDENTITY FULL;