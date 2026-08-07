import React from "react";
import { Mail, Calendar, MapPin, BookOpen, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UpworkIcon, LinkedInIcon } from "@/components/UpdatedSocialIcons";
import { OnlineJobsPHIcon } from "@/components/OnlineJobsPHIcon";
import AvailabilityIndicator from "@/components/AvailabilityIndicator";
import FloatingElements from "@/components/shared/FloatingElements";
import { SITE_CONFIG, SOCIAL_LINKS, AVAILABILITY } from "@/lib/constants";
interface FooterLinkProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  external?: boolean;
}
const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  icon,
  title,
  description,
  external = true
}) => {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex items-center gap-3 p-3 -mx-3 rounded-xl hover:bg-primary/5 transition-all duration-300">
      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-1 text-sm">
          {title}
          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
        </p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
    </a>;
};
const Footer: React.FC = () => {
  return <footer className="pt-8 pb-6 px-6 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-card/80" role="contentinfo">
      {/* Darker layered background for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,hsl(var(--background)/0.8)_50%,hsl(var(--card))_100%)]" />
      <FloatingElements variant="minimal" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-6">

          <h2 className="text-xl lg:text-2xl font-bold text-primary mb-2">
            Let's Connect
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Ready to automate your workflows? I'd love to hear about your project.
          </p>
        </div>

        {/* Content Grid - More Compact */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-6">
          
          {/* Get In Touch */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-4">
              
              <h3 className="text-sm font-bold text-primary">
                Contact
              </h3>
            </div>
            
            <FooterLink href={`mailto:${SITE_CONFIG.email}`} icon={<Mail className="h-4 w-4 text-primary" />} title="Email" description={SITE_CONFIG.email} external={false} />
            
            <FooterLink href="#contact" icon={<Calendar className="h-4 w-4 text-primary" />} title="Schedule Call" description="Book a free consultation" external={false} />
            
            <FooterLink href={SOCIAL_LINKS.caseStudies.url} icon={<BookOpen className="h-4 w-4 text-primary" />} title={SOCIAL_LINKS.caseStudies.label} description={SOCIAL_LINKS.caseStudies.description} />
          </div>

          {/* Professional Profiles */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-4">
              
              <h3 className="text-sm font-bold text-primary">
                Profiles
              </h3>
            </div>
            
            <FooterLink href={SOCIAL_LINKS.linkedin.url} icon={<LinkedInIcon className="h-4 w-4 text-primary" />} title={SOCIAL_LINKS.linkedin.label} description={SOCIAL_LINKS.linkedin.description} />
            
            <FooterLink href={SOCIAL_LINKS.upwork.url} icon={<UpworkIcon className="h-4 w-4 text-primary" />} title={SOCIAL_LINKS.upwork.label} description={SOCIAL_LINKS.upwork.description} />
            
            <FooterLink href={SOCIAL_LINKS.onlinejobsph.url} icon={<OnlineJobsPHIcon className="h-4 w-4 text-primary" />} title={SOCIAL_LINKS.onlinejobsph.label} description={SOCIAL_LINKS.onlinejobsph.description} />
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              
              <h3 className="text-sm font-bold text-primary">
                Availability
              </h3>
            </div>
            
            <AvailabilityIndicator />

            <div className="p-3 rounded-xl bg-card/40 border border-border/30">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Hours ({SITE_CONFIG.timezone})
              </p>
              <div className="space-y-1 text-xs">
                {AVAILABILITY.schedule.map(item => <div key={item.day} className="flex justify-between text-muted-foreground">
                    <span className="text-foreground/80">{item.day}</span>
                    <span>{item.hours}</span>
                  </div>)}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {AVAILABILITY.languages.map(lang => <Badge key={lang} variant="secondary" className="text-xs font-normal bg-primary/10 text-primary border border-primary/20">
                  {lang}
                </Badge>)}
            </div>
          </div>
        </div>

        {/* Footer Bottom - Compact */}
        <div className="pt-6 border-t border-border/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-primary">Reon</span>
              <span className="text-muted-foreground">AI Automation Specialist</span>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                <span>{SITE_CONFIG.location}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>{SITE_CONFIG.copyright}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;