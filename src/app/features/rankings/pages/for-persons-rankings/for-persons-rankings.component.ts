import { ChangeDetectionStrategy, Component, effect, inject, ResourceRef, signal } from '@angular/core';
import { Categorie, Categories_WCA } from '../../../../core/data/Categories_WCA';
import { MatButtonModule } from '@angular/material/button';
import { CategoryWCAPipe } from '../../../../shared/pipes/CategoryWCA.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsService } from '../../../../core/services/results.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TableRankingsComponent } from '../../components/table-rankings/table-rankings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormFilterRankingsComponent } from "../../components/form-filter-rankings/form-filter-rankings.component";
import { ResultRanking } from '../../../../shared/models/results.interface';

@Component({
  selector: 'app-for-persons-rankings',
  imports: [MatButtonModule, CategoryWCAPipe, MatTooltipModule, TableRankingsComponent, MatTabsModule, FormFilterRankingsComponent],
  templateUrl: './for-persons-rankings.component.html',
  styleUrl: './for-persons-rankings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForPersonsRankingsComponent { 
  
  categories = signal<Categorie[]>(Categories_WCA.filter(c=>c.state==1));
  route = inject(ActivatedRoute);

  // Signals reactivas que escuchan los parámetros de la URL
  eventId = toSignal(this.route.params.pipe(map(p => p['event'])));
  modality = toSignal(this.route.params.pipe(map(p => p['modality'])));
  modalitySelected = signal<string>(this.modality());
  categorySelected = signal<string>(this.eventId());

  resultsService = inject(ResultsService);
  router = inject(Router);
  
  rankingResource = rxResource({
    params:()=>({category: this.eventId(), modality: this.modality()}),
    stream:({params})=>{
      return this.resultsService.getRankingPersons(params.category, params.modality)
    }
  })

  rankingResourcePrueba = signal<ResultRanking[]>([]);

  constructor(){
    effect(()=>{
      if(this.rankingResource.hasValue()){
        this.rankingResourcePrueba.set(this.rankingResource.value())
      }
    })
  }

  goToModality(modality:string){
    this.modalitySelected.set(modality);
    this.goToCategory(this.categorySelected());
  }
  goToCategory(id: string) {
    this.categorySelected.set(id);
    this.router.navigate(['/rankings', id, this.modalitySelected()]);
  }

  formSended($event: ResultRanking[]) {
    this.rankingResourcePrueba.set($event)
  }

}
