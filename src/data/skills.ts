import { GoHighLevelIcon, N8NIcon } from "@/components/PlatformIcons";
import { Sparkles, Code2, Database, Workflow, Atom, FileCode2, Wind, Zap, Plug, Table2, Triangle } from "lucide-react";

export type SkillCategory = "AI & Automation" | "Frontend & Motion" | "Backend & Integrations";

export interface Skill {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  expertise: string;
  level: string;
  category: SkillCategory;
}

export const skills: Skill[] = [
  // AI & Automation
  {
    name: "Claude AI",
    Icon: Sparkles,
    expertise: "Building AI agents & RAG-grounded automations",
    level: "🟢 Solid Foundations",
    category: "AI & Automation"
  },
  {
    name: "GoHighLevel",
    Icon: GoHighLevelIcon,
    expertise: "Landing pages, funnels & forms for client acquisition — lead & SMS automations",
    level: "🟢 Solid Foundations",
    category: "AI & Automation"
  },
  {
    name: "N8N",
    Icon: N8NIcon,
    expertise: "Self-hosted on my own cloud — expanding into new automation builds",
    level: "🟡 Working Knowledge",
    category: "AI & Automation"
  },
  // Frontend & Motion
  {
    name: "React",
    Icon: Atom,
    expertise: "Component architecture for every front-end I ship — this portfolio included",
    level: "🟢 Solid Foundations",
    category: "Frontend & Motion"
  },
  {
    name: "Next.js",
    Icon: Code2,
    expertise: "Full-stack dashboards & custom web apps",
    level: "🟢 Solid Foundations",
    category: "Frontend & Motion"
  },
  {
    name: "TypeScript",
    Icon: FileCode2,
    expertise: "Type safety across every project — catches bugs before they ship",
    level: "🟢 Solid Foundations",
    category: "Frontend & Motion"
  },
  {
    name: "Tailwind CSS",
    Icon: Wind,
    expertise: "Fast, consistent styling without fighting a design system",
    level: "🟢 Solid Foundations",
    category: "Frontend & Motion"
  },
  {
    name: "GSAP",
    Icon: Zap,
    expertise: "Motion and micro-interactions that feel deliberate, not decorative",
    level: "🟡 Working Knowledge",
    category: "Frontend & Motion"
  },
  // Backend & Integrations
  {
    name: "Trigger.dev",
    Icon: Workflow,
    expertise: "Background jobs & scheduled automation pipelines",
    level: "🟡 Working Knowledge",
    category: "Backend & Integrations"
  },
  {
    name: "MongoDB",
    Icon: Database,
    expertise: "Data layer for automations & dashboards",
    level: "🟡 Working Knowledge",
    category: "Backend & Integrations"
  },
  {
    name: "Supabase",
    Icon: Table2,
    expertise: "Realtime data & auth for projects that need a lightweight backend",
    level: "🟡 Working Knowledge",
    category: "Backend & Integrations"
  },
  {
    name: "Composio",
    Icon: Plug,
    expertise: "Wires AI agents into Gmail, Drive & CRMs without hand-rolling auth",
    level: "🟡 Working Knowledge",
    category: "Backend & Integrations"
  },
  {
    name: "Vercel",
    Icon: Triangle,
    expertise: "Where every project on this site actually lives",
    level: "🟡 Working Knowledge",
    category: "Backend & Integrations"
  }
];
