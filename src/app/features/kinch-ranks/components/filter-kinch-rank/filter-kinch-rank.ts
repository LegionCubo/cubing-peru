import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { ResultsKinchRanking } from '../../../../shared/models/results.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'kinch-rank-filter',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, FormsModule, MatIconModule],
  templateUrl: './filter-kinch-rank.html',
  styleUrl: './filter-kinch-rank.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterKinchRank { 
  resultsKinchRank = input<ResultsKinchRanking[]>([]);
  resultsKinchRankOriginal = signal<ResultsKinchRanking[]>([]);
  resultsKinchRankPrueba = signal<ResultsKinchRanking[]>([]);
  formSended = output<ResultsKinchRanking[]>()

  genderSelected : string[] = [];

  valuecharger:boolean= false;
  

  constructor(){

    effect(()=>{
      if(this.resultsKinchRank().length > 0 && !this.valuecharger){
        this.valuecharger = true
        this.resultsKinchRankOriginal.set(this.resultsKinchRank());
      }
    })
  }


  filterSupreme(){
    let listPersonsFiltered = this.resultsKinchRank();

    if(this.genderSelected.length>0){
      listPersonsFiltered = listPersonsFiltered.filter(p=> this.genderSelected.includes(p.gender));
    }

    this.resultsKinchRankOriginal.set(listPersonsFiltered);
    this.valuecharger = false
    this.formSended.emit(listPersonsFiltered);
  }

  searchPerson($event:any){
    //Primero obtenemos el valor del input en minusculas
    let words = $event.target.value.toLowerCase();

    //Separamos las palabras en un array, separandolos por espacio
    let  arrayPalabras:string[] = words.split(' ').filter((r:string)=>r!='');
    //Esta será la nueva lista de competiciones
    let newlist:ResultsKinchRanking[] = []
    //Si en el input hay espacios en vez de palabras
    const existPalabra = arrayPalabras.find((pa:string)=>pa != "")
    if(!existPalabra){
      
      newlist = this.resultsKinchRankOriginal();
    }else if(arrayPalabras.length > 1){
      //Cuando hay mas de dos palabras que buscar
      //Busca en la competiciones que ya han sido filtradas con la primera palabra
      this.resultsKinchRankPrueba().forEach((comp)=>{
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
      this.resultsKinchRankOriginal().forEach((comp)=>{
        let arrayPerson = comp.personName.split(' ');
          arrayPerson.forEach((c)=>{
            if(c.toLowerCase().startsWith(arrayPalabras[0]) && !newlist.includes(comp)){
              newlist.push(comp);
            }
          })
      });
      this.resultsKinchRankPrueba.set(newlist);
    }
    this.formSended.emit(newlist);
  }
}
