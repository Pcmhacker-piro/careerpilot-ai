import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  return (
    <header className="cp-navbar">
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
        <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#6366f1,#4f46e5)", borderRadius: "0.5rem", display: "grid", placeItems: "center", fontSize: "1rem" }}>⚡</div>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", background: "linear-gradient(135deg,#6366f1,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CareerPilot AI</span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
        <Link to="/dashboard" className="btn-ghost" style={{ fontSize: "0.875rem" }}>Dashboard</Link>
        <Link to="/analyze" className="btn-ghost" style={{ fontSize: "0.875rem" }}>Analyze</Link>
        <Link to="/settings" className="btn-ghost" style={{ fontSize: "0.875rem" }}>Settings</Link>
      </nav>

      {/* User / CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {auth.isAuthenticated ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#06b6d4)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>
                {auth.user?.username?.[0]?.toUpperCase() || "P"}
              </div>
              <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-muted)", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {auth.user?.username}
              </span>
            </div>
            <Link to="/analyze" className="btn-primary" style={{ padding: "0.5rem 1.1rem", fontSize: "0.875rem" }}>
              + Analyze
            </Link>
          </>
        ) : (
          <Link to="/auth?next=/dashboard" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
