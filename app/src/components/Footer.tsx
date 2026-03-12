import { BookOpen, Lightbulb, Bug, Mail } from "lucide-react";

const links = [
  { label: "Documentation", icon: BookOpen, href: "#" },
  { label: "Feature requests", icon: Lightbulb, href: "#" },
  { label: "Report a bug", icon: Bug, href: "#" },
  { label: "Contact us", icon: Mail, href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-bg-500 px-4 py-3">
      <div className="flex items-center justify-between">
        {links.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-body-12 text-text-secondary hover:text-white transition-colors"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
