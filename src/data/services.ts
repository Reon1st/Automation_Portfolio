import { GoHighLevelIcon, N8NIcon, ClaudeIcon, RobotIcon } from "@/components/PlatformIcons";
import type { AutomationPlatform } from "./automationsRegistry";

// A service's metric drives its card face — the number is the real count of `platform`
// automations in the registry, never hand-typed. 0 → an "In Development" badge + `devNote`;
// >0 → the live number, which opens a picker over every distinct project behind it.
export interface ServiceMetric {
  kind: "count";
  platform: AutomationPlatform;
  unit: string;
  devNote: string;
}

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
      "Custom AI systems — a second brain and ops layer for your whole business.",
    tools: ["Claude Code", "Next.js", "Trigger.dev", "Composio", "RAG / Vector Search"],
    metric: {
      kind: "count",
      platform: "claude-code",
      unit: "built with Claude Code",
      devNote: "",
    },
  },
  {
    icon: GoHighLevelIcon,
    iconFill: true,
    title: "GoHighLevel CRM",
    description:
      "Captures, routes, and chases every lead automatically — your whole sales side in one system.",
    tools: ["Funnels", "Pipelines", "SMS & Email", "AI Agents"],
    metric: {
      kind: "count",
      platform: "ghl",
      unit: "automations live",
      devNote: "",
    },
  },
  {
    icon: N8NIcon,
    title: "n8n Workflow Automation",
    description:
      "Whole workflows that move between the apps you already run, on their own.",
    tools: ["Gmail", "Google Sheets", "Webhooks & APIs"],
    metric: {
      kind: "count",
      platform: "n8n",
      unit: "workflows live",
      devNote: "Building real n8n workflows now — this fills in the moment one ships.",
    },
  },
  {
    icon: RobotIcon,
    title: "AI Chatbots & Voice Agents",
    description:
      "Chatbots that answer and qualify leads around the clock — now moving into voice.",
    tools: ["Claude AI", "GoHighLevel AI", "ElevenLabs Voice"],
    metric: {
      kind: "count",
      platform: "agents",
      unit: "agents live",
      devNote: "A voice agent is in the works in ElevenLabs — landing here once it's live.",
    },
  },
];
