-- Configure site_status table for real-time updates
ALTER TABLE public.site_status REPLICA IDENTITY FULL;

-- Add the site_status table to the realtime publication (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'site_status'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.site_status;
  END IF;
END $$;