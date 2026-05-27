import type { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "transito",
    label: "Trânsito e Infrações",
    icon: "Car",
    crimes: [
      { id: "t1", name: "Infração de Trânsito", multa: 90000, meses: 30, category: "transito" },
      { id: "t2", name: "Direção Perigosa", multa: 90000, meses: 30, category: "transito" },
      { id: "t3", name: "Direção Sob Efeito de Embriaguez", multa: 90000, meses: 30, category: "transito" },
      { id: "t4", name: "Participação em Corridas Clandestinas", multa: 90000, meses: 30, category: "transito" },
      { id: "t5", name: "Porte de Algemas", multa: 90000, meses: 30, category: "transito" },
      { id: "t6", name: "Porte de LockPick", multa: 90000, meses: 30, category: "transito" },
      { id: "t7", name: "Porte de C4", multa: 90000, meses: 30, category: "transito" },
      { id: "t8", name: "Trajes do Poder Público", multa: 150000, meses: 30, category: "transito" },
      { id: "t9", name: "Utilização ou Porte de Colete Balístico", multa: 90000, meses: 30, category: "transito" },
      { id: "t10", name: "Uso de Máscaras", multa: 90000, meses: 30, category: "transito" },
      { id: "t11", name: "Utilização de Capacete Balístico", multa: 90000, meses: 30, category: "transito" },
      { id: "t12", name: "Utilização de Coldre", multa: 90000, meses: 30, category: "transito" },
    ],
  },
  {
    id: "assaltos",
    label: "Assaltos e Invasões",
    icon: "Landmark",
    crimes: [
      { id: "a1", name: "Assalto ao Ice Storm", multa: 90000, meses: 40, category: "assaltos" },
      { id: "a2", name: "Assalto ao Navio do Porto", multa: 90000, meses: 40, category: "assaltos" },
      { id: "a3", name: "Assalto ao Galinheiro ou Açougue", multa: 90000, meses: 40, category: "assaltos" },
      { id: "a4", name: "Assalto a Hollywood ou Titanic", multa: 90000, meses: 50, category: "assaltos" },
      { id: "a5", name: "Assalto ao Banco Fleecaa ou Banco Paleta", multa: 90000, meses: 50, category: "assaltos" },
      { id: "a6", name: "Assalto a Joalheria", multa: 90000, meses: 50, category: "assaltos" },
      { id: "a7", name: "Assalto ao Banco Central", multa: 90000, meses: 70, category: "assaltos" },
      { id: "a8", name: "Assalto ao Ferro Velho", multa: 90000, meses: 60, category: "assaltos" },
      { id: "a9", name: "Invasão do Departamento de Polícia", multa: 750000, meses: 140, category: "assaltos" },
      { id: "a10", name: "Assalto ao Nióbio", multa: 90000, meses: 60, category: "assaltos" },
      { id: "a11", name: "Assalto a Madeireira", multa: 90000, meses: 60, category: "assaltos" },
    ],
  },
  {
    id: "gerais",
    label: "Crimes Gerais",
    icon: "AlertTriangle",
    crimes: [
      { id: "g1", name: "Crimes Cibernéticos", multa: 90000, meses: 30, category: "gerais" },
      { id: "g2", name: "Assalto a Residência", multa: 90000, meses: 30, category: "gerais" },
      { id: "g3", name: "Assalto a Civil", multa: 90000, meses: 30, category: "gerais" },
      { id: "g4", name: "Resistência à Prisão", multa: 105000, meses: 30, category: "gerais" },
      { id: "g5", name: "Omissão ao Socorro", multa: 105000, meses: 30, category: "gerais" },
      { id: "g6", name: "Fuga de Abordagem Policial", multa: 90000, meses: 30, category: "gerais" },
      { id: "g7", name: "Tentativa de Furto ou Roubo", multa: 135000, meses: 60, category: "gerais" },
      { id: "g8", name: "Obstrução da Justiça", multa: 90000, meses: 30, category: "gerais" },
      { id: "g9", name: "Roubo", multa: 90000, meses: 40, category: "gerais" },
      { id: "g10", name: "Furto", multa: 90000, meses: 30, category: "gerais" },
      { id: "g11", name: "Perturbação da Ordem Pública", multa: 90000, meses: 30, category: "gerais" },
      { id: "g12", name: "Multas Pendentes", multa: 90000, meses: 30, category: "gerais" },
      { id: "g13", name: "Invasão à Propriedade Privada", multa: 90000, meses: 30, category: "gerais" },
    ],
  },
  {
    id: "pessoa",
    label: "Crimes contra a Pessoa",
    icon: "UserX",
    crimes: [
      { id: "p1", name: "Desacato ao Servidor Público", multa: 1000000, meses: 50, category: "pessoa" },
      { id: "p2", name: "Extorsão", multa: 90000, meses: 35, category: "pessoa" },
      { id: "p3", name: "Falsidade Ideológica", multa: 90000, meses: 25, category: "pessoa" },
      { id: "p4", name: "Falso Testemunho", multa: 90000, meses: 30, category: "pessoa" },
      { id: "p5", name: "Calúnia", multa: 90000, meses: 30, category: "pessoa" },
      { id: "p6", name: "Corrupção Ativa ou Suborno", multa: 150000, meses: 35, category: "pessoa" },
      { id: "p7", name: "Poluição Sonora", multa: 90000, meses: 30, category: "pessoa" },
      { id: "p8", name: "Lesão Corporal", multa: 90000, meses: 30, category: "pessoa" },
      { id: "p9", name: "Perseguição", multa: 90000, meses: 30, category: "pessoa" },
      { id: "p10", name: "Formação de Quadrilha", multa: 150000, meses: 40, category: "pessoa" },
      { id: "p11", name: "Caça Ilegal de Animais", multa: 90000, meses: 30, category: "pessoa" },
      { id: "p12", name: "Ameaça a Terceiros", multa: 90000, meses: 30, category: "pessoa" },
      { id: "p13", name: "Desobediência ao Servidor Público", multa: 90000, meses: 30, category: "pessoa" },
      { id: "p14", name: "Homicídio Doloso", multa: 300000, meses: 70, category: "pessoa" },
      { id: "p15", name: "Homicídio Culposo", multa: 150000, meses: 30, category: "pessoa" },
      { id: "p16", name: "Latrocínio", multa: 150000, meses: 75, category: "pessoa" },
      { id: "p17", name: "Sequestro ou Cárcere Privado", multa: 150000, meses: 30, category: "pessoa" },
      { id: "p18", name: "Tentativa de Homicídio", multa: 150000, meses: 40, category: "pessoa" },
      { id: "p19", name: "Homicídio a Servidor Público em Serviço", multa: 450000, meses: 100, category: "pessoa" },
      { id: "p20", name: "Chacina", multa: 750000, meses: 120, category: "pessoa" },
    ],
  },
  {
    id: "armas",
    label: "Armas e Munições",
    icon: "Crosshair",
    crimes: [
      { id: "ar1", name: "Porte de Arma Leve", multa: 60000, meses: 30, category: "armas" },
      { id: "ar2", name: "Porte de Arma Pesada", multa: 135000, meses: 45, category: "armas" },
      { id: "ar3", name: "Porte de Munição", multa: 90000, meses: 30, category: "armas" },
      { id: "ar4", name: "Porte de Munição Acima do Permitido", multa: 90000, meses: 30, category: "armas" },
      { id: "ar5", name: "Mau Uso de Arma de Fogo", multa: 90000, meses: 30, category: "armas" },
    ],
  },
  {
    id: "drogas",
    label: "Drogas e Itens Ilegais",
    icon: "Package",
    crimes: [
      { id: "d1", name: "Tráfico de Drogas", multa: 90000, meses: 30, category: "drogas" },
      { id: "d2", name: "Tráfico de Materiais Balísticos", multa: 90000, meses: 30, category: "drogas" },
      { id: "d3", name: "Posse de Drogas", multa: 90000, meses: 30, category: "drogas" },
      { id: "d4", name: "Posse de Itens Ilegais", multa: 90000, meses: 30, category: "drogas" },
      { id: "d5", name: "Dinheiro Sujo", multa: 90000, meses: 30, category: "drogas" },
    ],
  },
  {
    id: "servidores",
    label: "Crimes de Servidores Públicos",
    icon: "ShieldAlert",
    crimes: [
      { id: "s1", name: "Peculato", multa: 90000, meses: 40, category: "servidores" },
      { id: "s2", name: "Inserção de Dados Falsos", multa: 90000, meses: 30, category: "servidores" },
      { id: "s3", name: "Corrupção Passiva", multa: 150000, meses: 30, category: "servidores" },
      { id: "s4", name: "Prevaricação", multa: 150000, meses: 30, category: "servidores" },
      { id: "s5", name: "Condescendência Criminosa", multa: 135000, meses: 30, category: "servidores" },
      { id: "s6", name: "Abandono de Função", multa: 90000, meses: 30, category: "servidores" },
      { id: "s7", name: "Desobediência", multa: 90000, meses: 30, category: "servidores" },
      { id: "s8", name: "Abuso de Autoridade", multa: 225000, meses: 30, category: "servidores" },
    ],
  },
];

export function getSeverity(multa: number, meses: number): "low" | "medium" | "high" {
  if (multa >= 300000 || meses >= 70) return "high";
  if (multa >= 135000 || meses >= 45) return "medium";
  return "low";
}

export function formatMulra(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
