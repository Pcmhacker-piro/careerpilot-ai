import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CareerPilot AI — Navigate Your Career with AI Precision" },
    { name: "description", content: "AI-powered Resume Analyzer & Career Platform built by Prakash Meena." },
  ];
}

const features = [
  { icon: "📊", title: "AI Resume Analysis", desc: "Deep analysis across tone, content, structure, and skills using Claude AI.", color: "#6366f1" },
  { icon: "🎯", title: "ATS Score", desc: "See how well your resume performs in Applicant Tracking Systems.", color: "#06b6d4" },
  { icon: "🧠", title: "Skill Gap Analysis", desc: "Compare against job descriptions to identify missing keywords.", color: "#8b5cf6" },
  { icon: "💬", title: "Interview Questions", desc: "AI-generated role-specific interview questions tailored to you.", color: "#10b981" },
  { icon: "📁", title: "Resume History", desc: "Track all submissions and compare scores over time.", color: "#f59e0b" },
  { icon: "✨", title: "AI Suggestions", desc: "Actionable, prioritized improvement tips to land more interviews.", color: "#ef4444" },
];

const steps = [
  { num: "01", title: "Upload Your Resume", desc: "Drag and drop your PDF. Add job title and description for targeted analysis." },
  { num: "02", title: "AI Analyzes Instantly", desc: "Claude AI scores every dimension of your resume in seconds." },
  { num: "03", title: "Get Actionable Insights", desc: "Review ATS score, category scores, and specific improvement tips." },
];

const testimonials = [
  { name: "Aditya Sharma", role: "SDE Intern @ Amazon", text: "Boosted my ATS score from 54 to 91. Got my first tech internship offer within 3 weeks!", avatar: "AS", color: "#6366f1" },
  { name: "Priya Nair", role: "Final Year, NIT Trichy", text: "The skill gap analysis told me exactly what keywords I was missing for data science roles.", avatar: "PN", color: "#06b6d4" },
  { name: "Rahul Verma", role: "Placed @ Microsoft", text: "Restructured my projects section based on AI tips and landed a Microsoft interview.", avatar: "RV", color: "#8b5cf6" },
];

