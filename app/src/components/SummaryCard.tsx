import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryScore } from "@/types/seo";

interface SummaryCardProps {
  category: CategoryScore;
  onClick: () => void;
  className?: string;
}

function getStatusBadgeClass(passed: number, total: number): string {
  if (passed === total) return "status-badge-success";
  if (passed === 0) return "status-badge-error";
  return "status-badge-warning";
}

function getArrowCircleClass(passed: number, total: number): string {
  if (passed === total) return "arrow-circle-success";
  if (passed === 0) return "arrow-circle-error";
  return "arrow-circle-warning";
}

// SVG Triangle icons - larger per Figma spec (~16px)
function TriangleUp({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      className={className}
    >
      <path d="M8 0L15.7942 14H0.205771L8 0Z" fill="currentColor" />
    </svg>
  );
}

function TriangleDown({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      className={className}
    >
      <path d="M8 14L0.205771 0H15.7942L8 14Z" fill="currentColor" />
    </svg>
  );
}

export function SummaryCard({ category, onClick, className }: SummaryCardProps) {
  const statusBadgeClass = getStatusBadgeClass(category.passed, category.total);
  const arrowCircleClass = getArrowCircleClass(category.passed, category.total);

  return (
    <button
      onClick={onClick}
      className={cn(
        "summarybox-card w-full text-left transition-opacity hover:opacity-90",
        className
      )}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-text-primary"
          style={{ fontSize: "20px", fontWeight: 600, lineHeight: "120%" }}
        >
          {category.label}
        </span>
        <div className="flex items-center gap-2">
          <span className={statusBadgeClass}>
            {category.passed}/{category.total} passed
          </span>
          {/* Arrow circle - matches badge color, 35px, black icon */}
          <div className={arrowCircleClass}>
            <ArrowUpRight className="h-4 w-4 text-black" />
          </div>
        </div>
      </div>

      {/* Individual Check Items - all text #c7c7c7, 18px, line-height 130% */}
      <div className="flex flex-col gap-3">
        {category.checks.map((check) => (
          <div key={check.id} className="flex items-center gap-2">
            {check.status === "pass" ? (
              <TriangleUp className="text-green flex-shrink-0" />
            ) : (
              <TriangleDown className="text-red flex-shrink-0" />
            )}
            <span
              className="text-text-secondary"
              style={{ fontSize: "18px", lineHeight: "130%" }}
            >
              {check.title}
            </span>
          </div>
        ))}
      </div>
    </button>
  );
}
