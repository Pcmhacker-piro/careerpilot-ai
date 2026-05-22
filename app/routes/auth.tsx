import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router";

export const meta = () => ([
  { title: "CareerPilot AI | Sign In" },
  { name: "description", content: "Sign in to access your CareerPilot AI dashboard and start analyzing your resume." },
]);

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1] || "/dashboard";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <div className="auth-wrap">
      <div style={{ width: "100%", maxWidth: 480 }}>
        {/* Card */}
        <div className="glass-card" style={{ padding: "2.75rem 2.5rem" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#6366f1,#4f46e5)", borderRadius: "0.625rem", display: "grid", placeItems: "center", fontSize: "1.25rem" }}>⚡</div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", background: "linear-gradient(135deg,#6366f1,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CareerPilot AI</span>
            </div>
            <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem", color: "var(--color-text-base)" }}>Welcome Back</h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>Sign in to continue your career journey</p>
          </div>

          {/* Benefits list */}
          <div style={{ background: "var(--color-brand-50)", borderRadius: "0.875rem", padding: "1.25rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              "AI-powered resume analysis",
              "Instant ATS compatibility score",
              "Skill gap & career insights",
              "Unlimited resume history",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "center", fontSize: "0.875rem", color: "var(--color-brand-700)" }}>
                <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span> {item}
              </div>
            ))}
          </div>

          {/* Auth button */}
          {isLoading ? (
            <button className="btn-primary animate-pulse-glow" style={{ width: "100%", justifyContent: "center", padding: "0.9rem", fontSize: "1rem" }} disabled>
              <div className="spinner" />
              Signing you in...
            </button>
          ) : auth.isAuthenticated ? (
            <button className="btn-danger" style={{ width: "100%", justifyContent: "center", padding: "0.9rem", fontSize: "1rem" }} onClick={auth.signOut}>
              Sign Out
            </button>
          ) : (
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.9rem", fontSize: "1rem" }} onClick={auth.signIn} id="sign-in-btn">
              🔐 Sign In with Puter
            </button>
          )}

          <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--color-text-faint)", marginTop: "1.25rem" }}>
            Free account · No credit card needed
          </p>
        </div>

        {/* Back link */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link to="/" className="btn-ghost" style={{ fontSize: "0.875rem" }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
