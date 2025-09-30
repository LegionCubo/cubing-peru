import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Delegate, Organizer, Person } from '../../shared/models/person.interface';

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
    return this.http.get<Person[]>('https://legioncubo.github.io/cubing-peru-api-v0/Persons/persons.json')
  }
  getAllOrganisers(){
    return this.http.get<Organizer[]>('https://legioncubo.github.io/cubing-peru-api-v0/Persons/Organisers/organisers.json')
  }
  getAllDelegates(){
    return this.http.get<Delegate[]>('https://legioncubo.github.io/cubing-peru-api-v0/Persons/Delegates/delegates.json')
  }

}
