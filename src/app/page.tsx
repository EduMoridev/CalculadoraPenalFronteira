"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, X, UserCheck, Percent, Scale } from "lucide-react";
import { CATEGORIES } from "@/data/crimes";
import CategorySection from "@/components/CategorySection";
import SummaryPanel from "@/components/SummaryPanel";
import FronteiraLogo from "@/components/FronteiraLogo";
import BoletimForm, { type BoletimData } from "@/components/BoletimForm";
import OficiaisForm, { type Oficial } from "@/components/OficiaisForm";
import type { CrimeCount } from "@/types";

export default function Home() {
  const [counts, setCounts] = useState<CrimeCount>({});
  const [search, setSearch] = useState("");
  const [reuPrimario, setReuPrimario] = useState(false);
  const [reducaoManual, setReducaoManual] = useState(0);
  const [boletim, setBoletim] = useState<BoletimData>({ id: "", nome: "", partes: "" });
  const [oficiais, setOficiais] = useState<Oficial[]>([]);
  const [fianca, setFianca] = useState(false);
  const [showBoletimErrors, setShowBoletimErrors] = useState(false);

  const handleChange = useCallback((id: string, selected: boolean) => {
    setCounts((prev) => {
      if (!selected) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: 1 };
    });
  }, []);

  const handleClear = useCallback(() => {
    setCounts({});
    setSearch("");
    setReuPrimario(false);
    setReducaoManual(0);
    setBoletim({ id: "", nome: "", partes: "" });
    setOficiais([]);
    setFianca(false);
    setShowBoletimErrors(false);
  }, []);

  const { baseMulta, baseMeses, finalMulta, finalMeses, finalFianca } = useMemo(() => {
    let multa = 0;
    let meses = 0;
    CATEGORIES.forEach((cat) => {
      cat.crimes.forEach((crime) => {
        if ((counts[crime.id] ?? 0) > 0) {
          multa += crime.multa;
          meses += crime.meses;
        }
      });
    });
    const multaRP = reuPrimario ? multa * 0.70 : multa;
    const mesesRP = reuPrimario ? meses * 0.80 : meses;
    const fator = 1 - reducaoManual / 100;
    const fM = Math.round(multaRP * fator);
    return {
      baseMulta: multa,
      baseMeses: meses,
      finalMulta: fM,
      finalMeses: Math.round(mesesRP * fator),
      finalFianca: Math.round(fM * 3.5),
    };
  }, [counts, reuPrimario, reducaoManual]);

  const selectedCount = Object.keys(counts).length;

  const handleReducaoInput = (val: string) => {
    const n = parseInt(val, 10);
    if (isNaN(n)) { setReducaoManual(0); return; }
    setReducaoManual(Math.min(100, Math.max(0, n)));
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-28">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <FronteiraLogo size={40} />
            <div>
              <h1 className="text-sm font-bold text-white leading-none tracking-wide">
                Calculadora Penal Fronteira
              </h1>
            </div>
          </div>

          {selectedCount > 0 && (
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {selectedCount} {selectedCount === 1 ? "crime selecionado" : "crimes selecionados"}
            </div>
          )}

          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar crime..."
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-8 pr-8 py-1.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/30 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Controls ── */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-1 flex flex-col gap-3">

        {/* Row 1: Réu Primário + Cooperação */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Réu Primário */}
          <button
            onClick={() => setReuPrimario((v) => !v)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl ring-1 transition-all duration-200 flex-1 sm:flex-none text-left
              ${reuPrimario
                ? "bg-teal-950/60 ring-teal-500 shadow-[0_0_16px_rgba(45,212,191,0.12)]"
                : "bg-slate-900 ring-slate-700 hover:ring-slate-500"
              }
            `}
          >
            <div className={`
              w-5 h-5 rounded-md ring-1 flex items-center justify-center transition-all shrink-0
              ${reuPrimario ? "bg-teal-500 ring-teal-400" : "bg-slate-800 ring-slate-600"}
            `}>
              {reuPrimario && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <UserCheck size={14} className={reuPrimario ? "text-teal-400" : "text-slate-500"} />
                <span className={`text-sm font-semibold ${reuPrimario ? "text-teal-300" : "text-slate-300"}`}>
                  Réu Primário
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Multa <span className="text-teal-500/80">−30%</span> · Pena <span className="text-teal-500/80">−20%</span>
              </p>
            </div>
          </button>

          {/* Fiança */}
          <button
            onClick={() => setFianca((v) => !v)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl ring-1 transition-all duration-200 flex-1 sm:flex-none text-left
              ${fianca
                ? "bg-amber-950/60 ring-amber-500 shadow-[0_0_16px_rgba(245,158,11,0.15)]"
                : "bg-slate-900 ring-slate-700 hover:ring-slate-500"
              }
            `}
          >
            <div className={`
              w-5 h-5 rounded-md ring-1 flex items-center justify-center transition-all shrink-0
              ${fianca ? "bg-amber-500 ring-amber-400" : "bg-slate-800 ring-slate-600"}
            `}>
              {fianca && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Scale size={14} className={fianca ? "text-amber-400" : "text-slate-500"} />
                <span className={`text-sm font-semibold ${fianca ? "text-amber-300" : "text-slate-300"}`}>
                  Sem Advogado
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Fiança <span className="text-amber-500/80">×3.5</span> da multa
              </p>
            </div>
          </button>

          {/* Cooperação */}
          <div className="flex-1 bg-slate-900 ring-1 ring-slate-700 rounded-xl px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Percent size={13} className={reducaoManual > 0 ? "text-violet-400" : "text-slate-500"} />
                <span className="text-sm font-semibold text-slate-300">Redução por Cooperação</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={reducaoManual}
                  onChange={(e) => handleReducaoInput(e.target.value)}
                  className="w-12 text-center text-sm font-bold font-mono bg-slate-800 border border-slate-700 rounded-md py-0.5 text-violet-300 outline-none focus:border-violet-500 transition-colors"
                />
                <span className="text-xs text-slate-500 font-mono">%</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={reducaoManual}
              onChange={(e) => setReducaoManual(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-violet-500 bg-slate-700"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-slate-600">0%</span>
              <span className="text-[9px] text-slate-600">50%</span>
              <span className="text-[9px] text-slate-600">100%</span>
            </div>
          </div>
        </div>

        {/* Row 2: Dados do Boletim */}
        <BoletimForm data={boletim} onChange={setBoletim} showErrors={showBoletimErrors} />

        {/* Row 3: Oficiais Responsáveis */}
        <OficiaisForm oficiais={oficiais} onChange={setOficiais} />
      </div>

      {/* ── Crime Categories ── */}
      <main className="max-w-7xl mx-auto px-4 pt-5">
        {CATEGORIES.map((cat) => (
          <CategorySection
            key={cat.id}
            category={cat}
            counts={counts}
            search={search}
            onChange={handleChange}
          />
        ))}

        {search && CATEGORIES.every(
          (cat) => !cat.crimes.some((c) => c.name.toLowerCase().includes(search.toLowerCase()))
        ) && (
          <div className="text-center py-16 text-slate-500">
            <Search size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhum crime encontrado para &quot;{search}&quot;</p>
          </div>
        )}
      </main>

      <SummaryPanel
        counts={counts}
        baseMulta={baseMulta}
        baseMeses={baseMeses}
        finalMulta={finalMulta}
        finalMeses={finalMeses}
        finalFianca={finalFianca}
        reuPrimario={reuPrimario}
        reducaoManual={reducaoManual}
        fianca={fianca}
        boletim={boletim}
        oficiais={oficiais}
        onClear={handleClear}
        onCopyAttemptWithErrors={() => setShowBoletimErrors(true)}
      />
    </div>
  );
}
