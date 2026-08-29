export interface ProcessStep {
  label: string;
  caption: string;
  images?: string[];
  optional?: boolean;
}

export interface FlagshipMedia {
  screenshots?: string[];
  process?: ProcessStep[];
  video?: string;
  liveUrl?: string;
  liveLabel?: string;
  caseStudyNotes?: string;
  /** Link to a full external case-study writeup, when one exists. */
  caseStudyUrl?: string;
}

export interface FlagshipProject {
  id: string;
  title: string;
  badge: string;
  bottleneck: string;
  system: string;
  clientGets: string[];
  roi?: string;
  stack: string[];
  media: FlagshipMedia;
}

export interface KpiItem {
  label: string;
  value: string;
  detail: string;
  primary?: boolean;
}

export interface RoiSimulation {
  /** Shown as the block's badge, e.g. "Projected — based on 30 leads/month". Name the real input driving the number, not a hedge. */
  label: string;
  headline: string;
  assumptions: string[];
  categories: { title: string; detail: string }[];
  sensitivity: {
    columns: [string, string, string];
    rows: [string, string, string][];
  };
}

export type FlowPlatform = "ghl" | "n8n";
export type FlowKind = "trigger" | "action" | "condition" | "notification" | "email" | "tag" | "pipeline" | "wait";

export interface FlowKeyInfo {
  label: string;
  /** A string renders as one line; an array renders as a clean line-by-line list. */
  value: string | string[];
}

export interface FlowBranch {
  /** Condition box text, e.g. `primaryGoal is "Energy"`. */
  condition: string;
  /** "AND" for a real filter branch, "NONE" for the catch-all else path — matches GHL's own branch badge. */
  matchType: "AND" | "NONE";
  /** Downstream chip label, e.g. "Energy Tag" or "No tag applied". */
  outcome: string;
  /** Whether the outcome chip renders as an actual tag-apply node vs a plain end pill. */
  appliesTag: boolean;
}

export interface FlowStep {
  kind: FlowKind;
  /** Human step name, e.g. "Inbound Webhook received". */
  title: string;
  /** Platform node label, shown as a mono chip, e.g. "Create/Update Contact". */
  node: string;
  keyInfo: FlowKeyInfo[];
  /** One line: what really happens at this step. */
  detail: string;
  /** Representative execution-log line (rendered monospace). */
  log: string;
  /** Optional — omit if none; a step with no screenshot still reads as complete via keyInfo + log. */
  screenshot?: { src: string; alt: string };
  /** Only on a trunk-ending condition step — fans out into the real parallel branches instead of a single "next" node. */
  branches?: FlowBranch[];
}

export interface ProjectFlow {
  id: string;
  label: string;
  platform: FlowPlatform;
  steps: FlowStep[];
  /** The real, unedited screenshot of this workflow inside the platform's own builder — proof the diagram isn't invented. Reusable across any future automation project. */
  builderScreenshot?: { src: string; alt: string };
}

export interface WebShowcaseProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  media: FlagshipMedia;
  /** Real backend workflow(s) behind the project, walked node by node. Omit if none. */
  flows?: ProjectFlow[];
  /** Featured builds surface extra depth (challenge/solution, KPIs, ROI) inside the catalog interface. */
  featured?: boolean;
  badge?: string;
  /** One-line real outcome shown on the compact card face, e.g. a KPI restated in plain words. */
  highlight?: string;
  bottleneck?: string;
  system?: string;
  clientGets?: string[];
  kpis?: KpiItem[];
  roi?: RoiSimulation;
}

export const flagshipProjects: FlagshipProject[] = [
  {
    id: "support-triage",
    title: "AI Support Ticket Triage",
    badge: "AI + RAG",
    bottleneck:
      "Support inboxes eat hours — the same questions answered again and again, while the risky emails (refunds, cancellations, upset customers) sit in the queue.",
    system:
      "The Support Inbox automation watches your inbox, reads each email against your own uploaded docs, and replies with answers grounded in what it finds — never invented policy. Anything uncertain, upset-sounding, or high-stakes gets escalated to a human with a ready-to-edit draft.",
    clientGets: [
      "Routine questions answered automatically, from your own docs",
      "Refunds, billing, and upset customers always reach a human",
      "Every escalation arrives with an AI-drafted reply ready to edit",
      "Every ticket and decision logged in your dashboard",
    ],
    roi: "No helpdesk subscription or extra support hire needed just to keep up with routine tickets — the routine volume gets handled inside a system you already own, freeing your team for the tickets that actually need a human.",
    stack: ["Claude Code", "RAG / Vector Search", "Trigger.dev", "Gmail (Composio)", "MongoDB"],
    media: {
      process: [
        {
          label: "Ticket received",
          caption: "A new support email lands in the inbox.",
          images: ["/projects/support-triage/step-1-received.png"],
        },
        {
          label: "Checked against your docs",
          caption: "The ticket is matched against the Support Inbox automation's knowledge base — never invented policy.",
          images: [
            "/projects/support-triage/step-2-knowledge-base-add.png",
            "/projects/support-triage/step-2-knowledge-base.png",
          ],
        },
        {
          label: "Match confidence",
          caption: "Behind the scenes: how confidently the ticket matched your knowledge base.",
          optional: true,
        },
        {
          label: "Auto-answered",
          caption: "Confident matches get answered automatically, grounded in your docs.",
          images: ["/projects/support-triage/step-4-auto-answered.png"],
        },
        {
          label: "Escalated to a human",
          caption: "Uncertain, upset, or high-stakes tickets go to a human with an AI-drafted reply ready to edit.",
          images: ["/projects/support-triage/step-5-escalated.png"],
        },
        {
          label: "Resolved & logged",
          caption: "Even a High-confidence match can still be flagged by category — Legal/Compliance here — and tracked through to a human resolving it. Nothing happens off the books.",
          images: ["/projects/support-triage/step-6-resolved.png"],
        },
      ],
      video: "/projects/support-triage/support-triage-demo-blurred.mp4",
      caseStudyNotes:
        "Every reply is graded on confidence before it goes out: a high-confidence match from the Support Inbox automation gets sent automatically, and clicking \"Why this reply\" on any auto-answered ticket shows exactly what it matched — the source document, the similarity score, and every citation it considered. Anything below that confidence bar, or flagged by category (refunds, billing, legal, cancellations), skips straight to a human with an AI-drafted reply ready to edit — so nothing risky ever goes out on autopilot.",
      liveUrl: "https://aisystem-frontend.vercel.app/",
      liveLabel: "Open in dashboard sidebar",
    },
  },
  {
    id: "ops-dashboard",
    title: "AI Operations Dashboard",
    badge: "Flagship System",
    bottleneck:
      "Most automation deliverables are a black box you can't see, monitor, or trust — and \"status\" often just means someone flipped a switch, not that it actually works.",
    system:
      "A custom web dashboard your business logs into: every automation visible with live status, run history, and built-in guides. Status here isn't cosmetic — an automation only earns \"Active\" after a real successful run in production, and pausing one is enforced on the backend, not just hidden in the UI.",
    clientGets: [
      "One login to run and monitor every automation you have",
      "Confirmed, not just claimed — \"Active\" only appears after a real production run succeeds",
      "Pause instantly, enforced server-side — not just a hidden button",
      "Built-in guide pages so your team can self-serve",
    ],
    roi: "No dev retainer needed just to confirm things are running — status is self-verifying, so oversight that used to cost time (or a contractor) comes built into the same login.",
    stack: ["Claude Code", "Next.js", "Trigger.dev", "MongoDB", "NextAuth", "Composio"],
    media: {
      screenshots: [
        "/projects/dashboard/dashboard-dark.png",
        "/projects/dashboard/dashboard-automations-list.png",
        "/projects/dashboard/dashboard-settings.png",
      ],
      liveUrl: "https://aisystem-frontend.vercel.app/",
      caseStudyNotes:
        "Every automation moves through a lifecycle: Draft → Active → Paused. A new automation stays in Draft until it completes one real, successful run in production — there's no button to force it live early, it has to prove itself. Pausing is enforced twice: the form disappears from the dashboard, and the backend itself refuses to execute a paused automation even if a request bypasses the UI. The status you see is status you can actually rely on.",
    },
  },
  {
    id: "invoice-automation",
    title: "Invoice Automation",
    badge: "Documents + Email",
    bottleneck:
      "Most businesses either build invoices by hand, copy-pasting into a PDF every time, or hand it off to a third-party tool like Typeform or Google Forms — locked into someone else's template, data, and monthly fee.",
    system:
      "Fill one form and it generates a branded PDF invoice, drafts the email, and files a copy to Drive — automatically, using your own branding, bank details, and terms.",
    clientGets: [
      "Branded PDF invoices from a single form, no design work per invoice",
      "Gmail draft ready to send — no copy-paste",
      "Every invoice auto-filed to Drive for your records",
      "Your branding, bank details, tax rate & currency — set once, applied to every invoice",
    ],
    roi: "No monthly invoicing subscription to budget for — this is a one-time build you own outright, so there's no recurring SaaS fee eating into margins invoice after invoice.",
    stack: ["Claude Code", "Trigger.dev", "PDF Generation", "Gmail + Drive (Composio)", "Next.js"],
    media: {
      process: [
        {
          label: "Form filled",
          caption: "Client, line items, and terms entered once.",
          images: ["/projects/invoice/step-1-form-filled.png"],
        },
        {
          label: "Sent",
          caption: "The invoice is sent — or queued for delivery.",
          images: ["/projects/invoice/step-2-sent.png"],
        },
        {
          label: "Trigger run",
          caption: "Behind the scenes: the background job running the pipeline.",
          optional: true,
        },
        {
          label: "Email + PDF",
          caption: "The client receives the branded PDF invoice by email.",
          images: ["/projects/invoice/step-4-email.png", "/projects/invoice/step-4-pdf.png"],
        },
        {
          label: "Filed to Drive",
          caption: "A copy is automatically saved to Google Drive for your records.",
          images: ["/projects/invoice/step-5-drive.png"],
        },
      ],
      video: "/projects/invoice/invoice-demo-blurred.mp4",
      caseStudyNotes:
        "Every field is configurable to your business: company name, logo, bank details, default tax rate, currency, and payment terms are set once as environment variables, then reused automatically on every invoice you send. Swap in your own branding and it's ready to bill real clients the same day.",
      liveUrl: "https://invoice-automation-pi.vercel.app/",
    },
  },
  {
    id: "client-onboarding",
    title: "Client Onboarding Automation",
    badge: "Sequenced Automation",
    bottleneck:
      "The moment right after a client pays is the easiest one to lose their trust — miss the survey, forget the booking link, and their first message back is \"so what's next?\" instead of confidence they made the right call.",
    system:
      "One form fires the whole sequence: a personalized contract PDF first, then the onboarding survey, then the booking link to grab a kickoff call — each step only sends after the last one succeeds, so a new client never gets a broken half-sequence or has to chase you for what's missing.",
    clientGets: [
      "New clients get contract → survey → booking call, same day, hands-free",
      "Nothing forgotten or sent out of order, even on your busiest day",
      "Fail-safe sequencing — a broken step stops the rest, never a half-finished welcome",
      "One trigger runs the entire flow, whether you land one client a month or ten",
    ],
    roi: "No more manually tracking who got what after closing a deal — every new client gets the same fast, professional welcome that builds trust right when it matters most, instead of leaving them wondering if you forgot about them.",
    stack: ["Claude Code", "Trigger.dev", "PDF Generation", "Gmail (Composio)", "Next.js"],
    media: {
      process: [
        {
          label: "Form filled",
          caption: "Client, business, survey link, and Calendly link entered once.",
          images: ["/projects/client-onboarding/step-1-form-filled.png"],
        },
        {
          label: "Sequence started",
          caption: "One click queues the whole sequence — contract, survey, and booking link.",
          images: ["/projects/client-onboarding/step-2-started.png"],
        },
        {
          label: "Contract sent",
          caption: "The client gets a personalized service agreement by email, PDF attached.",
          images: [
            "/projects/client-onboarding/step-3-contract-email.png",
            "/projects/client-onboarding/step-3-contract-pdf.png",
          ],
        },
        {
          label: "Survey sent",
          caption: "Next, a short onboarding survey goes out to gather what's needed before kickoff.",
          images: ["/projects/client-onboarding/step-4-survey-sent.png"],
        },
        {
          label: "Booking sent",
          caption: "Last, the Calendly link goes out so the client can book the kickoff call.",
          images: ["/projects/client-onboarding/step-5-booking-sent.png"],
        },
        {
          label: "Delivered in order",
          caption: "All three land in the inbox in sequence — proof nothing was missed or sent out of order.",
          images: ["/projects/client-onboarding/step-6-delivered.png"],
        },
      ],
    },
  },
];

export const webShowcaseProjects: WebShowcaseProject[] = [
  {
    id: "powertag",
    title: "powerTAG, Site + Live Lead Pipeline",
    tagline: "23 pages live, every lead answered and followed up on its own",
    description:
      "This compliance firm was launching a brand-new energy service with no way to catch, route, or follow up on the leads it would bring in. Every enquiry would've just sat in an inbox. So we built a real sales automation instead: instant replies, automatic tagging, and a 2-day follow-up guarantee, all running behind a 23-page site.",
    featured: true,
    badge: "Featured Case Study",
    highlight: "Every lead gets answered in seconds and followed up within 2 days. The automation remembers, so nobody has to.",
    bottleneck:
      "This compliance firm was launching a brand-new energy-services offering with no system behind it. No way to catch a lead the moment it came in, nothing routing it anywhere, nobody notified, no safety net if it went quiet. On top of that, 31 pages of finished copy had nowhere to go.",
    system:
      "A real sales automation now runs behind every enquiry: an instant reply to the lead, an instant alert to sales, automatic tagging by what they're interested in, a 5-stage deal tracker, and a safety net that catches any lead gone quiet for more than 2 business days. Anyone not ready yet gets a 3-email nurture instead. All of it sits behind 23 pages built around the client's own copy, so future edits are just a content change, not a redevelopment project.",
    clientGets: [
      "A contact form that runs the real sales pipeline, tested end-to-end in production, not a mockup.",
      "Every lead gets tagged, routed, and tracked through a 5-stage pipeline on its own. Nobody has to remember to follow up.",
      "23 SEO-ready pages feeding the pipeline, easy to edit later without a rebuild.",
      "A live \"building readout\" widget: custom SVG instruments showing presence, environment, and energy, not stock icons.",
    ],
    stack: [
      "Claude Code",
      "Next.js 16 · SSG",
      "React 19",
      "Tailwind v4",
      "TypeScript",
      "Framer Motion",
      "React Hook Form + Zod",
      "GoHighLevel",
      "Vercel",
      "Analytics + Speed Insights",
      "Content-as-data",
    ],
    kpis: [
      {
        label: "First-response time to a new lead",
        value: "Seconds",
        detail:
          "Target was under 5 minutes. The instant auto-reply and sales notification get there in seconds instead, and speed to first contact is one of the biggest levers in whether a lead converts at all.",
        primary: true,
      },
      {
        label: "Follow-up compliance rate",
        value: "~100%",
        detail:
          "Share of new leads contacted within 2 business days. The 2-day stalled-lead rule pushes this to about 100%, versus a leaky manual process.",
      },
    ],
    roi: {
      label: "Projected, based on 30 leads/month",
      headline:
        "Pays for itself in year one, then returns roughly 3.5x every year after. That's from leads that stop slipping through the cracks, not from counting minutes saved.",
      assumptions: [
        "30 leads / month",
        "~9 min manual handling per lead",
        "$45/hr AU loaded rate",
        "GoHighLevel $97/mo",
        "One-time automation build ~$1,500",
        "Recovered-lead value ~$3,000 (conservative B2B contract)",
      ],
      categories: [
        {
          title: "Time saved",
          detail:
            "Cuts about 9 minutes of manual handling off every lead, roughly 54 hours back a year, worth about $2,430 in labour. Breaks even on time alone by year one, clearly profitable from year two.",
        },
        {
          title: "Cost avoided",
          detail:
            "No admin hire needed just to process leads, no separate email tool since the nurture runs inside GHL, no extra CRM to license. Just GHL at about $97 a month and the one-time build. The site itself costs nothing extra to host.",
        },
        {
          title: "Skill & knowledge growth",
          detail:
            "The team moves from an inbox-and-spreadsheet routine to running a real automated pipeline. Leads tag, route, and escalate themselves. Editing the 23 pages that feed it is just a bonus.",
        },
        {
          title: "Quality & stress reduction",
          detail:
            "Mis-keyed entries, dropped leads, and unanswered weekend inquiries all drop to basically zero. Every lead gets captured, tagged, and followed up on its own. Nobody has to remember to do it.",
        },
      ],
      sensitivity: {
        columns: ["Leads rescued / yr", "Year-1 ROI", "Steady-state ROI"],
        rows: [
          ["0 (time only)", "−9%", "+109%"],
          ["1", "+104%", "+366%"],
          ["2", "+216%", "+624%"],
          ["4", "+442%", "+1,000%+"],
        ],
      },
    },
    flows: [
      {
        id: "lead-pipeline",
        label: "Lead pipeline",
        platform: "ghl",
        builderScreenshot: {
          src: "/projects/powertag/flow/flow-build-lead-pipeline.png",
          alt: "The real 'New assessment request' workflow open in the GoHighLevel builder, unedited",
        },
        steps: [
          {
            kind: "trigger",
            title: "Inbound Webhook received",
            node: "Inbound Webhook",
            keyInfo: [
              { label: "Method", value: "POST" },
              { label: "Filters", value: "None applied, every submission enrolls" },
              { label: "Endpoint", value: "https://services.leadconnectorhq.com/hooks/•••••/webhook-trigger/•••" },
              { label: "Payload", value: "{ name, email, phone, company, role, sites, industry, spend, services, message, fileName }" },
            ],
            detail: "The moment someone submits the assessment form on the live site, it posts straight into this webhook. No queue, no polling, it starts in the same second.",
            log: "200 OK · payload accepted · fields parsed",
            screenshot: { src: "/projects/powertag/flow/flow-form-submitted.jpg", alt: "The assessment form on the live site, right after a real submission" },
          },
          {
            kind: "action",
            title: "Create / Update Contact",
            node: "Create/Update Contact",
            keyInfo: [
              { label: "Built-in fields", value: "Full Name · Email · Phone" },
              {
                label: "Custom fields",
                value: ["Company", "Role", "Number of Sites", "Primary Industry", "Annual Electricity Spend", "Attached File Name"],
              },
              { label: "Exception", value: "Compliance Services maps straight from the webhook, not the contact record" },
              { label: "Fix applied", value: "Business Name field also set from Company, since GHL leaves it blank otherwise" },
            ],
            detail: "Upserts the lead as a contact. One real bug caught in testing: GHL's contact list has a \"Business name\" column that's separate from the custom Company field. Left unmapped, every new lead showed up blank. Mapping it to the same value fixed it.",
            log: "contact upserted · business name set · 6 custom fields written",
            screenshot: { src: "/projects/powertag/flow/flow-contact-created.jpg", alt: "The resulting contact row in GoHighLevel, business name and tags populated" },
          },
          {
            kind: "pipeline",
            title: "Create Opportunity",
            node: "Create Opportunity",
            keyInfo: [
              { label: "Pipeline", value: "Assessment Pipeline" },
              { label: "Stages", value: "New Lead → Contacted → Assessment Scheduled → Proposal Sent → Won" },
            ],
            detail: "Drops a deal card onto the pipeline in the New Lead stage, right after the contact exists. Stages 2 to 5 are worked by hand, only the entry is automated.",
            log: "opportunity created · stage=New Lead",
            screenshot: { src: "/projects/powertag/flow/flow-opportunity-created.jpg", alt: "New opportunity card sitting in the New Lead stage of the Assessment Pipeline" },
          },
          {
            kind: "notification",
            title: "Notify Sales",
            node: "Notify Sales – New Assessment Request",
            keyInfo: [
              { label: "Type", value: "Internal email" },
              { label: "Contains", value: "Every field from the form, plain text, ready to act on" },
              { label: "From", value: "Martin" },
            ],
            detail: "Fires an internal alert the moment a lead lands so sales never has to watch an inbox for one.",
            log: "internal email sent → sales team",
            screenshot: { src: "/projects/powertag/flow/flow-sales-notification.jpg", alt: "Internal notification email received by the sales team with the lead's full submission" },
          },
          {
            kind: "email",
            title: "Auto-Reply to Lead",
            node: "Auto-Reply Email follow up",
            keyInfo: [
              { label: "To", value: "the lead" },
              { label: "Sign-off", value: "The powerTAG Team" },
            ],
            detail: "An instant acknowledgement to the lead. It's the response-time win that drives conversion.",
            log: "auto-reply sent → lead · t+2s",
            screenshot: { src: "/projects/powertag/flow/flow-auto-reply.jpg", alt: "The real auto-reply email, received in the lead's inbox seconds after submitting" },
          },
          {
            kind: "condition",
            title: "Segment by goal",
            node: "Condition",
            keyInfo: [{ label: "Reads", value: "primaryGoal" }],
            detail: "Splits the lead into one of four paths by what they actually asked for, so the right tag gets applied downstream instead of one generic label.",
            log: "branch=Energy → Energy Tag",
            branches: [
              { condition: "primaryGoal is \"Energy\"", matchType: "AND", outcome: "Energy Tag", appliesTag: true },
              { condition: "primaryGoal is \"Compliance\"", matchType: "AND", outcome: "Lead-Compliance Tag", appliesTag: true },
              { condition: "primaryGoal is \"Both\"", matchType: "AND", outcome: "Energy and compliance Tag", appliesTag: true },
              { condition: "When none of the conditions are met", matchType: "NONE", outcome: "No tag applied", appliesTag: false },
            ],
          },
        ],
      },
      {
        id: "assessment-follow-up",
        label: "Assessment pipeline follow up",
        platform: "ghl",
        builderScreenshot: {
          src: "/projects/powertag/flow/flow-build-follow-up.png",
          alt: "The real 'Assessment Pipeline Follow-up' workflow open in the GoHighLevel builder, unedited",
        },
        steps: [
          {
            kind: "trigger",
            title: "Opportunity Created",
            node: "Opportunity Created",
            keyInfo: [{ label: "Fires when", value: "any new opportunity lands in the Assessment Pipeline" }],
            detail: "A separate workflow that watches the pipeline itself, not the form, so a lead can't fall through the cracks no matter how it entered.",
            log: "workflow enrolled · opportunity=New Lead",
            screenshot: { src: "/projects/powertag/flow/flow-opportunity-created.jpg", alt: "The opportunity card in the Assessment Pipeline that fires this workflow" },
          },
          {
            kind: "wait",
            title: "Wait",
            node: "Wait (Default Path)",
            keyInfo: [{ label: "Duration", value: "2 business days" }],
            detail: "Long enough for sales to actually work the lead, short enough that a stalled one doesn't go cold.",
            log: "waiting · 2 business days",
          },
          {
            kind: "condition",
            title: "Still untouched?",
            node: "Condition",
            keyInfo: [
              { label: "Checks", value: "Pipeline stage is still [Assessment Pipeline] – New Lead" },
              { label: "Branches", value: "Still new Lead · None" },
            ],
            detail: "If the deal moved forward, the follow-up never fires. This only catches the ones sitting untouched.",
            log: "condition evaluated · branch=Still new Lead",
          },
          {
            kind: "email",
            title: "Email Follow Up",
            node: "Email Follow Up",
            keyInfo: [{ label: "To", value: "the lead" }],
            detail: "A low-pressure check-in goes out on its own, so the lead never has to wonder if they were forgotten.",
            log: "follow-up email sent → lead",
            screenshot: { src: "/projects/powertag/flow/flow-followup-email.jpg", alt: "The real 2-day follow-up email, received by a stalled lead's inbox" },
          },
        ],
      },
      {
        id: "newsletter",
        label: "Newsletter email campaign automation",
        platform: "ghl",
        builderScreenshot: {
          src: "/projects/powertag/flow/flow-build-newsletter.png",
          alt: "The real 'Email Campaign Automation' workflow open in the GoHighLevel builder, unedited",
        },
        steps: [
          {
            kind: "trigger",
            title: "Newsletter signup",
            node: "Inbound Webhook",
            keyInfo: [
              { label: "Method", value: "POST" },
              { label: "Payload", value: "{ email }" },
            ],
            detail: "Markets the wider Energy-as-a-Service offering to people who aren't ready to book an assessment yet. Someone enters their email on the site, and that's where staying in touch starts.",
            log: "200 OK · email captured",
            screenshot: { src: "/projects/powertag/flow/flow-newsletter-signup.jpg", alt: "The newsletter signup block on the live site, right after a real submission" },
          },
          {
            kind: "action",
            title: "Create Contact",
            node: "Create contact",
            keyInfo: [{ label: "Built-in fields", value: "Email" }],
            detail: "Upserts the subscriber as a contact before tagging, same as the lead pipeline. Every automation on this site works off a real GHL contact, never a mailing-list-only record.",
            log: "contact upserted",
          },
          {
            kind: "tag",
            title: "Add Newsletter tag",
            node: "Add Newsletter tag",
            keyInfo: [{ label: "Tag", value: "newsletter-subscriber" }],
            detail: "Tags the contact so the nurture sequence only ever targets real subscribers.",
            log: "tag applied · newsletter-subscriber",
          },
          {
            kind: "email",
            title: "First Nurture Email",
            node: "First Nurture Email",
            keyInfo: [{ label: "Sends", value: "Immediately after signup" }],
            detail: "Confirms they're on the list with a clear first call to action, while the signup is still top of mind.",
            log: "email 1/3 sent",
            screenshot: { src: "/projects/powertag/flow/flow-newsletter-first-nurture.png", alt: "The real first nurture email, received right after signup" },
          },
          {
            kind: "wait",
            title: "Wait",
            node: "Wait",
            keyInfo: [{ label: "Duration", value: "2 days" }],
            detail: "Holds before the next touch so the sequence never feels pushy.",
            log: "waited 2 days",
          },
          {
            kind: "email",
            title: "Second Nurture email",
            node: "Second Nurture email (after 2 Days)",
            keyInfo: [{ label: "Subject", value: "\"The real cost of a lapsed compliance program\"" }],
            detail: "Real drafted content, not filler. It makes the case for staying on top of compliance and links straight to the assessment for anyone ready to look closer.",
            log: "email 2/3 sent",
            screenshot: { src: "/projects/powertag/flow/flow-newsletter-second-nurture.jpg", alt: "The real second nurture email, received 2 days after signup" },
          },
          {
            kind: "wait",
            title: "Wait",
            node: "Wait",
            keyInfo: [{ label: "Duration", value: "~1 week" }],
            detail: "A longer pause before the final, softer nudge.",
            log: "waited ~1 week",
          },
          {
            kind: "email",
            title: "Soft CTA (Final nurture)",
            node: "Soft CTA (Final nurture)",
            keyInfo: [{ label: "Subject", value: "\"Worth five minutes?\"" }],
            detail: "A low-pressure last touch for anyone who missed the earlier emails or wasn't ready yet. No hard sell, just an easy way back in whenever the timing works.",
            log: "email 3/3 sent",
            screenshot: { src: "/projects/powertag/flow/flow-newsletter-soft-cta.jpg", alt: "The real final soft-CTA email, received about a week after the second nurture email" },
          },
        ],
      },
    ],
    media: {
      screenshots: [
        "/projects/powertag/powertag-home-01-hero.jpg",
        "/projects/powertag/powertag-energy-as-service-01-hero.jpg",
        "/projects/powertag/powertag-building-intelligence-01-hero.jpg",
        "/projects/powertag/powertag-smart-monitoring-02-features.jpg",
        "/projects/powertag/powertag-demand-response-01-hero.jpg",
        "/projects/powertag/powertag-compliance-02-services.jpg",
        "/projects/powertag/powertag-aged-care-01-hero.jpg",
        "/projects/powertag/powertag-automotive-dealership-01-hero.jpg",
      ],
      liveUrl: "https://powertag-three.vercel.app",
      caseStudyUrl: "https://fortunate-cat.super.site/project-1",
    },
  },
  {
    id: "kayumanggi",
    title: "Kayumanggi, Fine Dining in BGC",
    tagline: "Checks if there's actually room before it says yes",
    description:
      "A fine dining concept site for a BGC restaurant, built around a food tour through Manila, Tokyo, Paris, and Rome. The reservation form does real work behind the scenes. It checks actual seat availability before confirming a booking, and if the restaurant's full that night, the guest gets an email back with the real open times instead of just a flat no.",
    stack: ["Claude Code", "Next.js", "GSAP", "Airtable", "Brevo"],
    media: {
      screenshots: [
        "/projects/kayumanggi/kayumanggi-01-hero.png",
        "/projects/kayumanggi/kayumanggi-02-story.png",
        "/projects/kayumanggi/kayumanggi-03-voyage.png",
        "/projects/kayumanggi/kayumanggi-04-menu.png",
        "/projects/kayumanggi/kayumanggi-05-gallery.png",
        "/projects/kayumanggi/kayumanggi-06-reservation.png",
      ],
      liveUrl: "https://kayumaggi-restaurant-website.vercel.app",
    },
  },
  {
    id: "profix",
    title: "ProFix Home Services",
    tagline: "Give people a real price before they even call",
    description:
      "A plumbing site built around one problem: people don't want to wait on a callback just to hear a ballpark number. Fill out the job form and an AI gives a live price range right there, not a number pulled from a lookup table. Move forward with it and the job gets saved straight to a spreadsheet so it never gets lost in an inbox.",
    stack: ["Claude Code", "Next.js", "Composio"],
    media: {
      screenshots: [
        "/projects/profix/profix-01-hero.png",
        "/projects/profix/profix-02-services.png",
        "/projects/profix/profix-03-quote.png",
        "/projects/profix/profix-04-recentjobs.png",
        "/projects/profix/profix-05-reviews.png",
        "/projects/profix/profix-06-footer.png",
      ],
      liveUrl: "https://profix-delta.vercel.app",
    },
  },
  {
    id: "revv-dynamics",
    title: "Revv Dynamics, Performance Auto",
    tagline: "All the motion, none of the silence",
    description:
      "A performance-shop site that scrolls like a highlight reel from top to bottom. The contact form isn't just for show either. It emails the shop the second someone reaches out, and sends that person a quick, personal reply back too, so nobody's left wondering if it actually went through.",
    stack: ["Claude Code", "React", "Vite", "Tailwind", "GSAP", "Resend"],
    media: {
      screenshots: [
        "/projects/revv-dynamics/revv-01-hero.png",
        "/projects/revv-dynamics/revv-02-services.png",
        "/projects/revv-dynamics/revv-03-stats.png",
        "/projects/revv-dynamics/revv-04-process.png",
        "/projects/revv-dynamics/revv-05-inhouse.png",
        "/projects/revv-dynamics/revv-06-contact.png",
      ],
      liveUrl: "https://revv-dynamics.vercel.app/",
    },
  },
];
