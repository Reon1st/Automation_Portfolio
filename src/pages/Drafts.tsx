import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, User, Send, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Drafts = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await (supabase as any)
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });

      if (error) {
        console.error('Error saving contact form:', error);
        toast({
          title: "Error",
          description: "There was an error sending your message. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.3) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost"
            className="group hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-6 py-12 relative z-10">
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Draft Contact Form
          </h1>
          <p className="text-muted-foreground">
            This page is for testing and future use.
          </p>
        </div>

        {/* Contact Form */}
        <Card className="group hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 border-border/50 bg-card/90 backdrop-blur-sm hover:border-accent/30">
          <CardHeader className="space-y-4 pb-6 text-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/25 flex-shrink-0">
                <Mail className="h-6 w-6 text-accent group-hover:text-accent/90 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl group-hover:text-accent transition-colors duration-300">
                Send Message
              </CardTitle>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Have a specific project in mind? Drop me a detailed message about your automation needs, and I'll get back to you with a personalized solution.
            </p>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4" />
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-accent/20 h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-accent/20 h-12 text-base"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Project inquiry, automation needs, etc."
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-accent/20 h-12 text-base"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project requirements, current challenges, or how I can help..."
                  rows={6}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-accent/20 resize-none text-base min-h-[120px]"
                />
              </div>

              {/* Helpful Tips Section */}
              <div className="bg-muted/20 p-4 sm:p-6 rounded-xl space-y-4">
                <h4 className="text-base font-semibold text-accent flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  What to Include in Your Message:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Current challenges or manual processes you want to automate</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Your business type and size (e.g., e-commerce, service business)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Tools you're currently using (if any)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Your budget range and timeline expectations</span>
                  </div>
                </div>
              </div>

              {/* Response Time Info */}
              <div className="bg-accent/5 border border-accent/20 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-base font-medium text-accent">Response Time</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  I typically respond within 24 hours during business hours. For urgent projects, feel free to mention it in your message.
                </p>
              </div>
              
              {/* Privacy Policy Notice */}
              <div className="text-center text-sm text-muted-foreground">
                By submitting this form, you agree to our{" "}
                <a 
                  href="/privacy-policy" 
                  className="text-primary hover:text-primary/80 underline transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 hover:scale-[1.02] group text-base font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Drafts;
