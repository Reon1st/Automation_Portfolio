# Portfolio Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the portfolio site from tool-tab workflow screenshots to a systems-led AI-automation-consultant site built around Reon's three real shipped systems, plus conversion additions (hero CTA, homepage testimonials, FAQ, how-it-works) and trust polish (meta tags, timezone reframe).

**Architecture:** Content lives in typed data files under `src/data/`; sections are self-contained components under `src/components/sections/` composed by `src/pages/Index.tsx`. The portfolio section is rebuilt as three subcomponents (flagship case studies, web showcase, legacy strip) fed by two new data files. The Lovable Cloud (Supabase) backend is kept untouched; the new homepage testimonials section reuses the existing fetch-with-static-fallback pattern from `src/pages/Testimonials.tsx`.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind + shadcn/ui, lucide-react, @supabase/supabase-js (Lovable Cloud).

**Spec:** `docs/superpowers/specs/2026-07-06-portfolio-repositioning-design.md`

## Global Constraints

- **No invented metrics.** No "70% satisfaction", "99.9% uptime", "saved 30 hrs/week" style claims anywhere in new copy. Capability statements only.
- Flagship systems framed as **personal production systems built as flagship deliverables** — never as client work.
- **Keep:** Lovable Cloud backend (`src/integrations/supabase/`, `supabase/`), Admin page, Drafts page, realtime availability indicators, the `fortunate-cat.super.site` case-studies link, existing OG preview image, legacy workflow screenshot images.
- **No test runner exists in this repo** (no vitest/jest). Verification for every task = `npm run build` (must exit 0), `npm run lint` (no new errors), and a manual render check in `npm run dev`. Do not add a test framework for this content rework (YAGNI).
- Copy tone: simple, plain language a non-technical business owner understands. Match existing component idioms (shadcn `Card`, `SectionHeader`, `useScrollAnimation`, Tailwind `animate-*` classes already defined in `src/index.css`).
- Working directory: `D:\claude\portfolio-Portfolio1`. Git repo root is the parent (`D:\claude`) — always `git add` specific files, never `git add -A`.

---

### Task 1: Constants + Hero rework (positioning copy, primary CTA)

**Files:**
- Modify: `src/lib/constants.ts:7-16` (SITE_CONFIG)
- Modify: `src/components/sections/HeroSection.tsx:41-70` (pitch copy + CTA block)

**Interfaces:**
- Produces: `SITE_CONFIG.title = "AI Automation Consultant"`, `SITE_CONFIG.tagline` (used by Footer/About; changing the constant propagates).

- [ ] **Step 1: Update SITE_CONFIG in `src/lib/constants.ts`**

Replace lines 7–16 with:

```ts
export const SITE_CONFIG = {
  name: "Reon Martin",
  title: "AI Automation Consultant",
  tagline: "I build AI systems that run your support, invoicing, and onboarding — while you sleep.",
  email: "reonfirst@gmail.com",
  location: "Manila, Philippines",
  timezone: "GMT+8 — overlaps US business hours",
  copyright: `© ${new Date().getFullYear()} Reon Martin. All rights reserved.`,
  responseTime: "Usually responds in 1 hour",
};
```

- [ ] **Step 2: Replace the hero pitch paragraphs in `HeroSection.tsx`**

Replace the three `<p>` blocks inside `<div className="space-y-4 will-animate">` (lines 41–61) with:

```tsx
<div className="space-y-4 will-animate">
  <p className="text-lg lg:text-xl leading-relaxed max-w-2xl text-muted-foreground">
    <span className="text-foreground font-medium text-lg">
      Manual work slows businesses down —
    </span>{" "}
    <span className="text-foreground text-lg">I build AI systems that make it disappear.</span>
  </p>
  <p className="text-lg leading-relaxed max-w-2xl text-muted-foreground lg:text-lg">
    Support emails answered from your own docs. Invoices generated and sent.
    New clients onboarded automatically. All of it running in a{" "}
    <span className="text-primary font-medium">dashboard you can actually see into</span> — not a black box.
  </p>
  <p className="text-lg leading-relaxed max-w-2xl text-muted-foreground lg:text-lg">
    Built with <span className="text-primary font-medium">Claude AI</span>,{" "}
    <span className="text-primary font-medium">Next.js</span> &{" "}
    <span className="text-primary font-medium">Trigger.dev</span> — also fluent in{" "}
    <span className="text-primary font-medium">n8n</span>,{" "}
    <span className="text-primary font-medium">GoHighLevel</span>,{" "}
    <span className="text-primary font-medium">Zapier</span> &{" "}
    <span className="text-primary font-medium">Make</span>.
  </p>
</div>
```

- [ ] **Step 3: Add the primary CTA block directly after the availability indicator `div` (after line 69)**

```tsx
<div className="flex flex-wrap items-center gap-4 will-animate">
  <Button
    size="lg"
    onClick={() => scrollToElement("contact")}
    className="text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
  >
    Book a Free Discovery Call
  </Button>
  <button
    onClick={() => scrollToElement("portfolio")}
    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-base font-medium"
  >
    See the systems
    <Zap className="h-4 w-4" />
  </button>
</div>
```

