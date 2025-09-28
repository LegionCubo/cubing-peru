import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CompetitionsService } from '../../../../core/services/competitions.service';
import { Competition } from '../../../../shared/models/competition.interface';
import { TableCompetitionsComponent } from "../../components/table-competitions/table-competitions.component";
import { FormListCompetitionsComponent } from "../../components/form-list-competitions/form-list-competitions.component";



@Component({
  selector: 'app-list-competitions',
  
  imports: [TableCompetitionsComponent, FormListCompetitionsComponent],
  templateUrl: './list-competitions.component.html',
  styleUrl: './list-competitions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCompetitionsComponent { 
  competitionsService = inject(CompetitionsService);

  listCompetitions = signal<Competition[]>([]);
  loading:boolean = true;
  textSearch = signal<string>('');

  constructor(){
    if(this.competitionsService.listCompetitions().length === 0){
      this.competitionsService.getAllCompetition().subscribe(competitions=>{
        this.competitionsService.listCompetitions.set(competitions);
        this.loading = false;
        this.competitionsService.saveCompetitionsCacheStore();
      })
    }

    effect(()=>{
      if(this.competitionsService.listCompetitions().length > 0){
        this.listCompetitions.set(this.competitionsService.listCompetitions());
      }
    })
  }

  formSended($event: Competition[]){
    this.listCompetitions.set($event);
  }


  
}
