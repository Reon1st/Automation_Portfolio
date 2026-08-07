import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

const customerMessage = {
  from: "Client 4",
  body: "Hi AISystems, I seem to need an assistance of my purchase,\n\nAnd I'm curious what available hours of support are you available?\n\nPlease let me know\n\nty and best regards\n\ncustomer",
};

const aiReply = {
  from: "AI · billing@aisystem.dev",
  body: "Hi There,\n\nThanks for reaching out to AI System — happy to help with your purchase question.\n\nAs for support hours: our automated assistant is available 24/7, so you can get help anytime. Our human team is available Monday to Friday, 9am to 6pm, and if something gets escalated outside those hours, we'll follow up on the next business day.\n\nIn terms of response times, routine questions are usually answered instantly by our automated assistant, while anything that needs a closer look from a real person is picked up within one business day.\n\nIf this doesn't fully cover what you needed, just reply and we'll dig into it further.\n\nBest,\nAI System",
};

const citations = [
  {
    file: "general-support-faq.pdf",
    score: 0.81,
    excerpt:
      "What are your support hours? Our automated assistant is available 24/7. Our human team is available Monday to Friday, 9am to 6pm, and responds to anything escal…",
  },
  {
    file: "general-support-faq.pdf",
    score: 0.79,
    excerpt:
      "What are your support response times? Routine questions are typically answered instantly by our automated assistant. Anything that needs a closer look from a re…",
  },
  {
    file: "general-support-faq.pdf",
    score: 0.75,
    excerpt:
      "Do you offer phone support? Not currently — email is the fastest way to reach us, since it lets our automated assistant answer instantly for common questions.",
  },
  {
    file: "general-support-faq.pdf",
    score: 0.75,
    excerpt:
      "How do I submit a support request? Just reply to any of our emails or send a new message to our support inbox — our team monitors it continuously and most quest…",
  },
  {
    file: "general-support-faq.pdf",
    score: 0.72,
    excerpt:
      "How do I update my account or contact information? Reply to our support email with your updated details (name, email, phone, or billing contact) and we'll confi…",
  },
];

const SupportReplyInteractive: React.FC = () => {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 via-card/60 to-accent/5 p-4 space-y-3">
      <div className="rounded-md border border-border/40 bg-background/60 p-3">
        <div className="text-[11px] text-muted-foreground mb-1.5">{customerMessage.from}</div>
        <p className="text-xs whitespace-pre-line leading-relaxed text-foreground/80">{customerMessage.body}</p>
      </div>

      <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
        <div className="text-[11px] text-primary mb-1.5 font-medium">{aiReply.from}</div>
        <p className="text-xs whitespace-pre-line leading-relaxed text-foreground/90">{aiReply.body}</p>

        <button
          onClick={() => setShowWhy((v) => !v)}
          className="flex items-center gap-1 mt-3 pt-2 border-t border-border/30 text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors w-full"
        >
          {showWhy ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          Why this reply
        </button>

        {showWhy && (
          <div className="mt-3 space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground">Confidence</span>
              <div className="flex-grow h-1.5 rounded-full bg-muted-foreground/15 overflow-hidden max-w-[100px]">
                <div className="h-full bg-accent" style={{ width: "81%" }} />
              </div>
              <span className="text-[11px] font-semibold text-accent">High</span>
            </div>
            <p className="text-[11px] italic text-muted-foreground">
              Matched "general-support-faq.pdf" with similarity 0.81
            </p>
            <div className="space-y-1.5">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Citations</div>
              {citations.map((c, i) => (
                <div key={i} className="rounded border border-border/30 bg-background/40 p-2">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                    <span className="font-mono">{c.file}</span>
                    <span>Match {c.score}</span>
                  </div>
                  <p className="text-[11px] text-foreground/80 leading-snug">{c.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportReplyInteractive;
