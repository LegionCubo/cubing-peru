import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { HeaderComponent } from "../../../../shared/components/header/header.component";

@Component({
  selector: 'home-layout-page',
  imports: [RouterOutlet, NavbarComponent, HeaderComponent],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPageComponent { }
