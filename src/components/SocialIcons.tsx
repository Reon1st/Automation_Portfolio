// Custom Social Icons Component

export const UpworkIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="#14a800"/>
    <path d="M8.5 7.5c-1.5 0-2.5 1-2.5 2.5v4c0 1.5 1 2.5 2.5 2.5h1v-2h-1c-.5 0-1-.5-1-1v-3c0-.5.5-1 1-1h1V7.5h-1zm3.5 0v3h1v-1.5c0-.5.5-1 1-1h1c.5 0 1 .5 1 1V14c0 .5-.5 1-1 1h-1v2h1c1.5 0 2.5-1 2.5-2.5v-4c0-1.5-1-2.5-2.5-2.5h-3z" fill="white"/>
  </svg>
);

export const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="#0077b5"/>
    <path d="M6.5 8.5h2v7h-2v-7zm1-3c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4 3h2v1h.1c.3-.6 1-1 2-1 2.1 0 2.5 1.4 2.5 3.2v3.8h-2v-3.4c0-.7 0-1.6-1-1.6s-1.1.8-1.1 1.6v3.4h-2v-7z" fill="white"/>
  </svg>
);

export const EmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#ea4335"/>
    <path d="M6 8l6 4 6-4v8H6V8zm0-1h12c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V8c0-.6.4-1 1-1z" fill="white"/>
    <path d="M12 13L6 9h12l-6 4z" fill="#ea4335"/>
  </svg>
);