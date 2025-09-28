import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { HeaderComponent } from "../../../../shared/components/header/header.component";

@Component({
  selector: 'app-layout-competitions',
  imports: [RouterOutlet, NavbarComponent, HeaderComponent],
  templateUrl: './layout-competitions.component.html',
  styleUrl: './layout-competitions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutCompetitionsComponent { }
