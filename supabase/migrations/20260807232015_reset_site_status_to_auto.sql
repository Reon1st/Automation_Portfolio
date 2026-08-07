-- The manual availability toggle now has three states: auto (defer to the
-- class-schedule signal), available, unavailable. Existing rows were seeded
-- with 'available' from before this feature existed; reset to 'auto' so the
-- automatic class-schedule signal keeps driving the site until someone
-- explicitly sets an override via the admin panel.
UPDATE public.site_status SET status = 'auto';