`Button`, `Zap`, and `scrollToElement` are already imported/available in this file. Leave the social-links row where it is (the big CTA above it is the de-emphasis).

- [ ] **Step 4: Verify**

Run: `npm run build` — expect exit 0. Run `npm run dev`, open the page: hero shows new headline copy, one primary CTA button that scrolls to contact, "See the systems" scrolls to portfolio.

- [ ] **Step 5: Commit**

```bash
git add src/lib/constants.ts src/components/sections/HeroSection.tsx
git commit -m "feat(hero): AI-systems positioning copy and single primary discovery-call CTA"
```

---

### Task 2: Services rewrite — four project-correlated cards

**Files:**
- Rewrite: `src/data/services.ts`
- Modify: `src/components/sections/ServicesSection.tsx:26` (subtitle), `:71-73` (tools render)

**Interfaces:**
- Produces: `Service` interface with `tools: string[]` (logo field dropped — `ServicesSection` only ever rendered `tool.name`; the logo paths were dead data).

- [ ] **Step 1: Replace the entire contents of `src/data/services.ts`**

```ts
import { Sparkles, Magnet, Workflow, Bot, LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  tools: string[];
}

export const services: Service[] = [
  {
    icon: Sparkles,
    title: "Custom AI Automation Systems",
    description:
      "Complete AI systems built for your business — a dashboard you log into, with automations working behind it. Support emails answered from your own docs, invoices generated and sent, new clients onboarded automatically.",
    features: [
      "A dashboard you own — not a black box",
      "AI answers grounded in your business docs",
      "Grows with you — new automations plug right in",
    ],
    tools: ["Claude AI", "Next.js", "Trigger.dev", "Composio", "RAG / Vector Search"],
  },
  {
    icon: Magnet,
    title: "GoHighLevel — CRM & Marketing",
    description:
      "Everything your sales side needs in one place: CRM setup, automation integrations, AI agents, funnels and landing pages that convert, and SMS + email campaigns that follow up so you don't have to.",
    features: [
      "Leads followed up in minutes, not days",
      "Funnels and landing pages built to convert",
      "SMS + email campaigns that run themselves",
    ],
    tools: ["GoHighLevel", "Funnels", "SMS & Email Campaigns", "AI Agents"],
  },
  {
    icon: Workflow,
    title: "n8n Workflow Automation",
    description:
      "Connect the tools you already use. Emails sorted automatically, spreadsheets that update themselves, and data moved between your apps without the copy-paste.",
    features: [
      "Inbox triage on autopilot",
      "Sheets and CRMs always in sync",
      "Works with any app that has an API",
    ],
    tools: ["n8n", "Gmail", "Google Sheets", "Webhooks & APIs"],
  },
  {
    icon: Bot,
    title: "AI Chatbots & Custom AI Agents",
    description:
      "Chatbots that answer customers 24/7 and qualify leads before you ever talk to them — or custom-built AI agents wired directly into your existing tools.",
    features: [
      "Answers customers around the clock",
      "Qualifies leads before they reach you",
      "Custom agents built for your exact workflow",
    ],
    tools: ["Claude AI", "n8n Agents", "GoHighLevel AI", "Custom Builds"],
  },
];
```

- [ ] **Step 2: Update `ServicesSection.tsx` tools render for the new `string[]` type**

Replace lines 71–73:

```tsx
{service.tools.map((tool, toolIndex) => <Badge key={toolIndex} variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary hover:from-primary/20 hover:to-primary/30 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/50 transition-all duration-500 ease-out border border-primary/30 px-3 py-1 text-xs font-semibold">
    {tool}
  </Badge>)}
```

And update the SectionHeader subtitle (line 26) to: `subtitle="From full AI systems to the CRM and workflow builds that keep your business moving"`.

- [ ] **Step 3: Verify**

`npm run build` exits 0. Dev server: four cards render in order (Custom AI Systems, GoHighLevel, n8n, AI Chatbots), tool badges show plain names.

- [ ] **Step 4: Commit**

```bash
git add src/data/services.ts src/components/sections/ServicesSection.tsx
git commit -m "feat(services): four project-correlated service cards, tools as plain strings"
```

---

### Task 3: Flagship + legacy data files

**Files:**
- Create: `src/data/flagshipProjects.ts`
- Create: `src/data/legacyWorkflows.ts`

**Interfaces:**
- Produces: `FlagshipProject`, `flagshipProjects: FlagshipProject[]`, `webShowcase: WebShowcaseProject`, `LegacyWorkflow`, `legacyWorkflows: LegacyWorkflow[]` — consumed by Task 4 components.

- [ ] **Step 1: Create `src/data/flagshipProjects.ts`**

