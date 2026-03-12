import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/Badge";
import type { SEOCheck } from "@/types/seo";

interface CheckItemProps {
  check: SEOCheck;
  className?: string;
  children?: React.ReactNode;
}

export function CheckItem({ check, className, children }: CheckItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("rounded-card bg-bg-700 overflow-hidden", className)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <Badge status={check.status} priority={check.priority} />
          <span className="text-body-16 text-text-primary">{check.title}</span>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-text-secondary" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text-secondary" />
        )}
      </button>
      {expanded && (
        <div className="border-t border-bg-500 px-4 pb-4 pt-3">
          <p className="text-body-12 text-text-secondary">{check.description}</p>
          {check.details && (
            <p className="mt-2 text-body-12 text-text-secondary italic">
              {check.details}
            </p>
          )}
          {check.learnMoreUrl && (
            <a
              href={check.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-body-12 text-accent-blue hover:underline"
            >
              Learn More <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
