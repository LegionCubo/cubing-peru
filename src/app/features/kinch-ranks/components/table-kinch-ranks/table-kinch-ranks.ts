import { ChangeDetectionStrategy, Component, effect, inject, input, signal, ViewChild } from '@angular/core';
import { ResultsKinchRanking } from '../../../../shared/models/results.interface';
import { Categories_WCA } from '../../../../core/data/Categories_WCA';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryWCAPipe } from '../../../../shared/pipes/CategoryWCA.pipe';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'kinch-ranks-table',
  imports: [MatTableModule, MatSortModule, MatTooltipModule, MatPaginatorModule, CategoryWCAPipe, DecimalPipe],
  templateUrl: './table-kinch-ranks.html',
  styleUrl: './table-kinch-ranks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableKinchRanks { 
  results = input<ResultsKinchRanking[]>([]);

  categories = signal<string[]>(Categories_WCA.filter(c=>c.state==1).map(c=>c.id));
  
  columnsTable = signal<string[]>(['nrPosition', 'personName', 'kinchAvg',...this.categories()]);
  /* private _liveAnnouncer = inject(LiveAnnouncer);
 */
  readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor() {
    // Solo observar cuando haya resultados
    effect(() => {
      const data = this.results();
      if (data.length > 0) {
        queueMicrotask(() => {
          this.dataSource.data = data;

          if (this.sort) {
            this.dataSource.sort = this.sort;
          }

          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        });
      }
    });
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

  /* viewTimes(categorySor:CategorySOR){
    const dialogRef = this.dialog.open(DialogResultsSor, {
      data: categorySor,
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result !== undefined) {
        
      }
    });
  } */
}
