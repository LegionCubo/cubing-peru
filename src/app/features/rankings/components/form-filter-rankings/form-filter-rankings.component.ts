import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { ResultRanking } from '../../../../shared/models/results.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'rankings-form-filter',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatDatepickerModule, MatIconModule],
  templateUrl: './form-filter-rankings.component.html',
  styleUrl: './form-filter-rankings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFilterRankingsComponent { 
  resultsRanking = input<ResultRanking[]>([]);
  resultsRankingOriginal = signal<ResultRanking[]>([]);
  resultsRankingPrueba = signal<ResultRanking[]>([]);
  formSended = output<ResultRanking[]>()

  genderSelected : string[] = [];
  

  constructor(){

    effect(()=>{
      if(this.resultsRanking().length > 0){
        this.resultsRankingOriginal.set(this.resultsRanking());
        this.filterSupreme()
      }
    })
  }


  filterSupreme(){
    let listPersonsFiltered = this.resultsRanking();

    if(this.genderSelected.length>0){
      listPersonsFiltered = listPersonsFiltered.filter(p=> this.genderSelected.includes(p.gender));
    }

    this.resultsRankingOriginal.set(listPersonsFiltered);
    this.formSended.emit(listPersonsFiltered);
  }

  searchPerson($event:any){
    //Primero obtenemos el valor del input en minusculas
    let words = $event.target.value.toLowerCase();

    //Separamos las palabras en un array, separandolos por espacio
    let  arrayPalabras:string[] = words.split(' ').filter((r:string)=>r!='');
    //Esta será la nueva lista de competiciones
    let newlist:ResultRanking[] = []
    //Si en el input hay espacios en vez de palabras
    const existPalabra = arrayPalabras.find((pa:string)=>pa != "")
    if(!existPalabra){
      
      newlist = this.resultsRankingOriginal();
    }else if(arrayPalabras.length > 1){
      //Cuando hay mas de dos palabras que buscar
      //Busca en la competiciones que ya han sido filtradas con la primera palabra
      this.resultsRankingPrueba().forEach((comp)=>{
        let arrayPerson = comp.personName.split(' ').map(c=>c.toLowerCase());
        
        const ultimo_valor =arrayPalabras.length - 1
        const exist_1 = arrayPalabras.filter((p:string, i:number)=>arrayPerson.includes(p) && i!=ultimo_valor);
        const exist_2 = arrayPerson.find(r=>r.startsWith(arrayPalabras[ultimo_valor]))
        if(exist_1.length==arrayPalabras.length-1 && exist_2){
          newlist.push(comp);
        }
      });
    }
    else{
      //Cuando hay una palabra que buscar
      this.resultsRankingOriginal().forEach((comp)=>{
        let arrayPerson = comp.personName.split(' ');
          arrayPerson.forEach((c)=>{
            if(c.toLowerCase().startsWith(arrayPalabras[0]) && !newlist.includes(comp)){
              newlist.push(comp);
            }
          })
      });
      this.resultsRankingPrueba.set(newlist);
    }
    this.formSended.emit(newlist);
  }
}
