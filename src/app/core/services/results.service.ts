import { Injectable, signal } from '@angular/core';
import { Competition } from '../../shared/models/competition.interface';
import { HttpClient } from '@angular/common/http';
import { CategorySOR, ResultRanking, ResultsSORRanking } from '../../shared/models/results.interface';
import { map } from 'rxjs';
import { BestRecords } from '../../shared/models/records.interface';


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

  getSORPersons(modality:string){
    return this.http
      .get<ResultsSORRanking[]>(`https://legioncubo.github.io/cubing-peru-api-v0/RankingsSum/${modality}_sumatoria.json`)
      .pipe(
        map(results =>
          results.map((r, index) => ({
            ...r,
            nrPosition: index + 1,
            // convertimos categories[] a objeto { [eventId]: category }
            categories: (r.categories as CategorySOR[]).reduce((acc, cat) => {
            acc[cat.eventId] = cat;
            return acc;
          }, {} as Record<string, CategorySOR>)
        }))
      ))
  }

  getRecordsNational(){
    return this.http
      .get<BestRecords>(`https://legioncubo.github.io/cubing-peru-api-v0/Records/best_records.json`)
  }
}
