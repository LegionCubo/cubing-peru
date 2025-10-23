import { ChangeDetectionStrategy, Component, effect, inject, input, signal, ViewChild } from '@angular/core';
import { ResultRanking } from '../../../../shared/models/results.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimeProcessorPipe } from '../../../../shared/pipes/time-processor.pipe';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'rankings-table',
  imports: [MatTableModule, MatSortModule, MatTooltipModule, MatPaginatorModule, TimeProcessorPipe, LowerCasePipe],
  templateUrl: './table-rankings.component.html',
  styleUrl: './table-rankings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRankingsComponent { 
  results = input<ResultRanking[]>([]);
  modality = input<string>('single');

  columnsTable = signal<string[]>([])

  private _liveAnnouncer = inject(LiveAnnouncer);

  dataSource = new MatTableDataSource(this.results());
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor() {
    // Solo observar cuando haya resultados
    effect(() => {
      const data = this.results();
      if (data.length > 0) {
        queueMicrotask(() => {
          this.dataSource.data = data;
        });
      }
    });

    // Otro effect para definir columnas
    effect(() => {
      const modality = this.modality();
      switch (modality) {
        case 'single':
          this.columnsTable.set(['nrPosition', 'personName', 'best', 'competitionName']);
          break;  
        case 'average':
          this.columnsTable.set(['nrPosition', 'personName', 'average', 'competitionName', 'times']);
          break;
        default:
          this.columnsTable.set(['nrPosition', 'personName', 'best', 'competitionName']);
          break;
      }
    });
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
