import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ResultsSORRanking } from '../../../../shared/models/results.interface';

@Component({
  selector: 'sum-of-ranks-form-filter',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatDatepickerModule, MatIconModule],
  templateUrl: './form-filter-sum-of-ranks.component.html',
  styleUrl: './form-filter-sum-of-ranks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFilterSumOfRanksComponent { 
  resultsSORRanking = input<ResultsSORRanking[]>([]);
  resultsSORRankingOriginal = signal<ResultsSORRanking[]>([]);
  resultsSORRankingPrueba = signal<ResultsSORRanking[]>([]);
  formSended = output<ResultsSORRanking[]>()

  genderSelected : string[] = [];
  

  constructor(){

    effect(()=>{
      if(this.resultsSORRanking().length > 0){
        this.resultsSORRankingOriginal.set(this.resultsSORRanking());
        this.filterSupreme()
      }
    })
  }


  filterSupreme(){
    let listPersonsFiltered = this.resultsSORRanking();

    if(this.genderSelected.length>0){
      listPersonsFiltered = listPersonsFiltered.filter(p=> this.genderSelected.includes(p.gender));
    }

    this.resultsSORRankingOriginal.set(listPersonsFiltered);
    this.formSended.emit(listPersonsFiltered);
  }

  searchPerson($event:any){
    //Primero obtenemos el valor del input en minusculas
    let words = $event.target.value.toLowerCase();

    //Separamos las palabras en un array, separandolos por espacio
    let  arrayPalabras:string[] = words.split(' ').filter((r:string)=>r!='');
    //Esta será la nueva lista de competiciones
    let newlist:ResultsSORRanking[] = []
    //Si en el input hay espacios en vez de palabras
    const existPalabra = arrayPalabras.find((pa:string)=>pa != "")
    if(!existPalabra){
      
      newlist = this.resultsSORRankingOriginal();
    }else if(arrayPalabras.length > 1){
      //Cuando hay mas de dos palabras que buscar
      //Busca en la competiciones que ya han sido filtradas con la primera palabra
      this.resultsSORRankingPrueba().forEach((comp)=>{
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
      this.resultsSORRankingOriginal().forEach((comp)=>{
        let arrayPerson = comp.personName.split(' ');
          arrayPerson.forEach((c)=>{
            if(c.toLowerCase().startsWith(arrayPalabras[0]) && !newlist.includes(comp)){
              newlist.push(comp);
            }
          })
      });
      this.resultsSORRankingPrueba.set(newlist);
    }
    this.formSended.emit(newlist);
  }
}
