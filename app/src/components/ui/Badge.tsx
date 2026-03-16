import { cn } from "@/lib/utils";
import type { CheckStatus, CheckPriority } from "@/types/seo";

interface BadgeProps {
  status: CheckStatus;
  priority?: CheckPriority;
  className?: string;
}

export function Badge({ status, priority, className }: BadgeProps) {
  const label =
    status === "pass"
      ? "Passed"
      : priority === "high"
        ? "High Priority"
        : priority === "medium"
          ? "Medium"
          : "Low Priority";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[27px] border border-white/40 px-2 py-1 text-[12px] leading-[1.3] text-black whitespace-nowrap",
        status === "pass" && "bg-green",
        status === "fail" && priority === "high" && "bg-[#ff8484]",
        status === "fail" && priority === "medium" && "bg-[#ffea9e]",
        status === "fail" && priority === "low" && "bg-[#ffea9e]",
        status === "warning" && "bg-[#ffea9e]",
        className,
      )}
    >
      {label}
    </span>
  );
}
