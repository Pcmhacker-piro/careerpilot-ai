const LoadingSkeleton = () => {
  return (
    <div className="resume-card-cp" style={{ cursor: "default" }}>
      <div style={{ height: 4, background: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)", backgroundSize: "400px 100%", animation: "shimmer 1.4s ease infinite" }} />
      <div style={{ padding: "1.25rem" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ flex: 1, marginRight: "1rem" }}>
            <div className="skeleton" style={{ height: 18, width: "60%", marginBottom: "0.5rem" }} />
            <div className="skeleton" style={{ height: 14, width: "45%" }} />
          </div>
          <div className="skeleton" style={{ width: 70, height: 70, borderRadius: "50%", flexShrink: 0 }} />
        </div>
        {/* Chip */}
        <div className="skeleton" style={{ height: 22, width: 80, borderRadius: "999px", marginBottom: "1rem" }} />
        {/* Score bars */}
        {[1, 2, 3].map(i => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
            <div className="skeleton" style={{ width: 42, height: 10 }} />
            <div className="skeleton" style={{ flex: 1, height: 5 }} />
            <div className="skeleton" style={{ width: 20, height: 10 }} />
          </div>
        ))}
      </div>
      {/* Image placeholder */}
      <div className="skeleton" style={{ height: 120, borderRadius: 0, borderBottomLeftRadius: "0.9rem", borderBottomRightRadius: "0.9rem" }} />
    </div>
  );
};

export default LoadingSkeleton;
