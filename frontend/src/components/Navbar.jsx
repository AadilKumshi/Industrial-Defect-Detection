import { Activity, CircleCheck, CircleOff, ScanLine } from "lucide-react";

export default function Navbar({ healthStatus, onRetry }) {
  const isReady = healthStatus === "ready";
  const isChecking = healthStatus === "checking";
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-sm">
            <ScanLine size={21} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-ink">Industrial Vision</p>
            <p className="text-xs text-muted">Surface Defect Inspection</p>
          </div>
        </div>
        <button onClick={onRetry} className="flex items-center gap-2 rounded-full border border-line px-3 py-2 text-xs font-semibold text-muted transition hover:border-accent/40 hover:text-ink" title="Check engine status again">
          {isChecking ? <Activity size={14} className="animate-pulse text-amber-500" /> : isReady ? <CircleCheck size={14} className="text-green-600" /> : <CircleOff size={14} className="text-red-500" />}
          <span className={isChecking ? "text-amber-700" : isReady ? "text-green-700" : "text-red-600"}>{isChecking ? "Checking engine..." : isReady ? "Engine Ready" : "Engine Unavailable"}</span>
        </button>
      </div>
    </header>
  );
}
