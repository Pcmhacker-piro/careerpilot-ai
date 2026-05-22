import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

export const meta = () => ([
  { title: "Analyze Resume | CareerPilot AI" },
  { name: "description", content: "Upload your resume and get AI-powered ATS scores, skill gap analysis, and improvement tips." },
]);

type Step = "idle" | "uploading" | "analyzing" | "done" | "error";

const stepLabels: Record<Step, string> = {
  idle: "Ready",
  uploading: "Uploading your resume…",
  analyzing: "AI is analyzing your resume…",
  done: "Analysis complete! Redirecting…",
  error: "Something went wrong.",
};

const StepIndicator = ({ current }: { current: Step }) => {
  const steps = ["uploading", "analyzing", "done"];
  const idx = steps.indexOf(current);
  return (
    <div className="step-indicator">
      {steps.map((s, i) => (
        <>
          <div
            key={s}
            className={`step-dot ${i < idx ? "done" : i === idx ? "active" : "pending"}`}
          >
            {i < idx ? "✓" : i + 1}
          </div>
          {i < steps.length - 1 && <div className={`step-line ${i < idx ? "done" : ""}`} />}
        </>
      ))}
    </div>
  );
};

/** Strip markdown code fences like ```json ... ``` so JSON.parse doesn't crash */
function extractJSON(text: string): string {
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) return fenceMatch[1].trim();
  return text.trim();
}

