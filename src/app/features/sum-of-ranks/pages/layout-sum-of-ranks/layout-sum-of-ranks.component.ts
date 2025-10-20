import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-sum-of-ranks',
  imports: [NavbarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './layout-sum-of-ranks.component.html',
  styleUrl: './layout-sum-of-ranks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSumOfRanksComponent { }
