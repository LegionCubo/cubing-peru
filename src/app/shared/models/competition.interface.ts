export interface Competition {
  id: string;
  name: string;
  venue: string;
  latitude: number;        // si quieres, cambiar a number
  longitude: number;       // si quieres, cambiar a number
  cityName: string;
  countryId: string;
  venueAddress: string;
  venueDetails: string;
  cellName: string;
  eventSpecs: string;
  eventCompetitions: string[];
  wcaDelegate: PersonDelegateOrganiser[];   // lista de WCA IDs
  organiser: PersonDelegateOrganiser[];     // lista de WCA IDs u otros IDs
  competitionDate: string;     // formato "YYYY-MM-DD"
  competitionEndDate: string;  // formato "YYYY-MM-DD"
}

interface PersonDelegateOrganiser{
  id?: string;
  name:string
}