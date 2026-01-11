import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { CompetitionsService } from '../../../../core/services/competitions.service';
import { Competition } from '../../../../shared/models/competition.interface';
import { Categories_WCA } from '../../../../core/data/Categories_WCA';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'competitions-form-list',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatDatepickerModule, MatIconModule],
  templateUrl: './form-list-competitions.component.html',
  styleUrl: './form-list-competitions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormListCompetitionsComponent { 
  listCompetitions = signal<Competition[]>([]);

  isFormMap = input<boolean>(false); //PARA VALIDAR SI LO LLAMA DESDE MAPA COMPETENCIAS
  formSended = output<Competition[]>()

  cities = signal<string[]>([]);
  citySelected : string[] = [];
  
  events = signal<{ id: string; name: string; }[]>([]);
  eventSelected : string[] = [];

  dateSeelected: Date | null = null;
  dateEndSeelected: Date | null = null;

  competitionsService = inject(CompetitionsService);

  constructor(){

    this.events.set(
      Categories_WCA.map(c => {
        return {
          id: c.id,
          name: c.name
        };
      })
    );

    effect(()=>{
      if(this.competitionsService.listCompetitions().length > 0){
        this.listCompetitions.set(this.competitionsService.listCompetitions());

        const uniqueCities = [...new Set(this.competitionsService.listCompetitions().map(c => c.city_name))];
        this.cities.set(uniqueCities.sort());
      }
    })
  }


  filterSupreme(){
    let listCompetitionsFiltered = this.competitionsService.listCompetitions();

    const date = this.dateSeelected?.toISOString().split('T')[0] ?? ''
    const dateEnd = this.dateEndSeelected?.toISOString().split('T')[0] ?? ''
    
    if(dateEnd != ''){
      listCompetitionsFiltered = listCompetitionsFiltered.filter(c=> c.competitionDate >= date && c.competitionEndDate <= dateEnd);
    }
    if(this.citySelected.length>0){ 
      listCompetitionsFiltered = listCompetitionsFiltered.filter(c=> this.citySelected.includes(c.city_name));
    }
    if(this.eventSelected.length>0){
      listCompetitionsFiltered = listCompetitionsFiltered.filter(c=> c.eventCompetitions.some(event=> this.eventSelected.includes(event)));
    }


    this.listCompetitions.set(listCompetitionsFiltered);
    this.formSended.emit(listCompetitionsFiltered);
  }

  searchCompetition($event:any){
    //Primero obtenemos el valor del input en minusculas
    let words = $event.target.value.toLowerCase();

    //Separamos las palabras en un array, separandolos por espacio
    let  arrayPalabras = words.split(' ');
    
    //Esta será la nueva lista de competiciones
    let newlist:Competition[] = []
    //Si en el input hay espacios en vez de palabras
    const existPalabra = arrayPalabras.find((pa:string)=>pa != "")
    if(!existPalabra){
      
      newlist = this.listCompetitions();
      /* this.resultsOf.set('') */
    }else if(arrayPalabras.length > 1){
      //Cuando hay mas de dos palabras que buscar
      if(this.listCompetitions().length == 0){
        //Si no hay data vuelve a buscar en la lista de competiciones
        const filtered = this.listCompetitions()
          .filter(comp => comp.name.toLowerCase().includes(words));

        this.listCompetitions.set(filtered);
      }
      //Busca en la competiciones que ya han sido filtradas con la primera palabra
      this.listCompetitions().forEach((comp)=>{
        console.log("aqui")
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
      this.listCompetitions().forEach((comp)=>{
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
