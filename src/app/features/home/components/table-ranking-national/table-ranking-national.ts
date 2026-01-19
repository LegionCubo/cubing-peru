import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { InformationHomePage } from '../../../../core/models/infomation.model';
import { LowerCasePipe } from '@angular/common';
import { TimeProcessorPipe } from '../../../../shared/pipes/time-processor.pipe';


@Component({
  selector: 'home-table-ranking-national',
  imports: [MatTableModule, LowerCasePipe, TimeProcessorPipe],
  templateUrl: './table-ranking-national.html',
  styleUrl: './table-ranking-national.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRankingNational { 
  results=input<InformationHomePage.RankingNational[]>([])

  dataSource = new MatTableDataSource(this.results());
  columnsTable = signal<string[]>(['nr', 'personName', 'result', 'competitionName']);

  constructor(){
    effect(()=>{
      this.dataSource.data = this.results();
    })    
  }
}
