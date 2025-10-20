import { ChangeDetectionStrategy, Component, effect, inject, input, signal, ViewChild } from '@angular/core';
import { ResultsSORRanking } from '../../../../shared/models/results.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimeProcessorPipe } from '../../../../shared/pipes/time-processor.pipe';
import { JsonPipe, LowerCasePipe } from '@angular/common';
import { Categories_WCA } from '../../../../core/data/Categories_WCA';
import { CategoryWCAPipe } from '../../../../shared/pipes/CategoryWCA.pipe';

@Component({
  selector: 'sum-of-ranks-table',
  imports: [MatTableModule, MatSortModule, MatTooltipModule, MatPaginatorModule, CategoryWCAPipe, LowerCasePipe, JsonPipe],
  templateUrl: './table-sum-of-ranks.component.html',
  styleUrl: './table-sum-of-ranks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSumOfRanksComponent { 
  results = input<ResultsSORRanking[]>([]);
  modality = input<string>('single');

  columnsTable = signal<string[]>([]);

  categories = signal<string[]>(Categories_WCA.filter(c=>c.state==1).map(c=>c.id));

  private _liveAnnouncer = inject(LiveAnnouncer);

  dataSource = new MatTableDataSource(this.results());
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(){
    effect(()=>{
      if(this.results().length > 0){
        this.dataSource.data = this.results();

        switch (this.modality()) {
          case 'single':
            this.columnsTable.set(['nrPosition', 'personName', 'rankingSum',...this.categories()]);
            break;
          case 'average':
            this.categories.set(Categories_WCA.filter(c=>c.state==1 && c.id != '333mbf').map(c=>c.id))
            this.columnsTable.set(['nrPosition', 'personName', 'rankingSum',...this.categories()]);
            break;
          default:
            this.columnsTable.set(['nrPosition', 'personName', 'rankingSum',...this.categories()]);
            break;
        }

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  @ViewChild(MatSort) sort?: MatSort;
  ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
