import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryScore } from "@/types/seo";

interface SummaryCardProps {
  category: CategoryScore;
  onClick: () => void;
  className?: string;
}

export function SummaryCard({ category, onClick, className }: SummaryCardProps) {
  const failed = category.total - category.passed;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-card bg-bg-700 p-4 text-left transition-colors hover:bg-bg-500",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-body-semibold text-text-primary">
          {category.label}
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-body-12 text-green">
            <span className="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-current" />
            {category.passed} passed
          </span>
          {failed > 0 && (
            <span className="flex items-center gap-1 text-body-12 text-red">
              <span className="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-current" />
              {failed} to improve
            </span>
          )}
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-text-secondary" />
    </button>
  );
}
