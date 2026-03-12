import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { SummaryCard } from "@/components/SummaryCard";
import { Footer } from "@/components/Footer";
import { useStore } from "@/lib/store";
import type { CheckCategory } from "@/types/seo";

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
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 p-6">
        <button
          onClick={reset}
          className="mb-4 flex items-center gap-2 text-body-16 text-text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          New Analysis
        </button>

        <div className="flex flex-col items-center gap-4">
          <ScoreGauge score={analysis.overallScore} />
          <div className="text-center">
            <h2 className="text-h2 text-text-primary">{analysis.scoreLabel}</h2>
            <p className="mt-1 text-body-16 text-text-secondary">
              {analysis.scoreDescription}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-body-16 text-green">
              <span className="inline-block w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-current" />
              {analysis.totalPassed} passed
            </span>
            <span className="flex items-center gap-1.5 text-body-16 text-red">
              <span className="inline-block w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-current" />
              {analysis.totalFailed} to improve
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <h3 className="text-body-12 uppercase tracking-wider text-text-secondary">
            Analysis Results
          </h3>
          {analysis.categories.map((cat) => (
            <SummaryCard
              key={cat.category}
              category={cat}
              onClick={() => handleCategoryClick(cat.category)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
