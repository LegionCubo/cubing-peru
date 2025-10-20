import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-records',
  imports: [NavbarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './layout-records.component.html',
  styleUrl: './layout-records.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutRecordsComponent { }
