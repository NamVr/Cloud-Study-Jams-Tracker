import Link from "next/link";
import { Mail, Globe, Instagram, Linkedin, X, Link2 as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const socialLinks = [
    { name: "Email", icon: Mail, href: "mailto:gdsc@cumail.in" },
    { name: "Linktree", icon: LinkIcon, href: "https://linktr.ee/gdg.cu" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/gdg.cu" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/gdgcu" },
    { name: "Website", icon: Globe, href: "https://gdg.community.dev/gdg-on-campus-chandigarh-university-chandigarh-india/" },
    { name: "X", icon: X, href: "https://x.com/gdg_cu" },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container flex flex-col items-center justify-center gap-4 py-10 text-center">
        <h3 className="text-2xl font-bold tracking-tight">Have Questions or Feedback?</h3>
        <p className="text-muted-foreground">
          We'd love to hear from you. Connect with us through our official channels.
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap justify-center">
            {socialLinks.map(({ name, icon: Icon, href }) => (
                <Button key={name} variant="ghost" size="icon" asChild>
                    <Link href={href} aria-label={name} target="_blank">
                    <Icon className="h-5 w-5" />
                    </Link>
                </Button>
            ))}
        </div>
      </div>
    </footer>
  );
}
