import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  otherDay = signal<boolean>(false);

  menu = signal<boolean>(false)

  constructor(){
    this.loadDateCacheStore()
  }

  public toggleMenu(state:boolean) : void {
    this.menu.set(state)
  }

  loadDateCacheStore(){
    const date = window.localStorage.getItem("date")
    if(date){
      const dateBefore = new Date(date)
      const dateActual = new Date()
      const isSameDay = dateBefore.getDate() === dateActual.getDate() &&
                      dateBefore.getMonth() === dateActual.getMonth() &&
                      dateBefore.getFullYear() === dateActual.getFullYear();
      if(!isSameDay){
        this.otherDay.set(true)
        
        window.localStorage.removeItem("competitions_list")
        window.localStorage.removeItem("persons_list")

        this.saveDateCacheStore()
      }
    }else{
      this.saveDateCacheStore()
    }
  }

  saveDateCacheStore(){
    window.localStorage.setItem("date", Date())
  }

}