const Analyze = () => {
  const { fs, ai, kv, auth, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);

  /** Convert any thrown value into a readable string */
  const toMsg = (err: unknown): string => {
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    try { return JSON.stringify(err); } catch { return "Unknown error"; }
  };

  const fail = (msg: string, err?: unknown) => {
    setStep("error");
    const detail = err !== undefined ? ` (${toMsg(err)})` : "";
    setErrorMsg(msg + detail);
    if (err !== undefined) console.error(msg, err);
  };

  const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: {
    companyName: string; jobTitle: string; jobDescription: string; file: File;
  }) => {
    if (!auth.isAuthenticated) {
      navigate(`/auth?next=/analyze`);
      return;
    }

    // ── Step 1: Upload PDF + Convert to image in parallel ──
    setStep("uploading");

    let uploadedFile: FSItem | undefined;
    let imageResult: Awaited<ReturnType<typeof convertPdfToImage>>;

    try {
      [uploadedFile, imageResult] = await Promise.all([
        fs.upload([file]),
        convertPdfToImage(file),
      ]);
    } catch (err) {
      fail("Upload failed", err);
      return;
    }

    if (!uploadedFile) { fail("Resume upload returned empty. Please try again."); return; }
    if (!imageResult.file) { fail("PDF→image conversion failed", imageResult.error); return; }

    // ── Step 2 & 3 in PARALLEL: Upload preview image + Call AI simultaneously ──
    // The AI only needs the PDF path — image upload is only for the report preview,
    // so both can run at the same time for maximum speed.
    setStep("analyzing");
    const uuid = generateUUID();

    let uploadedImage: FSItem | undefined;
    let aiResponse: Awaited<ReturnType<typeof ai.feedback>> | undefined;

    try {
      [uploadedImage, aiResponse] = await Promise.all([
        fs.upload([imageResult.file]),
        ai.feedback(uploadedFile.path, prepareInstructions({ jobTitle, jobDescription })),
      ]);
    } catch (err) {
      fail("Analysis failed", err);
      return;
    }

    if (!uploadedImage) { fail("Preview image upload returned empty. Please try again."); return; }
    if (!aiResponse) { fail("AI returned no response. Please try again."); return; }

    // ── Step 4: Parse AI response ──
    let feedbackText = "";
    try {
      const content = (aiResponse as AIResponse).message?.content;
      if (typeof content === "string") {
        feedbackText = content;
      } else if (Array.isArray(content) && content.length > 0) {
        feedbackText = content[0]?.text ?? "";
      } else {
        fail(`Unexpected AI response shape: ${JSON.stringify(content).slice(0, 120)}`);
        return;
      }
    } catch (err) {
      fail("Failed to read AI response content", err);
      return;
    }

    let parsedFeedback: object;
    try {
      parsedFeedback = JSON.parse(extractJSON(feedbackText));
    } catch (err) {
      fail("AI response is not valid JSON. Raw: " + feedbackText.slice(0, 200));
      console.error("JSON parse error:", err, "\nFull response:", feedbackText);
      return;
    }

    // ── Step 5: Save everything & redirect ──
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: parsedFeedback,
      createdAt: new Date().toISOString(),
    };

    try {
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
    } catch (err) {
      fail("Failed to save analysis results", err);
      return;
    }

    setStep("done");
    navigate(`/report/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const companyName = fd.get("company-name") as string;
    const jobTitle = fd.get("job-title") as string;
    const jobDescription = fd.get("job-description") as string;
    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  const isProcessing = step !== "idle" && step !== "error";

  // Show sign-in prompt if not authenticated
  const notSignedIn = !isLoading && !auth.isAuthenticated;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface-2)" }}>
      <Navbar />

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Page header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>AI Resume Analyzer</div>
          <h1 style={{ fontSize: "2.25rem", color: "var(--color-text-base)", marginBottom: "0.5rem" }}>
            Analyze Your Resume
          </h1>
          <p style={{ color: "var(--color-text-muted)" }}>
            Fill in the job details, upload your PDF, and get AI-powered feedback in seconds.
          </p>
        </div>

        {/* Not signed in banner */}
        {notSignedIn && (
          <div style={{ background: "var(--color-brand-50)", border: "1px solid var(--color-brand-200)", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <span style={{ fontSize: "1.25rem" }}>🔐</span>
              <div>
                <p style={{ color: "var(--color-brand-700)", fontWeight: 600, marginBottom: "0.15rem" }}>Sign in required</p>
                <p style={{ color: "var(--color-brand-600)", fontSize: "0.875rem" }}>You need to sign in with Puter to upload and analyze your resume.</p>
              </div>
            </div>
            <button
              className="btn-primary"
              style={{ flexShrink: 0, padding: "0.6rem 1.25rem", fontSize: "0.875rem" }}
              onClick={() => navigate("/auth?next=/analyze")}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Processing state */}
        {isProcessing && (
          <div className="glass-card animate-fade-in" style={{ padding: "3rem 2rem", textAlign: "center", marginBottom: "2rem" }}>
            <StepIndicator current={step} />
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <div className="spinner" style={{ width: 36, height: 36, borderWidth: 4 }} />
              <p style={{ color: "var(--color-text-muted)", fontWeight: 500, fontSize: "1rem" }}>{stepLabels[step]}</p>
              {step === "analyzing" && (
                <p style={{ color: "var(--color-text-faint)", fontSize: "0.875rem" }}>
                  Claude AI is reviewing your resume against the job description…
                </p>
              )}
            </div>
          </div>
        )}

        {/* Error state */}
        {step === "error" && (
          <div style={{ background: "var(--color-error-bg)", border: "1px solid #fca5a5", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.25rem" }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <p style={{ color: "var(--color-error-text)", fontWeight: 600, marginBottom: "0.25rem" }}>Analysis Failed</p>
              <p style={{ color: "var(--color-error-text)", fontSize: "0.875rem" }}>{errorMsg}</p>
              <button
                onClick={() => setStep("idle")}
                style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--color-error-text)", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        {!isProcessing && (
          <div className="glass-card" style={{ padding: "2rem 2.5rem" }}>
            <form id="analyze-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="company-name">Company Name</label>
                <input type="text" name="company-name" id="company-name" placeholder="e.g. Google, Microsoft, Startup" />
              </div>
              <div className="form-group">
                <label htmlFor="job-title">Job Title <span style={{ color: "var(--color-error-text)" }}>*</span></label>
                <input type="text" name="job-title" id="job-title" placeholder="e.g. Software Engineer Intern" required />
              </div>
              <div className="form-group">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  name="job-description"
                  id="job-description"
                  placeholder="Paste the job description here for a more targeted analysis…"
                  rows={5}
                />
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-faint)" }}>Optional — but improves accuracy significantly</span>
              </div>
              <div className="form-group">
                <label htmlFor="resume-upload">Resume (PDF)</label>
                <FileUploader onFileSelect={setFile} />
              </div>
              <button
                className="btn-primary"
                type="submit"
                id="analyze-btn"
                style={{ width: "100%", justifyContent: "center", padding: "0.95rem", fontSize: "1.05rem" }}
                disabled={!file || notSignedIn}
              >
                {notSignedIn ? "🔐 Sign In to Analyze" : "🤖 Run AI Analysis"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Analyze;
