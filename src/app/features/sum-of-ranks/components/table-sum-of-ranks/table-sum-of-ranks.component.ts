import { ChangeDetectionStrategy, Component, effect, inject, input, signal, ViewChild } from '@angular/core';
import { CategorySOR, ResultsSORRanking } from '../../../../shared/models/results.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Categories_WCA } from '../../../../core/data/Categories_WCA';
import { CategoryWCAPipe } from '../../../../shared/pipes/CategoryWCA.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DialogResultsSor } from '../dialog-results-sor/dialog-results-sor';

@Component({
  selector: 'sum-of-ranks-table',
  imports: [MatTableModule, MatSortModule, MatTooltipModule, MatPaginatorModule, CategoryWCAPipe],
  templateUrl: './table-sum-of-ranks.component.html',
  styleUrl: './table-sum-of-ranks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSumOfRanksComponent { 
  results = input<ResultsSORRanking[]>([]);
  modality = input<string>('single');

  categories = signal<string[]>(Categories_WCA.filter(c=>c.state==1).map(c=>c.id));
  
  columnsTable = signal<string[]>(['nrPosition', 'personName', 'rankingSum',...this.categories()]);
  /* private _liveAnnouncer = inject(LiveAnnouncer);
 */
  readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource();
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

  /* announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  } */

  viewTimes(categorySor:CategorySOR){
    const dialogRef = this.dialog.open(DialogResultsSor, {
      data: categorySor,
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result !== undefined) {
        
      }
    });
  }

}
