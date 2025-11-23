import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Delegate, Organizer, Person } from '../../shared/models/person.interface';
import { environment } from '../../../environments/environment';

const loadPersonsFromLocalStorage = (): Person[] => {
  const persons = localStorage.getItem('persons_list');
  return persons ? JSON.parse(persons) : [];
};

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  listPersons = signal<Person[]>(loadPersonsFromLocalStorage())
  listOrganisers = signal<Organizer[]>([]);
  listDelegates = signal<Delegate[]>([]);

  constructor(private http : HttpClient) { }

  savePersonsCacheStore(){
    window.localStorage.setItem("persons_list",JSON.stringify(this.listPersons()))
  }

  getAllPerson(){
    return this.http.get<Person[]>(`${environment.apiUrl}/Persons/persons.json`)
  }
  getAllOrganisers(){
    return this.http.get<Organizer[]>(`${environment.apiUrl}/Persons/Organisers/organisers.json`)
  }
  getAllDelegates(){
    return this.http.get<Delegate[]>(`${environment.apiUrl}/Persons/Delegates/delegates.json`)
  }

}
