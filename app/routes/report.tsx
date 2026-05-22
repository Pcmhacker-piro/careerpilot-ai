import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import ResumeScore from "~/components/Summary";
import ATSPanel from "~/components/ATS";
import FeedbackDetails from "~/components/Details";
import LoadingSkeleton from "~/components/LoadingSkeleton";

export const meta = () => ([
  { title: "Resume Report | CareerPilot AI" },
  { name: "description", content: "Detailed AI-powered resume analysis report with ATS score and improvement tips." },
]);

const Report = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [loadingReport, setLoadingReport] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/report/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const load = async () => {
      setLoadingReport(true);
      const raw = await kv.get(`resume:${id}`);
      if (!raw) { setLoadingReport(false); return; }
      const data = JSON.parse(raw) as Resume;
      setResumeData(data);

      const pdfBlob = await fs.read(data.resumePath);
      if (pdfBlob) setResumeUrl(URL.createObjectURL(new Blob([pdfBlob], { type: "application/pdf" })));

      const imgBlob = await fs.read(data.imagePath);
      if (imgBlob) setImageUrl(URL.createObjectURL(imgBlob));

      setFeedback(data.feedback as unknown as Feedback);
      setLoadingReport(false);
    };
    load();
  }, [id]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface-2)" }}>
      {/* Top nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--color-border)", padding: "0.875rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to="/dashboard" className="back-btn">← Dashboard</Link>
          {resumeData && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-text-base)" }}>
                {resumeData.companyName || "Resume"} {resumeData.jobTitle ? `· ${resumeData.jobTitle}` : ""}
              </span>
              {resumeData.createdAt && (
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-faint)" }}>
                  {new Date(resumeData.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              )}
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", background: "linear-gradient(135deg,#6366f1,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CareerPilot AI</span>
        </div>
      </nav>

      {/* Report layout */}
      <div className="report-layout">
        {/* Left: Resume preview */}
        <div style={{ background: "var(--color-surface-3)", padding: "2rem", display: "flex", alignItems: "flex-start", justifyContent: "center", minHeight: "calc(100vh - 56px)", position: "sticky", top: 56 }}>
          {loadingReport ? (
            <div style={{ width: "100%", maxWidth: 480 }}>
              <div className="skeleton" style={{ width: "100%", aspectRatio: "0.707/1", borderRadius: "1rem" }} />
            </div>
          ) : imageUrl && resumeUrl ? (
            <div className="animate-fade-in" style={{ width: "100%", maxWidth: 480 }}>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                <div style={{ border: "2px solid var(--color-brand-200)", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 8px 32px rgba(99,102,241,0.15)", transition: "transform 0.2s" }}>
                  <img src={imageUrl} alt="Resume preview" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }} />
                </div>
                <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--color-text-faint)", marginTop: "0.75rem" }}>Click to open PDF ↗</p>
              </a>
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "var(--color-text-faint)", paddingTop: "4rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>📄</div>
              <p>Resume preview unavailable</p>
            </div>
          )}
        </div>

        {/* Right: Feedback */}
        <div style={{ padding: "2rem 2rem 4rem", overflowY: "auto" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.75rem", color: "var(--color-text-base)", marginBottom: "0.25rem" }}>Resume Report</h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", fontSize: "0.9rem" }}>AI-powered analysis by CareerPilot AI</p>

            {loadingReport ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[200, 160, 280].map(h => (
                  <div key={h} className="skeleton" style={{ height: h, borderRadius: "1rem" }} />
                ))}
              </div>
            ) : feedback ? (
              <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <ResumeScore feedback={feedback} />
                <ATSPanel score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                <FeedbackDetails feedback={feedback} />
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
                <h3>Report Not Found</h3>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>This report may have been deleted or doesn't exist.</p>
                <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
