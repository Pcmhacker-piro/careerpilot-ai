import React from "react";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATSPanel: React.FC<ATSProps> = ({ score, suggestions }) => {
  const color = score >= 70 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const bg = score >= 70 ? "#dcfce7" : score >= 50 ? "#fef9c3" : "#fee2e2";
  const label = score >= 70 ? "ATS Optimized" : score >= 50 ? "Needs Improvement" : "Poor ATS Fit";
  const icon = score >= 70 ? "✓" : score >= 50 ? "⚠" : "✗";

  return (
    <div className="card animate-fade-in" style={{ overflow: "hidden" }}>
      {/* Score banner */}
      <div style={{ background: bg, padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: color, display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: "1.1rem", flexShrink: 0 }}>{icon}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-text-base)" }}>ATS Compatibility Score</div>
            <div style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>{label}</div>
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color, lineHeight: 1 }}>
          {score}<span style={{ fontSize: "1rem", color: "var(--color-text-faint)" }}>/100</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "1rem 1.5rem 0.25rem" }}>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${score}%`, background: color }} />
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: "0.75rem 1.5rem" }}>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.65 }}>
          This score reflects how well your resume is likely to perform in Applicant Tracking Systems used by employers. Higher scores improve your chances of reaching human recruiters.
        </p>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div style={{ padding: "0 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>Suggestions</p>
          {suggestions.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", padding: "0.625rem 0.875rem", borderRadius: "0.625rem", background: s.type === "good" ? "#dcfce7" : "#fef9c3" }}>
              <span style={{ fontSize: "0.9rem", flexShrink: 0, marginTop: 1 }}>{s.type === "good" ? "✓" : "⚠"}</span>
              <p style={{ fontSize: "0.875rem", color: s.type === "good" ? "#166534" : "#854d0e", lineHeight: 1.55 }}>{s.tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ATSPanel;
