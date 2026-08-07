import AutomationFlowAnimation from "@/components/AutomationFlowAnimation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ClaudeProjectsSection from "@/components/sections/portfolio/ClaudeProjectsSection";
import WebsitesSection from "@/components/sections/portfolio/WebsitesSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
const Index = () => {
  return <div className="min-h-screen gradient-bg dark relative">
      <AutomationFlowAnimation />
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="h-16" />
      
      <HeroSection />
      <ServicesSection />
      <ClaudeProjectsSection />
      <WebsitesSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>;
};
export default Index;