const faqs = [
  { q: "Is CareerPilot AI free?", a: "Yes! Completely free, powered by Puter.js which provides free cloud storage and Claude AI access." },
  { q: "How does ATS scoring work?", a: "Our AI analyzes keyword density, formatting, section headers, and job description alignment." },
  { q: "What file formats are supported?", a: "We support PDF files up to 20MB — the most ATS-compatible resume format." },
  { q: "Is my resume data private?", a: "Files are stored in your own Puter cloud storage. We never access or share your data." },
  { q: "How accurate is the analysis?", a: "We use Claude 3.7 Sonnet — one of the most capable AI models available." },
  { q: "Can I analyze multiple resumes?", a: "Yes! Upload as many resumes as you like, all saved in your personal dashboard." },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="cp-accordion-item" data-open={open.toString()}>
      <button className="cp-accordion-trigger" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span style={{ fontWeight: 600, color: "var(--color-text-base)", fontSize: "0.975rem" }}>{q}</span>
        <span style={{ fontSize: "1.25rem", color: "var(--color-brand-500)", transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</span>
      </button>
      {open && (
        <div className="cp-accordion-content">
          <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7 }}>{a}</p>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Navbar */}
      <header className="cp-navbar">
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#6366f1,#4f46e5)", borderRadius: "0.5rem", display: "grid", placeItems: "center" }}>⚡</div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", background: "linear-gradient(135deg,#6366f1,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CareerPilot AI</span>
        </Link>
        <nav style={{ display: "flex", gap: "0.25rem" }}>
          <a href="#features" className="btn-ghost">Features</a>
          <a href="#how-it-works" className="btn-ghost">How It Works</a>
          <a href="#faq" className="btn-ghost">FAQ</a>
        </nav>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link to="/auth?next=/dashboard" className="btn-secondary" style={{ padding: "0.5rem 1.25rem" }}>Sign In</Link>
          <Link to="/auth?next=/analyze" className="btn-primary" style={{ padding: "0.5rem 1.25rem" }}>Get Started</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-bg" style={{ padding: "7rem 2rem 6rem", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="section-label animate-fade-in">✨ Powered by Claude AI</div>
          <h1 className="animate-fade-in-up delay-100" style={{ background: "linear-gradient(135deg,#0f172a 0%,#6366f1 50%,#06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1.5rem" }}>
            Navigate Your Career<br />with AI Precision
          </h1>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "1.2rem", color: "var(--color-text-muted)", maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Upload your resume. Get instant ATS scores, skill gap analysis, and AI-powered suggestions that help you land more interviews.
          </p>
          <div className="animate-fade-in-up delay-300" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/auth?next=/analyze" className="btn-primary" style={{ fontSize: "1.05rem", padding: "0.9rem 2.25rem" }}>🚀 Analyze My Resume</Link>
            <Link to="/auth?next=/dashboard" className="btn-secondary" style={{ fontSize: "1.05rem", padding: "0.9rem 2.25rem" }}>View Dashboard</Link>
          </div>
          <div className="animate-float" style={{ marginTop: "4rem", display: "inline-block", padding: "2rem 3rem", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", borderRadius: "1.5rem", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 24px 80px rgba(99,102,241,0.18)" }}>
            <div style={{ display: "flex", gap: "2.5rem", alignItems: "center", justifyContent: "center" }}>
              {[{ label: "ATS Score", val: "92", color: "#22c55e" }, { label: "Overall", val: "88", color: "#6366f1" }, { label: "Skills", val: "95", color: "#06b6d4" }].map(item => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)", color: item.color }}>{item.val}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: 500 }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
              <span className="chip chip-good">✓ ATS Optimized</span>
              <span className="chip chip-neutral">⚡ AI Powered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ background: "var(--color-surface-2)" }}>
        <div className="section-wrap">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-label">Features</div>
            <h2 style={{ marginBottom: "0.75rem" }}>Everything You Need to Land the Job</h2>
            <p style={{ color: "var(--color-text-muted)", maxWidth: 500, margin: "0 auto" }}>A complete AI-powered career toolkit — from analysis to interview prep.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px,1fr))", gap: "1.5rem" }}>
            {features.map((f, i) => (
              <div key={f.title} className={`feature-card animate-fade-in-up delay-${(i % 3) * 200 + 100}`}>
                <div className="feature-icon" style={{ background: `linear-gradient(135deg,${f.color}cc,${f.color})` }}>
                  <span style={{ fontSize: "1.4rem" }}>{f.icon}</span>
                </div>
                <h3 style={{ marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works">
        <div className="section-wrap" style={{ textAlign: "center" }}>
          <div className="section-label">Process</div>
          <h2 style={{ marginBottom: "0.75rem" }}>Get Results in 3 Simple Steps</h2>
          <p style={{ color: "var(--color-text-muted)", maxWidth: 460, margin: "0 auto 3.5rem" }}>No setup. No credit card. Just upload and get expert-level feedback instantly.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "2rem", textAlign: "left" }}>
            {steps.map((s, i) => (
              <div key={s.num} className={`glass-card animate-fade-in-up delay-${i * 200 + 100}`} style={{ padding: "2rem" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)", background: "linear-gradient(135deg,#6366f1,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>{s.num}</div>
                <h3 style={{ marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: "var(--color-surface-2)" }}>
        <div className="section-wrap">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-label">Testimonials</div>
            <h2>Loved by Students &amp; Job Seekers</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
            {testimonials.map((t, i) => (
              <div key={t.name} className={`testimonial-card animate-fade-in-up delay-${i * 200 + 100}`}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},${t.color}88)`, display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--color-text-base)", fontSize: "0.95rem" }}>{t.name}</div>
                    <div style={{ color: "var(--color-text-faint)", fontSize: "0.82rem" }}>{t.role}</div>
                  </div>
                </div>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.65, fontStyle: "italic" }}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section>
        <div className="section-wrap-sm" style={{ textAlign: "center" }}>
          <div className="section-label">Pricing</div>
          <h2 style={{ marginBottom: "0.75rem" }}>Always Free, No Strings Attached</h2>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "2.5rem" }}>CareerPilot AI is fully free — powered by open infrastructure.</p>
          <div className="glass-card animate-fade-in-up" style={{ padding: "2.5rem 3rem", border: "2px solid var(--color-brand-200)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#6366f1,#06b6d4)" }} />
            <div className="chip chip-good" style={{ marginBottom: "1rem" }}>Free Forever</div>
            <div style={{ fontSize: "3.5rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--color-text-base)", lineHeight: 1, marginBottom: "0.25rem" }}>₹0</div>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>per month, forever</p>
            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.75rem", textAlign: "left", marginBottom: "2rem" }}>
              {["Unlimited resume analyses", "ATS scoring & optimization tips", "AI-powered skill gap analysis", "Resume history & comparison", "Claude AI — most capable model", "Private cloud storage"].map(item => (
                <li key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "center", color: "var(--color-text-base)", fontSize: "0.95rem" }}>
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <Link to="/auth?next=/analyze" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "1.05rem", padding: "0.9rem" }}>Start Analyzing for Free</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: "var(--color-surface-2)" }}>
        <div className="section-wrap-sm">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-label">FAQ</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: "linear-gradient(135deg,#4f46e5 0%,#6366f1 40%,#0891b2 100%)", padding: "5rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", marginBottom: "1rem", fontSize: "clamp(1.75rem,3vw,2.5rem)" }}>Ready to Land Your Dream Role?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "2rem", fontSize: "1.05rem" }}>Join thousands of students and professionals who use CareerPilot AI to get more interviews.</p>
          <Link to="/auth?next=/analyze" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 2.5rem", background: "#fff", color: "#4f46e5", borderRadius: "0.75rem", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none" }}>
            🚀 Analyze My Resume — It's Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="cp-footer">
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "2rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", background: "linear-gradient(135deg,#818cf8,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.5rem" }}>⚡ CareerPilot AI</div>
            <p style={{ fontSize: "0.875rem", maxWidth: 260, lineHeight: 1.65 }}>Navigate your career with AI precision. Built for students and professionals.</p>
          </div>
          <div>
            <div style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.875rem" }}>Platform</div>
            {[["Analyze Resume", "/analyze"], ["Dashboard", "/dashboard"], ["Settings", "/settings"]].map(([l, h]) => (
              <div key={h} style={{ marginBottom: "0.4rem" }}><Link to={h} style={{ fontSize: "0.875rem", color: "#94a3b8" }}>{l}</Link></div>
            ))}
          </div>
          <div>
            <div style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.875rem" }}>Built By</div>
            <div style={{ fontSize: "0.9rem", color: "#e2e8f0", fontWeight: 600 }}>Prakash Meena</div>
            <div style={{ fontSize: "0.825rem", color: "#94a3b8" }}>CSE Student · IIIT Dharwad</div>
            <div style={{ fontSize: "0.825rem", color: "#94a3b8" }}>AI · Full Stack · DSA</div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1e293b", marginTop: "2.5rem", paddingTop: "1.5rem", textAlign: "center", fontSize: "0.825rem" }}>
          © 2025 CareerPilot AI · Built by Prakash Meena · IIIT Dharwad
        </div>
      </footer>
    </div>
  );
}
