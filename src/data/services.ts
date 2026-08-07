import { GoHighLevelIcon, N8NIcon, ClaudeIcon, RobotIcon } from "@/components/PlatformIcons";

export interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tools: string[];
}

export const services: Service[] = [
  {
    icon: ClaudeIcon,
    title: "Claude | Code | Cowork",
    description:
      "Claude does the thinking, real code does the work — built directly with the person shipping it, not handed off to an account manager. The repetitive stuff (emails, follow-ups, data entry) turns into a system that actually holds up, not just a demo.",
    tools: ["Claude AI", "Next.js", "Trigger.dev", "Composio", "RAG / Vector Search"],
  },
  {
    icon: GoHighLevelIcon,
    title: "GoHighLevel — CRM & Marketing",
    description:
      "Everything your sales side needs in one place: CRM setup, automation integrations, AI agents, funnels and landing pages that convert, and SMS + email campaigns that follow up so you don't have to.",
    tools: ["GoHighLevel", "Funnels", "SMS & Email Campaigns", "AI Agents"],
  },
  {
    icon: N8NIcon,
    title: "n8n Workflow Automation",
    description:
      "Connect the tools you already use. Emails sorted automatically, spreadsheets that update themselves, and data moved between your apps without the copy-paste.",
    tools: ["n8n", "Gmail", "Google Sheets", "Webhooks & APIs"],
  },
  {
    icon: RobotIcon,
    title: "AI Chatbots & Voice Agents",
    description:
      "Chatbots that handle round-the-clock questions and pre-qualify leads before a human needs to step in — now expanding into voice: agents that can hold an actual phone conversation, not just answer with text.",
    tools: ["Claude AI", "n8n Agents", "GoHighLevel AI", "Voice AI"],
  },
];
