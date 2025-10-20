import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { ResultsService } from '../../../../core/services/results.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ResultsSORRanking } from '../../../../shared/models/results.interface';
import { map } from 'rxjs';
import { TableSumOfRanksComponent } from "../../components/table-sum-of-ranks/table-sum-of-ranks.component";
import { FormFilterSumOfRanksComponent } from "../../components/form-filter-sum-of-ranks/form-filter-sum-of-ranks.component";

@Component({
  selector: 'app-sor-sum-of-ranks',
  imports: [MatButtonModule, MatTooltipModule, MatTabsModule, TableSumOfRanksComponent, RouterLink, FormFilterSumOfRanksComponent],
  templateUrl: './sor-sum-of-ranks.component.html',
  styleUrl: './sor-sum-of-ranks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SorSumOfRanksComponent { 
  
  route = inject(ActivatedRoute);
  resultsService = inject(ResultsService);
  router = inject(Router);

  modality = toSignal(this.route.params.pipe(map(p => p['modality'])));
  modalitySelected = signal<string>(this.modality());
  
  rankingResource = rxResource({
    params:()=>({modality: this.modality()}),
    stream:({params})=>{
      return this.resultsService.getSORPersons(params.modality)
    }
  })

  rankingResourcePrueba = signal<ResultsSORRanking[]>([]);

  constructor(){
    effect(()=>{
      if(this.rankingResource.hasValue()){
        this.rankingResourcePrueba.set(this.rankingResource.value())
      }
    })
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      const p_modality = params['modality'];

      if (!["single","average"].includes(p_modality)) {
        this.router.navigate(['/sor', 'single']);
      }
    });
  }


  public goToModality(modality:string){
    this.modalitySelected.set(modality);
    this.router.navigate(['/sor', this.modalitySelected()]);
  }

  formSended($event: ResultsSORRanking[]) {
    this.rankingResourcePrueba.set($event)
  }

}
