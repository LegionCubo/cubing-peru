import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PersonsService } from '../../../../core/services/persons.service';
import { Delegate, Organizer, Person } from '../../../../shared/models/person.interface';
import { TablePersonsComponent } from '../../components/table-persons/table-persons.component';
import { FormFilterPersonsComponent } from '../../components/form-filter-persons/form-filter-persons.component';

@Component({
  selector: 'app-organisers-persons',
  imports: [TablePersonsComponent, FormFilterPersonsComponent],
  templateUrl: './organisers-persons.component.html',
  styleUrl: './organisers-persons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisersPersonsComponent { 
  personsService = inject(PersonsService);

  listPersons = signal<Organizer[]>([]);
  loading:boolean = true;
  textSearch = signal<string>('');

  constructor(){
    if(this.personsService.listOrganisers().length === 0){
      this.personsService.getAllOrganisers().subscribe(persons=>{
        this.personsService.listOrganisers.set(persons);
        this.loading = false;
      })
    }

    effect(()=>{
      if(this.personsService.listOrganisers().length > 0){
        this.listPersons.set(this.personsService.listOrganisers());
      }
    })
  }

  formSended($event: Person[] | Organizer[] | Delegate[]) {
    this.listPersons.set($event as Organizer[]);
  }
}
