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
        "inline-flex items-center rounded-full px-3 py-0.5 text-body-12 font-medium",
        status === "pass" && "bg-green/20 text-green",
        status === "fail" &&
          priority === "high" &&
          "bg-red/20 text-red",
        status === "fail" &&
          priority === "medium" &&
          "bg-yellow/20 text-yellow",
        status === "fail" &&
          priority === "low" &&
          "bg-yellow/20 text-yellow",
        status === "warning" && "bg-yellow/20 text-yellow",
        className,
      )}
    >
      {label}
    </span>
  );
}
