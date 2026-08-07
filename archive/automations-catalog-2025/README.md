# Archived: old Automations section (Zapier/Make/GoHighLevel/N8N catalog)

Pulled off the live portfolio on 2026-07-09. This was a 17-project catalog (`automationProjects.ts`) rendered by `AutomationsSection.tsx` on the homepage, showcasing specific Zapier/Make.com/GoHighLevel/N8N builds (Xero-Asana sync, AI content repurposing, Gemini agent with memory, etc.).

**Why archived, not just deleted:** these were built a while back and Reon can no longer speak to the specific implementation details if a client asks on a call — kept here for reference/reuse in case any of these get rebuilt or revisited with real, current understanding behind them.

**Contents:**
- `automationProjects.ts` — the 17-project data file (id, title, platform, description, keyFeatures, technologies, clientValue)
- `AutomationsSection.tsx` — the homepage section component that rendered it (platform tabs + project carousel)
- `screenshots/` — the 19 workflow screenshots referenced by the data file (original filenames from `public/lovable-uploads/`)

**Not carried forward:** the section's nav link (`#automations`), its import/render in `src/pages/Index.tsx`, and its entry in `Header.tsx`'s mobile nav icon map — all removed from the live site.
