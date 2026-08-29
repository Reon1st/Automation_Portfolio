# Services Section — Metrics Redesign

**Date:** 2026-08-29
**Status:** Approved by Reon. Implementing.
**Project:** `D:\claude\portfolio-Portfolio1`

## Goal

Restyle the 4 existing Services cards (`src/data/services.ts`, `src/components/sections/ServicesSection.tsx`) from icon+paragraph cards into number/status-led metric cards — inspired by the "Key expertise" stat row on a reference site (franz-simon-tech2.onrender.com), but clickable, where the reference wasn't. Each card leads with a big number or status badge instead of a paragraph, and a real-number card clicks straight through to real proof (a live project's flows/KPIs/ROI), not just a claim.

Audience: clients and business owners evaluating in a hurry, who want results/numbers/ROI/actual flows fast, with minimal clicking.

## Footprint guarantee (hard constraint)

**No new sections, no new full-width bands, no added vertical space.** We are NOT copying the reference's separate stat row sitting above its services grid — that band is exactly the extra space to avoid. This is a restyle of the **same 4 cards, in the same `#services` grid, in the same page position.** The number/badge *replaces* the paragraph as the card's focal point; a number + short label is equal-or-more-compact than a 3-line paragraph, so the section's height stays the same or tightens. Net footprint change target: zero or slightly less.

## Why this, not a direct copy of the reference

1. **Drop "Platforms certified"** — not part of Reon's positioning (explicitly excluded).
2. **Keep Reon's own 4 services as the categories** (Claude, GoHighLevel, n8n, AI Chatbots & Voice) — "correlate to my services," not adopt the reference's set.
3. **Make it clickable** — the reference's stats are dead ends; a real-number card here opens the proof.

Continues the honesty policy from `2026-07-06-portfolio-repositioning-design.md` and `2026-08-24-freelance-niche-positioning-design.md`: **no invented metrics, no number without real backing.** This design is the mechanism that enforces that for these cards.

## The four cards

| Card | Display today | Real backing | Click behavior |
|---|---|---|---|
| **Claude \| Code \| Cowork** | Badge: **"Powers Everything"** | The foundation under every automation project (support-triage, ops-dashboard, invoice-automation, client-onboarding all run on Claude/Trigger.dev/Composio) — not a countable thing | Plain anchor to `#portfolio` (Automation Projects). Reuses the site's existing anchor nav — zero custom code. |
| **GoHighLevel CRM** | Number: **3** | powerTAG's 3 real GHL flows (lead pipeline, follow-up, newsletter), already in `flagshipProjects.ts` | Opens the powerTAG case-study modal directly (KPIs → flow engine → ROI, the existing modal order). No page scroll. |
| **n8n Workflow Automation** | Badge: **"In Development"** | None yet (confirmed: no real n8n project in site data or vault) | Tap/click toggles a short inline note ("building this now"). No navigation. |
| **AI Chatbots & Voice Agents** | Badge: **"In Development"** | 0 shipped; ElevenLabs voice agent actively in progress per `1 - Aspirations/ACTIVE PROJECTS.md` | Same inline note as n8n. |

## Honesty mechanism — the number can't drift into a lie

Numbers are not hand-typed. A new file `src/data/automationsRegistry.ts` lists real automations one at a time (`{ id, platform, projectId, oneLiner }`). A card's number is that list's length for its platform — computed, not typed. Today: exactly 3 entries, all `platform: "ghl"`, all `projectId: "powertag"` → "3" is true by construction.

**One code path, auto-flipping:** every platform card is the same "count" kind. The renderer decides by the resolved count — `0` renders the **"In Development"** badge (not a cold "0"), `> 0` renders the number and becomes clickable. So when a real n8n or voice/chat agent ships, you add one registry entry and that card flips from "In Development" to a live number with a working click-through — no redesign. Platforms: `"ghl"`, `"n8n"`, `"agents"` (chat + voice). Claude is the one exception — kind `"foundation"`, never a count.

