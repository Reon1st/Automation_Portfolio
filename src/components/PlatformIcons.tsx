// Platform Icons Component for Portfolio
import claudeIconSrc from "@/assets/claude-icon.svg";
import robotIconSrc from "@/assets/robot-icon.png";
import gmailIconSrc from "@/assets/gmail-icon.png";
import calIconSrc from "@/assets/cal-icon.png";
import notionIconSrc from "@/assets/notion-icon.png";
import githubIconSrc from "@/assets/github-icon.png";
import supabaseIconSrc from "@/assets/supabase-icon-v2.jpeg";
import mongodbIconSrc from "@/assets/mongodb-icon.jpg";
import triggerDevIconSrc from "@/assets/trigger-dev-icon.png";
import gsapIconSrc from "@/assets/gsap-icon.png";
import tailwindIconSrc from "@/assets/tailwind-icon.jpg";
import typescriptIconSrc from "@/assets/typescript-icon.png";
import nextjsIconSrc from "@/assets/nextjs-icon.jpg";
import reactIconSrc from "@/assets/react-icon-v2.png";
import composioIconSrc from "@/assets/composio-icon.jpeg";
import vercelIconSrc from "@/assets/vercel-icon.png";
import xIconSrc from "@/assets/x-icon.png";
import viteIconSrc from "@/assets/vite-icon.png";
import brevoIconSrc from "@/assets/brevo-icon.svg";
import airtableIconSrc from "@/assets/airtable-icon.png";
import resendIconSrc from "@/assets/resend-icon.png";

// loading="lazy" deliberately omitted on all of these: they sit inside a wide,
// non-virtualized embla carousel where later slides can be thousands of
// pixels outside the viewport. Native lazy-load's distance heuristic never
// fires for them, so the images silently never load until scrolled into the
// real page viewport (not just the carousel's visible window).

export const SupabaseIcon = ({ className }: { className?: string }) => (
  <img src={supabaseIconSrc} alt="Supabase" className={`${className} rounded-xl object-contain`} />
);

export const MongoDBIcon = ({ className }: { className?: string }) => (
  <img src={mongodbIconSrc} alt="MongoDB" className={`${className} rounded-xl object-contain`} />
);

export const TriggerDevIcon = ({ className }: { className?: string }) => (
  <img src={triggerDevIconSrc} alt="Trigger.dev" className={`${className} rounded-xl object-contain`} />
);

export const GSAPIcon = ({ className }: { className?: string }) => (
  <img src={gsapIconSrc} alt="GSAP" className={`${className} rounded-xl object-contain`} />
);

export const TailwindIcon = ({ className }: { className?: string }) => (
  <img src={tailwindIconSrc} alt="Tailwind CSS" className={`${className} rounded-xl object-contain`} />
);

export const TypeScriptIcon = ({ className }: { className?: string }) => (
  <img src={typescriptIconSrc} alt="TypeScript" className={`${className} rounded-xl object-contain`} />
);

export const NextJSIcon = ({ className }: { className?: string }) => (
  <img src={nextjsIconSrc} alt="Next.js" className={`${className} rounded-full object-contain`} />
);

export const ReactIcon = ({ className }: { className?: string }) => (
  <img src={reactIconSrc} alt="React" className={`${className} rounded-xl object-contain`} />
);

export const ComposioIcon = ({ className }: { className?: string }) => (
  <img src={composioIconSrc} alt="Composio" className={`${className} rounded-xl object-contain`} />
);

export const VercelIcon = ({ className }: { className?: string }) => (
  <img src={vercelIconSrc} alt="Vercel" className={`${className} rounded-xl object-contain`} />
);

export const GmailIcon = ({ className }: { className?: string }) => (
  <img src={gmailIconSrc} alt="Gmail" className={`${className} object-contain`} />
);

export const CalIcon = ({ className }: { className?: string }) => (
  <img src={calIconSrc} alt="Cal.com" className={`${className} rounded object-contain`} />
);

export const NotionIcon = ({ className }: { className?: string }) => (
  <img src={notionIconSrc} alt="Notion" className={`${className} object-contain`} />
);

export const GitHubIcon = ({ className }: { className?: string }) => (
  <img src={githubIconSrc} alt="GitHub" className={`${className} object-contain invert`} />
);

export const XIcon = ({ className }: { className?: string }) => (
  <img src={xIconSrc} alt="X (Twitter)" className={`${className} rounded object-contain`} />
);

export const ClaudeIcon = ({ className }: { className?: string }) => (
  <img src={claudeIconSrc} alt="Claude AI" className={`${className} object-contain`} />
);

export const RobotIcon = ({ className }: { className?: string }) => (
  <img src={robotIconSrc} alt="AI Chatbot" className={`${className} object-contain`} />
);

export const ZapierIcon = ({ className }: { className?: string }) => (
  <img
    src="/lovable-uploads/d8b3a1a8-f5c0-4eba-9f71-29c46006a3b1.png"
    alt="Zapier"
    className={`${className} object-contain`}
  />
);

export const MakeIcon = ({ className }: { className?: string }) => (
  <img
    src="/lovable-uploads/dd1690d1-a692-452d-9849-76cc02f40237.png"
    alt="Make.com"
    className={`${className} object-contain`}
  />
);

export const GoHighLevelIcon = ({ className }: { className?: string }) => (
  <img
    src="/lovable-uploads/29fe3618-601b-4730-8475-219987a1aebf.png"
    alt="GoHighLevel"
    className={`${className} object-contain`}
  />
);

export const WorkflowIcon = ({ className }: { className?: string }) => (
  <img
    src="/lovable-uploads/5e94e4ae-2ff9-476e-acbd-1d9b257a59c2.png"
    alt="Workflow Automation"
    className={`${className} object-contain`}
  />
);

export const N8NIcon = ({ className }: { className?: string }) => (
  <img
    src="/lovable-uploads/0cbbd126-2a9d-4a3b-9d0a-29b8a5e99d95.png"
    alt="N8N"
    className={`${className} object-contain`}
  />
);

export const ViteIcon = ({ className }: { className?: string }) => (
  <img src={viteIconSrc} alt="Vite" className={`${className} object-contain`} />
);

export const BrevoIcon = ({ className }: { className?: string }) => (
  <img src={brevoIconSrc} alt="Brevo" className={`${className} object-contain`} />
);

export const AirtableIcon = ({ className }: { className?: string }) => (
  <img src={airtableIconSrc} alt="Airtable" className={`${className} object-contain`} />
);

export const ResendIcon = ({ className }: { className?: string }) => (
  <div className={`${className} bg-black rounded-xl flex items-center justify-center`}>
    <img src={resendIconSrc} alt="Resend" className="w-2/3 h-2/3 object-contain" />
  </div>
);
