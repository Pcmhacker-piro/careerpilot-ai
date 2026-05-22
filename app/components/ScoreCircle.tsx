const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 28;
  const stroke = 5;
  const norm = radius - stroke / 2;
  const circ = 2 * Math.PI * norm;
  const offset = circ * (1 - score / 100);
  const color = score >= 70 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ position: "relative", width: 66, height: 66 }}>
      <svg width="66" height="66" viewBox="0 0 66 66" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="33" cy="33" r={norm} stroke="#e2e8f0" strokeWidth={stroke} fill="transparent" />
        <circle
          cx="33" cy="33" r={norm}
          stroke={color}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.34,1.2,0.64,1)" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "1rem", fontWeight: 800, color, fontFamily: "var(--font-display)", lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: "0.55rem", color: "var(--color-text-faint)" }}>/100</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
