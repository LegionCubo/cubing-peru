import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { TableKinchRanks } from "../../components/table-kinch-ranks/table-kinch-ranks";
import { ResultsService } from '../../../../core/services/results.service';
import { ResultsKinchRanking } from '../../../../shared/models/results.interface';
import { FilterKinchRank } from "../../components/filter-kinch-rank/filter-kinch-rank";

@Component({
  selector: 'app-kinch-ranks-page',
  imports: [TableKinchRanks, FilterKinchRank],
  templateUrl: './kinch-ranks-page.html',
  styleUrl: './kinch-ranks-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KinchRanksPage { 
  resultsService = inject(ResultsService);

  rankingResourceOriginal = signal<ResultsKinchRanking[]>([]);
  rankingResourcePrueba = signal<ResultsKinchRanking[]>([]);

  constructor(){
    this.resultsService.getKinchPersons().subscribe(kinch=>{
      this.rankingResourceOriginal.set(kinch)
      this.rankingResourcePrueba.set(kinch)
    })
  }

  ngOnInit(){
  }


  formSended($event: ResultsKinchRanking[]) {
    this.rankingResourcePrueba.set($event)
  }
}
