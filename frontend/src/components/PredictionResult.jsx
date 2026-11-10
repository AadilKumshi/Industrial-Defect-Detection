import { Clock3, ScanSearch, Sparkles } from "lucide-react";
import ProbabilityChart from "./ProbabilityChart";

const prettyName = (name) => name?.replaceAll("_", " ") || "";
const formatConfidence = (value) => {
  const percentage = value * 100;
  return `${percentage < 100 ? Math.min(99.99, percentage).toFixed(2) : "100.00"}%`;
};

export default function PredictionResult({ result, file, duration }) {
  return (
    <section className="panel">
      <div className="mb-5">
        <p className="eyebrow">Analysis</p>
        <h2 className="mt-1 text-lg font-bold text-ink">Prediction result</h2>
      </div>
      {!result ? (
        <div className="empty-result">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><ScanSearch size={27} /></div>
          <h3 className="font-semibold text-ink">Awaiting Inspection</h3>
          <p className="mt-2 max-w-xs text-center text-sm leading-6 text-muted">Upload an industrial surface image and run an analysis to see the detected defect category and model confidence.</p>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent"><Sparkles size={14} /> Detected defect</div>
            <div className="mt-3 flex items-end justify-between gap-3">
              <h3 className="text-2xl font-extrabold tracking-tight text-ink">{prettyName(result.predicted_class)}</h3>
              <span className="text-2xl font-extrabold text-accent">{formatConfidence(result.confidence)}</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-accent" style={{ width: `${result.confidence * 100}%` }} /></div>
            <p className="mt-2 text-xs text-muted">Model confidence</p>
          </div>
          <div className="mt-6 flex items-center justify-between"><h3 className="text-sm font-bold text-ink">Probability distribution</h3><span className="text-xs text-muted">6 categories</span></div>
          <ProbabilityChart probabilities={result.probabilities} predictedClass={result.predicted_class} />
          <div className="mt-7 grid grid-cols-2 gap-3 border-t border-line pt-5 text-xs">
            <div><p className="text-muted">Source image</p><p className="mt-1 truncate font-semibold text-ink">{file?.name}</p></div>
            <div><p className="text-muted">Processing time</p><p className="mt-1 flex items-center gap-1 font-semibold text-ink"><Clock3 size={13} /> {duration ? `${duration} ms` : "—"}</p></div>
          </div>
        </>
      )}
    </section>
  );
}
