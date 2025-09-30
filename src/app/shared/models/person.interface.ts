

export interface Person {
  name: string;
  gender: 'm' | 'f' | string ;
  id: string;
  countryId: string;
  competitions: number;
  lastCompetition: Competition ;
  podiums: number;
}

export interface Competition  {
  competitionId: string;
  competitionName: string;
  competitionDate: string;
}

export interface Organizer extends Person {
  competitionsOrganised: number;
  lastOrganiserCompetition: Competition;
}

// Para delegates (extiende Person)
export interface Delegate extends Person {
  competitionsDelegated: number;
  lastDelegatedCompetition: Competition;
}