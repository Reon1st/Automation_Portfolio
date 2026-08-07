-- Add indexes for efficient rate limiting
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email_submitted 
ON public.contact_submissions (email, submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at 
ON public.contact_submissions (submitted_at DESC);

-- Create comprehensive validation and rate limiting trigger function
CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS TRIGGER AS $$
DECLARE
    recent_count INTEGER;
    last_submission TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Trim and normalize whitespace
    NEW.name = TRIM(REGEXP_REPLACE(NEW.name, '\s+', ' ', 'g'));
    NEW.email = TRIM(LOWER(NEW.email));
    NEW.subject = TRIM(REGEXP_REPLACE(NEW.subject, '\s+', ' ', 'g'));
    NEW.message = TRIM(REGEXP_REPLACE(NEW.message, '\s+', ' ', 'g'));
    
    -- Enforce length limits
    IF LENGTH(NEW.name) > 100 THEN
        RAISE EXCEPTION 'Name must be 100 characters or less';
    END IF;
    
    IF LENGTH(NEW.email) > 320 THEN
        RAISE EXCEPTION 'Email must be 320 characters or less';
    END IF;
    
    IF LENGTH(NEW.subject) > 150 THEN
        RAISE EXCEPTION 'Subject must be 150 characters or less';
    END IF;
    
    IF LENGTH(NEW.message) > 5000 THEN
        RAISE EXCEPTION 'Message must be 5000 characters or less';
    END IF;
    
    -- Validate basic email pattern
    IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format';
    END IF;
    
    -- Check for recent submission from same email (30 seconds)
    SELECT submitted_at INTO last_submission
    FROM public.contact_submissions
    WHERE email = NEW.email
    AND submitted_at > NOW() - INTERVAL '30 seconds'
    ORDER BY submitted_at DESC
    LIMIT 1;
    
    IF last_submission IS NOT NULL THEN
        RAISE EXCEPTION 'Please wait 30 seconds between submissions';
    END IF;
    
    -- Check hourly rate limit (20 submissions per hour)
    SELECT COUNT(*) INTO recent_count
    FROM public.contact_submissions
    WHERE email = NEW.email
    AND submitted_at > NOW() - INTERVAL '1 hour';
    
    IF recent_count >= 20 THEN
        RAISE EXCEPTION 'Rate limit exceeded. Maximum 20 submissions per hour per email';
    END IF;
    
    -- Set updated_at to current time
    NEW.updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the BEFORE INSERT trigger
DROP TRIGGER IF EXISTS validate_contact_submission_trigger ON public.contact_submissions;
CREATE TRIGGER validate_contact_submission_trigger
    BEFORE INSERT ON public.contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_contact_submission();