Click target for a real-number card comes from its registry entries' `projectId`. Today every platform's entries share one project, so the target is unambiguous. If a platform ever spans multiple projects, that needs its own small decision (a chooser, or link the most recent) — not a problem now, flagged so it isn't silently assumed away.

## Navigation mechanism (direct open, no scroll)

Reading the real code changed this from the first draft. Two facts:
- Smooth scroll is **Lenis** (`useSmoothScroll.tsx`); section nav is plain `<a href="#id">` anchors.
- The case-study modal is a **Radix Dialog** (`WebProjectModal`) driven by `detailIndex` state local to `WebsitesSection`. Radix **locks page scroll and covers the viewport** while open.

Therefore scrolling the page "behind" the modal is invisible work — dropped. A real-number card opens the modal **directly**:

- The card sets `window.location.hash = "case-<projectId>"` (e.g. `#case-powertag`).
- `WebsitesSection` runs a small effect that reads the hash on mount and on `hashchange`; when it matches `#case-<id>`, it opens that project (`setDetailIndex`), and when the hash clears it closes. ~10 lines.
- Because setting a hash creates a history entry, **browser/phone Back closes the modal for free** (Android back button included) — a real mobile win, no extra code.
- `onClose` clears any `#case-` hash (via `history.replaceState`, no new entry) so state stays in sync and re-clicking works.
- A link like `reonmartin.cloud/#case-powertag` opens straight to the proof — shareable in an Upwork proposal, now for free instead of via broken plumbing.
- The hash `#case-powertag` matches no element `id`, so neither the browser nor Lenis attempts a scroll — consistent with the no-scroll decision.

## Desktop / mobile behavior

- **Real-number card:** identical both — opens the full modal. On mobile the modal is full-screen (correct for a phone); Back closes it.
- **"In Development" card:** desktop hover reveals the note; mobile has no hover, so **tap toggles the note inline, expanding within the card** — no popover, no new space pushed onto the page. Tap again (or another card) closes it.
- **Claude card:** plain anchor to `#portfolio`, same on both, using the existing smooth-scroll nav.

## Card visuals

- **Number card:** large number, small unit label (e.g. "**3** — GoHighLevel automations live"), a subtle "view the build →" affordance, plus one short muted description line (clamped) so the selling voice survives without adding height. Tools badges stay (the "correlate to services" signal).
- **"In Development" card:** same card shell, badge instead of a number, so an unshipped category reads as a preview, not a broken/empty card.
- **Claude card:** visually distinct "Powers Everything" badge — reads as the foundation layer, not a 5th competing category.
- Section stays at `#services`, same position. No section added above/below.

## What does not change

- No new claims beyond the above. No testimonials, no invented ROI.
- Still the same 4 service categories — restyle + real-data wiring, not a repositioning.
- No changes to `flagshipProjects.ts` types (`FlagshipProject`, `WebShowcaseProject`, `ProjectFlow`). The registry is additive and separate.
- No changes to `Index.tsx`, no new context, no new component, no prop-drilling — only a hash-watcher effect in `WebsitesSection` and the `ServicesSection` restyle.

## Files touched

- **new** `src/data/automationsRegistry.ts` — the countable registry + `countByPlatform` / `targetProjectFor` helpers.
- **edit** `src/data/services.ts` — add a `metric` field per service (kind `count` w/ platform + unit + devNote, or kind `foundation` w/ badge).
- **edit** `src/components/sections/ServicesSection.tsx` — render metric-led cards; wire click behavior.
- **edit** `src/components/sections/portfolio/WebsitesSection.tsx` — hash-watcher effect; clear hash on close.

## Deferred (revisit with Reon after this ships)

The scroll-to-Websites-then-open variant (what the first draft described) is **not discarded** — Reon wants to compare it against this direct-open version once this one is visible. Kept as an explicit follow-up, not cut.

## Open follow-ups

- n8n and `agents` registries start empty; update the moment either ships real work — the whole point of the mechanism.
- Exact height parity of the restyled cards needs a visual check (browser extension currently unavailable) — tune after eyeballing.
