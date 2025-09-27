import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'shared-header',
  imports: [],
  template: `
    <div class="menu__user">
      <button class="btn__mobile__menu" (click)="userService.toggleMenu(true)">
          <!-- <img src="./icons/cubeforceicon.svg" alt="Logo Cube Force" title="Cube Force Logo" width="50"> -->
          <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" fill="white"/></svg>
      </button>
      
      <div class="user__content">
          <!-- <header-user></header-user> -->
      </div>
    </div>
  `,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { 
  constructor(public userService:UserService){}
  
}
