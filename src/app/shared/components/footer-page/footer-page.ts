import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-footer-page',
  imports: [],
  templateUrl: './footer-page.html',
  styleUrl: './footer-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterPage { }
