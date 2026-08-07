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

export interface WebShowcaseProject {
  id: string;
  title: string;
  tagline: string;
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
      "The Support Inbox automation watches your inbox, reads each email against your own uploaded docs, and replies with answers grounded in what it finds — never invented policy. Anything uncertain, upset-sounding, or high-stakes gets escalated to a human with a ready-to-edit draft.",
    clientGets: [
      "Routine questions answered automatically, from your own docs",
      "Refunds, billing, and upset customers always reach a human",
      "Every escalation arrives with an AI-drafted reply ready to edit",
      "Every ticket and decision logged in your dashboard",
    ],
    roi: "No helpdesk subscription or extra support hire needed just to keep up with routine tickets — the routine volume gets handled inside a system you already own, freeing your team for the tickets that actually need a human.",
    stack: ["Claude AI", "RAG / Vector Search", "Trigger.dev", "Gmail (Composio)", "MongoDB"],
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
    stack: ["Next.js", "Trigger.dev", "MongoDB", "NextAuth", "Composio"],
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
    stack: ["Trigger.dev", "PDF Generation", "Gmail + Drive (Composio)", "Next.js"],
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
    stack: ["Trigger.dev", "PDF Generation", "Gmail (Composio)", "Next.js"],
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
    id: "kayumanggi",
    title: "Kayumanggi, Fine Dining in BGC",
    tagline: "Checks if there's actually room before it says yes",
    description:
      "A fine dining site for a fictional restaurant in BGC, built around a food tour through Manila, Tokyo, Paris, and Rome. The reservation form does real work behind the scenes. It checks actual seat availability before confirming a booking, and if the restaurant's full that night, the guest gets an email back with the real open times instead of just a flat no.",
    stack: ["Next.js", "GSAP", "Airtable", "Brevo"],
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
    stack: ["Next.js", "Claude Haiku", "Composio"],
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
    stack: ["React", "Vite", "Tailwind", "GSAP", "Resend"],
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
