import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PersonsService } from '../../../../core/services/persons.service';
import { Person } from '../../../../shared/models/person.interface';
import { TablePersonsComponent } from "../../components/table-persons/table-persons.component";
import { FormFilterPersonsComponent } from "../../components/form-filter-persons/form-filter-persons.component";

@Component({
  selector: 'app-list-persons',
  imports: [TablePersonsComponent, FormFilterPersonsComponent],
  templateUrl: './list-persons.component.html',
  styleUrl: './list-persons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPersonsComponent { 
  personsService = inject(PersonsService);

  listPersons = signal<Person[]>([]);
  loading:boolean = true;
  textSearch = signal<string>('');

  constructor(){
    if(this.personsService.listPersons().length === 0){
      this.personsService.getAllPerson().subscribe(persons=>{
        this.personsService.listPersons.set(persons);
        this.loading = false;
        this.personsService.savePersonsCacheStore();
      })
    }

    effect(()=>{
      if(this.personsService.listPersons().length > 0){
        this.listPersons.set(this.personsService.listPersons());
      }
    })
  }

  formSended($event: Person[]){
    this.listPersons.set($event);
  }
}
