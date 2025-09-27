import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  menu = signal<boolean>(false)

  constructor() { }

  public toggleMenu(state:boolean) : void {
    this.menu.set(state)
  }

}
