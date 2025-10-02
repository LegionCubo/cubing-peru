import { ChangeDetectionStrategy, Component, effect, inject, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Competition } from '../../../../shared/models/competition.interface';
import { CompetitionsService } from '../../../../core/services/competitions.service';
import { RangeDatePipe } from '../../../../shared/pipes/RangeDatePipe.pipe';
import { MarkersMapDetailsCompetitionsComponent } from "../markers-map-details-competitions/markers-map-details-competitions.component";
import { FormListCompetitionsComponent } from "../form-list-competitions/form-list-competitions.component";

@Component({
  selector: 'competitions-markers-map',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RangeDatePipe, MarkersMapDetailsCompetitionsComponent, FormListCompetitionsComponent],
  templateUrl: './markers-map-competitions.component.html',
  styleUrl: './markers-map-competitions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkersMapCompetitionsComponent { 
  dataSource = signal<Competition[]>([]);

  competitionMarker = signal<string>('');
  
  markersCompetitions = output<{
    lat: number;
    lng: number;
  }[]>()

  flyToMarker = output<{
    lat: number;
    lng: number;
  }>()
  
  columnsToDisplay = ['competitionDate', 'name'];
  columnsTable = ['FECHA', 'NOMBRE'];
  columnsToDisplayWithExpand = ['ubicar',...this.columnsToDisplay, 'expand'];
  expandedElement: Competition | null = null;

  competitionsService = inject(CompetitionsService)

  today :string = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' });

  constructor(){
    effect(()=>{
      if(this.competitionsService.listCompetitions().length>0 && this.dataSource().length==0){
        this.dataSource.set(
          this.competitionsService.listCompetitions().filter(c=>this.today<c.competitionDate || (this.today>=c.competitionDate && this.today<=c.competitionEndDate)
        ))

        this.chargeTable()
      }
    })
  }

  /** Checks whether an element is expanded. */
  isExpanded(element: Competition) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: Competition) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

  markerCompetition(nameCompetition:string, latitude: number, longitude: number){
    this.competitionMarker.set(nameCompetition);

    this.flyToMarker.emit({
      lat: latitude,
      lng: longitude
    });
  }

  chargeTable(){
    const dataMarkers = this.dataSource().map(r=>{
      return {
        lat: r.latitude,
        lng: r.longitude
      }
    })

    this.markersCompetitions.emit(dataMarkers)
  }

  formSended($event : Competition[]){
    if($event.length==this.competitionsService.listCompetitions().length) return

    this.dataSource.set($event)

    this.chargeTable()
  }

}
