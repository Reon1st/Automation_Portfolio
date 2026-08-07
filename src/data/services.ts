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
