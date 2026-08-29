// The single source of truth for the Services metric counts.
//
// A card's number is NOT hand-typed — it's the length of this list for that platform.
// So the number can never claim more than what's really listed here. When a real n8n
// or agent build ships, add ONE entry below and its card flips from "In Development"
// to a live, clickable number. No component changes needed.

export type AutomationPlatform = "claude-code" | "ghl" | "n8n" | "agents";

export interface AutomationEntry {
  id: string;
  platform: AutomationPlatform;
  /** id of the project this lives in — the card opens it. */
  projectId: string;
  /** Which data array (and which section) `projectId` resolves against. */
  source: "automation" | "website";
  /** Short, distinct tag — what kind of build this is, so a list of many doesn't blur together. */
  category: string;
  /** One real sentence on what made THIS build specifically powerful — never reused wording. */
  oneLiner: string;
}

export const automationsRegistry: AutomationEntry[] = [
  // Claude Code — every real project on this site, since every one is genuinely built with it.
  // Not the same claim as "runs live AI" (only support-triage and profix actually do that) —
  // this platform tracks the build tool, so it honestly covers all of them.
  {
    id: "claude-code-support-triage",
    platform: "claude-code",
    projectId: "support-triage",
    source: "automation",
    category: "RAG Support Automation",
    oneLiner: "Reads real docs and grounds every reply in them — never invents policy, escalates anything risky to a human.",
  },
  {
    id: "claude-code-ops-dashboard",
    platform: "claude-code",
    projectId: "ops-dashboard",
    source: "automation",
    category: "Live Automation Dashboard",
    oneLiner: "One login shows every automation's real status — nothing counts as Active until it's proven itself in production.",
  },
  {
    id: "claude-code-invoice-automation",
    platform: "claude-code",
    projectId: "invoice-automation",
    source: "automation",
    category: "Document & Email Automation",
    oneLiner: "Turns one form into a branded PDF invoice, a ready-to-send email, and a filed Drive copy, automatically.",
  },
  {
    id: "claude-code-client-onboarding",
    platform: "claude-code",
    projectId: "client-onboarding",
    source: "automation",
    category: "Sequenced Client Onboarding",
    oneLiner: "Fires contract, survey, and booking link in order the moment a client signs — never a broken half-sequence.",
  },
  {
    id: "claude-code-powertag",
    platform: "claude-code",
    projectId: "powertag",
    source: "website",
    category: "Sales Site + CRM Build",
    oneLiner: "A 23-page site whose every lead gets captured, routed, and followed up on its own.",
  },
  {
    id: "claude-code-kayumanggi",
    platform: "claude-code",
    projectId: "kayumanggi",
    source: "website",
    category: "Reservation System Build",
    oneLiner: "Checks real seat availability before confirming a booking — never a flat no with no alternative offered.",
  },
  {
    id: "claude-code-profix",
    platform: "claude-code",
    projectId: "profix",
    source: "website",
    category: "Instant AI Pricing",
    oneLiner: "Gives a live price estimate from a plain job description — no lookup table, no waiting on a callback.",
  },
  {
    id: "claude-code-revv-dynamics",
    platform: "claude-code",
    projectId: "revv-dynamics",
    source: "website",
    category: "Motion-First Site Build",
    oneLiner: "A scroll-driven showcase site whose contact form replies to both sides instantly, so nobody's left guessing.",
  },

  {
    id: "ghl-lead-pipeline",
    platform: "ghl",
    projectId: "powertag",
    source: "website",
    category: "Lead Capture & Routing",
    oneLiner: "Captures every web lead, routes it to sales, and starts follow-up on its own.",
  },
  {
    id: "ghl-assessment-follow-up",
    platform: "ghl",
    projectId: "powertag",
    source: "website",
    category: "Stalled-Lead Recovery",
    oneLiner: "Chases assessment leads that go quiet for 2 business days, automatically.",
  },
  {
    id: "ghl-newsletter",
    platform: "ghl",
    projectId: "powertag",
    source: "website",
    category: "Email Nurture",
    oneLiner: "A 3-email nurture that runs from a single newsletter signup.",
  },
];

/** How many real automations exist for a platform — this is the card's number. */
export const countByPlatform = (platform: AutomationPlatform): number =>
  automationsRegistry.filter((e) => e.platform === platform).length;

export interface PlatformProjectGroup {
  projectId: string;
  source: "automation" | "website";
  count: number;
  /** Category + oneLiner of this group's first entry — representative, not a merge, so it stays one clear sentence per project. */
  category: string;
  oneLiner: string;
}

/**
 * The distinct projects behind a platform's automations, each with its own count and its own
 * differentiator, in the order they first appear in the registry. A count card always opens a
 * picker over this list — never a single project directly — so adding a second project behind a
 * platform needs zero component changes: the picker just grows from one item to two.
 */
export const projectsForPlatform = (platform: AutomationPlatform): PlatformProjectGroup[] => {
  const order: string[] = [];
  const groups = new Map<string, PlatformProjectGroup>();
  for (const entry of automationsRegistry) {
    if (entry.platform !== platform) continue;
    const existing = groups.get(entry.projectId);
    if (!existing) {
      order.push(entry.projectId);
      groups.set(entry.projectId, {
        projectId: entry.projectId,
        source: entry.source,
        count: 1,
        category: entry.category,
        oneLiner: entry.oneLiner,
      });
    } else {
      existing.count += 1;
    }
  }
  return order.map((projectId) => groups.get(projectId)!);
};
