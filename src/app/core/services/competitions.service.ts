import { Injectable, signal } from '@angular/core';
import { Competition } from '../../shared/models/competition.interface';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const loadCompetitionsFromLocalStorage = (): Competition[] => {
  const competitions = localStorage.getItem('competitions_list');
  return competitions ? JSON.parse(competitions) : [];
};

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  listCompetitions = signal<Competition[]>(loadCompetitionsFromLocalStorage())

  constructor(private http : HttpClient) { }

  
  saveCompetitionsCacheStore(){
    window.localStorage.setItem("competitions_list",JSON.stringify(this.listCompetitions()))
  }

  getAllCompetition(){
    return this.http.get<Competition[]>(
      `${environment.apiUrl}/Competitions/competitions.json`
    )
    .pipe(
      map(competitions =>
        competitions.map(c => ({
          ...c,
          eventCompetitions: c.event_specs ? c.event_specs.split(' ') : [],
          latitude_microdegrees: Number(c.latitude_microdegrees) / 1e6,
          longitude_microdegrees: Number(c.longitude_microdegrees) / 1e6
        }))
      )
    );
  }

}
