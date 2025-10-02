import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Competition } from '../../../../shared/models/competition.interface';
import { JsonPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryWCAPipe } from '../../../../shared/pipes/CategoryWCA.pipe';

@Component({
  selector: 'competitions-markers-map-details',
  imports: [MatTooltipModule, CategoryWCAPipe],
  templateUrl: './markers-map-details-competitions.component.html',
  styleUrl: './markers-map-details-competitions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkersMapDetailsCompetitionsComponent { 
  competition = input<Competition>()
}
