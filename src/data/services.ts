import { GoHighLevelIcon, N8NIcon, ClaudeIcon, RobotIcon } from "@/components/PlatformIcons";

export interface Service {
  icon: React.ComponentType<{ className?: string }>;
  // Icons with a baked-in square background (Claude, GHL) fill the tile edge-to-edge;
  // transparent glyphs (n8n, robot) stay centered at glyph size.
  iconFill?: boolean;
  title: string;
  description: string;
  tools: string[];
}

export const services: Service[] = [
  {
    icon: ClaudeIcon,
    iconFill: true,
    title: "Claude | Code | Cowork",
    description:
      "Claude thinks, I build — direct, no account manager in between. A second brain, a personal assistant, an ops system for your whole business — built around whatever you actually need.",
    tools: ["Claude AI", "Next.js", "Trigger.dev", "Composio", "RAG / Vector Search"],
  },
  {
    icon: GoHighLevelIcon,
    iconFill: true,
    title: "GoHighLevel CRM",
    description:
      "Your whole sales side in one system — CRM, funnels, AI agents, and follow-ups that fire on their own so leads don't go cold.",
    tools: ["GoHighLevel", "Funnels", "SMS & Email Campaigns", "AI Agents"],
  },
  {
    icon: N8NIcon,
    title: "n8n Workflow Automation",
    description:
      "Connect the tools you already run — n8n doesn't care what the job is. Emails, sheets, alerts, entire workflows: whatever moves between your apps can run itself.",
    tools: ["n8n", "Gmail", "Google Sheets", "Webhooks & APIs"],
  },
  {
    icon: RobotIcon,
    title: "AI Chatbots & Voice Agents",
    description:
      "Chatbots that answer and pre-qualify leads around the clock, now stretching into voice — agents that sound so human, most callers never clock they're talking to a bot.",
    tools: ["Claude AI", "n8n Agents", "GoHighLevel AI", "Voice AI"],
  },
];
