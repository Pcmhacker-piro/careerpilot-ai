import { Link } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ScoreRing = ({ score }: { score: number }) => {
  const r = 28, sw = 5;
  const norm = r - sw / 2;
  const circ = 2 * Math.PI * norm;
  const offset = circ * (1 - score / 100);
  const color = score >= 70 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ position: "relative", width: 70, height: 70, flexShrink: 0 }}>
      <svg width="70" height="70" viewBox="0 0 70 70" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="35" cy="35" r={norm} stroke="#e2e8f0" strokeWidth={sw} fill="transparent" />
        <circle cx="35" cy="35" r={norm} stroke={color} strokeWidth={sw} fill="transparent" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.34,1.56,0.64,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "0.9rem", fontWeight: 800, color, fontFamily: "var(--font-display)", lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: "0.55rem", color: "var(--color-text-faint)", fontWeight: 500 }}>/100</span>
      </div>
    </div>
  );
};

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath, createdAt } }: { resume: Resume }) => {
  const { fs } = usePuterStore();
  const [imgUrl, setImgUrl] = useState("");
  const fb = typeof feedback === "object" ? feedback as Feedback : null;
  const score = fb?.overallScore ?? 0;
  const chipClass = score >= 70 ? "chip chip-good" : score >= 50 ? "chip chip-warn" : "chip chip-bad";
  const chipLabel = score >= 70 ? "Good" : score >= 50 ? "Average" : "Needs Work";

  useEffect(() => {
    if (!imagePath) return;
    fs.read(imagePath).then(blob => {
      if (blob) setImgUrl(URL.createObjectURL(blob));
    });
  }, [imagePath]);

  return (
    <Link to={`/report/${id}`} className="resume-card-cp" style={{ textDecoration: "none" }}>
      <div className="card-accent" />
      <div style={{ padding: "1.25rem 1.25rem 0.75rem" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.875rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: "1rem", color: "var(--color-text-base)", marginBottom: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {companyName || "Resume"}
            </h3>
            {jobTitle && <p style={{ fontSize: "0.825rem", color: "var(--color-text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{jobTitle}</p>}
            {createdAt && <p style={{ fontSize: "0.75rem", color: "var(--color-text-faint)", marginTop: "0.2rem" }}>{new Date(createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>}
          </div>
          <ScoreRing score={score} />
        </div>

        {/* Chip */}
        <span className={chipClass}>{chipLabel}</span>

        {/* Mini score bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.875rem" }}>
          {[
            { label: "ATS", val: fb?.ATS?.score ?? 0 },
            { label: "Content", val: fb?.content?.score ?? 0 },
            { label: "Skills", val: fb?.skills?.score ?? 0 },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--color-text-faint)", width: 42, flexShrink: 0 }}>{item.label}</span>
              <div className="progress-bar-track" style={{ height: 5 }}>
                <div className="progress-bar-fill" style={{ width: `${item.val}%` }} />
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--color-text-faint)", width: 24, textAlign: "right" }}>{item.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resume thumbnail */}
      {imgUrl && (
        <div style={{ borderTop: "1px solid var(--color-border)", overflow: "hidden", borderRadius: "0 0 0.9rem 0.9rem", height: 180 }}>
          <img src={imgUrl} alt="Resume" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
