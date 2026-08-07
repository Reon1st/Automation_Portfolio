# Portfolio Repositioning — Design

**Date:** 2026-07-06
**Status:** Approved by Reon (brainstorming session)
**Project:** `D:\claude\portfolio-Portfolio1` — Vite + React + shadcn + Tailwind portfolio site

## Goal

Reposition the portfolio from "tool-tab workflow screenshots" (2025 practice work: Zapier/Make/GHL/n8n cards with unverifiable metrics) to a systems-led AI-automation-consultant portfolio built around Reon's three real, shipped systems. Supports the Upwork/OnlineJobs.ph freelance relaunch. Simultaneously remove the Supabase backend dependency and add conversion-focused improvements for skimming prospects.

## Content honesty rules (apply everywhere)

- No invented metrics ("70% satisfaction", "99.9% uptime"). Replace with real capability statements ("answers grounded in your own docs", "escalates refunds and upset customers to a human").
- Flagship systems are framed honestly as **personal production systems built as flagship deliverables** — copy focuses on what a client gets, the bottleneck it removes, and how it boosts their business. No fake client claims.

## 1. Portfolio section restructure

Replace the tool-tab organization in `PortfolioSection.tsx` with three tiers:

### Tier 1 — Flagship case studies (visually dominant)

1. **AI Support Ticket Triage** (leads — strongest 2026-relevant piece): RAG over a client knowledge base, auto-answers grounded in uploaded docs via vector search, escalates refunds/billing/cancellation/legal/upset-sounding emails to a human with an AI-drafted reply.
2. **AI Operations Dashboard**: Next.js + Trigger.dev + Composio system — client-facing dashboard, background automations, status lifecycle. Framing: "the system a client gets — one place to run their automations, not a black box."
3. **Invoice & Onboarding Automation**: branded PDF invoices → Gmail delivery → Drive filing; sequenced onboarding emails (contract PDF → survey → Calendly).

Each case study follows **Bottleneck → System → What the client gets** structure.

### Tier 2 — Web showcase

Revv Dynamics as one design-flavored card: "I also build the front door — premium animated marketing sites" (React/Vite/GSAP).

### Tier 3 — Workflow automation strip

Compact row: tool logos (n8n, GHL, Zapier, Make) + 3–4 strongest legacy workflows as small cards **with their existing screenshot preview images kept** (Reon: important for clients), stripped of inflated stats.

## 2. Data model changes (`src/data/portfolioProjects.ts`)

New `FlagshipProject` interface:

```ts
interface FlagshipProject {
  id: string;
  title: string;
  bottleneck: string;      // the business problem it removes
  system: string;          // what it does
  clientGets: string[];    // outcome bullets
  stack: string[];
  media: {
    screenshot?: string;
    video?: string;
    liveUrl?: string;
  };                       // all optional — cards render with placeholders until assets provided
}
```

Legacy projects trimmed into a `legacyWorkflows` list (title, screenshot, one-line description, tools) for the Tier 3 strip. Cards must render cleanly media-less now and upgrade without structural changes when Reon supplies screenshots / demo videos / live links.

## 3. Services rewrite (`src/data/services.ts`)

Four cards, each correlated to real built work, worded simply (plain language a non-technical business owner skims and understands). Copy below is the approved direction; final wording is polished during implementation.

1. **Custom AI Automation Systems (Claude)** — flagship card, listed first. "I build complete AI systems for your business — a dashboard you log into, with automations working behind it: support emails answered from your own docs, invoices generated and sent, new clients onboarded automatically." Correlates directly to the three flagship portfolio projects. Stack shown: Claude AI, Next.js, Trigger.dev, Composio, RAG/vector search.
2. **GoHighLevel — CRM & Marketing** — "Everything your sales side needs in one place: CRM setup, automation integrations, AI agents, converting funnels and landing pages, SMS + email campaigns that follow up so you don't have to."
3. **n8n Workflow Automation** — "Connect the tools you already use. Emails sorted automatically, spreadsheets that update themselves, data moved between apps without copy-paste."
4. **AI Chatbots & Custom AI Agents** — "Chatbots that answer customers 24/7 and qualify leads, or custom-built AI agents wired into your existing tools."

