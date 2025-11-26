import { Injectable, signal } from '@angular/core';
import { Competition } from '../../shared/models/competition.interface';
import { HttpClient } from '@angular/common/http';
import { CategoryKinch, CategorySOR, ResultRanking, ResultsKinchRanking, ResultsSORRanking } from '../../shared/models/results.interface';
import { map } from 'rxjs';
import { BestRecords } from '../../shared/models/records.interface';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  
  constructor(private http : HttpClient) { }

  getRankingPersons(category:string, modality: string){
      return this.http
      .get<ResultRanking[]>(`${environment.apiUrl}/Rankings/${modality}/${category}.json`)
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
      .get<ResultRanking[]>(`${environment.apiUrl}/Results/${modality}/${category}.json`)
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
      .get<ResultsSORRanking[]>(`${environment.apiUrl}/RankingsSum/${modality}_sumatoria.json`)
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

  getKinchPersons(){
    return this.http
      .get<ResultsKinchRanking[]>(`${environment.apiUrl}/KinchRank/results_kinch_rank.json`)
      .pipe(
        map(results =>
          results.map((r, index) => ({
            ...r,
            nrPosition: index + 1,
            // convertimos categories[] a objeto { [eventId]: category }
            categories: (r.categories as CategoryKinch[]).reduce((acc, cat) => {
            acc[cat.eventId] = cat;
            return acc;
          }, {} as Record<string, CategoryKinch>)
        }))
      ))
  }

  getRecordsNational(){
    return this.http
      .get<BestRecords>(`${environment.apiUrl}/Records/best_records.json`)
  }
}
