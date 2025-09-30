import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { TablePersonsComponent } from '../../components/table-persons/table-persons.component';
import { FormFilterPersonsComponent } from '../../components/form-filter-persons/form-filter-persons.component';
import { PersonsService } from '../../../../core/services/persons.service';
import { Delegate, Organizer, Person } from '../../../../shared/models/person.interface';

@Component({
  selector: 'app-delegates-persons',
  imports: [TablePersonsComponent, FormFilterPersonsComponent],
  templateUrl: './delegates-persons.component.html',
  styleUrl: './delegates-persons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelegatesPersonsComponent { 
  personsService = inject(PersonsService);

  listPersons = signal<Delegate[]>([]);
  loading:boolean = true;
  textSearch = signal<string>('');

  constructor(){
    if(this.personsService.listDelegates().length === 0){
      this.personsService.getAllDelegates().subscribe(persons=>{
        this.personsService.listDelegates.set(persons);
        this.loading = false;
      })
    }

    effect(()=>{
      if(this.personsService.listDelegates().length > 0){
        this.listPersons.set(this.personsService.listDelegates());
      }
    })
  }

  formSended($event: Person[] | Organizer[] | Delegate[]) {
    this.listPersons.set($event as Delegate[]);
  }
}
