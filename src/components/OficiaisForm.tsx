"use client";

import { useState } from "react";
import { Shield, Plus, X, ChevronDown, ChevronUp } from "lucide-react";

export interface Oficial {
  uid: string;
  id: string;
  guarnicao: string;
  patente: string;
  nome: string;
}

const GUARNICOES = ["PRN", "EB", "PM", "TATICA", "CIVIL"] as const;

const PATENTES_MILITAR = [
  "Comandante",
  "Sub-Comandante",
  "Coronel",
  "Ten-Coronel",
  "Major",
  "Capitão",
  "1º Tenente",
  "2º Tenente",
  "Asp. Oficial",
  "Sub-Tenente",
  "1º Sargento",
  "2º Sargento",
  "3º Sargento",
  "Cabo",
  "Soldado",
  "Aluno",
];

// Only 3º Sargento and above (Cabo, Soldado, Aluno excluded)
const PATENTES_MILITAR_RESPONSAVEL = PATENTES_MILITAR.filter(
  (p) => !["Cabo", "Soldado", "Aluno"].includes(p)
);

const PATENTES_CIVIL = [
  "Delegado Geral",
  "Delegado Adjunto",
  "Corregedor",
  "Inspetor",
  "Comissário",
  "Detetive",
  "Investigador",
  "Escrivão",
  "Agente Especial",
  "Agente",
  "Agente Estagiário",
];

function getPatentes(guarnicao: string, restricao: boolean): string[] {
  if (guarnicao === "CIVIL") return PATENTES_CIVIL;
  return restricao ? PATENTES_MILITAR_RESPONSAVEL : PATENTES_MILITAR;
}

const GUARNICAO_COLORS: Record<string, string> = {
  PRN: "bg-blue-900/60 text-blue-300 ring-blue-700/50",
  EB: "bg-green-900/60 text-green-300 ring-green-700/50",
  PM: "bg-slate-700/60 text-slate-300 ring-slate-600/50",
  TATICA: "bg-orange-900/60 text-orange-300 ring-orange-700/50",
  CIVIL: "bg-violet-900/60 text-violet-300 ring-violet-700/50",
};

interface Props {
  title: string;
  oficiais: Oficial[];
  onChange: (oficiais: Oficial[]) => void;
  restricaoPatente?: boolean;
  required?: boolean;
  invalid?: boolean;
}

export default function OficiaisForm({
  title,
  oficiais,
  onChange,
  restricaoPatente = false,
  required = false,
  invalid = false,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [guarnicao, setGuarnicao] = useState<string>("PRN");
  const [patente, setPatente] = useState<string>(
    restricaoPatente ? PATENTES_MILITAR_RESPONSAVEL[0] : PATENTES_MILITAR[0]
  );
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");

  const handleGuarnicaoChange = (g: string) => {
    setGuarnicao(g);
    setPatente(getPatentes(g, restricaoPatente)[0]);
  };

  const handleAdd = () => {
    if (!nome.trim()) return;
    const novo: Oficial = {
      uid: `${Date.now()}-${Math.random()}`,
      id: id.trim(),
      guarnicao,
      patente,
      nome: nome.trim(),
    };
    onChange([...oficiais, novo]);
    setId("");
    setNome("");
  };

  const handleRemove = (uid: string) => {
    onChange(oficiais.filter((o) => o.uid !== uid));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div
      className={`bg-white/5 backdrop-blur-md ring-1 rounded-xl overflow-hidden ${
        invalid ? "ring-red-600/70" : "ring-white/10"
      }`}
    >
      {/* Header / toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Shield
            size={13}
            className={oficiais.length > 0 ? "text-emerald-400" : "text-slate-500"}
          />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-1">
            {title}
            {required && <span className="text-red-500 font-bold">*</span>}
          </span>
          {oficiais.length > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-600 text-white">
              {oficiais.length}
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
          {/* Add form */}
          <div className="flex flex-wrap gap-2 mt-3">
            {/* Guarnição */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
                Guarnição
              </label>
              <select
                value={guarnicao}
                onChange={(e) => handleGuarnicaoChange(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-slate-200 outline-none focus:border-emerald-600/60 cursor-pointer"
              >
                {GUARNICOES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Patente */}
            <div className="flex flex-col gap-1 flex-1 min-w-32">
              <label className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
                Patente
              </label>
              <select
                value={patente}
                onChange={(e) => setPatente(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-slate-200 outline-none focus:border-emerald-600/60 cursor-pointer w-full"
              >
                {getPatentes(guarnicao, restricaoPatente).map((p) => (
                  <option key={p} value={p}>
                    {p}
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
                Nome do Oficial
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Plus size={13} />
                Adicionar
              </button>
            </div>
          </div>

          {/* Officials list */}
          {oficiais.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {oficiais.map((o) => (
                <div
                  key={o.uid}
                  className="flex items-center gap-1.5 pl-1.5 pr-1 py-0.5 rounded-lg ring-1 bg-slate-800/80 ring-slate-600/50"
                >
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ring-1 ${
                      GUARNICAO_COLORS[o.guarnicao] ??
                      "bg-slate-700 text-slate-300 ring-slate-600"
                    }`}
                  >
                    {o.guarnicao}
                  </span>
                  {o.id && (
                    <span className="text-[10px] font-mono text-slate-500">#{o.id}</span>
                  )}
                  <span className="text-xs text-slate-400">{o.patente}</span>
                  <span className="text-xs font-medium text-slate-200">{o.nome}</span>
                  <button
                    onClick={() => handleRemove(o.uid)}
                    className="text-slate-600 hover:text-red-400 transition-colors ml-0.5"
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {oficiais.length === 0 && (
            <p className={`text-[11px] mt-3 italic ${invalid ? "text-red-500" : "text-slate-600"}`}>
              {invalid ? "Campo obrigatório: adicione ao menos um oficial." : "Nenhum oficial adicionado ainda."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
