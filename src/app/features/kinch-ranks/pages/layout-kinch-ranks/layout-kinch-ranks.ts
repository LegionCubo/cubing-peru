import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-kinch-ranks',
  imports: [NavbarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './layout-kinch-ranks.html',
  styleUrl: './layout-kinch-ranks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutKinchRanks { }
