export interface Crime {
  id: string;
  name: string;
  multa: number;
  meses: number;
  category: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  crimes: Crime[];
}

export interface CrimeCount {
  [crimeId: string]: number;
}
