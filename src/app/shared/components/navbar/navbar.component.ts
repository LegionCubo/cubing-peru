import { ChangeDetectionStrategy, Component, effect, HostListener, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule} from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { JsonPipe } from '@angular/common';

interface MenuItem {
  id?: number;
  name: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'shared-navbar',
  imports: [MatButtonModule, MatTooltipModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent { 

  listMenu : MenuItem[] = [
    {
      id: 1,
      name: 'Competencias',
      icon: 'wca',
      children: [
        { name: 'Mapa Competencias', icon: 'map', route: '/competitions/map'},
        { name: 'Lista Competencias',icon: 'list',route: '/competitions/list'}
      ]
    },
    {
      id: 2,
      name: 'Resultados',
      icon: 'results',
      children: [
        { name: 'Rankings',icon: 'ranking',route: '/rankings/333/single'},
        { name: 'Records', icon: 'records',route: '/records'},
        { name: 'Sum of Ranks', icon: 'sum',route: '/sor'}
      ]
    },
    /* {
      id: 3,
      name: 'Graficos',
      icon: 'graphics'
    }, */
    {
      id: 4,
      name: 'Personas',
      icon: 'persons',
      children: [
        { name: 'Competidores',icon: 'persons',route: '/persons'},
        { name: 'Organizadores',icon: 'persons',route: '/persons/organisers'},
        { name: 'Delegados',icon: 'persons',route: '/persons/delegates'}
      ]
    },
    /* {
      id: 5,
      name: 'Teams',
      icon: 'teams'
    } */
  ]

  itemSelected = signal<MenuItem | null>(null);
  closeMenu = signal<boolean>(false);

  constructor(public userService:UserService, private router: Router){
    effect(()=>{
      if(this.itemSelected() == null){
        const item = this.listMenu.filter(lm=>lm.children?.find(r=>r.route == this.router.url ))
        this.itemSelected.set(item[0])
      }
    })
  }

  public userToggleMenu(){
    this.userService.toggleMenu(false);
    //this.itemSelected.set(null)
    this.closeMenu.set(false);
  }

  onClickLink(){
    this.userService.menu.set(false)
    //this.itemSelected.set(null)
    this.closeMenu.set(false);
  }

  onClickBtnMenu(itemMenu:MenuItem){
    
    if(this.itemSelected()?.id === itemMenu.id && this.closeMenu()){
      //this.itemSelected.set(null)
      this.closeMenu.set(false);
    }else{
      this.itemSelected.set(itemMenu)
      this.closeMenu.set(true);
    }
  }

  // Detecta clics en cualquier lugar de la pantalla
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (!target.closest('header') && !target.closest('.header.open') && !target.closest('.btn__mobile__menu')) {
      this.userService.menu.set(false)
      //this.itemSelected.set(null)
      this.closeMenu.set(false);
    }
  }
}
