import { GoHighLevelIcon, N8NIcon, ClaudeIcon, RobotIcon } from "@/components/PlatformIcons";
import type { AutomationPlatform } from "./automationsRegistry";

// A service's metric drives its card face.
// - "count": the number is the real count of `platform` automations in the registry.
//   0 → renders an "In Development" badge + `devNote`; >0 → renders the number and opens the build.
// - "foundation": no count — a badge marking the layer everything else runs on.
export type ServiceMetric =
  | { kind: "count"; platform: AutomationPlatform; unit: string; devNote: string }
  | { kind: "foundation"; badge: string };

export interface Service {
  icon: React.ComponentType<{ className?: string }>;
  // Icons with a baked-in square background (Claude, GHL) fill the tile edge-to-edge;
  // transparent glyphs (n8n, robot) stay centered at glyph size.
  iconFill?: boolean;
  title: string;
  description: string;
  tools: string[];
  metric: ServiceMetric;
}

export const services: Service[] = [
  {
    icon: ClaudeIcon,
    iconFill: true,
    title: "Claude | Code | Cowork",
    description:
      "Claude thinks, I build — direct, no account manager in between. A second brain, a personal assistant, an ops system for your whole business — built around whatever you actually need.",
    tools: ["Claude AI", "Next.js", "Trigger.dev", "Composio", "RAG / Vector Search"],
    metric: { kind: "foundation", badge: "Powers Everything" },
  },
  {
    icon: GoHighLevelIcon,
    iconFill: true,
    title: "GoHighLevel CRM",
    description:
      "Your whole sales side in one system — CRM, funnels, AI agents, and follow-ups that fire on their own so leads don't go cold.",
    tools: ["GoHighLevel", "Funnels", "SMS & Email Campaigns", "AI Agents"],
    metric: {
      kind: "count",
      platform: "ghl",
      unit: "GoHighLevel automations live",
      devNote: "",
    },
  },
  {
    icon: N8NIcon,
    title: "n8n Workflow Automation",
    description:
      "Connect the tools you already run — n8n doesn't care what the job is. Emails, sheets, alerts, entire workflows: whatever moves between your apps can run itself.",
    tools: ["n8n", "Gmail", "Google Sheets", "Webhooks & APIs"],
    metric: {
      kind: "count",
      platform: "n8n",
      unit: "n8n workflows live",
      devNote: "Building real n8n workflows now — this fills in the moment one ships.",
    },
  },
  {
    icon: RobotIcon,
    title: "AI Chatbots & Voice Agents",
    description:
      "Chatbots that answer and pre-qualify leads around the clock, now stretching into voice — agents that sound so human, most callers never clock they're talking to a bot.",
    tools: ["Claude AI", "n8n Agents", "GoHighLevel AI", "Voice AI"],
    metric: {
      kind: "count",
      platform: "agents",
      unit: "chat & voice agents live",
      devNote: "A voice agent is in the works in ElevenLabs — landing here once it's live.",
    },
  },
];
