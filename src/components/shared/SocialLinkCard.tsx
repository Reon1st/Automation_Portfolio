import React from "react";

interface SocialLinkCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  external?: boolean;
}

/**
 * Reusable social/contact link card component.
 * Consistent styling for footer and contact sections.
 */
const SocialLinkCard: React.FC<SocialLinkCardProps> = ({
  href,
  icon,
  title,
  description,
  external = true,
}) => {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 p-4 rounded-xl bg-card/50 hover:bg-card/80 border border-primary/30 hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
        {icon}
      </div>
      <div>
        <p className="font-medium text-primary group-hover:text-primary/80 transition-colors">
          {title}
        </p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </a>
  );
};

export default SocialLinkCard;
