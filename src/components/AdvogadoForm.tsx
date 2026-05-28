"use client";

import { useState } from "react";
import { Briefcase, Plus, X, ChevronDown, ChevronUp } from "lucide-react";

export interface Advogado {
  uid: string;
  id: string;
  cargo: string;
  nome: string;
}

// Full hierarchy — "Líder Segurança" and "Seguranças" are excluded (cannot represent legally)
const CARGOS_ADVOGADO = [
  "Ministro Presidente do Supremo",
  "Ministro do Supremo",
  "Ministro da Justiça",
  "Ministro da Economia",
  "Ministro da Segurança",
  "Procurador Geral da República",
  "Prefeito",
  "Vice Prefeito",
  "Secretário da Economia",
  "Secretário da Justiça",
  "Secretário da Segurança",
  "Juiz de Direito",
  "Líder MPF",
  "MPF",
  "Procurador Advocacia",
  "Promotor Advocacia",
  "Gabinete Prefeitura",
  "Advogado Sênior",
  "Advogado Júnior",
] as const;

interface Props {
  advogados: Advogado[];
  onChange: (advogados: Advogado[]) => void;
}

export default function AdvogadoForm({ advogados, onChange }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [id, setId] = useState("");
  const [cargo, setCargo] = useState<string>(CARGOS_ADVOGADO[0]);
  const [nome, setNome] = useState("");

  const handleAdd = () => {
    if (!nome.trim()) return;
    const novo: Advogado = {
      uid: `${Date.now()}-${Math.random()}`,
      id: id.trim(),
      cargo,
      nome: nome.trim(),
    };
    onChange([...advogados, novo]);
    setId("");
    setNome("");
  };

  const handleRemove = (uid: string) => {
    onChange(advogados.filter((a) => a.uid !== uid));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="bg-slate-900 ring-1 ring-slate-700 rounded-xl overflow-hidden">
      {/* Header / toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Briefcase
            size={13}
            className={advogados.length > 0 ? "text-emerald-400" : "text-slate-500"}
          />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Advogado Responsável
          </span>
          {advogados.length > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-700 text-white">
              {advogados.length}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp size={14} className="text-slate-500" />
        ) : (
          <ChevronDown size={14} className="text-slate-500" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-800">
          <div className="flex flex-wrap gap-2 mt-3">
            {/* Cargo */}
            <div className="flex flex-col gap-1 flex-1 min-w-44">
              <label className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
                Cargo
              </label>
              <select
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-slate-200 outline-none focus:border-emerald-600/60 cursor-pointer w-full"
              >
                {CARGOS_ADVOGADO.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* ID */}
            <div className="flex flex-col gap-1 w-24">
              <label className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
                ID
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ID..."
                className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-600/60 focus:ring-1 focus:ring-emerald-600/20 transition-all"
              />
            </div>

            {/* Nome */}
            <div className="flex flex-col gap-1 flex-1 min-w-40">
              <label className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
                Nome do Advogado
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nome completo..."
                className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-600/60 focus:ring-1 focus:ring-emerald-600/20 transition-all"
              />
            </div>

            {/* Add button */}
            <div className="flex flex-col justify-end gap-1">
              <label className="text-[9px] text-transparent select-none">_</label>
              <button
                onClick={handleAdd}
                disabled={!nome.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Plus size={13} />
                Adicionar
              </button>
            </div>
          </div>

          {/* Lawyers list */}
          {advogados.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {advogados.map((a) => (
                <div
                  key={a.uid}
                  className="flex items-center gap-1.5 pl-2 pr-1 py-0.5 rounded-lg ring-1 bg-slate-800/80 ring-emerald-700/40"
                >
                  <span className="text-[10px] font-semibold text-emerald-300/80">{a.cargo}</span>
                  {a.id && (
                    <span className="text-[10px] font-mono text-slate-500">#{a.id}</span>
                  )}
                  <span className="text-xs font-medium text-slate-200">{a.nome}</span>
                  <button
                    onClick={() => handleRemove(a.uid)}
                    className="text-slate-600 hover:text-red-400 transition-colors ml-0.5"
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {advogados.length === 0 && (
            <p className="text-[11px] text-slate-600 mt-3 italic">
              Nenhum advogado adicionado ainda.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
