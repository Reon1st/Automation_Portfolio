import { GoHighLevelIcon, N8NIcon } from "@/components/PlatformIcons";
import { Sparkles, Code2, Database, Workflow } from "lucide-react";

export interface Skill {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  expertise: string;
  level: string;
}

export const skills: Skill[] = [
  {
    name: "GoHighLevel",
    Icon: GoHighLevelIcon,
    expertise: "Landing pages, funnels & forms for client acquisition — lead & SMS automations",
    level: "🟢 Solid Foundations"
  },
  {
    name: "N8N",
    Icon: N8NIcon,
    expertise: "Self-hosted on my own cloud — expanding into new automation builds",
    level: "🟢 Working Knowledge"
  },
  {
    name: "Claude AI",
    Icon: Sparkles,
    expertise: "Building AI agents & RAG-grounded automations",
    level: "🟢 Solid Foundations"
  },
  {
    name: "Next.js",
    Icon: Code2,
    expertise: "Full-stack dashboards & custom web apps",
    level: "🟢 Solid Foundations"
  },
  {
    name: "MongoDB",
    Icon: Database,
    expertise: "Data layer for automations & dashboards",
    level: "🟢 Working Knowledge"
  },
  {
    name: "Trigger.dev",
    Icon: Workflow,
    expertise: "Background jobs & scheduled automation pipelines",
    level: "🟢 Working Knowledge"
  }
];
