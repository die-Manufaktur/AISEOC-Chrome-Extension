import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { SummaryCard } from "@/components/SummaryCard";
import { Footer } from "@/components/Footer";
import { useStore } from "@/lib/store";
import type { CheckCategory } from "@/types/seo";

// SVG Triangle icons - larger and more prominent per Figma spec
function TriangleUpIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      className={className}
    >
      <path d="M7 0L13.9282 12H0.0717969L7 0Z" fill="currentColor" />
    </svg>
  );
}

function TriangleDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      className={className}
    >
      <path d="M7 12L0.0717969 0H13.9282L7 12Z" fill="currentColor" />
    </svg>
  );
}

export function ScorePage() {
  const { analysis, setActiveCategory, reset } = useStore();
  const confettiFired = useRef(false);

  useEffect(() => {
    if (analysis && analysis.overallScore >= 70 && !confettiFired.current) {
      confettiFired.current = true;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [analysis]);

  if (!analysis) return null;

  const handleCategoryClick = (category: CheckCategory) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-bg-900 p-4">
      {/* Score Frame Container */}
      <div className="score-frame w-full p-6 flex flex-col gap-6">
        {/* Back Button */}
        <button
          onClick={reset}
          className="flex items-center gap-2 text-body-16 text-text-secondary hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          New Analysis
        </button>

        {/* Score Circle Area */}
        <div className="score-circle-card flex flex-col items-center gap-6">
          <ScoreGauge score={analysis.overallScore} />
          <div className="text-center">
            <h2 className="text-h2 text-text-primary">{analysis.scoreLabel}</h2>
            {/* Description: 18px, line-height 130%, text-secondary */}
            <p
              className="mt-1 text-text-secondary"
              style={{ fontSize: "18px", lineHeight: "130%" }}
            >
              {analysis.scoreDescription}
            </p>
          </div>

          {/* Passed/To-Improve Summary Bar - pill container, white text */}
          <div className="summary-pill">
            <span className="flex items-center gap-2 text-white">
              <TriangleUpIcon className="text-green" />
              <span style={{ fontSize: "16px" }}>{analysis.totalPassed} passed</span>
            </span>
            <span className="flex items-center gap-2 text-white">
              <TriangleDownIcon className="text-red" />
              <span style={{ fontSize: "16px" }}>{analysis.totalFailed} to improve</span>
            </span>
          </div>
        </div>

        {/* Summary Cards - No section header per Figma spec */}
        <div className="flex flex-col gap-3">
          {analysis.categories.map((cat) => (
            <SummaryCard
              key={cat.category}
              category={cat}
              onClick={() => handleCategoryClick(cat.category)}
            />
          ))}
        </div>

        {/* Footer inside the score frame */}
        <Footer />
      </div>
    </div>
  );
}
