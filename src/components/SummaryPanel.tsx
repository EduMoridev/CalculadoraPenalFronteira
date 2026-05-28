"use client";

import { Trash2, Copy, Check, DollarSign, Clock, Hash, TrendingDown, Scale } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, formatMulra } from "@/data/crimes";
import type { CrimeCount } from "@/types";
import type { BoletimData } from "./BoletimForm";
import type { Oficial } from "./OficiaisForm";
import type { Advogado } from "./AdvogadoForm";

interface Props {
  counts: CrimeCount;
  baseMulta: number;
  baseMeses: number;
  finalMulta: number;
  finalMeses: number;
  finalFianca: number;
  reuPrimario: boolean;
  reducaoManual: number;
  fianca: boolean;
  boletim: BoletimData;
  oficiais: Oficial[];
  oficiaisEnvolvidos: Oficial[];
  advogados: Advogado[];
  onClear: () => void;
  onCopyAttemptWithErrors: () => void;
}

function formatOficial(o: Oficial): string {
  const idPart = o.id ? ` (ID: ${o.id})` : "";
  return `[${o.guarnicao}]${idPart} ${o.patente} ${o.nome}`;
}

export default function SummaryPanel({
  counts,
  baseMulta,
  baseMeses,
  finalMulta,
  finalMeses,
  finalFianca,
  reuPrimario,
  reducaoManual,
  fianca,
  boletim,
  oficiais,
  oficiaisEnvolvidos,
  advogados,
  onClear,
  onCopyAttemptWithErrors,
}: Props) {
  const [copied, setCopied] = useState(false);

  const selectedCrimes = CATEGORIES.flatMap((cat) =>
    cat.crimes.filter((c) => (counts[c.id] ?? 0) > 0)
  );

  const hasReductions = reuPrimario || reducaoManual > 0;
  const hasSelection = selectedCrimes.length > 0;
  const missingRequired = !boletim.id.trim() || !boletim.nome.trim();

  const handleCopy = () => {
    if (!hasSelection) return;
    if (missingRequired) {
      onCopyAttemptWithErrors();
      return;
    }

    const motivoList = selectedCrimes.map((c) => c.name).join(" | ");

    const responsaveisLine = oficiais.length > 0
      ? oficiais.map(formatOficial).join(" | ")
      : "—";

    const envolvidosLine = oficiaisEnvolvidos.length > 0
      ? oficiaisEnvolvidos.map(formatOficial).join(" | ")
      : "—";

    const reductionNotes: string[] = [];
    if (reuPrimario) reductionNotes.push("Réu Primário (multa -30% / pena -20%)");
    if (reducaoManual > 0) reductionNotes.push(`Cooperação com oficial (-${reducaoManual}%)`);

    const multaOuFiancaLabel = fianca ? "Valor da Fiança" : "Multa";
    const multaOuFiancaValor = fianca ? finalFianca : finalMulta;
    const multaOriginalNote = fianca
      ? ` (multa base: ${formatMulra(finalMulta)})`
      : hasReductions && baseMulta !== finalMulta
        ? ` (original: ${formatMulra(baseMulta)})`
        : "";

    const lines = [
      `ID: ${boletim.id}`,
      `Nome: ${boletim.nome}`,
      ...(boletim.partes.trim() ? [`Partes da ocorrência: ${boletim.partes.trim()}`] : []),
      `Motivo: ${motivoList}`,
      `Nomes dos oficiais responsáveis: ${responsaveisLine}`,
      `Oficiais envolvidos: ${envolvidosLine}`,
      ...(!fianca && advogados.length > 0
        ? [`Advogado responsável: ${advogados.map((a) => {
            const id = a.id ? ` (ID: ${a.id})` : "";
            return `${a.cargo}${id} ${a.nome}`;
          }).join(" | ")}`]
        : []),
      "",
      `💰 ${multaOuFiancaLabel}: ${formatMulra(multaOuFiancaValor)}${multaOriginalNote}`,
      `⏳ Prisão: ${finalMeses} meses${hasReductions && baseMeses !== finalMeses ? ` (original: ${baseMeses} meses)` : ""}`,
      ...(reductionNotes.length > 0 ? [`📋 Reduções: ${reductionNotes.join(" · ")}`] : []),
      ...(fianca ? [`⚖️ Fiança calculada (sem advogado): multa ×3.5`] : []),
      `Foto: `,
    ];

    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700/50 bg-slate-950/96 backdrop-blur-md shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

          <div className="flex items-center gap-4 flex-1 flex-wrap">
            {/* Infrações count */}
            <Stat
              icon={<Hash size={14} />}
              label="Infrações"
              value={String(selectedCrimes.length)}
              highlight={hasSelection}
              color="blue"
            />

            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            {/* Multa / Fiança */}
            <div className="flex items-center gap-2">
              <span className={`transition-colors ${fianca ? "text-amber-400" : finalMulta > 0 ? "text-emerald-400" : "text-slate-600"}`}>
                {fianca ? <Scale size={14} /> : <DollarSign size={14} />}
              </span>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {fianca ? "Valor da Fiança" : "Multa Total"}
                </p>
                <div className="flex items-center gap-1.5">
                  {fianca && finalMulta > 0 && (
                    <p className="text-xs text-slate-600 line-through font-mono">{formatMulra(finalMulta)}</p>
                  )}
                  {!fianca && hasReductions && baseMulta > 0 && (
                    <p className="text-xs text-slate-600 line-through font-mono">{formatMulra(baseMulta)}</p>
                  )}
                  <p className={`text-sm font-bold font-mono transition-colors ${fianca ? "text-amber-400" : finalMulta > 0 ? "text-emerald-400" : "text-slate-600"}`}>
                    {fianca
                      ? (finalFianca > 0 ? formatMulra(finalFianca) : "R$ 0")
                      : (finalMulta > 0 ? formatMulra(finalMulta) : "R$ 0")
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            {/* Prisão */}
            <div className="flex items-center gap-2">
              <span className={`transition-colors ${finalMeses > 0 ? "text-orange-400" : "text-slate-600"}`}>
                <Clock size={14} />
              </span>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Prisão</p>
                <div className="flex items-center gap-1.5">
                  {hasReductions && baseMeses > 0 && (
                    <p className="text-xs text-slate-600 line-through font-mono">{baseMeses} meses</p>
                  )}
                  <p className={`text-sm font-bold font-mono transition-colors ${finalMeses > 0 ? "text-orange-400" : "text-slate-600"}`}>
                    {finalMeses} meses
                  </p>
                </div>
              </div>
            </div>

            {/* Badges de reduções + fiança */}
            {(hasReductions || fianca) && hasSelection && (
              <>
                <div className="h-6 w-px bg-slate-800 hidden sm:block" />
                <div className="flex items-center gap-1.5 flex-wrap">
                  {(hasReductions) && <TrendingDown size={13} className="text-teal-400" />}
                  {reuPrimario && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-teal-900/50 text-teal-300 ring-1 ring-teal-700/50">
                      Réu Primário
                    </span>
                  )}
                  {reducaoManual > 0 && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-violet-900/50 text-violet-300 ring-1 ring-violet-700/50">
                      Cooperação −{reducaoManual}%
                    </span>
                  )}
                  {fianca && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-900/50 text-amber-300 ring-1 ring-amber-700/50 flex items-center gap-1">
                      <Scale size={9} />
                      Fiança ×3.5
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!hasSelection}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                {copied ? "Copiado!" : "Copiar"}
              </button>
              <button
                onClick={onClear}
                disabled={!hasSelection}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-950 hover:bg-red-900 text-red-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Trash2 size={13} />
                Limpar
              </button>
            </div>
            {hasSelection && missingRequired && (
              <p className="text-[10px] text-red-500 font-medium">
                Preencha ID e Nome antes de copiar
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon, label, value, highlight, color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight: boolean;
  color: "blue" | "emerald" | "orange";
}) {
  const colors = {
    blue: highlight ? "text-blue-400" : "text-slate-600",
    emerald: highlight ? "text-emerald-400" : "text-slate-600",
    orange: highlight ? "text-orange-400" : "text-slate-600",
  };
  return (
    <div className="flex items-center gap-2">
      <span className={`${colors[color]} transition-colors`}>{icon}</span>
      <div>
        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
        <p className={`text-sm font-bold font-mono transition-colors ${colors[color]}`}>{value}</p>
      </div>
    </div>
  );
}
