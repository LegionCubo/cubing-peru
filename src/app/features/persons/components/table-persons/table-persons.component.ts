import { ChangeDetectionStrategy, Component, effect, inject, input, signal, ViewChild } from '@angular/core';
import { Delegate, Organizer, Person } from '../../../../shared/models/person.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'table-persons',
  imports: [MatTableModule, MatSortModule, MatTooltipModule, MatPaginatorModule],
  templateUrl: './table-persons.component.html',
  styleUrl: './table-persons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePersonsComponent { 
  persons = input<Person[] | Organizer[] | Delegate[]>([])
  typePerson = input<'p'| 'o' | 'd'>('p')

  columnsTable = signal<string[]>([])

  private _liveAnnouncer = inject(LiveAnnouncer);

  dataSource = new MatTableDataSource(this.persons());
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(){
    effect(()=>{
      if(this.persons().length > 0){
        this.dataSource.data = this.persons();

        switch (this.typePerson()) {
          case 'o':
            this.columnsTable.set(['id', 'name', 'competitionsOrganised', 'lastOrganiserCompetition']);
            break;
          case 'd':
            this.columnsTable.set(['id', 'name', 'competitionsDelegated', 'lastDelegatedCompetition']);
            break;
          default:
            this.columnsTable.set(['id', 'name', 'competitions', 'lastCompetition','podiums']);
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

    this.dataSource.sortingDataAccessor = (item: Person | Organizer | Delegate, property) => {
    switch (property) {
      case 'lastCompetition':
        return item.lastCompetition?.competitionName ?? '';
      case 'lastOrganiserCompetition':
        return (item as Organizer).lastOrganiserCompetition?.competitionName ?? '';
      case 'lastDelegatedCompetition':
        return (item as Delegate).lastDelegatedCompetition?.competitionName ?? '';
      default:
        return (item as any)[property];
    }
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