```ts
export interface FlagshipMedia {
  screenshot?: string;
  video?: string;
  liveUrl?: string;
}

export interface FlagshipProject {
  id: string;
  title: string;
  badge: string;
  bottleneck: string;
  system: string;
  clientGets: string[];
  stack: string[];
  media: FlagshipMedia;
}

export interface WebShowcaseProject {
  title: string;
  description: string;
  stack: string[];
  media: FlagshipMedia;
}

export const flagshipProjects: FlagshipProject[] = [
  {
    id: "support-triage",
    title: "AI Support Ticket Triage",
    badge: "AI + RAG",
    bottleneck:
      "Support inboxes eat hours — the same questions answered again and again, while the risky emails (refunds, cancellations, upset customers) sit in the queue.",
    system:
      "An AI agent watches the support inbox, reads each email against your own uploaded knowledge base, and replies with answers grounded in your docs — never invented policy. Anything uncertain, upset-sounding, or high-stakes gets escalated to a human with a ready-to-edit draft.",
    clientGets: [
      "Routine questions answered automatically, from your own docs",
      "Refunds, billing, and upset customers always reach a human",
      "Every escalation arrives with an AI-drafted reply ready to edit",
      "Every ticket and decision logged in your dashboard",
    ],
    stack: ["Claude AI", "RAG / Vector Search", "Trigger.dev", "Gmail (Composio)", "MongoDB"],
    media: {},
  },
  {
    id: "ops-dashboard",
    title: "AI Operations Dashboard",
    badge: "Flagship System",
    bottleneck:
      "Most automation deliverables are a black box — a workflow file the client can't see, monitor, or trust.",
    system:
      "A custom web dashboard your business logs into: every automation visible with live status, run history, and built-in guides. The automations run as background jobs behind it. This is the foundation my other systems plug into.",
    clientGets: [
      "One login to run and monitor all your automations",
      "Live status for every run — no wondering if it worked",
      "Built-in guide pages so your team can self-serve",
      "New automations plug into the same dashboard as you grow",
    ],
    stack: ["Next.js", "Trigger.dev", "MongoDB", "NextAuth", "Composio"],
    media: {},
  },
  {
    id: "invoice-onboarding",
    title: "Invoice & Client Onboarding Automation",
    badge: "Documents + Email",
    bottleneck:
      "Invoicing and onboarding are copy-paste marathons: generate the PDF, attach it, email it, file it — then remember the whole welcome sequence for every new client.",
    system:
      "Fill one form and the system generates a branded PDF invoice, drafts the Gmail, and files a copy to Google Drive. Onboarding runs as a sequence — personalized contract PDF, then a survey, then a booking link — and it never sends a half-finished sequence.",
    clientGets: [
      "Branded PDF invoices from a single form",
      "Every invoice auto-filed to Drive and drafted in Gmail",
      "New clients get contract → survey → booking, hands-free",
      "Fail-safe sequencing — clients never see a broken half-flow",
    ],
    stack: ["Trigger.dev", "PDF Generation", "Gmail + Drive (Composio)", "Next.js"],
    media: {},
  },
];

export const webShowcase: WebShowcaseProject = {
  title: "Revv Dynamics — Premium Marketing Site",
  description:
    "I also build the front door: a fully animated marketing website with scroll-driven motion and a premium feel — design, layout, and animation built from scratch.",
  stack: ["React", "Vite", "Tailwind", "GSAP"],
  media: {},
};
```

(`media: {}` is intentional — Reon supplies screenshots / demo videos / live URLs later; cards must render a styled placeholder until then.)

- [ ] **Step 2: Create `src/data/legacyWorkflows.ts`**

```ts
export interface LegacyWorkflow {
  title: string;
  platform: string;
  image: string;
  description: string;
}

export const legacyWorkflows: LegacyWorkflow[] = [
  {
    title: "AI Content Repurposing Engine",
    platform: "Zapier",
    image: "/lovable-uploads/042c2556-1366-4d95-a988-aaa9fa6bf6e0.png",
    description:
      "Turns one uploaded file into platform-ready posts for Facebook, LinkedIn, and Instagram — transcription, drafting, and publishing handled automatically.",
  },
  {
    title: "AI Gmail Processing",
    platform: "Make.com",
    image: "/lovable-uploads/04228c0e-c9c3-4d68-b6f5-06fea5321d8a.png",
    description:
      "Reads incoming email with AI, files attachments to Drive, and logs the important details to Sheets.",
  },
  {
    title: "Multi-Branch Lead Nurture",
    platform: "GoHighLevel",
    image: "/lovable-uploads/d3233011-8a36-4055-a4c4-31c42c8b2f76.png",
    description:
      "Follow-up that adapts to prospect replies, timing, and status — SMS, document sending, and call scheduling included.",
  },
  {
    title: "AI Agent with Memory",
    platform: "n8n",
    image: "/lovable-uploads/cdac9b7c-6066-4d6f-bd56-5cb36dc108bb.png",
    description:
      "A webhook-triggered AI agent that keeps conversation context and returns clean, structured output.",
  },
];
```

- [ ] **Step 3: Verify**

`npm run build` exits 0 (files compile; nothing consumes them yet).

- [ ] **Step 4: Commit**

```bash
git add src/data/flagshipProjects.ts src/data/legacyWorkflows.ts
git commit -m "feat(portfolio): flagship case study and legacy workflow data files"
```

---

### Task 4: Portfolio subcomponents (flagship cards, web showcase, legacy strip)

**Files:**
- Create: `src/components/sections/portfolio/FlagshipCaseStudies.tsx`
- Create: `src/components/sections/portfolio/WebShowcaseCard.tsx`
- Create: `src/components/sections/portfolio/LegacyWorkflowStrip.tsx`

**Interfaces:**
- Consumes: `flagshipProjects`, `webShowcase` from `@/data/flagshipProjects`; `legacyWorkflows` from `@/data/legacyWorkflows`.
- Produces: three default-export React components, no props (`FlagshipCaseStudies`, `WebShowcaseCard`, `LegacyWorkflowStrip`), composed by Task 5. `LegacyWorkflowStrip` accepts one prop: `onImageClick(image: { src: string; alt: string; title: string }): void`.

- [ ] **Step 1: Create `FlagshipCaseStudies.tsx`**

```tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Cog, Gift, ExternalLink, PlayCircle, MonitorSmartphone } from "lucide-react";
import { flagshipProjects, FlagshipProject } from "@/data/flagshipProjects";

const MediaPanel: React.FC<{ project: FlagshipProject }> = ({ project }) => {
  if (project.media.screenshot) {
    return (
      <div className="rounded-lg overflow-hidden border border-border/50">
        <img src={project.media.screenshot} alt={project.title} className="w-full h-auto object-cover" loading="lazy" />
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 min-h-[180px] flex flex-col items-center justify-center gap-3 p-6">
      <MonitorSmartphone className="h-10 w-10 text-primary/70" />
      <span className="text-sm text-muted-foreground text-center">Live production system — walkthrough on request</span>
    </div>
  );
};

const FlagshipCaseStudies: React.FC = () => {
  return (
    <div className="space-y-8">
      {flagshipProjects.map((project) => (
        <Card key={project.id} className="border-border/50 bg-card/90 backdrop-blur-sm hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">{project.badge}</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <AlertCircle className="h-4 w-4 text-accent" /> The bottleneck
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.bottleneck}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Cog className="h-4 w-4 text-primary" /> The system
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">{project.system}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent text-xs px-2 py-0.5">{tech}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <MediaPanel project={project} />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Gift className="h-4 w-4 text-primary" /> What you get
                </div>
                <div className="grid gap-1.5">
                  {project.clientGets.map((item) => (
                    <div key={item} className="flex items-start gap-2 p-2 rounded-md bg-muted/15">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                {project.media.liveUrl && (
                  <a href={project.media.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    <ExternalLink className="h-4 w-4" /> View live
                  </a>
                )}
                {project.media.video && (
                  <a href={project.media.video} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    <PlayCircle className="h-4 w-4" /> Watch demo
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FlagshipCaseStudies;
```

- [ ] **Step 2: Create `WebShowcaseCard.tsx`**

```tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, ExternalLink } from "lucide-react";
import { webShowcase } from "@/data/flagshipProjects";

const WebShowcaseCard: React.FC = () => {
  return (
    <Card className="border-border/50 bg-card/70 backdrop-blur-sm hover:border-accent/40 transition-all duration-500">
      <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-5">
        <div className="p-3 rounded-lg bg-accent/10 flex-shrink-0">
          <Palette className="h-6 w-6 text-accent" />
        </div>
        <div className="space-y-2 flex-grow">
          <h4 className="font-semibold text-lg">{webShowcase.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{webShowcase.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {webShowcase.stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent text-xs px-2 py-0.5">{tech}</Badge>
            ))}
          </div>
        </div>
        {webShowcase.media.liveUrl && (
          <a href={webShowcase.media.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline flex-shrink-0">
            <ExternalLink className="h-4 w-4" /> Visit site
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default WebShowcaseCard;
```

- [ ] **Step 3: Create `LegacyWorkflowStrip.tsx`**

```tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { legacyWorkflows } from "@/data/legacyWorkflows";

interface Props {
  onImageClick: (image: { src: string; alt: string; title: string }) => void;
}

const LegacyWorkflowStrip: React.FC<Props> = ({ onImageClick }) => {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-semibold">Workflow Automation Experience</h3>
        <p className="text-sm text-muted-foreground">
          Earlier builds across Zapier, Make, GoHighLevel, and n8n — the foundations behind the systems above
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {legacyWorkflows.map((wf) => (
          <Card
            key={wf.title}
            className="border-border/40 bg-card/60 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
            onClick={() => onImageClick({ src: wf.image, alt: wf.title, title: wf.title })}
          >
            <CardContent className="p-4 space-y-3">
              <div className="rounded-md overflow-hidden border border-border/40 bg-background/50">
                <img src={wf.image} alt={wf.title} loading="lazy" className="w-full h-28 object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold leading-tight">{wf.title}</h4>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-accent/30 text-accent flex-shrink-0">{wf.platform}</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{wf.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LegacyWorkflowStrip;
```

