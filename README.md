# Reon Martin — AI Systems Consultant

**Live portfolio for an AI-automation consulting practice.** Not a template, not a demo shell — the systems shown here (support triage, ops dashboards, invoice/onboarding automation, client websites) were built and shipped, and this repo is the actual source, not a polished excerpt of it.

## What this site is

I build AI-powered systems for service businesses: AI support agents, CRM/business automation, live dashboards you can actually monitor (not a black box), and conversion-focused websites. The site is organized around that — an Automation Projects section (AI Support Ticket Triage, an AI Operations Dashboard, Invoice Automation, Client Onboarding Automation) and a Websites section (a fine-dining site with a real availability-checked reservation system, a home-services site with an AI-generated live quote, a performance-shop site with real contact-form delivery).

Every project shown links through to the real thing where possible — a live deployment, a demo video, or a screenshot walkthrough of the actual flow — not mockups.

## Why this is public

This is my own project, not client work — nothing here is under an NDA or confidentiality obligation, so there's no reason to keep it closed. Two concrete reasons I pushed it to GitHub:

- **Proof of work, not just a claim.** Anyone evaluating me for a project can read the actual code — component structure, TypeScript usage, how a real third-party integration (Cal.com, Supabase) gets wired in — instead of taking "I build production systems" on faith.
- **A real backup.** This used to live only inside a hosted builder. It now has its own git history and its own remote, independent of any single platform.

## Tech stack

- **Frontend:** Vite, React, TypeScript, Tailwind CSS, shadcn/ui
- **Booking:** Cal.com embed
- **Backend (testimonials only):** Supabase (Postgres + edge functions) — the availability status shown on the site is computed client-side from a fixed weekly schedule, no backend involved

## Running locally

```sh
git clone https://github.com/Reon1st/Automation_Portfolio.git
cd Automation_Portfolio
npm install
npm run dev
```

You'll need your own `.env` (see the Supabase client setup under `src/integrations/supabase/`) if you want the testimonials admin panel to work — the public site itself renders fine without it.

## Contact

- **Upwork:** https://www.upwork.com/freelancers/~0133dfaffaaaf4cc5a
- **LinkedIn:** https://www.linkedin.com/in/reon-martin-5bb8b7364/
- **OnlineJobs.PH:** https://www.onlinejobs.ph/jobseekers/info/2718705
- **Email:** reonfirst [ dot ] gmail [ dot ] com
