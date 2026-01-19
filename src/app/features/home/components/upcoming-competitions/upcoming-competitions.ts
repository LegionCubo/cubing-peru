import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InformationHomePage } from '../../../../core/models/infomation.model';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'home-upcoming-competitions',
  imports: [MatIcon],
  templateUrl: './upcoming-competitions.html',
  styleUrl: './upcoming-competitions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingCompetitions { 
  upcomingCompetitions = input<InformationHomePage.UpcomingCompetition[]>();
}
