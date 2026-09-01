import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { testimonials as fallbackTestimonials, Testimonial } from "@/data/testimonials";
import { supabase } from "@/integrations/supabase/client";
import { platformColors, platformLabels } from "@/lib/testimonialPlatforms";
import WavesBackground from "@/components/WavesBackground";

// Below this count, testimonials show as a static centered row — an
// infinite marquee needs enough cards to loop smoothly, and with only a
// few it just reads as one card sliding off-screen for no reason. Raise
// this if the static row starts looking cramped once more real reviews land.
const CAROUSEL_MIN_COUNT = 5;

const getProfilePicture = (name: string) => {
  const profileMap: Record<string, string> = {
    "sarah johnson": "/lovable-uploads/sarah-profile-56.webp",
    "michael chen": "/lovable-uploads/michael-profile-56.webp",
    "emma rodriguez": "/lovable-uploads/emma-profile-56.webp",
    "david park": "/lovable-uploads/david-profile-56.webp",
    "jessica miller": "/lovable-uploads/jessica-profile-56.webp",
  };
  return profileMap[name.toLowerCase()] || null;
};

const TestimonialCard = ({ t }: { t: Testimonial }) => {
  const avatar = t.avatar_url || getProfilePicture(t.name);
  const platform = t.platform || "manual";

  return (
    <div className="flex-shrink-0 w-[340px] md:w-[400px] rounded-xl border border-primary/15 bg-card/60 backdrop-blur-md p-5 shadow-lg hover:border-primary/30 transition-colors duration-500">
      {/* Top accent */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-4 -mt-5 rounded-t-xl" />

      {/* Quote text */}
      <p className="text-sm leading-relaxed text-foreground/85 mb-4 line-clamp-4">
        "{t.text}"
      </p>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
        ))}
      </div>

      {/* Author row */}
      <div className="flex items-center gap-3">
        {avatar ? (
          <img
            src={avatar}
            alt={t.name}
            className="w-10 h-10 rounded-full object-cover border border-primary/20"
            width="40"
            height="40"
            loading="lazy"
          />
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-xs">
              {t.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-primary text-sm truncate">{t.name}</p>
          <p className="text-muted-foreground text-xs truncate">
            {t.role} • {t.company}
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${platformColors[platform]}`}>
            {platformLabels[platform] || "Review"}
          </span>
          {t.platform_url && (
            <a href={t.platform_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("testimonials")
          .select("*")
          .eq("is_visible", true)
          .order("display_order");

        if (error || !data?.length) {
          setTestimonials(fallbackTestimonials);
        } else {
          setTestimonials(data);
        }
      } catch {
        setTestimonials(fallbackTestimonials);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen gradient-bg dark">
      <header className="fixed top-0 w-full z-50 bg-background/98 backdrop-blur-xl border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
            Reon Martin
          </Link>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24">
        <div className="container mx-auto max-w-5xl px-6">
          {/* Header — same shader-panel treatment as the About page intro */}
          <div className="relative rounded-2xl overflow-hidden border border-primary/20 min-h-[320px] flex items-center justify-center mb-16">
            <WavesBackground />
            <div className="absolute inset-0 bg-background/35" />
            <div className="relative z-10 text-center px-6 py-16 space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
                What Clients Say
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-accent via-primary to-accent mx-auto rounded-full" />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hear from businesses who've transformed their operations with automation
              </p>
            </div>
          </div>
        </div>

        {/* Fewer than CAROUSEL_MIN_COUNT: static centered row, full premium card treatment,
            no motion. At or above it: infinite marquee, which needs enough cards to loop
            smoothly instead of reading as one card sliding off-screen. */}
        {testimonials.length > 0 && (
          testimonials.length >= CAROUSEL_MIN_COUNT ? (
            <div
              className="relative overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Left/right fade masks */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <div
                ref={trackRef}
                className="flex gap-6 py-4"
                style={{
                  animation: `scroll-infinite-smooth ${Math.max(20, testimonials.length * 8)}s linear infinite`,
                  animationPlayState: isPaused ? "paused" : "running",
                  width: "max-content",
                }}
              >
                {/* Duplicate list for seamless loop */}
                {[...testimonials, ...testimonials].map((t, i) => (
                  <TestimonialCard key={`${t.id || t.name}-${i}`} t={t} />
                ))}
              </div>
            </div>
          ) : (
            <div className="container mx-auto max-w-5xl px-6">
              <div className="flex flex-wrap justify-center gap-6 py-4">
                {testimonials.map((t) => (
                  <TestimonialCard key={t.id || t.name} t={t} />
                ))}
              </div>
            </div>
          )
        )}

        {/* Disclaimer */}
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mt-16">
            <p className="text-sm text-muted-foreground/60 max-w-lg mx-auto">
              Real feedback from clients I've worked with, in their own words.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Testimonials;
