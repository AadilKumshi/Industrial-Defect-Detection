import { CircleDot, Grid2X2, Layers3, Scan, Sparkles, Waves } from "lucide-react";

const categories = [
  ["Crazing", "Fine interconnected surface cracks.", Waves],
  ["Inclusion", "Foreign particles or impurities embedded in the steel.", CircleDot],
  ["Patches", "Irregular surface patches or uneven areas.", Grid2X2],
  ["Pitted Surface", "Small cavities or pits on the material surface.", Scan],
  ["Rolled-in Scale", "Oxide scale pressed into the steel during rolling.", Layers3],
  ["Scratches", "Linear marks or grooves on the steel surface.", Sparkles],
];

export default function DefectCategories() {
  return (
    <section className="mt-12">
      <div className="mb-5"><p className="eyebrow">Reference guide</p><h2 className="mt-1 text-lg font-bold text-ink">Supported Defect Categories</h2></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(([name, description, Icon]) => <div key={name} className="category-card"><div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-accent"><Icon size={18} /></div><h3 className="text-sm font-bold text-ink">{name}</h3><p className="mt-1 text-xs leading-5 text-muted">{description}</p></div>)}
      </div>
    </section>
  );
}
