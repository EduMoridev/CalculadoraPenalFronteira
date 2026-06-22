"use client";

import { Check } from "lucide-react";
import { getSeverity, formatMulra } from "@/data/crimes";
import type { Crime } from "@/types";

interface Props {
  crime: Crime;
  selected: boolean;
  onChange: (id: string, selected: boolean) => void;
}

const ringIdle = {
  low: "ring-white/10 hover:ring-green-500",
  medium: "ring-amber-800/60 hover:ring-amber-400",
  high: "ring-red-900/60 hover:ring-red-500",
};

const ringSelected = {
  low: "ring-green-500 bg-green-950/50",
  medium: "ring-amber-400 bg-amber-950/50",
  high: "ring-red-500 bg-red-950/50",
};

const badgeColors = {
  low: "bg-green-900/70 text-green-300",
  medium: "bg-amber-900/70 text-amber-300",
  high: "bg-red-900/70 text-red-300",
};

const checkColors = {
  low: "bg-green-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

export default function CrimeButton({ crime, selected, onChange }: Props) {
  const severity = getSeverity(crime.multa, crime.meses);

  return (
    <div
      role="checkbox"
      aria-checked={selected}
      onClick={() => onChange(crime.id, !selected)}
      className={`
        relative cursor-pointer rounded-xl p-3 ring-1 backdrop-blur-md transition-all duration-150 select-none
        bg-white/5 hover:bg-white/10
        ${selected ? ringSelected[severity] : ringIdle[severity]}
      `}
    >
      {selected && (
        <span
          className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center z-10 ${checkColors[severity]}`}
        >
          <Check size={9} strokeWidth={3} className="text-white" />
        </span>
      )}

      <div className="flex flex-col gap-1.5">
        <p className={`text-sm font-medium leading-tight ${selected ? "text-white" : "text-slate-300"}`}>
          {crime.name}
        </p>
        <div className="flex gap-1.5 flex-wrap mt-0.5">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${badgeColors[severity]}`}>
            {formatMulra(crime.multa)}
          </span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
            {crime.meses} meses
          </span>
        </div>
      </div>
    </div>
  );
}
