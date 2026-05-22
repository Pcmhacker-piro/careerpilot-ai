import { useState } from "react";

interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

const CategorySection = ({ title, score, tips }: { title: string; score: number; tips: Tip[] }) => {
  const [open, setOpen] = useState(false);
  const chipClass = score >= 70 ? "chip chip-good" : score >= 50 ? "chip chip-warn" : "chip chip-bad";

  return (
    <div className="cp-accordion-item" data-open={open.toString()}>
      <button className="cp-accordion-trigger" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-text-base)" }}>{title}</span>
          <span className={chipClass}>{score}/100</span>
        </div>
        <span style={{ fontSize: "1.25rem", color: "var(--color-brand-500)", transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0)", flexShrink: 0 }}>⌄</span>
      </button>
      {open && (
        <div className="cp-accordion-content animate-fade-in">
          {/* Quick overview grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
            {tips.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "0.4rem", alignItems: "center", padding: "0.5rem 0.75rem", borderRadius: "0.5rem", background: "var(--color-surface-3)" }}>
                <span style={{ fontSize: "0.85rem", flexShrink: 0 }}>{t.type === "good" ? "✓" : "⚠"}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: 1.4 }}>{t.tip}</span>
              </div>
            ))}
          </div>
          {/* Detailed explanations */}
          {tips.map((t, i) => (
            <div key={`detail-${i}`} style={{ padding: "0.875rem 1rem", borderRadius: "0.75rem", border: `1px solid ${t.type === "good" ? "#bbf7d0" : "#fde68a"}`, background: t.type === "good" ? "#f0fdf4" : "#fffbeb", marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "0.9rem" }}>{t.type === "good" ? "✅" : "💡"}</span>
                <span style={{ fontWeight: 700, fontSize: "0.875rem", color: t.type === "good" ? "#166534" : "#854d0e" }}>{t.tip}</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: t.type === "good" ? "#15803d" : "#92400e", lineHeight: 1.6, marginLeft: "1.4rem" }}>{t.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FeedbackDetails = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="animate-fade-in">
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text-base)", marginBottom: "0.875rem" }}>Detailed Feedback</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <CategorySection title="Tone & Style" score={feedback.toneAndStyle.score} tips={feedback.toneAndStyle.tips} />
        <CategorySection title="Content Quality" score={feedback.content.score} tips={feedback.content.tips} />
        <CategorySection title="Structure" score={feedback.structure.score} tips={feedback.structure.tips} />
        <CategorySection title="Skills Match" score={feedback.skills.score} tips={feedback.skills.tips} />
      </div>
    </div>
  );
};

export default FeedbackDetails;