Tool logos per card follow the stacks above. Revv-Dynamics-style web work is showcased in the portfolio (Tier 2), not as a service card.

## 4. Hero rework (`HeroSection.tsx`, `constants.ts`)

- Keep layout; replace copy. Title "Workflow Automation Specialist" → AI-systems positioning. Headline pattern: "I build AI systems that run your support, invoicing, and onboarding — while you sleep."
- n8n/GHL/Zapier/Make demoted to a supporting "also fluent in" line.
- **Single primary CTA**: "Book a free discovery call" (Cal.com) + secondary "see the systems" scroll link. Social-platform buttons de-emphasized, not four equal-weight choices.

## 5. Lovable Cloud backend (kept — verified live 2026-07-06)

The `src/integrations/supabase/` client **is** the Lovable Cloud connector: `.env` `VITE_SUPABASE_URL` points at `c--aa40ee9d-...-prod.lovable.cloud`. Nothing is stale; everything backend-related stays.

- **Keep:** `supabase/` folder (migrations + edge functions), `src/integrations/supabase/`, `@supabase/supabase-js`, `Admin` page (availability toggle + testimonials management), `Drafts` page (writes `contact_submissions` — future client-form use case), realtime availability indicators.
- **Verified against the live backend:** `site_status` returns `"available"` (Admin → hero badge pipeline works). `testimonials` table exists but is **empty**.
- **Homepage testimonials (hidden until real):** the static testimonials in `src/data/testimonials.ts` are not verified-real, so they are never shown on the homepage. The section fetches from Lovable Cloud and renders nothing while the table is empty; when Reon adds real testimonials via the Admin page, the section appears automatically with no code change.
- Privacy policy unchanged (its Supabase storage claims remain true).
- Contact section is a Cal.com embed — unaffected.

## 6. Conversion core additions

- **Testimonials on homepage:** pull 2–3 strongest onto `Index.tsx` between portfolio and contact.
- **FAQ section:** `FAQSection.tsx` exists but is never rendered — wire into `Index.tsx` with objection-killer questions (cost, timeline, "what if it breaks", "do I need to understand the tech").
- **"How it works" strip:** 3 steps — map your bottleneck → I build the system → you watch it run in your dashboard. Emphasize "you get a dashboard, not a black box."

## 7. Trust polish

- **Timezone reframe:** present availability as US-business-hours overlap instead of raw GMT+8 evening hours.
- **OG/meta tags:** update title/description tags in `index.html` to match new positioning (link unfurls in Upwork proposals are a primary first-impression surface). **Keep the existing preview image** unless Reon provides a new one.
- **Keep** the `fortunate-cat.super.site` case-studies link (Reon: important, stays).

## 8. Signature flow animation

Animated decision-flow diagram on the AI Support Ticket Triage flagship card: email arrives → AI reads it against the knowledge base → confident answer goes out / uncertain one escalates to a human with a draft. Builds on the existing `AutomationFlowAnimation` foundation and Reon's GSAP strength. **May ship as a fast-follow after the content rework** — content ships first with a static diagram placeholder if needed.

## What does not change

Architecture (Vite/React/shadcn/Tailwind), routing framework, Lovable Cloud backend + Admin/Drafts pages, Cal.com contact embed, theme system, existing animation hooks, About page.

## Verification

- `npm run build` and `npm run lint` pass.
- Manual pass: homepage renders all new sections in order (hero → services → how-it-works → portfolio tiers → testimonials → FAQ → contact); `/admin` and `/drafts` routes still work; availability badge still reflects the live `site_status` value; homepage testimonials render the static fallback while the DB table is empty.
- Skim test: hero answers "what do you build / for whom / how do I start" above the fold with one primary CTA.
