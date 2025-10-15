import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layout-rankings',
  imports: [NavbarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './layout-rankings.component.html',
  styleUrl: './layout-rankings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutRankingsComponent { }
