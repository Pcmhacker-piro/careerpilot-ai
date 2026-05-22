import type { Route } from "./+types/home";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import ResumeCard from "~/components/ResumeCard";
import StatsRow from "~/components/StatsRow";
import LoadingSkeleton from "~/components/LoadingSkeleton";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | CareerPilot AI" },
    { name: "description", content: "View and manage all your AI-analyzed resumes in one place." },
  ];
}

export default function Dashboard() {
  const { auth, kv, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(true);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate("/auth?next=/dashboard");
  }, [isLoading, auth.isAuthenticated]);

  useEffect(() => {
    if (!auth.isAuthenticated) return;
    const loadResumes = async () => {
      setLoadingResumes(true);
      const items = (await kv.list("resume:*", true)) as KVItem[];
      const parsed = items?.map(r => JSON.parse(r.value) as Resume) || [];
      setResumes(parsed);
      setLoadingResumes(false);
    };
    loadResumes();
  }, [auth.isAuthenticated]);

  const avgScore = resumes.length
    ? Math.round(resumes.reduce((s, r) => s + ((r.feedback as Feedback).overallScore ?? 0), 0) / resumes.length)
    : 0;
  const bestScore = resumes.length
    ? Math.max(...resumes.map(r => (r.feedback as Feedback).overallScore ?? 0))
    : 0;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface-2)" }}>
      <Navbar />

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "2rem", color: "var(--color-text-base)", marginBottom: "0.25rem" }}>
              {auth.user ? `Welcome back, ${auth.user.username} 👋` : "Dashboard"}
            </h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
              {loadingResumes ? "Loading your resumes…" : resumes.length > 0
                ? `You have ${resumes.length} resume${resumes.length > 1 ? "s" : ""} analyzed`
                : "No resumes yet. Upload your first one!"}
            </p>
          </div>
          <Link to="/analyze" className="btn-primary">
            + New Analysis
          </Link>
        </div>

        {/* Stats */}
        {!loadingResumes && resumes.length > 0 && (
          <StatsRow total={resumes.length} avgScore={avgScore} bestScore={bestScore} />
        )}

        {/* Loading skeletons */}
        {loadingResumes && (
          <div className="resume-grid" style={{ marginTop: "2rem" }}>
            {[1, 2, 3].map(i => <LoadingSkeleton key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loadingResumes && resumes.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ fontSize: "4rem" }}>📄</div>
            <div>
              <h2 style={{ color: "var(--color-text-base)", marginBottom: "0.5rem" }}>No Resumes Yet</h2>
              <p style={{ color: "var(--color-text-muted)", maxWidth: 400 }}>Upload your first resume and get AI-powered feedback, ATS scores, and skill gap analysis in seconds.</p>
            </div>
            <Link to="/analyze" className="btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>
              🚀 Analyze My First Resume
            </Link>
          </div>
        )}

        {/* Resume grid */}
        {!loadingResumes && resumes.length > 0 && (
          <div className="resume-grid" style={{ marginTop: "2rem" }}>
            {resumes.map(resume => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
