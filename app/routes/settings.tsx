import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";

export const meta = () => ([
  { title: "Settings | CareerPilot AI" },
  { name: "description", content: "Manage your CareerPilot AI account data and storage." },
]);

const Settings = () => {
  const { auth, isLoading, error, clearError, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [wiping, setWiping] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [wiped, setWiped] = useState(false);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate("/auth?next=/settings");
  }, [isLoading]);

  const loadFiles = async () => {
    setLoadingFiles(true);
    const result = (await fs.readDir("./")) as FSItem[];
    setFiles(result || []);
    setLoadingFiles(false);
  };

  useEffect(() => {
    if (auth.isAuthenticated) loadFiles();
  }, [auth.isAuthenticated]);

  const handleWipe = async () => {
    if (!confirm) { setConfirm(true); return; }
    setWiping(true);
    for (const file of files) await fs.delete(file.path);
    await kv.flush();
    setWiped(true);
    setWiping(false);
    setConfirm(false);
    setFiles([]);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface-2)" }}>
      <Navbar />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", color: "var(--color-text-base)", marginBottom: "0.25rem" }}>Settings</h1>
          <p style={{ color: "var(--color-text-muted)" }}>Manage your account and stored data.</p>
        </div>

        {/* Account info */}
        <div className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--color-text-base)" }}>Account</h3>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#06b6d4)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: "1.1rem", flexShrink: 0 }}>
              {auth.user?.username?.[0]?.toUpperCase() || "P"}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "var(--color-text-base)" }}>{auth.user?.username || "—"}</div>
              <div style={{ fontSize: "0.825rem", color: "var(--color-text-faint)" }}>Puter Account</div>
            </div>
            <button className="btn-ghost" onClick={auth.signOut} style={{ marginLeft: "auto" }}>Sign Out</button>
          </div>
        </div>

        {/* Stored files */}
        <div className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h3 style={{ marginBottom: "0.5rem", color: "var(--color-text-base)" }}>Stored Files</h3>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "1rem" }}>Files stored in your Puter cloud account by CareerPilot AI.</p>
          {loadingFiles ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: 40, borderRadius: "0.5rem" }} />)}
            </div>
          ) : files.length === 0 ? (
            <p style={{ color: "var(--color-text-faint)", fontStyle: "italic", fontSize: "0.9rem" }}>No files stored.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {files.map(file => (
                <div key={file.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.875rem", background: "var(--color-surface-3)", borderRadius: "0.5rem" }}>
                  <span style={{ fontSize: "1rem" }}>📄</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--color-text-base)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Danger zone */}
        <div className="card" style={{ padding: "1.5rem", border: "1px solid #fca5a5" }}>
          <h3 style={{ color: "#b91c1c", marginBottom: "0.5rem" }}>⚠️ Danger Zone</h3>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
            This will permanently delete all your uploaded resumes and resume history from your Puter storage. This action cannot be undone.
          </p>
          {wiped && (
            <div style={{ background: "var(--color-success-bg)", color: "var(--color-success-text)", borderRadius: "0.625rem", padding: "0.75rem 1rem", marginBottom: "1rem", fontSize: "0.875rem", fontWeight: 500 }}>
              ✓ All data has been wiped successfully.
            </div>
          )}
          {confirm && !wiped && (
            <div style={{ background: "var(--color-error-bg)", border: "1px solid #fca5a5", borderRadius: "0.625rem", padding: "1rem", marginBottom: "1rem" }}>
              <p style={{ color: "#b91c1c", fontWeight: 600, marginBottom: "0.5rem" }}>Are you absolutely sure?</p>
              <p style={{ color: "#b91c1c", fontSize: "0.875rem" }}>This will delete {files.length} file(s) and all resume history permanently.</p>
            </div>
          )}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button className="btn-danger" onClick={handleWipe} disabled={wiping || files.length === 0}>
              {wiping ? "Wiping…" : confirm ? "Yes, Delete Everything" : "🗑️ Wipe All Data"}
            </button>
            {confirm && !wiping && (
              <button className="btn-ghost" onClick={() => setConfirm(false)}>Cancel</button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
