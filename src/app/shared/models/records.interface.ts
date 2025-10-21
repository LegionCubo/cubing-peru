// Representa un resultado de tipo single o average
export interface RecordResult {
  personId: string;
  personName: string;
  best?: string;      // solo en single
  average?: string;   // solo en average
  competitionId: string;
  competitionName: string;
  competitionCountryIso: string;
  times: string[];
}

// Representa los mejores resultados por género
export interface GenderRecords {
  single: RecordResult;
  average: RecordResult;
}

// Representa una categoría (por ejemplo "333", "222", etc.)
export interface CategoryRecords {
  single: RecordResult;
  average: RecordResult;
  m?: GenderRecords;
  f?: GenderRecords;
}

// Estructura completa del archivo best_records.json
export interface BestRecords {
  [category: string]: CategoryRecords; // ejemplo: "333", "222", ...
}