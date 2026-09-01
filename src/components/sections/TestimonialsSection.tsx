import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/shared/SectionHeader";
import { supabase } from "@/integrations/supabase/client";
import { Testimonial } from "@/data/testimonials";
import { prefetchTestimonials } from "@/lib/routePrefetch";
import { platformColors, platformLabels } from "@/lib/testimonialPlatforms";

const TestimonialsSection: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("testimonials")
          .select("*")
          .eq("is_visible", true)
          .order("display_order");
        if (!error && data?.length) setItems(data);
      } catch {
        // section stays hidden
      }
    };
    fetchTestimonials();
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="py-8 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeader
          badge={{ text: "Client Words" }}
          title="What Clients Say"
          titleId="testimonials-title"
          subtitle="Feedback from automation and web builds"
        />
        {/* One review gets its own centered spotlight with real presence
            (bigger card, ambient glow) rather than sitting in an empty
            3-column grid; 2–3 sit side by side and re-center gracefully
            when they don't fill the row. */}
        <div className={items.length === 1 ? "flex justify-center" : "flex flex-wrap justify-center gap-5"}>
          {items.slice(0, 3).map((t) => (
            <div
              key={t.name}
              className={`relative ${items.length === 1 ? "w-full max-w-xl" : "w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"}`}
            >
              {items.length === 1 && (
                <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-2xl blur-xl opacity-60" aria-hidden="true" />
              )}
              <Card className="relative enhanced-card border-border/50">
                <CardContent className={items.length === 1 ? "p-8 space-y-4" : "p-5 space-y-3"}>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className={items.length === 1 ? "h-5 w-5 fill-primary text-primary" : "h-4 w-4 fill-primary text-primary"} />
                    ))}
                  </div>
                  <p className={items.length === 1 ? "text-lg leading-relaxed text-foreground/90" : "text-sm leading-relaxed text-foreground/90"}>
                    "{t.text}"
                  </p>
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${platformColors[t.platform || "manual"]}`}>
                        {platformLabels[t.platform || "manual"] || "Review"}
                      </span>
                      {t.platform_url && (
                        <a href={t.platform_url} target="_blank" rel="noopener noreferrer" aria-label="View original review" className="text-muted-foreground hover:text-primary transition-colors">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/testimonials" onMouseEnter={prefetchTestimonials} onFocus={prefetchTestimonials} onTouchStart={prefetchTestimonials} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Read all testimonials <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
