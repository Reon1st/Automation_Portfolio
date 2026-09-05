import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowLeft } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SITE_CONFIG } from "@/lib/constants";

// Char codes instead of a literal string so the address isn't a plain,
// grep-able token for bots scanning the built page/bundle for emails.
const EMAIL_CODES = [114, 101, 111, 110, 102, 105, 114, 115, 116, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contactEmail = useMemo(() => String.fromCharCode(...EMAIL_CODES), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Mobile-Optimized Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3">
          {/* Mobile Layout */}
          <div className="flex items-center justify-between md:hidden">
            <Button 
              size="sm"
              onClick={() => navigate('/')}
              className="group bg-primary hover:bg-primary/90 text-black hover:text-black border-0 shadow-md hover:shadow-lg transition-all duration-300 font-medium p-2"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
              <span className="text-sm">Back</span>
            </Button>
            <h1 className="text-base font-medium text-primary">Privacy Policy</h1>
            <div className="w-16"></div> {/* Spacer for mobile */}
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <Button 
              onClick={() => navigate('/')}
              className="group bg-primary hover:bg-primary/90 text-black hover:text-black border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Portfolio</span>
            </Button>
            <h1 className="text-lg font-medium text-primary tracking-wide">Privacy Policy</h1>
            <div className="w-[140px]"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      {/* Mobile-Optimized Hero Header */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground px-2">
              Privacy Policy
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              Your privacy and data security are my highest priorities. Learn how I protect and handle your information with complete transparency.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
        
        {/* Overview Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>My Commitment to Your Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              I am personally committed to protecting your privacy and ensuring the security of your personal information. 
              This privacy policy explains how I collect, use, and safeguard your data when you use my contact form 
              and scheduling services. I operate with full transparency and only collect information necessary to 
              provide you with excellent automation consulting services.
            </p>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card>
          <CardHeader>
            <CardTitle>Information I Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Contact Form Information:</h4>
              <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                <li><strong>Name:</strong> To personalize our communication and address you properly in all correspondence</li>
                <li><strong>Email Address:</strong> To respond to your inquiries and follow up on our automation consulting discussions</li>
                <li><strong>Subject & Message:</strong> To understand your specific automation needs and provide relevant, tailored assistance</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card>
          <CardHeader>
            <CardTitle>How I Protect Your Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800/30">
                <h5 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">Secure Infrastructure</h5>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Your data is stored securely using Supabase's enterprise-grade infrastructure with bank-level encryption,
                  automatic backups, and 99.9% uptime guarantees. All data transmission is encrypted using TLS 1.3.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800/30">
                <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Data Access Control</h5>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Access to your information is strictly limited to me personally and only for the purpose 
                  of responding to your inquiries and providing the automation consulting services you've requested.
                </p>
              </div>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">
                <strong>Processing Location:</strong> Your data is processed and stored in secure data centers 
                managed by Supabase (AWS infrastructure) with compliance to GDPR, SOC 2, and other international data protection standards.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Usage */}
        <Card>
          <CardHeader>
            <CardTitle>How I Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800/30">
                <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Primary Purpose</h5>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Your information is used exclusively to communicate with you about your automation project inquiries,
                  provide consultation services, schedule meetings, and deliver the custom automation solutions you've requested.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-200 dark:border-red-800/30">
                <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">What I DON'T Do With Your Data</h5>
                <ul className="text-red-600 dark:text-red-400 text-sm space-y-2 list-disc pl-5">
                  <li>Sell, rent, or share your information with any third parties for marketing purposes</li>
                  <li>Use your data for unsolicited marketing campaigns or newsletters without explicit consent</li>
                  <li>Track your browsing behavior across other websites or build user profiles</li>
                  <li>Store payment information (all payments are handled by secure, PCI-compliant processors)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card>
          <CardHeader>
            <CardTitle>Third-Party Services I Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg">
              <h5 className="font-semibold text-foreground mb-2">Cal.com (Scheduling Service)</h5>
              <p className="text-muted-foreground text-sm mb-2">
                When you schedule a consultation through my embedded calendar, your booking information 
                is processed by Cal.com under their privacy policy. I chose Cal.com specifically for their commitment to data privacy.
              </p>
              <a 
                href="https://cal.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary text-sm font-medium underline"
              >
                View Cal.com Privacy Policy →
              </a>
            </div>
            
            <div className="p-4 rounded-lg">
              <h5 className="font-semibold text-foreground mb-2">Supabase (Database & Security)</h5>
              <p className="text-muted-foreground text-sm mb-2">
                Contact form submissions are securely stored using Supabase's infrastructure, 
                which complies with GDPR, SOC 2, and other international data protection regulations. 
                I selected Supabase for their enterprise-grade security and transparency.
              </p>
              <a 
                href="https://supabase.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary text-sm font-medium underline"
              >
                View Supabase Privacy Policy →
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card>
          <CardHeader>
            <CardTitle>Your Rights & Control Over Your Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3 p-4 rounded-lg">
                <h5 className="font-semibold text-foreground">You Have the Right To:</h5>
                <ul className="space-y-2 text-muted-foreground text-sm list-disc pl-5">
                  <li>Request access to all your personal data I have collected</li>
                  <li>Correct or update your information at any time</li>
                  <li>Request complete deletion of your data (right to be forgotten)</li>
                  <li>Withdraw consent at any time for future communications</li>
                  <li>Request data portability in a machine-readable format</li>
                </ul>
              </div>
              <div className="space-y-3 p-4 rounded-lg">
                <h5 className="font-semibold text-foreground">Data Retention Policy:</h5>
                <ul className="space-y-2 text-muted-foreground text-sm list-disc pl-5">
                  <li>Contact submissions: Kept for 2 years for business continuity and project follow-ups</li>
                  <li>Data deleted immediately upon verified request or end of retention period</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-accent">Questions About Your Privacy?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this privacy policy, want to exercise your data rights, 
              or have concerns about how I handle your information, please don't hesitate to contact me personally:
            </p>
            <div className="bg-background/50 p-4 rounded-lg">
              <p className="text-foreground font-medium">Privacy & Data Protection Inquiries</p>
              <p className="text-muted-foreground text-sm mt-2">
                Email: <a href={`mailto:${contactEmail}`} className="text-primary underline">{contactEmail}</a><br/>
                {SITE_CONFIG.responseTime}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="bg-muted/20">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-foreground mb-2">Policy Updates & Transparency</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              I may update this privacy policy occasionally to reflect changes in my practices, new features, or legal requirements.
              Any significant changes will be communicated directly via email to users who have provided contact information,
              with at least 30 days notice for major changes. The "Last Updated" date at the top of this page indicates when
              the policy was most recently revised. I believe in complete transparency about how your data is handled.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Back to Top Button with Smooth Fade Animation */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg z-40 transform transition-all duration-300 ease-in-out ${
          showBackToTop 
            ? 'opacity-100 scale-100 pointer-events-auto' 
            : 'opacity-0 scale-75 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default PrivacyPolicy;