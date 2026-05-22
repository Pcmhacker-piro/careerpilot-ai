import { useEffect, useRef } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const color = score >= 70 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const percentage = score / 100;

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.34,1.2,0.64,1)";
      path.style.strokeDashoffset = `${len * (1 - percentage)}`;
    });
  }, [percentage]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
      <div style={{ position: "relative", width: 120, height: 66 }}>
        <svg viewBox="0 0 100 55" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="gaugeTrack" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
          <path ref={pathRef} d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: "0.25rem" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: 800, color, fontFamily: "var(--font-display)", lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: "0.65rem", color: "var(--color-text-faint)" }}>/ 100</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
