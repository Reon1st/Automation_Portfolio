# Homepage Redesign — Two Directions (Shelved)

**Date:** 2026-09-01
**Status:** Draft concepts only — **shelved**, not approved for implementation. Kept as reference for this and future projects.
**Project:** `D:\claude\portfolio-Portfolio1`

## Goal

Redesign the homepage (hero → services → projects → testimonials → FAQ → contact → footer) with a distinctive, premium visual language that stands out from generic AI-portfolio defaults — while keeping the current section order and content-honesty rules intact.

## Scope decided during brainstorming

- **Whole homepage**, visual/component layer only — page structure (section order) stays as-is.
- **Palette open for full reinvention** — not locked to the current cyan-on-charcoal.
- User explicitly rejected a first round of directions ("Signal" / "Atelier" / "Pulse") as generic — they were style swaps not grounded in the actual subject matter. Re-run through `frontend-design:frontend-design`, both directions below are built from what Reon actually sells (automated systems — GHL / n8n / Claude — a client can see running, not black-box magic), and explicitly checked against the three AI-generated-design defaults the skill calls out (cream+serif+terracotta / near-black+neon accent / broadsheet hairline-newspaper).

## Direction 1 — "The Console"

Full mockup: [`docs/design-references/2026-09-01-console-direction.html`](../../design-references/2026-09-01-console-direction.html)

**Concept:** the hero doubles as the actual proof panel. Left pane is the human (serif headline, warm tone, CTA); right pane is the machine — a live status table pulling **real** per-platform automation counts from `src/data/automationsRegistry.ts` (8 Claude Code, 3 GoHighLevel, N8N marked "available"). Literalizes the site's own existing promise — "you get a dashboard, not a black box" — as the first thing a visitor sees, not a claim they read later.

**Color:** `ink` #0B0E14 · `panel` #131824 · `paper` #EDEAE0 · `signal-teal` #3FCFB0 · `signal-amber` #E8A33D · `line` #212836

**Type:** Georgia/serif for human moments (name, headline) only, restrained · system sans for body copy · Consolas/monospace for every status label, count, and platform tag.

**Layout:** two-pane hero split by one hairline vertical rule; the rest of the page (services, projects, etc.) would carry the panel/mono-label language into cards and section headers.

**Signature element:** the live status panel — real data, not decoration.

## Direction 2 — "The Draft"

Full mockup: [`docs/design-references/2026-09-01-draft-direction.html`](../../design-references/2026-09-01-draft-direction.html)

**Concept:** breaks the one convention nearly every AI-consultant portfolio shares — it isn't dark mode. Warm paper background, a technical drafting register: a title-block stamp (name/role/base/status as a 4-column mono grid) instead of a bio line, and section dividers drawn as routed circuit traces with right-angle bends and solder-point dots — echoing the site's real `WorkflowEngine` flow diagrams — instead of decorative hairlines.

**Color:** `paper` #F1EEE5 · `ink` #1B1B18 · `graphite` #6B6A63 · `draft-blue` #2A4258 · `line` #D8D4C7

**Type:** Archivo Expanded (bold, uppercase, condensed/industrial) for the headline only · system sans for body · Consolas/monospace for the stamp and node labels.

**Layout:** single column, generous margins, title-block header, routed-trace section transitions.

**Signature element:** the routed circuit-trace dividers, structurally encoding "these are connected systems" instead of decorating the page.

## What does not change

No copy fabrication, no invented metrics (both mockups use the real 8/3 automation counts from the live registry). No architecture or backend changes. No section reordering. This stays reference material until explicitly picked up and approved for implementation.

## Next step (when resumed)

Pick one direction (or a hybrid), confirm the accent/type choices hold up applied to a full page (services cards, project cards, footer — not just the hero), then run through `writing-plans` before touching `index.css` / `tailwind.config.ts`.
