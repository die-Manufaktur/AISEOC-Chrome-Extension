import { cn } from "@/lib/utils";
import { Badge } from "./ui/Badge";
import type { SEOCheck } from "@/types/seo";

// Triangle icons matching the score page
function TriangleUpIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" className={className}>
      <path d="M7 0L13.9282 12H0.0717969L7 0Z" fill="currentColor" />
    </svg>
  );
}

function TriangleDownIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" className={className}>
      <path d="M7 12L0.0717969 0H13.9282L7 12Z" fill="currentColor" />
    </svg>
  );
}

interface CheckItemProps {
  check: SEOCheck;
  className?: string;
  children?: React.ReactNode;
}

export function CheckItem({ check, className, children }: CheckItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-bg-500 py-6",
        className,
      )}
    >
      {/* Header row: icon + title + badge */}
      <div className="flex items-center gap-3">
        {check.status === "pass" ? (
          <TriangleUpIcon className="h-[14px] w-[14px] flex-shrink-0 text-green" />
        ) : (
          <TriangleDownIcon className="h-[14px] w-[14px] flex-shrink-0 text-red" />
        )}
        <span className="text-[20px] font-semibold leading-[1.2] text-text-primary">
          {check.title}
        </span>
        <Badge status={check.status} priority={check.priority} />
      </div>

      {/* Details text + Learn More */}
      {check.details && (
        <p className="text-[18px] leading-[1.3] text-text-secondary">
          {check.details}
          {check.learnMoreUrl && (
            <>
              {"  "}
              <a
                href={check.learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-text-primary hover:underline"
              >
                Learn More &#8599;
              </a>
            </>
          )}
        </p>
      )}

      {/* Recommendation content (AI suggestions, schema, etc.) */}
      {children}
    </div>
  );
}
