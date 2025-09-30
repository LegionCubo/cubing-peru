import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-layout-persons',
  imports: [RouterOutlet, NavbarComponent, HeaderComponent],
  templateUrl: './layout-persons.component.html',
  styleUrl: './layout-persons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPersonsComponent { }
