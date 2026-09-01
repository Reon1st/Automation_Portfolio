// Shared between the homepage grid (TestimonialsSection) and the full
// marquee/grid page (Testimonials) so a new platform only needs adding once.
export const platformColors: Record<string, string> = {
  upwork: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  onlinejobsph: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  linkedin: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  manual: "bg-muted text-muted-foreground border-border",
};

export const platformLabels: Record<string, string> = {
  upwork: "Upwork",
  onlinejobsph: "OnlineJobs.ph",
  linkedin: "LinkedIn",
  manual: "Client Review",
};
