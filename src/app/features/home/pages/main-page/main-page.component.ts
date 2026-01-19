import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { InformationHomePage } from '../../../../core/models/infomation.model';
import { RouterLink } from "@angular/router";
import { UpcomingCompetitions } from "../../components/upcoming-competitions/upcoming-competitions";
import { InformationHomeService } from '../../../../core/services/informationHome.service';
import { TimeProcessorPipe } from '../../../../shared/pipes/time-processor.pipe';
import { TableRankingNational } from "../../components/table-ranking-national/table-ranking-national";
import { ListCollaborators } from "../../components/list-collaborators/list-collaborators";
import { FooterPage } from "../../../../shared/components/footer-page/footer-page";

@Component({
  selector: 'home-main-page',
  imports: [RouterLink, UpcomingCompetitions, TimeProcessorPipe, TableRankingNational, ListCollaborators, FooterPage],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent { 

  options={
    root:null,
    rootMargin:"0px",
    threshold: .5
  }

  projects?:any;

  informationService = inject(InformationHomeService);

  constructor(){
    if(this.informationService.info()==undefined){
      this.informationService.getInformation().subscribe(persons=>{
        this.informationService.info.set(persons);
        this.informationService.saveInformationCacheStore();
      })
    }
  }

  get info(){
    return this.informationService.info();
  }

  ngAfterViewInit(){
    this.projects= document.querySelectorAll('.conteiner_red_shape');
    this.projects.forEach((elemento:any)=>{
        const observer = new IntersectionObserver(entries =>{
          entries.forEach((entry, index)=>{
            if(entry.isIntersecting){
              const dat =entry.target.querySelector('.red-shape')
              if(dat){
                dat.classList.add('animated')
              }
            } 
        })

      }, this.options);
      
      observer.observe(elemento)
    })
  }
}
