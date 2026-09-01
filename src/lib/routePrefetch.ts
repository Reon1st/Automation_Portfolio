// Shared with App.tsx's lazy() calls so a hover/focus/touch on an internal
// link can warm the same chunk before the click-driven route change fires —
// without this, React.lazy's Suspense fallback (null) shows a blank flash
// while the chunk fetches, which reads as a stutter on route change.
export const prefetchAbout = () => import("@/pages/About");
export const prefetchPrivacyPolicy = () => import("@/pages/PrivacyPolicy");
export const prefetchTestimonials = () => import("@/pages/Testimonials");