- [ ] **Step 4: Verify**

`npm run build` exits 0 (components compile; not yet rendered).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/portfolio/
git commit -m "feat(portfolio): flagship, web showcase, and legacy strip components"
```

---

### Task 5: Rewrite PortfolioSection to compose the new tiers

**Files:**
- Rewrite: `src/components/sections/PortfolioSection.tsx`
- Delete: `src/data/portfolioProjects.ts`

**Interfaces:**
- Consumes: the three Task 4 components; keeps `ImageZoomModal`, `SectionHeader`, `FloatingElements`, `SOCIAL_LINKS.caseStudies` (the super.site CTA block stays).

- [ ] **Step 1: Replace the entire contents of `PortfolioSection.tsx`**

```tsx
import React, { useState, useEffect, useRef } from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import FloatingElements from "@/components/shared/FloatingElements";
import SectionHeader from "@/components/shared/SectionHeader";
import { ImageZoomModal } from "@/components/ImageZoomModal";
import FlagshipCaseStudies from "@/components/sections/portfolio/FlagshipCaseStudies";
import WebShowcaseCard from "@/components/sections/portfolio/WebShowcaseCard";
import LegacyWorkflowStrip from "@/components/sections/portfolio/LegacyWorkflowStrip";
import { SOCIAL_LINKS } from "@/lib/constants";

const PortfolioSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string; title: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05, rootMargin: "-50px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-background/95 via-background to-background"
      aria-labelledby="portfolio-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.03)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <FloatingElements variant="default" />

      <div className="container mx-auto max-w-6xl relative z-10 space-y-14">
        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <SectionHeader
            badge={{ text: "Flagship Systems" }}
            title="Systems I Build"
            titleId="portfolio-heading"
            subtitle="Production AI systems I built and run — the same systems I deliver for clients"
          />
        </div>

        <div className={`space-y-14 transition-all duration-1000 ease-out delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <FlagshipCaseStudies />
          <WebShowcaseCard />
          <LegacyWorkflowStrip onImageClick={(img) => setZoomImage(img)} />

          <a
            href={SOCIAL_LINKS.caseStudies.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 rounded-xl bg-card/50 border border-border/30 hover:border-primary/50 hover:bg-card/80 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">View Full Case Studies</h4>
                  <p className="text-muted-foreground text-sm">Detailed breakdowns of automation projects and results</p>
                </div>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
            </div>
          </a>
        </div>
      </div>

      <ImageZoomModal
        isOpen={zoomImage !== null}
        onClose={() => setZoomImage(null)}
        images={zoomImage ? [zoomImage] : []}
        initialIndex={0}
      />
    </section>
  );
};

export default PortfolioSection;
```

- [ ] **Step 2: Delete the old data file**

```bash
git rm src/data/portfolioProjects.ts
```

Then run `npx tsc -p tsconfig.app.json --noEmit` (or `npm run build`) — if anything else still imports `portfolioProjects`, fix that import before proceeding (as of planning, `PortfolioSection.tsx` was the only consumer).

- [ ] **Step 3: Verify**

`npm run build` exits 0. Dev server: portfolio shows 3 flagship case-study cards (with placeholder media panels), Revv Dynamics card, 4-card legacy strip (screenshots render, click opens zoom modal), super.site CTA block still present.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/PortfolioSection.tsx
git commit -m "feat(portfolio): tiered portfolio - flagship case studies, web showcase, legacy strip"
```

---

### Task 6: How It Works section

**Files:**
- Create: `src/components/sections/HowItWorksSection.tsx`
- Modify: `src/pages/Index.tsx` (render between Services and Portfolio)

**Interfaces:**
- Produces: default-export `HowItWorksSection`, no props.

- [ ] **Step 1: Create `HowItWorksSection.tsx`**

```tsx
import React from "react";
import { Search, Wrench, LayoutDashboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/shared/SectionHeader";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATION_PRESETS } from "@/lib/constants";

const steps = [
  {
    icon: Search,
    title: "Map the bottleneck",
    description:
      "A free call where we find the manual work costing you the most — and whether automation is actually worth it for you.",
  },
  {
    icon: Wrench,
    title: "I build the system",
    description:
      "You get test versions and plain-English updates as it comes together. No surprises at handoff.",
  },
  {
    icon: LayoutDashboard,
    title: "Watch it run",
    description:
      "Everything lives in a dashboard you can see into — live status, history, and guides. Not a black box.",
  },
];

const HowItWorksSection: React.FC = () => {
  const headerAnimation = useScrollAnimation(ANIMATION_PRESETS.default);

  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto max-w-5xl relative z-10">
        <div ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}>
          <SectionHeader
            badge={{ text: "How It Works" }}
            title="Three Steps, No Black Boxes"
            titleId="how-it-works-title"
            subtitle="From first call to a system you can watch working"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <Card key={step.title} className="border-border/50 bg-card/70 backdrop-blur-sm hover:border-primary/40 hover:-translate-y-1 transition-all duration-500">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-9 h-9 bg-primary/15 rounded-full flex items-center justify-center text-primary font-bold">{i + 1}</div>
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
```

- [ ] **Step 2: Wire into `Index.tsx`** — add `import HowItWorksSection from "@/components/sections/HowItWorksSection";` and render `<HowItWorksSection />` between `<ServicesSection />` and `<PortfolioSection />`.

- [ ] **Step 3: Verify** — `npm run build` exits 0; dev server shows the 3-step strip between services and portfolio.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/HowItWorksSection.tsx src/pages/Index.tsx
git commit -m "feat(home): three-step how-it-works section"
```

---

### Task 7: Homepage testimonials section (Lovable Cloud only — hidden while table is empty)

**Files:**
- Create: `src/components/sections/TestimonialsSection.tsx`
- Modify: `src/pages/Index.tsx` (render between Portfolio and Contact)

**Interfaces:**
- Consumes: `supabase` from `@/integrations/supabase/client`; `Testimonial` type from `@/data/testimonials` (type only — the static entries are NOT rendered; they are unverified). Query pattern from `src/pages/Testimonials.tsx:110-129` (`is_visible` filter, `display_order` sort).
- **Behavior:** while the `testimonials` table has no visible rows, the component returns `null` — the section is invisible. When Reon adds real testimonials via the Admin page, it appears automatically.

- [ ] **Step 1: Create `TestimonialsSection.tsx`**

```tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/shared/SectionHeader";
import { supabase } from "@/integrations/supabase/client";
import { Testimonial } from "@/data/testimonials";

const TestimonialsSection: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("testimonials")
          .select("*")
          .eq("is_visible", true)
          .order("display_order");
        if (!error && data?.length) setItems(data);
      } catch {
        // section stays hidden
      }
    };
    fetchTestimonials();
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeader
          badge={{ text: "Client Words" }}
          title="What Clients Say"
          titleId="testimonials-title"
          subtitle="Feedback from automation and web builds"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((t) => (
            <Card key={t.name} className="border-border/50 bg-card/70 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/testimonials" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Read all testimonials <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
```

Note: DB rows use `text`/`name`/`role`/`company`/`rating` columns compatible with the static `Testimonial` shape (same assumption the existing `/testimonials` page makes; it renders both sources interchangeably).

- [ ] **Step 2: Wire into `Index.tsx`** between `<PortfolioSection />` and the FAQ section (Task 8 adds FAQ; if executing in order, place it directly before `<ContactSection />` for now).

- [ ] **Step 3: Verify** — dev server: the testimonials section renders NOTHING (DB table is empty — correct behavior). Confirm no layout gap between Portfolio and the next section. To prove the render path works, temporarily hardcode `setItems([{ name: "T", role: "R", company: "C", text: "X", rating: 5 }])`, confirm cards render, then revert before committing.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/TestimonialsSection.tsx src/pages/Index.tsx
git commit -m "feat(home): testimonials section fed by Lovable Cloud, hidden until real entries exist"
```

---

### Task 8: FAQ rewrite + wire into homepage

**Files:**
- Modify: `src/components/sections/FAQSection.tsx:10-117` (replace `faqData`)
- Modify: `src/pages/Index.tsx` (render between Testimonials and Contact)

- [ ] **Step 1: Replace `faqData` in `FAQSection.tsx` (keep the component body, imports, and JSX below line 117 unchanged; add `DollarSign` and `ShieldCheck` to the lucide import, remove now-unused icons)**

```tsx
import { HelpCircle, Timer, DollarSign, ShieldCheck, Globe, Wrench, CheckCircle } from "lucide-react";

const faqData = [
  {
    id: "cost",
    icon: DollarSign,
    question: "What does an automation project cost?",
    answer: (
      <div className="pl-11 space-y-3">
        <p>It depends on scope, and I'll always tell you before we start:</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>Single workflows</strong> (n8n, GHL, Zapier) — small fixed-price builds</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>Full AI systems</strong> (dashboard + automations) — project-based, scoped together</span>
          </div>
        </div>
        <p className="text-sm bg-primary/5 p-3 rounded-lg border border-primary/20">
          The discovery call is free and ends with a fixed quote — no commitment until you see the number.
        </p>
      </div>
    ),
  },
  {
    id: "timing",
    icon: Timer,
    question: "How long does a build take?",
    answer: (
      <div className="pl-11 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>Single workflows:</strong> 1–3 days</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span><strong>Full AI systems:</strong> 1–3 weeks depending on scope</span>
          </div>
        </div>
        <p className="text-sm bg-muted/20 p-3 rounded-lg">
          You get test versions and updates throughout — never a silent gap and then a big reveal.
        </p>
      </div>
    ),
  },
  {
    id: "breaks",
    icon: ShieldCheck,
    question: "What happens if something breaks after handoff?",
    answer: (
      <div className="pl-11 space-y-3">
        <p>
          Every system I ship logs its runs, so failures are visible instead of silent — and for full systems,
          you can see every run's status yourself in your dashboard.
        </p>
        <p className="text-sm bg-muted/20 p-3 rounded-lg">
          I fix what I ship. Handoff includes a support window, and ongoing support is available if you want it.
        </p>
      </div>
    ),
  },
  {
    id: "nontechnical",
    icon: HelpCircle,
    question: "Do I need to understand the tech?",
    answer: (
      <div className="pl-11 space-y-3">
        <p>
          No. You describe the bottleneck in plain English; I handle the technical side. Full systems come with a
          dashboard and built-in guide pages, and handoff is a walkthrough — not a document dump.
        </p>
      </div>
    ),
  },
  {
    id: "tools",
    icon: Wrench,
    question: "Do I need paid plans for the tools involved?",
    answer: (
      <div className="pl-11 space-y-3">
        <p>
          Sometimes — high-volume workflows or premium integrations can need paid tiers. I audit your requirements
          first and recommend the cheapest setup that actually fits, before anything is built.
        </p>
      </div>
    ),
  },
  {
    id: "integrations",
    icon: Globe,
    question: "Can you work with the tools I already use?",
    answer: (
      <div className="pl-11 space-y-3">
        <p className="font-medium text-foreground">
          Almost certainly — anything with an API or webhook can be connected: Gmail, Sheets, CRMs, e-commerce
          platforms, and custom software included.
        </p>
      </div>
    ),
  },
];
```

- [ ] **Step 2: Wire `FAQSection` into `Index.tsx`** between `<TestimonialsSection />` and `<ContactSection />`. Final section order: Hero → Services → HowItWorks → Portfolio → Testimonials → FAQ → Contact.

- [ ] **Step 3: Verify** — `npm run lint` shows no unused-import errors in FAQSection; dev server: FAQ accordion renders 6 objection-killer questions.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/FAQSection.tsx src/pages/Index.tsx
git commit -m "feat(home): wire FAQ section with objection-focused questions"
```

---

### Task 9: index.html meta/OG/JSON-LD text refresh (keep OG image)

**Files:**
- Modify: `index.html:7-11` (title/description/keywords), `:26-27`, `:38-39` (OG/Twitter text), `:44-132` (JSON-LD)

- [ ] **Step 1: Update title/description/keywords (lines 7–9)**

```html
<title>Reon Martin — AI Automation Consultant | AI Systems, GoHighLevel & n8n</title>
<meta name="description" content="I build AI systems that run your support, invoicing, and onboarding — dashboards you can see into, not black boxes. Also fluent in GoHighLevel, n8n, Zapier & Make.">
<meta name="keywords" content="AI automation consultant, AI systems developer, RAG support automation, GoHighLevel automation, n8n consultant, Claude AI developer, business automation Philippines">
```

- [ ] **Step 2: Update OG/Twitter text (keep `og:image`, `twitter:image`, and image alt/width/height lines exactly as they are)**

`og:title` and `twitter:title`: `Reon Martin — AI Automation Consultant | AI Systems, GoHighLevel & n8n`
`og:description` and `twitter:description`: `I build AI systems that run your support, invoicing, and onboarding — dashboards you can see into, not black boxes.`

- [ ] **Step 3: Update JSON-LD** — in the `Person` block: `jobTitle` → `"AI Automation Consultant"`, `description` → `"AI automation consultant building custom AI systems (Claude AI, Next.js, Trigger.dev) plus GoHighLevel, n8n, Zapier and Make automations"`, `knowsAbout` → `["Custom AI Automation Systems", "Claude AI Development", "RAG / Retrieval-Augmented Generation", "GoHighLevel CRM & Funnels", "n8n Workflow Automation", "Business Process Automation"]`. In the `Service` block, replace the three `offers` with:

```json
{ "@type": "Offer", "name": "Custom AI Automation Systems", "description": "Complete AI systems: client dashboard plus background automations for support, invoicing, and onboarding" },
{ "@type": "Offer", "name": "GoHighLevel CRM & Marketing", "description": "CRM setup, converting funnels, AI agents, and SMS/email campaigns" },
{ "@type": "Offer", "name": "n8n Workflow Automation", "description": "Email sorting, spreadsheet sync, and app-to-app integrations" },
{ "@type": "Offer", "name": "AI Chatbots & Custom AI Agents", "description": "24/7 customer-facing chatbots and custom AI agents wired into existing tools" }
```

- [ ] **Step 4: Verify** — `npm run build` exits 0; view page source in dev: new title renders in the tab; OG image URL unchanged.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat(seo): reposition meta, OG text, and JSON-LD for AI-systems consulting (OG image kept)"
```

---

### Task 10 (fast-follow, optional): Animated support-triage decision flow

**Files:**
- Create: `src/components/sections/portfolio/TriageFlowDiagram.tsx`
- Modify: `src/components/sections/portfolio/FlagshipCaseStudies.tsx` (`MediaPanel`: render diagram for `id === "support-triage"` when no screenshot)

May ship after Tasks 1–9 are deployed. Uses only existing Tailwind animations (`animate-pulse`) — no new dependencies.

- [ ] **Step 1: Create `TriageFlowDiagram.tsx`**

```tsx
import React from "react";
import { Mail, BrainCircuit, Send, UserCheck } from "lucide-react";

const Node: React.FC<{ icon: React.ElementType; label: string; tone: "primary" | "accent" }> = ({ icon: Icon, label, tone }) => (
  <div className={`flex flex-col items-center gap-1.5 ${tone === "primary" ? "text-primary" : "text-accent"}`}>
    <div className={`p-2.5 rounded-xl border ${tone === "primary" ? "bg-primary/10 border-primary/30" : "bg-accent/10 border-accent/30"}`}>
      <Icon className="h-5 w-5" />
    </div>
    <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight max-w-[90px]">{label}</span>
  </div>
);

const Connector: React.FC<{ delay?: string }> = ({ delay }) => (
  <div className="flex items-center flex-shrink-0" aria-hidden>
    <div className="w-8 h-px bg-gradient-to-r from-primary/40 to-primary/10 relative">
      <span className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: delay }} />
    </div>
  </div>
);

