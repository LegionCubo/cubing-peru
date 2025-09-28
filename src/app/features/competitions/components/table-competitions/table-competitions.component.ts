import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild, inject} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Competition } from '../../../../shared/models/competition.interface';
import { RangeDatePipe } from '../../../../shared/pipes/RangeDatePipe.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryWCAPipe } from '../../../../shared/pipes/CategoryWCA.pipe';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'table-competitions',
  imports: [MatTableModule, MatSortModule, RangeDatePipe, MatTooltipModule, CategoryWCAPipe, MatPaginatorModule],
  templateUrl: './table-competitions.component.html',
  styleUrl: './table-competitions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCompetitionsComponent { 

  competitions = input<Competition[]>([])
  columnsTable = ['competitionDate', 'name', 'eventCompetitions', 'cityName','resultados']

  today :string = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' });

  private _liveAnnouncer = inject(LiveAnnouncer);

  dataSource = new MatTableDataSource(this.competitions());
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(){
    effect(()=>{
      if(this.competitions().length > 0){
        this.dataSource.data = this.competitions();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  @ViewChild(MatSort) sort?: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

     this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'eventCompetitions') {
        // Ordena por la cantidad de eventos en el array
        return item.eventCompetitions.length;
      }
      return (item as any)[property];
    };
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
