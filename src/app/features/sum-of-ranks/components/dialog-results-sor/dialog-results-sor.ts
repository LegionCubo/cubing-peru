import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategorySOR } from '../../../../shared/models/results.interface';
import { CategoryWCAPipe } from '../../../../shared/pipes/CategoryWCA.pipe';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TimeProcessorPipe } from '../../../../shared/pipes/time-processor.pipe';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-results-sor',
  imports: [CategoryWCAPipe, MatTableModule, TimeProcessorPipe, LowerCasePipe],
  templateUrl: './dialog-results-sor.html',
  styleUrl: './dialog-results-sor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogResultsSor { 
  readonly dialogRef = inject(MatDialogRef<DialogResultsSor>);
  readonly data = inject<CategorySOR>(MAT_DIALOG_DATA);
  resultsSor = signal<CategorySOR>(this.data);

  dataSource = new MatTableDataSource([this.resultsSor()]);
  columnsTable = signal<string[]>(['competitionName', 'best']);

  constructor(){
    if(this.resultsSor().times){
      this.columnsTable.set(['competitionName', 'best', 'times'])
    }
  }

  /* constructor(){
    effect(()=>{
      if(this.category()!="333mbf"){
        this.results.set([this.recordResultSingle(), this.recordResultAverage()!])
        this.dataSource.data = this.results();
      }else{
        this.results.set([this.recordResultSingle()])
        this.dataSource.data = this.results();
      }
    })    
  } */

}
