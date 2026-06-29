import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Templates", href: "/dashboard/templates" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Community", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Press", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
    { label: "GDPR", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { label: "Twitter", href: "#", icon: "𝕏" },
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "YouTube", href: "#", icon: "▶" },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-[17px] font-semibold tracking-tight">Estimator</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
              AI-powered estimation platform for modern project managers and delivery teams.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-sm font-semibold mb-4">{category}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Estimator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
