import ScoreGauge from "~/components/ScoreGauge";

const CategoryRow = ({ title, score }: { title: string; score: number }) => {
  const color = score >= 70 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const chipClass = score >= 70 ? "chip chip-good" : score >= 50 ? "chip chip-warn" : "chip chip-bad";

  return (
    <div style={{ padding: "0.875rem 1.25rem", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "0.5rem" }}>
        <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-text-base)" }}>{title}</span>
        <span className={chipClass}>{score}/100</span>
      </div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  );
};

const ResumeScore = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="card animate-fade-in">
      {/* Gauge + headline */}
      <div style={{ padding: "1.5rem 1.25rem 1rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <ScoreGauge score={feedback.overallScore} />
        <div>
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.2rem" }}>Overall Resume Score</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
            Calculated across tone, content, structure, and skills.
          </p>
        </div>
      </div>
      {/* Category breakdowns */}
      <CategoryRow title="Tone & Style" score={feedback.toneAndStyle.score} />
      <CategoryRow title="Content Quality" score={feedback.content.score} />
      <CategoryRow title="Structure" score={feedback.structure.score} />
      <CategoryRow title="Skills Match" score={feedback.skills.score} />
    </div>
  );
};

export default ResumeScore;
