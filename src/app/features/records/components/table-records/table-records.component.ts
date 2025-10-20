import { LowerCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecordResult } from '../../../../shared/models/records.interface';
import { TimeProcessorPipe } from '../../../../shared/pipes/time-processor.pipe';

@Component({
  selector: 'records-national-table',
  imports: [MatTableModule, LowerCasePipe, TimeProcessorPipe],
  templateUrl: './table-records.component.html',
  styleUrl: './table-records.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRecordsComponent { 
  category = input.required<string>()
  recordResultSingle=input.required<RecordResult>()
  recordResultAverage=input<RecordResult>()

  results = signal<RecordResult[]>([]);
  dataSource = new MatTableDataSource(this.results());
  columnsTable = signal<string[]>(['type', 'personName', 'best', 'competitionName','times']);

  constructor(){
    effect(()=>{
      if(this.category()!="333mbf"){
        this.results.set([this.recordResultSingle(), this.recordResultAverage()!])
        this.dataSource.data = this.results();
      }else{
        this.results.set([this.recordResultSingle()])
        this.dataSource.data = this.results();
      }

      console.log(this.results());
    })    
  }
}
