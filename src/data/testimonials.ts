export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  platform?: string;
  platform_url?: string;
  avatar_url?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Operations Manager",
    company: "Pete's Coffee",
    text: "Reon set up a Zapier automation that connects our online orders to our inventory system. It eliminated hours of manual work and we haven't had a stock-out since.",
    rating: 5,
    platform: "manual"
  },
  {
    name: "Michael Chen",
    role: "Digital Strategist",
    company: "Dreamery",
    text: "The WordPress website Reon built for me is exactly what I needed - clean, fast, and easy for me to update myself. He explained everything in simple terms.",
    rating: 5,
    platform: "manual"
  },
  {
    name: "Emma Rodriguez",
    role: "Partner",
    company: "Hansom Horses",
    text: "Reon created a Make.com workflow that automatically sends follow-up emails to leads and updates our CRM. Our response time improved dramatically.",
    rating: 5,
    platform: "manual"
  },
  {
    name: "David Park",
    role: "Founder",
    company: "Circle Flow",
    text: "The automation Reon built processes our orders, sends tracking info, and handles returns automatically. It saves us 20+ hours every week.",
    rating: 5,
    platform: "manual"
  },
  {
    name: "Jessica Miller",
    role: "Investment Director",
    company: "Anthro Capital",
    text: "Reon set up GoHighLevel automations for our class bookings and reminders. Our no-show rate dropped by 60% and clients love the smooth experience.",
    rating: 5,
    platform: "manual"
  }
];
