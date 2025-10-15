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
  resultsRankingPrueba = signal<ResultRanking[]>([]);
  formSended = output<ResultRanking[]>()

  genderSelected : string[] = [];
  

  constructor(){

    effect(()=>{
      if(this.resultsRanking().length > 0){
        this.resultsRankingPrueba.set(this.resultsRanking());
        this.filterSupreme()
      }
    })
  }


  filterSupreme(){
    let listPersonsFiltered = this.resultsRanking();

    if(this.genderSelected.length>0){
      listPersonsFiltered = listPersonsFiltered.filter(p=> this.genderSelected.includes(p.gender));
    }

    this.resultsRankingPrueba.set(listPersonsFiltered);
    this.formSended.emit(listPersonsFiltered);
  }

  searchPerson($event:any){
    //Primero obtenemos el valor del input en minusculas
    let words = $event.target.value.toLowerCase();

    //Separamos las palabras en un array, separandolos por espacio
    let  arrayPalabras = words.split(' ');
    
    //Esta será la nueva lista de competiciones
    let newlist:ResultRanking[] = []
    //Si en el input hay espacios en vez de palabras
    const existPalabra = arrayPalabras.find((pa:string)=>pa != "")
    if(!existPalabra){
      
      newlist = this.resultsRankingPrueba();
      /* this.resultsOf.set('') */
    }else if(arrayPalabras.length > 1){
      //Cuando hay mas de dos palabras que buscar
      if(this.resultsRankingPrueba().length == 0){
        //Si no hay data vuelve a buscar en la lista de competiciones
        const filtered = this.resultsRankingPrueba()
          .filter(comp => comp.personName.toLowerCase().includes(words));

        this.resultsRankingPrueba.set(filtered);
      }
      //Busca en la competiciones que ya han sido filtradas con la primera palabra
      this.resultsRankingPrueba().forEach((comp)=>{
        let arrayCompetition = comp.personName.split(' ').map(c=>c.toLowerCase());

        if(arrayPalabras[arrayPalabras.length - 1] == ""){
          //if(arrayPalabras.length == 2){
            const exist = arrayCompetition.find((co)=>co === arrayPalabras[0].toLowerCase())
            if(exist){
              newlist.push(comp);
            }
          //}
        }else{
          const ultimo_valor =arrayPalabras.length - 1
          const exist_1 = arrayPalabras.filter((p:string, i:number)=>arrayCompetition.includes(p) && i!=ultimo_valor)??[];
          const exist_2 = arrayCompetition.find(r=>r.startsWith(arrayPalabras[ultimo_valor]))
          if(exist_1.length>0 && exist_2){
            newlist.push(comp);
          }
          /* arrayCompetition.forEach((c,i)=>{
            console.log(i);
            if(arrayCompetition.includes(arrayPalabras[0]) && c.startsWith(arrayPalabras[arrayPalabras.length - 1])){
              newlist.push(comp);
            }
          }) */
        }
      });
    }
    else{
      //Cuando hay una palabra que buscar
      this.resultsRankingPrueba().forEach((comp)=>{
        let arrayCompetition = comp.personName.split(' ');
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
