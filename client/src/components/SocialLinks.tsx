import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

/**
 * "Follow us" icons for the page footers. LinkedIn and X come first because
 * those are the profiles we are growing; the URLs match SOCIAL_PROFILES in
 * utils/seo.ts (the schema sameAs list) — change both together.
 */
const PROFILES = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/fox-systems", Icon: Linkedin },
  { label: "X", href: "https://x.com/Fox_systemsinfo", Icon: Twitter },
  { label: "Facebook", href: "https://www.facebook.com/share/1MgVxHhwoy/", Icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/fox_systems_", Icon: Instagram },
];

export default function SocialLinks({
  isArabic,
  tone = "dark",
  className = "",
}: {
  isArabic: boolean;
  /** "dark" for the navy footers, "light" for footers on a light background. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const icon =
    tone === "dark"
      ? "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
      : "bg-foreground/10 text-muted-foreground hover:bg-foreground/20 hover:text-foreground";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className={`text-sm ${tone === "dark" ? "text-white/50" : "text-muted-foreground"}`}>
        {isArabic ? "تابعنا" : "Follow us"}
      </span>
      {PROFILES.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={isArabic ? `فوكس سيستمز على ${label}` : `Fox Systems on ${label}`}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition ${icon}`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
