import React from "react";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SOCIAL_LINKS } from "@/lib/constants";

const CaseStudiesSection: React.FC = () => {
  return (
    <section id="case-studies" aria-labelledby="case-studies-heading" className="py-8 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <Card className="border-border/50 bg-card/70 backdrop-blur-sm hover:border-primary/40 transition-all duration-500">
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="p-3 rounded-lg bg-accent/10 flex-shrink-0">
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            <div className="space-y-1.5 flex-grow">
              <h2 id="case-studies-heading" className="font-bold text-lg">More Case Studies</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Smaller automations, one-off tools, and experiments I've built for myself that don't fit neatly above.
                Kept as a running log on Notion.
              </p>
            </div>
            <a
              href={SOCIAL_LINKS.caseStudies.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-muted/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex-shrink-0"
            >
              View on Notion <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
