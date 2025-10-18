import { Injectable, signal } from '@angular/core';
import { Competition } from '../../shared/models/competition.interface';
import { HttpClient } from '@angular/common/http';
import { ResultRanking } from '../../shared/models/results.interface';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  
    constructor(private http : HttpClient) { }

    getRankingPersons(category:string, modality: string){
        return this.http
        .get<ResultRanking[]>(`https://legioncubo.github.io/cubing-peru-api-v0/Rankings/${modality}/${category}.json`)
        .pipe(
          map(results =>
            results.map((r, index) => ({
              ...r,
              times: [r.value1, r.value2, r.value3,r.value4, r.value5],
              nrPosition: index + 1,
          }))
        ))
    }

    getRankingHistoricoPersons(category:string, modality: string){
        return this.http
        .get<ResultRanking[]>(`https://legioncubo.github.io/cubing-peru-api-v0/Results/${modality}/${category}.json`)
        .pipe(
          map(results =>
            results.map((r, index) => ({
              ...r,
              times: [r.value1, r.value2, r.value3,r.value4, r.value5],
              nrPosition: index + 1,
          }))
        ))
    }
}
