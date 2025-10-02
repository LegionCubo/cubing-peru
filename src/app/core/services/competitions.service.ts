import { Injectable, signal } from '@angular/core';
import { Competition } from '../../shared/models/competition.interface';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

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
    return this.http.get<Competition[]>('https://legioncubo.github.io/cubing-peru-api-v0/Competitions/competitions.json')
    .pipe(
      map(competitions =>
        competitions.map(c => ({
          ...c,
          eventCompetitions: c.eventSpecs ? c.eventSpecs.split(' ') : [],
          latitude: Number(c.latitude) / 1e6,
          longitude: Number(c.longitude) / 1e6
        }))
      )
    );
  }

}
