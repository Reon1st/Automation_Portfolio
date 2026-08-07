

## Assessment

Three issues to fix:

1. **Testimonial cards are oversized** — the current `max-w-3xl` card with `p-8 md:p-12` padding, large quote icon, and generous spacing makes each card take up too much vertical space. For future homepage embedding and a Shopify-headline feel, cards need to be compact and horizontally scrollable.

2. **Admin Eye toggle broken** — `toggleVisibility` calls `supabase.from('testimonials').update(...)` but the admin is authenticated via a hardcoded password, not Supabase auth. RLS requires `has_role(auth.uid(), 'admin')`, so the update silently fails. All CRUD operations (add, edit, delete, toggle) are broken for the same reason.

3. **Carousel motion** — current Embla setup uses snap-based scrolling. Shopify-style headline carousels use continuous smooth auto-scroll (ticker/marquee style) that loops infinitely without snapping.

## Plan

### 1. Redesign testimonial cards to be compact

- Reduce card to a horizontal layout: avatar + stars on the left, quote text + author on the right
- Remove the oversized Quote icon circle, reduce padding to `p-6`
- Cap card width at `max-w-2xl`, reduce text size to `text-base`
- Keep the glassmorphism border and gradient accent line but make them subtler
- This makes cards embeddable on the homepage later

### 2. Switch carousel to continuous smooth scroll (Shopify-style)

- Configure Embla with `dragFree: true` and a custom auto-scroll that continuously translates rather than snapping
- Alternative: use CSS-based infinite marquee animation (two copies of testimonials side by side, `translateX` animation) — this is more reliable for the "headline ticker" effect
- Keep dot indicators but make them optional/subtle
- Keep arrow nav for manual override
- Smooth `ease-in-out` transitions matching the project's animation philosophy

### 3. Fix admin CRUD — bypass RLS with edge function

Since the admin uses hardcoded password auth (not Supabase auth), all RLS-protected operations fail silently. Two options:

**Option A (recommended)**: Add a `service_role` edge function `manage-testimonials` that accepts the admin password in the request, validates it, then performs CRUD using the service role key (bypasses RLS). This keeps the current admin pattern working.

**Option B**: Add an RLS policy `FOR ALL USING (true)` — insecure, not recommended.

Going with Option A: create an edge function that handles all testimonial CRUD operations.

### 4. Enhance admin panel configurations

- Add a **bulk reorder** drag-style interface (simple up/down arrows to shift `display_order`)
- Add **featured toggle** — mark specific testimonials as "featured" for homepage display (future use)
- Add **preview** button that opens the testimonial in a mini card preview within the admin
- Show a **count summary** (e.g., "3 visible, 2 hidden")
- Add **duplicate** action to quickly clone a testimonial entry

### Files to change

| File | Action |
|------|--------|
| `src/pages/Testimonials.tsx` | Compact cards + continuous smooth scroll |
| `src/pages/Admin.tsx` | Wire CRUD through edge function, add reorder/featured/preview/duplicate |
| `supabase/functions/manage-testimonials/index.ts` | New edge function for authenticated CRUD |
| `src/data/testimonials.ts` | Add `platform` field to fallback data for type consistency |

### Technical details

- The edge function will accept `{ action, password, data }` — validates password matches env secret, then uses `createClient` with `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS
- Continuous scroll: CSS `@keyframes marquee` animation with `animation: marquee 30s linear infinite`, duplicating the testimonial list for seamless looping. Pauses on hover.
- Cards: horizontal flex layout, `min-w-[320px] max-w-[400px]` per card for the ticker strip

