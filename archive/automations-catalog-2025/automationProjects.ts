export interface AutomationProject {
  id: number;
  title: string;
  platform: string;
  workflowImage: string;
  impact: string;
  description: string;
  keyFeatures: string[];
  technologies: string[];
  clientValue: string;
}

export interface AutomationProjects {
  Zapier: AutomationProject[];
  "Make.com": AutomationProject[];
  GoHighLevel: AutomationProject[];
  N8N: AutomationProject[];
}

export const automationProjects: AutomationProjects = {
  Zapier: [
    {
      id: 1,
      title: "Complete Zapier Automation Portfolio",
      platform: "Zapier",
      workflowImage: "/lovable-uploads/95292201-f71a-47c0-a5a4-9953e8bd09e4.png",
      impact: "10+ Active Production Workflows",
      description: "Comprehensive portfolio showcasing multiple live Zapier automations across different business functions, from customer surveys to lead management and tracking systems.",
      keyFeatures: [
        "Multi-project automation dashboard management",
        "Cross-platform integration expertise",
        "Real-time workflow monitoring and optimization",
        "Scalable automation architecture design"
      ],
      technologies: ["Zapier Pro", "Multiple API Integrations", "Webhook Systems", "Database Management"],
      clientValue: "Shows a track record of shipping and maintaining several production automations at once — handling complex multi-step workflows without babysitting them daily."
    },
    {
      id: 2,
      title: "Customer Survey Response Automation",
      platform: "Zapier",
      workflowImage: "/lovable-uploads/21a3a7a4-4d46-4056-8fe3-59f7c0968fe8.png",
      impact: "100% automated survey processing",
      description: "Streamlined customer feedback system that automatically processes Google Sheets responses, sends personalized emails, performs data lookups, and updates customer records in real-time.",
      keyFeatures: [
        "Google Sheets trigger for instant response processing",
        "Automated personalized email responses via Zapier Email",
        "Smart data lookup and cross-referencing",
        "Automatic spreadsheet updates with customer insights"
      ],
      technologies: ["Zapier", "Google Sheets", "Zapier Email", "Data Lookup Functions"],
      clientValue: "Removes manual survey processing entirely — every customer gets an immediate acknowledgment, and the data entry mistakes that come with manual re-typing simply can't happen."
    },
    {
      id: 3,
      title: "Advanced Webhook Processing System",
      platform: "Zapier",
      workflowImage: "/lovable-uploads/7e210485-30c0-437a-b9f4-e854b8180f28.png",
      impact: "Real-time data synchronization across platforms",
      description: "Sophisticated webhook-based automation that captures external data, processes it through multiple API calls, handles file uploads, and maintains data consistency across systems.",
      keyFeatures: [
        "Webhook catch and processing system",
        "Multiple sequential API integrations (GET/POST requests)",
        "Automated file upload and management",
        "Custom request handling with error management",
        "Multi-step data validation and processing"
      ],
      technologies: ["Zapier Webhooks", "REST APIs", "Google Drive API", "Custom HTTP Requests", "JSON Processing"],
      clientValue: "Keeps disparate systems in sync in real time — manual data transfer and the sync delays that come with it are eliminated entirely."
    },
    {
      id: 4,
      title: "Multi-Path Task Management System",
      platform: "Zapier",
      workflowImage: "/lovable-uploads/bbbbea00-7e2b-4135-a82a-1ee5917de076.png",
      impact: "Automatic task routing on every status change",
      description: "Automated task routing system that processes Asana updates through different paths based on status, sending targeted emails and creating sub-tasks automatically.",
      keyFeatures: [
        "Asana trigger with path-based routing",
        "Automated Gmail notifications for different scenarios",
        "Dynamic folder creation and task assignment"
      ],
      technologies: ["Zapier", "Asana", "Gmail", "Google Drive"],
      clientValue: "Eliminates manual task tracking — every status update is routed and actioned automatically, so nothing falls through the cracks."
    },
    {
      id: 5,
      title: "Smart Order Fulfillment System",
      platform: "Zapier",
      workflowImage: "/lovable-uploads/ce5464fa-42be-4f05-972b-beebb0919cbd.png",
      impact: "Auto-filters and routes orders by size — no manual sorting",
      description: "Intelligent order processing system that captures Google Form responses, filters by size preferences, sends SMS notifications, and updates inventory across multiple spreadsheets automatically.",
      keyFeatures: [
        "Google Forms trigger with intelligent filtering",
        "Dynamic path routing based on shirt sizes (XS, Medium, Large)",
        "Automated SMS notifications via Zapier SMS",
        "Multi-spreadsheet inventory updates with size-specific tracking"
      ],
      technologies: ["Zapier", "Google Forms", "Zapier SMS", "Google Sheets", "Path Logic"],
      clientValue: "Eliminates manual order sorting and size-based mistakes, with inventory automatically managed across product categories."
    },
    {
      id: 6,
      title: "E-commerce SMS Notification System",
      platform: "Zapier",
      workflowImage: "/lovable-uploads/a35856fa-8d3e-4b4b-924d-ef3873f3af00.png",
      impact: "Instant order confirmation the moment a sale comes in",
      description: "Comprehensive e-commerce automation that triggers from WooCommerce orders, logs customer data to spreadsheets, and sends immediate SMS confirmations via Twilio.",
      keyFeatures: [
        "WooCommerce order trigger with real-time processing",
        "Google Sheets customer database integration",
        "Instant SMS confirmations via Twilio",
        "Automated order tracking and follow-up sequences"
      ],
      technologies: ["Zapier", "WooCommerce", "Google Sheets", "Twilio SMS"],
      clientValue: "Gives customers instant order confirmations and tracking updates automatically, cutting down the \"where's my order\" support messages."
    },
    {
      id: 7,
      title: "AI-Powered Content Repurposing Engine",
      platform: "Zapier",
      workflowImage: "/lovable-uploads/042c2556-1366-4d95-a988-aaa9fa6bf6e0.png",
      impact: "One upload becomes a week of platform-ready posts",
      description: "Advanced content automation that transforms Google Drive files into multi-platform social media content using AI transcription and smart path distribution to Facebook, LinkedIn, and Instagram.",
      keyFeatures: [
        "Google Drive trigger with automatic file processing",
        "AI-powered transcription and blog post generation",
        "Smart content filtering and path optimization",
        "Multi-platform publishing to Facebook, LinkedIn, and Instagram",
        "Automated hashtag generation and audience targeting"
      ],
      technologies: ["Zapier", "Google Drive", "AI Zapier Tools", "Facebook Pages", "LinkedIn API", "Instagram Business"],
      clientValue: "Converts a single upload into platform-optimized posts for Facebook, LinkedIn, and Instagram automatically — content creation stops being a weekly time sink."
    },
    {
      id: 8,
      title: "Form Response Automation",
      platform: "Zapier",
      workflowImage: "/lovable-uploads/0b404ad1-6bfc-4ed4-8abe-42c7db7ec612.png",
      impact: "Every submission answered within minutes, automatically",
      description: "Automated lead capture system that processes form submissions, sends immediate email responses, and logs data to spreadsheets for tracking.",
      keyFeatures: [
        "Form trigger with instant response",
        "Personalized email auto-responses",
        "CRM integration for lead tracking"
      ],
      technologies: ["Zapier", "Fillout Forms", "Gmail", "Google Sheets"],
      clientValue: "Eliminates manual form-processing delays — every lead gets an immediate acknowledgment and lands straight in the CRM."
    }
  ],
  "Make.com": [
    {
      id: 12,
      title: "Multi-Integration Scenarios Dashboard",
      platform: "Make.com",
      workflowImage: "/lovable-uploads/a0cecd99-ce58-487a-9e03-8e5273b37c49.png",
      impact: "Centralized automation management across 4+ integrations",
      description: "Comprehensive Make.com scenarios dashboard managing multiple active integrations including HTTP Webhook processing, Asana-Xero synchronization, Gmail automation, and Google Sheets workflows.",
      keyFeatures: [
        "HTTP Webhook processing for external data intake",
        "Asana and Xero financial integration synchronization",
        "Gmail automation with intelligent message processing",
        "Google Sheets data management and reporting"
      ],
      technologies: ["Make.com", "HTTP Webhooks", "Asana", "Xero", "Gmail", "Google Sheets"],
      clientValue: "A single dashboard managing several critical business processes at once — webhook intake, financial sync, email automation, and reporting, all running without manual oversight."
    },
    {
      id: 13,
      title: "Webhook to Multi-Channel Slack Router",
      platform: "Make.com",
      workflowImage: "/lovable-uploads/e8097331-7aea-4ee4-9a83-e3676efd061a.png",
      impact: "Automated multi-channel team communication",
      description: "Advanced routing system that processes incoming webhooks, logs data to Google Sheets, and distributes targeted messages to multiple Slack channels based on content and routing rules.",
      keyFeatures: [
        "Custom webhook processing with data validation",
        "Google Sheets integration for logging and tracking",
        "Smart routing logic with conditional message distribution",
        "Multi-channel Slack messaging with targeted content"
      ],
      technologies: ["Make.com", "Webhooks", "Google Sheets", "Slack", "Router Module"],
      clientValue: "Eliminates manual message routing — critical information reaches the right team instantly, with routing logic that removes the guesswork."
    },
    {
      id: 9,
      title: "Google Sheets & Slack Integration Hub",
      platform: "Make.com",
      workflowImage: "/lovable-uploads/29ef6236-5519-4719-a7fc-ddbd00fdad24.png",
      impact: "Automated team notifications and data routing",
      description: "Advanced workflow that connects Google Sheets with Slack messaging and webhook routing system, enabling real-time team updates and automated data processing across multiple channels.",
      keyFeatures: [
        "Google Sheets trigger with instant data processing",
        "Multi-path Slack notification system",
        "Webhook routing with conditional logic",
        "Custom routing based on data parameters"
      ],
      technologies: ["Make.com", "Google Sheets", "Slack", "Webhooks", "Router Module"],
      clientValue: "Eliminates manual notification work — spreadsheet updates flow straight into the right Slack channel automatically."
    },
    {
      id: 10,
      title: "AI-Powered Gmail Processing System",
      platform: "Make.com",
      workflowImage: "/lovable-uploads/04228c0e-c9c3-4d68-b6f5-06fea5321d8a.png",
      impact: "100% automated email processing with AI",
      description: "Sophisticated email automation that processes Gmail messages through OpenAI for intelligent content analysis, automatically uploads files to Google Drive, and logs processed data to Google Sheets.",
      keyFeatures: [
        "Gmail trigger with intelligent filtering",
        "OpenAI integration for content analysis and processing",
        "Automated Google Drive file management",
        "Smart Google Sheets data logging with AI insights"
      ],
      technologies: ["Make.com", "Gmail", "OpenAI (ChatGPT, Whisper, DALL-E)", "Google Drive", "Google Sheets"],
      clientValue: "Adds AI-powered content analysis and automatic file organization to the inbox — every message gets read, filed, and logged without manual triage."
    },
    {
      id: 11,
      title: "Multi-Platform Business Integration",
      platform: "Make.com",
      workflowImage: "/lovable-uploads/9a5e3e5a-d351-4e58-83bd-a253bb480e1c.png",
      impact: "Unified business operations across 6+ platforms",
      description: "Complex integration system connecting Asana project management with Xero accounting, featuring multiple routing paths, iterator processing, and automated data synchronization across business tools.",
      keyFeatures: [
        "Asana project trigger with smart filtering",
        "Xero API integration for financial data sync",
        "Advanced routing with multiple conditional paths",
        "Iterator modules for bulk data processing",
        "Google Sheets integration for reporting and analytics"
      ],
      technologies: ["Make.com", "Asana", "Xero", "Google Sheets", "Router", "Iterator", "Tools Module"],
      clientValue: "Automatically syncs project data with financial records — eliminates double data entry and keeps project management and accounting in agreement."
    },
    {
      id: 18,
      title: "CRM Lead Nurturing System",
      platform: "Make.com",
      workflowImage: "/placeholder.svg",
      impact: "Automated follow-up sequences based on real engagement",
      description: "Automated lead nurturing system that follows up with prospects and schedules appointments based on engagement levels.",
      keyFeatures: [
        "Multi-step lead scoring and qualification",
        "Automated email sequences based on behavior",
        "Calendar integration for appointment booking"
      ],
      technologies: ["Make.com", "HubSpot CRM", "Gmail", "Calendly"],
      clientValue: "Automates lead scoring and follow-up so the sales team spends time closing deals instead of manually tracking who to contact next."
    }
  ],
  GoHighLevel: [
    {
      id: 14,
      title: "Website Form Submission SMS Follow-Up",
      platform: "GoHighLevel",
      workflowImage: "/lovable-uploads/d7322965-1615-4fe8-96c8-a0faa07fc124.png",
      impact: "Instant SMS the moment a form is submitted",
      description: "Automated SMS follow-up system that captures website form submissions and initiates multi-step nurture sequences with conditional paths based on prospect responses.",
      keyFeatures: [
        "Form submission trigger with instant SMS deployment",
        "Multi-step conditional SMS sequences with timing controls",
        "Wait periods and call scheduling automation",
        "Response-based path routing and lead qualification"
      ],
      technologies: ["GoHighLevel", "SMS Automation", "Form Triggers", "Conditional Logic", "Call Scheduling"],
      clientValue: "Eliminates manual follow-up delays — every form submission triggers an immediate, multi-step SMS nurture sequence automatically."
    },
    {
      id: 15,
      title: "Advanced Multi-Branch Workflow System",
      platform: "GoHighLevel",
      workflowImage: "/lovable-uploads/d3233011-8a36-4055-a4c4-31c42c8b2f76.png",
      impact: "Adapts to each prospect's behavior in real time",
      description: "Complex conditional workflow that manages customer journeys through multiple touchpoints, including contact replies, timeouts, and status-based routing with document sending capabilities.",
      keyFeatures: [
        "Multi-branch conditional logic with contact reply detection",
        "Time-based triggers and timeout handling",
        "Automated document delivery and contract sending",
        "Status-based workflow routing and lead lifecycle management"
      ],
      technologies: ["GoHighLevel", "Conditional Workflows", "Document Automation", "Contact Management", "Time-Based Triggers"],
      clientValue: "A lead-nurturing system that adapts to prospect behavior in real time — personalized communication at scale, without a human routing every reply."
    },
    {
      id: 16,
      title: "Customer Status Management System",
      platform: "GoHighLevel",
      workflowImage: "/lovable-uploads/b1d20e72-c4a3-481d-a757-8d0bac7be3c8.png",
      impact: "Automatic tagging and re-engagement scheduling",
      description: "Automated customer status workflow that handles 'not interested' responses with professional follow-up messaging, tag management, and future re-engagement scheduling.",
      keyFeatures: [
        "Customer reply trigger with status categorization",
        "Automated professional follow-up messaging",
        "Smart tagging system for contact segmentation",
        "Future re-engagement scheduling and contact lifecycle management"
      ],
      technologies: ["GoHighLevel", "Contact Tagging", "SMS Messaging", "Status Automation", "Re-engagement Workflows"],
      clientValue: "Turns a \"not interested\" reply into a future opportunity — professional follow-up and automatic re-engagement scheduling instead of a dead lead."
    },
    {
      id: 17,
      title: "Slack Notification System for Customer Bookings",
      platform: "GoHighLevel",
      workflowImage: "/lovable-uploads/2e9bac01-eff7-401c-9ce5-5305261bf981.png",
      impact: "Instant team notifications",
      description: "Multi-trigger workflow that sends real-time Slack notifications when customers book appointments or submit forms, with conditional logic to handle different event types.",
      keyFeatures: [
        "Dual trigger system for appointments and form submissions",
        "Wait periods and conditional branching logic",
        "Real-time Slack integration with custom messaging",
        "Event-specific notification routing and team alerts"
      ],
      technologies: ["GoHighLevel", "Slack Integration", "Conditional Logic", "Real-time Notifications", "Multi-trigger Workflows"],
      clientValue: "Eliminates missed bookings — every appointment or form submission notifies the team instantly, so no inquiry goes unnoticed."
    }
  ],
  N8N: [
    {
      id: 19,
      title: "Airtable Record Update Automation",
      platform: "N8N",
      workflowImage: "/lovable-uploads/36bd9aba-6a46-460e-a36a-45dc207c8936.png",
      impact: "Automated data synchronization",
      description: "Sophisticated workflow that triggers on command execution, creates and updates Airtable records with split logic for enhanced data processing and HTTP requests for external integrations.",
      keyFeatures: [
        "Manual workflow execution trigger with command interface",
        "Dynamic Airtable record creation and update operations",
        "Split logic for parallel data processing paths",
        "HTTP request integration for external API connectivity"
      ],
      technologies: ["N8N", "Airtable API", "HTTP Requests", "Split Logic", "Manual Triggers"],
      clientValue: "Removes manual data-entry work entirely — records sync across platforms automatically with built-in routing logic."
    },
    {
      id: 20,
      title: "AI Agent with Memory System",
      platform: "N8N",
      workflowImage: "/lovable-uploads/cdac9b7c-6066-4d6f-bd56-5cb36dc108bb.png",
      impact: "Intelligent AI conversations",
      description: "Advanced AI workflow featuring webhook triggers, Google Gemini Chat integration, memory management, and structured output parsing for sophisticated conversational AI applications.",
      keyFeatures: [
        "Webhook-triggered AI agent activation",
        "Google Gemini Chat Model integration with advanced prompting",
        "Persistent memory system with chat history management",
        "Structured output parsing for consistent data formatting"
      ],
      technologies: ["N8N", "Google Gemini AI", "Webhook Integration", "Memory Management", "Output Parsing"],
      clientValue: "An AI assistant that remembers conversation context and responds in a consistent, structured format — no repeating yourself, no generic replies."
    }
  ]
};
