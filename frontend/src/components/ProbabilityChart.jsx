const friendlyName = (name) => name.replaceAll("_", " ");
const formatPercentage = (value) => {
  const percentage = value * 100;
  return `${percentage < 100 ? Math.min(99.99, percentage).toFixed(2) : "100.00"}%`;
};

export default function ProbabilityChart({ probabilities, predictedClass }) {
  return (
    <div className="mt-7 space-y-4">
      {Object.entries(probabilities).sort(([, a], [, b]) => b - a).map(([name, value]) => {
        const percentage = Math.max(0, Math.min(100, value * 100));
        const isPredicted = name === predictedClass;
        return (
          <div key={name}>
            <div className="mb-1.5 flex justify-between text-xs">
              <span className={isPredicted ? "font-bold text-ink" : "font-medium text-muted"}>{friendlyName(name)}</span>
              <span className={isPredicted ? "font-bold text-accent" : "text-muted"}>{formatPercentage(value)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all duration-700 ${isPredicted ? "bg-accent" : "bg-slate-300"}`} style={{ width: `${percentage}%` }} /></div>
          </div>
        );
      })}
    </div>
  );
}
