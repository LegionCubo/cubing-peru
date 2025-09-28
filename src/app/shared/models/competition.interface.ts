export interface Competition {
  id: string;
  name: string;
  venue: string;
  latitude: string;        // si quieres, cambiar a number
  longitude: string;       // si quieres, cambiar a number
  cityName: string;
  countryId: string;
  venueAddress: string;
  venueDetails: string;
  cellName: string;
  eventSpecs: string;
  eventCompetitions: string[];
  wcaDelegate: string[];   // lista de WCA IDs
  organiser: string[];     // lista de WCA IDs u otros IDs
  competitionDate: string;     // formato "YYYY-MM-DD"
  competitionEndDate: string;  // formato "YYYY-MM-DD"
}