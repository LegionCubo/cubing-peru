import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { InformationHomePage } from '../models/infomation.model';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

const loadInformationFromLocalStorage = (): InformationHomePage.Info | undefined => {
  const infoHome = localStorage.getItem('information');
  return infoHome ? JSON.parse(infoHome) : undefined;
};

@Injectable({
  providedIn: 'root'
})
export class InformationHomeService {

  info = signal<InformationHomePage.Info | undefined>(loadInformationFromLocalStorage());

  constructor(private http : HttpClient) { }

  saveInformationCacheStore(){
    window.localStorage.setItem("information",JSON.stringify(this.info()))
  }

  getInformation(){
    return this.http.get<InformationHomePage.Info>(`${environment.apiUrl}/Information/information.json`)
    .pipe(
      tap(response => {

        response.upcomingCompetitions = response.upcomingCompetitions.map(c => ({
          ...c,
          latitude_microdegrees: Number(c.latitude_microdegrees) / 1e6,
          longitude_microdegrees: Number(c.longitude_microdegrees) / 1e6
        }));

        console.log(response.upcomingCompetitions);
      })
    );
  }
}
