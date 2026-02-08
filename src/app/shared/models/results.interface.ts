export interface ResultRanking {
  pos: string;
  best: string;
  average: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  times: string[];
  competition_id: string;
  event_id: string;
  round_type_id: string;
  person_name: string;
  person_id: string;
  format_id: string;
  regionalSingleRecord: string;
  regionalAverageRecord: string;
  personCountryId: string;
  competitionName: string;
  cityName: string;
  competitionDate: string; // formato YYYY-MM-DD
  gender: string;
  nrPosition:number;
}


export interface ResultsSORRanking{
  categories: CategorySOR[] | Record<string, CategorySOR>;
  gender: string;
  nrPosition:number;
  personId: string;
  personName: string;
  rankingSum:number;
}

export interface CategorySOR{
  best:string;
  competitionCountryIso:string;
  competitionId: string;
  competitionName: string;
  countryRank: number;
  eventId: string;
  times:string[];
}

export interface ResultsKinchRanking{
  categories: CategoryKinch[] | Record<string, CategoryKinch>;
  gender: string;
  nrPosition:number;
  personId: string;
  personName: string;
  kinchAvg:number;
  kinchSum:number;
}

export interface CategoryKinch{
  best:string;
  competitionCountryIso:string;
  competitionId: string;
  competitionName: string;
  countryRank: number;
  eventId: string;
  kinch:number;
}