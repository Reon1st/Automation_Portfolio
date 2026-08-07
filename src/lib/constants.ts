// ============================================
// SITE CONFIGURATION & DESIGN SYSTEM CONSTANTS
// ============================================
// Centralized configuration for easy updates.
// Change fonts, colors, links, and content here.

export const SITE_CONFIG = {
  name: "Reon Martin",
  title: "AI Systems Consultant",
  tagline: "I build AI-powered systems that help service businesses capture more leads, automate operations, and cut repetitive work.",
  email: "reonfirst@gmail.com",
  location: "Manila, Philippines",
  timezone: "GMT+8 — overlaps US business hours",
  copyright: `© ${new Date().getFullYear()} Reon Martin. All rights reserved.`,
  responseTime: "Usually responds in 1 hour",
};

export const SOCIAL_LINKS = {
  linkedin: {
    url: "https://www.linkedin.com/in/reon-martin-5bb8b7364/?trk=opento_sprofile_details",
    label: "LinkedIn",
    description: "Connect professionally",
  },
  upwork: {
    url: "https://www.upwork.com/freelancers/~0133dfaffaaaf4cc5a",
    label: "Upwork",
    description: "Hire me directly",
  },
  onlinejobsph: {
    url: "https://www.onlinejobs.ph/jobseekers/info/2718705",
    label: "OnlineJobs.PH",
    description: "View my profile",
  },
  caseStudies: {
    url: "https://fortunate-cat.super.site",
    label: "Case Studies",
    description: "Detailed project breakdowns",
  },
};

export const NAV_ITEMS = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Automation Projects" },
  { href: "#websites", label: "Websites" },
  { href: "#contact", label: "Contact" },
] as const;

export const AVAILABILITY = {
  schedule: [
    { day: "Sunday", hours: "9 – 11 AM" },
    { day: "Tue & Thu", hours: "9 – 11:59 PM" },
  ],
  languages: ["English", "Filipino"],
};

// Weekly class blocks (Asia/Manila time, minutes-since-midnight), 0=Sun..6=Sat.
// Drives the live "in class" status chip — update each semester when the
// timetable changes, this does not derive from anywhere else automatically.
const t = (h: number, m = 0) => h * 60 + m;
export const CLASS_SCHEDULE: Record<number, [number, number][]> = {
  0: [],
  1: [[t(7), t(8, 30)], [t(10, 30), t(12, 30)], [t(13), t(16)]],
  2: [],
  3: [[t(7), t(8, 30)], [t(10), t(13)], [t(14), t(16)]],
  4: [[t(13), t(15)]],
  5: [[t(8, 30), t(11, 30)]],
  6: [[t(8, 30), t(11, 30)], [t(13), t(16)]],
};

// Animation presets for consistent animations across the app
export const ANIMATION_PRESETS = {
  default: {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
    triggerOnce: true,
    variant: "fade" as const,
    duration: 500,
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  },
  hero: {
    threshold: 0.2,
    rootMargin: "0px",
    triggerOnce: true,
    variant: "fade" as const,
    duration: 600,
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  },
  stagger: {
    services: { count: 6, delay: 100 },
    portfolio: { count: 3, delay: 80 },
    faq: { count: 6, delay: 60 },
    hero: { count: 4, delay: 150 },
  },
};

// Design tokens that complement CSS variables
export const DESIGN_TOKENS = {
  transitions: {
    fast: "150ms",
    default: "300ms",
    slow: "500ms",
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  },
  spacing: {
    section: "6rem",
    sectionSm: "4rem",
  },
  borderRadius: {
    card: "0.75rem",
    button: "0.5rem",
  },
};
