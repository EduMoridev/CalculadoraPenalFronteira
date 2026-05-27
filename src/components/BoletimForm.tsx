"use client";

import { FileText } from "lucide-react";

export interface BoletimData {
  id: string;
  nome: string;
  partes: string;
}

interface Props {
  data: BoletimData;
  onChange: (data: BoletimData) => void;
  showErrors?: boolean;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  invalid,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500 font-bold">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          bg-slate-800/60 border rounded-lg px-3 py-1.5 text-sm text-slate-200
          placeholder-slate-600 outline-none transition-all
          ${invalid
            ? "border-red-600/70 ring-1 ring-red-600/30 focus:border-red-500"
            : "border-slate-700 focus:border-teal-600/60 focus:ring-1 focus:ring-teal-600/20"
          }
        `}
      />
      {invalid && (
        <p className="text-[10px] text-red-500">Campo obrigatório</p>
      )}
    </div>
  );
}

export default function BoletimForm({ data, onChange, showErrors = false }: Props) {
  const set = (key: keyof BoletimData) => (val: string) =>
    onChange({ ...data, [key]: val });

  return (
    <div className="bg-slate-900 ring-1 ring-slate-700 rounded-xl px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText size={13} className="text-slate-500" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            Dados do Boletim
          </span>
        </div>
        <span className="text-[10px] text-slate-600">
          <span className="text-red-500">*</span> obrigatório
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Field
          label="ID"
          value={data.id}
          onChange={set("id")}
          placeholder="ex: 1234"
          required
          invalid={showErrors && !data.id.trim()}
        />
        <Field
          label="Nome"
          value={data.nome}
          onChange={set("nome")}
          placeholder="Nome completo"
          className="sm:col-span-3"
          required
          invalid={showErrors && !data.nome.trim()}
        />
        <Field
          label="Partes da Ocorrência"
          value={data.partes}
          onChange={set("partes")}
          placeholder="Envolvidos, vítimas... (opcional)"
          className="col-span-2 sm:col-span-4"
        />
      </div>
    </div>
  );
}
