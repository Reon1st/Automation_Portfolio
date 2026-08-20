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
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-16" />

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
      <Footer />
    </GradientBackground>;
};
export default Index;
