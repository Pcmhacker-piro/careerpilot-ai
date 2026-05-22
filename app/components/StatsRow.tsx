interface StatsRowProps {
  total: number;
  avgScore: number;
  bestScore: number;
}

const StatCard = ({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) => (
  <div className="stat-card">
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
      <span style={{ fontSize: "1.1rem" }}>{icon}</span>
      <span style={{ fontSize: "0.775rem", fontWeight: 600, color: "var(--color-text-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
    </div>
    <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)", color, lineHeight: 1 }}>{value}</div>
  </div>
);

const StatsRow = ({ total, avgScore, bestScore }: StatsRowProps) => {
  const avgColor = avgScore >= 70 ? "#22c55e" : avgScore >= 50 ? "#f59e0b" : "#ef4444";
  const bestColor = bestScore >= 70 ? "#22c55e" : bestScore >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="stats-grid animate-fade-in">
      <StatCard label="Resumes Analyzed" value={total} icon="📄" color="var(--color-brand-600)" />
      <StatCard label="Average Score" value={`${avgScore}/100`} icon="📊" color={avgColor} />
      <StatCard label="Best Score" value={`${bestScore}/100`} icon="🏆" color={bestColor} />
    </div>
  );
};

export default StatsRow;
