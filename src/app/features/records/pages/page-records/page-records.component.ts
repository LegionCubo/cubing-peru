import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Categorie, Categories_WCA } from '../../../../core/data/Categories_WCA';
import { ResultsService } from '../../../../core/services/results.service';
import { BestRecords } from '../../../../shared/models/records.interface';
import { TableRecordsComponent } from "../../components/table-records/table-records.component";

@Component({
  selector: 'app-page-records',
  imports: [TableRecordsComponent],
  templateUrl: './page-records.component.html',
  styleUrl: './page-records.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageRecordsComponent { 
  categories = signal<Categorie[]>(Categories_WCA.filter(c=>c.state==1));

  recordsNational = signal<BestRecords>({})

  genderSelected = signal<"m" | "f" | "">("");

  resultsService = inject(ResultsService)

  constructor(){
    this.resultsService.getRecordsNational().subscribe(competitions=>{
      this.recordsNational.set(competitions);
    })
  }

  selectGender(gender: "m" | "f" | ""){
    this.genderSelected.set(gender);
  }

}