const TriageFlowDiagram: React.FC = () => (
  <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 via-card/60 to-accent/5 p-5">
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <Node icon={Mail} label="Support email arrives" tone="primary" />
      <Connector />
      <Node icon={BrainCircuit} label="AI reads it against your docs" tone="primary" />
      <Connector delay="0.5s" />
      <div className="flex flex-col gap-3">
        <Node icon={Send} label="Confident → answer sent" tone="accent" />
        <Node icon={UserCheck} label="Uncertain → human + draft" tone="primary" />
      </div>
    </div>
  </div>
);

export default TriageFlowDiagram;
```

- [ ] **Step 2: Use it in `MediaPanel`** — in `FlagshipCaseStudies.tsx`, import it and change `MediaPanel` to:

```tsx
const MediaPanel: React.FC<{ project: FlagshipProject }> = ({ project }) => {
  if (project.media.screenshot) {
    return (
      <div className="rounded-lg overflow-hidden border border-border/50">
        <img src={project.media.screenshot} alt={project.title} className="w-full h-auto object-cover" loading="lazy" />
      </div>
    );
  }
  if (project.id === "support-triage") return <TriageFlowDiagram />;
  return (
    <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 min-h-[180px] flex flex-col items-center justify-center gap-3 p-6">
      <MonitorSmartphone className="h-10 w-10 text-primary/70" />
      <span className="text-sm text-muted-foreground text-center">Live production system — walkthrough on request</span>
    </div>
  );
};
```

- [ ] **Step 3: Verify** — dev server: support-triage card shows the decision-flow diagram with pulsing connectors; other flagship cards keep the placeholder panel.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/portfolio/TriageFlowDiagram.tsx src/components/sections/portfolio/FlagshipCaseStudies.tsx
git commit -m "feat(portfolio): animated support-triage decision flow diagram"
```

