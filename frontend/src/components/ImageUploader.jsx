import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, FileImage, ImagePlus, LoaderCircle, RefreshCw, UploadCloud, X } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/bmp"];

function formatBytes(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageUploader({ file, onFileChange, onAnalyze, isAnalyzing, error }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      setDimensions(null);
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    const image = new Image();
    image.onload = () => setDimensions({ width: image.naturalWidth, height: image.naturalHeight });
    image.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const acceptFile = (candidate) => {
    if (!candidate) return;
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      onFileChange(null, "Use a JPEG, PNG, WEBP, or BMP image.");
      return;
    }
    if (candidate.size > MAX_FILE_SIZE) {
      onFileChange(null, "Image size must not exceed 10 MB.");
      return;
    }
    onFileChange(candidate, "");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    acceptFile(event.dataTransfer.files?.[0]);
  };

  return (
    <section className="panel flex flex-col">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="eyebrow">Input</p>
          <h2 className="mt-1 text-lg font-bold text-ink">Surface image</h2>
        </div>
        {file && <span className="status-pill"><CheckCircle2 size={13} /> Ready to analyze</span>}
      </div>

      {!file ? (
        <div onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} className={`upload-zone ${isDragging ? "upload-zone-active" : ""}`}>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-accent"><UploadCloud size={27} /></div>
          <h3 className="font-semibold text-ink">Upload Surface Image</h3>
          <p className="mt-2 max-w-xs text-center text-sm leading-6 text-muted">Drag & drop an image here or browse files.</p>
          <button onClick={() => inputRef.current?.click()} className="primary-button mt-5"><ImagePlus size={16} /> Browse Image</button>
          <p className="mt-4 text-xs text-muted">JPG, JPEG, PNG, WEBP, BMP <span className="mx-1 text-line">•</span> Max 10 MB</p>
          <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp,.bmp,image/jpeg,image/png,image/webp,image/bmp" className="hidden" onChange={(event) => { acceptFile(event.target.files?.[0]); event.target.value = ""; }} />
        </div>
      ) : (
        <div className="flex flex-1 flex-col">
          <div className="preview-frame">
            <img src={previewUrl} alt="Selected surface preview" />
            <button onClick={() => onFileChange(null, "")} className="icon-button absolute right-3 top-3 bg-white/95" title="Remove image"><X size={16} /></button>
          </div>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2 truncate text-sm font-semibold text-ink"><FileImage size={15} className="shrink-0 text-accent" />{file.name}</p>
              <p className="mt-1 text-xs text-muted">{dimensions ? `${dimensions.width} × ${dimensions.height}px` : "Reading dimensions"} <span className="mx-1 text-line">•</span> {formatBytes(file.size)}</p>
            </div>
            <button onClick={() => inputRef.current?.click()} className="secondary-button shrink-0"><RefreshCw size={14} /> Replace</button>
            <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp,.bmp,image/jpeg,image/png,image/webp,image/bmp" className="hidden" onChange={(event) => { acceptFile(event.target.files?.[0]); event.target.value = ""; }} />
          </div>
          <button onClick={onAnalyze} disabled={isAnalyzing} className="primary-button mt-6 w-full justify-center py-3.5">
            {isAnalyzing ? <><LoaderCircle size={17} className="animate-spin" /> Analyzing...</> : <><UploadCloud size={17} /> Analyze Image</>}
          </button>
        </div>
      )}
      {error && <div className="error-message mt-4"><AlertCircle size={16} /> {error}</div>}
    </section>
  );
}
