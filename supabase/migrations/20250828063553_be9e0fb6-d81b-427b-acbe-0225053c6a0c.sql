-- Remove old check constraints that conflict with our comprehensive trigger validation
ALTER TABLE public.contact_submissions DROP CONSTRAINT IF EXISTS message_length_check;
ALTER TABLE public.contact_submissions DROP CONSTRAINT IF EXISTS name_length_check;
ALTER TABLE public.contact_submissions DROP CONSTRAINT IF EXISTS subject_length_check;
ALTER TABLE public.contact_submissions DROP CONSTRAINT IF EXISTS email_length_check;
ALTER TABLE public.contact_submissions DROP CONSTRAINT IF EXISTS email_format_check;