import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import { prefetchPrivacyPolicy } from "@/lib/routePrefetch";
import { LinkedInIcon } from "@/components/UpdatedSocialIcons";
import { GmailIcon, CalIcon, NotionIcon, GitHubIcon, XIcon } from "@/components/PlatformIcons";
import AvailabilityIndicator from "@/components/AvailabilityIndicator";
import { SITE_CONFIG, SOCIAL_LINKS, AVAILABILITY } from "@/lib/constants";

// Single trigger, once the footer scrolls into view — every element's timing
// is declared as its own CSS transition-delay off the shared .is-revealed
// class (see index.css), so the panel fade-up, the divider wipe, and the
// columns parting all stay genuinely in sync rather than being JS-timed.
const useFooterReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsRevealed(true);
        observer.unobserve(element);
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => {
      try { observer.unobserve(element); } catch { /* noop */ }
    };
  }, []);

  return { ref, isRevealed };
};
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
  const { ref: revealRef, isRevealed } = useFooterReveal();
  return <footer className="pt-8 pb-6 px-6 relative overflow-hidden" role="contentinfo">
      {/* Charcoal panel keeps footer content readable over the cyan base of the page gradient */}
      <div ref={revealRef} className={`footer-reveal-panel${isRevealed ? " is-revealed" : ""} container mx-auto max-w-6xl relative z-10 rounded-2xl border border-white/5 bg-[#0B0D12]/95 p-6 md:p-8 shadow-2xl shadow-black/40`}>
        {/* Compact Header */}
        <div className="text-center mb-6">

          <h2 className="text-xl lg:text-2xl font-bold text-primary mb-2">
            Let's Connect
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Ready to automate your workflows? I'd love to hear about your project.
          </p>
        </div>

        {/* Divider — expands from center in sync with the columns below it */}
        <div className="mx-auto max-w-5xl px-6 py-3" aria-hidden="true">
          <div className="footer-reveal-bar h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        {/* Content Grid - More Compact */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-6 mb-6">

          {/* Get In Touch */}
          <div className="footer-reveal-col footer-reveal-col-left space-y-1 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-4">

              <h3 className="text-sm font-bold text-primary">
                Contact
              </h3>
            </div>

            <FooterLink href={`mailto:${SITE_CONFIG.email}`} icon={<GmailIcon className="h-8 w-8" />} title="Email" description={SITE_CONFIG.email} external={false} />

            <FooterLink href="#contact" icon={<CalIcon className="h-8 w-8" />} title="Schedule Call" description="Book a free consultation" external={false} />

            <FooterLink href={SOCIAL_LINKS.caseStudies.url} icon={<NotionIcon className="h-8 w-8" />} title={SOCIAL_LINKS.caseStudies.label} description={SOCIAL_LINKS.caseStudies.description} />
          </div>

          {/* Professional Profiles */}
          <div className="footer-reveal-col footer-reveal-col-center space-y-1 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-4">

              <h3 className="text-sm font-bold text-primary">
                Profiles
              </h3>
            </div>

            <FooterLink href={SOCIAL_LINKS.linkedin.url} icon={<LinkedInIcon className="h-8 w-8" />} title={SOCIAL_LINKS.linkedin.label} description={SOCIAL_LINKS.linkedin.description} />

            <FooterLink href={SOCIAL_LINKS.github.url} icon={<GitHubIcon className="h-8 w-8" />} title={SOCIAL_LINKS.github.label} description={SOCIAL_LINKS.github.description} />

            <FooterLink href={SOCIAL_LINKS.x.url} icon={<XIcon className="h-8 w-8" />} title={SOCIAL_LINKS.x.label} description={SOCIAL_LINKS.x.description} />
          </div>

          {/* Availability */}
          <div className="footer-reveal-col footer-reveal-col-right space-y-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-4">

              <h3 className="text-sm font-bold text-primary">
                Availability
              </h3>
            </div>

            <AvailabilityIndicator />

            <div className="p-3 rounded-xl bg-card/40 border border-border/30">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Live hours ({SITE_CONFIG.timezone})
              </p>
              <div className="space-y-1 text-xs">
                {AVAILABILITY.schedule.map(item => <div key={item.day} className="flex justify-between text-muted-foreground">
                    <span className="text-foreground/80">{item.day}</span>
                    <span>{item.hours}</span>
                  </div>)}
              </div>
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
              <span className="hidden sm:inline">•</span>
              <Link to="/privacy-policy" onMouseEnter={prefetchPrivacyPolicy} onFocus={prefetchPrivacyPolicy} onTouchStart={prefetchPrivacyPolicy} className="hover:text-primary transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;