// The single source of truth for the Services metric counts.
//
// A card's number is NOT hand-typed — it's the length of this list for that platform.
// So the number can never claim more than what's really listed here. When a real n8n
// or agent build ships, add ONE entry below and its card flips from "In Development"
// to a live, clickable number. No component changes needed.

export type AutomationPlatform = "ghl" | "n8n" | "agents";

export interface AutomationEntry {
  id: string;
  platform: AutomationPlatform;
  /** id of the webShowcaseProject this automation lives in — the card opens it. */
  projectId: string;
  oneLiner: string;
}

export const automationsRegistry: AutomationEntry[] = [
  {
    id: "ghl-lead-pipeline",
    platform: "ghl",
    projectId: "powertag",
    oneLiner: "Captures every web lead, routes it to sales, and starts follow-up on its own.",
  },
  {
    id: "ghl-assessment-follow-up",
    platform: "ghl",
    projectId: "powertag",
    oneLiner: "Chases assessment leads that go quiet for 2 business days, automatically.",
  },
  {
    id: "ghl-newsletter",
    platform: "ghl",
    projectId: "powertag",
    oneLiner: "A 3-email nurture that runs from a single newsletter signup.",
  },
];

/** How many real automations exist for a platform — this is the card's number. */
export const countByPlatform = (platform: AutomationPlatform): number =>
  automationsRegistry.filter((e) => e.platform === platform).length;

/** Which project a platform's card opens (the most recent entry's project), or null if none yet. */
export const targetProjectFor = (platform: AutomationPlatform): string | null => {
  const entries = automationsRegistry.filter((e) => e.platform === platform);
  return entries.length ? entries[entries.length - 1].projectId : null;
};
