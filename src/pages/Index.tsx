import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ClaudeProjectsSection from "@/components/sections/portfolio/ClaudeProjectsSection";
import WebsitesSection from "@/components/sections/portfolio/WebsitesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import { GradientBackground } from "@/components/ui/dark-gradient-background";
import SectionDivider from "@/components/shared/SectionDivider";
const Index = () => {
  return <GradientBackground className="min-h-screen dark">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
        Skip to main content
      </a>

      <Header />

      {/* Spacer for fixed header */}
      <div className="h-16" />

      <main id="main-content">
        <HeroSection />
        <SectionDivider />
        <ServicesSection />
        <SectionDivider />
        <ClaudeProjectsSection />
        <SectionDivider />
        <WebsitesSection />
        <TestimonialsSection />
        <SectionDivider />
        <FAQSection />
        <SectionDivider />
        <ContactSection />
        <SectionDivider />
      </main>
      <Footer />
    </GradientBackground>;
};
export default Index;
