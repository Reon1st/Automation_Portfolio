# Services Section — Metrics Redesign

**Date:** 2026-08-29
**Status:** Design approved by Reon, pending written spec review before implementation plan.
**Project:** `D:\claude\portfolio-Portfolio1`

## Goal

Restyle the 4 existing Services cards (`src/data/services.ts`, `src/components/sections/ServicesSection.tsx`) from icon+paragraph cards into number/status-led metric cards — inspired by the "Key expertise" stat row on a reference site (franz-simon-tech2.onrender.com), but clickable, where the reference wasn't. Each card leads with a big number or status badge instead of a paragraph, and clicking it jumps straight to real, already-existing proof (a live project's flows/KPIs/ROI), not just a claim.

Audience this serves: clients and business owners evaluating quickly, who want to see results/numbers/ROI/actual flows fast, without extra clicking or hunting.

## Why this instead of copying the reference site directly

The reference's 4 stat cards (8+ Automation builds, 3 Platforms certified, 15+ Integrations, RAG Knowledge bases) are static — they don't link anywhere and don't map to Reon's real service categories. Two changes from the reference, both explicitly requested:

1. **Drop "Platforms certified"** — not part of Reon's positioning.
2. **Keep the existing 4 services as the categories** (Claude, GoHighLevel, n8n, AI Chatbots & Voice) instead of adopting the reference's category set — "correlate to my services," not replace them.
3. **Make it clickable.** The reference's stats are dead ends; this design's aren't.

This also continues the honesty policy already established in `2026-07-06-portfolio-repositioning-design.md` and reaffirmed in `2026-08-24-freelance-niche-positioning-design.md`: **no invented metrics, no number without a real, verifiable backing.** This design is the concrete mechanism that enforces that rule for these specific cards — see "Honesty mechanism" below.

## The four cards

| Card | Display | Real backing today | Click behavior |
|---|---|---|---|
| **GoHighLevel CRM** | Number: **3** | powerTAG's 3 real GHL flows (lead pipeline, follow-up, newsletter) — already in `flagshipProjects.ts` | Scrolls to `#websites`, auto-opens the powerTAG project modal (KPIs → flow engine → ROI, in that order, already the existing modal layout) |
| **n8n Workflow Automation** | Status badge: **"In Development"** | None yet — confirmed with Reon, no real n8n project exists in the site data or vault | Opens a short inline note ("building real n8n workflows now, this card fills in once one ships") — no navigation, nothing to point to yet |
| **Claude \| Code \| Cowork** | Status badge: **"Powers Everything"** | Not a countable thing — it's the foundation under every other project (support-triage, ops-dashboard, invoice-automation, client-onboarding all run on Claude/Trigger.dev/Composio) | Scrolls to `#portfolio` (Automation Projects section) — a real category jump, not a fabricated count |
| **AI Chatbots & Voice Agents** | Status badge: **"In Development"** | 0 shipped, but real: ElevenLabs voice agent actively in progress per `1 - Aspirations/ACTIVE PROJECTS.md` (`Prompt_engineering` entry) | Same inline "building this now" note as n8n |

## Honesty mechanism — why the number can't drift into a lie

Numbers are not hand-typed into `services.ts`. Instead, a small new file — `src/data/automationsRegistry.ts` — lists real automations one at a time (`{ id, platform, projectId, oneLiner }`); each card's number is that list's length for the matching platform, computed, not typed. Today the registry has exactly 3 entries, all `platform: "ghl"`, all with `projectId: "powertag"` — so "3" is provably true by construction, not by discipline. When a real n8n workflow ships, it becomes a new registry entry and the n8n card automatically flips from "In Development" to a real number — no redesign, no risk of the number outliving what it describes.

Click target for a platform card comes from its registry entries' `projectId`. Right now every platform's entries share one `projectId` (all GHL entries point to `powertag`), so the click target is unambiguous. If a platform ever accumulates entries across more than one project, that's new territory needing its own small decision (a chooser, or just linking the most recent) — not a problem today, flagged here so it isn't silently assumed away later.

This keeps the "hand-maintained but always backed" property agreed on earlier: Reon adds entries as real work happens (so NDA'd or off-site client work still counts once he chooses to log it), but the card can never show a number bigger than what's actually listed.

## Navigation mechanism

Recommended and confirmed: **scroll + auto-open**, plus a URL hash so the resulting state is a shareable link (e.g. `yoursite.com/#websites=powertag` could be pasted directly into a client proposal, opening straight to proof). This was chosen specifically because it doesn't add any visitor-facing complexity over plain scroll+auto-open — the on-site experience is still exactly one click — while the hash is invisible plumbing that costs little extra once auto-open exists, and directly serves "clients in a rush" by making direct-to-proof links possible outside the site too.

Implementation shape (confirmed against current code):
- `WebsitesSection.tsx` already holds `detailIndex: number | null` as local state that opens `WebProjectModal` — no new modal component needed, no lifting state to `Index.tsx`.
- On mount, `WebsitesSection` checks `window.location.hash` for a project id and, if present, sets `detailIndex` to that project's index and scrolls the section into view.
- The metric card's click handler sets the hash and scrolls — cheap, no cross-component event bus needed.
- The modal's existing section order (challenge → solution → **KPIs** → **flow engine** → what-you-get → **ROI**) already puts the "results/numbers/flows" content a rushed client wants right near the top — no extra in-modal scroll-to-anchor logic needed, opening the modal is enough.

## Card visuals

- **Number cards:** big number, small label underneath (e.g. "**3** — GoHighLevel automations shipped"). Paragraph description shrinks or moves to a hover/expand reveal, de-emphasized relative to the number.
- **Status cards** (n8n, Chatbots/Voice): same card shape, badge instead of a number, so an unfinished category still looks like a preview of what's coming rather than a broken/empty card.
- **Claude:** visually distinct from the 3 platform cards — reads as the foundation layer, not a 5th competing category.
- Section stays at `#services`, same position on the page — no new section added above/below (rejected the reference site's separate stat-row-then-grid layout as unnecessary duplication of the same space).

## What does not change

- No new claims beyond what's listed above. No testimonials, no invented ROI figures beyond what powerTAG's `roi` data already states.
- The 4 service categories stay the same 4 — this is a restyle + real-data wiring, not a repositioning.
- No architecture changes to `flagshipProjects.ts`'s existing types (`FlagshipProject`, `WebShowcaseProject`, `ProjectFlow`) — the new registry is additive, separate from those.

## Open follow-ups (not blockers, just known future work)

- n8n and Chatbots/Voice registries start empty. Update them the moment either ships something real — that's the whole point of the mechanism.
- The inline "In Development" note's copy/placement (tooltip vs. small popover vs. inline expand) is a small UI decision left for implementation, not a design blocker.

## Next step

Spec self-review, then Reon reviews this file, then turn it into an implementation plan via the writing-plans skill.
