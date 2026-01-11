export interface Competition {
  id: string;
  name: string;
  venue: string;
  latitude: number;        // si quieres, cambiar a number
  longitude: number;       // si quieres, cambiar a number
  city_name: string;
  countryId: string;
  venue_address: string;
  venueDetails: string;
  cellName: string;
  event_specs: string;
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