"use client";

import {
  Car, Landmark, AlertTriangle, UserX,
  Crosshair, Package, ShieldAlert,
} from "lucide-react";
import CrimeButton from "./CrimeButton";
import type { Category, CrimeCount } from "@/types";

const ICONS: Record<string, React.ElementType> = {
  Car,
  Landmark,
  AlertTriangle,
  UserX,
  Crosshair,
  Package,
  ShieldAlert,
};

interface Props {
  category: Category;
  counts: CrimeCount;
  search: string;
  onChange: (id: string, selected: boolean) => void;
}

export default function CategorySection({ category, counts, search, onChange }: Props) {
  const Icon = ICONS[category.icon] ?? AlertTriangle;

  const filtered = search.trim()
    ? category.crimes.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    : category.crimes;

  if (filtered.length === 0) return null;

  const selectedInCategory = category.crimes.filter((c) => (counts[c.id] ?? 0) > 0).length;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-1.5 rounded-lg bg-white/5 backdrop-blur-md ring-1 ring-white/10 text-slate-400">
          <Icon size={16} />
        </div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
          {category.label}
        </h2>
        {selectedInCategory > 0 && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-600 text-white">
            {selectedInCategory}
          </span>
        )}
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {filtered.map((crime) => (
          <CrimeButton
            key={crime.id}
            crime={crime}
            selected={(counts[crime.id] ?? 0) > 0}
            onChange={onChange}
          />
        ))}
      </div>
    </section>
  );
}
