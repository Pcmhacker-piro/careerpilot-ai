import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const maxSize = 20 * 1024 * 1024;

  const onDrop = useCallback(
    (accepted: File[]) => {
      const file = accepted[0] || null;
      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    onFileSelect?.(null);
  };

  return (
    <div {...getRootProps()} className={`drop-zone ${isDragActive ? "active" : ""}`} id="resume-upload">
      <input {...getInputProps()} />
      {selectedFile ? (
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flex: 1, minWidth: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: "0.5rem", background: "linear-gradient(135deg,#6366f1,#4f46e5)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontSize: "1.1rem" }}>📄</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text-base)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selectedFile.name}</p>
              <p style={{ fontSize: "0.775rem", color: "var(--color-text-faint)" }}>{formatSize(selectedFile.size)} · PDF</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid var(--color-border)", background: "var(--color-surface-3)", display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0, fontSize: "0.8rem" }}
            title="Remove file"
          >
            ✕
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 52, height: 52, borderRadius: "0.875rem", background: isDragActive ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "var(--color-brand-50)", display: "grid", placeItems: "center", transition: "all 0.2s" }}>
            <span style={{ fontSize: "1.5rem" }}>{isDragActive ? "📂" : "☁️"}</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontWeight: 600, fontSize: "0.9rem", color: isDragActive ? "var(--color-brand-600)" : "var(--color-text-base)" }}>
              {isDragActive ? "Drop your resume here" : "Click or drag & drop"}
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-faint)", marginTop: "0.2rem" }}>PDF only · Max {formatSize(maxSize)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