---

### Task 11: Final verification pass

- [ ] **Step 1:** `npm run build` — exit 0. `npm run lint` — no new errors vs. pre-change baseline.
- [ ] **Step 2:** `npm run dev` manual checklist:
  - Homepage section order: Hero → Services → How It Works → Portfolio → (Testimonials: hidden while DB empty) → FAQ → Contact
  - Hero: one primary CTA scrolls to contact; "See the systems" scrolls to portfolio
  - Services: 4 cards (Custom AI Systems / GoHighLevel / n8n / Chatbots & Agents)
  - Portfolio: 3 flagship cards, Revv Dynamics card, legacy strip with working image zoom, super.site CTA intact
  - `/admin` and `/drafts` routes still load; hero availability badge still shows live status from Lovable Cloud
  - `/testimonials` page unchanged and working
  - Browser tab shows new title
- [ ] **Step 3:** Report results to Reon with anything that failed.

---

## Self-Review Notes

- **Spec coverage:** portfolio tiers (Tasks 3–5), data model (Task 3), services (Task 2), hero (Task 1), Lovable Cloud kept + testimonials fallback (Task 7, no backend changes anywhere), conversion core (Tasks 6–8), trust polish (Task 9 — OG image kept, super.site link kept in Task 5, timezone reframe in Task 1), flow animation fast-follow (Task 10). ✔
- **Resolved by Reon:** static testimonials are unverified → homepage section is hidden until real testimonials are added via the Admin page (Task 7 renders `null` on empty DB). The `/testimonials` page keeps its existing behavior for now.
- Media assets (screenshots/videos/live URLs) arrive later from Reon: populate the `media` objects in `src/data/flagshipProjects.ts` — no component changes needed.
