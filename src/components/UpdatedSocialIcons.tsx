// Updated Social Icons Component with new logos

export const UpworkIcon = ({ className }: { className?: string }) => (
  <img 
    src="/lovable-uploads/fd627429-3645-4e24-b4f8-5954bc98ce57.png" 
    alt="Upwork" 
    className={`${className} rounded object-contain`}
    width="20"
    height="20"
    loading="lazy"
    style={{ imageRendering: 'crisp-edges' }}
  />
);

export const LinkedInIcon = ({ className }: { className?: string }) => (
  <img 
    src="/lovable-uploads/5b9f301f-3336-484d-a477-551ffbe70393.png" 
    alt="LinkedIn" 
    className={`${className} rounded object-contain`}
    width="20"
    height="20"
    loading="lazy"
    style={{ imageRendering: 'crisp-edges' }}
  />
);