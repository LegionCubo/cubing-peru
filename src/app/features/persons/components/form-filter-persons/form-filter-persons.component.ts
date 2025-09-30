import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Delegate, Organizer, Person } from '../../../../shared/models/person.interface';
import { PersonsService } from '../../../../core/services/persons.service';

@Component({
  selector: 'persons-form-filter',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatDatepickerModule, MatIconModule],
  templateUrl: './form-filter-persons.component.html',
  styleUrl: './form-filter-persons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFilterPersonsComponent { 
  listPersonsOriginal = input<Person[] | Organizer[] | Delegate[]>([]);
  listPersonsPrueba = signal<Person[] | Organizer[] | Delegate[]>([]);
  formSended = output<Person[] | Organizer[] | Delegate[]>()

  genderSelected : string[] = [];

  constructor(){

    effect(()=>{
      if(this.listPersonsOriginal().length > 0){
        this.listPersonsPrueba.set(this.listPersonsOriginal());
      }
    })
  }


  filterSupreme(){
    let listPersonsFiltered = this.listPersonsOriginal();

    if(this.genderSelected.length>0){
      listPersonsFiltered = listPersonsFiltered.filter(p=> this.genderSelected.includes(p.gender));
    }

    this.listPersonsPrueba.set(listPersonsFiltered);
    this.formSended.emit(listPersonsFiltered);
  }

  searchPerson($event:any){
    //Primero obtenemos el valor del input en minusculas
    let words = $event.target.value.toLowerCase();

    //Separamos las palabras en un array, separandolos por espacio
    let  arrayPalabras = words.split(' ');
    
    //Esta será la nueva lista de competiciones
    let newlist:Person[] = []
    //Si en el input hay espacios en vez de palabras
    const existPalabra = arrayPalabras.find((pa:string)=>pa != "")
    if(!existPalabra){
      
      newlist = this.listPersonsPrueba();
      /* this.resultsOf.set('') */
    }else if(arrayPalabras.length > 1){
      //Cuando hay mas de dos palabras que buscar
      if(this.listPersonsPrueba().length == 0){
        //Si no hay data vuelve a buscar en la lista de competiciones
        const filtered = this.listPersonsPrueba()
          .filter(comp => comp.name.toLowerCase().includes(words));

        this.listPersonsPrueba.set(filtered);
      }
      //Busca en la competiciones que ya han sido filtradas con la primera palabra
      this.listPersonsPrueba().forEach((comp)=>{
        let arrayCompetition = comp.name.split(' ');
        if(arrayPalabras[arrayPalabras.length - 1] == ""){
          //if(arrayPalabras.length == 2){
            const exist = arrayCompetition.find((co)=>co.toLowerCase() === arrayPalabras[0].toLowerCase())
            if(exist){
              newlist.push(comp);
            }
          //}
        }else{
          arrayCompetition.forEach((c)=>{
            if(c.toLowerCase().startsWith(arrayPalabras[arrayPalabras.length - 1])){
              newlist.push(comp);
            }
          })
        }
      });
    }
    else{
      //Cuando hay una palabra que buscar
      this.listPersonsPrueba().forEach((comp)=>{
        let arrayCompetition = comp.name.split(' ');
          arrayCompetition.forEach((c)=>{
            if(c.toLowerCase().startsWith(words) && !newlist.includes(comp)){
              newlist.push(comp);
            }
          })
      });
    }

    this.formSended.emit(newlist);
  }
}
