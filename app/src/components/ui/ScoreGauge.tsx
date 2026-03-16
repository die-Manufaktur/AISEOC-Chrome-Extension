import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function getScoreTierColor(score: number): string {
  if (score >= 70) return "#A2FFB4"; // Green
  if (score >= 40) return "#FFDD64"; // Yellow
  return "#FF4343"; // Red
}

export function ScoreGauge({
  score,
  size = 244,
  strokeWidth = 12,
  className,
}: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  const tierColor = getScoreTierColor(score);

  useEffect(() => {
    let frame: number;
    const duration = 1000;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90" style={{ overflow: "visible" }}>
        {/* Background track circle - BG 300 (#787878), no rounded ends */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#787878"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />
        {/* Glow effect layer - blurred arc behind the main arc, subtle opacity */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tierColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: "blur(5px)", opacity: 0.6 }}
          className="transition-all duration-1000 ease-out"
        />
        {/* Main score arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tierColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        {/* Score number - 60px, bold, tier color */}
        <span
          className="font-bold"
          style={{ fontSize: "60px", lineHeight: 1, color: tierColor }}
        >
          {displayScore}
        </span>
        {/* SEO Score label - 16px, 600 weight, white */}
        <span
          className="font-semibold text-white"
          style={{ fontSize: "16px" }}
        >
          SEO Score
        </span>
      </div>
    </div>
  );
}
