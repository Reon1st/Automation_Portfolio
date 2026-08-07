
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_submissions;
CREATE POLICY "Anyone can submit a valid contact message"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (
    length(trim(name)) BETWEEN 1 AND 200
    AND length(trim(email)) BETWEEN 3 AND 320
    AND email LIKE '%@%.%'
    AND length(trim(message)) BETWEEN 1 AND 5000
    AND (subject IS NULL OR length(subject) <= 300)
  );
