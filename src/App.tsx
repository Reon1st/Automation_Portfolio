import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Index from "./pages/Index";
import About from "./pages/About";
import Admin from "./pages/Admin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Testimonials from "./pages/Testimonials";
import Drafts from "./pages/Drafts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// The generic /react import (correct for this Vite SPA) doesn't auto-detect the route the way
// Next.js/Remix/etc. do, so every event buckets as "Unknown" in the dashboard unless we pass it.
const SpeedInsightsRoute = () => {
  const location = useLocation();
  return <SpeedInsights route={location.pathname} />;
};

const App = () => {
  useSmoothScroll();
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/drafts" element={<Drafts />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SpeedInsightsRoute />
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
