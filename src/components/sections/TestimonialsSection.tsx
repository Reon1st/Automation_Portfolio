import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/shared/SectionHeader";
import { supabase } from "@/integrations/supabase/client";
import { Testimonial } from "@/data/testimonials";
import { prefetchTestimonials } from "@/lib/routePrefetch";

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
        <div className="grid md:grid-cols-3 gap-5">
          {items.slice(0, 3).map((t) => (
            <Card key={t.name} className="border-border/50 bg-card/70 backdrop-blur-sm">
              <CardContent className="p-5 space-y-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                </div>
              </CardContent>
            </Card>
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
